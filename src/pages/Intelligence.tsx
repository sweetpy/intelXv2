import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Upload, 
  FileText, 
  Image, 
  Video, 
  Music,
  Database,
  Search,
  Filter,
  Tag,
  Lightbulb,
  Zap,
  Target,
  TrendingUp,
  Eye,
  Download,
  Trash2,
  Plus,
  RefreshCw,
  Sparkles,
  Bot,
  MessageSquare,
  BarChart3,
  Globe,
  Users,
  Package,
  MapPin,
  Calendar,
  Clock,
  Star,
  Award,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Layers,
  Network,
  Cpu,
  Activity,
  Bookmark,
  Share2,
  Copy,
  ExternalLink,
  FileImage,
  FileVideo,
  FileAudio,
  Archive,
  Folder,
  FolderOpen,
  Hash,
  Link,
  Paperclip,
  Maximize2,
  Building2,
  Shield,
  DollarSign
} from 'lucide-react';
import AIChat from '../components/AIChat';

interface IntelligenceFile {
  id: string;
  name: string;
  type: string;
  category: string;
  size: string;
  uploadDate: string;
  lastAnalyzed: string;
  aiTags: string[];
  userTags: string[];
  insights: AIInsight[];
  confidence: number;
  relevanceScore: number;
  connections: string[];
  summary: string;
  keyFindings: string[];
  actionableItems: string[];
  status: 'processing' | 'analyzed' | 'archived' | 'flagged';
  source: string;
  metadata: Record<string, any>;
}

interface AIInsight {
  id: string;
  type: 'opportunity' | 'threat' | 'trend' | 'recommendation' | 'prediction' | 'correlation';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  relatedFiles: string[];
  actionItems: string[];
  priority: number;
}

interface KnowledgeGraph {
  nodes: Array<{
    id: string;
    label: string;
    type: 'file' | 'concept' | 'entity' | 'trend';
    weight: number;
    connections: number;
  }>;
  edges: Array<{
    source: string;
    target: string;
    strength: number;
    type: 'related' | 'causes' | 'influences' | 'contains';
  }>;
}

