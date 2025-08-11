import React, { useState, useEffect } from 'react';
import { useDatabase, useCustomerMaster } from '../hooks/useDatabase';
import { CustomerService } from '../services/customerService';
import { GeocodingService } from '../services/geocodingService';
import DatabaseStatus from '../components/DatabaseStatus';
import TanzaniaInteractiveMap from '../components/TanzaniaInteractiveMap';

const CustomerMaster: React.FC = () => {
  const { customers, isLoading: dbLoading, error: dbError } = useDatabase();
  const { uploadCustomerMaster, isLoading: uploadLoading, error: uploadError } = useCustomerMaster();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [realCustomers, setRealCustomers] = useState<any[]>([]);
  const [customerStats, setCustomerStats] = useState<any>({});

  // Load real customer data
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await customers.getAll();
        if (data) {
          setRealCustomers(data);
        }
        
        const stats = await CustomerService.getCustomerStats();
        setCustomerStats(stats);
      } catch (error) {
        console.error('Error loading customers:', error);
      }
    };

    loadCustomers();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    setUploadProgress(0);
    setValidationErrors([]);
    
    try {
      const result = await uploadCustomerMaster(file);
      
      if (result) {
        setUploadProgress(100);
        setShowUploadModal(false);
        
        // Reload customer data
        const updatedData = await customers.getAll();
        if (updatedData) {
          setRealCustomers(updatedData);
        }
        
        // Show success message
        alert(`Successfully uploaded ${result.length} customers!`);
      } else {
        setValidationErrors([uploadError || 'Upload failed']);
      }
    } catch (error) {
      setValidationErrors([error instanceof Error ? error.message : 'Upload failed']);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const csvContent = await CustomerService.exportCustomers({
        region: selectedRegion !== 'all' ? selectedRegion : undefined,
        customer_type: selectedType !== 'all' ? selectedType : undefined,
        status: 'active'
      });
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `intellx-customers-${selectedRegion}-${Date.now()}.csv`;
      document.body.appendChild(a);
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Use real customers if available, otherwise fall back to mock data
  const customersToFilter = realCustomers.length > 0 ? realCustomers.map(c => ({
    id: c.id,
    name: c.name,
    company: c.company,
    email: c.email,
    phone: c.phone,
    address: c.address,
    region: c.region,
    district: c.district,
    type: c.customer_type,
    status: c.status,
    tier: c.tier,
    coordinates: {
      lat: c.latitude || 0,
      lng: c.longitude || 0
    },
    totalRevenue: c.total_revenue,
    totalOrders: c.total_orders,
    satisfactionScore: c.satisfaction_score,
    registrationDate: c.registration_date,
    tags: c.tags || []
  })) : mockCustomers;

  const filteredCustomers = customersToFilter.filter(customer => {
    return true;
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <DatabaseStatus />
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center mb-2">
            <Users className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-900">Total Customers</h3>
          </div>
          <div className="text-2xl font-bold text-blue-600">{(customerStats.total || customersToFilter.length).toLocaleString()}</div>
          <div className="text-sm text-blue-700">Across 26 regions</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-green-900">Active Outlets</h3>
          </div>
          <div className="text-2xl font-bold text-green-600">{(customerStats.active || customersToFilter.filter(c => c.status === 'active').length).toLocaleString()}</div>
          <div className="text-sm text-green-700">Ready for business</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="font-semibold text-purple-900">Geo-coded</h3>
          </div>
          <div className="text-2xl font-bold text-purple-600">{customersToFilter.filter(c => c.coordinates.lat && c.coordinates.lng).length.toLocaleString()}</div>
          <div className="text-sm text-purple-700">With coordinates</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center mb-2">
            <TrendingUp className="h-5 w-5 text-orange-600 mr-2" />
            <h3 className="font-semibold text-orange-900">Coverage</h3>
          </div>
          <div className="text-2xl font-bold text-orange-600">{Object.keys(customerStats.byRegion || {}).length || 26}</div>
          <div className="text-sm text-orange-700">Regions covered</div>
        </div>
      </div>

      {/* Interactive Tanzania Map */}
      <TanzaniaInteractiveMap customers={filteredCustomers} isLoading={dbLoading} />

      <div className="space-y-2 text-sm">
        {validationErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <h4 className="font-medium text-red-800 mb-2">Validation Errors:</h4>
            <ul className="list-disc list-inside text-red-700 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex items-center text-green-600">
          <CheckCircle className="h-4 w-4 mr-2" />
          <span>CSV and Excel file support</span>
        </div>
        <div className="flex items-center text-blue-600">
          <CheckCircle className="h-4 w-4 mr-2" />
          <span>Automatic geo-coding for Tanzania addresses</span>
        </div>
        <div className="flex items-center text-purple-600">
          <CheckCircle className="h-4 w-4 mr-2" />
          <span>Real-time data validation and error checking</span>
        </div>
        <div className="flex items-center text-orange-600">
          <CheckCircle className="h-4 w-4 mr-2" />
          <span>Secure bulk upload with progress tracking</span>
        </div>
      </div>
      
      {uploadError && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-800 text-sm">{uploadError}</p>
        </div>
      )}

      <div className="flex space-x-3 mt-6">
        <button
          onClick={() => setShowUploadModal(false)}
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          disabled={isUploading}
        >
          Cancel
        </button>
        <button
          onClick={() => document.getElementById('file-upload')?.click()}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50"
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </>
          )}
        </button>
      </div>
      <input
        id="file-upload"
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
        className="hidden"
        disabled={isUploading}
      />
    </div>
  );
};

export default CustomerMaster;