import React, { useState, useEffect } from 'react';
import { 
  Database, 
  TrendingUp, 
  BarChart3, 
  PieChart,
  Activity,
  Zap,
  Brain,
  Target,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  MapPin,
  Users,
  Package,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Settings
} from 'lucide-react';

interface DataWarehouseMetric {
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  category: 'revenue' | 'volume' | 'efficiency' | 'market';
}

interface BenchmarkData {
  metric: string;
  ourValue: number;
  industryAverage: number;
  topPerformer: number;
  unit: string;
  status: 'above' | 'below' | 'at';
}

interface ETLProcess {
  id: string;
  name: string;
  source: string;
  status: 'running' | 'completed' | 'failed' | 'scheduled';
  lastRun: string;
  nextRun: string;
  recordsProcessed: number;
  duration: string;
}

const BusinessIntelligence: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const dataWarehouseMetrics: DataWarehouseMetric[] = [
    {
      name: 'Total Records',
      value: '2.4M',
      change: '+125K',
      trend: 'up',
      category: 'volume'
    },
    {
      name: 'Data Quality Score',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      category: 'efficiency'
    },
    {
      name: 'Processing Speed',
      value: '1.2s',
      change: '-0.3s',
      trend: 'up',
      category: 'efficiency'
    },
    {
      name: 'Storage Used',
      value: '847GB',
      change: '+45GB',
      trend: 'up',
      category: 'volume'
    }
  ];

  const benchmarkData: BenchmarkData[] = [
    {
      metric: 'Market Penetration',
      ourValue: 68.5,
      industryAverage: 52.3,
      topPerformer: 78.2,
      unit: '%',
      status: 'above'
    },
    {
      metric: 'Route Efficiency',
      ourValue: 92.3,
      industryAverage: 85.7,
      topPerformer: 96.1,
      unit: '%',
      status: 'above'
    },
    {
      metric: 'Cost per Delivery',
      ourValue: 12500,
      industryAverage: 15200,
      topPerformer: 11800,
      unit: 'TSh',
      status: 'above'
    },
    {
      metric: 'Customer Satisfaction',
      ourValue: 4.7,
      industryAverage: 4.2,
      topPerformer: 4.9,
      unit: '/5',
      status: 'above'
    },
    {
      metric: 'Inventory Turnover',
      ourValue: 8.5,
      industryAverage: 9.2,
      topPerformer: 11.3,
      unit: 'x',
      status: 'below'
    }
  ];

  const etlProcesses: ETLProcess[] = [
    {
      id: 'sales-data',
      name: 'Sales Data Pipeline',
      source: 'ERP System',
      status: 'completed',
      lastRun: '2024-01-15 08:00',
      nextRun: '2024-01-16 08:00',
      recordsProcessed: 125000,
      duration: '12m 34s'
    },
    {
      id: 'distributor-data',
      name: 'Distributor Performance',
      source: 'CRM System',
      status: 'running',
      lastRun: '2024-01-15 09:15',
      nextRun: '2024-01-15 21:15',
      recordsProcessed: 45000,
      duration: '8m 12s'
    },
    {
      id: 'market-data',
      name: 'Market Intelligence',
      source: 'External APIs',
      status: 'scheduled',
      lastRun: '2024-01-14 18:00',
      nextRun: '2024-01-15 18:00',
      recordsProcessed: 78000,
      duration: '15m 45s'
    },
    {
      id: 'logistics-data',
      name: 'Logistics Tracking',
      source: 'GPS Systems',
      status: 'failed',
      lastRun: '2024-01-15 06:00',
      nextRun: '2024-01-15 12:00',
      recordsProcessed: 0,
      duration: '0m 0s'
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'running': return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getBenchmarkStatus = (status: string) => {
    switch (status) {
      case 'above': return { color: 'text-green-600', icon: '↗️' };
      case 'below': return { color: 'text-red-600', icon: '↘️' };
      case 'at': return { color: 'text-blue-600', icon: '→' };
      default: return { color: 'text-gray-600', icon: '→' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Database className="h-6 w-6 text-indigo-600 mr-2" />
            Business Intelligence
          </h2>
          <p className="text-gray-600 mt-1">Data warehouse, ETL processes, and industry benchmarking</p>
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
          
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export BI Report
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Data Overview', icon: BarChart3 },
              { id: 'warehouse', label: 'Data Warehouse', icon: Database },
              { id: 'etl', label: 'ETL Processes', icon: Zap },
              { id: 'benchmarks', label: 'Benchmarking', icon: Target }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Data Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dataWarehouseMetrics.map((metric, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{metric.name}</h3>
                      <div className={`p-1 rounded ${
                        metric.trend === 'up' ? 'bg-green-100' : 
                        metric.trend === 'down' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        <TrendingUp className={`h-4 w-4 ${
                          metric.trend === 'up' ? 'text-green-600' : 
                          metric.trend === 'down' ? 'text-red-600 rotate-180' : 'text-blue-600'
                        }`} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                    <div className={`text-sm ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {metric.change} from last period
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Sources */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Data Sources</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <div className="font-medium text-green-900">ERP System</div>
                      <div className="text-sm text-green-700">Sales, Inventory, Finance</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <div className="font-medium text-green-900">CRM Platform</div>
                      <div className="text-sm text-green-700">Customer, Distributor Data</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <div className="font-medium text-green-900">External APIs</div>
                      <div className="text-sm text-green-700">Market, Weather, Traffic</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Warehouse Tab */}
          {activeTab === 'warehouse' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Analytics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Storage</span>
                      <span className="font-semibold">1.2TB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-indigo-600 h-3 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Used</div>
                        <div className="font-semibold">847GB</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Available</div>
                        <div className="font-semibold">353GB</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Query Performance</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Avg Query Time</span>
                      <span className="font-semibold text-green-600">1.2s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Queries Today</span>
                      <span className="font-semibold">2,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cache Hit Rate</span>
                      <span className="font-semibold text-blue-600">94.2%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Quality Metrics */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Quality Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">94.2%</div>
                    <div className="text-sm text-green-700">Completeness</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">97.8%</div>
                    <div className="text-sm text-blue-700">Accuracy</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">91.5%</div>
                    <div className="text-sm text-purple-700">Consistency</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">98.9%</div>
                    <div className="text-sm text-orange-700">Timeliness</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ETL Processes Tab */}
          {activeTab === 'etl' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Process
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Run
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Records
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {etlProcesses.map((process) => (
                        <tr key={process.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{process.name}</div>
                              <div className="text-sm text-gray-500">{process.source}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(process.status)}`}>
                                {getStatusIcon(process.status)}
                                <span className="ml-1">{process.status}</span>
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {process.lastRun}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {process.recordsProcessed.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {process.duration}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-indigo-600 hover:text-indigo-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <RefreshCw className="h-4 w-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Settings className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Benchmarking Tab */}
          {activeTab === 'benchmarks' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Industry Benchmarking</h3>
                <div className="space-y-6">
                  {benchmarkData.map((benchmark, index) => {
                    const status = getBenchmarkStatus(benchmark.status);
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{benchmark.metric}</h4>
                          <span className={`text-sm font-medium ${status.color}`}>
                            {status.icon} {benchmark.status === 'above' ? 'Above Average' : benchmark.status === 'below' ? 'Below Average' : 'At Average'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-indigo-600">
                              {benchmark.unit === 'TSh' ? `TSh ${benchmark.ourValue.toLocaleString()}` : `${benchmark.ourValue}${benchmark.unit}`}
                            </div>
                            <div className="text-sm text-gray-600">Our Performance</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-600">
                              {benchmark.unit === 'TSh' ? `TSh ${benchmark.industryAverage.toLocaleString()}` : `${benchmark.industryAverage}${benchmark.unit}`}
                            </div>
                            <div className="text-sm text-gray-600">Industry Average</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">
                              {benchmark.unit === 'TSh' ? `TSh ${benchmark.topPerformer.toLocaleString()}` : `${benchmark.topPerformer}${benchmark.unit}`}
                            </div>
                            <div className="text-sm text-gray-600">Top Performer</div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-indigo-600 h-3 rounded-full relative" 
                              style={{ 
                                width: `${Math.min((benchmark.ourValue / benchmark.topPerformer) * 100, 100)}%` 
                              }}
                            >
                              <div className="absolute right-0 top-0 w-2 h-3 bg-indigo-800 rounded-r-full"></div>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0</span>
                            <span>Industry Avg</span>
                            <span>Top Performer</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessIntelligence;