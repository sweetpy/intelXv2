import React, { useState, useEffect, useCallback } from 'react';
import { Menu, Bell, Search, User, MapPin, BarChart3, TrendingUp, Settings, Download, Zap, Brain, Mic, MicOff, Shield, ArrowRight, Wifi, WifiOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLocalization } from '../components/LocalizationProvider';

interface HeaderProps {
  onMenuClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');
  const [notifications] = useState([
    { id: 1, message: 'New market opportunity in Mbeya region', type: 'opportunity', time: '5 min ago' },
    { id: 2, message: 'Route optimization completed for Dar-Dodoma', type: 'success', time: '15 min ago' },
    { id: 3, message: 'Competitor activity detected in Mwanza', type: 'alert', time: '1 hour ago' }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const { user } = useAuth();
  const { language, setLanguage, currency, setCurrency, translate, formatCurrency } = useLocalization();

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Monitor connection quality
    const checkConnectionQuality = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection) {
          const speed = connection.downlink;
          if (speed >= 10) setConnectionQuality('excellent');
          else if (speed >= 1) setConnectionQuality('good');
          else setConnectionQuality('poor');
        }
      }
    };
    
    checkConnectionQuality();
    const qualityInterval = setInterval(checkConnectionQuality, 30000);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(qualityInterval);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // In a real app, this would trigger search functionality
    }
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    if (action === 'ai-assistant') {
      setAiMode(!aiMode);
    }
    // In a real app, this would trigger the respective action
  };

  const handleVoiceSearch = useCallback(() => {
    setIsVoiceSearch(!isVoiceSearch);
    if (!isVoiceSearch) {
      // Simulate voice recognition
      setTimeout(() => {
        setSearchQuery('Show me Dar es Salaam market trends');
        setIsVoiceSearch(false);
      }, 2000);
    }
  }, [isVoiceSearch]);

  const getConnectionIcon = () => {
    if (!isOnline) return <WifiOff className="h-4 w-4 text-red-500" />;
    
    switch (connectionQuality) {
      case 'excellent': return <Wifi className="h-4 w-4 text-green-500" />;
      case 'good': return <Wifi className="h-4 w-4 text-yellow-500" />;
      case 'poor': return <Wifi className="h-4 w-4 text-red-500" />;
      default: return <Wifi className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="text-gray-500 hover:text-gray-600 lg:hidden transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center ml-4 lg:ml-0">
            <div className="relative">
              <MapPin className="h-8 w-8 text-green-600 animate-float" />
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <div className="ml-2">
              <h1 className="text-xl font-bold gradient-text hover:scale-105 transition-transform duration-300 cursor-pointer">
                intel<span className="text-blue-600">X</span>
              </h1>
              <p className="text-xs text-gray-500">Route To Market Excellence</p>
              <div className="flex items-center text-xs">
                {getConnectionIcon()}
                <span className={`ml-1 ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
                  {isOnline ? `${connectionQuality.charAt(0).toUpperCase() + connectionQuality.slice(1)}` : 'Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* AI Assistant Toggle */}
          <button 
            onClick={() => handleQuickAction('ai-assistant')}
            className={`p-2 rounded-xl transition-all duration-300 transform hover:scale-110 ${
              aiMode 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-glow shadow-lg' 
                : 'text-gray-400 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50'
            }`}
            title="AI Assistant"
          >
            <Brain className="h-5 w-5" />
          </button>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Language Toggle */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
              className="p-2 text-gray-400 hover:text-green-600 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transform hover:scale-110"
              title={language === 'en' ? 'Switch to Kiswahili' : 'Switch to English'}
            >
              <span className="text-sm font-medium">{language === 'en' ? '🇹🇿 SW' : '🇬🇧 EN'}</span>
            </button>
            
            {/* Currency Toggle */}
            <button 
              onClick={() => setCurrency(currency === 'TSh' ? 'USD' : 'TSh')}
              className="p-2 text-gray-400 hover:text-blue-600 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transform hover:scale-110"
              title={`Switch to ${currency === 'TSh' ? 'USD' : 'TSh'}`}
            >
              <span className="text-sm font-medium">{currency}</span>
            </button>
            
            <button 
              onClick={() => handleQuickAction('analytics')}
              className="p-2 text-gray-400 hover:text-green-600 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transform hover:scale-110"
              title="Quick Analytics"
            >
              <BarChart3 className="h-5 w-5" />
            </button>
            <button 
              onClick={() => handleQuickAction('trends')}
              className="p-2 text-gray-400 hover:text-blue-600 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transform hover:scale-110"
              title="Market Trends"
            >
              <TrendingUp className="h-5 w-5" />
            </button>
            <button 
              onClick={() => handleQuickAction('export')}
              className="p-2 text-gray-400 hover:text-purple-600 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transform hover:scale-110"
              title="Export Data"
            >
              <Download className="h-5 w-5" />
            </button>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative hidden md:block group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 transition-colors ${isVoiceSearch ? 'text-red-500 animate-pulse' : 'text-gray-400 group-focus-within:text-green-500'}`} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVoiceSearch ? "🎤 Listening..." : translate('common.search') + " markets, routes, analytics..."}
              className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-xl leading-5 bg-white/60 backdrop-blur-md placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="button"
              onClick={handleVoiceSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform duration-300"
              aria-label={isVoiceSearch ? "Stop voice search" : "Start voice search"}
            >
              {isVoiceSearch ? (
                <MicOff className="h-4 w-4 text-red-500 animate-pulse" />
              ) : (
                <Mic className="h-4 w-4 text-gray-400 hover:text-green-500 transition-colors" />
              )}
            </button>
          </form>

          {/* AI Mode Indicator */}
          {aiMode && (
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full shadow-md animate-glow">
              <Zap className="h-4 w-4 text-purple-600 animate-pulse" />
              <span className="text-sm font-medium text-purple-700">AI Active</span>
            </div>
          )}

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-gray-500 transition-all duration-300 rounded-xl hover:bg-gray-100 transform hover:scale-110"
            >
              <Bell className="h-6 w-6" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-ping"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 glass rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 z-50 animate-float">
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Notifications</h3>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 cursor-pointer transform hover:scale-105">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'opportunity' ? 'bg-green-500' :
                          notification.type === 'success' ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <button className="text-sm text-green-600 hover:text-green-700 font-medium hover:scale-105 transition-transform duration-300">
                      View all notifications
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2 relative group">
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center animate-float shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-110">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Analyst'}</p>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-all duration-300 rounded-lg hover:bg-gray-100 transform hover:scale-110 group-hover:rotate-90">
              <Settings className="h-4 w-4" />
            </button>
            
            {/* User Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 glass rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              <div className="p-2">
                <div className="px-3 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 rounded-lg transition-all duration-300 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Profile Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 rounded-lg transition-all duration-300 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </button>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <button 
                    onClick={onLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 rounded-lg transition-all duration-300 flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;