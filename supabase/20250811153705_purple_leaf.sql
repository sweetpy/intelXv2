/*
  # Insert Sample Data for IntelX Platform

  1. Sample Data
    - Users with different roles and permissions
    - Customers across all Tanzania regions
    - Products for different industries
    - Locations (warehouses, distribution centers)
    - Sample orders and analytics data

  2. Data Quality
    - Realistic Tanzanian business data
    - Proper geographic distribution
    - Industry-appropriate product categories
    - Consistent naming conventions
*/

-- Insert sample users
INSERT INTO users (id, email, name, role, company, region, phone, permissions, mfa_enabled) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'admin@intellx.co.tz', 'John Mwangi', 'admin', 'intelX Tanzania', 'Dar es Salaam', '+255 123 456 789', ARRAY['admin', 'read', 'write', 'delete'], true),
  ('550e8400-e29b-41d4-a716-446655440002', 'sarah.kimani@intellx.co.tz', 'Sarah Kimani', 'analyst', 'intelX Tanzania', 'Mwanza', '+255 987 654 321', ARRAY['analyst', 'read', 'write'], false),
  ('550e8400-e29b-41d4-a716-446655440003', 'david.chen@intellx.co.tz', 'David Chen', 'sales_manager', 'intelX Tanzania', 'Arusha', '+255 456 789 123', ARRAY['sales_manager', 'sales', 'read', 'write'], false),
  ('550e8400-e29b-41d4-a716-446655440004', 'grace.mollel@intellx.co.tz', 'Grace Mollel', 'route_manager', 'intelX Tanzania', 'Dodoma', '+255 789 123 456', ARRAY['route_manager', 'read', 'write'], false),
  ('550e8400-e29b-41d4-a716-446655440005', 'james.kimani@intellx.co.tz', 'James Kimani', 'inventory_manager', 'intelX Tanzania', 'Mbeya', '+255 321 654 987', ARRAY['inventory_manager', 'read', 'write'], false)
ON CONFLICT (id) DO NOTHING;

