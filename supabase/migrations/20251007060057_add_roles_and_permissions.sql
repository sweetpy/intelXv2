/*
  # Role-Based Access Control and System Enhancements
  
  1. New Tables
    - `user_roles` - Role definitions with permissions
    - `user_activity_log` - Track user actions
    - `system_stats` - Real-time system statistics
    
  2. Enhancements
    - Add role-based permissions to users table
    - Create comprehensive role structure
    - Add activity tracking
    
  3. Security
    - Enable RLS on all new tables
    - Add policies for role-based access
    
  4. Data
    - Seed initial roles (admin, manager, analyst, user)
    - Create system statistics table for dashboard
*/

-- Create roles enum if not exists
DO $$ BEGIN
  CREATE TYPE user_role_type AS ENUM ('admin', 'manager', 'analyst', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table for role definitions
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  description text,
  permissions jsonb DEFAULT '[]'::jsonb,
  can_create_users boolean DEFAULT false,
  can_edit_users boolean DEFAULT false,
  can_delete_users boolean DEFAULT false,
  can_view_analytics boolean DEFAULT true,
  can_export_data boolean DEFAULT false,
  can_manage_distributors boolean DEFAULT false,
  can_manage_inventory boolean DEFAULT false,
  can_manage_orders boolean DEFAULT false,
  can_access_intelligence boolean DEFAULT false,
  priority integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage roles"
  ON user_roles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Insert default roles
INSERT INTO user_roles (role_name, display_name, description, permissions, can_create_users, can_edit_users, can_delete_users, can_view_analytics, can_export_data, can_manage_distributors, can_manage_inventory, can_manage_orders, can_access_intelligence, priority)
VALUES
  ('admin', 'Administrator', 'Full system access with all permissions', '["*"]'::jsonb, true, true, true, true, true, true, true, true, true, 100),
  ('manager', 'Manager', 'Can manage teams, view analytics, and export data', '["read", "write", "export"]'::jsonb, false, true, false, true, true, true, true, true, true, 75),
  ('analyst', 'Analyst', 'Can view and analyze data, create reports', '["read", "analyze", "report"]'::jsonb, false, false, false, true, true, false, false, false, true, 50),
  ('user', 'User', 'Basic access to view data', '["read"]'::jsonb, false, false, false, true, false, false, false, false, false, 25)
ON CONFLICT (role_name) DO NOTHING;

-- Create user_activity_log table
CREATE TABLE IF NOT EXISTS user_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  action text NOT NULL,
  resource text NOT NULL,
  resource_id uuid,
  details jsonb,
  ip_address text,
  user_agent text,
  success boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activity"
  ON user_activity_log FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all activity"
  ON user_activity_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "System can insert activity"
  ON user_activity_log FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_activity_user_id ON user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_created_at ON user_activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_action ON user_activity_log(action);

-- Create system_stats table for real-time dashboard data
CREATE TABLE IF NOT EXISTS system_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_key text UNIQUE NOT NULL,
  stat_value numeric NOT NULL DEFAULT 0,
  stat_label text NOT NULL,
  stat_category text NOT NULL,
  trend_direction text CHECK (trend_direction IN ('up', 'down', 'neutral')),
  trend_percentage numeric,
  metadata jsonb,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE system_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view stats"
  ON system_stats FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can update stats"
  ON system_stats FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Seed initial system stats
INSERT INTO system_stats (stat_key, stat_value, stat_label, stat_category, trend_direction, trend_percentage, metadata)
VALUES
  ('total_revenue', 2400000000, 'Total Revenue', 'financial', 'up', 12.5, '{"currency": "TZS", "period": "monthly"}'::jsonb),
  ('active_distributors', 1247, 'Active Distributors', 'operations', 'up', 8.2, '{"status": "active"}'::jsonb),
  ('products_distributed', 45678, 'Products Distributed', 'inventory', 'down', 2.1, '{"period": "monthly"}'::jsonb),
  ('routes_optimized', 892, 'Routes Optimized', 'logistics', 'up', 15.3, '{"efficiency_gain": "18%"}'::jsonb),
  ('total_customers', 3456, 'Total Customers', 'customers', 'up', 11.2, '{"active": 3124}'::jsonb),
  ('orders_pending', 234, 'Pending Orders', 'orders', 'neutral', 0, '{"priority_high": 45}'::jsonb),
  ('inventory_value', 5600000000, 'Inventory Value', 'financial', 'up', 5.7, '{"currency": "TZS"}'::jsonb),
  ('regions_covered', 26, 'Regions Covered', 'geography', 'neutral', 0, '{"country": "Tanzania"}'::jsonb)
ON CONFLICT (stat_key) DO UPDATE SET
  stat_value = EXCLUDED.stat_value,
  trend_direction = EXCLUDED.trend_direction,
  trend_percentage = EXCLUDED.trend_percentage,
  last_updated = now();

-- Create function to update system stats
CREATE OR REPLACE FUNCTION update_system_stat(
  p_stat_key text,
  p_stat_value numeric,
  p_trend_direction text DEFAULT NULL,
  p_trend_percentage numeric DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE system_stats
  SET 
    stat_value = p_stat_value,
    trend_direction = COALESCE(p_trend_direction, trend_direction),
    trend_percentage = COALESCE(p_trend_percentage, trend_percentage),
    last_updated = now()
  WHERE stat_key = p_stat_key;
END;
$$;

-- Create function to log user activity
CREATE OR REPLACE FUNCTION log_user_activity(
  p_user_id uuid,
  p_action text,
  p_resource text,
  p_resource_id uuid DEFAULT NULL,
  p_details jsonb DEFAULT NULL,
  p_success boolean DEFAULT true
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_activity_id uuid;
BEGIN
  INSERT INTO user_activity_log (user_id, action, resource, resource_id, details, success)
  VALUES (p_user_id, p_action, p_resource, p_resource_id, p_details, p_success)
  RETURNING id INTO v_activity_id;
  
  RETURN v_activity_id;
END;
$$;

-- Create view for user permissions
CREATE OR REPLACE VIEW user_permissions AS
SELECT 
  u.id as user_id,
  u.email,
  u.name,
  u.role,
  ur.display_name as role_display_name,
  ur.permissions,
  ur.can_create_users,
  ur.can_edit_users,
  ur.can_delete_users,
  ur.can_view_analytics,
  ur.can_export_data,
  ur.can_manage_distributors,
  ur.can_manage_inventory,
  ur.can_manage_orders,
  ur.can_access_intelligence,
  ur.priority
FROM users u
LEFT JOIN user_roles ur ON u.role = ur.role_name;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_customers_region ON customers(region);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
