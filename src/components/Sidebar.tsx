import React from 'react';
import { 
  X, 
  BarChart3, 
  FileText, 
  Building2, 
  TrendingUp,
  Map,
  Users,
  Package,
  Truck,
  Settings,
  Home,
  Brain,
  UserCheck
} from 'lucide-react';
import { useLocalization } from './LocalizationProvider';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPage, onPageChange }) => {
  const { translate } = useLocalization();
  
  const menuItems = [
    { icon: Home, label: translate('nav.dashboard'), id: 'dashboard', badge: null },
    { icon: TrendingUp, label: translate('nav.analytics'), id: 'analytics', badge: 'AI' },
    { icon: Brain, label: 'Intelligence Bank', id: 'intelligence', badge: 'AI' },
    { icon: FileText, label: translate('nav.playbook'), id: 'playbook', badge: 'New' },
    { icon: Building2, label: translate('nav.industries'), id: 'industries', badge: null },
    { icon: Map, label: translate('nav.routes'), id: 'routes', badge: null },
    { icon: Users, label: translate('nav.distributors'), id: 'distributors', badge: null },
    { icon: Package, label: translate('nav.inventory'), id: 'inventory', badge: null },
    { icon: Truck, label: translate('nav.logistics'), id: 'logistics', badge: null },
    { icon: UserCheck, label: 'CRM & Sales', id: 'crm', badge: 'New' },
    { icon: FileText, label: translate('nav.documents'), id: 'documents', badge: null },
    { icon: Settings, label: translate('nav.settings'), id: 'settings', badge: null },
  ];

  const handleItemClick = (id: string) => {
    onPageChange(id);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">intelX</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-600 lg:hidden p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 flex-1 overflow-y-auto">
          <div className="px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleItemClick(item.id);
                }}
                className={`
                  group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg mb-1 transition-all duration-200 w-full text-left hover:scale-105
                  ${currentPage === item.id
                    ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700 shadow-md' 
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900'
                  }
                `}
              >
                <div className="flex items-center">
                  <item.icon className={`
                    mr-3 h-5 w-5 transition-colors duration-200
                    ${currentPage === item.id ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500'}
                  `} />
                  {item.label}
                </div>
                {item.badge && (
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    item.badge === 'AI' ? 'bg-purple-100 text-purple-700' :
                    item.badge === 'New' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="bg-white/60 backdrop-blur-md rounded-lg p-3 shadow-sm">
            <p className="text-sm font-medium text-green-800">intelX Platform</p>
            <p className="text-xs text-green-600 mt-1">
              Route to market excellence across 26 regions
            </p>
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              System Status: Operational
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;