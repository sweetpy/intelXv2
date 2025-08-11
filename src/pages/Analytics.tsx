import React, { useState, useEffect } from 'react';
import TanzaniaMap from '../components/TanzaniaMap';
import AdvancedAnalytics from '../components/AdvancedAnalytics';
import BusinessIntelligence from '../components/BusinessIntelligence';
import { 
  BarChart3, TrendingUp, PieChart, LineChart, Filter, Download, Calendar, MapPin, RefreshCw,
  AlertCircle, CheckCircle, Clock, DollarSign, Zap, Brain, Eye, Target, Lightbulb,
  TrendingDown, Activity, Wifi, WifiOff, Maximize2, Minimize2
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aiInsights, setAiInsights] = useState(true);
  const [liveMode, setLiveMode] = useState(true);
  const [predictiveMode, setPredictiveMode] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleExportReport = () => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      const data = {
        timeframe: selectedTimeframe,
        region: selectedRegion,
        metrics: analyticsCards,
        timestamp: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `intellx-analytics-${selectedTimeframe}-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setIsLoading(false);
    }, 2000);
  };

  const analyticsCards = [
    {
      title: 'Market Penetration',
      value: selectedRegion === 'all' ? '68.5%' : selectedRegion === 'dar' ? '89.2%' : selectedRegion === 'mwanza' ? '64.3%' : selectedRegion === 'arusha' ? '76.8%' : '58.7%',
      change: '+5.2%',
      icon: TrendingUp,
      description: 'Coverage across Tanzania'
    },
    {
      title: 'Route Efficiency',
      value: '92.3%',
      change: '+3.1%',
      icon: BarChart3,
      description: 'Optimized delivery routes'
    },
    {
      title: 'Customer Satisfaction',
      value: '4.7/5',
      change: '+0.3',
      icon: PieChart,
      description: 'Average rating'
    },
    {
      title: 'Cost Reduction',
      value: '23.4%',
      change: '+8.7%',
      icon: LineChart,
      description: 'Logistics savings'
    }
  ];

  const getRegionData = () => {
    const regionData = {
      all: {
        topProducts: [
          { name: 'Consumer Electronics', sales: 'TSh 450M', growth: '+15%', share: '28%' },
          { name: 'Pharmaceuticals', sales: 'TSh 380M', growth: '+12%', share: '24%' },
          { name: 'FMCG Products', sales: 'TSh 320M', growth: '+8%', share: '20%' },
          { name: 'Agricultural Supplies', sales: 'TSh 280M', growth: '+18%', share: '17%' },
          { name: 'Telecommunications', sales: 'TSh 170M', growth: '+22%', share: '11%' }
        ]
      },
      dar: {
        topProducts: [
          { name: 'Consumer Electronics', sales: 'TSh 180M', growth: '+18%', share: '32%' },
          { name: 'FMCG Products', sales: 'TSh 145M', growth: '+12%', share: '26%' },
          { name: 'Pharmaceuticals', sales: 'TSh 120M', growth: '+15%', share: '22%' },
          { name: 'Telecommunications', sales: 'TSh 85M', growth: '+25%', share: '15%' },
          { name: 'Agricultural Supplies', sales: 'TSh 30M', growth: '+8%', share: '5%' }
        ]
      },
      mwanza: {
        topProducts: [
          { name: 'Agricultural Supplies', sales: 'TSh 95M', growth: '+22%', share: '35%' },
          { name: 'FMCG Products', sales: 'TSh 78M', growth: '+10%', share: '29%' },
          { name: 'Pharmaceuticals', sales: 'TSh 52M', growth: '+14%', share: '19%' },
          { name: 'Consumer Electronics', sales: 'TSh 35M', growth: '+8%', share: '13%' },
          { name: 'Telecommunications', sales: 'TSh 12M', growth: '+18%', share: '4%' }
        ]
      }
    };
    
    return regionData[selectedRegion as keyof typeof regionData] || regionData.all;
  };

  const topProducts = getRegionData().topProducts;

  const performanceMetrics = [
    { 
      metric: 'On-time Delivery', 
      current: selectedTimeframe === '1month' ? '96.1%' : selectedTimeframe === '3months' ? '94.8%' : '94.2%', 
      target: '95%', 
      status: 'excellent' 
    },
    { 
      metric: 'Inventory Turnover', 
      current: selectedTimeframe === '1month' ? '9.2x' : selectedTimeframe === '3months' ? '8.8x' : '8.5x', 
      target: '8x', 
      status: 'excellent' 
    },
    { 
      metric: 'Route Optimization', 
      current: selectedTimeframe === '1month' ? '89%' : selectedTimeframe === '3months' ? '88%' : '87%', 
      target: '90%', 
      status: 'warning' 
    },
    { 
      metric: 'Customer Retention', 
      current: selectedTimeframe === '1month' ? '93.2%' : selectedTimeframe === '3months' ? '92.5%' : '91.8%', 
      target: '90%', 
      status: 'excellent' 
    },
    { 
      metric: 'Cost per Delivery', 
      current: selectedTimeframe === '1month' ? 'TSh 11,800' : selectedTimeframe === '3months' ? 'TSh 12,200' : 'TSh 12,500', 
      target: 'TSh 13,000', 
      status: 'good' 
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between glass rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Analytics & Insights</h1>
          <p className="text-gray-600 mt-1">Deep dive into your route to market performance</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <div className="flex items-center mr-4">
              <div className={`w-2 h-2 rounded-full mr-2 ${liveMode ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <Clock className="h-4 w-4 mr-1" />
            </div>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          {/* AI Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAiInsights(!aiInsights)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                aiInsights 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-glow' 
                  : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
              }`}
              title="AI Insights"
            >
              <Brain className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPredictiveMode(!predictiveMode)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                predictiveMode 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
              }`}
              title="Predictive Analytics"
            >
              <Target className="h-4 w-4" />
            </button>
            <button
              onClick={() => setLiveMode(!liveMode)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                liveMode 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
              title="Live Mode"
            >
              {liveMode ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Regions</option>
              <option value="dar">Dar es Salaam</option>
              <option value="mwanza">Mwanza</option>
              <option value="arusha">Arusha</option>
              <option value="dodoma">Dodoma</option>
            </select>
          </div>
          
          <button 
            onClick={handleExportReport}
            disabled={isLoading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            {isLoading ? 'Exporting...' : 'Export Report'}
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((card, index) => (
          <div key={index} className="group bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-md group-hover:shadow-lg">
                <card.icon className="h-6 w-6 text-green-600 group-hover:text-blue-600 transition-colors duration-300" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-green-600 font-medium">{card.change}</span>
                {liveMode && <Activity className="h-3 w-3 text-green-500 animate-pulse" />}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">{card.value}</h3>
            <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
            <p className="text-xs text-gray-500">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights Panel */}
      {aiInsights && (
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 rounded-xl p-6 border border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-float">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Brain className="h-6 w-6 text-purple-600 mr-2 animate-pulse" />
              <h2 className="text-xl font-semibold text-purple-900">AI Market Intelligence</h2>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-purple-700">Processing live data</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex items-center mb-2">
                <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="font-medium text-purple-900">Market Opportunity</span>
              </div>
              <p className="text-sm text-purple-700">Mbeya region shows 32% untapped potential. Recommend immediate market entry with FMCG focus.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium text-purple-900">Growth Prediction</span>
              </div>
              <p className="text-sm text-purple-700">Dar es Salaam market expected to grow 25% in Q2. Increase inventory allocation by 18%.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="font-medium text-purple-900">Risk Alert</span>
              </div>
              <p className="text-sm text-purple-700">Competitor activity increased 40% in Mwanza. Deploy counter-strategy within 48 hours.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100 relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {predictiveMode && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium animate-pulse shadow-md">
              Predictive Mode
            </div>
          )}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Performance Trends</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow duration-300">Revenue</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-300 transform hover:scale-105">Volume</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gradient-to-r hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all duration-300 transform hover:scale-105">Efficiency</button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-all duration-300 rounded-lg hover:bg-gray-100 transform hover:scale-110"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          {/* Functional Chart Simulation */}
          <div className={`bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 rounded-xl p-4 transition-all duration-500 shadow-inner ${isFullscreen ? 'h-96' : 'h-80'}`}>
            <div className="h-full flex flex-col justify-end space-y-2">
              {/* Chart bars simulation */}
              <div className="flex items-end justify-between h-full space-x-2">
                {Array.from({ length: 12 }, (_, i) => {
                  const baseHeight = Math.random() * 60 + 20;
                  const predictiveHeight = predictiveMode ? baseHeight + Math.random() * 20 : baseHeight;
                  const isCurrentMonth = i === 11;
                  const isFutureMonth = predictiveMode && i > 8;
                  return (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div 
                        className={`w-full rounded-t-xl transition-all duration-1000 hover:scale-105 cursor-pointer shadow-md hover:shadow-lg ${
                          isCurrentMonth ? 'bg-gradient-to-t from-green-600 to-green-400 animate-glow' : 
                          isFutureMonth ? 'bg-gradient-to-t from-blue-400 to-cyan-400 opacity-70' :
                          'bg-gradient-to-t from-blue-600 to-blue-400'
                        }`}
                        style={{ height: `${predictiveHeight}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-2">
                        {new Date(2024, i).toLocaleDateString('en', { month: 'short' })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Top Performing Products
            {selectedRegion !== 'all' && (
              <span className="text-sm font-normal text-gray-500 block">
                in {selectedRegion === 'dar' ? 'Dar es Salaam' : selectedRegion === 'mwanza' ? 'Mwanza' : 'Arusha'}
              </span>
            )}
          </h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="group flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-green-50 hover:to-blue-100 transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-sm hover:shadow-md">
                <div className="flex-1">
                  <div className="flex items-center">
                  <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                    {index === 0 && <span className="ml-2 px-2 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-xs rounded-full animate-pulse shadow-sm">🏆 Top Performer</span>}
                  </div>
                  <p className="text-xs text-gray-500">Market share: {product.share}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm">{product.sales}</p>
                  <div className="flex items-center">
                    <p className="text-xs text-green-600 mr-1">{product.growth}</p>
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Key Performance Indicators</h2>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center hover:scale-105 transition-all duration-300 px-3 py-1 rounded-xl hover:bg-green-50">
            <Filter className="h-4 w-4 mr-1" />
            Customize Metrics
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-3 ${
                metric.status === 'excellent' ? 'bg-green-100' :
                metric.status === 'good' ? 'bg-blue-100' :
                'bg-yellow-100 group-hover:bg-yellow-200'
              } shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                <div className={`text-lg font-bold transition-colors duration-300 ${
                  metric.status === 'excellent' ? 'text-green-600' :
                  metric.status === 'good' ? 'text-blue-600' :
                  'text-yellow-600'
                }`}>
                  {metric.current}
                </div>
              </div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">{metric.metric}</h3>
              <p className="text-xs text-gray-500">Target: {metric.target}</p>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 transition-all duration-300 group-hover:scale-105 ${
                metric.status === 'excellent' ? 'bg-green-100 text-green-800' :
                metric.status === 'good' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              } shadow-sm`}>
                {metric.status === 'excellent' ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : metric.status === 'good' ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <AlertCircle className="h-3 w-3 mr-1" />
                )}
                {metric.status === 'excellent' ? 'Excellent' :
                 metric.status === 'good' ? 'Good' : 'Needs Attention'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tanzania Interactive Map */}
      <TanzaniaMap />

      {/* Advanced Analytics */}
      <AdvancedAnalytics />

      {/* Business Intelligence */}
      <BusinessIntelligence />

      {/* Strategic Distribution Intelligence */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold gradient-text">Strategic Distribution Intelligence</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-sm text-gray-600">Live Data</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="h-96 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-xl flex items-center justify-center relative overflow-hidden border-2 border-gray-200 hover:border-green-300 transition-all duration-300 shadow-inner hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 opacity-50"></div>
              <div className="text-center z-10">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-float" />
                <p className="text-gray-500 text-lg">Strategic Tanzania Distribution Map</p>
                <p className="text-gray-400 text-sm">Real-time route optimization and market intelligence</p>
              </div>
              
              {/* Live route indicators */}
              <div className="absolute top-4 right-4 glass rounded-xl p-3 shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-float">
                <h4 className="font-medium text-gray-900 mb-2">Active Routes</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span>Dar-Dodoma: 24 vehicles</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    <span>Mwanza-Bukoba: 18 vehicles</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                    <span>Arusha-Moshi: 15 vehicles</span>
                  </div>
                </div>
              </div>
              
              {/* Live performance indicators */}
              <div className="absolute bottom-4 left-4 glass rounded-xl p-3 shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-float">
                <h4 className="font-medium text-gray-900 mb-2">Live Performance</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>On-time Delivery:</span>
                    <span className="text-green-600 font-bold">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Route Efficiency:</span>
                    <span className="text-blue-600 font-bold">87.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost Optimization:</span>
                    <span className="text-purple-600 font-bold">23.4%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Distribution Insights</h4>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                <h5 className="text-sm font-medium text-green-900">High Opportunity</h5>
                <p className="text-xs text-green-700">Mbeya region shows 32% growth potential</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                <h5 className="text-sm font-medium text-blue-900">Route Optimization</h5>
                <p className="text-xs text-blue-700">Consolidate Kilimanjaro routes for 18% savings</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                <h5 className="text-sm font-medium text-yellow-900">Market Alert</h5>
                <p className="text-xs text-yellow-700">Competitor activity increased in Mwanza</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                <h5 className="text-sm font-medium text-purple-900">Demand Forecast</h5>
                <p className="text-xs text-purple-700">25% increase expected in Dar es Salaam</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Regional Distribution</h2>
          <div className="h-64 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 rounded-xl p-4 shadow-inner">
            {/* Functional pie chart simulation */}
            <div className="h-full flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8" 
                    strokeDasharray="75.4 251.2" strokeDashoffset="0"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="8" 
                    strokeDasharray="50.3 251.2" strokeDashoffset="-75.4"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="8" 
                    strokeDasharray="37.7 251.2" strokeDashoffset="-125.7"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text animate-pulse">100%</div>
                    <div className="text-sm text-gray-500">Coverage</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Dar es Salaam (30%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Mwanza (20%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span>Others (50%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Market Opportunities</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-green-900">High Growth Potential</h3>
                <DollarSign className="h-5 w-5 text-green-600 animate-pulse" />
              </div>
              <p className="text-sm text-green-700 mb-2">Mbeya region shows 25% untapped market potential</p>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-blue-900">Route Optimization</h3>
                <TrendingUp className="h-5 w-5 text-blue-600 animate-bounce" />
              </div>
              <p className="text-sm text-blue-700 mb-2">Consolidate 3 routes in Kilimanjaro for 15% cost savings</p>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-1000" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-yellow-900">Inventory Alert</h3>
                <AlertCircle className="h-5 w-5 text-yellow-600 animate-pulse" />
              </div>
              <p className="text-sm text-yellow-700 mb-2">Stock levels in Mwanza below optimal threshold</p>
              <div className="w-full bg-yellow-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 h-2 rounded-full transition-all duration-1000" style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;