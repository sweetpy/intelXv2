import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const quickLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo');
    setError('');
    setIsLoading(true);

    const result = await login({ email: demoEmail, password: 'demo' });

    if (result.success) {
      setSuccess(`Welcome ${result.user?.name}!`);
      setTimeout(() => {
        onSuccess();
      }, 800);
    } else {
      setError(result.error || 'Login failed');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const result = mode === 'login'
      ? await login({ email, password })
      : await register({ email, password });

    if (result.success) {
      setSuccess(`Welcome ${result.user?.name}!`);
      setTimeout(() => {
        onSuccess();
      }, 800);
    } else {
      setError(result.error || 'Authentication failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75 backdrop-blur-sm" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-blue-600 px-6 py-8">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-white/20 backdrop-blur-md rounded-full">
                <Sparkles className="h-8 w-8 text-white animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p className="text-green-100">
                {mode === 'login'
                  ? 'Sign in to access your intelligence dashboard'
                  : 'Create your account and explore intelX'}
              </p>
            </div>
          </div>

          <div className="bg-white px-6 py-6">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start animate-shake">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg flex items-start animate-bounce">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800">{success}</p>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Zap className="h-4 w-4 mr-1 text-yellow-500" />
                Quick Demo Access
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => quickLogin('admin@intellx.co.tz')}
                  disabled={isLoading}
                  className="px-3 py-2 text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50"
                >
                  Admin
                </button>
                <button
                  onClick={() => quickLogin('manager@intellx.co.tz')}
                  disabled={isLoading}
                  className="px-3 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50"
                >
                  Manager
                </button>
                <button
                  onClick={() => quickLogin('analyst@intellx.co.tz')}
                  disabled={isLoading}
                  className="px-3 py-2 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50"
                >
                  Analyst
                </button>
                <button
                  onClick={() => quickLogin('user@intellx.co.tz')}
                  disabled={isLoading}
                  className="px-3 py-2 text-sm bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50"
                >
                  User
                </button>
              </div>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or use custom credentials</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter password (6+ chars)"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  mode === 'login' ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => {
                    setMode(mode === 'login' ? 'register' : 'login');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800 text-center">
                Demo Mode: Any email + 6+ character password works!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
