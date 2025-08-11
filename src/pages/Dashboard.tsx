import React from 'react';
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

const Dashboard: React.FC = () => {
  const { formatCurrency, translate, formatDate } = useLocalization();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [lastUpdated, setLastUpdated] = React.useState(new Date());

  // Simulate real-time data updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 2000);
  };

  const kpis = [
    {
      title: 'Total Revenue',
      value: formatCurrency(2400000000),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Distributors',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Products Distributed',
      value: '45,678',
      change: '-2.1%',
      trend: 'down',
      icon: Package,
      color: 'purple'
    },
    {
      title: 'Routes Optimized',
      value: '892',
      change: '+15.3%',
      trend: 'up',
      icon: Truck,
      color: 'orange'
    }
  ];

  const regions = [
    { name: 'Dar es Salaam', revenue: formatCurrency(580000000), growth: '+18%', distributors: 245, status: 'excellent' },
    { name: 'Mwanza', revenue: formatCurrency(320000000), growth: '+12%', distributors: 156, status: 'good' },
    { name: 'Arusha', revenue: formatCurrency(280000000), growth: '+9%', distributors: 134, status: 'good' },
    { name: 'Dodoma', revenue: formatCurrency(195000000), growth: '+15%', distributors: 98, status: 'warning' },
    { name: 'Mbeya', revenue: formatCurrency(165000000), growth: '+7%', distributors: 87, status: 'warning' }
  ];

  const recentActivities = [
    { action: 'New distributor onboarded', location: 'Kilimanjaro', time: '2 hours ago', type: 'success' },
    { action: 'Route optimization completed', location: 'Dar es Salaam', time: '4 hours ago', type: 'success' },
    { action: 'Inventory alert resolved', location: 'Mwanza', time: '6 hours ago', type: 'warning' },
    { action: 'Performance report generated', location: 'Arusha', time: '8 hours ago', type: 'info' },
    { action: 'New product line added', location: 'Dodoma', time: '1 day ago', type: 'success' }
  ];

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
            {regions.map((region, index) => (
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
            {recentActivities.map((activity, index) => (
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
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Revenue Trend</h2>
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Revenue chart visualization</p>
              <p className="text-xs text-gray-400 mt-1">Interactive charts coming soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Distribution Coverage</h2>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              View Map
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Tanzania coverage map</p>
              <p className="text-xs text-gray-400 mt-1">26 regions covered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;