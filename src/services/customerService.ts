import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Customer = Database['public']['Tables']['customers']['Row'];
type CustomerInsert = Database['public']['Tables']['customers']['Insert'];
type CustomerUpdate = Database['public']['Tables']['customers']['Update'];

export class CustomerService {
  // Get all customers with optional filtering
  static async getCustomers(filters?: {
    region?: string;
    customer_type?: string;
    status?: string;
    search?: string;
  }): Promise<Customer[]> {
    let query = supabase
      .from('customers')
      .select(`
        *,
        account_manager:users!customers_account_manager_id_fkey(name, email),
        distributor:distributors(*)
      `);

    if (filters?.region && filters.region !== 'all') {
      query = query.eq('region', filters.region);
    }

    if (filters?.customer_type && filters.customer_type !== 'all') {
      query = query.eq('customer_type', filters.customer_type);
    }

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,company.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  // Get customer by ID
  static async getCustomerById(id: string): Promise<Customer | null> {
    const { data, error } = await supabase
      .from('customers')
      .select(`
        *,
        account_manager:users!customers_account_manager_id_fkey(name, email),
        distributor:distributors(*),
        orders(id, order_number, status, total_amount, order_date)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Create new customer
  static async createCustomer(customerData: CustomerInsert): Promise<Customer> {
    const { data, error } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update customer
  static async updateCustomer(id: string, updates: CustomerUpdate): Promise<Customer> {
    const { data, error } = await supabase
      .from('customers')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Bulk upload customers
  static async bulkUploadCustomers(customers: CustomerInsert[]): Promise<Customer[]> {
    const { data, error } = await supabase
      .from('customers')
      .insert(customers)
      .select();

    if (error) throw error;
    return data || [];
  }

  // Get customers by region with geo data
  static async getCustomersByRegion(region: string): Promise<Customer[]> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('region', region)
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
      .eq('status', 'active');

    if (error) throw error;
    return data || [];
  }

  // Get customer statistics
  static async getCustomerStats(): Promise<{
    total: number;
    active: number;
    byRegion: Record<string, number>;
    byType: Record<string, number>;
    byTier: Record<string, number>;
  }> {
    const { data, error } = await supabase
      .from('customers')
      .select('region, customer_type, status, tier');

    if (error) throw error;

    const stats = {
      total: data?.length || 0,
      active: data?.filter(c => c.status === 'active').length || 0,
      byRegion: {} as Record<string, number>,
      byType: {} as Record<string, number>,
      byTier: {} as Record<string, number>
    };

    data?.forEach(customer => {
      // Count by region
      stats.byRegion[customer.region] = (stats.byRegion[customer.region] || 0) + 1;
      
      // Count by type
      stats.byType[customer.customer_type] = (stats.byType[customer.customer_type] || 0) + 1;
      
      // Count by tier
      stats.byTier[customer.tier] = (stats.byTier[customer.tier] || 0) + 1;
    });

    return stats;
  }

  // Search customers with advanced filters
  static async searchCustomers(searchTerm: string, filters?: {
    region?: string;
    customer_type?: string;
    tier?: string;
  }): Promise<Customer[]> {
    let query = supabase
      .from('customers')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,company.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);

    if (filters?.region) {
      query = query.eq('region', filters.region);
    }

    if (filters?.customer_type) {
      query = query.eq('customer_type', filters.customer_type);
    }

    if (filters?.tier) {
      query = query.eq('tier', filters.tier);
    }

    const { data, error } = await query.limit(50);
    
    if (error) throw error;
    return data || [];
  }

  // Get nearby customers using coordinates
  static async getNearbyCustomers(
    latitude: number, 
    longitude: number, 
    radiusKm: number = 10
  ): Promise<Customer[]> {
    // Using PostGIS-style distance calculation
    const { data, error } = await supabase.rpc('get_nearby_customers', {
      center_lat: latitude,
      center_lng: longitude,
      radius_km: radiusKm
    });

    if (error) {
      // Fallback to simple coordinate filtering if RPC function doesn't exist
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('customers')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)
        .gte('latitude', latitude - (radiusKm / 111)) // Rough conversion
        .lte('latitude', latitude + (radiusKm / 111))
        .gte('longitude', longitude - (radiusKm / 111))
        .lte('longitude', longitude + (radiusKm / 111));

      if (fallbackError) throw fallbackError;
      return fallbackData || [];
    }

    return data || [];
  }

  // Export customers to CSV
  static async exportCustomers(filters?: Record<string, any>): Promise<string> {
    const customers = await this.getCustomers(filters);
    
    const headers = [
      'Name', 'Company', 'Email', 'Phone', 'Address', 'Region', 'District', 
      'Customer Type', 'Status', 'Tier', 'Total Revenue', 'Total Orders',
      'Satisfaction Score', 'Registration Date', 'Latitude', 'Longitude'
    ];
    
    const csvContent = [
      headers.join(','),
      ...customers.map(customer => [
        customer.name,
        customer.company,
        customer.email || '',
        customer.phone || '',
        customer.address || '',
        customer.region,
        customer.district || '',
        customer.customer_type,
        customer.status,
        customer.tier,
        customer.total_revenue,
        customer.total_orders,
        customer.satisfaction_score || '',
        customer.registration_date,
        customer.latitude || '',
        customer.longitude || ''
      ].map(field => `"${field}"`).join(','))
    ].join('\n');
    
    return csvContent;
  }

  // Validate customer data
  static validateCustomerData(customerData: Partial<CustomerInsert>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!customerData.name?.trim()) {
      errors.push('Customer name is required');
    }

    if (!customerData.company?.trim()) {
      errors.push('Company name is required');
    }

    if (!customerData.region?.trim()) {
      errors.push('Region is required');
    }

    if (customerData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      errors.push('Invalid email format');
    }

    if (customerData.phone && !/^\+255[67]\d{8}$/.test(customerData.phone.replace(/\s/g, ''))) {
      errors.push('Invalid Tanzania phone number format');
    }

    if (customerData.latitude && (customerData.latitude < -12 || customerData.latitude > -1)) {
      errors.push('Latitude must be within Tanzania bounds');
    }

    if (customerData.longitude && (customerData.longitude < 29 || customerData.longitude > 41)) {
      errors.push('Longitude must be within Tanzania bounds');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}