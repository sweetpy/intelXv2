/*
  # Create Inventory Management System

  1. New Tables
    - `locations` - Warehouses, distribution centers, outlets
    - `inventory` - Stock levels and management
    - `inventory_movements` - Stock movement tracking
    - `stock_adjustments` - Manual stock adjustments

  2. Security
    - Enable RLS on all inventory tables
    - Add policies for location-based access control
    - Ensure proper audit trail for stock movements

  3. Business Logic
    - Automatic stock level calculations
    - Reorder point monitoring
    - Movement tracking and validation
*/

-- Create location type enum
DO $$ BEGIN
  CREATE TYPE location_type AS ENUM ('warehouse', 'distribution_center', 'retail_outlet', 'office');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create movement type enum
DO $$ BEGIN
  CREATE TYPE movement_type AS ENUM ('inbound', 'outbound', 'transfer', 'adjustment', 'return', 'damage', 'expired');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type location_type NOT NULL,
  address text NOT NULL,
  region text NOT NULL,
  district text,
  ward text,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  capacity numeric,
  manager_id uuid REFERENCES users(id),
  contact_phone text,
  contact_email text,
  operating_hours jsonb,
  facilities text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  location_id uuid NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
  current_stock integer DEFAULT 0 CHECK (current_stock >= 0),
  reserved_stock integer DEFAULT 0 CHECK (reserved_stock >= 0),
  available_stock integer GENERATED ALWAYS AS (current_stock - reserved_stock) STORED,
  min_stock_level integer NOT NULL CHECK (min_stock_level >= 0),
  max_stock_level integer NOT NULL CHECK (max_stock_level >= min_stock_level),
  reorder_point integer NOT NULL CHECK (reorder_point >= 0),
  reorder_quantity integer NOT NULL CHECK (reorder_quantity > 0),
  last_stock_count timestamptz,
  last_movement_date timestamptz,
  cost_per_unit numeric DEFAULT 0 CHECK (cost_per_unit >= 0),
  total_value numeric GENERATED ALWAYS AS (current_stock * cost_per_unit) STORED,
  expiry_date date,
  batch_number text,
  supplier_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, location_id, batch_number)
);

CREATE TABLE IF NOT EXISTS inventory_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_id uuid NOT NULL REFERENCES inventory(id) ON DELETE RESTRICT,
  movement_type movement_type NOT NULL,
  quantity integer NOT NULL,
  unit_cost numeric DEFAULT 0 CHECK (unit_cost >= 0),
  total_cost numeric GENERATED ALWAYS AS (quantity * unit_cost) STORED,
  reference_type text, -- 'order', 'transfer', 'adjustment', etc.
  reference_id uuid,
  from_location_id uuid REFERENCES locations(id),
  to_location_id uuid REFERENCES locations(id),
  reason text,
  notes text,
  created_by uuid NOT NULL REFERENCES users(id),
  approved_by uuid REFERENCES users(id),
  movement_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stock_adjustments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_id uuid NOT NULL REFERENCES inventory(id) ON DELETE RESTRICT,
  adjustment_type text NOT NULL, -- 'increase', 'decrease', 'correction'
  quantity_before integer NOT NULL,
  quantity_after integer NOT NULL,
  adjustment_quantity integer GENERATED ALWAYS AS (quantity_after - quantity_before) STORED,
  reason text NOT NULL,
  notes text,
  created_by uuid NOT NULL REFERENCES users(id),
  approved_by uuid REFERENCES users(id),
  adjustment_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_adjustments ENABLE ROW LEVEL SECURITY;

-- Location Policies
CREATE POLICY "Users can read locations in their region"
  ON locations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND (region = locations.region OR 'admin' = ANY(permissions))
    )
  );

CREATE POLICY "Location managers can manage their locations"
  ON locations
  FOR ALL
  TO authenticated
  USING (
    manager_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND 'admin' = ANY(permissions)
    )
  );

-- Inventory Policies
CREATE POLICY "Users can read inventory in accessible locations"
  ON inventory
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM locations l
      JOIN users u ON u.id = auth.uid()
      WHERE l.id = inventory.location_id
      AND (u.region = l.region OR 'admin' = ANY(u.permissions))
    )
  );

CREATE POLICY "Inventory managers can manage inventory"
  ON inventory
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'inventory_manager' = ANY(permissions))
    )
  );

