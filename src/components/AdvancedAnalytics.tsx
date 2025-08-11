import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  Zap, 
  BarChart3,
  PieChart,
  Activity,
  Lightbulb,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  MapPin,
  Users,
  Package,
  DollarSign
} from 'lucide-react';

interface PredictiveModel {
  id: string;
  name: string;
  accuracy: number;
  prediction: string;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  impact: 'high' | 'medium' | 'low';
}

interface MarketIntelligence {
  competitor: string;
  marketShare: number;
  recentActivity: string;
  threat: 'high' | 'medium' | 'low';
  recommendation: string;
}

const AdvancedAnalytics: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const predictiveModels: PredictiveModel[] = [
    {
      id: 'demand-forecast',
      name: 'Demand Forecasting',
      accuracy: 94.2,
      prediction: '25% increase in FMCG demand for Q2 2024',
      confidence: 89,
      trend: 'up',
      impact: 'high'
    },
    {
      id: 'price-optimization',
      name: 'Price Optimization',
      accuracy: 87.5,
      prediction: '12% margin improvement with dynamic pricing',
      confidence: 82,
      trend: 'up',
      impact: 'medium'
    },
    {
      id: 'churn-prediction',
      name: 'Customer Churn',
      accuracy: 91.8,
      prediction: '15 distributors at risk in next 30 days',
      confidence: 76,
      trend: 'down',
      impact: 'high'
    },
    {
      id: 'market-expansion',
      name: 'Market Expansion',
      accuracy: 88.3,
      prediction: 'Mbeya region shows 32% growth potential',
      confidence: 85,
      trend: 'up',
      impact: 'high'
    }
  ];

  const marketIntelligence: MarketIntelligence[] = [
    {
      competitor: 'Competitor A',
      marketShare: 28.5,
      recentActivity: 'Launched new product line in Dar es Salaam',
      threat: 'high',
      recommendation: 'Deploy counter-strategy within 48 hours'
    },
    {
      competitor: 'Competitor B',
      marketShare: 22.1,
      recentActivity: 'Expanded distribution network in Mwanza',
      threat: 'medium',
      recommendation: 'Monitor closely and strengthen partnerships'
    },
    {
      competitor: 'Competitor C',
      marketShare: 18.7,
      recentActivity: 'Price reduction campaign in Arusha',
      threat: 'medium',
      recommendation: 'Consider promotional response'
    }
  ];

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Brain className="h-6 w-6 text-purple-600 mr-2 animate-pulse" />
            Advanced Analytics & AI
          </h2>
          <p className="text-gray-600 mt-1">Machine learning powered insights and predictions</p>
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Regions</option>
            <option value="dar">Dar es Salaam</option>
            <option value="mwanza">Mwanza</option>
            <option value="arusha">Arusha</option>
          </select>
          
          <button 
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Run Analysis
              </>
            )}
          </button>
        </div>
      </div>

      {/* Predictive Models */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Target className="h-5 w-5 text-blue-600 mr-2" />
          Predictive Models
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {predictiveModels.map((model) => (
            <div key={model.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{model.name}</h4>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(model.trend)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(model.impact)}`}>
                    {model.impact} impact
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{model.prediction}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accuracy:</span>
                  <span className="font-medium">{model.accuracy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${model.accuracy}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Confidence:</span>
                  <span className="font-medium">{model.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${model.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Intelligence */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
          Competitive Intelligence
        </h3>
        
        <div className="space-y-4">
          {marketIntelligence.map((intel, index) => (
            <div key={index} className={`border rounded-lg p-4 ${getThreatColor(intel.threat)}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{intel.competitor}</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Market Share: {intel.marketShare}%</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getThreatColor(intel.threat)}`}>
                    {intel.threat} threat
                  </span>
                </div>
              </div>
              
              <p className="text-sm mb-2">
                <strong>Recent Activity:</strong> {intel.recentActivity}
              </p>
              
              <p className="text-sm">
                <strong>Recommendation:</strong> {intel.recommendation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h3 className="text-xl font-semibold text-purple-900 mb-4 flex items-center">
          <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
          AI-Generated Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/70 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Market Opportunity</h4>
            <p className="text-sm text-purple-700">
              AI identifies Mbeya region as having 32% untapped potential with FMCG products. 
              Recommend immediate market entry strategy.
            </p>
          </div>
          
          <div className="bg-white/70 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Risk Alert</h4>
            <p className="text-sm text-purple-700">
              Competitor activity increased 40% in Mwanza region. Deploy counter-strategy 
              within 48 hours to maintain market position.
            </p>
          </div>
          
          <div className="bg-white/70 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Optimization</h4>
            <p className="text-sm text-purple-700">
              Route consolidation in Kilimanjaro region can reduce costs by 18% while 
              maintaining 95% service level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;