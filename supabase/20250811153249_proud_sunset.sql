/*
  # Create Products Table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `sku` (text, unique, not null)
      - `category` (text, not null)
      - `subcategory` (text, nullable)
      - `brand` (text, not null)
      - `description` (text, nullable)
      - `unit_price` (numeric, not null)
      - `cost_price` (numeric, not null)
      - `margin` (numeric, computed)
      - `weight` (numeric, nullable)
      - `dimensions` (jsonb, nullable)
      - `barcode` (text, nullable)
      - `manufacturer` (text, nullable)
      - `supplier_id` (uuid, nullable)
      - `min_order_quantity` (integer, default 1)
      - `max_order_quantity` (integer, nullable)
      - `lead_time_days` (integer, default 7)
      - `shelf_life_days` (integer, nullable)
      - `storage_requirements` (text, nullable)
      - `regulatory_info` (jsonb, nullable)
      - `tags` (text array, default empty)
      - `is_active` (boolean, default true)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `products` table
    - Add policies for authenticated users to read products
    - Add policies for admins to manage products

  3. Indexes
    - Index on SKU for fast lookups
    - Index on category for filtering
    - Index on brand for brand queries
    - Full-text search index on name and description
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sku text UNIQUE NOT NULL,
  category text NOT NULL,
  subcategory text,
  brand text NOT NULL,
  description text,
  unit_price numeric NOT NULL CHECK (unit_price >= 0),
  cost_price numeric NOT NULL CHECK (cost_price >= 0),
  margin numeric GENERATED ALWAYS AS (
    CASE 
      WHEN cost_price > 0 THEN ((unit_price - cost_price) / cost_price * 100)
      ELSE 0 
    END
  ) STORED,
  weight numeric CHECK (weight >= 0),
  dimensions jsonb,
  barcode text,
  manufacturer text,
  supplier_id uuid,
  min_order_quantity integer DEFAULT 1 CHECK (min_order_quantity > 0),
  max_order_quantity integer CHECK (max_order_quantity >= min_order_quantity),
  lead_time_days integer DEFAULT 7 CHECK (lead_time_days >= 0),
  shelf_life_days integer CHECK (shelf_life_days > 0),
  storage_requirements text,
  regulatory_info jsonb,
  tags text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Authenticated users can read products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND 'admin' = ANY(permissions)
    )
  );

CREATE POLICY "Product managers can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND 'product_manager' = ANY(permissions)
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products(subcategory);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_tags ON products USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_products_search ON products USING GIN(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- Update trigger
CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();