-- Insert sample locations
INSERT INTO locations (id, name, type, address, region, district, latitude, longitude, capacity, manager_id, contact_phone, facilities, is_active) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Dar es Salaam Main Warehouse', 'warehouse', 'Nyerere Road, Dar es Salaam', 'Dar es Salaam', 'Ilala', -6.7924, 39.2083, 5000, '550e8400-e29b-41d4-a716-446655440001', '+255 123 456 789', ARRAY['cold_storage', 'loading_dock', 'security'], true),
  ('660e8400-e29b-41d4-a716-446655440002', 'Mwanza Distribution Center', 'distribution_center', 'Kenyatta Road, Mwanza', 'Mwanza', 'Ilemela', -2.5164, 32.9175, 3000, '550e8400-e29b-41d4-a716-446655440002', '+255 987 654 321', ARRAY['loading_dock', 'office_space'], true),
  ('660e8400-e29b-41d4-a716-446655440003', 'Arusha Regional Hub', 'distribution_center', 'Sokoine Road, Arusha', 'Arusha', 'Arusha Urban', -3.3869, 36.6830, 2500, '550e8400-e29b-41d4-a716-446655440003', '+255 456 789 123', ARRAY['cold_storage', 'office_space'], true),
  ('660e8400-e29b-41d4-a716-446655440004', 'Dodoma Central Depot', 'warehouse', 'Uhuru Avenue, Dodoma', 'Dodoma', 'Dodoma Urban', -6.1630, 35.7516, 2000, '550e8400-e29b-41d4-a716-446655440004', '+255 789 123 456', ARRAY['loading_dock'], true),
  ('660e8400-e29b-41d4-a716-446655440005', 'Mbeya Southern Warehouse', 'warehouse', 'Jacaranda Street, Mbeya', 'Mbeya', 'Mbeya Urban', -8.9094, 33.4607, 1800, '550e8400-e29b-41d4-a716-446655440005', '+255 321 654 987', ARRAY['cold_storage'], true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample customers
INSERT INTO customers (id, name, company, email, phone, address, region, district, latitude, longitude, customer_type, status, tier, credit_limit, account_manager_id, total_orders, total_revenue, satisfaction_score, tags) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', 'Michael Mwangi', 'Kilimanjaro Trading Co.', 'michael@kilimanjaro-trading.co.tz', '+255 123 456 789', 'Uhuru Street, Moshi', 'Kilimanjaro', 'Moshi Urban', -3.3398, 37.3407, 'distributor', 'active', 'platinum', 15000000, '550e8400-e29b-41d4-a716-446655440003', 156, 78000000, 4.8, ARRAY['fmcg', 'high-volume']),
  ('770e8400-e29b-41d4-a716-446655440002', 'Grace Mollel', 'Mwanza Medical Supplies', 'grace@mwanza-medical.co.tz', '+255 987 654 321', 'Kenyatta Road, Mwanza', 'Mwanza', 'Ilemela', -2.5164, 32.9175, 'wholesaler', 'active', 'gold', 8000000, '550e8400-e29b-41d4-a716-446655440002', 89, 45000000, 4.6, ARRAY['pharmaceuticals', 'medical']),
  ('770e8400-e29b-41d4-a716-446655440003', 'James Kimani', 'Dodoma Electronics Hub', 'james@dodoma-electronics.co.tz', '+255 456 789 123', 'Nyerere Avenue, Dodoma', 'Dodoma', 'Dodoma Urban', -6.1630, 35.7516, 'retailer', 'active', 'silver', 5000000, '550e8400-e29b-41d4-a716-446655440004', 67, 28000000, 4.2, ARRAY['electronics', 'consumer']),
  ('770e8400-e29b-41d4-a716-446655440004', 'Mary Kimani', 'Dar Pharmacy Network', 'mary@dar-pharmacy.co.tz', '+255 789 123 456', 'Samora Avenue, Dar es Salaam', 'Dar es Salaam', 'Ilala', -6.8161, 39.2803, 'pharmacy', 'active', 'gold', 6000000, '550e8400-e29b-41d4-a716-446655440001', 234, 67000000, 4.7, ARRAY['pharmaceuticals', 'healthcare']),
  ('770e8400-e29b-41d4-a716-446655440005', 'Peter Mwalimu', 'Arusha Supermarket Chain', 'peter@arusha-super.co.tz', '+255 321 654 987', 'Clock Tower, Arusha', 'Arusha', 'Arusha Urban', -3.3869, 36.6830, 'supermarket', 'active', 'platinum', 12000000, '550e8400-e29b-41d4-a716-446655440003', 189, 89000000, 4.9, ARRAY['fmcg', 'retail']),
  ('770e8400-e29b-41d4-a716-446655440006', 'Agnes Mwanza', 'Mbeya Agricultural Supplies', 'agnes@mbeya-agri.co.tz', '+255 654 321 789', 'Market Street, Mbeya', 'Mbeya', 'Mbeya Urban', -8.9094, 33.4607, 'distributor', 'active', 'silver', 4000000, '550e8400-e29b-41d4-a716-446655440005', 78, 32000000, 4.3, ARRAY['agriculture', 'farming']),
  ('770e8400-e29b-41d4-a716-446655440007', 'Daniel Msigwa', 'Tanga Coastal Distributors', 'daniel@tanga-coastal.co.tz', '+255 987 321 654', 'Independence Avenue, Tanga', 'Tanga', 'Tanga Urban', -5.0692, 39.0962, 'distributor', 'active', 'gold', 7000000, '550e8400-e29b-41d4-a716-446655440002', 123, 54000000, 4.5, ARRAY['coastal', 'fmcg']),
  ('770e8400-e29b-41d4-a716-446655440008', 'Fatuma Hassan', 'Zanzibar Island Traders', 'fatuma@zanzibar-traders.co.tz', '+255 456 987 321', 'Creek Road, Stone Town', 'Unguja', 'Mjini Magharibi', -6.1659, 39.2026, 'wholesaler', 'active', 'bronze', 3000000, '550e8400-e29b-41d4-a716-446655440001', 45, 18000000, 4.1, ARRAY['island', 'tourism']),
  ('770e8400-e29b-41d4-a716-446655440009', 'Robert Mwakasege', 'Tabora Central Supplies', 'robert@tabora-central.co.tz', '+255 789 456 123', 'Lumumba Street, Tabora', 'Tabora', 'Tabora Urban', -5.0167, 32.8000, 'retailer', 'active', 'silver', 4500000, '550e8400-e29b-41d4-a716-446655440004', 89, 38000000, 4.4, ARRAY['central', 'general']),
  ('770e8400-e29b-41d4-a716-446655440010', 'Elizabeth Mwenda', 'Kigoma Border Trading', 'elizabeth@kigoma-border.co.tz', '+255 321 789 456', 'Ujiji Road, Kigoma', 'Kigoma', 'Kigoma Urban', -4.8761, 29.6269, 'distributor', 'active', 'bronze', 2500000, '550e8400-e29b-41d4-a716-446655440002', 34, 15000000, 3.9, ARRAY['border', 'cross-border'])
ON CONFLICT (id) DO NOTHING;

-- Insert sample distributors
INSERT INTO distributors (id, customer_id, distributor_code, territory, coverage_area, warehouse_capacity, fleet_size, staff_count, contract_start, contract_end, commission_rate) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'KIL-001', ARRAY['Moshi Urban', 'Moshi Rural', 'Hai', 'Rombo'], 2500, 1200, 8, 25, '2023-01-01', '2025-12-31', 12.5),
  ('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440006', 'MBE-001', ARRAY['Mbeya Urban', 'Mbeya Rural', 'Rungwe', 'Kyela'], 3200, 800, 6, 18, '2023-06-01', '2025-05-31', 10.0),
  ('880e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440007', 'TAN-001', ARRAY['Tanga Urban', 'Muheza', 'Korogwe', 'Handeni'], 2800, 1000, 7, 22, '2022-03-15', '2025-03-14', 11.5),
  ('880e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440010', 'KIG-001', ARRAY['Kigoma Urban', 'Kasulu', 'Kibondo'], 1800, 600, 4, 12, '2023-09-01', '2024-08-31', 8.5)
