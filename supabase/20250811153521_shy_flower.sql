/*
  # Create CRM and Sales System

  1. New Tables
    - `leads` - Lead management and scoring
    - `sales_activities` - Sales activity tracking
    - `opportunities` - Sales opportunities pipeline
    - `sales_targets` - Sales targets and quotas
    - `commission_structures` - Commission and incentive management

  2. Security
    - Enable RLS on all CRM tables
    - Add policies for sales team access control
    - Ensure proper lead assignment and territory management

  3. Business Logic
    - Lead scoring algorithms
    - Sales pipeline management
    - Commission calculations
    - Activity tracking and reminders
*/

-- Create lead status enum
DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create activity type enum
DO $$ BEGIN
  CREATE TYPE activity_type AS ENUM ('call', 'email', 'meeting', 'demo', 'proposal', 'follow-up', 'contract');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create activity status enum
DO $$ BEGIN
  CREATE TYPE activity_status AS ENUM ('completed', 'scheduled', 'overdue', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create priority enum
DO $$ BEGIN
  CREATE TYPE priority_level AS ENUM ('high', 'medium', 'low');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  phone text,
  region text NOT NULL,
  industry text NOT NULL,
  source text NOT NULL,
  status lead_status DEFAULT 'new',
  score integer DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  estimated_value numeric DEFAULT 0 CHECK (estimated_value >= 0),
  probability integer DEFAULT 0 CHECK (probability >= 0 AND probability <= 100),
  assigned_to uuid NOT NULL REFERENCES users(id),
  created_date timestamptz DEFAULT now(),
  last_contact_date timestamptz,
  next_action text,
  notes text,
  tags text[] DEFAULT '{}',
  conversion_date timestamptz,
  lost_reason text,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sales_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads(id) ON DELETE SET NULL,
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  activity_type activity_type NOT NULL,
  subject text NOT NULL,
  description text,
  assigned_to uuid NOT NULL REFERENCES users(id),
  status activity_status DEFAULT 'scheduled',
  scheduled_date timestamptz NOT NULL,
  completed_date timestamptz,
  duration_minutes integer CHECK (duration_minutes > 0),
  outcome text,
  next_action text,
  priority priority_level DEFAULT 'medium',
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT lead_or_customer_required CHECK (lead_id IS NOT NULL OR customer_id IS NOT NULL)
);

CREATE TABLE IF NOT EXISTS opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  lead_id uuid REFERENCES leads(id) ON DELETE SET NULL,
  value numeric NOT NULL CHECK (value >= 0),
  probability integer NOT NULL CHECK (probability >= 0 AND probability <= 100),
  stage text NOT NULL,
  expected_close_date date,
  actual_close_date date,
  assigned_to uuid NOT NULL REFERENCES users(id),
  products text[] DEFAULT '{}',
  competitors text[] DEFAULT '{}',
  win_reason text,
  loss_reason text,
  last_activity_date timestamptz,
  next_steps text,
  notes text,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sales_targets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_type text NOT NULL, -- 'revenue', 'volume', 'customers', 'activities'
  target_value numeric NOT NULL CHECK (target_value > 0),
  actual_value numeric DEFAULT 0 CHECK (actual_value >= 0),
  achievement_percentage numeric GENERATED ALWAYS AS (
    CASE 
      WHEN target_value > 0 THEN (actual_value / target_value * 100)
      ELSE 0 
    END
  ) STORED,
  period_start date NOT NULL,
  period_end date NOT NULL,
  region text,
  product_category text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (period_end > period_start)
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_targets ENABLE ROW LEVEL SECURITY;

-- Lead Policies
CREATE POLICY "Users can read leads in their region"
  ON leads
  FOR SELECT
  TO authenticated
  USING (
    assigned_to = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND (region = leads.region OR 'admin' = ANY(permissions) OR 'sales_manager' = ANY(permissions))
    )
  );

CREATE POLICY "Sales users can create leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (
    assigned_to = auth.uid() AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'sales' = ANY(permissions))
    )
  );

CREATE POLICY "Users can update assigned leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (
    assigned_to = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'sales_manager' = ANY(permissions))
    )
  );

-- Sales Activities Policies
CREATE POLICY "Users can read their activities"
  ON sales_activities
  FOR SELECT
  TO authenticated
  USING (
    assigned_to = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'sales_manager' = ANY(permissions))
    )
  );

CREATE POLICY "Users can manage their activities"
  ON sales_activities
  FOR ALL
  TO authenticated
  USING (assigned_to = auth.uid());

