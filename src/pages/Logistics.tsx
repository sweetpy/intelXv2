import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock,
  Package,
  Route,
  Fuel,
  User,
  CheckCircle,
  AlertTriangle,
  Navigation,
  BarChart3,
  Calendar,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Phone,
  Settings,
  RefreshCw,
  Download,
  Play,
  Pause,
  Square,
  Radio,
  Zap,
  Activity,
  TrendingUp,
  DollarSign,
  Shield,
  Wrench,
  FileText,
  Bell,
  Target,
  Gauge
} from 'lucide-react';
import { formatCurrency, formatDate, formatTime } from '../utils/helpers';

interface Vehicle {
  id: string;
  type: string;
  model: string;
  driver: string;
  status: 'in-transit' | 'loading' | 'maintenance' | 'idle' | 'delivering';
  location: string;
  destination: string;
  eta: string;
  fuelLevel: number;
  capacity: string;
  currentLoad: string;
  lastMaintenance: string;
  mileage: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  gpsEnabled: boolean;
  temperature: number;
  speed: number;
  route: string;
  estimatedCost: number;
  actualCost: number;
}

interface Driver {
  id: number;
  name: string;
  phone: string;
  license: string;
  experience: string;
  rating: number;
  status: 'active' | 'off-duty' | 'break' | 'unavailable';
  currentVehicle: string;
  deliveries: number;
  onTimeRate: string;
  totalDistance: number;
  safetyScore: number;
  earnings: number;
  hoursWorked: number;
  lastActive: string;
}

interface Delivery {
  id: string;
  customer: string;
  destination: string;
  driver: string;
  vehicle: string;
  status: 'scheduled' | 'in-transit' | 'loading' | 'delivered' | 'failed' | 'cancelled';
  priority: 'urgent' | 'high' | 'normal' | 'low';
  scheduledTime: string;
  estimatedTime: string;
  actualTime?: string;
  items: number;
  value: number;
  distance: number;
  route: string;
  customerPhone: string;
  specialInstructions?: string;
  proofOfDelivery?: string;
  signature?: string;
}

interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: 'routine' | 'repair' | 'inspection' | 'emergency';
  description: string;
  cost: number;
  date: string;
  nextDue: string;
  status: 'completed' | 'scheduled' | 'overdue';
  mechanic: string;
  parts: string[];
}

