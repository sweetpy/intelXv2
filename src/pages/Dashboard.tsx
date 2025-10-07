import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  Truck,
  MapPin,
  BarChart3,
  DollarSign,
  RefreshCw,
  Download,
  Calendar,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useLocalization } from '../components/LocalizationProvider';
import { DashboardService, type SystemStat, type RegionalData, type RecentActivity } from '../services/dashboardService';
import { LineChart, BarChart as CustomBarChart, DonutChart, ProgressBar } from '../components/Charts';

const Dashboard: React.FC = () => {
  const { formatCurrency, translate, formatDate } = useLocalization();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [stats, setStats] = useState<SystemStat[]>([]);
  const [regions, setRegions] = useState<RegionalData[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const data = await DashboardService.getDashboardSummary();
      setStats(data.stats);
      setRegions(data.regions);
      setActivities(data.activities);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await DashboardService.refreshDashboardData();
    await fetchDashboardData();
    setIsRefreshing(false);
  };

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'financial': return DollarSign;
      case 'operations': return Users;
      case 'inventory': return Package;
      case 'logistics': return Truck;
      default: return BarChart3;
    }
  };

  const getColorForCategory = (category: string) => {
    switch (category) {
      case 'financial': return 'green';
      case 'operations': return 'blue';
      case 'inventory': return 'purple';
      case 'logistics': return 'orange';
      default: return 'gray';
    }
  };

  const kpis = stats.slice(0, 4).map(stat => ({
    title: stat.stat_label,
    value: stat.stat_category === 'financial' ? formatCurrency(stat.stat_value) : stat.stat_value.toLocaleString(),
    change: `${stat.trend_direction === 'up' ? '+' : stat.trend_direction === 'down' ? '-' : ''}${stat.trend_percentage || 0}%`,
    trend: stat.trend_direction,
    icon: getIconForCategory(stat.stat_category),
    color: getColorForCategory(stat.stat_category)
  }));

  const regionalData = regions.map(region => ({
    name: region.region,
    revenue: formatCurrency(region.revenue),
    growth: region.growth,
    distributors: region.distributors,
    status: region.revenue > 500000000 ? 'excellent' : region.revenue > 200000000 ? 'good' : 'warning'
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'good': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <BarChart3 className="h-4 w-4 text-blue-500" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{translate('dashboard.title')}</h1>
          <p className="text-gray-600 mt-1">{translate('dashboard.welcome')}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            Last updated: {formatDate(lastUpdated)}
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${kpi.color}-100`}>
                <kpi.icon className={`h-6 w-6 text-${kpi.color}-600`} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {kpi.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Regional Performance</h2>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              View All Regions
            </button>
          </div>
          <div className="space-y-4">
            {regionalData.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="flex items-center mr-3">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    {getStatusIcon(region.status)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{region.name}</h3>
                    <p className="text-sm text-gray-500">{region.distributors} distributors</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{region.revenue}</p>
                  <p className="text-sm text-green-600">{region.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-1 flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.location}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Revenue Trend</h2>
              <p className="text-sm text-gray-500 mt-1">Last 6 months performance</p>
            </div>
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>Last quarter</option>
            </select>
          </div>
          <LineChart
            data={[
              { label: 'Apr', value: 2100000000 },
              { label: 'May', value: 2250000000 },
              { label: 'Jun', value: 2180000000 },
              { label: 'Jul', value: 2420000000 },
              { label: 'Aug', value: 2380000000 },
              { label: 'Sep', value: 2650000000 }
            ]}
            color="#10B981"
            height={250}
            showDots={true}
            interactive={true}
          />
        </div>

        {/* Orders by Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Orders by Status</h2>
              <p className="text-sm text-gray-500 mt-1">Current month distribution</p>
            </div>
          </div>
          <DonutChart
            data={[
              { label: 'Delivered', value: 1856, color: '#10B981' },
              { label: 'In Transit', value: 342, color: '#3B82F6' },
              { label: 'Processing', value: 156, color: '#F59E0B' },
              { label: 'Pending', value: 89, color: '#EF4444' }
            ]}
            size={200}
            thickness={35}
            showPercentages={true}
            interactive={true}
          />
        </div>
      </div>

      {/* Sales by Region */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Sales by Region</h2>
            <p className="text-sm text-gray-500 mt-1">Top performing regions this month</p>
          </div>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
        </div>
        <CustomBarChart
          data={[
            { label: 'Dar es Salaam', value: 580000000, color: '#10B981' },
            { label: 'Mwanza', value: 320000000, color: '#3B82F6' },
            { label: 'Arusha', value: 280000000, color: '#8B5CF6' },
            { label: 'Dodoma', value: 195000000, color: '#F59E0B' },
            { label: 'Mbeya', value: 165000000, color: '#EC4899' },
            { label: 'Morogoro', value: 145000000, color: '#6366F1' }
          ]}
          height={280}
          showValues={true}
          interactive={true}
        />
      </div>

      {/* Distribution Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Distribution Efficiency</h2>
          <div className="space-y-6">
            <ProgressBar
              label="Route Optimization"
              value={92}
              max={100}
              color="#10B981"
              showPercentage={true}
              height={10}
            />
            <ProgressBar
              label="On-Time Delivery"
              value={88}
              max={100}
              color="#3B82F6"
              showPercentage={true}
              height={10}
            />
            <ProgressBar
              label="Vehicle Utilization"
              value={76}
              max={100}
              color="#F59E0B"
              showPercentage={true}
              height={10}
            />
            <ProgressBar
              label="Customer Satisfaction"
              value={94}
              max={100}
              color="#8B5CF6"
              showPercentage={true}
              height={10}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Targets</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Revenue Target</span>
                <span className="text-sm font-semibold text-gray-900">TSh 2.8B / TSh 3.0B</span>
              </div>
              <ProgressBar
                value={2800000000}
                max={3000000000}
                color="#10B981"
                showPercentage={true}
                height={10}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">New Customers</span>
                <span className="text-sm font-semibold text-gray-900">142 / 200</span>
              </div>
              <ProgressBar
                value={142}
                max={200}
                color="#3B82F6"
                showPercentage={true}
                height={10}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Orders Fulfilled</span>
                <span className="text-sm font-semibold text-gray-900">1,856 / 2,000</span>
              </div>
              <ProgressBar
                value={1856}
                max={2000}
                color="#F59E0B"
                showPercentage={true}
                height={10}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Route Coverage</span>
                <span className="text-sm font-semibold text-gray-900">24 / 26 regions</span>
              </div>
              <ProgressBar
                value={24}
                max={26}
                color="#8B5CF6"
                showPercentage={true}
                height={10}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;