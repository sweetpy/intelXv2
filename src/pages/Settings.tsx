import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSecurityContext } from '../components/SecurityProvider';
import { validatePasswordStrength } from '../utils/security';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell,
  Shield,
  Database,
  Globe,
  Palette,
  Key,
  Mail,
  Phone,
  MapPin,
  Save,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle,
  CheckCircle,
  Lock
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    reports: true
  });

  const { user, changePassword, hasPermission } = useAuth();
  const { securityLevel, auditLogger, csrfToken } = useSecurityContext();

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'data', label: 'Data & Privacy', icon: Database },
    { id: 'regional', label: 'Regional Settings', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  const regions = [
    'Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya', 'Morogoro',
    'Tanga', 'Kilimanjaro', 'Tabora', 'Kigoma', 'Shinyanga', 'Kagera',
    'Mtwara', 'Ruvuma', 'Iringa', 'Lindi', 'Singida', 'Rukwa',
    'Katavi', 'Njombe', 'Simiyu', 'Geita', 'Songwe', 'Manyara', 'Pemba', 'Unguja'
  ];

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    // Validate password strength
    const validation = validatePasswordStrength(newPassword);
    if (!validation.isValid) {
      setPasswordError(validation.feedback.join(', '));
      return;
    }

    setIsChangingPassword(true);

    try {
      const result = await changePassword(currentPassword, newPassword);
      
      if (result.success) {
        setPasswordSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        // Log successful password change
        auditLogger.log({
          userId: user?.id,
          action: 'PASSWORD_CHANGED',
          resource: 'SETTINGS',
          success: true,
        });
      } else {
        setPasswordError(result.error || 'Password change failed');
      }
    } catch (error) {
      setPasswordError('An error occurred while changing password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    const validation = validatePasswordStrength(password);
    return validation;
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue={user?.name || "John Mwangi"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
            <input
              type="text"
              defaultValue="Market Analyst"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                defaultValue={user?.email || "john.mwangi@company.co.tz"}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                defaultValue="+255 123 456 789"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              defaultValue="Tanzania Trading Co."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>FMCG</option>
              <option>Pharmaceuticals</option>
              <option>Agriculture</option>
              <option>Electronics</option>
              <option>Manufacturing</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                rows={3}
                defaultValue="123 Uhuru Street, Dar es Salaam, Tanzania"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive updates via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">SMS Notifications</h4>
              <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Push Notifications</h4>
              <p className="text-sm text-gray-600">Browser and mobile push notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Weekly Reports</h4>
              <p className="text-sm text-gray-600">Automated weekly performance reports</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.reports}
                onChange={(e) => setNotifications({...notifications, reports: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      {/* Security Status */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
        <div className="flex items-center mb-2">
          <Shield className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="font-medium text-green-900">Security Status</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span>Security Level: <strong className="capitalize">{securityLevel}</strong></span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span>Session Active</span>
          </div>
          <div className="flex items-center">
            <Lock className="h-4 w-4 text-blue-500 mr-2" />
            <span>CSRF Protected</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Password & Authentication</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {newPassword && (
              <div className="mt-2">
                <div className="text-xs text-gray-600 mb-1">Password Strength:</div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((level) => {
                    const strength = getPasswordStrength(newPassword);
                    const isActive = strength.score >= level;
                    return (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded ${
                          isActive
                            ? strength.score <= 2
                              ? 'bg-red-500'
                              : strength.score <= 3
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    );
                  })}
                </div>
                {!getPasswordStrength(newPassword).isValid && (
                  <div className="mt-1 text-xs text-red-600">
                    {getPasswordStrength(newPassword).feedback.join(', ')}
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          {passwordError && (
            <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm text-red-700">{passwordError}</span>
            </div>
          )}
          
          {passwordSuccess && (
            <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm text-green-700">Password changed successfully!</span>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isChangingPassword ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Changing Password...
              </>
            ) : (
              'Change Password'
            )}
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-yellow-800">Enable 2FA</h4>
              <p className="text-sm text-yellow-700">Add an extra layer of security to your account</p>
            </div>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors">
              Enable
            </button>
          </div>
        </div>
      </div>

      {/* Security Audit Log */}
      {hasPermission('admin') && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Security Audit Log</h3>
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            <div className="space-y-2">
              {auditLogger.getLogs(user?.id).slice(-10).reverse().map((log, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">
                    {new Date(log.timestamp).toLocaleString()}: {log.action}
                  </span>
                  <span className={`px-2 py-1 rounded ${log.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {log.success ? 'Success' : 'Failed'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">API Keys</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Production API Key</h4>
              <p className="text-sm text-gray-600">sk_prod_••••••••••••••••{csrfToken.slice(-4)}</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800">
                <Eye className="h-4 w-4" />
              </button>
              <button className="text-green-600 hover:text-green-800">
                <Key className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Test API Key</h4>
              <p className="text-sm text-gray-600">sk_test_••••••••••••••••{csrfToken.slice(-4)}</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800">
                <Eye className="h-4 w-4" />
              </button>
              <button className="text-green-600 hover:text-green-800">
                <Key className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRegionalSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Region</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Dar es Salaam</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Tanzanian Shilling (TSh)</option>
              <option>US Dollar (USD)</option>
              <option>Euro (EUR)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>English</option>
              <option>Kiswahili</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>East Africa Time (EAT)</option>
              <option>UTC</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Active Regions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {regions.map((region) => (
            <div key={region} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">{region}</span>
              <button className="text-green-600 hover:text-green-800">
                <Check className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and system configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Settings</h3>
            </div>
            <nav className="p-2">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-3 rounded-lg mb-1 transition-colors flex items-center ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <tab.icon className={`h-5 w-5 mr-3 ${
                    activeTab === tab.id ? 'text-green-600' : 'text-gray-400'
                  }`} />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {activeTab === 'profile' && renderProfileSettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'security' && renderSecuritySettings()}
            {activeTab === 'regional' && renderRegionalSettings()}
            {activeTab === 'data' && (
              <div className="text-center py-12">
                <Database className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Data & Privacy Settings</h3>
                <p className="text-gray-600">Configure your data retention and privacy preferences</p>
              </div>
            )}
            {activeTab === 'appearance' && (
              <div className="text-center py-12">
                <Palette className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Appearance Settings</h3>
                <p className="text-gray-600">Customize the look and feel of your dashboard</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;