/*
  # Create Distributors Table

  1. New Tables
    - `distributors`
      - Extended distributor information linked to customers
      - Performance metrics and KPIs
      - Territory and capacity management
      - Contract and commission details

  2. Security
    - Enable RLS on `distributors` table
    - Add policies for distributor access control
    - Ensure proper territory-based permissions

  3. Business Logic
    - Performance scoring calculations
    - Territory overlap validation
    - Commission calculations
*/

CREATE TABLE IF NOT EXISTS distributors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid UNIQUE NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  distributor_code text UNIQUE NOT NULL,
  territory text[] DEFAULT '{}',
  coverage_area numeric DEFAULT 0 CHECK (coverage_area >= 0), -- in square kilometers
  warehouse_capacity numeric DEFAULT 0 CHECK (warehouse_capacity >= 0), -- in cubic meters
  fleet_size integer DEFAULT 0 CHECK (fleet_size >= 0),
  staff_count integer DEFAULT 0 CHECK (staff_count >= 0),
  license_number text,
  license_expiry date,
  performance_score numeric DEFAULT 0 CHECK (performance_score >= 0 AND performance_score <= 100),
  kpi_metrics jsonb DEFAULT '{}',
  contract_start date NOT NULL,
  contract_end date NOT NULL,
  commission_rate numeric DEFAULT 0 CHECK (commission_rate >= 0 AND commission_rate <= 100),
  incentive_structure jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (contract_end > contract_start)
);

-- Enable RLS
ALTER TABLE distributors ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read distributors in their region"
  ON distributors
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM customers c
      JOIN users u ON u.id = auth.uid()
      WHERE c.id = distributors.customer_id
      AND (u.region = c.region OR 'admin' = ANY(u.permissions))
    )
  );

CREATE POLICY "Distributor managers can manage distributors"
  ON distributors
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM customers c
      WHERE c.id = distributors.customer_id
      AND c.account_manager_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'distributor_manager' = ANY(permissions))
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_distributors_customer ON distributors(customer_id);
CREATE INDEX IF NOT EXISTS idx_distributors_code ON distributors(distributor_code);
CREATE INDEX IF NOT EXISTS idx_distributors_territory ON distributors USING GIN(territory);
CREATE INDEX IF NOT EXISTS idx_distributors_performance ON distributors(performance_score);
CREATE INDEX IF NOT EXISTS idx_distributors_contract_dates ON distributors(contract_start, contract_end);

-- Update trigger
CREATE TRIGGER update_distributors_updated_at 
  BEFORE UPDATE ON distributors 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate distributor performance score
CREATE OR REPLACE FUNCTION calculate_distributor_performance()
RETURNS TRIGGER AS $$
DECLARE
  revenue_score numeric := 0;
  delivery_score numeric := 0;
  customer_score numeric := 0;
  growth_score numeric := 0;
  final_score numeric := 0;
  total_revenue numeric;
  delivery_rate numeric;
  satisfaction numeric;
  growth_rate numeric;
