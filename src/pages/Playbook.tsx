import React, { useState, useEffect } from 'react';
import ReportBuilder from '../components/ReportBuilder';
import { 
  Target, Users, TrendingUp, MapPin, CheckCircle, ArrowRight, Download, Search, Filter, Play, Clock, Star,
  ChevronDown, ChevronRight, Lightbulb, AlertTriangle, Award, BarChart3, Calculator, FileText, Zap, Settings,
  Calendar, DollarSign, Plus, RefreshCw, Save, Upload, Eye, Edit, Trash2, Brain, Sparkles, Rocket, Globe,
  Activity, Wifi, WifiOff, Maximize2, Minimize2, Bot, MessageSquare, Headphones, Video, Share2
} from 'lucide-react';

const Playbook: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState('market-analyzer');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [aiAssistantActive, setAiAssistantActive] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [collaborationMode, setCollaborationMode] = useState(false);
  const [marketData, setMarketData] = useState({
    totalMarket: 2400000000,
    addressableMarket: 1800000000,
    targetSegment: 450000000,
    estimatedShare: 12,
    potentialRevenue: 54000000
  });

  // Real-time market data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        totalMarket: prev.totalMarket + Math.random() * 1000000 - 500000,
        addressableMarket: prev.addressableMarket + Math.random() * 800000 - 400000,
        potentialRevenue: prev.potentialRevenue + Math.random() * 100000 - 50000
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `TSh ${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `TSh ${(amount / 1000000).toFixed(1)}M`;
    } else {
      return `TSh ${(amount / 1000).toFixed(0)}K`;
    }
  };

  const businessTools = [
    {
      id: 'market-analyzer',
      title: 'AI Market Size Calculator',
      icon: Calculator,
      color: 'blue',
      description: 'AI-powered market sizing with predictive analytics',
      status: 'active',
      lastUsed: '2 hours ago',
      insights: `${formatCurrency(marketData.potentialRevenue)} revenue potential identified`,
      aiPowered: true
    },
    {
      id: 'route-planner',
      title: 'Smart Route Optimizer',
      icon: Target,
      color: 'green',
      description: 'AI-driven route optimization with real-time traffic data',
      status: 'active',
      lastUsed: '4 hours ago',
      insights: '24 routes optimized, 18% cost reduction',
      aiPowered: true
    },
    {
      id: 'distributor-scorecard',
      title: 'Partner Intelligence Hub',
      icon: Users,
      color: 'purple',
      description: 'AI-powered distributor evaluation and relationship management',
      status: 'active',
      lastUsed: '1 day ago',
      insights: '247 distributors evaluated, 89% satisfaction',
      aiPowered: true
    },
    {
      id: 'pricing-optimizer',
      title: 'Dynamic Pricing Engine',
      icon: DollarSign,
      color: 'orange',
      description: 'Real-time pricing optimization based on market conditions',
      status: 'active',
      lastUsed: '6 hours ago',
      insights: '12% margin improvement achieved',
      aiPowered: true
    },
    {
      id: 'performance-tracker',
      title: 'Live Performance Command Center',
      icon: BarChart3,
      color: 'red',
      description: 'Real-time performance monitoring with predictive alerts',
      status: 'active',
      lastUsed: '30 minutes ago',
      insights: '94.2% on-time delivery rate',
      aiPowered: true
    },
    {
      id: 'competitor-intel',
      title: 'Market Intelligence Radar',
      icon: Zap,
      color: 'indigo',
      description: 'AI-powered competitive intelligence and market surveillance',
      status: 'active',
      lastUsed: '1 hour ago',
      insights: '15 competitor moves tracked this week',
      aiPowered: true
    },
    {
      id: 'demand-forecaster',
      title: 'Predictive Demand Engine',
      icon: TrendingUp,
      color: 'teal',
      description: 'Machine learning-powered demand forecasting',
      status: 'active',
      lastUsed: '3 hours ago',
      insights: '25% demand increase predicted for Q2',
      aiPowered: true
    },
    {
      id: 'territory-mapper',
      title: 'Smart Territory Planner',
      icon: MapPin,
      color: 'cyan',
      description: 'AI-optimized territory planning with demographic insights',
      status: 'active',
      lastUsed: '5 hours ago',
      insights: '26 regions mapped with coverage gaps identified',
      aiPowered: true
    }
  ];

  const workingTemplates = [
    {
      category: 'Market Entry',
      templates: [
        { name: 'Market Entry Checklist', type: 'Checklist', status: 'In Progress', progress: 65, lastModified: '2 hours ago' },
        { name: 'Distributor Evaluation Matrix', type: 'Scorecard', status: 'Complete', progress: 100, lastModified: '1 day ago' },
        { name: 'Go-to-Market Timeline', type: 'Project Plan', status: 'Draft', progress: 30, lastModified: '3 hours ago' }
      ]
    },
    {
      category: 'Channel Management',
      templates: [
        { name: 'Channel Conflict Resolution', type: 'Framework', status: 'Active', progress: 80, lastModified: '4 hours ago' },
        { name: 'Distributor Agreement Template', type: 'Legal Doc', status: 'Review', progress: 90, lastModified: '6 hours ago' },
        { name: 'Performance Review Template', type: 'Assessment', status: 'Complete', progress: 100, lastModified: '2 days ago' }
      ]
    },
    {
      category: 'Market Intelligence',
      templates: [
        { name: 'Competitive Analysis Report', type: 'Report', status: 'In Progress', progress: 45, lastModified: '1 hour ago' },
        { name: 'Market Share Tracker', type: 'Dashboard', status: 'Active', progress: 75, lastModified: '30 minutes ago' },
        { name: 'Customer Segmentation Model', type: 'Analysis', status: 'Draft', progress: 25, lastModified: '5 hours ago' }
      ]
    }
  ];

  const handleCalculateMarket = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setMarketData(prev => ({
        ...prev,
        potentialRevenue: prev.addressableMarket * (prev.estimatedShare / 100)
      }));
      setIsCalculating(false);
    }, 2000);
  };

  const handleSaveTemplate = (templateName: string) => {
    // Simulate saving template
    console.log(`Saving template: ${templateName}`);
    // In a real app, this would save to backend
  };

  const handleExportData = () => {
    const data = {
      marketData,
      businessTools,
      workingTemplates,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intellx-playbook-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete': return 'bg-green-100 text-green-800';
      case 'In Progress': 
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Review': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderMarketAnalyzer = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 border border-blue-200 relative overflow-hidden">
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-blue-600 font-medium">AI Active</span>
        </div>
        <div className="flex items-center mb-4">
          <Brain className="h-6 w-6 text-blue-600 mr-2 animate-pulse" />
          <h3 className="text-xl font-semibold text-blue-900">AI Market Opportunity Calculator</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100 hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{formatCurrency(marketData.totalMarket)}</div>
            <div className="text-sm text-gray-600">Total Market Size</div>
            <div className="text-xs text-green-600 mt-1">↗ Live data</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100 hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{formatCurrency(marketData.addressableMarket)}</div>
            <div className="text-sm text-gray-600">Addressable Market</div>
            <div className="text-xs text-blue-600 mt-1">AI Calculated</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100 hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{formatCurrency(marketData.potentialRevenue)}</div>
            <div className="text-sm text-gray-600">Revenue Potential</div>
            <div className="text-xs text-purple-600 mt-1">Predicted</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <Settings className="h-5 w-5 text-gray-600 mr-2" />
            <h4 className="font-semibold text-gray-900">Market Entry Parameters</h4>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Region</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Dar es Salaam</option>
                <option>Mwanza</option>
                <option>Arusha</option>
                <option>Dodoma</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>FMCG</option>
                <option>Pharmaceuticals</option>
                <option>Agriculture</option>
                <option>Electronics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Investment Budget (TSh)</label>
              <input 
                type="number" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="50,000,000"
                onChange={(e) => setMarketData(prev => ({
                  ...prev,
                  targetSegment: parseInt(e.target.value) || 0
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Market Share (%)</label>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={marketData.estimatedShare}
                onChange={(e) => setMarketData(prev => ({
                  ...prev,
                  estimatedShare: parseInt(e.target.value)
                }))}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600">{marketData.estimatedShare}%</div>
            </div>
            <button 
              onClick={handleCalculateMarket}
              disabled={isCalculating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center transform hover:scale-105"
            >
              {isCalculating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  AI Calculate ROI
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <Sparkles className="h-5 w-5 text-purple-600 mr-2" />
            <h4 className="font-semibold text-gray-900">AI ROI Projections</h4>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <span className="text-sm font-medium text-green-800">Year 1 Revenue</span>
              <span className="font-bold text-green-600">{formatCurrency(marketData.potentialRevenue)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <span className="text-sm font-medium text-blue-800">Break-even Point</span>
              <span className="font-bold text-blue-600">{Math.ceil(marketData.targetSegment / (marketData.potentialRevenue / 12))} months</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <span className="text-sm font-medium text-purple-800">3-Year ROI</span>
              <span className="font-bold text-purple-600">{Math.round((marketData.potentialRevenue * 3) / marketData.targetSegment * 100)}%</span>
            </div>
            <div className="p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                <h5 className="font-medium text-gray-900">AI Risk Assessment</h5>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Market Risk:</span>
                  <span className="text-yellow-600">Medium</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Competition Risk:</span>
                  <span className="text-red-600">High</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Execution Risk:</span>
                  <span className="text-green-600">Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRoutePlanner = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-xl p-6 border border-green-200 relative overflow-hidden">
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <Activity className="h-4 w-4 text-green-500 animate-pulse" />
          <span className="text-xs text-green-600 font-medium">Live Optimization</span>
        </div>
        <div className="flex items-center mb-4">
          <Rocket className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="text-xl font-semibold text-green-900">Smart Route Strategy Dashboard</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-green-100 text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">24</div>
            <div className="text-sm text-gray-600">Active Routes</div>
            <div className="text-xs text-green-500 mt-1">↗ +3 today</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-green-100 text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">78%</div>
            <div className="text-sm text-gray-600">Market Coverage</div>
            <div className="text-xs text-blue-500 mt-1">AI Optimized</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-green-100 text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">92%</div>
            <div className="text-sm text-gray-600">Route Efficiency</div>
            <div className="text-xs text-purple-500 mt-1">Real-time</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-green-100 text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">TSh 125K</div>
            <div className="text-sm text-gray-600">Cost per Route</div>
            <div className="text-xs text-orange-500 mt-1">↓ -18%</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center mb-4">
          <Zap className="h-5 w-5 text-yellow-500 mr-2" />
          <h4 className="font-semibold text-gray-900">AI-Powered Route Actions</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 text-left transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center mb-2">
              <Target className="h-5 w-5 text-green-600 mr-2 animate-pulse" />
              <span className="font-medium">Identify New Opportunities</span>
            </div>
            <p className="text-sm text-gray-600">Find untapped markets and expansion opportunities</p>
            <div className="mt-2 text-xs text-green-600 font-medium">🎯 3 AI-identified opportunities</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 text-left transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 text-blue-600 mr-2 animate-bounce" />
              <span className="font-medium">Optimize Distributor Network</span>
            </div>
            <p className="text-sm text-gray-600">Improve distributor performance and coverage</p>
            <div className="mt-2 text-xs text-blue-600 font-medium">🤖 247 distributors AI-monitored</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 text-left transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center mb-2">
              <BarChart3 className="h-5 w-5 text-purple-600 mr-2 animate-pulse" />
              <span className="font-medium">Performance Analytics</span>
            </div>
            <p className="text-sm text-gray-600">Deep dive into route performance metrics</p>
            <div className="mt-2 text-xs text-purple-600 font-medium">📊 94.2% AI-predicted success</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 text-left transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-orange-600 mr-2 animate-spin" />
              <span className="font-medium">Cost Optimization</span>
            </div>
            <p className="text-sm text-gray-600">Reduce operational costs and improve margins</p>
            <div className="mt-2 text-xs text-orange-600 font-medium">💰 18% AI-driven cost reduction</div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between glass rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
        <div>
          <h1 className="text-3xl font-bold gradient-text">RTM Strategy Workbench</h1>
          <p className="text-gray-600 mt-1">Daily business tools for route to market optimization and execution</p>
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center">
              <Brain className="h-4 w-4 text-purple-500 mr-1 animate-pulse" />
              <span className="text-sm text-purple-600">AI-Powered</span>
            </div>
            <div className="flex items-center">
              <Activity className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">Live Data</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-sm text-blue-600">26 Regions</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          {/* AI Assistant Toggle */}
          <button
            onClick={() => setAiAssistantActive(!aiAssistantActive)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
              aiAssistantActive 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-glow' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-purple-50'
            }`}
          >
            <Bot className="h-4 w-4 mr-2" />
            AI Assistant
          </button>
          
          {/* Voice Mode */}
          <button
            onClick={() => setVoiceMode(!voiceMode)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              voiceMode 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-red-50'
            }`}
            title="Voice Commands"
          >
            <Headphones className="h-4 w-4" />
          </button>
          
          {/* Collaboration Mode */}
          <button
            onClick={() => setCollaborationMode(!collaborationMode)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              collaborationMode 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-blue-50'
            }`}
            title="Team Collaboration"
          >
            <Share2 className="h-4 w-4" />
          </button>

          <button 
            onClick={handleExportData}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 flex items-center transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Analysis
          </button>
          <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center transform hover:scale-105 shadow-lg hover:shadow-xl animate-glow">
            <Play className="h-4 w-4 mr-2" />
            Run Analysis
          </button>
        </div>
      </div>

      {/* AI Assistant Panel */}
      {aiAssistantActive && (
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 rounded-xl p-6 border border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-float">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Bot className="h-6 w-6 text-purple-600 mr-2 animate-bounce" />
              <h2 className="text-xl font-semibold text-purple-900">AI Strategy Assistant</h2>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-purple-700">Active</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex items-center mb-2">
                <Sparkles className="h-5 w-5 text-yellow-500 mr-2 animate-pulse" />
                <span className="font-medium text-purple-900">Smart Recommendations</span>
              </div>
              <p className="text-sm text-purple-700">AI suggests focusing on Mbeya region for 32% growth potential with FMCG products.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex items-center mb-2">
                <Brain className="h-5 w-5 text-blue-500 mr-2 animate-pulse" />
                <span className="font-medium text-purple-900">Predictive Insights</span>
              </div>
              <p className="text-sm text-purple-700">Market analysis predicts 25% demand increase in Dar es Salaam for Q2 2024.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2 animate-pulse" />
                <span className="font-medium text-purple-900">Risk Alerts</span>
              </div>
              <p className="text-sm text-purple-700">Competitor activity increased 40% in Mwanza. Deploy counter-strategy immediately.</p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${voiceMode ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder={voiceMode ? "🎤 Listening for voice commands..." : "Search business tools and templates..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </div>
          
          <button className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 flex items-center transform hover:scale-105 shadow-md hover:shadow-lg">
            <Filter className="h-4 w-4 mr-2" />
            Filter by Category
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tool Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-900">AI Business Tools</h3>
              </div>
            </div>
            <div className="p-2">
              {businessTools
                .filter(tool => 
                  searchTerm === '' || 
                  tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  tool.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-300 transform hover:scale-105 ${
                    selectedTool === tool.id
                      ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700 border border-green-200 shadow-lg'
                      : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <tool.icon className={`h-5 w-5 mr-2 ${
                        selectedTool === tool.id ? 'text-green-600' : 'text-gray-400 group-hover:text-blue-500'
                      }`} />
                      <span className="font-medium text-sm">{tool.title}</span>
                      {tool.aiPowered && (
                        <Brain className="h-3 w-3 ml-1 text-purple-500 animate-pulse" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      {tool.aiPowered && <Sparkles className="h-3 w-3 text-yellow-500" />}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{tool.description}</p>
                  <p className="text-xs text-blue-600 mb-2 font-medium">🤖 {tool.insights}</p>
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {tool.lastUsed}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Assistant */}
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg border border-purple-100 mt-6 p-4 hover:shadow-xl transition-shadow duration-300 animate-float">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Brain className="h-4 w-4 text-purple-500 mr-2 animate-pulse" />
              Live AI Insights
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                <p className="text-xs text-blue-800 font-medium">Market Opportunity</p>
                <p className="text-xs text-blue-700">🎯 Mbeya region shows 32% untapped potential</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                <p className="text-xs text-green-800 font-medium">Route Optimization</p>
                <p className="text-xs text-green-700">🚀 Consolidate 3 Kilimanjaro routes for 18% savings</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                <p className="text-xs text-purple-800 font-medium">Competitive Alert</p>
                <p className="text-xs text-purple-700">⚠️ New competitor activity in Mwanza region</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg border border-green-100 mt-6 p-4 hover:shadow-xl transition-shadow duration-300 animate-float">
            <div className="flex items-center mb-3">
              <Activity className="h-4 w-4 text-green-500 mr-2 animate-pulse" />
              <h3 className="font-semibold text-gray-900">Live Activity</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Tools Used</span>
                  <span>8/8</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full animate-glow" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                🤖 Active sessions: 8 AI tools running
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            {/* Content Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 via-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <h2 className="text-2xl font-bold gradient-text mr-2">
                    {businessTools.find(t => t.id === selectedTool)?.title}
                    </h2>
                    {businessTools.find(t => t.id === selectedTool)?.aiPowered && (
                      <Brain className="h-6 w-6 text-purple-500 animate-pulse" />
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">
                    {businessTools.find(t => t.id === selectedTool)?.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 transform hover:scale-110">
                    <Settings className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 transform hover:scale-110">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {selectedTool === 'market-analyzer' && renderMarketAnalyzer()}
              {selectedTool === 'route-planner' && renderRoutePlanner()}
              {selectedTool !== 'market-analyzer' && selectedTool !== 'route-planner' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                    {React.createElement(businessTools.find(t => t.id === selectedTool)?.icon || Target, {
                      className: "h-8 w-8 text-blue-500"
                    })}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {businessTools.find(t => t.id === selectedTool)?.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {businessTools.find(t => t.id === selectedTool)?.description}
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border border-blue-200">
                    <div className="flex items-center justify-center mb-2">
                      <Brain className="h-5 w-5 text-purple-500 mr-2 animate-pulse" />
                      <span className="text-sm font-medium text-purple-700">AI Insights</span>
                    </div>
                    <p className="text-blue-800 font-medium text-sm">
                      🤖 {businessTools.find(t => t.id === selectedTool)?.insights}
                    </p>
                  </div>
                  <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center">
                    <Rocket className="h-4 w-4 mr-2" />
                    Launch Tool
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      {/* Real-time Market Intelligence */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Globe className="h-6 w-6 text-blue-600 mr-2 animate-spin" />
            <h2 className="text-2xl font-bold gradient-text">Real-time Market Intelligence</h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-sm text-gray-600">Live Data</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-float" style={{ animationDelay: '0s' }}>
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600 mr-2 animate-bounce" />
              <h3 className="font-semibold text-blue-900">Market Movements</h3>
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">+15.3%</p>
            <p className="text-sm text-blue-700">FMCG sector growth this quarter</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-float" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center mb-2">
              <Target className="h-5 w-5 text-green-600 mr-2 animate-pulse" />
              <h3 className="font-semibold text-green-900">Route Efficiency</h3>
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">92.4%</p>
            <p className="text-sm text-green-700">Average delivery success rate</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-float" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center mb-2">
              <Eye className="h-5 w-5 text-purple-600 mr-2 animate-pulse" />
              <h3 className="font-semibold text-purple-900">Competitor Activity</h3>
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">23</p>
            <p className="text-sm text-purple-700">New moves tracked this week</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-float" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center mb-2">
              <Lightbulb className="h-5 w-5 text-orange-600 mr-2 animate-bounce" />
              <h3 className="font-semibold text-orange-900">AI Opportunities</h3>
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">8</p>
            <p className="text-sm text-orange-700">High-value prospects identified</p>
          </div>
        </div>
      </div>

      {/* Advanced Reporting */}
      <ReportBuilder />

      {/* Working Templates */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Active Templates & Frameworks</h2>
          </div>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center transform hover:scale-105 transition-transform duration-300">
            <Plus className="h-4 w-4 mr-1" />
            New Template
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {workingTemplates.map((category, index) => (
            <div key={index}>
              <h3 className="font-medium text-gray-900 mb-4">{category.category}</h3>
              <div className="space-y-3">
                {category.templates.map((template, templateIndex) => (
                  <div key={templateIndex} className="border border-gray-200 rounded-xl p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-sm hover:shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{template.name}</h4>
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => handleSaveTemplate(template.name)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-all duration-300 rounded hover:bg-blue-50 transform hover:scale-110"
                        >
                          <Save className="h-3 w-3" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-all duration-300 rounded hover:bg-green-50 transform hover:scale-110">
                          <Eye className="h-3 w-3" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-orange-600 transition-all duration-300 rounded hover:bg-orange-50 transform hover:scale-110">
                          <Edit className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                        {template.status}
                      </span>
                      <span className="text-xs text-gray-500">{template.type}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Modified: {template.lastModified}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full transition-all duration-1000" 
                            style={{ width: `${template.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{template.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playbook;