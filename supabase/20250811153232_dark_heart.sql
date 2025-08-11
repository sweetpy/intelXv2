/*
  # Create Customers Table

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `company` (text, not null)
      - `email` (text, nullable)
      - `phone` (text, nullable)
      - `address` (text, nullable)
      - `region` (text, not null)
      - `district` (text, nullable)
      - `ward` (text, nullable)
      - `latitude` (numeric, nullable)
      - `longitude` (numeric, nullable)
      - `customer_type` (enum, not null)
      - `status` (enum, default 'active')
      - `tier` (enum, default 'bronze')
      - `credit_limit` (numeric, nullable)
      - `payment_terms` (text, nullable)
      - `account_manager_id` (uuid, foreign key)
      - `registration_date` (date, default today)
      - `last_order_date` (date, nullable)
      - `total_orders` (integer, default 0)
      - `total_revenue` (numeric, default 0)
      - `average_order_value` (numeric, default 0)
      - `satisfaction_score` (numeric, nullable)
      - `notes` (text, nullable)
      - `tags` (text array, default empty)
      - `metadata` (jsonb, nullable)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `customers` table
    - Add policies for authenticated users to manage customers
    - Add policy for account managers to access their assigned customers

  3. Indexes
    - Index on region for regional queries
    - Index on customer_type for filtering
    - Index on status for active customer queries
    - Index on account_manager_id for manager assignments
    - Spatial index on coordinates for geo queries
*/

-- Create customer type enum
DO $$ BEGIN
  CREATE TYPE customer_type AS ENUM ('distributor', 'retailer', 'wholesaler', 'pharmacy', 'supermarket', 'kiosk');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create customer status enum
DO $$ BEGIN
  CREATE TYPE customer_status AS ENUM ('active', 'inactive', 'pending', 'suspended');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create customer tier enum
DO $$ BEGIN
  CREATE TYPE customer_tier AS ENUM ('platinum', 'gold', 'silver', 'bronze');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  email text,
  phone text,
  address text,
  region text NOT NULL,
  district text,
  ward text,
  latitude numeric,
  longitude numeric,
  customer_type customer_type NOT NULL,
  status customer_status DEFAULT 'active',
  tier customer_tier DEFAULT 'bronze',
  credit_limit numeric DEFAULT 0,
  payment_terms text,
  account_manager_id uuid REFERENCES users(id),
  registration_date date DEFAULT CURRENT_DATE,
  last_order_date date,
  total_orders integer DEFAULT 0,
  total_revenue numeric DEFAULT 0,
  average_order_value numeric DEFAULT 0,
  satisfaction_score numeric CHECK (satisfaction_score >= 1 AND satisfaction_score <= 5),
  notes text,
  tags text[] DEFAULT '{}',
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Authenticated users can read customers"
  ON customers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage customers in their region"
  ON customers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND (region = customers.region OR 'admin' = ANY(permissions))
    )
  );

CREATE POLICY "Account managers can access assigned customers"
  ON customers
  FOR ALL
  TO authenticated
  USING (
    account_manager_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND 'admin' = ANY(permissions)
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_customers_region ON customers(region);
CREATE INDEX IF NOT EXISTS idx_customers_type ON customers(customer_type);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_customers_tier ON customers(tier);
CREATE INDEX IF NOT EXISTS idx_customers_account_manager ON customers(account_manager_id);
CREATE INDEX IF NOT EXISTS idx_customers_coordinates ON customers(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_customers_tags ON customers USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_customers_metadata ON customers USING GIN(metadata);

-- Update trigger
CREATE TRIGGER update_customers_updated_at 
  BEFORE UPDATE ON customers 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate average order value
CREATE OR REPLACE FUNCTION calculate_customer_metrics()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.total_orders > 0 THEN
    NEW.average_order_value = NEW.total_revenue / NEW.total_orders;
  ELSE
    NEW.average_order_value = 0;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_customer_metrics_trigger
  BEFORE INSERT OR UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION calculate_customer_metrics();