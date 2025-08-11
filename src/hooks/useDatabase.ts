import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { dbClient } from '../lib/dbClient';
import type { Database } from '../lib/database.types';

type Tables = Database['public']['Tables'];
type Customer = Tables['customers']['Row'];
type Product = Tables['products']['Row'];
type Order = Tables['orders']['Row'];
type Lead = Tables['leads']['Row'];
type Distributor = Tables['distributors']['Row'];

export const useDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generic database operations
  const executeQuery = useCallback(async <T>(
    operation: () => Promise<T>
  ): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await operation();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Database operation failed';
      setError(errorMessage);
      console.error('Database error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Customer operations
  const customers = {
    getAll: useCallback(async (filters?: Record<string, any>) => {
      return executeQuery(async () => {
        let query = supabase
          .from('customers')
          .select(`
            *,
            account_manager:users!customers_account_manager_id_fkey(name, email)
          `);
        
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
              query = query.eq(key, value);
            }
          });
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        return data;
      });
    }, [executeQuery]),

    getById: useCallback(async (id: string) => {
      return executeQuery(async () => {
        const { data, error } = await supabase
          .from('customers')
          .select(`
            *,
            account_manager:users!customers_account_manager_id_fkey(name, email),
            distributor:distributors(*)
          `)
          .eq('id', id)
          .single();
        
        if (error) throw error;
        return data;
      });
    }, [executeQuery]),

    create: useCallback(async (customerData: Tables['customers']['Insert']) => {
      return executeQuery(async () =>
        dbClient.create<Tables['customers']['Row']>('customers', customerData)
      );
    }, [executeQuery]),

    update: useCallback(async (id: string, updates: Tables['customers']['Update']) => {
      return executeQuery(async () =>
        dbClient.update<Tables['customers']['Row']>('customers', id, updates)
      );
    }, [executeQuery]),

    bulkUpload: useCallback(async (customers: Tables['customers']['Insert'][]) => {
      return executeQuery(async () => {
        const { data, error } = await supabase
          .from('customers')
          .insert(customers)
          .select();
        
        if (error) throw error;
        return data;
      });
    }, [executeQuery]),

    getByRegion: useCallback(async (region: string) => {
      return executeQuery(async () => {
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('region', region)
          .eq('status', 'active');
        
        if (error) throw error;
        return data;
      });
    }, [executeQuery])
  };

  // Product operations
  const products = {
    getAll: useCallback(async (filters?: Record<string, any>) => {
      return executeQuery(async () => {
        let query = supabase.from('products').select('*');
        
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
              query = query.eq(key, value);
            }
          });
        }
        
        const { data, error } = await query.order('name');
        if (error) throw error;
        return data;
      });
    }, [executeQuery]),

    getById: useCallback(async (id: string) => {
      return executeQuery(async () => {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        return data;
      });
    }, [executeQuery]),

    create: useCallback(async (productData: Tables['products']['Insert']) => {
      return executeQuery(async () =>
        dbClient.create<Tables['products']['Row']>('products', productData)
      );
    }, [executeQuery])
  };

  // Order operations
  const orders = {
    getAll: useCallback(async (filters?: Record<string, any>) => {
      return executeQuery(async () => {
        let query = supabase
          .from('orders')
          .select(`
            *,
            customer:customers(name, company, region),
            order_items(
              *,
              product:products(name, sku, unit_price)
            )
          `);
        
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
              query = query.eq(key, value);
            }
          });
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        return data;
      });
    }, [executeQuery]),

    create: useCallback(async (orderData: Tables['orders']['Insert'], items: Tables['order_items']['Insert'][]) => {
      return executeQuery(async () => {
        // Start transaction
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert(orderData)
          .select()
          .single();
        
        if (orderError) throw orderError;
        
        // Insert order items
        const itemsWithOrderId = items.map(item => ({
          ...item,
          order_id: order.id
        }));
        
        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(itemsWithOrderId);
        
        if (itemsError) throw itemsError;
        
        return order;
      });
    }, [executeQuery])
  };

  // Lead operations
  const leads = {
    getAll: useCallback(async (filters?: Record<string, any>) => {
      return executeQuery(async () => {
        let query = supabase
          .from('leads')
          .select(`
            *,
            assigned_user:users!leads_assigned_to_fkey(name, email)
          `);
        
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
              query = query.eq(key, value);
            }
          });
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        return data;
      });
    }, [executeQuery]),

    create: useCallback(async (leadData: Tables['leads']['Insert']) => {
      return executeQuery(async () => {
        const { data, error } = await supabase
          .from('leads')
          .insert(leadData)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      });
    }, [executeQuery]),

    convertToCustomer: useCallback(async (leadId: string, customerData: Tables['customers']['Insert']) => {
      return executeQuery(async () => {
        // Create customer
        const { data: customer, error: customerError } = await supabase
          .from('customers')
          .insert(customerData)
          .select()
          .single();
        
        if (customerError) throw customerError;
        
        // Update lead status
        const { error: leadError } = await supabase
          .from('leads')
          .update({ 
            status: 'won',
            conversion_date: new Date().toISOString()
          })
          .eq('id', leadId);
        
        if (leadError) throw leadError;
        
        return customer;
      });
    }, [executeQuery])
  };

  // Analytics operations
  const analytics = {
    getMetrics: useCallback(async (timeframe: string, region?: string) => {
      return executeQuery(async () => {
        let query = supabase
          .from('analytics_data')
          .select('*');
        
        // Apply timeframe filter
        const timeframeMap = {
          '1month': '1 month',
          '3months': '3 months',
          '6months': '6 months',
          '1year': '1 year'
        };
        
        const interval = timeframeMap[timeframe as keyof typeof timeframeMap] || '3 months';
        query = query.gte('date_recorded', new Date(Date.now() - (parseInt(interval) * 30 * 24 * 60 * 60 * 1000)).toISOString());
        
        if (region && region !== 'all') {
          query = query.eq('region', region);
        }
        
        const { data, error } = await query.order('date_recorded', { ascending: false });
        if (error) throw error;
        return data;
      });
    }, [executeQuery]),

    insertMetric: useCallback(async (metricData: Tables['analytics_data']['Insert']) => {
      return executeQuery(async () => {
        const { data, error } = await supabase
          .from('analytics_data')
          .insert(metricData)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      });
    }, [executeQuery])
  };

  // Intelligence operations
  const intelligence = {
    getFiles: useCallback(async (category?: string) => {
      return executeQuery(async () => {
        let query = supabase
          .from('intelligence_files')
          .select(`
            *,
            uploader:users!intelligence_files_uploaded_by_fkey(name, email),
            insights:ai_insights(*)
          `);
        
        if (category && category !== 'all') {
          query = query.eq('category', category);
        }
        
        const { data, error } = await query.order('upload_date', { ascending: false });
        if (error) throw error;
        return data;
      });
    }, [executeQuery]),

    uploadFile: useCallback(async (fileData: Tables['intelligence_files']['Insert']) => {
      return executeQuery(async () => {
        const { data, error } = await supabase
          .from('intelligence_files')
          .insert(fileData)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      });
    }, [executeQuery]),

    getInsights: useCallback(async (filters?: Record<string, any>) => {
      return executeQuery(async () => {
        let query = supabase
          .from('ai_insights')
          .select(`
            *,
            file:intelligence_files(name, category)
          `);
        
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
              query = query.eq(key, value);
            }
          });
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        return data;
      });
    }, [executeQuery])
  };

  // Real-time subscriptions
  const subscriptions = {
    subscribeToCustomers: useCallback((callback: (payload: any) => void) => {
      return dbHelpers.subscribeToTable('customers', callback);
    }, []),

    subscribeToOrders: useCallback((callback: (payload: any) => void) => {
      return dbHelpers.subscribeToTable('orders', callback);
    }, []),

    subscribeToAnalytics: useCallback((callback: (payload: any) => void) => {
      return dbHelpers.subscribeToTable('analytics_data', callback);
    }, [])
  };

  // Utility functions
  const utils = {
    getRegionStats: useCallback(async (region: string) => {
      return executeQuery(async () => {
        const { data, error } = await supabase.rpc('get_region_statistics', {
          region_name: region
        });
        
        if (error) throw error;
        return data;
      });
    }, [executeQuery]),

    exportData: useCallback(async (tableName: string, filters?: Record<string, any>) => {
      return executeQuery(async () => {
        // Log export request
        const { data: exportLog, error: logError } = await supabase
          .from('data_exports')
          .insert({
            export_type: 'manual',
            table_name: tableName,
            filters: filters || {},
            status: 'processing'
          })
          .select()
          .single();
        
        if (logError) throw logError;
        
        // Get data
        let query = supabase.from(tableName).select('*');
        
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
              query = query.eq(key, value);
            }
          });
        }
        
        const { data, error } = await query;
        if (error) throw error;
        
        // Update export log
        await supabase
          .from('data_exports')
          .update({
            status: 'completed',
            record_count: data?.length || 0,
            completed_at: new Date().toISOString()
          })
          .eq('id', exportLog.id);
        
        return data;
      });
    }, [executeQuery]),

    searchGlobal: useCallback(async (searchTerm: string) => {
      return executeQuery(async () => {
        const results = await Promise.all([
          // Search customers
          supabase
            .from('customers')
            .select('id, name, company, customer_type, region')
            .or(`name.ilike.%${searchTerm}%,company.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
            .limit(10),
          
          // Search products
          supabase
            .from('products')
            .select('id, name, sku, category, brand')
            .or(`name.ilike.%${searchTerm}%,sku.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%`)
            .limit(10),
          
          // Search leads
          supabase
            .from('leads')
            .select('id, name, company, status, region')
            .or(`name.ilike.%${searchTerm}%,company.ilike.%${searchTerm}%`)
            .limit(10)
        ]);
        
        return {
          customers: results[0].data || [],
          products: results[1].data || [],
          leads: results[2].data || []
        };
      });
    }, [executeQuery])
  };

  return {
    isLoading,
    error,
    customers,
    products,
    orders,
    leads,
    analytics,
    intelligence,
    subscriptions,
    utils,
    supabase
  };
};

// Hook for real-time data
export const useRealTimeData = <T>(
  tableName: string,
  filters?: Record<string, any>
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let subscription: any;

    const fetchInitialData = async () => {
      try {
        let query = supabase.from(tableName).select('*');
        
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
              query = query.eq(key, value);
            }
          });
        }
        
        const { data: initialData, error } = await query;
        if (error) throw error;
        
        setData(initialData as T[]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    const setupSubscription = () => {
      subscription = supabase
        .channel(`${tableName}_realtime`)
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: tableName },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              setData(prev => [payload.new as T, ...prev]);
            } else if (payload.eventType === 'UPDATE') {
              setData(prev => prev.map(item => 
                (item as any).id === payload.new.id ? payload.new as T : item
              ));
            } else if (payload.eventType === 'DELETE') {
              setData(prev => prev.filter(item => 
                (item as any).id !== payload.old.id
              ));
            }
          }
        )
        .subscribe();
    };

    fetchInitialData();
    setupSubscription();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [tableName, JSON.stringify(filters)]);

  return { data, isLoading, error };
};

// Hook for analytics dashboard
export const useAnalyticsDashboard = (timeframe: string, region?: string) => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        // Get analytics data
        let query = supabase
          .from('analytics_data')
          .select('*');
        
        // Apply timeframe filter
        const timeframeMap = {
          '1month': 30,
          '3months': 90,
          '6months': 180,
          '1year': 365
        };
        
        const days = timeframeMap[timeframe as keyof typeof timeframeMap] || 90;
        const startDate = new Date(Date.now() - (days * 24 * 60 * 60 * 1000));
        
        query = query.gte('date_recorded', startDate.toISOString());
        
        if (region && region !== 'all') {
          query = query.eq('region', region);
        }
        
        const { data, error } = await query.order('date_recorded', { ascending: false });
        if (error) throw error;
        
        setMetrics(data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeframe, region]);

  return { metrics, isLoading, error };
};

// Hook for customer master data with geo-coding
export const useCustomerMaster = () => {
  const { customers } = useDatabase();
  
  const processCustomerFile = useCallback(async (file: File) => {
    return new Promise<any[]>((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result as string;
          let parsedData: any[] = [];
          
          if (file.name.endsWith('.csv')) {
            // Parse CSV
            const lines = data.split('\n');
            const headers = lines[0].split(',').map(h => h.trim());
            
            parsedData = lines.slice(1)
              .filter(line => line.trim())
              .map(line => {
                const values = line.split(',').map(v => v.trim());
                const obj: any = {};
                headers.forEach((header, index) => {
                  obj[header] = values[index] || '';
                });
                return obj;
              });
          } else {
            // For Excel files, you would use a library like xlsx
            reject(new Error('Excel files require additional processing. Please use CSV format.'));
            return;
          }
          
          // Validate and transform data
          const processedData = parsedData.map(row => ({
            name: row.name || row.Name || '',
            company: row.company || row.Company || row.name || row.Name || '',
            email: row.email || row.Email || null,
            phone: row.phone || row.Phone || null,
            address: row.address || row.Address || null,
            region: row.region || row.Region || 'Dar es Salaam',
            district: row.district || row.District || null,
            ward: row.ward || row.Ward || null,
            latitude: parseFloat(row.latitude || row.Latitude) || null,
            longitude: parseFloat(row.longitude || row.Longitude) || null,
            customer_type: (row.customer_type || row.type || 'retailer').toLowerCase(),
            status: 'active',
            tier: 'bronze',
            tags: row.tags ? row.tags.split(';').map((t: string) => t.trim()) : []
          }));
          
          resolve(processedData);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, []);

  const geocodeAddress = useCallback(async (address: string, region: string): Promise<{lat: number, lng: number} | null> => {
    // Simple geocoding simulation for Tanzania
    // In production, you would use a real geocoding service
    const regionCoordinates: Record<string, {lat: number, lng: number}> = {
      'Dar es Salaam': { lat: -6.7924, lng: 39.2083 },
      'Mwanza': { lat: -2.5164, lng: 32.9175 },
      'Arusha': { lat: -3.3869, lng: 36.6830 },
      'Dodoma': { lat: -6.1630, lng: 35.7516 },
      'Mbeya': { lat: -8.9094, lng: 33.4607 },
      'Morogoro': { lat: -6.8235, lng: 37.6610 },
      'Tanga': { lat: -5.0692, lng: 39.0962 },
      'Kilimanjaro': { lat: -3.3398, lng: 37.3407 },
      'Tabora': { lat: -5.0167, lng: 32.8000 },
      'Kigoma': { lat: -4.8761, lng: 29.6269 }
    };
    
    const baseCoords = regionCoordinates[region];
    if (!baseCoords) return null;
    
    // Add small random offset to simulate address-specific coordinates
    return {
      lat: baseCoords.lat + (Math.random() - 0.5) * 0.1,
      lng: baseCoords.lng + (Math.random() - 0.5) * 0.1
    };
  }, []);

  const uploadCustomerMaster = useCallback(async (file: File) => {
    try {
      setIsLoading(true);
      
      // Process file
      const processedData = await processCustomerFile(file);
      
      // Geocode addresses that don't have coordinates
      const geocodedData = await Promise.all(
        processedData.map(async (customer) => {
          if (!customer.latitude || !customer.longitude) {
            const coords = await geocodeAddress(customer.address || '', customer.region);
            if (coords) {
              customer.latitude = coords.lat;
              customer.longitude = coords.lng;
            }
          }
          return customer;
        })
      );
      
      // Upload to database
      const result = await customers.bulkUpload(geocodedData);
      
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [customers, processCustomerFile, geocodeAddress]);

  return {
    uploadCustomerMaster,
    processCustomerFile,
    geocodeAddress,
    isLoading,
    error
  };
};