-- Opportunities Policies
CREATE POLICY "Users can read opportunities they're assigned to"
  ON opportunities
  FOR SELECT
  TO authenticated
  USING (
    assigned_to = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'sales_manager' = ANY(permissions))
    )
  );

-- Sales Targets Policies
CREATE POLICY "Users can read their own targets"
  ON sales_targets
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'sales_manager' = ANY(permissions))
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_region ON leads(region);
CREATE INDEX IF NOT EXISTS idx_leads_industry ON leads(industry);
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads(score);
CREATE INDEX IF NOT EXISTS idx_leads_tags ON leads USING GIN(tags);

CREATE INDEX IF NOT EXISTS idx_activities_assigned_to ON sales_activities(assigned_to);
CREATE INDEX IF NOT EXISTS idx_activities_lead ON sales_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_activities_customer ON sales_activities(customer_id);
CREATE INDEX IF NOT EXISTS idx_activities_status ON sales_activities(status);
CREATE INDEX IF NOT EXISTS idx_activities_date ON sales_activities(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_activities_type ON sales_activities(activity_type);

CREATE INDEX IF NOT EXISTS idx_opportunities_assigned_to ON opportunities(assigned_to);
CREATE INDEX IF NOT EXISTS idx_opportunities_customer ON opportunities(customer_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_lead ON opportunities(lead_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_stage ON opportunities(stage);
CREATE INDEX IF NOT EXISTS idx_opportunities_close_date ON opportunities(expected_close_date);

CREATE INDEX IF NOT EXISTS idx_targets_user ON sales_targets(user_id);
CREATE INDEX IF NOT EXISTS idx_targets_period ON sales_targets(period_start, period_end);
CREATE INDEX IF NOT EXISTS idx_targets_type ON sales_targets(target_type);

-- Update triggers
CREATE TRIGGER update_leads_updated_at 
  BEFORE UPDATE ON leads 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sales_activities_updated_at 
  BEFORE UPDATE ON sales_activities 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at 
  BEFORE UPDATE ON opportunities 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sales_targets_updated_at 
  BEFORE UPDATE ON sales_targets 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate lead score
CREATE OR REPLACE FUNCTION calculate_lead_score()
RETURNS TRIGGER AS $$
DECLARE
  score integer := 0;
BEGIN
  -- Industry scoring
  CASE NEW.industry
    WHEN 'FMCG' THEN score := score + 20;
    WHEN 'Pharmaceuticals' THEN score := score + 25;
    WHEN 'Agriculture' THEN score := score + 15;
    WHEN 'Electronics' THEN score := score + 18;
    ELSE score := score + 10;
  END CASE;
  
  -- Region scoring (based on market potential)
  CASE NEW.region
    WHEN 'Dar es Salaam' THEN score := score + 25;
    WHEN 'Mwanza' THEN score := score + 20;
    WHEN 'Arusha' THEN score := score + 22;
    WHEN 'Dodoma' THEN score := score + 15;
    ELSE score := score + 10;
  END CASE;
  
  -- Source scoring
  CASE NEW.source
    WHEN 'Referral' THEN score := score + 20;
    WHEN 'Website' THEN score := score + 15;
    WHEN 'Trade Show' THEN score := score + 18;
    WHEN 'Cold Call' THEN score := score + 5;
    ELSE score := score + 10;
  END CASE;
  
  -- Estimated value scoring
  IF NEW.estimated_value > 10000000 THEN score := score + 20;
  ELSIF NEW.estimated_value > 5000000 THEN score := score + 15;
  ELSIF NEW.estimated_value > 1000000 THEN score := score + 10;
  ELSE score := score + 5;
  END IF;
  
  -- Engagement scoring (recent contact)
  IF NEW.last_contact_date > now() - interval '7 days' THEN score := score + 10;
  ELSIF NEW.last_contact_date > now() - interval '30 days' THEN score := score + 5;
  END IF;
  
  NEW.score := LEAST(100, score);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_lead_score_trigger
  BEFORE INSERT OR UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION calculate_lead_score();

-- Function to update activity status based on time
CREATE OR REPLACE FUNCTION update_activity_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Mark as overdue if past scheduled time and not completed
  IF NEW.status = 'scheduled' AND NEW.scheduled_date < now() THEN
    NEW.status := 'overdue';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_activity_status_trigger
  BEFORE UPDATE ON sales_activities
  FOR EACH ROW
  EXECUTE FUNCTION update_activity_status();