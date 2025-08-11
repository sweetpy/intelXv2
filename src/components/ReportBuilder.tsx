import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Download, 
  Calendar, 
  Mail, 
  Settings,
  BarChart3,
  PieChart,
  TrendingUp,
  MapPin,
  Users,
  Package,
  Truck,
  DollarSign,
  Clock,
  Filter,
  Eye,
  Edit,
  Trash2,
  Send,
  Save
} from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'executive' | 'operational' | 'compliance' | 'custom';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  lastGenerated: string;
  recipients: string[];
  status: 'active' | 'draft' | 'scheduled';
}

interface ReportWidget {
  id: string;
  type: 'chart' | 'table' | 'kpi' | 'map';
  title: string;
  icon: React.ComponentType<any>;
  description: string;
}

const ReportBuilder: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);

  const reportTemplates: ReportTemplate[] = [
    {
      id: 'executive-summary',
      name: 'Executive Summary',
      description: 'High-level KPIs and strategic insights for C-level executives',
      type: 'executive',
      frequency: 'weekly',
      lastGenerated: '2024-01-15',
      recipients: ['ceo@company.co.tz', 'cfo@company.co.tz'],
      status: 'active'
    },
    {
      id: 'sales-performance',
      name: 'Sales Performance Report',
      description: 'Detailed sales metrics, distributor performance, and regional analysis',
      type: 'operational',
      frequency: 'monthly',
      lastGenerated: '2024-01-10',
      recipients: ['sales@company.co.tz', 'manager@company.co.tz'],
      status: 'active'
    },
    {
      id: 'compliance-audit',
      name: 'Compliance Audit Report',
      description: 'Regulatory compliance status and audit trail documentation',
      type: 'compliance',
      frequency: 'quarterly',
      lastGenerated: '2024-01-01',
      recipients: ['compliance@company.co.tz', 'legal@company.co.tz'],
      status: 'scheduled'
    },
    {
      id: 'route-optimization',
      name: 'Route Optimization Analysis',
      description: 'Logistics efficiency, cost analysis, and optimization recommendations',
      type: 'operational',
      frequency: 'weekly',
      lastGenerated: '2024-01-12',
      recipients: ['logistics@company.co.tz'],
      status: 'active'
    }
  ];

  const availableWidgets: ReportWidget[] = [
    {
      id: 'revenue-chart',
      type: 'chart',
      title: 'Revenue Trends',
      icon: TrendingUp,
      description: 'Line chart showing revenue trends over time'
    },
    {
      id: 'market-share-pie',
      type: 'chart',
      title: 'Market Share',
      icon: PieChart,
      description: 'Pie chart displaying market share by region'
    },
    {
      id: 'kpi-dashboard',
      type: 'kpi',
      title: 'Key Performance Indicators',
      icon: BarChart3,
      description: 'Grid of important KPIs and metrics'
    },
    {
      id: 'regional-map',
      type: 'map',
      title: 'Regional Coverage Map',
      icon: MapPin,
      description: 'Interactive map showing regional performance'
    },
    {
      id: 'distributor-table',
      type: 'table',
      title: 'Distributor Performance',
      icon: Users,
      description: 'Detailed table of distributor metrics'
    },
    {
      id: 'inventory-levels',
      type: 'chart',
      title: 'Inventory Levels',
      icon: Package,
      description: 'Bar chart showing current inventory status'
    }
  ];

  const handleGenerateReport = (templateId: string) => {
    setIsBuilding(true);
    setTimeout(() => {
      setIsBuilding(false);
      // Simulate report generation
      console.log(`Generated report: ${templateId}`);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'executive': return 'bg-purple-100 text-purple-800';
      case 'operational': return 'bg-blue-100 text-blue-800';
      case 'compliance': return 'bg-orange-100 text-orange-800';
      case 'custom': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileText className="h-6 w-6 text-blue-600 mr-2" />
            Advanced Reporting
          </h2>
          <p className="text-gray-600 mt-1">Create, schedule, and manage custom reports</p>
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <button 
            onClick={() => setShowScheduler(!showScheduler)}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Reports
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </button>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Report Templates</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                      {template.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                      {template.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Frequency: {template.frequency}</span>
                  <span>Last: {template.lastGenerated}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-1" />
                    {template.recipients.length} recipients
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleGenerateReport(template.id)}
                      disabled={isBuilding}
                      className="p-1 text-gray-400 hover:text-purple-600 transition-colors disabled:opacity-50"
                    >
                      {isBuilding ? (
                        <Clock className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Builder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Custom Report Builder</h3>
          <p className="text-sm text-gray-600 mt-1">Drag and drop widgets to create custom reports</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Available Widgets */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Available Widgets</h4>
              <div className="space-y-3">
                {availableWidgets.map((widget) => (
                  <div key={widget.id} className="border border-gray-200 rounded-lg p-3 cursor-move hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <widget.icon className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="font-medium text-sm">{widget.title}</span>
                    </div>
                    <p className="text-xs text-gray-600">{widget.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Report Canvas */}
            <div className="lg:col-span-2">
              <h4 className="font-medium text-gray-900 mb-4">Report Canvas</h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-96 bg-gray-50">
                <div className="text-center text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">Drag widgets here to build your report</p>
                  <p className="text-sm">Create custom layouts by arranging widgets in your preferred order</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-4">
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Save className="h-4 w-4 mr-2" />
                  Save Template
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Send className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Reports */}
      {showScheduler && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Scheduled Reports</h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {reportTemplates.filter(t => t.status === 'active' || t.status === 'scheduled').map((template) => (
                <div key={template.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-600">Next: {template.frequency} on {template.lastGenerated}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                      {template.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit Schedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportBuilder;