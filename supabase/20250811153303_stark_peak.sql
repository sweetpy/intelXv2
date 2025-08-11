/*
  # Create Orders and Order Items Tables

  1. New Tables
    - `orders`
      - Complete order management with status tracking
      - Payment and delivery information
      - Audit trail for order lifecycle
    - `order_items`
      - Line items for each order
      - Product quantities and pricing
      - Discount and total calculations

  2. Security
    - Enable RLS on both tables
    - Add policies for order access control
    - Ensure users can only access their relevant orders

  3. Business Logic
    - Automatic order number generation
    - Order total calculations
    - Status transition validation
*/

-- Create order status enum
DO $$ BEGIN
  CREATE TYPE order_status AS ENUM ('draft', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create payment status enum
DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'partial', 'paid', 'overdue');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  distributor_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  status order_status DEFAULT 'draft',
  order_date timestamptz DEFAULT now(),
  delivery_date timestamptz,
  total_amount numeric DEFAULT 0 CHECK (total_amount >= 0),
  discount_amount numeric DEFAULT 0 CHECK (discount_amount >= 0),
  tax_amount numeric DEFAULT 0 CHECK (tax_amount >= 0),
  shipping_cost numeric DEFAULT 0 CHECK (shipping_cost >= 0),
  payment_status payment_status DEFAULT 'pending',
  payment_method text,
  delivery_address text NOT NULL,
  delivery_coordinates jsonb,
  special_instructions text,
  created_by uuid NOT NULL REFERENCES users(id),
  approved_by uuid REFERENCES users(id),
  shipped_by uuid REFERENCES users(id),
  delivered_by uuid REFERENCES users(id),
  tracking_number text,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric NOT NULL CHECK (unit_price >= 0),
  discount_percentage numeric DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  line_total numeric GENERATED ALWAYS AS (
    quantity * unit_price * (1 - discount_percentage / 100)
  ) STORED,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Order Policies
CREATE POLICY "Users can read orders in their region"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM customers c
      JOIN users u ON u.id = auth.uid()
      WHERE c.id = orders.customer_id
      AND (u.region = c.region OR 'admin' = ANY(u.permissions))
    )
  );

CREATE POLICY "Users can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND ('admin' = ANY(permissions) OR 'order_manager' = ANY(permissions))
    )
  );

-- Order Items Policies
CREATE POLICY "Users can read order items for accessible orders"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders o
      JOIN customers c ON c.id = o.customer_id
      JOIN users u ON u.id = auth.uid()
      WHERE o.id = order_items.order_id
      AND (u.region = c.region OR 'admin' = ANY(u.permissions))
    )
  );

CREATE POLICY "Users can manage order items for their orders"
  ON order_items
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders o
      WHERE o.id = order_items.order_id
      AND (
        o.created_by = auth.uid() OR
        EXISTS (
          SELECT 1 FROM users 
          WHERE id = auth.uid() 
          AND ('admin' = ANY(permissions) OR 'order_manager' = ANY(permissions))
        )
      )
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_distributor ON orders(distributor_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_date ON orders(order_date);
CREATE INDEX IF NOT EXISTS idx_orders_created_by ON orders(created_by);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

-- Update triggers
CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_items_updated_at 
  BEFORE UPDATE ON order_items 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
DECLARE
  new_number text;
  year_part text;
  sequence_part text;
BEGIN
  year_part := EXTRACT(YEAR FROM CURRENT_DATE)::text;
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 6) AS integer)), 0) + 1
  INTO sequence_part
  FROM orders
  WHERE order_number LIKE year_part || '-%';
  
  new_number := year_part || '-' || LPAD(sequence_part, 6, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Function to update order totals
CREATE OR REPLACE FUNCTION update_order_totals()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE orders 
  SET total_amount = (
    SELECT COALESCE(SUM(line_total), 0)
    FROM order_items 
    WHERE order_id = COALESCE(NEW.order_id, OLD.order_id)
  )
  WHERE id = COALESCE(NEW.order_id, OLD.order_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_order_totals_trigger
  AFTER INSERT OR UPDATE OR DELETE ON order_items
  FOR EACH ROW
  EXECUTE FUNCTION update_order_totals();

-- Function to update customer metrics when orders change
CREATE OR REPLACE FUNCTION update_customer_order_metrics()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE customers 
  SET 
    total_orders = (
      SELECT COUNT(*) 
      FROM orders 
      WHERE customer_id = COALESCE(NEW.customer_id, OLD.customer_id)
      AND status = 'delivered'
    ),
    total_revenue = (
      SELECT COALESCE(SUM(total_amount), 0)
      FROM orders 
      WHERE customer_id = COALESCE(NEW.customer_id, OLD.customer_id)
      AND status = 'delivered'
    ),
    last_order_date = (
      SELECT MAX(order_date)::date
      FROM orders 
      WHERE customer_id = COALESCE(NEW.customer_id, OLD.customer_id)
      AND status = 'delivered'
    )
  WHERE id = COALESCE(NEW.customer_id, OLD.customer_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_customer_order_metrics_trigger
  AFTER INSERT OR UPDATE OR DELETE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_order_metrics();