/*
  # Seed Test Users for intelX Platform
  
  1. Purpose
    - Create test users for authentication and testing
    - Seed demo data for immediate platform usage
    
  2. Users Created
    - Admin user (admin@intellx.co.tz)
    - Manager user (manager@intellx.co.tz)
    - Analyst user (analyst@intellx.co.tz)
    - Standard user (user@intellx.co.tz)
    
  3. Security
    - Users table entries only (auth.users handled separately)
    - All users have proper roles and permissions
*/

-- Insert test users into the users table
INSERT INTO users (id, email, name, role, company, region, phone, permissions, mfa_enabled)
VALUES
  (
    'a1b2c3d4-e5f6-4a5b-8c7d-9e8f7a6b5c4d',
    'admin@intellx.co.tz',
    'John Mwangi',
    'admin',
    'intelX Tanzania',
    'Dar es Salaam',
    '+255712345678',
    ARRAY['read', 'write', 'delete', 'admin'],
    false
  ),
  (
    'b2c3d4e5-f6a7-4b5c-8d7e-9f8a7b6c5d4e',
    'manager@intellx.co.tz',
    'Sarah Kimani',
    'manager',
    'East Africa Distributors',
    'Mwanza',
    '+255723456789',
    ARRAY['read', 'write', 'export'],
    false
  ),
  (
    'c3d4e5f6-a7b8-4c5d-8e7f-9a8b7c6d5e4f',
    'analyst@intellx.co.tz',
    'David Omondi',
    'analyst',
    'Market Analytics Ltd',
    'Arusha',
    '+255734567890',
    ARRAY['read', 'analyze', 'report'],
    false
  ),
  (
    'd4e5f6a7-b8c9-4d5e-8f7a-9b8c7d6e5f4a',
    'user@intellx.co.tz',
    'Grace Njeri',
    'user',
    'Tanzania Distributors',
    'Dodoma',
    '+255745678901',
    ARRAY['read'],
    false
  )
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  company = EXCLUDED.company,
  region = EXCLUDED.region,
  updated_at = now();

-- Update last_login for all users
UPDATE users SET last_login = now() WHERE email IN (
  'admin@intellx.co.tz',
  'manager@intellx.co.tz',
  'analyst@intellx.co.tz',
  'user@intellx.co.tz'
);
