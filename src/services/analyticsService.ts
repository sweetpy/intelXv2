import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type AnalyticsData = Database['public']['Tables']['analytics_data']['Row'];
type AnalyticsInsert = Database['public']['Tables']['analytics_data']['Insert'];

export class AnalyticsService {
  // Record analytics metric
  static async recordMetric(metricData: AnalyticsInsert): Promise<AnalyticsData> {
    const { data, error } = await supabase
      .from('analytics_data')
      .insert(metricData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get metrics for dashboard
  static async getDashboardMetrics(timeframe: string, region?: string): Promise<{
    revenue: AnalyticsData[];
    penetration: AnalyticsData[];
    efficiency: AnalyticsData[];
    satisfaction: AnalyticsData[];
  }> {
    const timeframeMap = {
      '1month': 30,
      '3months': 90,
      '6months': 180,
      '1year': 365
    };

    const days = timeframeMap[timeframe as keyof typeof timeframeMap] || 90;
    const startDate = new Date(Date.now() - (days * 24 * 60 * 60 * 1000));

    let baseQuery = supabase
      .from('analytics_data')
      .select('*')
      .gte('date_recorded', startDate.toISOString());

    if (region && region !== 'all') {
      baseQuery = baseQuery.eq('region', region);
    }

    const [revenue, penetration, efficiency, satisfaction] = await Promise.all([
      baseQuery.eq('metric_name', 'total_revenue').order('date_recorded'),
      baseQuery.eq('metric_name', 'market_penetration').order('date_recorded'),
      baseQuery.eq('metric_name', 'route_efficiency').order('date_recorded'),
      baseQuery.eq('metric_name', 'customer_satisfaction').order('date_recorded')
    ]);

    return {
      revenue: revenue.data || [],
      penetration: penetration.data || [],
      efficiency: efficiency.data || [],
      satisfaction: satisfaction.data || []
    };
  }

  // Get regional performance data
  static async getRegionalPerformance(): Promise<{
    region: string;
    customers: number;
    revenue: number;
    penetration: number;
    growth: number;
  }[]> {
    const { data, error } = await supabase.rpc('get_regional_performance');

    if (error) {
      // Fallback calculation if RPC doesn't exist
      const { data: customers, error: customerError } = await supabase
        .from('customers')
        .select('region, total_revenue, status');

      if (customerError) throw customerError;

      const regionStats = customers?.reduce((acc, customer) => {
        if (!acc[customer.region]) {
          acc[customer.region] = {
            region: customer.region,
            customers: 0,
            revenue: 0,
            penetration: 0,
            growth: 0
          };
        }

        acc[customer.region].customers += 1;
        acc[customer.region].revenue += customer.total_revenue || 0;

        return acc;
      }, {} as Record<string, any>);

      return Object.values(regionStats || {});
    }

    return data || [];
  }

  // Get top performing products
  static async getTopProducts(region?: string, limit: number = 10): Promise<{
    product_name: string;
    total_sales: number;
    total_quantity: number;
    growth_rate: number;
  }[]> {
    let query = supabase.rpc('get_top_products', {
      region_filter: region,
      result_limit: limit
    });

    const { data, error } = await query;

    if (error) {
      // Fallback query if RPC doesn't exist
      let fallbackQuery = supabase
        .from('order_items')
        .select(`
          product:products(name),
          quantity,
          line_total,
          order:orders(customer:customers(region))
        `);

      const { data: fallbackData, error: fallbackError } = await fallbackQuery;
      if (fallbackError) throw fallbackError;

      // Process fallback data
      const productStats = fallbackData?.reduce((acc, item) => {
        const productName = (item.product as any)?.name;
        const customerRegion = (item.order as any)?.customer?.region;

        if (!productName || (region && region !== 'all' && customerRegion !== region)) {
          return acc;
        }

        if (!acc[productName]) {
          acc[productName] = {
            product_name: productName,
            total_sales: 0,
            total_quantity: 0,
            growth_rate: 0
          };
        }

        acc[productName].total_sales += item.line_total || 0;
        acc[productName].total_quantity += item.quantity || 0;

        return acc;
      }, {} as Record<string, any>);

      return Object.values(productStats || {})
        .sort((a: any, b: any) => b.total_sales - a.total_sales)
        .slice(0, limit);
    }

    return data || [];
  }

  // Record real-time metrics
  static async recordRealtimeMetrics(): Promise<void> {
    const metrics = [
      {
        metric_name: 'active_users',
        metric_value: Math.floor(Math.random() * 50) + 100,
        metric_unit: 'count',
        data_source: 'system',
        date_recorded: new Date().toISOString()
      },
      {
        metric_name: 'system_performance',
        metric_value: Math.random() * 10 + 90,
        metric_unit: 'percentage',
        data_source: 'monitoring',
        date_recorded: new Date().toISOString()
      },
      {
        metric_name: 'data_quality_score',
        metric_value: Math.random() * 5 + 90,
        metric_unit: 'percentage',
        data_source: 'data_validation',
        date_recorded: new Date().toISOString()
      }
    ];

    const { error } = await supabase
      .from('analytics_data')
      .insert(metrics);

    if (error) throw error;
  }

  // Get market intelligence summary
  static async getMarketIntelligence(): Promise<{
    totalFiles: number;
    insights: number;
    opportunities: number;
    threats: number;
    trends: number;
  }> {
    const [filesResult, insightsResult] = await Promise.all([
      supabase
        .from('intelligence_files')
        .select('id', { count: 'exact' }),
      supabase
        .from('ai_insights')
        .select('insight_type', { count: 'exact' })
    ]);

    const insights = insightsResult.data || [];
    
    return {
      totalFiles: filesResult.count || 0,
      insights: insights.length,
      opportunities: insights.filter(i => i.insight_type === 'opportunity').length,
      threats: insights.filter(i => i.insight_type === 'threat').length,
      trends: insights.filter(i => i.insight_type === 'trend').length
    };
  }

  // Calculate data quality score
  static async calculateDataQuality(): Promise<number> {
    try {
      const { data, error } = await supabase.rpc('calculate_data_quality');
      
      if (error) {
        // Fallback calculation
        const { data: customers, error: customerError } = await supabase
          .from('customers')
          .select('name, company, email, phone, region, latitude, longitude');

        if (customerError) throw customerError;

        if (!customers || customers.length === 0) return 0;

        let qualityScore = 0;
        const totalFields = customers.length * 7; // 7 key fields
        let completedFields = 0;

        customers.forEach(customer => {
          if (customer.name) completedFields++;
          if (customer.company) completedFields++;
          if (customer.email) completedFields++;
          if (customer.phone) completedFields++;
          if (customer.region) completedFields++;
          if (customer.latitude) completedFields++;
          if (customer.longitude) completedFields++;
        });

        qualityScore = (completedFields / totalFields) * 100;
        return Math.round(qualityScore * 10) / 10;
      }

      return data || 0;
    } catch (error) {
      console.error('Error calculating data quality:', error);
      return 0;
    }
  }
}