BEGIN
  -- Get customer data
  SELECT 
    c.total_revenue,
    c.satisfaction_score
  INTO total_revenue, satisfaction
  FROM customers c
  WHERE c.id = NEW.customer_id;
  
  -- Calculate revenue score (normalized to 0-100)
  revenue_score := LEAST(100, (total_revenue / 100000000) * 100); -- 100M TSh = 100 points
  
  -- Calculate delivery performance score
  SELECT 
    (COUNT(*) FILTER (WHERE status = 'delivered') * 100.0 / NULLIF(COUNT(*), 0))
  INTO delivery_rate
  FROM deliveries d
  JOIN orders o ON o.id = d.order_id
  WHERE o.customer_id = NEW.customer_id
  AND d.created_at > now() - interval '3 months';
  
  delivery_score := COALESCE(delivery_rate, 0);
  
  -- Customer satisfaction score
  customer_score := COALESCE(satisfaction * 20, 0); -- Convert 1-5 scale to 0-100
  
  -- Calculate growth rate score
  WITH monthly_revenue AS (
    SELECT 
      DATE_TRUNC('month', o.order_date) as month,
      SUM(o.total_amount) as revenue
    FROM orders o
    WHERE o.customer_id = NEW.customer_id
    AND o.order_date > now() - interval '6 months'
    AND o.status = 'delivered'
    GROUP BY DATE_TRUNC('month', o.order_date)
    ORDER BY month
  )
  SELECT 
    CASE 
      WHEN COUNT(*) >= 2 THEN
        ((LAST_VALUE(revenue) OVER (ORDER BY month) - FIRST_VALUE(revenue) OVER (ORDER BY month)) / 
         NULLIF(FIRST_VALUE(revenue) OVER (ORDER BY month), 0) * 100)
      ELSE 0
    END
  INTO growth_rate
  FROM monthly_revenue
  LIMIT 1;
  
  growth_score := GREATEST(0, LEAST(100, COALESCE(growth_rate, 0)));
  
  -- Weighted final score
  final_score := (
    revenue_score * 0.3 +
    delivery_score * 0.25 +
    customer_score * 0.25 +
    growth_score * 0.2
  );
  
  NEW.performance_score := ROUND(final_score, 1);
  
  -- Update KPI metrics
  NEW.kpi_metrics := jsonb_build_object(
    'revenue_score', revenue_score,
    'delivery_score', delivery_score,
    'customer_score', customer_score,
    'growth_score', growth_score,
    'total_revenue', total_revenue,
    'delivery_rate', delivery_rate,
    'satisfaction', satisfaction,
    'growth_rate', growth_rate,
    'last_calculated', now()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_distributor_performance_trigger
  BEFORE INSERT OR UPDATE ON distributors
  FOR EACH ROW
  EXECUTE FUNCTION calculate_distributor_performance();

-- Function to validate territory overlap
CREATE OR REPLACE FUNCTION validate_territory_overlap()
RETURNS TRIGGER AS $$
DECLARE
  overlapping_count integer;
BEGIN
  -- Check for territory overlap with other distributors
  SELECT COUNT(*) INTO overlapping_count
  FROM distributors d
  WHERE d.id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000')
  AND d.territory && NEW.territory; -- Array overlap operator
  
  IF overlapping_count > 0 THEN
    RAISE EXCEPTION 'Territory overlap detected with existing distributors';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_territory_overlap_trigger
  BEFORE INSERT OR UPDATE ON distributors
  FOR EACH ROW
  EXECUTE FUNCTION validate_territory_overlap();

-- Function to generate distributor code
CREATE OR REPLACE FUNCTION generate_distributor_code()
RETURNS TRIGGER AS $$
DECLARE
  region_code text;
  sequence_num text;
BEGIN
  -- Get region from customer
  SELECT 
    CASE c.region
      WHEN 'Dar es Salaam' THEN 'DAR'
      WHEN 'Mwanza' THEN 'MWZ'
      WHEN 'Arusha' THEN 'ARU'
      WHEN 'Dodoma' THEN 'DOD'
      WHEN 'Mbeya' THEN 'MBE'
      WHEN 'Kilimanjaro' THEN 'KIL'
      ELSE 'GEN'
    END
  INTO region_code
  FROM customers c
  WHERE c.id = NEW.customer_id;
  
  -- Get next sequence number for region
  SELECT LPAD((COUNT(*) + 1)::text, 3, '0')
  INTO sequence_num
  FROM distributors d
  JOIN customers c ON c.id = d.customer_id
  WHERE c.region = (SELECT region FROM customers WHERE id = NEW.customer_id);
  
  NEW.distributor_code := region_code || '-' || sequence_num;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_distributor_code_trigger
  BEFORE INSERT ON distributors
  FOR EACH ROW
  WHEN (NEW.distributor_code IS NULL OR NEW.distributor_code = '')
  EXECUTE FUNCTION generate_distributor_code();