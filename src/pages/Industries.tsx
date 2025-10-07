import React, { useState } from 'react';
import { 
  Building2, 
  Pill, 
  Wheat, 
  Smartphone, 
  DollarSign, 
  Factory,
  TrendingUp,
  Users,
  Package,
  MapPin,
  BarChart3,
  Settings
} from 'lucide-react';

const Industries: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('fmcg');

  const industries = [
    {
      id: 'fmcg',
      name: 'Fast Moving Consumer Goods',
      icon: Package,
      color: 'green',
      description: 'Consumer products with high turnover rates',
      marketSize: 'TSh 1.2T',
      growth: '+12.5%',
      distributors: 342,
      products: 1250,
      regions: 26,
      marketShare: {
        total: '100%',
        leaders: [
          { company: 'Unilever Tanzania', share: 31.2, growth: '+4.1%' },
          { company: 'Procter & Gamble', share: 26.8, growth: '+3.7%' },
          { company: 'Colgate-Palmolive', share: 22.4, growth: '+2.9%' }
        ],
        segments: [
          { segment: 'Beverages', share: 35.2, leader: 'Coca-Cola Kwanza' },
          { segment: 'Personal Care', share: 28.7, leader: 'Unilever Tanzania' },
          { segment: 'Food Products', share: 22.1, leader: 'Bakhresa Group' },
          { segment: 'Household Items', share: 14.0, leader: 'Procter & Gamble' }
        ]
      }
    },
    {
      id: 'pharma',
      name: 'Pharmaceuticals & Healthcare',
      icon: Pill,
      color: 'blue',
      description: 'Medical products and healthcare solutions',
      marketSize: 'TSh 850B',
      growth: '+18.3%',
      distributors: 156,
      products: 890,
      regions: 24,
      marketShare: {
        total: '100%',
        leaders: [
          { company: 'Zenufa Laboratories', share: 34.8, growth: '+5.2%' },
          { company: 'Shelys Pharmaceuticals', share: 28.3, growth: '+4.1%' },
          { company: 'Novartis Tanzania', share: 24.1, growth: '+3.8%' }
        ],
        segments: [
          { segment: 'Generic Medicines', share: 45.3, leader: 'Shelys Pharmaceuticals' },
          { segment: 'Branded Medicines', share: 32.1, leader: 'Novartis Tanzania' },
          { segment: 'Medical Devices', share: 15.8, leader: 'GSK Tanzania' },
          { segment: 'Vaccines', share: 6.8, leader: 'GSK Tanzania' }
        ]
      }
    },
    {
      id: 'agriculture',
      name: 'Agriculture & Agribusiness',
      icon: Wheat,
      color: 'yellow',
      description: 'Agricultural inputs and farming solutions',
      marketSize: 'TSh 950B',
      growth: '+15.7%',
      distributors: 234,
      products: 567,
      regions: 26,
      marketShare: {
        total: '100%',
        leaders: [
          { company: 'Yara Tanzania', share: 35.3, growth: '+5.2%' },
          { company: 'Bayer CropScience', share: 28.9, growth: '+3.7%' },
          { company: 'Syngenta Tanzania', share: 21.6, growth: '+4.1%' }
        ],
        segments: [
          { segment: 'Fertilizers', share: 42.5, leader: 'Yara Tanzania' },
          { segment: 'Seeds', share: 28.3, leader: 'Bayer CropScience' },
          { segment: 'Pesticides', share: 19.7, leader: 'Syngenta Tanzania' },
          { segment: 'Equipment', share: 9.5, leader: 'John Deere Tanzania' }
        ]
      }
    },
    {
      id: 'telecom',
      name: 'Telecommunications',
      icon: Smartphone,
      color: 'purple',
      description: 'Mobile services and digital solutions',
      marketSize: 'TSh 680B',
      growth: '+22.1%',
      distributors: 89,
      products: 234,
      regions: 26,
      marketShare: {
        total: '100%',
        leaders: [
          { company: 'Vodacom Tanzania', share: 42.8, growth: '+2.1%' },
          { company: 'Airtel Tanzania', share: 31.5, growth: '+3.8%' },
          { company: 'Tigo Tanzania', share: 18.2, growth: '+1.2%' }
        ],
        segments: [
          { segment: 'Mobile Voice', share: 38.7, leader: 'Vodacom Tanzania' },
          { segment: 'Mobile Data', share: 35.2, leader: 'Vodacom Tanzania' },
          { segment: 'Mobile Money', share: 26.1, leader: 'Vodacom (M-Pesa)' }
        ]
      }
    },
    {
      id: 'financial',
      name: 'Financial Services',
      icon: DollarSign,
      color: 'indigo',
      description: 'Banking and financial products',
      marketSize: 'TSh 1.1T',
      growth: '+8.9%',
      distributors: 67,
      products: 145,
      regions: 22,
      marketShare: {
        total: '100%',
        leaders: [
          { company: 'CRDB Bank', share: 29.4, growth: '+2.3%' },
          { company: 'NMB Bank', share: 25.7, growth: '+1.9%' },
          { company: 'Stanbic Bank', share: 22.1, growth: '+2.7%' }
        ],
        segments: [
          { segment: 'Retail Banking', share: 45.8, leader: 'CRDB Bank' },
          { segment: 'Corporate Banking', share: 32.4, leader: 'Stanbic Bank' },
          { segment: 'Microfinance', share: 21.8, leader: 'NMB Bank' }
        ]
      }
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      icon: Factory,
      color: 'red',
      description: 'Industrial and consumer manufacturing',
      marketSize: 'TSh 750B',
      growth: '+10.4%',
      distributors: 198,
      products: 789,
      regions: 20,
      marketShare: {
        total: '100%',
        leaders: [
          { company: 'Tanzania Breweries', share: 38.6, growth: '+1.8%' },
          { company: 'Bakhresa Group', share: 27.3, growth: '+3.2%' },
          { company: 'Simba Cement', share: 19.9, growth: '+2.1%' }
        ],
        segments: [
          { segment: 'Food & Beverages', share: 42.1, leader: 'Tanzania Breweries' },
          { segment: 'Construction Materials', share: 28.7, leader: 'Simba Cement' },
          { segment: 'Textiles', share: 18.4, leader: 'Sunflag Tanzania' },
          { segment: 'Chemicals', share: 10.8, leader: 'Kibo Industries' }
        ]
      }
    }
  ];

  const selectedIndustryData = industries.find(ind => ind.id === selectedIndustry);

  const industryMetrics = {
    fmcg: {
      topProducts: [
        { name: 'Beverages', share: '28%', growth: '+15%' },
        { name: 'Personal Care', share: '24%', growth: '+12%' },
        { name: 'Food Products', share: '22%', growth: '+8%' },
        { name: 'Household Items', share: '18%', growth: '+18%' },
        { name: 'Snacks & Confectionery', share: '8%', growth: '+25%' }
      ],
      challenges: [
        'Seasonal demand fluctuations',
        'Cold chain logistics',
        'Brand competition',
        'Rural market penetration'
      ],
      opportunities: [
        'E-commerce integration',
        'Premium product segments',
        'Sustainable packaging',
        'Digital marketing'
      ]
    },
    pharma: {
      topProducts: [
        { name: 'Generic Medicines', share: '35%', growth: '+20%' },
        { name: 'Medical Devices', share: '25%', growth: '+15%' },
        { name: 'Vaccines', share: '20%', growth: '+25%' },
        { name: 'Diagnostics', share: '12%', growth: '+18%' },
        { name: 'Supplements', share: '8%', growth: '+22%' }
      ],
      challenges: [
        'Regulatory compliance',
        'Cold storage requirements',
        'Counterfeit products',
        'Healthcare access'
      ],
      opportunities: [
        'Telemedicine growth',
        'Digital health solutions',
        'Rural healthcare expansion',
        'Preventive care focus'
      ]
    }
  };

  const currentMetrics = industryMetrics[selectedIndustry as keyof typeof industryMetrics] || industryMetrics.fmcg;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Industry Solutions</h1>
          <p className="text-gray-600 mt-1">Customized route to market strategies for different industries</p>
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Customize
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Add Industry
          </button>
        </div>
      </div>

      {/* Industry Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((industry) => (
          <div
            key={industry.id}
            onClick={() => setSelectedIndustry(industry.id)}
            className={`bg-white rounded-xl shadow-sm p-6 border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedIndustry === industry.id 
                ? `border-${industry.color}-500 bg-${industry.color}-50` 
                : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${industry.color}-100`}>
                <industry.icon className={`h-6 w-6 text-${industry.color}-600`} />
              </div>
              <span className={`text-sm font-medium ${
                selectedIndustry === industry.id ? `text-${industry.color}-600` : 'text-green-600'
              }`}>
                {industry.growth}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{industry.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{industry.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Market Size</p>
                <p className="font-semibold text-gray-900">{industry.marketSize}</p>
              </div>
              <div>
                <p className="text-gray-500">Distributors</p>
                <p className="font-semibold text-gray-900">{industry.distributors}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Industry Details */}
      {selectedIndustryData && (
        <div className="space-y-6">
          {/* Industry Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-${selectedIndustryData.color}-100 mr-4`}>
                <selectedIndustryData.icon className={`h-8 w-8 text-${selectedIndustryData.color}-600`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedIndustryData.name}</h2>
                <p className="text-gray-600">{selectedIndustryData.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{selectedIndustryData.marketSize}</p>
                <p className="text-sm text-gray-600">Market Size</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{selectedIndustryData.distributors}</p>
                <p className="text-sm text-gray-600">Distributors</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Package className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{selectedIndustryData.products}</p>
                <p className="text-sm text-gray-600">Products</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{selectedIndustryData.regions}</p>
                <p className="text-sm text-gray-600">Regions</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Market Share Leaders</h3>
              <div className="space-y-4">
                {selectedIndustryData?.marketShare.leaders.map((leader, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{leader.company}</h4>
                      <p className="text-sm text-gray-500">Growth: {leader.growth}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">{leader.share}%</span>
                      <p className="text-xs text-gray-500">Market Share</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Segments */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Market Segments</h3>
              <div className="space-y-4">
                {selectedIndustryData?.marketShare.segments.map((segment, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">{segment.segment}</span>
                      <span className="text-sm text-gray-600">{segment.share}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${segment.share}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">Leader: {segment.leader}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tanzania Interactive Map - Enhanced */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Regional Market Penetration</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg relative overflow-hidden">
                  {/* SVG Tanzania Map */}
                  <svg viewBox="0 0 600 400" className="w-full h-full">
                    {/* Background */}
                    <rect width="600" height="400" fill="url(#mapGradient)" />
                    <defs>
                      <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F0FDF4" />
                        <stop offset="100%" stopColor="#DBEAFE" />
                      </linearGradient>
                    </defs>

                    {/* Regional Markers with Size Based on Penetration */}
                    {/* Dar es Salaam - High Penetration */}
                    <g className="cursor-pointer transform hover:scale-110 transition-transform duration-300">
                      <circle cx="480" cy="280" r="35" fill="#10B981" opacity="0.3">
                        <animate attributeName="r" values="35;38;35" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="480" cy="280" r="22" fill="#10B981" stroke="white" strokeWidth="3" />
                      <text x="480" y="318" textAnchor="middle" className="text-xs font-semibold fill-gray-700">Dar es Salaam</text>
                      <text x="480" y="332" textAnchor="middle" className="text-xs font-bold fill-green-600">89.2%</text>
                    </g>

                    {/* Mwanza - Medium-High Penetration */}
                    <g className="cursor-pointer transform hover:scale-110 transition-transform duration-300">
                      <circle cx="180" cy="120" r="28" fill="#F59E0B" opacity="0.3">
                        <animate attributeName="r" values="28;31;28" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="180" cy="120" r="18" fill="#F59E0B" stroke="white" strokeWidth="3" />
                      <text x="180" y="150" textAnchor="middle" className="text-xs font-semibold fill-gray-700">Mwanza</text>
                      <text x="180" y="164" textAnchor="middle" className="text-xs font-bold fill-orange-600">64.3%</text>
                    </g>

                    {/* Arusha - High Penetration */}
                    <g className="cursor-pointer transform hover:scale-110 transition-transform duration-300">
                      <circle cx="380" cy="80" r="32" fill="#10B981" opacity="0.3">
                        <animate attributeName="r" values="32;35;32" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="380" cy="80" r="20" fill="#10B981" stroke="white" strokeWidth="3" />
                      <text x="380" y="110" textAnchor="middle" className="text-xs font-semibold fill-gray-700">Arusha</text>
                      <text x="380" y="124" textAnchor="middle" className="text-xs font-bold fill-green-600">76.8%</text>
                    </g>

                    {/* Dodoma - Medium Penetration */}
                    <g className="cursor-pointer transform hover:scale-110 transition-transform duration-300">
                      <circle cx="330" cy="180" r="25" fill="#F59E0B" opacity="0.3">
                        <animate attributeName="r" values="25;28;25" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="330" cy="180" r="16" fill="#F59E0B" stroke="white" strokeWidth="3" />
                      <text x="330" y="208" textAnchor="middle" className="text-xs font-semibold fill-gray-700">Dodoma</text>
                      <text x="330" y="222" textAnchor="middle" className="text-xs font-bold fill-orange-600">58.7%</text>
                    </g>

                    {/* Mbeya - Medium Penetration */}
                    <g className="cursor-pointer transform hover:scale-110 transition-transform duration-300">
                      <circle cx="220" cy="300" r="22" fill="#F59E0B" opacity="0.3">
                        <animate attributeName="r" values="22;25;22" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="220" cy="300" r="14" fill="#F59E0B" stroke="white" strokeWidth="3" />
                      <text x="220" y="326" textAnchor="middle" className="text-xs font-semibold fill-gray-700">Mbeya</text>
                      <text x="220" y="340" textAnchor="middle" className="text-xs font-bold fill-orange-600">45.2%</text>
                    </g>

                    {/* Kilimanjaro - High Penetration */}
                    <g className="cursor-pointer transform hover:scale-110 transition-transform duration-300">
                      <circle cx="420" cy="70" r="30" fill="#10B981" opacity="0.3">
                        <animate attributeName="r" values="30;33;30" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="420" cy="70" r="19" fill="#10B981" stroke="white" strokeWidth="3" />
                      <text x="420" y="98" textAnchor="middle" className="text-xs font-semibold fill-gray-700">Kilimanjaro</text>
                      <text x="420" y="112" textAnchor="middle" className="text-xs font-bold fill-green-600">71.5%</text>
                    </g>

                    {/* Tabora - Low Penetration */}
                    <g className="cursor-pointer transform hover:scale-110 transition-transform duration-300">
                      <circle cx="200" cy="180" r="18" fill="#EF4444" opacity="0.3">
                        <animate attributeName="r" values="18;21;18" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="200" cy="180" r="12" fill="#EF4444" stroke="white" strokeWidth="3" />
                      <text x="200" y="204" textAnchor="middle" className="text-xs font-semibold fill-gray-700">Tabora</text>
                      <text x="200" y="218" textAnchor="middle" className="text-xs font-bold fill-red-600">38.4%</text>
                    </g>

                    {/* Connection Lines showing distribution network */}
                    <g stroke="#10B981" strokeWidth="2" fill="none" opacity="0.3" strokeDasharray="4,4">
                      <path d="M 480 280 L 330 180" />
                      <path d="M 330 180 L 180 120" />
                      <path d="M 380 80 L 330 180" />
                      <path d="M 480 280 L 220 300" />
                    </g>
                  </svg>

                  {/* Legend */}
                  <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2 text-sm">Market Penetration</h4>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="font-medium">High (70%+)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                        <span className="font-medium">Medium (40-70%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="font-medium">Low (&lt;40%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Top Performing Regions</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span className="text-sm font-medium">Dar es Salaam</span>
                    <span className="text-sm text-green-600">89.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span className="text-sm font-medium">Arusha</span>
                    <span className="text-sm text-green-600">76.8%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                    <span className="text-sm font-medium">Mwanza</span>
                    <span className="text-sm text-yellow-600">64.3%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                    <span className="text-sm font-medium">Dodoma</span>
                    <span className="text-sm text-yellow-600">58.7%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                    <span className="text-sm font-medium">Lindi</span>
                    <span className="text-sm text-red-600">32.1%</span>
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-900 mt-6">Growth Opportunities</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="text-sm font-medium text-blue-900">Mbeya Region</h5>
                    <p className="text-xs text-blue-700">25% untapped potential</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="text-sm font-medium text-blue-900">Kigoma Region</h5>
                    <p className="text-xs text-blue-700">18% growth opportunity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Challenges */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Challenges</h3>
              <div className="space-y-3">
                {currentMetrics.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-red-800">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunities */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Growth Opportunities</h3>
              <div className="space-y-3">
                {currentMetrics.opportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-green-800">{opportunity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Industry-Specific Tools */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Industry-Specific Tools & Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
                <h4 className="font-medium text-gray-900 mb-2">Demand Forecasting</h4>
                <p className="text-sm text-gray-600">Predict market demand patterns</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <MapPin className="h-8 w-8 text-blue-600 mb-3" />
                <h4 className="font-medium text-gray-900 mb-2">Territory Planning</h4>
                <p className="text-sm text-gray-600">Optimize sales territories</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <Users className="h-8 w-8 text-purple-600 mb-3" />
                <h4 className="font-medium text-gray-900 mb-2">Channel Management</h4>
                <p className="text-sm text-gray-600">Manage distribution channels</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <BarChart3 className="h-8 w-8 text-orange-600 mb-3" />
                <h4 className="font-medium text-gray-900 mb-2">Performance Analytics</h4>
                <p className="text-sm text-gray-600">Track industry KPIs</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Industries;