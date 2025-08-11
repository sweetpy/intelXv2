import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Database, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  RefreshCw,
  Activity,
  Shield,
  Clock,
  Users,
  BarChart3
} from 'lucide-react';

interface DatabaseHealth {
  status: 'healthy' | 'warning' | 'error';
  connections: number;
  responseTime: number;
  lastBackup: string;
  dataQuality: number;
  activeUsers: number;
  totalRecords: number;
}

const DatabaseStatus: React.FC = () => {
  const [health, setHealth] = useState<DatabaseHealth>({
    status: 'healthy',
    connections: 0,
    responseTime: 0,
    lastBackup: '',
    dataQuality: 0,
    activeUsers: 0,
    totalRecords: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const checkDatabaseHealth = async () => {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      // Test database connection and get basic stats
      const [
        customersResult,
        ordersResult,
        productsResult,
        usersResult
      ] = await Promise.all([
        supabase.from('customers').select('id', { count: 'exact' }).limit(1),
        supabase.from('orders').select('id', { count: 'exact' }).limit(1),
        supabase.from('products').select('id', { count: 'exact' }).limit(1),
        supabase.from('users').select('id', { count: 'exact' }).limit(1)
      ]);

      const responseTime = Date.now() - startTime;
      
      // Calculate total records
      const totalRecords = (
        (customersResult.count || 0) +
        (ordersResult.count || 0) +
        (productsResult.count || 0) +
        (usersResult.count || 0)
      );

      // Simulate other metrics (in production, these would come from actual monitoring)
      const newHealth: DatabaseHealth = {
        status: responseTime < 1000 ? 'healthy' : responseTime < 3000 ? 'warning' : 'error',
        connections: Math.floor(Math.random() * 20) + 5,
        responseTime,
        lastBackup: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        dataQuality: 85 + Math.random() * 10,
        activeUsers: Math.floor(Math.random() * 50) + 10,
        totalRecords
      };

      setHealth(newHealth);
      setLastChecked(new Date());
    } catch (error) {
      console.error('Database health check failed:', error);
      setHealth(prev => ({
        ...prev,
        status: 'error',
        responseTime: Date.now() - startTime
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkDatabaseHealth();
    
    // Check health every 30 seconds
    const interval = setInterval(checkDatabaseHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (health.status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Database className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (health.status) {
      case 'healthy':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {getStatusIcon()}
          <h3 className="ml-2 font-medium">Database Status</h3>
        </div>
        <button
          onClick={checkDatabaseHealth}
          disabled={isLoading}
          className="p-1 rounded hover:bg-white/50 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          <div>
            <div className="font-medium">{health.responseTime}ms</div>
            <div className="text-xs opacity-75">Response Time</div>
          </div>
        </div>

        <div className="flex items-center">
          <Shield className="h-4 w-4 mr-2" />
          <div>
            <div className="font-medium">{health.connections}</div>
            <div className="text-xs opacity-75">Connections</div>
          </div>
        </div>

        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          <div>
            <div className="font-medium">{health.activeUsers}</div>
            <div className="text-xs opacity-75">Active Users</div>
          </div>
        </div>

        <div className="flex items-center">
          <BarChart3 className="h-4 w-4 mr-2" />
          <div>
            <div className="font-medium">{health.totalRecords.toLocaleString()}</div>
            <div className="text-xs opacity-75">Total Records</div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-current/20">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Last checked: {lastChecked.toLocaleTimeString()}
          </div>
          <div>
            Data Quality: {health.dataQuality.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseStatus;