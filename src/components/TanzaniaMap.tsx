import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Users, Package, Truck, BarChart3, DollarSign, Navigation, AlertCircle } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  penetration: number;
  distributors: number;
  revenue: string;
  growth: string;
  status: 'high' | 'medium' | 'low';
  districts: string[];
  coordinates: { x: number; y: number };
  population: string;
  marketSize: string;
}

const TanzaniaMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'penetration' | 'revenue' | 'growth'>('penetration');
  const [isLoading, setIsLoading] = useState(false);
  const [liveData, setLiveData] = useState({
    activeVehicles: 157,
    deliveriesInProgress: 342,
    routeEfficiency: 92.4
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        activeVehicles: prev.activeVehicles + Math.floor(Math.random() * 6) - 3,
        deliveriesInProgress: prev.deliveriesInProgress + Math.floor(Math.random() * 20) - 10,
        routeEfficiency: Math.max(85, Math.min(98, prev.routeEfficiency + (Math.random() - 0.5) * 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const regions: Region[] = [
    {
      id: 'dar',
      name: 'Dar es Salaam',
      penetration: 89.2,
      distributors: 45,
      revenue: 'TSh 580M',
      growth: '+18%',
      status: 'high',
      districts: ['Ilala', 'Kinondoni', 'Temeke', 'Ubungo', 'Kigamboni'],
      coordinates: { x: 320, y: 180 },
      population: '6.7M',
      marketSize: 'TSh 1.2B'
    },
    {
      id: 'arusha',
      name: 'Arusha',
      penetration: 76.8,
      distributors: 28,
      revenue: 'TSh 280M',
      growth: '+9%',
      status: 'high',
      districts: ['Arusha City', 'Arusha Rural', 'Karatu', 'Longido', 'Monduli', 'Ngorongoro'],
      coordinates: { x: 280, y: 80 },
      population: '2.3M',
      marketSize: 'TSh 450M'
    },
    {
      id: 'mwanza',
      name: 'Mwanza',
      penetration: 64.3,
      distributors: 32,
      revenue: 'TSh 320M',
      growth: '+12%',
      status: 'medium',
      districts: ['Ilemela', 'Nyamagana', 'Magu', 'Kwimba', 'Misungwi', 'Sengerema', 'Ukerewe'],
      coordinates: { x: 200, y: 100 },
      population: '3.5M',
      marketSize: 'TSh 680M'
    },
    {
      id: 'dodoma',
      name: 'Dodoma',
      penetration: 58.7,
      distributors: 18,
      revenue: 'TSh 195M',
      growth: '+15%',
      status: 'medium',
      districts: ['Dodoma Urban', 'Dodoma Rural', 'Bahi', 'Chamwino', 'Chemba', 'Kondoa', 'Kongwa', 'Mpwapwa'],
      coordinates: { x: 260, y: 140 },
      population: '2.1M',
      marketSize: 'TSh 380M'
    },
    {
      id: 'mbeya',
      name: 'Mbeya',
      penetration: 45.2,
      distributors: 15,
      revenue: 'TSh 165M',
      growth: '+7%',
      status: 'medium',
      districts: ['Mbeya City', 'Mbeya Rural', 'Chunya', 'Kyela', 'Mbarali', 'Momba', 'Rungwe'],
      coordinates: { x: 220, y: 220 },
      population: '2.7M',
      marketSize: 'TSh 420M'
    },
    {
      id: 'morogoro',
      name: 'Morogoro',
      penetration: 52.1,
      distributors: 12,
      revenue: 'TSh 145M',
      growth: '+11%',
      status: 'medium',
      districts: ['Morogoro Urban', 'Morogoro Rural', 'Gairo', 'Kilombero', 'Kilosa', 'Mvomero', 'Ulanga'],
      coordinates: { x: 300, y: 160 },
      population: '2.2M',
      marketSize: 'TSh 350M'
    },
    {
      id: 'tanga',
      name: 'Tanga',
      penetration: 48.9,
      distributors: 14,
      revenue: 'TSh 125M',
      growth: '+8%',
      status: 'medium',
      districts: ['Tanga City', 'Handeni', 'Kilifi', 'Korogwe', 'Lushoto', 'Muheza', 'Pangani'],
      coordinates: { x: 320, y: 90 },
      population: '2.0M',
      marketSize: 'TSh 280M'
    },
    {
      id: 'kilimanjaro',
      name: 'Kilimanjaro',
      penetration: 71.5,
      distributors: 22,
      revenue: 'TSh 235M',
      growth: '+13%',
      status: 'high',
      districts: ['Moshi Municipal', 'Moshi Rural', 'Hai', 'Rombo', 'Same', 'Siha'],
      coordinates: { x: 300, y: 70 },
      population: '1.6M',
      marketSize: 'TSh 320M'
    },
    {
      id: 'tabora',
      name: 'Tabora',
      penetration: 38.4,
      distributors: 8,
      revenue: 'TSh 95M',
      growth: '+5%',
      status: 'low',
      districts: ['Tabora Urban', 'Tabora Rural', 'Igunga', 'Kaliua', 'Nzega', 'Sikonge', 'Urambo'],
      coordinates: { x: 200, y: 140 },
      population: '2.3M',
      marketSize: 'TSh 290M'
    },
    {
      id: 'kigoma',
      name: 'Kigoma',
      penetration: 32.1,
      distributors: 6,
      revenue: 'TSh 75M',
      growth: '+4%',
      status: 'low',
      districts: ['Kigoma Urban', 'Kigoma Rural', 'Buhigwe', 'Kakonko', 'Kasulu', 'Kibondo', 'Uvinza'],
      coordinates: { x: 140, y: 120 },
      population: '2.1M',
      marketSize: 'TSh 250M'
    }
  ];

  const getRegionColor = (region: Region) => {
    if (viewMode === 'penetration') {
      if (region.penetration >= 70) return '#10B981'; // Green
      if (region.penetration >= 50) return '#F59E0B'; // Yellow
      return '#EF4444'; // Red
    }
    if (viewMode === 'growth') {
      const growth = parseFloat(region.growth.replace('%', '').replace('+', ''));
      if (growth >= 10) return '#10B981';
      if (growth >= 5) return '#F59E0B';
      return '#EF4444';
    }
    // Revenue mode
    const revenue = parseFloat(region.revenue.replace('TSh ', '').replace('M', ''));
    if (revenue >= 200) return '#10B981';
    if (revenue >= 100) return '#F59E0B';
    return '#EF4444';
  };

  const selectedRegionData = selectedRegion ? regions.find(r => r.id === selectedRegion) : null;

  const handleRegionClick = (regionId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedRegion(regionId);
      setIsLoading(false);
    }, 500);
  };

  const handleExportMapData = () => {
    const mapData = {
      regions,
      viewMode,
      selectedRegion,
      liveData,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(mapData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tanzania-map-data-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Tanzania RTM Distribution Map</h2>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span>Live Data</span>
            </div>
            <span>{liveData.activeVehicles} vehicles active</span>
            <span>{liveData.deliveriesInProgress} deliveries in progress</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('penetration')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              viewMode === 'penetration' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Market Penetration
          </button>
          <button
            onClick={() => setViewMode('revenue')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              viewMode === 'revenue' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setViewMode('growth')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              viewMode === 'growth' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Growth Rate
          </button>
          <button
            onClick={handleExportMapData}
            className="px-3 py-1 text-sm rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 h-96 overflow-hidden border border-gray-200">
            {/* Tanzania Map SVG */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-md">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Tanzania border outline */}
                  <path
                    d="M50 50 L350 50 L350 250 L50 250 Z"
                    fill="none"
                    stroke="#D1D5DB"
                    strokeWidth="2"
                    className="drop-shadow-sm"
                  />
                  
                  {/* Region markers */}
                  {regions.map((region) => (
                    <g key={region.id}>
                      <circle
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r={selectedRegion === region.id ? "12" : "8"}
                        fill={getRegionColor(region)}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-300 hover:r-10 drop-shadow-md"
                        onClick={() => handleRegionClick(region.id)}
                      />
                      {/* Pulse animation for selected region */}
                      {selectedRegion === region.id && (
                        <circle
                          cx={region.coordinates.x}
                          cy={region.coordinates.y}
                          r="15"
                          fill="none"
                          stroke={getRegionColor(region)}
                          strokeWidth="2"
                          opacity="0.6"
                          className="animate-ping"
                        />
                      )}
                      <text
                        x={region.coordinates.x}
                        y={region.coordinates.y + 25}
                        textAnchor="middle"
                        className="text-xs fill-gray-700 font-medium"
                      >
                        {region.name.split(' ')[0]}
                      </text>
                    </g>
                  ))}

                  {/* Live route indicators */}
                  <g className="animate-pulse">
                    <line x1="320" y1="180" x2="260" y2="140" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="200" y1="100" x2="140" y2="120" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="280" y1="80" x2="300" y2="70" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="5,5" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2 text-sm">
                {viewMode === 'penetration' && 'Market Penetration'}
                {viewMode === 'revenue' && 'Revenue Performance'}
                {viewMode === 'growth' && 'Growth Rate'}
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>High {viewMode === 'penetration' ? '(70%+)' : viewMode === 'revenue' ? '(200M+)' : '(10%+)'}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Medium {viewMode === 'penetration' ? '(50-70%)' : viewMode === 'revenue' ? '(100-200M)' : '(5-10%)'}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Low {viewMode === 'penetration' ? '(<50%)' : viewMode === 'revenue' ? '(<100M)' : '(<5%)'}</span>
                </div>
              </div>
            </div>

            {/* Live Performance Indicator */}
            <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-md border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2 text-sm">Live Performance</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Route Efficiency:</span>
                  <span className="text-green-600 font-bold">{liveData.routeEfficiency.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Vehicles:</span>
                  <span className="text-blue-600 font-bold">{liveData.activeVehicles}</span>
                </div>
                <div className="flex justify-between">
                  <span>In Progress:</span>
                  <span className="text-purple-600 font-bold">{liveData.deliveriesInProgress}</span>
                </div>
              </div>
            </div>

            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Loading region data...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Region Details */}
        <div className="space-y-4">
          {selectedRegionData ? (
            <>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{selectedRegionData.name} Region</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedRegionData.status === 'high' ? 'bg-green-100 text-green-800' :
                    selectedRegionData.status === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedRegionData.status.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Population:</span>
                    <div className="font-semibold text-gray-900">{selectedRegionData.population}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Market Size:</span>
                    <div className="font-semibold text-gray-900">{selectedRegionData.marketSize}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Key Metrics</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-gray-600">Market Penetration</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedRegionData.penetration}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${selectedRegionData.penetration}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-600">Distributors</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedRegionData.distributors}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-purple-600 mr-2" />
                      <span className="text-sm text-gray-600">Revenue</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedRegionData.revenue}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 text-orange-600 mr-2" />
                      <span className="text-sm text-gray-600">Growth</span>
                    </div>
                    <span className="font-semibold text-green-600">{selectedRegionData.growth}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Districts ({selectedRegionData.districts.length})</h4>
                <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                  {selectedRegionData.districts.map((district, index) => (
                    <div key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <span>{district}</span>
                        <MapPin className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Select a Region</h3>
              <p className="text-sm text-gray-600">Click on any region marker to view detailed information and live data</p>
            </div>
          )}

          {/* Top Performers */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Top Performing Regions</h4>
            <div className="space-y-2">
              {regions
                .sort((a, b) => b.penetration - a.penetration)
                .slice(0, 5)
                .map((region, index) => (
                  <div 
                    key={region.id} 
                    className="flex items-center justify-between text-sm p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleRegionClick(region.id)}
                  >
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{region.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{region.penetration}%</span>
                      <Navigation className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Market Alerts */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Market Alerts</h4>
            <div className="space-y-2">
              <div className="flex items-start p-2 bg-yellow-50 rounded border border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <div className="font-medium text-yellow-800">Low Performance</div>
                  <div className="text-yellow-700">Kigoma region below 35% penetration</div>
                </div>
              </div>
              <div className="flex items-start p-2 bg-green-50 rounded border border-green-200">
                <TrendingUp className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <div className="font-medium text-green-800">Growth Opportunity</div>
                  <div className="text-green-700">Mbeya shows 25% expansion potential</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TanzaniaMap;