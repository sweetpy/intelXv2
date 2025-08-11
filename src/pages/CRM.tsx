import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Phone, 
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Send,
  FileText,
  BarChart3,
  Activity,
  Zap,
  Award,
  Handshake,
  Building2,
  Package,
  CreditCard,
  MessageSquare,
  Bell,
  Download,
  RefreshCw,
  PlayCircle,
  PauseCircle,
  ArrowRight,
  ChevronRight,
  Briefcase,
  Globe,
  Smartphone,
  User
} from 'lucide-react';
import { formatCurrency, formatDate, formatTime } from '../utils/helpers';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  region: string;
  industry: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  score: number;
  value: number;
  probability: number;
  assignedTo: string;
  createdDate: string;
  lastContact: string;
  nextAction: string;
  notes: string;
  tags: string[];
}

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  region: string;
  industry: string;
  type: 'distributor' | 'retailer' | 'wholesaler' | 'end-customer';
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  totalValue: number;
  lastOrder: string;
  orderFrequency: string;
  paymentTerms: string;
  creditLimit: number;
  outstandingBalance: number;
  satisfaction: number;
  accountManager: string;
  joinDate: string;
  totalOrders: number;
  averageOrderValue: number;
}

interface Opportunity {
  id: string;
  title: string;
  customer: string;
  value: number;
  probability: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closing' | 'closed-won' | 'closed-lost';
  expectedCloseDate: string;
  assignedTo: string;
  products: string[];
  competitors: string[];
  lastActivity: string;
  nextSteps: string;
  notes: string;
  createdDate: string;
}

interface SalesActivity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'demo' | 'proposal' | 'follow-up' | 'contract';
  subject: string;
  customer: string;
  assignedTo: string;
  status: 'completed' | 'scheduled' | 'overdue' | 'cancelled';
  date: string;
  duration?: number;
  outcome?: string;
  nextAction?: string;
  priority: 'high' | 'medium' | 'low';
}

