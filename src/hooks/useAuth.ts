import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  lastLogin?: Date;
  mfaEnabled: boolean;
  avatar?: string;
  company?: string;
  region?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResult {
  success: boolean;
  error?: string;
  user?: User;
}

const DEMO_USERS: Record<string, User> = {
  'admin@intellx.co.tz': {
    id: 'a1b2c3d4-e5f6-4a5b-8c7d-9e8f7a6b5c4d',
    email: 'admin@intellx.co.tz',
    name: 'John Mwangi',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'admin', 'export'],
    mfaEnabled: false,
    company: 'intelX Tanzania',
    region: 'Dar es Salaam',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  'manager@intellx.co.tz': {
    id: 'b2c3d4e5-f6a7-4b5c-8d7e-9f8a7b6c5d4e',
    email: 'manager@intellx.co.tz',
    name: 'Sarah Kimani',
    role: 'manager',
    permissions: ['read', 'write', 'export'],
    mfaEnabled: false,
    company: 'East Africa Distributors',
    region: 'Mwanza',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  'analyst@intellx.co.tz': {
    id: 'c3d4e5f6-a7b8-4c5d-8e7f-9a8b7c6d5e4f',
    email: 'analyst@intellx.co.tz',
    name: 'David Omondi',
    role: 'analyst',
    permissions: ['read', 'analyze', 'report'],
    mfaEnabled: false,
    company: 'Market Analytics Ltd',
    region: 'Arusha',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  'user@intellx.co.tz': {
    id: 'd4e5f6a7-b8c9-4d5e-8f7a-9b8c7d6e5f4a',
    email: 'user@intellx.co.tz',
    name: 'Grace Njeri',
    role: 'user',
    permissions: ['read'],
    mfaEnabled: false,
    company: 'Tanzania Distributors',
    region: 'Dodoma',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
};

const VALID_PASSWORDS = ['IntelX2024!', 'demo', 'password', '123456', 'test'];

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const storedUser = storage.getItem('intellx_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        storage.removeItem('intellx_user');
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = DEMO_USERS[credentials.email.toLowerCase()];

    if (user && (VALID_PASSWORDS.includes(credentials.password) || credentials.password.length >= 6)) {
      const authenticatedUser = {
        ...user,
        lastLogin: new Date()
      };

      storage.setItem('intellx_user', JSON.stringify(authenticatedUser));

      setAuthState({
        user: authenticatedUser,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true, user: authenticatedUser };
    }

    if (credentials.email.includes('@') && credentials.password.length >= 6) {
      const name = credentials.email.split('@')[0]
        .replace(/[^a-zA-Z]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .trim() || 'Demo User';

      const trialUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name,
        role: 'trial',
        permissions: ['read'],
        mfaEnabled: false,
        company: 'Trial Company',
        region: 'Tanzania',
        lastLogin: new Date()
      };

      storage.setItem('intellx_user', JSON.stringify(trialUser));

      setAuthState({
        user: trialUser,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true, user: trialUser };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const logout = async () => {
    storage.removeItem('intellx_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const register = async (credentials: LoginCredentials): Promise<LoginResult> => {
    return login(credentials);
  };

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    logout,
    register,
  };
};
