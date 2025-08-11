import React, { useState, useEffect } from 'react';
import { SecurityProvider } from './components/SecurityProvider';
import { LocalizationProvider } from './components/LocalizationProvider';
import { useAuth } from './hooks/useAuth';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Documents from './pages/Documents';
import Industries from './pages/Industries';
import Playbook from './pages/Playbook';
import RouteOptimization from './pages/RouteOptimization';
import Distributors from './pages/Distributors';
import Inventory from './pages/Inventory';
import Logistics from './pages/Logistics';
import Settings from './pages/Settings';
import CRM from './pages/CRM';
import Landing from './pages/Landing';
import Intelligence from './pages/Intelligence';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  // Handle page transitions with loading states
  const handlePageChange = (page: string) => {
    setIsLoading(true);
    setSidebarOpen(false);
    
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 150);
  };

  // Auto-save user preferences
  useEffect(() => {
    if (currentPage !== 'landing') {
      localStorage.setItem('intellx_last_page', currentPage);
    }
  }, [currentPage]);

  // Restore last page on app load
  useEffect(() => {
    const lastPage = localStorage.getItem('intellx_last_page');
    if (lastPage && currentPage === 'landing') {
      setCurrentPage(lastPage);
    }
  }, []);

  // Landing page
  if (currentPage === 'landing') {
    return <Landing onEnterApp={() => handlePageChange('dashboard')} />;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading intelX Platform</h2>
          <p className="text-gray-600">Preparing your route to market intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <SecurityProvider>
      <LocalizationProvider>
        <div className="flex h-screen bg-gray-50 overflow-hidden">
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          
          <div className="flex-1 flex flex-col min-w-0">
            <Header 
              onMenuClick={() => setSidebarOpen(true)}
              onLogout={() => {
                logout();
                setCurrentPage('landing');
              }}
            />
            
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
                {currentPage === 'dashboard' && <Dashboard />}
                {currentPage === 'analytics' && <Analytics />}
                {currentPage === 'documents' && <Documents />}
                {currentPage === 'industries' && <Industries />}
                {currentPage === 'playbook' && <Playbook />}
                {currentPage === 'routes' && <RouteOptimization />}
                {currentPage === 'distributors' && <Distributors />}
                {currentPage === 'inventory' && <Inventory />}
                {currentPage === 'logistics' && <Logistics />}
                {currentPage === 'settings' && <Settings />}
                {currentPage === 'crm' && <CRM />}
                {currentPage === 'intelligence' && <Intelligence />}
              </div>
            </main>
          </div>
        </div>
      </LocalizationProvider>
    </SecurityProvider>
  );
}

export default App;