-- Movement Policies
CREATE POLICY "Users can read movements for accessible inventory"
  ON inventory_movements
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM inventory i
      JOIN locations l ON l.id = i.location_id
      JOIN users u ON u.id = auth.uid()
      WHERE i.id = inventory_movements.inventory_id
      AND (u.region = l.region OR 'admin' = ANY(u.permissions))
    )
  );

CREATE POLICY "Users can create movements"
  ON inventory_movements
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Adjustment Policies
CREATE POLICY "Users can read adjustments for accessible inventory"
  ON stock_adjustments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM inventory i
      JOIN locations l ON l.id = i.location_id
      JOIN users u ON u.id = auth.uid()
      WHERE i.id = stock_adjustments.inventory_id
      AND (u.region = l.region OR 'admin' = ANY(u.permissions))
    )
  );

CREATE POLICY "Authorized users can create adjustments"
  ON stock_adjustments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'inventory_manager' = ANY(permissions))
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_locations_region ON locations(region);
CREATE INDEX IF NOT EXISTS idx_locations_type ON locations(type);
CREATE INDEX IF NOT EXISTS idx_locations_manager ON locations(manager_id);
CREATE INDEX IF NOT EXISTS idx_locations_coordinates ON locations(latitude, longitude);

CREATE INDEX IF NOT EXISTS idx_inventory_product ON inventory(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_location ON inventory(location_id);
CREATE INDEX IF NOT EXISTS idx_inventory_stock_levels ON inventory(current_stock, min_stock_level);
CREATE INDEX IF NOT EXISTS idx_inventory_expiry ON inventory(expiry_date);

CREATE INDEX IF NOT EXISTS idx_movements_inventory ON inventory_movements(inventory_id);
CREATE INDEX IF NOT EXISTS idx_movements_type ON inventory_movements(movement_type);
CREATE INDEX IF NOT EXISTS idx_movements_date ON inventory_movements(movement_date);
CREATE INDEX IF NOT EXISTS idx_movements_reference ON inventory_movements(reference_type, reference_id);

CREATE INDEX IF NOT EXISTS idx_adjustments_inventory ON stock_adjustments(inventory_id);
CREATE INDEX IF NOT EXISTS idx_adjustments_date ON stock_adjustments(adjustment_date);

-- Update triggers
CREATE TRIGGER update_locations_updated_at 
  BEFORE UPDATE ON locations 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at 
  BEFORE UPDATE ON inventory 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_items_updated_at 
  BEFORE UPDATE ON order_items 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update inventory on movements
CREATE OR REPLACE FUNCTION process_inventory_movement()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.movement_type IN ('inbound', 'return') THEN
    UPDATE inventory 
    SET 
      current_stock = current_stock + NEW.quantity,
      last_movement_date = NEW.movement_date
    WHERE id = NEW.inventory_id;
  ELSIF NEW.movement_type IN ('outbound', 'damage', 'expired') THEN
    UPDATE inventory 
    SET 
      current_stock = GREATEST(0, current_stock - NEW.quantity),
      last_movement_date = NEW.movement_date
    WHERE id = NEW.inventory_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER process_inventory_movement_trigger
  AFTER INSERT ON inventory_movements
  FOR EACH ROW
  EXECUTE FUNCTION process_inventory_movement();

-- Function to process stock adjustments
CREATE OR REPLACE FUNCTION process_stock_adjustment()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE inventory 
  SET 
    current_stock = NEW.quantity_after,
    last_movement_date = NEW.adjustment_date
  WHERE id = NEW.inventory_id;
  
  -- Create corresponding movement record
  INSERT INTO inventory_movements (
    inventory_id,
    movement_type,
    quantity,
    unit_cost,
    reference_type,
    reference_id,
    reason,
    notes,
    created_by,
    movement_date
  ) VALUES (
    NEW.inventory_id,
    'adjustment',
    ABS(NEW.adjustment_quantity),
    0,
    'stock_adjustment',
    NEW.id,
    NEW.reason,
    NEW.notes,
    NEW.created_by,
    NEW.adjustment_date
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER process_stock_adjustment_trigger
  AFTER INSERT ON stock_adjustments
  FOR EACH ROW
  EXECUTE FUNCTION process_stock_adjustment();