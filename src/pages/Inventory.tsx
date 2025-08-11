import React, { useState } from 'react';
import { 
  Package, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Search,
  Filter,
  Plus,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Archive
} from 'lucide-react';

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const inventoryMetrics = [
    {
      title: 'Total Products',
      value: '2,847',
      change: '+156',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'In Stock',
      value: '2,234',
      change: '+89',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Low Stock',
      value: '423',
      change: '+67',
      icon: AlertTriangle,
      color: 'yellow'
    },
    {
      title: 'Out of Stock',
      value: '190',
      change: '-23',
      icon: TrendingDown,
      color: 'red'
    }
  ];

  const inventoryItems = [
    {
      id: 1,
      name: 'Premium Rice 25kg',
      sku: 'RICE-25-001',
      category: 'Food & Beverages',
      currentStock: 1250,
      minStock: 500,
      maxStock: 2000,
      unitPrice: 'TSh 45,000',
      totalValue: 'TSh 56.25M',
      status: 'in-stock',
      lastUpdated: '2024-01-15',
      supplier: 'Tanzania Rice Mills',
      location: 'Dar es Salaam Warehouse'
    },
    {
      id: 2,
      name: 'Mobile Phone Samsung A54',
      sku: 'PHONE-SAM-A54',
      category: 'Electronics',
      currentStock: 45,
      minStock: 50,
      maxStock: 200,
      unitPrice: 'TSh 850,000',
      totalValue: 'TSh 38.25M',
      status: 'low-stock',
      lastUpdated: '2024-01-14',
      supplier: 'Samsung Tanzania',
      location: 'Arusha Electronics Hub'
    },
    {
      id: 3,
      name: 'Paracetamol 500mg (100 tablets)',
      sku: 'MED-PARA-500',
      category: 'Pharmaceuticals',
      currentStock: 0,
      minStock: 100,
      maxStock: 500,
      unitPrice: 'TSh 5,000',
      totalValue: 'TSh 0',
      status: 'out-of-stock',
      lastUpdated: '2024-01-13',
      supplier: 'Shelys Pharmaceuticals',
      location: 'Mwanza Medical Center'
    },
    {
      id: 4,
      name: 'Cooking Oil 5L',
      sku: 'OIL-COOK-5L',
      category: 'Food & Beverages',
      currentStock: 890,
      minStock: 200,
      maxStock: 1000,
      unitPrice: 'TSh 18,000',
      totalValue: 'TSh 16.02M',
      status: 'in-stock',
      lastUpdated: '2024-01-15',
      supplier: 'East Africa Oils',
      location: 'Dodoma Distribution'
    },
    {
      id: 5,
      name: 'Fertilizer NPK 50kg',
      sku: 'FERT-NPK-50',
      category: 'Agriculture',
      currentStock: 25,
      minStock: 30,
      maxStock: 150,
      unitPrice: 'TSh 75,000',
      totalValue: 'TSh 1.875M',
      status: 'low-stock',
      lastUpdated: '2024-01-12',
      supplier: 'Yara Tanzania',
      location: 'Kilimanjaro Agri Hub'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockLevel = (current: number, min: number, max: number) => {
    const percentage = (current / max) * 100;
    if (current === 0) return { level: 'empty', color: 'bg-red-500' };
    if (current <= min) return { level: 'low', color: 'bg-yellow-500' };
    if (percentage >= 80) return { level: 'high', color: 'bg-green-500' };
    return { level: 'medium', color: 'bg-blue-500' };
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track and manage inventory across all locations</p>
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Inventory
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventoryMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${metric.color}-100`}>
                <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
              </div>
              <span className={`text-sm font-medium ${
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-sm text-gray-600">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
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
            <option value="Food & Beverages">Food & Beverages</option>
            <option value="Electronics">Electronics</option>
            <option value="Pharmaceuticals">Pharmaceuticals</option>
            <option value="Agriculture">Agriculture</option>
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => {
                const stockLevel = getStockLevel(item.currentStock, item.minStock, item.maxStock);
                const stockPercentage = (item.currentStock / item.maxStock) * 100;
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                          <div className="text-xs text-gray-400">{item.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 mb-1">
                        {item.currentStock.toLocaleString()} / {item.maxStock.toLocaleString()}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div 
                          className={`h-2 rounded-full ${stockLevel.color}`}
                          style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Min: {item.minStock.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.totalValue}</div>
                      <div className="text-sm text-gray-500">{item.unitPrice} each</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.location}</div>
                      <div className="text-sm text-gray-500">{item.supplier}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.lastUpdated}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-green-600 hover:text-green-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Archive className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
              <div className="flex-1">
                <div className="font-medium text-red-800">Out of Stock</div>
                <div className="text-sm text-red-700">Paracetamol 500mg needs immediate restock</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
              <div className="flex-1">
                <div className="font-medium text-yellow-800">Low Stock Warning</div>
                <div className="text-sm text-yellow-700">Mobile Phone Samsung A54 below minimum threshold</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
              <div className="flex-1">
                <div className="font-medium text-yellow-800">Reorder Required</div>
                <div className="text-sm text-yellow-700">Fertilizer NPK 50kg approaching minimum level</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Value by Category</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Food & Beverages</span>
              <span className="font-semibold text-gray-900">TSh 72.27M</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Electronics</span>
              <span className="font-semibold text-gray-900">TSh 38.25M</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Agriculture</span>
              <span className="font-semibold text-gray-900">TSh 1.875M</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '1%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pharmaceuticals</span>
              <span className="font-semibold text-gray-900">TSh 0</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;