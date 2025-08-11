/*
  # Create Analytics and Intelligence System

  1. New Tables
    - `analytics_data` - Time-series metrics and KPIs
    - `intelligence_files` - Uploaded files for AI analysis
    - `ai_insights` - AI-generated insights and recommendations
    - `market_data` - External market intelligence
    - `performance_benchmarks` - Industry benchmarking data

  2. Security
    - Enable RLS on all analytics tables
    - Add policies for data access control
    - Ensure proper audit trail for AI operations

  3. Business Logic
    - Automated insight generation
    - Performance scoring and benchmarking
    - Data quality validation
*/

-- Create insight type enum
DO $$ BEGIN
  CREATE TYPE insight_type AS ENUM ('opportunity', 'threat', 'trend', 'recommendation', 'prediction', 'correlation');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create impact level enum
DO $$ BEGIN
  CREATE TYPE impact_level AS ENUM ('high', 'medium', 'low');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create analysis status enum
DO $$ BEGIN
  CREATE TYPE analysis_status AS ENUM ('pending', 'processing', 'completed', 'failed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create insight status enum
DO $$ BEGIN
  CREATE TYPE insight_status AS ENUM ('new', 'reviewed', 'implemented', 'dismissed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS analytics_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  metric_unit text NOT NULL,
  dimension_1 text, -- e.g., region, product_category
  dimension_2 text, -- e.g., customer_type, channel
  dimension_3 text, -- e.g., time_period, segment
  region text,
  date_recorded timestamptz NOT NULL DEFAULT now(),
  data_source text NOT NULL,
  confidence_score numeric CHECK (confidence_score >= 0 AND confidence_score <= 100),
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS intelligence_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  file_type text NOT NULL,
  file_size bigint NOT NULL CHECK (file_size > 0),
  file_url text,
  category text NOT NULL,
  subcategory text,
  upload_date timestamptz DEFAULT now(),
  uploaded_by uuid NOT NULL REFERENCES users(id),
  analysis_status analysis_status DEFAULT 'pending',
  ai_tags text[] DEFAULT '{}',
  user_tags text[] DEFAULT '{}',
  confidence_score numeric CHECK (confidence_score >= 0 AND confidence_score <= 100),
  relevance_score numeric CHECK (relevance_score >= 0 AND relevance_score <= 100),
  summary text,
  key_findings text[] DEFAULT '{}',
  actionable_items text[] DEFAULT '{}',
  connections text[] DEFAULT '{}',
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id uuid REFERENCES intelligence_files(id) ON DELETE SET NULL,
  insight_type insight_type NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  confidence numeric NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  impact impact_level NOT NULL,
  timeframe text NOT NULL,
  priority integer DEFAULT 5 CHECK (priority >= 1 AND priority <= 10),
  status insight_status DEFAULT 'new',
  action_items text[] DEFAULT '{}',
  related_files text[] DEFAULT '{}',
  created_by_ai boolean DEFAULT true,
  reviewed_by uuid REFERENCES users(id),
  review_date timestamptz,
  implementation_date timestamptz,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS market_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data_type text NOT NULL, -- 'competitor', 'industry', 'economic', 'demographic'
  source text NOT NULL,
  region text,
  industry text,
  data_point text NOT NULL,
  value numeric,
  value_text text,
  unit text,
  date_collected timestamptz NOT NULL,
  validity_period interval,
  confidence_level numeric CHECK (confidence_level >= 0 AND confidence_level <= 100),
  tags text[] DEFAULT '{}',
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS performance_benchmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  industry text NOT NULL,
  region text,
  benchmark_type text NOT NULL, -- 'industry_average', 'top_quartile', 'best_in_class'
  value numeric NOT NULL,
  unit text NOT NULL,
  sample_size integer,
  data_source text NOT NULL,
  collection_date date NOT NULL,
  validity_period interval DEFAULT '1 year',
  methodology text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE analytics_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE intelligence_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_benchmarks ENABLE ROW LEVEL SECURITY;

-- Analytics Data Policies
CREATE POLICY "Users can read analytics data for their region"
  ON analytics_data
  FOR SELECT
  TO authenticated
  USING (
    region IS NULL OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND (region = analytics_data.region OR 'admin' = ANY(permissions))
    )
  );

CREATE POLICY "Analysts can insert analytics data"
  ON analytics_data
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'analyst' = ANY(permissions))
    )
  );

-- Intelligence Files Policies
CREATE POLICY "Users can read intelligence files"
  ON intelligence_files
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can upload intelligence files"
  ON intelligence_files
  FOR INSERT
  TO authenticated
  WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "Users can update their uploaded files"
  ON intelligence_files
  FOR UPDATE
  TO authenticated
  USING (
    uploaded_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND 'admin' = ANY(permissions)
    )
  );

-- AI Insights Policies
CREATE POLICY "Users can read AI insights"
  ON ai_insights
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "AI system can create insights"
  ON ai_insights
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by_ai = true);

CREATE POLICY "Users can review insights"
  ON ai_insights
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'analyst' = ANY(permissions))
    )
  );

-- Market Data Policies
CREATE POLICY "Users can read market data"
  ON market_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Data managers can manage market data"
  ON market_data
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'data_manager' = ANY(permissions))
    )
  );

