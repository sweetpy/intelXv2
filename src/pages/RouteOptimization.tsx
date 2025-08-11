import React, { useState } from 'react';
import { 
  Map, 
  Navigation, 
  Truck, 
  Clock,
  DollarSign,
  BarChart3,
  MapPin,
  Route,
  Zap,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Download
} from 'lucide-react';

const RouteOptimization: React.FC = () => {
  const [optimizationRunning, setOptimizationRunning] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('route-1');

  const routes = [
    {
      id: 'route-1',
      name: 'Dar es Salaam Central',
      status: 'optimized',
      distance: '145 km',
      duration: '4.2 hours',
      stops: 12,
      efficiency: 92,
      cost: 'TSh 85,000',
      savings: '+15%'
    },
    {
      id: 'route-2',
      name: 'Mwanza Regional',
      status: 'pending',
      distance: '230 km',
      duration: '6.8 hours',
      stops: 18,
      efficiency: 78,
      cost: 'TSh 125,000',
      savings: '+8%'
    },
    {
      id: 'route-3',
      name: 'Arusha Northern',
      status: 'optimizing',
      distance: '180 km',
      duration: '5.1 hours',
      stops: 15,
      efficiency: 85,
      cost: 'TSh 95,000',
      savings: '+12%'
    }
  ];

  const optimizationMetrics = [
    {
      title: 'Total Distance Saved',
      value: '2,340 km',
      change: '+18%',
      icon: Navigation,
      color: 'green'
    },
    {
      title: 'Time Efficiency',
      value: '87.5%',
      change: '+12%',
      icon: Clock,
      color: 'blue'
    },
    {
      title: 'Cost Reduction',
      value: 'TSh 450K',
      change: '+22%',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Fuel Savings',
      value: '1,250L',
      change: '+15%',
      icon: Zap,
      color: 'orange'
    }
  ];

  const optimizationFactors = [
    { factor: 'Traffic Patterns', weight: 25, status: 'active' },
    { factor: 'Delivery Windows', weight: 20, status: 'active' },
    { factor: 'Vehicle Capacity', weight: 20, status: 'active' },
    { factor: 'Road Conditions', weight: 15, status: 'active' },
    { factor: 'Fuel Costs', weight: 12, status: 'active' },
    { factor: 'Driver Preferences', weight: 8, status: 'inactive' }
  ];

  const handleOptimization = () => {
    setOptimizationRunning(true);
    setTimeout(() => {
      setOptimizationRunning(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimized': return 'bg-green-100 text-green-800';
      case 'optimizing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Route Optimization</h1>
          <p className="text-gray-600 mt-1">AI-powered route planning and optimization for maximum efficiency</p>
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </button>
          <button 
            onClick={handleOptimization}
            disabled={optimizationRunning}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center disabled:opacity-50"
          >
            {optimizationRunning ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Optimize Routes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Optimization Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {optimizationMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${metric.color}-100`}>
                <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
              </div>
              <span className="text-sm text-green-600 font-medium">{metric.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-sm text-gray-600">{metric.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Map Visualization */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Route Visualization</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md">Live View</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Historical</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Planned</button>
            </div>
          </div>
          
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 opacity-50"></div>
            <div className="text-center z-10">
              <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Interactive Route Map</p>
              <p className="text-gray-400 text-sm">Real-time route visualization with traffic data</p>
            </div>
            
            {/* Mock route indicators */}
            <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-sm">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Optimized Route
              </div>
            </div>
            <div className="absolute top-16 left-4 bg-white rounded-lg p-2 shadow-sm">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                Current Route
              </div>
            </div>
            <div className="absolute top-28 left-4 bg-white rounded-lg p-2 shadow-sm">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                Traffic Congestion
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Factors */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Optimization Factors</h2>
          <div className="space-y-4">
            {optimizationFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{factor.factor}</span>
                    <span className="text-sm text-gray-500">{factor.weight}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${factor.status === 'active' ? 'bg-green-600' : 'bg-gray-400'}`}
                      style={{ width: `${factor.weight * 4}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    factor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {factor.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Route Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Route Performance</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stops
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Efficiency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {routes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Route className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{route.name}</div>
                        <div className="text-sm text-gray-500">ID: {route.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                      {route.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {route.distance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {route.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {route.stops}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${route.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{route.efficiency}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{route.cost}</div>
                    <div className="text-sm text-green-600">{route.savings}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-900">
                        <Play className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <MapPin className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Download className="h-4 w-4" />
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
  );
};

export default RouteOptimization;