const Logistics: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('fleet');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTracking, setIsTracking] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(0);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMaintenanceAlerts(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const logisticsMetrics = [
    {
      title: 'Fleet Utilization',
      value: '87.3%',
      change: '+5.2%',
      icon: Truck,
      color: 'blue',
      target: '85%'
    },
    {
      title: 'On-Time Delivery',
      value: '94.8%',
      change: '+2.1%',
      icon: CheckCircle,
      color: 'green',
      target: '95%'
    },
    {
      title: 'Fuel Efficiency',
      value: '12.8 km/L',
      change: '+0.8',
      icon: Fuel,
      color: 'purple',
      target: '12.0 km/L'
    },
    {
      title: 'Average Cost/km',
      value: formatCurrency(850),
      change: '-12%',
      icon: DollarSign,
      color: 'orange',
      target: formatCurrency(900)
    }
  ];

  const vehicles: Vehicle[] = [
    {
      id: 'TZ-001-DAR',
      type: 'Heavy Truck',
      model: 'Isuzu FVZ 1400',
      driver: 'John Mwangi',
      status: 'in-transit',
      location: 'Dar es Salaam - Dodoma Highway (KM 45)',
      destination: 'Dodoma Central Depot',
      eta: '14:30',
      fuelLevel: 75,
      capacity: '15 tons',
      currentLoad: '12.8 tons',
      lastMaintenance: '2024-01-10',
      mileage: 145000,
      condition: 'good',
      gpsEnabled: true,
      temperature: 22,
      speed: 65,
      route: 'DAR-DOD-001',
      estimatedCost: 125000,
      actualCost: 118000
    },
    {
      id: 'TZ-002-MWZ',
      type: 'Medium Truck',
      model: 'Toyota Dyna 300',
      driver: 'Sarah Kimani',
      status: 'loading',
      location: 'Mwanza Central Warehouse',
      destination: 'Bukoba Distribution Center',
      eta: '16:45',
      fuelLevel: 90,
      capacity: '5 tons',
      currentLoad: '3.2 tons',
      lastMaintenance: '2024-01-08',
      mileage: 89000,
      condition: 'excellent',
      gpsEnabled: true,
      temperature: 25,
      speed: 0,
      route: 'MWZ-BUK-003',
      estimatedCost: 85000,
      actualCost: 82000
    },
    {
      id: 'TZ-003-ARU',
      type: 'Delivery Van',
      model: 'Mitsubishi Canter',
      driver: 'David Mollel',
      status: 'maintenance',
      location: 'Arusha Service Center',
      destination: '-',
      eta: '-',
      fuelLevel: 45,
      capacity: '3 tons',
      currentLoad: '0 tons',
      lastMaintenance: '2024-01-15',
      mileage: 67000,
      condition: 'fair',
      gpsEnabled: true,
      temperature: 28,
      speed: 0,
      route: '-',
      estimatedCost: 0,
      actualCost: 45000
    },
    {
      id: 'TZ-004-DSM',
      type: 'Refrigerated Truck',
      model: 'Isuzu NPR Cold Chain',
      driver: 'Grace Mwalimu',
      status: 'delivering',
      location: 'Morogoro Town Center',
      destination: 'Iringa Medical Supplies',
      eta: '11:20',
      fuelLevel: 68,
      capacity: '8 tons',
      currentLoad: '6.5 tons',
      lastMaintenance: '2024-01-05',
      mileage: 112000,
      condition: 'excellent',
      gpsEnabled: true,
      temperature: 4,
      speed: 55,
      route: 'DSM-IRG-002',
      estimatedCost: 95000,
      actualCost: 89000
    }
  ];

  const drivers: Driver[] = [
    {
      id: 1,
      name: 'John Mwangi',
      phone: '+255 123 456 789',
      license: 'Class A - Heavy Vehicle',
      experience: '8 years',
      rating: 4.8,
      status: 'active',
      currentVehicle: 'TZ-001-DAR',
      deliveries: 156,
      onTimeRate: '96.2%',
      totalDistance: 45000,
      safetyScore: 98,
      earnings: 850000,
      hoursWorked: 42,
      lastActive: '2 minutes ago'
    },
    {
      id: 2,
      name: 'Sarah Kimani',
      phone: '+255 987 654 321',
      license: 'Class B - Medium Vehicle',
      experience: '5 years',
      rating: 4.6,
      status: 'active',
      currentVehicle: 'TZ-002-MWZ',
      deliveries: 98,
      onTimeRate: '94.1%',
      totalDistance: 28000,
      safetyScore: 95,
      earnings: 620000,
      hoursWorked: 38,
      lastActive: '5 minutes ago'
    },
    {
      id: 3,
      name: 'David Mollel',
      phone: '+255 456 789 123',
      license: 'Class C - Light Vehicle',
      experience: '12 years',
      rating: 4.9,
      status: 'break',
      currentVehicle: 'TZ-003-ARU',
      deliveries: 234,
      onTimeRate: '98.5%',
      totalDistance: 67000,
      safetyScore: 99,
      earnings: 920000,
      hoursWorked: 35,
      lastActive: '15 minutes ago'
    },
    {
      id: 4,
      name: 'Grace Mwalimu',
      phone: '+255 789 123 456',
      license: 'Class A - Specialized',
      experience: '6 years',
      rating: 4.7,
      status: 'active',
      currentVehicle: 'TZ-004-DSM',
      deliveries: 187,
      onTimeRate: '95.8%',
      totalDistance: 52000,
      safetyScore: 97,
      earnings: 780000,
      hoursWorked: 40,
      lastActive: '1 minute ago'
    }
  ];

  const deliveries: Delivery[] = [
    {
      id: 'DEL-001-2024',
      customer: 'Kilimanjaro Supermarket Chain',
      destination: 'Moshi Town Center',
      driver: 'John Mwangi',
      vehicle: 'TZ-001-DAR',
      status: 'in-transit',
      priority: 'high',
      scheduledTime: '14:00',
      estimatedTime: '14:30',
      items: 15,
      value: 2500000,
      distance: 85,
      route: 'DAR-MSH-001',
      customerPhone: '+255 123 987 654',
      specialInstructions: 'Deliver to loading dock, contact manager on arrival'
    },
    {
      id: 'DEL-002-2024',
      customer: 'Mwanza Medical Center',
      destination: 'Mwanza Hospital Complex',
      driver: 'Sarah Kimani',
      vehicle: 'TZ-002-MWZ',
      status: 'loading',
      priority: 'urgent',
      scheduledTime: '15:00',
      estimatedTime: '15:00',
      items: 8,
      value: 850000,
      distance: 12,
      route: 'MWZ-HSP-001',
      customerPhone: '+255 987 123 456',
      specialInstructions: 'Temperature-sensitive medical supplies, maintain cold chain'
    },
    {
      id: 'DEL-003-2024',
      customer: 'Dodoma Electronics Hub',
      destination: 'Dodoma Business District',
      driver: 'Michael Chen',
      vehicle: 'TZ-005-DOD',
      status: 'delivered',
      priority: 'normal',
      scheduledTime: '10:00',
      estimatedTime: '09:45',
      actualTime: '09:42',
      items: 22,
      value: 4200000,
      distance: 156,
      route: 'DAR-DOD-002',
      customerPhone: '+255 456 789 123',
      proofOfDelivery: 'Signed by: Manager John Doe',
      signature: 'Digital signature captured'
    }
  ];

  const maintenanceRecords: MaintenanceRecord[] = [
    {
      id: 'MAINT-001',
      vehicleId: 'TZ-001-DAR',
      type: 'routine',
      description: 'Oil change, filter replacement, brake inspection',
      cost: 125000,
      date: '2024-01-10',
      nextDue: '2024-04-10',
      status: 'completed',
      mechanic: 'Ahmed Hassan',
      parts: ['Engine Oil', 'Oil Filter', 'Air Filter']
    },
    {
      id: 'MAINT-002',
      vehicleId: 'TZ-003-ARU',
      type: 'repair',
      description: 'Transmission repair and clutch replacement',
      cost: 450000,
      date: '2024-01-15',
      nextDue: '2024-02-15',
      status: 'completed',
      mechanic: 'Peter Mwangi',
      parts: ['Clutch Kit', 'Transmission Fluid', 'Gaskets']
    },
    {
      id: 'MAINT-003',
      vehicleId: 'TZ-002-MWZ',
      type: 'inspection',
      description: 'Annual safety inspection and certification',
      cost: 75000,
      date: '2024-01-20',
      nextDue: '2025-01-20',
      status: 'scheduled',
      mechanic: 'James Kimani',
      parts: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'in-transit':
      case 'delivered':
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'loading':
      case 'off-duty':
      case 'break':
      case 'scheduled':
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'maintenance':
      case 'unavailable':
      case 'overdue':
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'cancelled':
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'excellent': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'good': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'fair': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'poor': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const renderFleetManagement = () => (
    <div className="space-y-6">
      {/* Fleet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {logisticsMetrics.map((metric, index) => (
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

      {/* Vehicle Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{vehicle.id}</h3>
                  <p className="text-sm text-gray-600">{vehicle.model} - {vehicle.type}</p>
                  <div className="flex items-center mt-1">
                    {getConditionIcon(vehicle.condition)}
                    <span className="text-xs text-gray-500 ml-1">{vehicle.condition} condition</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
                {vehicle.gpsEnabled && (
                  <div className="flex items-center mt-2 text-xs text-green-600">
                    <Radio className="h-3 w-3 mr-1" />
                    GPS Active
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Driver & Route</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {vehicle.driver}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {vehicle.location}
                  </div>
                  {vehicle.destination !== '-' && (
                    <div className="flex items-center">
                      <Navigation className="h-4 w-4 mr-2" />
                      To: {vehicle.destination}
                    </div>
                  )}
                  {vehicle.route !== '-' && (
                    <div className="flex items-center">
                      <Route className="h-4 w-4 mr-2" />
                      Route: {vehicle.route}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Load & Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Load: {vehicle.currentLoad} / {vehicle.capacity}</span>
                    <span>{Math.round((parseFloat(vehicle.currentLoad) / parseFloat(vehicle.capacity)) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(parseFloat(vehicle.currentLoad) / parseFloat(vehicle.capacity)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Speed: {vehicle.speed} km/h</span>
                    <span>Mileage: {vehicle.mileage.toLocaleString()} km</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Status & Costs</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Fuel className="h-4 w-4 mr-2" />
                      <span>Fuel:</span>
                    </div>
                    <span className={`font-medium ${vehicle.fuelLevel < 30 ? 'text-red-600' : 'text-green-600'}`}>
                      {vehicle.fuelLevel}%
                    </span>
                  </div>
                  {vehicle.eta !== '-' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>ETA:</span>
                      </div>
                      <span className="font-medium">{vehicle.eta}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span>Est. Cost:</span>
                    <span className="font-medium">{formatCurrency(vehicle.estimatedCost)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Actual:</span>
                    <span className={`font-medium ${vehicle.actualCost < vehicle.estimatedCost ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(vehicle.actualCost)}
                    </span>
                  </div>
                  {vehicle.type === 'Refrigerated Truck' && (
                    <div className="flex items-center justify-between">
                      <span>Temp:</span>
                      <span className="font-medium text-blue-600">{vehicle.temperature}°C</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Vehicle Actions */}
            <div className="flex space-x-2 pt-4 border-t border-gray-200">
              <button 
                onClick={() => setSelectedVehicle(vehicle.id)}
                className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                Track Live
              </button>
              <button className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">
                <Phone className="h-4 w-4" />
              </button>
              <button className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDriverManagement = () => (
    <div className="space-y-6">
      {/* Driver Performance Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">4.75</div>
            <div className="text-sm text-green-700">Average Rating</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">96.1%</div>
            <div className="text-sm text-blue-700">On-Time Rate</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">97.5</div>
            <div className="text-sm text-purple-700">Safety Score</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{formatCurrency(792500)}</div>
            <div className="text-sm text-orange-700">Avg. Earnings</div>
          </div>
        </div>
      </div>

      {/* Driver Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {drivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
                  <p className="text-sm text-gray-600">{driver.license}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">{driver.rating}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(driver.status)}`}>
                {driver.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Deliveries:</span>
                    <span className="font-medium">{driver.deliveries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>On-Time:</span>
                    <span className="font-medium text-green-600">{driver.onTimeRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Safety Score:</span>
                    <span className="font-medium text-blue-600">{driver.safetyScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span className="font-medium">{driver.totalDistance.toLocaleString()} km</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Current Status</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Vehicle:</span>
                    <span className="font-medium">{driver.currentVehicle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hours:</span>
                    <span className="font-medium">{driver.hoursWorked}h this week</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Earnings:</span>
                    <span className="font-medium text-green-600">{formatCurrency(driver.earnings)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Active:</span>
                    <span className="font-medium">{driver.lastActive}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 pt-4 border-t border-gray-200">
              <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 transition-colors flex items-center justify-center">
                <Phone className="h-4 w-4 mr-1" />
                Call Driver
              </button>
              <button className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">
                <MapPin className="h-4 w-4" />
              </button>
              <button className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">
                <BarChart3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDeliveryTracking = () => (
    <div className="space-y-6">
      {/* Delivery Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">24</div>
          <div className="text-sm text-blue-700">In Transit</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">8</div>
          <div className="text-sm text-yellow-700">Loading</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">156</div>
          <div className="text-sm text-green-700">Delivered Today</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">3</div>
          <div className="text-sm text-red-700">Delayed</div>
        </div>
      </div>

      {/* Delivery Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer & Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver & Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule & Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value & Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{delivery.id}</div>
                        <div className="text-sm text-gray-500">{delivery.items} items</div>
                        <div className="text-xs text-gray-400">{delivery.distance} km</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{delivery.customer}</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {delivery.destination}
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Phone className="h-3 w-3 mr-1" />
                      {delivery.customerPhone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{delivery.driver}</div>
                    <div className="text-sm text-gray-500">{delivery.vehicle}</div>
                    <div className="text-xs text-gray-400">Route: {delivery.route}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Scheduled: {delivery.scheduledTime}
                    </div>
                    <div className="text-sm text-gray-500">
                      {delivery.actualTime ? `Delivered: ${delivery.actualTime}` : `ETA: ${delivery.estimatedTime}`}
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(delivery.status)}`}>
                      {delivery.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(delivery.value)}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(delivery.priority)}`}>
                      {delivery.priority}
                    </span>
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
                        <Navigation className="h-4 w-4" />
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

  const renderMaintenanceManagement = () => (
    <div className="space-y-6">
      {/* Maintenance Alerts */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
        <div className="flex items-center mb-4">
          <Wrench className="h-6 w-6 text-yellow-600 mr-2" />
          <h3 className="text-lg font-semibold text-yellow-900">Maintenance Alerts</h3>
          <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{maintenanceAlerts}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/60 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <span className="font-medium text-red-800">Overdue Maintenance</span>
            </div>
            <p className="text-sm text-red-700">TZ-005-TAB requires immediate service - 2 weeks overdue</p>
          </div>
          <div className="bg-white/60 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="font-medium text-yellow-800">Due This Week</span>
            </div>
            <p className="text-sm text-yellow-700">3 vehicles scheduled for routine maintenance</p>
          </div>
          <div className="bg-white/60 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-medium text-blue-800">Cost Optimization</span>
            </div>
            <p className="text-sm text-blue-700">Preventive maintenance saves {formatCurrency(125000)} monthly</p>
          </div>
        </div>
      </div>

      {/* Maintenance Records */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Maintenance Records</h3>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Maintenance
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle & Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost & Parts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
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
              {maintenanceRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Wrench className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.vehicleId}</div>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          record.type === 'emergency' ? 'bg-red-100 text-red-800' :
                          record.type === 'repair' ? 'bg-orange-100 text-orange-800' :
                          record.type === 'inspection' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {record.type}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{record.description}</div>
                    <div className="text-sm text-gray-500">Mechanic: {record.mechanic}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(record.cost)}</div>
                    <div className="text-xs text-gray-500">
                      {record.parts.length > 0 ? `${record.parts.length} parts` : 'No parts'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Done: {record.date}</div>
                    <div className="text-sm text-gray-500">Next: {record.nextDue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                      {record.status}
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
                      <button className="text-purple-600 hover:text-purple-900">
                        <FileText className="h-4 w-4" />
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

  const renderRouteOptimization = () => (
    <div className="space-y-6">
      {/* Route Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Route Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <Gauge className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">92.4%</div>
            <div className="text-sm text-green-700">Route Efficiency</div>
            <div className="text-xs text-gray-500 mt-1">Target: 90%</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(125000)}</div>
            <div className="text-sm text-blue-700">Avg Cost per Route</div>
            <div className="text-xs text-gray-500 mt-1">-18% vs last month</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">24</div>
            <div className="text-sm text-purple-700">Active Routes</div>
            <div className="text-xs text-gray-500 mt-1">Real-time tracking</div>
          </div>
        </div>
      </div>

      {/* Route Map */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Live Route Tracking</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsTracking(!isTracking)}
              className={`px-3 py-1 text-sm rounded-md ${isTracking ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
            >
              {isTracking ? 'Live Tracking ON' : 'Live Tracking OFF'}
            </button>
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">
              Optimize All Routes
            </button>
          </div>
        </div>
        
        <div className="h-96 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 opacity-50"></div>
          <div className="text-center z-10">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Interactive Route Map</p>
            <p className="text-gray-400 text-sm">Real-time vehicle tracking with traffic data</p>
          </div>
          
          {/* Live tracking indicators */}
          {isTracking && (
            <>
              <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center text-sm mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="font-medium">24 Vehicles Active</span>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div>• Dar-Dodoma: 8 vehicles</div>
                  <div>• Mwanza-Bukoba: 6 vehicles</div>
                  <div>• Arusha-Moshi: 5 vehicles</div>
                  <div>• Other routes: 5 vehicles</div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-sm">
                <div className="text-sm font-medium text-gray-900 mb-2">Traffic Conditions</div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Clear Roads</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span>Moderate Traffic</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>Heavy Congestion</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Logistics Management</h1>
          <p className="text-gray-600 mt-1">Complete fleet, driver, and delivery management system</p>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span>Live Tracking Active</span>
            </div>
            <span>{vehicles.filter(v => v.status === 'in-transit' || v.status === 'delivering').length} vehicles on road</span>
            <span>{deliveries.filter(d => d.status === 'in-transit').length} active deliveries</span>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync GPS Data
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {logisticsMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow">
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
            <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
            <p className="text-xs text-gray-500">Target: {metric.target}</p>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'fleet', label: 'Fleet Management', icon: Truck },
              { id: 'drivers', label: 'Driver Management', icon: User },
              { id: 'deliveries', label: 'Delivery Tracking', icon: Package },
              { id: 'routes', label: 'Route Optimization', icon: Navigation },
              { id: 'maintenance', label: 'Maintenance', icon: Wrench }
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
                {tab.id === 'maintenance' && maintenanceAlerts > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {maintenanceAlerts}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${selectedTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tab Content */}
          {selectedTab === 'fleet' && renderFleetManagement()}
          {selectedTab === 'drivers' && renderDriverManagement()}
          {selectedTab === 'deliveries' && renderDeliveryTracking()}
          {selectedTab === 'routes' && renderRouteOptimization()}
          {selectedTab === 'maintenance' && renderMaintenanceManagement()}
        </div>
      </div>

      {/* Real-time Alerts */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Real-time Alerts</h3>
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">Last updated: {formatTime(new Date())}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <span className="font-medium text-red-800">Critical Alert</span>
            </div>
            <p className="text-sm text-red-700">TZ-001-DAR: Fuel level below 20% - immediate refuel required</p>
            <button className="mt-2 text-xs text-red-600 hover:text-red-800 font-medium">
              Contact Driver →
            </button>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="font-medium text-yellow-800">Delay Warning</span>
            </div>
            <p className="text-sm text-yellow-700">DEL-002-2024: 15 minutes behind schedule due to traffic</p>
            <button className="mt-2 text-xs text-yellow-600 hover:text-yellow-800 font-medium">
              Optimize Route →
            </button>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium text-green-800">Success</span>
            </div>
            <p className="text-sm text-green-700">Route DAR-DOD-001 completed 15 minutes ahead of schedule</p>
            <button className="mt-2 text-xs text-green-600 hover:text-green-800 font-medium">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logistics;