-- Benchmark Policies
CREATE POLICY "Users can read benchmarks"
  ON performance_benchmarks
  FOR SELECT
  TO authenticated
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_analytics_metric_name ON analytics_data(metric_name);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics_data(date_recorded);
CREATE INDEX IF NOT EXISTS idx_analytics_region ON analytics_data(region);
CREATE INDEX IF NOT EXISTS idx_analytics_dimensions ON analytics_data(dimension_1, dimension_2, dimension_3);

CREATE INDEX IF NOT EXISTS idx_intelligence_category ON intelligence_files(category);
CREATE INDEX IF NOT EXISTS idx_intelligence_status ON intelligence_files(analysis_status);
CREATE INDEX IF NOT EXISTS idx_intelligence_uploaded_by ON intelligence_files(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_intelligence_tags ON intelligence_files USING GIN(ai_tags);
CREATE INDEX IF NOT EXISTS idx_intelligence_user_tags ON intelligence_files USING GIN(user_tags);

CREATE INDEX IF NOT EXISTS idx_insights_type ON ai_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_insights_impact ON ai_insights(impact);
CREATE INDEX IF NOT EXISTS idx_insights_status ON ai_insights(status);
CREATE INDEX IF NOT EXISTS idx_insights_priority ON ai_insights(priority);
CREATE INDEX IF NOT EXISTS idx_insights_file ON ai_insights(file_id);

CREATE INDEX IF NOT EXISTS idx_market_data_type ON market_data(data_type);
CREATE INDEX IF NOT EXISTS idx_market_data_region ON market_data(region);
CREATE INDEX IF NOT EXISTS idx_market_data_industry ON market_data(industry);
CREATE INDEX IF NOT EXISTS idx_market_data_date ON market_data(date_collected);

CREATE INDEX IF NOT EXISTS idx_benchmarks_metric ON performance_benchmarks(metric_name);
CREATE INDEX IF NOT EXISTS idx_benchmarks_industry ON performance_benchmarks(industry);
CREATE INDEX IF NOT EXISTS idx_benchmarks_region ON performance_benchmarks(region);

-- Update triggers
CREATE TRIGGER update_intelligence_files_updated_at 
  BEFORE UPDATE ON intelligence_files 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_insights_updated_at 
  BEFORE UPDATE ON ai_insights 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-generate insights from uploaded files
CREATE OR REPLACE FUNCTION generate_ai_insights()
RETURNS TRIGGER AS $$
BEGIN
  -- Only process completed analyses
  IF NEW.analysis_status = 'completed' AND OLD.analysis_status != 'completed' THEN
    -- Generate sample insights based on file category
    IF NEW.category = 'market-research' THEN
      INSERT INTO ai_insights (
        file_id, insight_type, title, description, confidence, impact, timeframe, priority
      ) VALUES (
        NEW.id,
        'opportunity',
        'Market Expansion Opportunity Detected',
        'Analysis reveals untapped market segments with high growth potential in ' || COALESCE(NEW.metadata->>'region', 'target regions'),
        85 + (random() * 15)::integer,
        'high',
        'Q2-Q3 2024',
        1
      );
    ELSIF NEW.category = 'competitor-intel' THEN
      INSERT INTO ai_insights (
        file_id, insight_type, title, description, confidence, impact, timeframe, priority
      ) VALUES (
        NEW.id,
        'threat',
        'Competitive Threat Identified',
        'Competitor activity analysis suggests potential market disruption in key regions',
        75 + (random() * 20)::integer,
        'medium',
        'Next 6 months',
        2
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_ai_insights_trigger
  AFTER UPDATE ON intelligence_files
  FOR EACH ROW
  EXECUTE FUNCTION generate_ai_insights();

-- Function to calculate data quality score
CREATE OR REPLACE FUNCTION calculate_data_quality()
RETURNS numeric AS $$
DECLARE
  completeness_score numeric;
  accuracy_score numeric;
  consistency_score numeric;
  timeliness_score numeric;
  overall_score numeric;
BEGIN
  -- Calculate completeness (percentage of non-null required fields)
  SELECT 
    (COUNT(*) FILTER (WHERE name IS NOT NULL AND company IS NOT NULL AND region IS NOT NULL) * 100.0 / COUNT(*))
  INTO completeness_score
  FROM customers;
  
  -- Calculate accuracy (valid email formats, phone numbers, etc.)
  SELECT 
    (COUNT(*) FILTER (WHERE email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' OR email IS NULL) * 100.0 / COUNT(*))
  INTO accuracy_score
  FROM customers;
  
  -- Calculate consistency (standardized region names, etc.)
  SELECT 
    (COUNT(*) FILTER (WHERE region IN (
      'Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya', 'Morogoro',
      'Tanga', 'Kilimanjaro', 'Tabora', 'Kigoma', 'Shinyanga', 'Kagera',
      'Mtwara', 'Ruvuma', 'Iringa', 'Lindi', 'Singida', 'Rukwa',
      'Katavi', 'Njombe', 'Simiyu', 'Geita', 'Songwe', 'Manyara', 'Pemba', 'Unguja'
    )) * 100.0 / COUNT(*))
  INTO consistency_score
  FROM customers;
  
  -- Calculate timeliness (recent updates)
  SELECT 
    (COUNT(*) FILTER (WHERE updated_at > now() - interval '30 days') * 100.0 / COUNT(*))
  INTO timeliness_score
  FROM customers;
  
  -- Weighted average
  overall_score := (completeness_score * 0.3 + accuracy_score * 0.3 + consistency_score * 0.2 + timeliness_score * 0.2);
  
  RETURN COALESCE(overall_score, 0);
END;
$$ LANGUAGE plpgsql;