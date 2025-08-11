import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Phone, 
  Mail,
  TrendingUp,
  Package,
  DollarSign,
  Star,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Eye,
  UserPlus,
  Award,
  AlertCircle
} from 'lucide-react';

const Distributors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const distributors = [
    {
      id: 1,
      name: 'Kilimanjaro Trading Co.',
      contact: 'John Mwangi',
      email: 'john@kilimanjaro-trading.co.tz',
      phone: '+255 123 456 789',
      region: 'Arusha',
      status: 'active',
      rating: 4.8,
      revenue: 'TSh 45M',
      growth: '+18%',
      products: 156,
      coverage: '85%',
      lastOrder: '2024-01-15',
      tier: 'platinum'
    },
    {
      id: 2,
      name: 'Dar Distribution Ltd.',
      contact: 'Sarah Kimani',
      email: 'sarah@dar-dist.co.tz',
      phone: '+255 987 654 321',
      region: 'Dar es Salaam',
      status: 'active',
      rating: 4.6,
      revenue: 'TSh 78M',
      growth: '+22%',
      products: 234,
      coverage: '92%',
      lastOrder: '2024-01-14',
      tier: 'platinum'
    },
    {
      id: 3,
      name: 'Mwanza Regional Supplies',
      contact: 'David Mwalimu',
      email: 'david@mwanza-supplies.co.tz',
      phone: '+255 456 789 123',
      region: 'Mwanza',
      status: 'pending',
      rating: 4.2,
      revenue: 'TSh 32M',
      growth: '+12%',
      products: 98,
      coverage: '67%',
      lastOrder: '2024-01-10',
      tier: 'gold'
    },
    {
      id: 4,
      name: 'Northern Tanzania Distributors',
      contact: 'Grace Mollel',
      email: 'grace@ntd.co.tz',
      phone: '+255 789 123 456',
      region: 'Kilimanjaro',
      status: 'inactive',
      rating: 3.9,
      revenue: 'TSh 28M',
      growth: '-5%',
      products: 76,
      coverage: '54%',
      lastOrder: '2023-12-20',
      tier: 'silver'
    }
  ];

  const distributorMetrics = [
    {
      title: 'Total Distributors',
      value: '247',
      change: '+12',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Partners',
      value: '198',
      change: '+8',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Total Revenue',
      value: 'TSh 2.4B',
      change: '+18%',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Avg. Rating',
      value: '4.5',
      change: '+0.2',
      icon: Star,
      color: 'yellow'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-100 text-purple-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDistributors = distributors.filter(distributor => {
    const matchesSearch = distributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         distributor.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || distributor.region === selectedRegion;
    const matchesStatus = selectedStatus === 'all' || distributor.status === selectedStatus;
    return matchesSearch && matchesRegion && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Distributor Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor your distribution network across Tanzania</p>
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Export Data
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Distributor
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {distributorMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${metric.color}-100`}>
                <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
              </div>
              <span className="text-sm text-green-600 font-medium">{metric.change}</span>
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
              placeholder="Search distributors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Regions</option>
            <option value="Dar es Salaam">Dar es Salaam</option>
            <option value="Arusha">Arusha</option>
            <option value="Mwanza">Mwanza</option>
            <option value="Kilimanjaro">Kilimanjaro</option>
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Distributors Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distributor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDistributors.map((distributor) => (
                <tr key={distributor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{distributor.name}</div>
                        <div className="flex items-center mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(distributor.tier)}`}>
                            {distributor.tier}
                          </span>
                          <div className="flex items-center ml-2">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                            <span className="text-xs text-gray-500">{distributor.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{distributor.contact}</div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Mail className="h-3 w-3 mr-1" />
                      {distributor.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-3 w-3 mr-1" />
                      {distributor.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      {distributor.region}
                    </div>
                    <div className="text-sm text-gray-500">Coverage: {distributor.coverage}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(distributor.status)}`}>
                      {distributor.status}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      Last order: {distributor.lastOrder}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900 mb-1">
                      <Package className="h-4 w-4 text-gray-400 mr-1" />
                      {distributor.products} products
                    </div>
                    <div className="text-sm text-green-600">{distributor.growth}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{distributor.revenue}</div>
                    <div className="text-sm text-gray-500">Monthly</div>
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
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-4">
            {distributors.slice(0, 3).map((distributor, index) => (
              <div key={distributor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{distributor.name}</div>
                    <div className="text-sm text-gray-500">{distributor.region}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{distributor.revenue}</div>
                  <div className="text-sm text-green-600">{distributor.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts & Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-start p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-yellow-800">Payment Overdue</div>
                <div className="text-sm text-yellow-700">Mwanza Regional Supplies - 15 days overdue</div>
              </div>
            </div>
            <div className="flex items-start p-3 bg-green-50 rounded-lg border border-green-200">
              <Award className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-green-800">New Milestone</div>
                <div className="text-sm text-green-700">Dar Distribution Ltd. reached TSh 100M in sales</div>
              </div>
            </div>
            <div className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-200">
              <UserPlus className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-blue-800">New Application</div>
                <div className="text-sm text-blue-700">Dodoma Trading Co. applied for partnership</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distributors;