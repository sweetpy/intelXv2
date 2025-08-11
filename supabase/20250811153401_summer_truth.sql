/*
  # Create Routes and Logistics System

  1. New Tables
    - `routes` - Route definitions and optimization
    - `vehicles` - Fleet management
    - `deliveries` - Delivery tracking and management
    - `route_stops` - Individual stops on routes

  2. Security
    - Enable RLS on all logistics tables
    - Add policies for regional access control
    - Ensure proper tracking and audit trails

  3. Business Logic
    - Route optimization scoring
    - Delivery status tracking
    - Vehicle assignment and tracking
*/

-- Create route status enum
DO $$ BEGIN
  CREATE TYPE route_status AS ENUM ('active', 'inactive', 'maintenance', 'planned');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create vehicle status enum
DO $$ BEGIN
  CREATE TYPE vehicle_status AS ENUM ('available', 'in_transit', 'maintenance', 'out_of_service');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create delivery status enum
DO $$ BEGIN
  CREATE TYPE delivery_status AS ENUM ('scheduled', 'in_transit', 'delivered', 'failed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create frequency enum
DO $$ BEGIN
  CREATE TYPE route_frequency AS ENUM ('daily', 'weekly', 'bi-weekly', 'monthly');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  route_code text UNIQUE NOT NULL,
  region text NOT NULL,
  start_location text NOT NULL,
  end_location text NOT NULL,
  waypoints jsonb DEFAULT '[]',
  total_distance numeric DEFAULT 0 CHECK (total_distance >= 0),
  estimated_duration integer DEFAULT 0 CHECK (estimated_duration >= 0), -- in minutes
  vehicle_type text,
  driver_id uuid REFERENCES users(id),
  status route_status DEFAULT 'planned',
  optimization_score numeric DEFAULT 0 CHECK (optimization_score >= 0 AND optimization_score <= 100),
  cost_per_km numeric DEFAULT 0 CHECK (cost_per_km >= 0),
  total_cost numeric GENERATED ALWAYS AS (total_distance * cost_per_km) STORED,
  frequency route_frequency DEFAULT 'weekly',
  schedule jsonb,
  performance_metrics jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_number text UNIQUE NOT NULL,
  vehicle_type text NOT NULL,
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL CHECK (year >= 1990 AND year <= EXTRACT(YEAR FROM CURRENT_DATE) + 1),
  capacity_kg numeric NOT NULL CHECK (capacity_kg > 0),
  capacity_m3 numeric NOT NULL CHECK (capacity_m3 > 0),
  fuel_type text NOT NULL,
  fuel_efficiency numeric DEFAULT 0 CHECK (fuel_efficiency >= 0), -- km per liter
  driver_id uuid REFERENCES users(id),
  current_location jsonb,
  status vehicle_status DEFAULT 'available',
  last_service_date date,
  next_service_date date,
  insurance_expiry date,
  license_expiry date,
  gps_device_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
  route_id uuid REFERENCES routes(id),
  vehicle_id uuid REFERENCES vehicles(id),
  driver_id uuid REFERENCES users(id),
  delivery_date date NOT NULL,
  delivery_time_window jsonb NOT NULL, -- {start: "09:00", end: "17:00"}
  actual_delivery_time timestamptz,
  status delivery_status DEFAULT 'scheduled',
  delivery_address text NOT NULL,
  delivery_coordinates jsonb NOT NULL,
  recipient_name text,
  recipient_phone text,
  signature_url text,
  photo_url text,
  delivery_notes text,
  failed_reason text,
  attempts integer DEFAULT 1 CHECK (attempts >= 1),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS route_stops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id uuid NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  stop_order integer NOT NULL CHECK (stop_order > 0),
  estimated_arrival timestamptz,
  estimated_departure timestamptz,
  actual_arrival timestamptz,
  actual_departure timestamptz,
  stop_duration integer, -- in minutes
  distance_from_previous numeric DEFAULT 0,
  notes text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(route_id, stop_order)
);

-- Enable RLS
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE route_stops ENABLE ROW LEVEL SECURITY;

-- Route Policies
CREATE POLICY "Users can read routes in their region"
  ON routes
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND (region = routes.region OR 'admin' = ANY(permissions))
    )
  );

CREATE POLICY "Route managers can manage routes"
  ON routes
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'route_manager' = ANY(permissions))
    )
  );

