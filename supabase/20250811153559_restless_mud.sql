/*
  # Create Audit and Security System

  1. New Tables
    - `audit_logs` - Comprehensive audit trail
    - `user_sessions` - Session management
    - `security_events` - Security monitoring
    - `data_exports` - Export tracking
    - `system_settings` - Platform configuration

  2. Security
    - Enable RLS on all audit tables
    - Add policies for security access control
    - Ensure comprehensive logging and monitoring

  3. Business Logic
    - Automatic audit logging
    - Security event detection
    - Session management
    - Data export tracking
*/

CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  action text NOT NULL,
  resource text NOT NULL,
  resource_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  success boolean DEFAULT true,
  error_message text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_token text UNIQUE NOT NULL,
  csrf_token text NOT NULL,
  ip_address inet,
  user_agent text,
  login_time timestamptz DEFAULT now(),
  last_activity timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  is_active boolean DEFAULT true,
  logout_time timestamptz,
  logout_reason text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS security_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  severity text NOT NULL, -- 'low', 'medium', 'high', 'critical'
  user_id uuid REFERENCES users(id),
  ip_address inet,
  user_agent text,
  description text NOT NULL,
  details jsonb,
  resolved boolean DEFAULT false,
  resolved_by uuid REFERENCES users(id),
  resolved_at timestamptz,
  resolution_notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS data_exports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  export_type text NOT NULL,
  table_name text NOT NULL,
  filters jsonb,
  record_count integer,
  file_size bigint,
  file_url text,
  status text DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  expires_at timestamptz,
  download_count integer DEFAULT 0,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value jsonb NOT NULL,
  setting_type text NOT NULL, -- 'string', 'number', 'boolean', 'object', 'array'
  category text NOT NULL,
  description text,
  is_public boolean DEFAULT false,
  is_editable boolean DEFAULT true,
  validation_rules jsonb,
  updated_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Audit Logs Policies
CREATE POLICY "Admins can read all audit logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND 'admin' = ANY(permissions)
    )
  );

CREATE POLICY "Users can read their own audit logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can insert audit logs"
  ON audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- User Sessions Policies
CREATE POLICY "Users can read their own sessions"
  ON user_sessions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can manage sessions"
  ON user_sessions
  FOR ALL
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND 'admin' = ANY(permissions)
    )
  );

-- Security Events Policies
CREATE POLICY "Security admins can read security events"
  ON security_events
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'security_admin' = ANY(permissions))
    )
  );

CREATE POLICY "System can create security events"
  ON security_events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Data Exports Policies
CREATE POLICY "Users can read their own exports"
  ON data_exports
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create exports"
  ON data_exports
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- System Settings Policies
CREATE POLICY "Users can read public settings"
  ON system_settings
  FOR SELECT
  TO authenticated
  USING (is_public = true);

CREATE POLICY "Admins can read all settings"
  ON system_settings
  FOR SELECT
  TO authenticated
  USING (
    is_public = true OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND 'admin' = ANY(permissions)
    )
  );

CREATE POLICY "Admins can manage settings"
  ON system_settings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND 'admin' = ANY(permissions)
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_success ON audit_logs(success);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON user_sessions(is_active);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON user_sessions(expires_at);

CREATE INDEX IF NOT EXISTS idx_security_events_type ON security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_security_events_severity ON security_events(severity);
CREATE INDEX IF NOT EXISTS idx_security_events_user ON security_events(user_id);
CREATE INDEX IF NOT EXISTS idx_security_events_resolved ON security_events(resolved);
CREATE INDEX IF NOT EXISTS idx_security_events_created_at ON security_events(created_at);

CREATE INDEX IF NOT EXISTS idx_exports_user ON data_exports(user_id);
CREATE INDEX IF NOT EXISTS idx_exports_status ON data_exports(status);
CREATE INDEX IF NOT EXISTS idx_exports_type ON data_exports(export_type);
CREATE INDEX IF NOT EXISTS idx_exports_created_at ON data_exports(created_at);

CREATE INDEX IF NOT EXISTS idx_settings_key ON system_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_settings_category ON system_settings(category);
CREATE INDEX IF NOT EXISTS idx_settings_public ON system_settings(is_public);

-- Update triggers
CREATE TRIGGER update_system_settings_updated_at 
  BEFORE UPDATE ON system_settings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
  UPDATE user_sessions 
  SET 
    is_active = false,
    logout_time = now(),
    logout_reason = 'expired'
  WHERE expires_at < now() AND is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Function to log table changes
CREATE OR REPLACE FUNCTION log_table_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (
    user_id,
    action,
    resource,
    resource_id,
    old_values,
    new_values,
    ip_address,
    success
  ) VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP != 'DELETE' THEN to_jsonb(NEW) ELSE NULL END,
    inet_client_addr(),
    true
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply audit triggers to key tables
CREATE TRIGGER audit_customers_changes
  AFTER INSERT OR UPDATE OR DELETE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION log_table_changes();

CREATE TRIGGER audit_orders_changes
  AFTER INSERT OR UPDATE OR DELETE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION log_table_changes();

CREATE TRIGGER audit_leads_changes
  AFTER INSERT OR UPDATE OR DELETE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION log_table_changes();

-- Function to detect security anomalies
CREATE OR REPLACE FUNCTION detect_security_anomalies()
RETURNS TRIGGER AS $$
DECLARE
  recent_failures integer;
  rapid_requests integer;
BEGIN
  -- Check for multiple failed login attempts
  IF NEW.action = 'LOGIN_FAILED' THEN
    SELECT COUNT(*) INTO recent_failures
    FROM audit_logs
    WHERE user_id = NEW.user_id
    AND action = 'LOGIN_FAILED'
    AND created_at > now() - interval '15 minutes';
    
    IF recent_failures >= 5 THEN
      INSERT INTO security_events (
        event_type, severity, user_id, ip_address, description, details
      ) VALUES (
        'multiple_failed_logins',
        'high',
        NEW.user_id,
        NEW.ip_address,
        'Multiple failed login attempts detected',
        jsonb_build_object('failure_count', recent_failures, 'time_window', '15 minutes')
      );
    END IF;
  END IF;
  
  -- Check for rapid API requests
  SELECT COUNT(*) INTO rapid_requests
  FROM audit_logs
  WHERE user_id = NEW.user_id
  AND created_at > now() - interval '1 minute';
  
  IF rapid_requests > 100 THEN
    INSERT INTO security_events (
      event_type, severity, user_id, ip_address, description, details
    ) VALUES (
      'rapid_api_requests',
      'medium',
      NEW.user_id,
      NEW.ip_address,
      'Unusually high API request rate detected',
      jsonb_build_object('request_count', rapid_requests, 'time_window', '1 minute')
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER detect_security_anomalies_trigger
  AFTER INSERT ON audit_logs
  FOR EACH ROW
  EXECUTE FUNCTION detect_security_anomalies();