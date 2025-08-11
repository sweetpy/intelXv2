import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  BarChart3, 
  Users, 
  Truck,
  Building2,
  TrendingUp,
  Shield,
  Globe,
  CheckCircle,
  Star,
  Award,
  Zap,
  Brain
} from 'lucide-react';

interface LandingProps {
  onEnterApp: () => void;
}

const Landing: React.FC<LandingProps> = ({ onEnterApp }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const handleEnterApp = () => {
    setIsLoading(true);
    setTimeout(() => {
      onEnterApp();
    }, 500);
  };

  const features = [
    {
      icon: BarChart3,
      title: 'AI-Powered Analytics',
      description: 'Real-time market insights and performance tracking across all Tanzanian regions',
      badge: 'AI'
    },
    {
      icon: MapPin,
      title: 'Route Optimization',
      description: 'AI-powered route planning for maximum efficiency and cost reduction',
      badge: 'Smart'
    },
    {
      icon: Users,
      title: 'Distributor Network',
      description: 'Comprehensive distributor management and relationship tracking',
      badge: 'Pro'
    },
    {
      icon: Building2,
      title: 'Multi-Industry Support',
      description: 'Customizable solutions for FMCG, pharmaceuticals, agriculture, and more',
      badge: 'Enterprise'
    },
    {
      icon: Truck,
      title: 'Logistics Management',
      description: 'End-to-end supply chain visibility and optimization',
      badge: 'Live'
    },
    {
      icon: Shield,
      title: 'Compliance Tracking',
      description: 'Ensure regulatory compliance across all market channels',
      badge: 'Secure'
    }
  ];

  const industries = [
    'Fast Moving Consumer Goods (FMCG)',
    'Beverages & Soft Drinks',
    'Pharmaceuticals & Healthcare',
    'Agriculture & Agribusiness',
    'Telecommunications',
    'Financial Services',
    'Manufacturing'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="relative">
                <MapPin className="h-10 w-10 text-green-600 animate-float" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-gray-900">intelX</h1>
                <p className="text-sm text-gray-600">Route To Market Excellence</p>
              </div>
            </div>
            <button
              onClick={handleEnterApp}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading...
                </>
              ) : (
                <>
                  🚀 Enter Platform
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          <div className="absolute top-20 right-20 w-60 h-60 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-6000"></div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Tanzania's Leading
              <span className="text-green-600 block">Route To Market</span>
              Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Advanced route to market intelligence and optimization platform designed specifically 
              for the Tanzanian market. Real-time data, granular analytics, and actionable insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleEnterApp}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-xl animate-glow disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Launching Platform...
                  </>
                ) : (
                  <>
                    🚀 Enter Platform
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
              <button 
                onClick={handleEnterApp}
                className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                📊 View Demo
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={handleEnterApp}
            disabled={isLoading}
            className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group animate-float"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            )}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-ping"></div>
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">Powering Tanzania's Market Leaders</h2>
            <p className="text-gray-600">Real-time intelligence across the nation</p>
            <div className="flex items-center justify-center mt-4">
              <Star className="h-5 w-5 text-yellow-500 mr-1" />
              <Star className="h-5 w-5 text-yellow-500 mr-1" />
              <Star className="h-5 w-5 text-yellow-500 mr-1" />
              <Star className="h-5 w-5 text-yellow-500 mr-1" />
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm text-gray-600">Trusted by 500+ businesses</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2 group-hover:animate-pulse">26</div>
              <div className="text-gray-600">Regions Covered</div>
              <div className="w-12 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2 group-hover:animate-pulse">500+</div>
              <div className="text-gray-600">Active Distributors</div>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:animate-pulse">1M+</div>
              <div className="text-gray-600">Data Points Daily</div>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2 group-hover:animate-pulse">99.9%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
              <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and insights you need 
              to optimize your route to market strategy in Tanzania.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 hover:border-green-200 group"
              >
                {feature.badge && (
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      feature.badge === 'AI' ? 'bg-purple-100 text-purple-700' :
                      feature.badge === 'Smart' ? 'bg-blue-100 text-blue-700' :
                      feature.badge === 'Pro' ? 'bg-green-100 text-green-700' :
                      feature.badge === 'Enterprise' ? 'bg-orange-100 text-orange-700' :
                      feature.badge === 'Live' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {feature.badge}
                    </span>
                  </div>
                )}
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-green-600 group-hover:text-emerald-600 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Market Leadership by Industry Segment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Current market share leaders across key industries in Tanzania
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Non-Alcoholic Ready To Drink (NARTD) */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Non-Alcoholic Ready To Drink (NARTD)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Pepsi Tanzania</span>
                  <span className="text-sm font-bold text-green-600">48.7%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '48.7%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Coca-Cola Kwanza</span>
                  <span className="text-sm font-bold text-blue-600">32.1%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32.1%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Azam Beverages</span>
                  <span className="text-sm font-bold text-purple-600">19.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '19.2%' }}></div>
                </div>
              </div>
            </div>

            {/* Alcoholic Ready To Drink (ARTD) */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alcoholic Ready To Drink (ARTD)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Tanzania Breweries</span>
                  <span className="text-sm font-bold text-green-600">52.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '52.8%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Serengeti Breweries</span>
                  <span className="text-sm font-bold text-blue-600">24.6%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24.6%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Kibo Breweries</span>
                  <span className="text-sm font-bold text-purple-600">15.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '15.2%' }}></div>
                </div>
              </div>
            </div>

            {/* Pharmaceuticals Market Share */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pharmaceuticals</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Zenufa Laboratories</span>
                  <span className="text-sm font-bold text-green-600">34.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '34.8%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Shelys Pharmaceuticals</span>
                  <span className="text-sm font-bold text-blue-600">28.3%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28.3%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Novartis Tanzania</span>
                  <span className="text-sm font-bold text-purple-600">24.1%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '24.1%' }}></div>
                </div>
              </div>
            </div>

            {/* Agriculture Market Share */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Agriculture & Agribusiness</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Yara Tanzania</span>
                  <span className="text-sm font-bold text-green-600">35.3%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '35.3%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Bayer CropScience</span>
                  <span className="text-sm font-bold text-blue-600">28.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28.9%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Syngenta Tanzania</span>
                  <span className="text-sm font-bold text-purple-600">21.6%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '21.6%' }}></div>
                </div>
              </div>
            </div>

            {/* Telecommunications Market Share */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Telecommunications</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Vodacom Tanzania</span>
                  <span className="text-sm font-bold text-green-600">39.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '39.2%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Airtel Tanzania</span>
                  <span className="text-sm font-bold text-blue-600">35.7%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35.7%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Halotel Tanzania</span>
                  <span className="text-sm font-bold text-purple-600">25.1%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '25.1%' }}></div>
                </div>
              </div>
            </div>

            {/* Financial Services Market Share */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Services</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">CRDB Bank</span>
                  <span className="text-sm font-bold text-green-600">29.4%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '29.4%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">NMB Bank</span>
                  <span className="text-sm font-bold text-blue-600">25.7%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25.7%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Stanbic Bank</span>
                  <span className="text-sm font-bold text-purple-600">22.1%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '22.1%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Industry Expertise */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Industry Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored solutions for diverse industries across Tanzania
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors duration-200"
              >
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-600/20 to-blue-600/20 animate-pulse"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full animate-blob animation-delay-2000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6 animate-float">
            Ready to Dominate Your Market?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto opacity-90">
            Join market leaders using advanced intelligence to capture market share across Tanzania
          </p>
          <div className="flex items-center justify-center mb-8 space-x-6">
            <div className="flex items-center text-white/80">
              <Award className="h-5 w-5 mr-2" />
              <span className="text-sm">Industry Leading</span>
            </div>
            <div className="flex items-center text-white/80">
              <Brain className="h-5 w-5 mr-2" />
              <span className="text-sm">AI-Powered</span>
            </div>
            <div className="flex items-center text-white/80">
              <Zap className="h-5 w-5 mr-2" />
              <span className="text-sm">Real-time Data</span>
            </div>
          </div>
          <button
            onClick={handleEnterApp}
            disabled={isLoading}
            className="bg-gradient-to-r from-white to-gray-100 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:from-gray-100 hover:to-white transition-all duration-300 transform hover:scale-110 inline-flex items-center shadow-2xl hover:shadow-3xl animate-glow disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                Launching Platform...
              </>
            ) : (
              <>
                🚀 Enter Platform Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <MapPin className="h-8 w-8 text-green-400" />
            <div className="ml-3">
              <h3 className="text-xl font-bold">intelX</h3>
              <p className="text-gray-400">Route To Market Excellence</p>
            </div>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 intelX. All rights reserved. Route to market excellence for Tanzania.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;