const CRM: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Real-time updates
  useEffect(() => {
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isAutoRefresh]);

  const crmMetrics = [
    {
      title: 'Total Leads',
      value: '1,247',
      change: '+18.2%',
      icon: UserPlus,
      color: 'blue',
      target: '1,200'
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: '+3.1%',
      icon: Target,
      color: 'green',
      target: '25%'
    },
    {
      title: 'Pipeline Value',
      value: formatCurrency(125000000),
      change: '+12.5%',
      icon: DollarSign,
      color: 'purple',
      target: formatCurrency(120000000)
    },
    {
      title: 'Avg Deal Size',
      value: formatCurrency(2850000),
      change: '+8.7%',
      icon: TrendingUp,
      color: 'orange',
      target: formatCurrency(2500000)
    }
  ];

  const leads: Lead[] = [
    {
      id: 'LEAD-001',
      name: 'Michael Mwangi',
      company: 'Kilimanjaro Trading Co.',
      email: 'michael@kilimanjaro-trading.co.tz',
      phone: '+255 123 456 789',
      region: 'Kilimanjaro',
      industry: 'FMCG',
      source: 'Website',
      status: 'qualified',
      score: 85,
      value: 4500000,
      probability: 75,
      assignedTo: 'Sarah Johnson',
      createdDate: '2024-01-10',
      lastContact: '2024-01-14',
      nextAction: 'Send proposal',
      notes: 'Interested in expanding FMCG distribution in Kilimanjaro region',
      tags: ['hot-lead', 'fmcg', 'expansion']
    },
    {
      id: 'LEAD-002',
      name: 'Grace Mollel',
      company: 'Mwanza Medical Supplies',
      email: 'grace@mwanza-medical.co.tz',
      phone: '+255 987 654 321',
      region: 'Mwanza',
      industry: 'Pharmaceuticals',
      source: 'Referral',
      status: 'proposal',
      score: 92,
      value: 8500000,
      probability: 85,
      assignedTo: 'David Chen',
      createdDate: '2024-01-05',
      lastContact: '2024-01-15',
      nextAction: 'Follow up on proposal',
      notes: 'Urgent need for cold chain distribution network',
      tags: ['urgent', 'pharmaceuticals', 'cold-chain']
    },
    {
      id: 'LEAD-003',
      name: 'James Kimani',
      company: 'Dodoma Electronics Hub',
      email: 'james@dodoma-electronics.co.tz',
      phone: '+255 456 789 123',
      region: 'Dodoma',
      industry: 'Electronics',
      source: 'Trade Show',
      status: 'negotiation',
      score: 78,
      value: 6200000,
      probability: 65,
      assignedTo: 'Lisa Anderson',
      createdDate: '2024-01-08',
      lastContact: '2024-01-13',
      nextAction: 'Price negotiation meeting',
      notes: 'Price sensitive, looking for volume discounts',
      tags: ['price-sensitive', 'electronics', 'volume']
    }
  ];

  const customers: Customer[] = [
    {
      id: 'CUST-001',
      name: 'John Mwalimu',
      company: 'Dar Distribution Ltd.',
      email: 'john@dar-dist.co.tz',
      phone: '+255 123 987 654',
      region: 'Dar es Salaam',
      industry: 'FMCG',
      type: 'distributor',
      status: 'active',
      tier: 'platinum',
      totalValue: 78000000,
      lastOrder: '2024-01-14',
      orderFrequency: 'Weekly',
      paymentTerms: 'Net 30',
      creditLimit: 15000000,
      outstandingBalance: 2500000,
      satisfaction: 4.8,
      accountManager: 'Sarah Johnson',
      joinDate: '2022-03-15',
      totalOrders: 156,
      averageOrderValue: 500000
    },
    {
      id: 'CUST-002',
      name: 'Mary Kimani',
      company: 'Mwanza Regional Supplies',
      email: 'mary@mwanza-supplies.co.tz',
      phone: '+255 987 123 456',
      region: 'Mwanza',
      industry: 'Agriculture',
      type: 'wholesaler',
      status: 'active',
      tier: 'gold',
      totalValue: 45000000,
      lastOrder: '2024-01-12',
      orderFrequency: 'Bi-weekly',
      paymentTerms: 'Net 15',
      creditLimit: 8000000,
      outstandingBalance: 1200000,
      satisfaction: 4.6,
      accountManager: 'David Chen',
      joinDate: '2022-08-20',
      totalOrders: 89,
      averageOrderValue: 505618
    }
  ];

  const opportunities: Opportunity[] = [
    {
      id: 'OPP-001',
      title: 'FMCG Distribution Expansion - Kilimanjaro',
      customer: 'Kilimanjaro Trading Co.',
      value: 4500000,
      probability: 75,
      stage: 'proposal',
      expectedCloseDate: '2024-02-15',
      assignedTo: 'Sarah Johnson',
      products: ['Consumer Goods', 'Beverages', 'Personal Care'],
      competitors: ['Competitor A', 'Local Distributor'],
      lastActivity: '2024-01-14',
      nextSteps: 'Present final proposal and pricing',
      notes: 'Strong interest, budget approved, decision maker engaged',
      createdDate: '2024-01-10'
    },
    {
      id: 'OPP-002',
      title: 'Cold Chain Network - Mwanza Medical',
      customer: 'Mwanza Medical Supplies',
      value: 8500000,
      probability: 85,
      stage: 'negotiation',
      expectedCloseDate: '2024-02-01',
      assignedTo: 'David Chen',
      products: ['Refrigerated Transport', 'Cold Storage', 'Monitoring Systems'],
      competitors: ['MedCold Tanzania'],
      lastActivity: '2024-01-15',
      nextSteps: 'Finalize contract terms and pricing',
      notes: 'Urgent requirement, ready to sign, just finalizing terms',
      createdDate: '2024-01-05'
    }
  ];

  const salesActivities: SalesActivity[] = [
    {
      id: 'ACT-001',
      type: 'call',
      subject: 'Follow-up call on FMCG proposal',
      customer: 'Kilimanjaro Trading Co.',
      assignedTo: 'Sarah Johnson',
      status: 'completed',
      date: '2024-01-14 14:30',
      duration: 25,
      outcome: 'Positive response, requested pricing adjustments',
      nextAction: 'Send revised proposal',
      priority: 'high'
    },
    {
      id: 'ACT-002',
      type: 'meeting',
      subject: 'Contract negotiation meeting',
      customer: 'Mwanza Medical Supplies',
      assignedTo: 'David Chen',
      status: 'scheduled',
      date: '2024-01-16 10:00',
      priority: 'high'
    },
    {
      id: 'ACT-003',
      type: 'demo',
      subject: 'Platform demonstration',
      customer: 'Dodoma Electronics Hub',
      assignedTo: 'Lisa Anderson',
      status: 'scheduled',
      date: '2024-01-17 15:00',
      priority: 'medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'proposal': return 'bg-purple-100 text-purple-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'won': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-100 text-purple-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'meeting': return <Users className="h-4 w-4" />;
      case 'demo': return <PlayCircle className="h-4 w-4" />;
      case 'proposal': return <FileText className="h-4 w-4" />;
      case 'follow-up': return <Clock className="h-4 w-4" />;
      case 'contract': return <Handshake className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const renderCRMDashboard = () => (
    <div className="space-y-6">
      {/* CRM Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {crmMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${metric.color}-100`}>
                <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
              </div>
              <span className="text-sm text-green-600 font-medium">{metric.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
            <p className="text-xs text-gray-500">Target: {metric.target}</p>
          </div>
        ))}
      </div>

      {/* Sales Pipeline */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Pipeline Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {[
            { stage: 'Prospecting', count: 45, value: 15000000, color: 'blue' },
            { stage: 'Qualification', count: 32, value: 28000000, color: 'yellow' },
            { stage: 'Proposal', count: 18, value: 35000000, color: 'purple' },
            { stage: 'Negotiation', count: 12, value: 42000000, color: 'orange' },
            { stage: 'Closing', count: 8, value: 25000000, color: 'green' },
            { stage: 'Won', count: 156, value: 185000000, color: 'emerald' }
          ].map((stage, index) => (
            <div key={index} className={`p-4 rounded-lg bg-${stage.color}-50 border border-${stage.color}-200 hover:shadow-md transition-shadow cursor-pointer`}>
              <div className="text-center">
                <div className={`text-2xl font-bold text-${stage.color}-600`}>{stage.count}</div>
                <div className={`text-sm text-${stage.color}-700 mb-2`}>{stage.stage}</div>
                <div className={`text-xs text-${stage.color}-600 font-medium`}>{formatCurrency(stage.value)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities & Top Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales Activities</h3>
          <div className="space-y-4">
            {salesActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-blue-100`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 text-sm">{activity.subject}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.customer}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{activity.assignedTo}</span>
                    <span className="text-xs text-gray-500">{formatDate(new Date(activity.date))}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Opportunities</h3>
          <div className="space-y-4">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm">{opportunity.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(opportunity.stage)}`}>
                    {opportunity.stage}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{opportunity.customer}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">{formatCurrency(opportunity.value)}</span>
                    <span className="text-gray-500 ml-2">• {opportunity.probability}% probability</span>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(new Date(opportunity.expectedCloseDate))}</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${opportunity.probability}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeadManagement = () => (
    <div className="space-y-6">
      {/* Lead Scoring Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">AI Lead Scoring</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">18</div>
            <div className="text-sm text-green-700">Hot Leads (80+)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">34</div>
            <div className="text-sm text-yellow-700">Warm Leads (60-79)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">67</div>
            <div className="text-sm text-blue-700">Cold Leads (40-59)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">28</div>
            <div className="text-sm text-gray-700">{"Unqualified (<40)"}</div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company & Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score & Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Probability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <UserPlus className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                        <div className="text-xs text-gray-400">{lead.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.company}</div>
                    <div className="text-sm text-gray-500">{lead.industry}</div>
                    <div className="flex items-center text-xs text-gray-400">
                      <MapPin className="h-3 w-3 mr-1" />
                      {lead.region}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center mb-1">
                      <div className="text-sm font-medium text-gray-900 mr-2">Score: {lead.score}</div>
                      <div className={`w-12 h-2 rounded-full ${
                        lead.score >= 80 ? 'bg-green-500' : 
                        lead.score >= 60 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}></div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(lead.value)}</div>
                    <div className="text-xs text-gray-500">Est. value</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                    <div className="text-sm text-gray-500 mt-1">{lead.probability}% probability</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.assignedTo}</div>
                    <div className="text-xs text-gray-500">Last: {formatDate(new Date(lead.lastContact))}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Phone className="h-4 w-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        <Mail className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCustomerManagement = () => (
    <div className="space-y-6">
      {/* Customer Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <Building2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">247</div>
          <div className="text-sm text-green-700">Total Customers</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">198</div>
          <div className="text-sm text-blue-700">Active Customers</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-600">45</div>
          <div className="text-sm text-purple-700">Platinum Tier</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-600">4.7</div>
          <div className="text-sm text-orange-700">Avg Satisfaction</div>
        </div>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                  <p className="text-sm text-gray-600">{customer.company}</p>
                  <div className="flex items-center mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTierColor(customer.tier)}`}>
                      {customer.tier}
                    </span>
                    <div className="flex items-center ml-2">
                      <Star className="h-3 w-3 text-yellow-400 mr-1" />
                      <span className="text-xs text-gray-500">{customer.satisfaction}</span>
                    </div>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(customer.status)}`}>
                {customer.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Business Details</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    {customer.type}
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    {customer.industry}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {customer.region}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {customer.accountManager}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Financial Summary</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total Value:</span>
                    <span className="font-medium text-green-600">{formatCurrency(customer.totalValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Credit Limit:</span>
                    <span className="font-medium">{formatCurrency(customer.creditLimit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outstanding:</span>
                    <span className={`font-medium ${customer.outstandingBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {formatCurrency(customer.outstandingBalance)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Order:</span>
                    <span className="font-medium">{formatCurrency(customer.averageOrderValue)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 pt-4 border-t border-gray-200">
              <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 transition-colors flex items-center justify-center">
                <Eye className="h-4 w-4 mr-1" />
                View Profile
              </button>
              <button className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">
                <Phone className="h-4 w-4" />
              </button>
              <button className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">
                <Mail className="h-4 w-4" />
              </button>
              <button className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">
                <FileText className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSalesProcess = () => (
    <div className="space-y-6">
      {/* Sales Process Flow */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Process Automation</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {[
            { step: 'Lead Generation', icon: UserPlus, status: 'active', count: 45 },
            { step: 'Qualification', icon: Target, status: 'active', count: 32 },
            { step: 'Proposal', icon: FileText, status: 'active', count: 18 },
            { step: 'Negotiation', icon: Handshake, status: 'active', count: 12 },
            { step: 'Contract', icon: CreditCard, status: 'active', count: 8 },
            { step: 'Onboarding', icon: CheckCircle, status: 'active', count: 5 }
          ].map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-green-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <step.icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">{step.step}</div>
                <div className="text-lg font-bold text-green-600">{step.count}</div>
                <div className="text-xs text-gray-500">Active</div>
              </div>
              {index < 5 && (
                <ArrowRight className="absolute top-1/2 -right-2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Automated Workflows */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Automated Sales Workflows</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-3">
              <Zap className="h-5 w-5 text-yellow-500 mr-2" />
              <h4 className="font-medium text-gray-900">Lead Nurturing Campaign</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Automated email sequences for new leads</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-600">Active: 156 leads</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Configure →
              </button>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-3">
              <Bell className="h-5 w-5 text-blue-500 mr-2" />
              <h4 className="font-medium text-gray-900">Follow-up Reminders</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Automatic reminders for sales activities</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-600">24 reminders today</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All →
              </button>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-3">
              <BarChart3 className="h-5 w-5 text-purple-500 mr-2" />
              <h4 className="font-medium text-gray-900">Performance Tracking</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Real-time sales performance monitoring</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-600">94.2% target achieved</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Report →
              </button>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-3">
              <MessageSquare className="h-5 w-5 text-green-500 mr-2" />
              <h4 className="font-medium text-gray-900">Customer Communication</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Integrated communication tracking</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-600">89 interactions today</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View History →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Relationship Management</h1>
          <p className="text-gray-600 mt-1">Complete sales process management and customer lifecycle tracking</p>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${isAutoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span>Auto-refresh: {isAutoRefresh ? 'ON' : 'OFF'}</span>
            </div>
            <span>Last updated: {formatTime(lastUpdated)}</span>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <button 
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
              isAutoRefresh ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {isAutoRefresh ? <PauseCircle className="h-4 w-4 mr-2" /> : <PlayCircle className="h-4 w-4 mr-2" />}
            {isAutoRefresh ? 'Pause Updates' : 'Resume Updates'}
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export CRM Data
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'dashboard', label: 'CRM Dashboard', icon: BarChart3 },
              { id: 'leads', label: 'Lead Management', icon: UserPlus },
              { id: 'customers', label: 'Customer Management', icon: Users },
              { id: 'opportunities', label: 'Opportunities', icon: Target },
              { id: 'sales-process', label: 'Sales Process', icon: Briefcase }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${selectedTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="high-value">High Value</option>
            </select>
          </div>

          {/* Tab Content */}
          {selectedTab === 'dashboard' && renderCRMDashboard()}
          {selectedTab === 'leads' && renderLeadManagement()}
          {selectedTab === 'customers' && renderCustomerManagement()}
          {selectedTab === 'sales-process' && renderSalesProcess()}
          {selectedTab === 'opportunities' && (
            <div className="text-center py-12">
              <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Opportunity Management</h3>
              <p className="text-gray-600">Track and manage sales opportunities through the pipeline</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CRM;