const Intelligence = () => {
  const [selectedTab, setSelectedTab] = useState('databank');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiMode, setAiMode] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiChatMinimized, setAiChatMinimized] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<IntelligenceFile[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);

  const intelligenceFiles: IntelligenceFile[] = [
    {
      id: 'FILE-001',
      name: 'Tanzania Market Research Report 2024',
      type: 'document',
      category: 'Market Research',
      size: '15.2 MB',
      uploadDate: '2024-01-15',
      lastAnalyzed: '2024-01-15 14:30',
      aiTags: ['market-analysis', 'consumer-behavior', 'growth-trends', 'competitive-landscape'],
      userTags: ['quarterly-report', 'strategic-planning'],
      insights: [
        {
          id: 'INS-001',
          type: 'opportunity',
          title: 'Untapped Rural Market Potential',
          description: 'AI analysis reveals 32% untapped market potential in rural Tanzania, particularly in Mbeya and Rukwa regions',
          confidence: 89,
          impact: 'high',
          timeframe: 'Q2-Q3 2024',
          relatedFiles: ['FILE-002', 'FILE-005'],
          actionItems: ['Conduct rural market entry study', 'Identify local distribution partners'],
          priority: 1
        }
      ],
      confidence: 94,
      relevanceScore: 98,
      connections: ['FILE-002', 'FILE-003', 'FILE-008'],
      summary: 'Comprehensive analysis of Tanzania consumer market with focus on FMCG sector growth opportunities',
      keyFindings: [
        'Rural market penetration below 35% across most categories',
        'Mobile payment adoption driving e-commerce growth',
        'Youth demographic (18-35) represents 60% of purchasing power'
      ],
      actionableItems: [
        'Develop rural distribution strategy',
        'Invest in mobile payment integration',
        'Create youth-focused product lines'
      ],
      status: 'analyzed',
      source: 'Market Research Firm',
      metadata: {
        pages: 156,
        charts: 45,
        dataPoints: 2340,
        regions: 26
      }
    },
    {
      id: 'FILE-002',
      name: 'Competitor Analysis - East Africa FMCG',
      type: 'report',
      category: 'Competitive Intelligence',
      size: '8.7 MB',
      uploadDate: '2024-01-12',
      lastAnalyzed: '2024-01-12 16:45',
      aiTags: ['competitor-analysis', 'market-share', 'pricing-strategy', 'distribution-channels'],
      userTags: ['confidential', 'strategic'],
      insights: [
        {
          id: 'INS-002',
          type: 'threat',
          title: 'Aggressive Competitor Expansion',
          description: 'Major competitor planning 40% distribution network expansion in Mwanza and Tabora regions',
          confidence: 85,
          impact: 'high',
          timeframe: 'Next 6 months',
          relatedFiles: ['FILE-001', 'FILE-007'],
          actionItems: ['Accelerate market entry in target regions', 'Strengthen distributor partnerships'],
          priority: 1
        }
      ],
      confidence: 91,
      relevanceScore: 95,
      connections: ['FILE-001', 'FILE-004', 'FILE-009'],
      summary: 'Deep dive into competitive landscape across East Africa with focus on distribution strategies',
      keyFindings: [
        'Top 3 competitors control 68% of market share',
        'Price wars intensifying in urban markets',
        'Digital transformation accelerating competitive advantage'
      ],
      actionableItems: [
        'Develop counter-competitive strategy',
        'Accelerate digital transformation',
        'Focus on underserved market segments'
      ],
      status: 'analyzed',
      source: 'Internal Research Team',
      metadata: {
        competitors: 15,
        regions: 8,
        timeframe: '2023-2024'
      }
    },
    {
      id: 'FILE-003',
      name: 'Consumer Behavior Study - Urban vs Rural',
      type: 'research',
      category: 'Consumer Insights',
      size: '22.1 MB',
      uploadDate: '2024-01-10',
      lastAnalyzed: '2024-01-10 11:20',
      aiTags: ['consumer-behavior', 'urban-rural-divide', 'purchasing-patterns', 'brand-loyalty'],
      userTags: ['primary-research', 'survey-data'],
      insights: [
        {
          id: 'INS-003',
          type: 'trend',
          title: 'Rural Digital Payment Adoption',
          description: 'Rural consumers showing 45% increase in mobile payment usage, creating new distribution opportunities',
          confidence: 87,
          impact: 'medium',
          timeframe: 'Ongoing trend',
          relatedFiles: ['FILE-001', 'FILE-006'],
          actionItems: ['Develop mobile-first rural strategy', 'Partner with mobile payment providers'],
          priority: 2
        }
      ],
      confidence: 88,
      relevanceScore: 92,
      connections: ['FILE-001', 'FILE-006', 'FILE-010'],
      summary: 'Comprehensive study comparing urban and rural consumer behaviors across Tanzania',
      keyFindings: [
        'Rural consumers prefer bulk purchasing (68% vs 32% urban)',
        'Brand loyalty higher in rural areas (78% vs 45% urban)',
        'Mobile payments growing 45% annually in rural areas'
      ],
      actionableItems: [
        'Develop bulk packaging for rural markets',
        'Strengthen brand presence in rural areas',
        'Integrate mobile payment solutions'
      ],
      status: 'analyzed',
      source: 'Consumer Research Institute',
      metadata: {
        respondents: 5000,
        regions: 12,
        methodology: 'Mixed-methods'
      }
    }
  ];

  const aiInsights: AIInsight[] = [
    {
      id: 'AI-001',
      type: 'opportunity',
      title: 'Cross-Industry Synergy Opportunity',
      description: 'AI detected potential for pharmaceutical-agriculture cross-selling in rural markets based on seasonal patterns',
      confidence: 82,
      impact: 'high',
      timeframe: 'Q2 2024',
      relatedFiles: ['FILE-001', 'FILE-003'],
      actionItems: ['Develop integrated rural health-agriculture program', 'Partner with agricultural cooperatives'],
      priority: 1
    },
    {
      id: 'AI-002',
      type: 'prediction',
      title: 'Market Disruption Forecast',
      description: 'Predictive models indicate 67% probability of new market entrant in telecommunications sector within 18 months',
      confidence: 76,
      impact: 'medium',
      timeframe: '18 months',
      relatedFiles: ['FILE-002', 'FILE-007'],
      actionItems: ['Monitor regulatory changes', 'Strengthen telecom partnerships'],
      priority: 2
    },
    {
      id: 'AI-003',
      type: 'correlation',
      title: 'Weather-Demand Correlation Discovery',
      description: 'Strong correlation (r=0.84) between rainfall patterns and FMCG demand in agricultural regions',
      confidence: 91,
      impact: 'medium',
      timeframe: 'Seasonal',
      relatedFiles: ['FILE-001', 'FILE-003'],
      actionItems: ['Implement weather-based demand forecasting', 'Adjust inventory based on weather predictions'],
      priority: 3
    }
  ];

  const knowledgeGraph: KnowledgeGraph = {
    nodes: [
      { id: 'rural-markets', label: 'Rural Markets', type: 'concept', weight: 95, connections: 8 },
      { id: 'mobile-payments', label: 'Mobile Payments', type: 'trend', weight: 87, connections: 6 },
      { id: 'consumer-behavior', label: 'Consumer Behavior', type: 'concept', weight: 92, connections: 12 },
      { id: 'competition', label: 'Competitive Landscape', type: 'entity', weight: 89, connections: 7 },
      { id: 'distribution', label: 'Distribution Networks', type: 'concept', weight: 94, connections: 10 }
    ],
    edges: [
      { source: 'rural-markets', target: 'mobile-payments', strength: 0.84, type: 'influences' },
      { source: 'consumer-behavior', target: 'rural-markets', strength: 0.76, type: 'contains' },
      { source: 'competition', target: 'distribution', strength: 0.91, type: 'influences' }
    ]
  };

  const categories = [
    { id: 'all', name: 'All Files', count: 156, icon: Archive },
    { id: 'market-research', name: 'Market Research', count: 45, icon: BarChart3 },
    { id: 'competitor-intel', name: 'Competitive Intelligence', count: 32, icon: Target },
    { id: 'consumer-insights', name: 'Consumer Insights', count: 28, icon: Users },
    { id: 'industry-reports', name: 'Industry Reports', count: 23, icon: Building2 },
    { id: 'regulatory', name: 'Regulatory & Compliance', count: 18, icon: Shield },
    { id: 'financial', name: 'Financial Analysis', count: 10, icon: DollarSign }
  ];

  const handleFileUpload = () => {
    setShowUploadModal(true);
  };

  const handleAIAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // Simulate new insights generation
    }, 3000);
  };

  const handleExportData = () => {
    // Export functionality
  };

  const handleAnalyzeAll = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="h-6 w-6 text-blue-500" />;
      case 'image': return <FileImage className="h-6 w-6 text-green-500" />;
      case 'video': return <FileVideo className="h-6 w-6 text-purple-500" />;
      case 'audio': return <FileAudio className="h-6 w-6 text-orange-500" />;
      case 'data': return <Database className="h-6 w-6 text-indigo-500" />;
      case 'report': return <BarChart3 className="h-6 w-6 text-red-500" />;
      case 'research': return <Lightbulb className="h-6 w-6 text-yellow-500" />;
      default: return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Target className="h-5 w-5 text-green-500" />;
      case 'threat': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'trend': return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'recommendation': return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case 'prediction': return <Brain className="h-5 w-5 text-purple-500" />;
      case 'correlation': return <Network className="h-5 w-5 text-indigo-500" />;
      default: return <Sparkles className="h-5 w-5 text-gray-500" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-blue-600 bg-blue-100';
    if (confidence >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const renderDataBank = () => (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl p-8 border-2 border-dashed border-blue-300 hover:border-purple-400 transition-colors">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Upload className="h-16 w-16 text-blue-500 animate-float" />
              <Brain className="h-6 w-6 text-purple-500 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Intelligence Data Bank</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Upload any file type - documents, images, videos, data files. Our AI will automatically analyze, 
            extract insights, identify patterns, and suggest innovative opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleFileUpload}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload Files
            </button>
            <button 
              onClick={handleAIAnalysis}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5 mr-2" />
                  AI Deep Analysis
                </>
              )}
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center justify-center p-2 bg-white/60 rounded-lg">
              <FileText className="h-4 w-4 text-blue-500 mr-2" />
              Documents
            </div>
            <div className="flex items-center justify-center p-2 bg-white/60 rounded-lg">
              <FileImage className="h-4 w-4 text-green-500 mr-2" />
              Images
            </div>
            <div className="flex items-center justify-center p-2 bg-white/60 rounded-lg">
              <FileVideo className="h-4 w-4 text-purple-500 mr-2" />
              Videos
            </div>
            <div className="flex items-center justify-center p-2 bg-white/60 rounded-lg">
              <Database className="h-4 w-4 text-indigo-500 mr-2" />
              Data Files
            </div>
          </div>
        </div>
      </div>

      {/* AI Processing Status */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Cpu className="h-5 w-5 text-purple-600 mr-2" />
            AI Processing Pipeline
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600">Active</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-blue-700">Files Processed</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">2,847</div>
            <div className="text-sm text-purple-700">AI Insights Generated</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <Network className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">1,234</div>
            <div className="text-sm text-green-700">Connections Mapped</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg text-center">
            <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">89</div>
            <div className="text-sm text-orange-700">Action Items</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search files, insights, tags, or ask AI questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
          
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
            <Bot className="h-4 w-4 mr-2" />
            Ask AI
          </button>
          <button 
            onClick={() => setShowAIChat(true)}
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 flex items-center"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            AI Chat
          </button>
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {intelligenceFiles.map((file) => (
          <div key={file.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              {getFileIcon(file.type)}
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  file.status === 'analyzed' ? 'bg-green-100 text-green-800' :
                  file.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  file.status === 'flagged' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {file.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(file.confidence)}`}>
                  {file.confidence}% confidence
                </span>
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{file.name}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">{file.summary}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                {file.uploadDate}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Archive className="h-4 w-4 mr-2" />
                {file.size}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Brain className="h-4 w-4 mr-2" />
                {file.insights.length} AI insights
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {file.aiTags.slice(0, 3).map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  #{tag}
                </span>
              ))}
              {file.aiTags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{file.aiTags.length - 3}
                </span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedFile(file.id)}
                className="flex-1 bg-purple-600 text-white px-3 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                Analyze
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md">
                <Download className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAIInsights = () => (
    <div className="space-y-6">
      {/* AI Insights Overview */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-purple-900 flex items-center">
            <Brain className="h-6 w-6 text-purple-600 mr-2 animate-pulse" />
            AI-Generated Market Intelligence
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-purple-700">Live Analysis</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/60 rounded-lg">
            <Lightbulb className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">47</div>
            <div className="text-sm text-yellow-700">New Opportunities</div>
          </div>
          <div className="text-center p-4 bg-white/60 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">12</div>
            <div className="text-sm text-red-700">Threat Alerts</div>
          </div>
          <div className="text-center p-4 bg-white/60 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">23</div>
            <div className="text-sm text-green-700">Trend Predictions</div>
          </div>
          <div className="text-center p-4 bg-white/60 rounded-lg">
            <Network className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-blue-700">Data Correlations</div>
          </div>
        </div>
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {aiInsights.map((insight) => (
          <div key={insight.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {getInsightIcon(insight.type)}
                <span className="ml-2 text-sm font-medium text-gray-600 capitalize">{insight.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                  insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {insight.impact} impact
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                  {insight.confidence}%
                </span>
              </div>
            </div>
            
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h4>
            <p className="text-gray-600 mb-4">{insight.description}</p>
            
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">Action Items:</h5>
                <ul className="space-y-1">
                  {insight.actionItems.map((item, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-xs text-gray-500">Timeframe: {insight.timeframe}</span>
                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
                  View Details
                  <ArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderKnowledgeGraph = () => (
    <div className="space-y-6">
      {/* Knowledge Graph Visualization */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Network className="h-6 w-6 text-indigo-600 mr-2" />
            Knowledge Graph & Connections
          </h3>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Rebuild Graph
          </button>
        </div>
        
        <div className="h-96 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="text-center z-10">
            <Network className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
            <p className="text-indigo-600 text-lg font-medium">Interactive Knowledge Graph</p>
            <p className="text-indigo-500 text-sm">Visualizing connections between data points</p>
          </div>
          
          {/* Mock network nodes */}
          {knowledgeGraph.nodes.map((node, index) => (
            <div
              key={node.id}
              className="absolute bg-white rounded-full p-3 shadow-lg border-2 border-indigo-200 hover:border-indigo-400 transition-colors cursor-pointer"
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index % 3) * 20}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="text-xs font-medium text-indigo-700 text-center">
                {node.label}
              </div>
              <div className="text-xs text-indigo-500 text-center">
                {node.connections} connections
              </div>
            </div>
          ))}
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {knowledgeGraph.edges.map((edge, index) => (
              <line
                key={index}
                x1="20%"
                y1="30%"
                x2="50%"
                y2="50%"
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.6"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {knowledgeGraph.nodes.map((node) => (
          <div key={node.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">{node.label}</h4>
              <span className="text-sm text-indigo-600 font-medium">{node.weight}% relevance</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{node.connections} connections</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                node.type === 'concept' ? 'bg-blue-100 text-blue-800' :
                node.type === 'trend' ? 'bg-green-100 text-green-800' :
                node.type === 'entity' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {node.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInnovationLab = () => (
    <div className="space-y-6">
      {/* Innovation Dashboard */}
      <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 rounded-xl p-6 border border-pink-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-purple-900 flex items-center">
            <Sparkles className="h-6 w-6 text-pink-500 mr-2 animate-pulse" />
            AI Innovation Lab
          </h3>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
            <span className="text-sm text-purple-700">Generating Ideas</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 rounded-xl p-4 border border-pink-100">
            <div className="flex items-center mb-3">
              <Target className="h-5 w-5 text-green-500 mr-2" />
              <h4 className="font-medium text-purple-900">Market Opportunities</h4>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-green-50 rounded text-sm text-green-800">
                🎯 Rural e-commerce platform integration
              </div>
              <div className="p-2 bg-green-50 rounded text-sm text-green-800">
                🌱 Agri-tech distribution partnerships
              </div>
              <div className="p-2 bg-green-50 rounded text-sm text-green-800">
                📱 Mobile-first rural banking solutions
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 rounded-xl p-4 border border-pink-100">
            <div className="flex items-center mb-3">
              <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
              <h4 className="font-medium text-purple-900">Innovation Ideas</h4>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-yellow-50 rounded text-sm text-yellow-800">
                🤖 AI-powered demand prediction
              </div>
              <div className="p-2 bg-yellow-50 rounded text-sm text-yellow-800">
                🚁 Drone delivery for remote areas
              </div>
              <div className="p-2 bg-yellow-50 rounded text-sm text-yellow-800">
                🌐 Blockchain supply chain tracking
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 rounded-xl p-4 border border-pink-100">
            <div className="flex items-center mb-3">
              <Brain className="h-5 w-5 text-purple-500 mr-2" />
              <h4 className="font-medium text-purple-900">AI Predictions</h4>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-purple-50 rounded text-sm text-purple-800">
                📈 25% market growth in rural areas
              </div>
              <div className="p-2 bg-purple-50 rounded text-sm text-purple-800">
                🔄 Digital transformation acceleration
              </div>
              <div className="p-2 bg-purple-50 rounded text-sm text-purple-800">
                🌍 Cross-border expansion opportunities
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Thinking Engine */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Bot className="h-5 w-5 text-blue-600 mr-2" />
          Creative AI Thinking Engine
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Cross-Industry Innovation Opportunities</h4>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-900 mb-2">FinTech + Agriculture Synergy</h5>
                <p className="text-sm text-blue-700">
                  Combine mobile payment data with agricultural cycles to predict farmer cash flow and optimize 
                  supply timing for maximum sales conversion.
                </p>
                <div className="mt-2 flex items-center text-xs text-blue-600">
                  <Star className="h-3 w-3 mr-1" />
                  Innovation Score: 94%
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <h5 className="font-medium text-green-900 mb-2">Healthcare + Logistics Integration</h5>
                <p className="text-sm text-green-700">
                  Use pharmaceutical distribution networks to deliver preventive healthcare services, 
                  creating dual revenue streams and social impact.
                </p>
                <div className="mt-2 flex items-center text-xs text-green-600">
                  <Award className="h-3 w-3 mr-1" />
                  Impact Score: 91%
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-900 mb-2">AI-Powered Micro-Franchising</h5>
                <p className="text-sm text-purple-700">
                  Create AI-managed micro-franchise networks where local entrepreneurs become 
                  data-driven distribution partners with real-time performance optimization.
                </p>
                <div className="mt-2 flex items-center text-xs text-purple-600">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Feasibility: 87%
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Disruptive Technology Applications</h4>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                <h5 className="font-medium text-orange-900 mb-2">Satellite + IoT Distribution</h5>
                <p className="text-sm text-orange-700">
                  Combine satellite imagery with IoT sensors to predict demand patterns based on 
                  weather, crop cycles, and population movement in real-time.
                </p>
                <div className="mt-2 flex items-center text-xs text-orange-600">
                  <Globe className="h-3 w-3 mr-1" />
                  Tech Readiness: 78%
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                <h5 className="font-medium text-indigo-900 mb-2">Blockchain Supply Transparency</h5>
                <p className="text-sm text-indigo-700">
                  Implement blockchain for complete supply chain transparency, enabling consumers 
                  to trace products from source to shelf while optimizing logistics.
                </p>
                <div className="mt-2 flex items-center text-xs text-indigo-600">
                  <Link className="h-3 w-3 mr-1" />
                  Adoption Potential: 82%
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                <h5 className="font-medium text-teal-900 mb-2">Predictive Social Commerce</h5>
                <p className="text-sm text-teal-700">
                  Use social media sentiment and behavior patterns to predict product demand 
                  and automatically adjust distribution strategies.
                </p>
                <div className="mt-2 flex items-center text-xs text-teal-600">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Market Readiness: 85%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatternRecognition = () => (
    <div className="space-y-6">
      {/* Pattern Recognition Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Pattern Recognition</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">847</div>
            <div className="text-sm text-blue-700">Patterns Detected</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">23</div>
            <div className="text-sm text-green-700">Emerging Trends</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Network className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-sm text-purple-700">Correlations Found</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-sm text-orange-700">Anomalies Detected</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="h-8 w-8 text-purple-600 mr-3 animate-pulse" />
            Intelligence Data Bank
          </h1>
          <p className="text-gray-600 mt-1">AI-powered knowledge repository with creative innovation engine</p>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
              <span>AI Learning Active</span>
            </div>
            <span>156 files analyzed</span>
            <span>2,847 insights generated</span>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <button 
            onClick={() => setAiMode(!aiMode)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
              aiMode 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-glow' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-purple-50'
            }`}
          >
            <Brain className="h-4 w-4 mr-2" />
            AI Mode
          </button>
          <button
            onClick={() => setAiChatOpen(!aiChatOpen)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
              aiChatOpen 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-glow' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-purple-50'
            }`}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            AI Chat
          </button>
          <button 
            onClick={handleExportData}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Intelligence
          </button>
          <button 
            onClick={handleAnalyzeAll}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                AI Analyze All
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'databank', label: 'Data Bank', icon: Database },
              { id: 'insights', label: 'AI Insights', icon: Brain },
              { id: 'innovation', label: 'Innovation Lab', icon: Lightbulb },
              { id: 'patterns', label: 'Pattern Recognition', icon: Target },
              { id: 'knowledge', label: 'Knowledge Graph', icon: Network }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-green-500 text-green-600'
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
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search files, insights, patterns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="market-research">Market Research</option>
              <option value="competitive-intel">Competitive Intelligence</option>
              <option value="consumer-behavior">Consumer Behavior</option>
              <option value="financial-data">Financial Data</option>
              <option value="operational-data">Operational Data</option>
            </select>
          </div>
          
          {/* Tab Content */}
          {selectedTab === 'databank' && renderDataBank()}
          {selectedTab === 'insights' && renderAIInsights()}
          {selectedTab === 'innovation' && renderInnovationLab()}
          {selectedTab === 'patterns' && renderPatternRecognition()}
          {selectedTab === 'knowledge' && renderKnowledgeGraph()}
        </div>
      </div>

      {/* AI Chat Assistant */}
      <AIChat 
        isOpen={aiChatOpen}
        onClose={() => setAiChatOpen(false)}
        onMinimize={() => setAiChatMinimized(!aiChatMinimized)}
        isMinimized={aiChatMinimized}
      />
    </div>
  );
};

export default Intelligence;