ON CONFLICT (id) DO NOTHING;

-- Insert sample products
INSERT INTO products (id, name, sku, category, subcategory, brand, description, unit_price, cost_price, weight, min_order_quantity, lead_time_days, tags, is_active) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', 'Premium Rice 25kg', 'RICE-25-001', 'FMCG', 'Food & Beverages', 'Kilombero', 'High quality aromatic rice from Kilombero valley', 45000, 35000, 25, 10, 7, ARRAY['rice', 'food', 'staple'], true),
  ('990e8400-e29b-41d4-a716-446655440002', 'Paracetamol 500mg (100 tablets)', 'MED-PARA-500', 'Pharmaceuticals', 'Pain Relief', 'Shelys', 'Pain relief medication for adults', 5000, 3500, 0.2, 50, 14, ARRAY['medicine', 'pain-relief', 'otc'], true),
  ('990e8400-e29b-41d4-a716-446655440003', 'Samsung Galaxy A54 5G', 'PHONE-SAM-A54', 'Electronics', 'Mobile Phones', 'Samsung', 'Latest 5G smartphone with advanced camera', 850000, 650000, 0.5, 1, 21, ARRAY['smartphone', '5g', 'electronics'], true),
  ('990e8400-e29b-41d4-a716-446655440004', 'NPK Fertilizer 50kg', 'FERT-NPK-50', 'Agriculture', 'Fertilizers', 'Yara', 'Balanced NPK fertilizer for crop nutrition', 75000, 55000, 50, 5, 10, ARRAY['fertilizer', 'agriculture', 'npk'], true),
  ('990e8400-e29b-41d4-a716-446655440005', 'Cooking Oil 5L', 'OIL-COOK-5L', 'FMCG', 'Food & Beverages', 'Kimbo', 'Premium cooking oil for households', 18000, 14000, 5, 20, 5, ARRAY['cooking-oil', 'food', 'household'], true),
  ('990e8400-e29b-41d4-a716-446655440006', 'Amoxicillin 250mg Capsules', 'MED-AMOX-250', 'Pharmaceuticals', 'Antibiotics', 'Zenufa', 'Antibiotic for bacterial infections', 8000, 6000, 0.1, 100, 14, ARRAY['antibiotic', 'prescription', 'medicine'], true),
  ('990e8400-e29b-41d4-a716-446655440007', 'Solar Panel 100W', 'SOLAR-100W', 'Electronics', 'Solar Equipment', 'Jinko Solar', 'Monocrystalline solar panel for off-grid power', 180000, 140000, 8, 1, 30, ARRAY['solar', 'renewable', 'energy'], true),
  ('990e8400-e29b-41d4-a716-446655440008', 'Maize Seeds Hybrid', 'SEED-MAIZE-H1', 'Agriculture', 'Seeds', 'Kenya Seed', 'High-yield hybrid maize seeds', 25000, 18000, 2, 10, 14, ARRAY['seeds', 'maize', 'hybrid'], true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample inventory
INSERT INTO inventory (id, product_id, location_id, current_stock, min_stock_level, max_stock_level, reorder_point, reorder_quantity, cost_per_unit) VALUES
  ('aa0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 1250, 500, 2000, 750, 500, 35000),
  ('aa0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', 2500, 1000, 5000, 1500, 1000, 3500),
  ('aa0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', 45, 20, 100, 30, 25, 650000),
  ('aa0e8400-e29b-41d4-a716-446655440004', '990e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440005', 180, 50, 300, 75, 50, 55000),
  ('aa0e8400-e29b-41d4-a716-446655440005', '990e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440002', 890, 200, 1000, 300, 200, 14000)
ON CONFLICT (id) DO NOTHING;

-- Insert sample leads
INSERT INTO leads (id, name, company, email, phone, region, industry, source, status, estimated_value, assigned_to, notes, tags) VALUES
  ('bb0e8400-e29b-41d4-a716-446655440001', 'Joseph Mwenda', 'Iringa Agricultural Co-op', 'joseph@iringa-agri.co.tz', '+255 123 789 456', 'Iringa', 'Agriculture', 'Referral', 'qualified', 4500000, '550e8400-e29b-41d4-a716-446655440003', 'Interested in fertilizer distribution partnership', ARRAY['agriculture', 'cooperative', 'fertilizer']),
  ('bb0e8400-e29b-41d4-a716-446655440002', 'Amina Juma', 'Coastal Pharmaceuticals Ltd', 'amina@coastal-pharma.co.tz', '+255 987 456 123', 'Mtwara', 'Pharmaceuticals', 'Website', 'proposal', 6200000, '550e8400-e29b-41d4-a716-446655440002', 'Expanding medical supply chain to southern regions', ARRAY['pharmaceuticals', 'expansion', 'coastal']),
  ('bb0e8400-e29b-41d4-a716-446655440003', 'Hassan Mbwana', 'Northern Electronics', 'hassan@northern-electronics.co.tz', '+255 456 123 789', 'Arusha', 'Electronics', 'Trade Show', 'negotiation', 8500000, '550e8400-e29b-41d4-a716-446655440003', 'Large electronics retailer looking for distribution partnership', ARRAY['electronics', 'retail', 'northern']),
  ('bb0e8400-e29b-41d4-a716-446655440004', 'Rehema Ally', 'Lake Zone Traders', 'rehema@lakezone.co.tz', '+255 789 654 321', 'Mwanza', 'FMCG', 'Cold Call', 'contacted', 3200000, '550e8400-e29b-41d4-a716-446655440002', 'FMCG distribution around Lake Victoria region', ARRAY['fmcg', 'lake-zone', 'distribution'])
ON CONFLICT (id) DO NOTHING;

-- Insert sample analytics data
INSERT INTO analytics_data (metric_name, metric_value, metric_unit, dimension_1, dimension_2, region, date_recorded, data_source, confidence_score) VALUES
  ('market_penetration', 68.5, 'percentage', 'FMCG', 'all_channels', 'Dar es Salaam', now() - interval '1 day', 'sales_system', 95),
  ('market_penetration', 64.3, 'percentage', 'FMCG', 'all_channels', 'Mwanza', now() - interval '1 day', 'sales_system', 92),
  ('market_penetration', 76.8, 'percentage', 'FMCG', 'all_channels', 'Arusha', now() - interval '1 day', 'sales_system', 94),
  ('route_efficiency', 92.3, 'percentage', 'all_routes', 'all_vehicles', 'Dar es Salaam', now() - interval '1 day', 'logistics_system', 98),
  ('customer_satisfaction', 4.7, 'rating', 'all_customers', 'all_regions', null, now() - interval '1 day', 'crm_system', 89),
  ('inventory_turnover', 8.5, 'times_per_year', 'all_products', 'all_locations', null, now() - interval '1 day', 'inventory_system', 91),
  ('delivery_success_rate', 94.2, 'percentage', 'all_deliveries', 'all_routes', null, now() - interval '1 day', 'logistics_system', 97),
  ('cost_per_delivery', 12500, 'tsh', 'all_deliveries', 'all_routes', null, now() - interval '1 day', 'logistics_system', 93)
ON CONFLICT DO NOTHING;

-- Insert sample intelligence files
INSERT INTO intelligence_files (id, name, file_type, file_size, category, uploaded_by, analysis_status, ai_tags, summary, key_findings, actionable_items, confidence_score, relevance_score) VALUES
  ('cc0e8400-e29b-41d4-a716-446655440001', 'Tanzania Market Research Report 2024', 'application/pdf', 15728640, 'market-research', '550e8400-e29b-41d4-a716-446655440002', 'completed', ARRAY['market-analysis', 'consumer-behavior', 'growth-trends'], 'Comprehensive analysis of Tanzania consumer market with focus on FMCG sector growth opportunities', ARRAY['Rural market penetration below 35%', 'Mobile payment adoption driving e-commerce', 'Youth demographic represents 60% of purchasing power'], ARRAY['Develop rural distribution strategy', 'Invest in mobile payment integration', 'Create youth-focused product lines'], 94, 98),
  ('cc0e8400-e29b-41d4-a716-446655440002', 'Competitor Analysis East Africa FMCG', 'application/pdf', 9175040, 'competitor-intel', '550e8400-e29b-41d4-a716-446655440003', 'completed', ARRAY['competitor-analysis', 'market-share', 'pricing-strategy'], 'Deep dive into competitive landscape across East Africa with focus on distribution strategies', ARRAY['Top 3 competitors control 68% market share', 'Price wars intensifying in urban markets', 'Digital transformation accelerating'], ARRAY['Develop counter-competitive strategy', 'Accelerate digital transformation', 'Focus on underserved segments'], 91, 95),
  ('cc0e8400-e29b-41d4-a716-446655440003', 'Consumer Behavior Study Urban vs Rural', 'application/pdf', 23068672, 'consumer-insights', '550e8400-e29b-41d4-a716-446655440002', 'completed', ARRAY['consumer-behavior', 'urban-rural-divide', 'purchasing-patterns'], 'Comprehensive study comparing urban and rural consumer behaviors across Tanzania', ARRAY['Rural consumers prefer bulk purchasing', 'Brand loyalty higher in rural areas', 'Mobile payments growing 45% annually'], ARRAY['Develop bulk packaging for rural markets', 'Strengthen rural brand presence', 'Integrate mobile payment solutions'], 88, 92)
ON CONFLICT (id) DO NOTHING;

-- Insert sample AI insights
INSERT INTO ai_insights (id, file_id, insight_type, title, description, confidence, impact, timeframe, priority, action_items, related_files) VALUES
  ('dd0e8400-e29b-41d4-a716-446655440001', 'cc0e8400-e29b-41d4-a716-446655440001', 'opportunity', 'Untapped Rural Market Potential', 'AI analysis reveals 32% untapped market potential in rural Tanzania, particularly in Mbeya and Rukwa regions', 89, 'high', 'Q2-Q3 2024', 1, ARRAY['Conduct rural market entry study', 'Identify local distribution partners'], ARRAY['cc0e8400-e29b-41d4-a716-446655440002']),
  ('dd0e8400-e29b-41d4-a716-446655440002', 'cc0e8400-e29b-41d4-a716-446655440002', 'threat', 'Aggressive Competitor Expansion', 'Major competitor planning 40% distribution network expansion in Mwanza and Tabora regions', 85, 'high', 'Next 6 months', 1, ARRAY['Accelerate market entry in target regions', 'Strengthen distributor partnerships'], ARRAY['cc0e8400-e29b-41d4-a716-446655440001']),
  ('dd0e8400-e29b-41d4-a716-446655440003', 'cc0e8400-e29b-41d4-a716-446655440003', 'trend', 'Rural Digital Payment Adoption', 'Rural consumers showing 45% increase in mobile payment usage, creating new distribution opportunities', 87, 'medium', 'Ongoing trend', 2, ARRAY['Develop mobile-first rural strategy', 'Partner with mobile payment providers'], ARRAY['cc0e8400-e29b-41d4-a716-446655440001'])
ON CONFLICT (id) DO NOTHING;

-- Insert sample vehicles
INSERT INTO vehicles (id, vehicle_number, vehicle_type, make, model, year, capacity_kg, capacity_m3, fuel_type, fuel_efficiency, status) VALUES
  ('ee0e8400-e29b-41d4-a716-446655440001', 'TZ-001-DAR', 'Truck', 'Isuzu', 'NPR', 2022, 3000, 15, 'Diesel', 8.5, 'available'),
  ('ee0e8400-e29b-41d4-a716-446655440002', 'TZ-002-MWZ', 'Van', 'Toyota', 'Hiace', 2021, 1500, 8, 'Petrol', 12.0, 'available'),
  ('ee0e8400-e29b-41d4-a716-446655440003', 'TZ-003-ARU', 'Truck', 'Mitsubishi', 'Canter', 2023, 2500, 12, 'Diesel', 9.2, 'in_transit'),
  ('ee0e8400-e29b-41d4-a716-446655440004', 'TZ-004-DOD', 'Van', 'Nissan', 'NV200', 2020, 1200, 6, 'Petrol', 11.5, 'available')
ON CONFLICT (id) DO NOTHING;

-- Insert sample routes
INSERT INTO routes (id, name, route_code, region, start_location, end_location, total_distance, estimated_duration, vehicle_type, status, optimization_score, cost_per_km, frequency) VALUES
  ('ff0e8400-e29b-41d4-a716-446655440001', 'Dar es Salaam Central Route', 'DAR-CENTRAL-01', 'Dar es Salaam', 'Main Warehouse', 'City Center', 45, 180, 'Van', 'active', 92, 850, 'daily'),
  ('ff0e8400-e29b-41d4-a716-446655440002', 'Mwanza Lake Circuit', 'MWZ-LAKE-01', 'Mwanza', 'Distribution Center', 'Lake Zone', 120, 360, 'Truck', 'active', 87, 950, 'weekly'),
  ('ff0e8400-e29b-41d4-a716-446655440003', 'Arusha Northern Corridor', 'ARU-NORTH-01', 'Arusha', 'Regional Hub', 'Northern Districts', 85, 240, 'Truck', 'active', 89, 900, 'bi-weekly'),
  ('ff0e8400-e29b-41d4-a716-446655440004', 'Dodoma Capital Route', 'DOD-CAP-01', 'Dodoma', 'Central Depot', 'Government District', 35, 120, 'Van', 'active', 94, 800, 'weekly')
ON CONFLICT (id) DO NOTHING;

-- Insert sample orders
INSERT INTO orders (id, order_number, customer_id, status, total_amount, delivery_address, created_by) VALUES
  ('110e8400-e29b-41d4-a716-446655440001', '2024-000001', '770e8400-e29b-41d4-a716-446655440001', 'delivered', 2250000, 'Uhuru Street, Moshi, Kilimanjaro', '550e8400-e29b-41d4-a716-446655440003'),
  ('110e8400-e29b-41d4-a716-446655440002', '2024-000002', '770e8400-e29b-41d4-a716-446655440002', 'shipped', 1750000, 'Kenyatta Road, Mwanza', '550e8400-e29b-41d4-a716-446655440002'),
  ('110e8400-e29b-41d4-a716-446655440003', '2024-000003', '770e8400-e29b-41d4-a716-446655440004', 'processing', 3400000, 'Samora Avenue, Dar es Salaam', '550e8400-e29b-41d4-a716-446655440001')
ON CONFLICT (id) DO NOTHING;

-- Insert sample order items
INSERT INTO order_items (id, order_id, product_id, quantity, unit_price) VALUES
  ('120e8400-e29b-41d4-a716-446655440001', '110e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 50, 45000),
  ('120e8400-e29b-41d4-a716-446655440002', '110e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440002', 350, 5000),
  ('120e8400-e29b-41d4-a716-446655440003', '110e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440003', 4, 850000)
ON CONFLICT (id) DO NOTHING;

-- Insert sample performance benchmarks
INSERT INTO performance_benchmarks (metric_name, industry, region, benchmark_type, value, unit, data_source, collection_date) VALUES
  ('market_penetration', 'FMCG', 'Dar es Salaam', 'industry_average', 52.3, 'percentage', 'Industry Association', '2024-01-01'),
  ('market_penetration', 'FMCG', 'Dar es Salaam', 'top_quartile', 78.2, 'percentage', 'Industry Association', '2024-01-01'),
  ('route_efficiency', 'Logistics', null, 'industry_average', 85.7, 'percentage', 'Logistics Council', '2024-01-01'),
  ('route_efficiency', 'Logistics', null, 'best_in_class', 96.1, 'percentage', 'Logistics Council', '2024-01-01'),
  ('customer_satisfaction', 'All', null, 'industry_average', 4.2, 'rating', 'Customer Survey', '2024-01-01'),
  ('inventory_turnover', 'FMCG', null, 'industry_average', 9.2, 'times_per_year', 'Supply Chain Institute', '2024-01-01')
ON CONFLICT DO NOTHING;

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, category, description, is_public, is_editable) VALUES
  ('platform_name', '"intelX"', 'string', 'branding', 'Platform display name', true, false),
  ('default_currency', '"TSh"', 'string', 'localization', 'Default currency for the platform', true, true),
  ('default_language', '"en"', 'string', 'localization', 'Default language for the platform', true, true),
  ('session_timeout', '1800', 'number', 'security', 'Session timeout in seconds', false, true),
  ('max_file_upload_size', '52428800', 'number', 'system', 'Maximum file upload size in bytes (50MB)', false, true),
  ('enable_ai_features', 'true', 'boolean', 'features', 'Enable AI-powered features', true, true),
  ('enable_real_time_updates', 'true', 'boolean', 'features', 'Enable real-time data updates', true, true),
  ('supported_regions', '["Dar es Salaam", "Mwanza", "Arusha", "Dodoma", "Mbeya", "Morogoro", "Tanga", "Kilimanjaro", "Tabora", "Kigoma", "Shinyanga", "Kagera", "Mtwara", "Ruvuma", "Iringa", "Lindi", "Singida", "Rukwa", "Katavi", "Njombe", "Simiyu", "Geita", "Songwe", "Manyara", "Pemba", "Unguja"]', 'array', 'geography', 'Supported Tanzania regions', true, false),
  ('supported_industries', '["FMCG", "Pharmaceuticals", "Agriculture", "Electronics", "Telecommunications", "Financial Services", "Manufacturing"]', 'array', 'business', 'Supported industry categories', true, true)
ON CONFLICT (setting_key) DO NOTHING;