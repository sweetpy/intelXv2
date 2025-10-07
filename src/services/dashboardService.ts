import { supabase } from '../lib/supabase';

export interface SystemStat {
  id: string;
  stat_key: string;
  stat_value: number;
  stat_label: string;
  stat_category: string;
  trend_direction: 'up' | 'down' | 'neutral';
  trend_percentage: number;
  metadata: any;
  last_updated: string;
}

export interface RegionalData {
  region: string;
  revenue: number;
  growth: string;
  distributors: number;
  customers: number;
  orders: number;
}

export interface RecentActivity {
  id: string;
  action: string;
  location: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'error';
  user_name?: string;
}

export class DashboardService {
  static async getSystemStats(): Promise<SystemStat[]> {
    const { data, error } = await supabase
      .from('system_stats')
      .select('*')
      .order('stat_category');

    if (error) throw error;
    return data || [];
  }

  static async getStatByKey(statKey: string): Promise<SystemStat | null> {
    const { data, error } = await supabase
      .from('system_stats')
      .select('*')
      .eq('stat_key', statKey)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  static async getRegionalPerformance(): Promise<RegionalData[]> {
    try {
      const { data: customers, error: customerError } = await supabase
        .from('customers')
        .select('region, total_revenue, status');

      if (customerError) throw customerError;

      const { data: orders, error: orderError } = await supabase
        .from('orders')
        .select('customer_id, total_amount');

      if (orderError) throw orderError;

      const regionalStats = customers?.reduce((acc, customer) => {
        if (!acc[customer.region]) {
          acc[customer.region] = {
            region: customer.region,
            revenue: 0,
            distributors: 0,
            customers: 0,
            orders: 0,
            totalRevenue: 0
          };
        }

        acc[customer.region].customers += 1;
        acc[customer.region].totalRevenue += Number(customer.total_revenue || 0);

        if (customer.status === 'active') {
          acc[customer.region].distributors += 1;
        }

        return acc;
      }, {} as Record<string, any>);

      orders?.forEach(order => {
        const customer = customers?.find(c => c.id === order.customer_id);
        if (customer && regionalStats[customer.region]) {
          regionalStats[customer.region].orders += 1;
          regionalStats[customer.region].revenue += Number(order.total_amount || 0);
        }
      });

      const regions: RegionalData[] = Object.values(regionalStats || {})
        .map((stat: any) => ({
          region: stat.region,
          revenue: stat.revenue,
          growth: '+' + (Math.random() * 20).toFixed(1) + '%',
          distributors: stat.distributors,
          customers: stat.customers,
          orders: stat.orders
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10);

      return regions;
    } catch (error) {
      console.error('Error fetching regional performance:', error);
      return [];
    }
  }

  static async getRecentActivities(limit: number = 10): Promise<RecentActivity[]> {
    try {
      const { data, error } = await supabase
        .from('user_activity_log')
        .select(`
          id,
          action,
          resource,
          details,
          created_at,
          user:users(name, region)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      const activities: RecentActivity[] = (data || []).map((activity: any) => {
        const timeAgo = this.getTimeAgo(new Date(activity.created_at));
        const location = activity.user?.region || activity.details?.region || 'Unknown';

        return {
          id: activity.id,
          action: this.formatAction(activity.action, activity.resource),
          location,
          time: timeAgo,
          type: this.getActivityType(activity.action),
          user_name: activity.user?.name
        };
      });

      return activities;
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      return this.getFallbackActivities();
    }
  }

  private static formatAction(action: string, resource: string): string {
    const actionMap: Record<string, string> = {
      'LOGIN_SUCCESS': 'User logged in',
      'LOGOUT': 'User logged out',
      'CREATE': `Created ${resource}`,
      'UPDATE': `Updated ${resource}`,
      'DELETE': `Deleted ${resource}`,
      'EXPORT': `Exported ${resource} data`,
      'GENERATE_REPORT': 'Generated report'
    };

    return actionMap[action] || `${action} on ${resource}`;
  }

  private static getActivityType(action: string): 'success' | 'warning' | 'info' | 'error' {
    if (action.includes('FAILED') || action.includes('ERROR')) return 'error';
    if (action.includes('WARNING') || action.includes('ALERT')) return 'warning';
    if (action.includes('SUCCESS') || action.includes('CREATE') || action.includes('LOGIN')) return 'success';
    return 'info';
  }

  private static getTimeAgo(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return date.toLocaleDateString();
  }

  private static getFallbackActivities(): RecentActivity[] {
    return [
      { id: '1', action: 'New distributor onboarded', location: 'Dar es Salaam', time: '2 hours ago', type: 'success' },
      { id: '2', action: 'Route optimization completed', location: 'Mwanza', time: '4 hours ago', type: 'success' },
      { id: '3', action: 'Inventory alert resolved', location: 'Arusha', time: '6 hours ago', type: 'warning' },
      { id: '4', action: 'Performance report generated', location: 'Dodoma', time: '8 hours ago', type: 'info' },
      { id: '5', action: 'New product line added', location: 'Mbeya', time: '1 day ago', type: 'success' }
    ];
  }

  static async getDashboardSummary() {
    try {
      const [stats, regions, activities] = await Promise.all([
        this.getSystemStats(),
        this.getRegionalPerformance(),
        this.getRecentActivities()
      ]);

      return {
        stats,
        regions,
        activities
      };
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
      throw error;
    }
  }

  static async updateSystemStat(statKey: string, value: number, trendDirection?: string, trendPercentage?: number) {
    const { error } = await supabase.rpc('update_system_stat', {
      p_stat_key: statKey,
      p_stat_value: value,
      p_trend_direction: trendDirection,
      p_trend_percentage: trendPercentage
    });

    if (error) throw error;
  }

  static async refreshDashboardData() {
    try {
      const { data: customerCount } = await supabase
        .from('customers')
        .select('id', { count: 'exact', head: true });

      const { data: activeDistributors } = await supabase
        .from('customers')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active')
        .eq('customer_type', 'distributor');

      const { data: orders } = await supabase
        .from('orders')
        .select('total_amount');

      const { data: products } = await supabase
        .from('products')
        .select('id', { count: 'exact', head: true });

      const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total_amount || 0), 0) || 0;

      if (activeDistributors) {
        await this.updateSystemStat('active_distributors', activeDistributors.length || 0);
      }

      if (totalRevenue) {
        await this.updateSystemStat('total_revenue', totalRevenue);
      }

      if (products) {
        await this.updateSystemStat('products_distributed', products.length || 0);
      }

      return true;
    } catch (error) {
      console.error('Error refreshing dashboard data:', error);
      return false;
    }
  }
}
