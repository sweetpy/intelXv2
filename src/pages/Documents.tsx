import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  FolderOpen,
  Calendar,
  User,
  Tag
} from 'lucide-react';

const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const documentCategories = [
    { id: 'all', name: 'All Documents', count: 156 },
    { id: 'contracts', name: 'Contracts', count: 23 },
    { id: 'reports', name: 'Reports', count: 45 },
    { id: 'compliance', name: 'Compliance', count: 18 },
    { id: 'marketing', name: 'Marketing Materials', count: 32 },
    { id: 'operations', name: 'Operations', count: 28 },
    { id: 'financial', name: 'Financial', count: 10 }
  ];

  const documents = [
    {
      id: 1,
      name: 'Q4 2024 Market Analysis Report',
      type: 'PDF',
      category: 'reports',
      size: '2.4 MB',
      modified: '2024-01-15',
      author: 'Sarah Johnson',
      tags: ['quarterly', 'analysis', 'market'],
      status: 'approved'
    },
    {
      id: 2,
      name: 'Distributor Agreement - Mwanza Region',
      type: 'DOCX',
      category: 'contracts',
      size: '1.2 MB',
      modified: '2024-01-14',
      author: 'Michael Chen',
      tags: ['contract', 'mwanza', 'distributor'],
      status: 'pending'
    },
    {
      id: 3,
      name: 'Regulatory Compliance Checklist',
      type: 'XLSX',
      category: 'compliance',
      size: '856 KB',
      modified: '2024-01-13',
      author: 'David Mwangi',
      tags: ['compliance', 'checklist', 'regulatory'],
      status: 'approved'
    },
    {
      id: 4,
      name: 'Product Launch Campaign - Electronics',
      type: 'PDF',
      category: 'marketing',
      size: '5.1 MB',
      modified: '2024-01-12',
      author: 'Lisa Anderson',
      tags: ['campaign', 'electronics', 'launch'],
      status: 'draft'
    },
    {
      id: 5,
      name: 'Route Optimization Study - Dar es Salaam',
      type: 'PDF',
      category: 'operations',
      size: '3.2 MB',
      modified: '2024-01-11',
      author: 'James Kimani',
      tags: ['optimization', 'routes', 'dar-es-salaam'],
      status: 'approved'
    },
    {
      id: 6,
      name: 'Financial Performance Dashboard',
      type: 'XLSX',
      category: 'financial',
      size: '1.8 MB',
      modified: '2024-01-10',
      author: 'Grace Mwalimu',
      tags: ['financial', 'dashboard', 'performance'],
      status: 'approved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-8 w-8 text-blue-500" />;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600 mt-1">Organize and manage all your route to market documents</p>
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents, tags, or authors..."
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
            {documentCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
          
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Documents Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                {getFileIcon(doc.type)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{doc.name}</h3>
              
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {doc.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {doc.modified}
                </div>
                <div className="flex items-center">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  {doc.size}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {doc.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
                {doc.tags.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{doc.tags.length - 2}
                  </span>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 transition-colors flex items-center justify-center">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getFileIcon(doc.type)}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {doc.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.modified}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
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
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 border-dashed">
        <div className="text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload New Documents</h3>
          <p className="text-gray-500 mb-4">Drag and drop files here, or click to browse</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Choose Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default Documents;