-- Vehicle Policies
CREATE POLICY "Users can read vehicles"
  ON vehicles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Fleet managers can manage vehicles"
  ON vehicles
  FOR ALL
  TO authenticated
  USING (
    driver_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'fleet_manager' = ANY(permissions))
    )
  );

-- Delivery Policies
CREATE POLICY "Users can read deliveries for accessible orders"
  ON deliveries
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders o
      JOIN customers c ON c.id = o.customer_id
      JOIN users u ON u.id = auth.uid()
      WHERE o.id = deliveries.order_id
      AND (u.region = c.region OR 'admin' = ANY(u.permissions))
    )
  );

CREATE POLICY "Delivery personnel can manage their deliveries"
  ON deliveries
  FOR ALL
  TO authenticated
  USING (
    driver_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'delivery_manager' = ANY(permissions))
    )
  );

-- Route Stops Policies
CREATE POLICY "Users can read route stops for accessible routes"
  ON route_stops
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM routes r
      JOIN users u ON u.id = auth.uid()
      WHERE r.id = route_stops.route_id
      AND (u.region = r.region OR 'admin' = ANY(u.permissions))
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_routes_region ON routes(region);
CREATE INDEX IF NOT EXISTS idx_routes_status ON routes(status);
CREATE INDEX IF NOT EXISTS idx_routes_driver ON routes(driver_id);
CREATE INDEX IF NOT EXISTS idx_routes_optimization_score ON routes(optimization_score);

CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_driver ON vehicles(driver_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_type ON vehicles(vehicle_type);

CREATE INDEX IF NOT EXISTS idx_deliveries_order ON deliveries(order_id);
CREATE INDEX IF NOT EXISTS idx_deliveries_route ON deliveries(route_id);
CREATE INDEX IF NOT EXISTS idx_deliveries_vehicle ON deliveries(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_deliveries_driver ON deliveries(driver_id);
CREATE INDEX IF NOT EXISTS idx_deliveries_status ON deliveries(status);
CREATE INDEX IF NOT EXISTS idx_deliveries_date ON deliveries(delivery_date);

CREATE INDEX IF NOT EXISTS idx_route_stops_route ON route_stops(route_id);
CREATE INDEX IF NOT EXISTS idx_route_stops_customer ON route_stops(customer_id);
CREATE INDEX IF NOT EXISTS idx_route_stops_order ON route_stops(route_id, stop_order);

-- Update triggers
CREATE TRIGGER update_routes_updated_at 
  BEFORE UPDATE ON routes 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at 
  BEFORE UPDATE ON vehicles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deliveries_updated_at 
  BEFORE UPDATE ON deliveries 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_route_stops_updated_at 
  BEFORE UPDATE ON route_stops 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate route optimization score
CREATE OR REPLACE FUNCTION calculate_route_optimization_score()
RETURNS TRIGGER AS $$
DECLARE
  distance_score numeric;
  time_score numeric;
  stop_efficiency numeric;
  final_score numeric;
BEGIN
  -- Calculate distance efficiency (lower distance = higher score)
  distance_score := GREATEST(0, 100 - (NEW.total_distance / 10));
  
  -- Calculate time efficiency (lower time = higher score)
  time_score := GREATEST(0, 100 - (NEW.estimated_duration / 60));
  
  -- Calculate stop efficiency based on number of stops vs distance
  SELECT COUNT(*) INTO stop_efficiency FROM route_stops WHERE route_id = NEW.id;
  stop_efficiency := LEAST(100, (stop_efficiency / GREATEST(1, NEW.total_distance / 50)) * 100);
  
  -- Weighted average
  final_score := (distance_score * 0.4 + time_score * 0.4 + stop_efficiency * 0.2);
  
  NEW.optimization_score := LEAST(100, GREATEST(0, final_score));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_route_optimization_trigger
  BEFORE INSERT OR UPDATE ON routes
  FOR EACH ROW
  EXECUTE FUNCTION calculate_route_optimization_score();

-- Function to update delivery status based on time
CREATE OR REPLACE FUNCTION update_delivery_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Mark as overdue if past delivery window and not delivered
  IF NEW.status = 'scheduled' AND 
     NEW.delivery_date < CURRENT_DATE AND
     EXTRACT(HOUR FROM CURRENT_TIME) > 
     CAST(NEW.delivery_time_window->>'end' AS time) THEN
    NEW.status := 'failed';
    NEW.failed_reason := 'Delivery window expired';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_delivery_status_trigger
  BEFORE UPDATE ON deliveries
  FOR EACH ROW
  EXECUTE FUNCTION update_delivery_status();