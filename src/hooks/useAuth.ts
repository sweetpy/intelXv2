import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { SessionManager, AuditLogger, validatePasswordStrength, rateLimiter } from '../utils/security';

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
  sessionId: string | null;
  csrfToken: string | null;
  loginAttempts: number;
  isLocked: boolean;
  lockoutExpires?: Date;
}

interface LoginCredentials {
  email: string;
  password: string;
  mfaCode?: string;
  rememberMe?: boolean;
}

interface LoginResult {
  success: boolean;
  error?: string;
  requiresMFA?: boolean;
  user?: User;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    sessionId: null,
    csrfToken: null,
    loginAttempts: 0,
    isLocked: false,
  });

  const sessionManager = SessionManager.getInstance();
  const auditLogger = AuditLogger.getInstance();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      try {
        const storedSessionId = localStorage.getItem('intellx_session');
        const storedUser = localStorage.getItem('intellx_user');

        if (storedSessionId && storedUser) {
          const sessionValidation = sessionManager.validateSession(storedSessionId);
          
          if (sessionValidation.isValid) {
            const user = JSON.parse(storedUser);
            setAuthState(prev => ({
              ...prev,
              user,
              isAuthenticated: true,
              sessionId: storedSessionId,
              csrfToken: sessionValidation.csrfToken,
              isLoading: false,
            }));

            auditLogger.log({
              userId: user.id,
              action: 'SESSION_RESTORED',
              resource: 'AUTH',
              success: true,
              details: {
                userAgent: navigator.userAgent,
                timestamp: Date.now(),
              },
            });
          } else {
            // Clear invalid session
            localStorage.removeItem('intellx_session');
            localStorage.removeItem('intellx_user');
            setAuthState(prev => ({ ...prev, isLoading: false }));
          }
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  // Check for account lockout
  const checkLockout = useCallback((): boolean => {
    const lockoutData = localStorage.getItem('intellx_lockout');
    if (lockoutData) {
      const { attempts, timestamp } = JSON.parse(lockoutData);
      const lockoutExpires = new Date(timestamp + 15 * 60 * 1000); // 15 minutes
      
      if (attempts >= 5 && new Date() < lockoutExpires) {
        setAuthState(prev => ({
          ...prev,
          isLocked: true,
          lockoutExpires,
          loginAttempts: attempts,
        }));
        return true;
      } else if (new Date() >= lockoutExpires) {
        // Clear expired lockout
        localStorage.removeItem('intellx_lockout');
        setAuthState(prev => ({
          ...prev,
          isLocked: false,
          lockoutExpires: undefined,
          loginAttempts: 0,
        }));
      }
    }
    return false;
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<LoginResult> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Check rate limiting
    if (!rateLimiter.isAllowed(`login_${credentials.email}`, 5)) {
      auditLogger.log({
        action: 'LOGIN_RATE_LIMITED',
        resource: 'AUTH',
        success: false,
        details: { email: credentials.email },
      });
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Too many login attempts. Please try again later.' };
    }

    // Check account lockout
    if (checkLockout()) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Account is temporarily locked due to multiple failed attempts.' };
    }

    try {
      // Simulate API call to authenticate user
      const response = await simulateLogin(credentials);
      
      if (response.success && response.user) {
        // Create session
        const { sessionId, csrfToken } = sessionManager.createSession(response.user.id);
        
        // Store session and user data
        localStorage.setItem('intellx_session', sessionId);
        localStorage.setItem('intellx_user', JSON.stringify(response.user));
        
        // Clear lockout data on successful login
        localStorage.removeItem('intellx_lockout');
        
        setAuthState(prev => ({
          ...prev,
          user: response.user!,
          isAuthenticated: true,
          sessionId,
          csrfToken,
          loginAttempts: 0,
          isLocked: false,
          lockoutExpires: undefined,
          isLoading: false,
        }));

        auditLogger.log({
          userId: response.user.id,
          action: 'LOGIN_SUCCESS',
          resource: 'AUTH',
          success: true,
          details: { email: credentials.email, mfaUsed: !!credentials.mfaCode },
        });

        return { success: true, user: response.user };
      } else {
        // Handle failed login
        const currentAttempts = authState.loginAttempts + 1;
        
        if (currentAttempts >= 5) {
          // Lock account
          localStorage.setItem('intellx_lockout', JSON.stringify({
            attempts: currentAttempts,
            timestamp: Date.now(),
          }));
          
          setAuthState(prev => ({
            ...prev,
            isLocked: true,
            lockoutExpires: new Date(Date.now() + 15 * 60 * 1000),
            loginAttempts: currentAttempts,
          }));
        } else {
          setAuthState(prev => ({
            ...prev,
            loginAttempts: currentAttempts,
          }));
        }

        auditLogger.log({
          action: 'LOGIN_FAILED',
          resource: 'AUTH',
          success: false,
          details: { email: credentials.email, attempts: currentAttempts },
        });

        return { 
          success: false, 
          error: response.error || 'Invalid credentials',
          requiresMFA: response.requiresMFA 
        };
      }
    } catch (error) {
      auditLogger.log({
        action: 'LOGIN_ERROR',
        resource: 'AUTH',
        success: false,
        details: { email: credentials.email, error: error instanceof Error ? error.message : 'Unknown error' },
      });

      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }, [authState.loginAttempts, checkLockout]);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      if (authState.sessionId) {
        sessionManager.destroySession(authState.sessionId);
      }

      if (authState.user) {
        auditLogger.log({
          userId: authState.user.id,
          action: 'LOGOUT',
          resource: 'AUTH',
          success: true,
        });
      }

      // Clear stored data
      localStorage.removeItem('intellx_session');
      localStorage.removeItem('intellx_user');

      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        sessionId: null,
        csrfToken: null,
        loginAttempts: 0,
        isLocked: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [authState.sessionId, authState.user]);

  // Change password function
  const changePassword = useCallback(async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!authState.user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      return { success: false, error: passwordValidation.feedback.join(', ') };
    }

    try {
      // Simulate API call to change password
      const success = await simulatePasswordChange(authState.user.id, currentPassword, newPassword);
      
      if (success) {
        auditLogger.log({
          userId: authState.user.id,
          action: 'PASSWORD_CHANGED',
          resource: 'AUTH',
          success: true,
        });

        return { success: true };
      } else {
        auditLogger.log({
          userId: authState.user.id,
          action: 'PASSWORD_CHANGE_FAILED',
          resource: 'AUTH',
          success: false,
        });

        return { success: false, error: 'Current password is incorrect' };
      }
    } catch (error) {
      return { success: false, error: 'Password change failed. Please try again.' };
    }
  }, [authState.user]);

  // Check permissions
  const hasPermission = useCallback((permission: string): boolean => {
    return authState.user?.permissions.includes(permission) || false;
  }, [authState.user]);

  // Refresh session
  const refreshSession = useCallback(async (): Promise<void> => {
    if (authState.sessionId) {
      const sessionValidation = sessionManager.validateSession(authState.sessionId);
      
      if (sessionValidation.isValid) {
        setAuthState(prev => ({
          ...prev,
          csrfToken: sessionValidation.csrfToken,
        }));
      } else {
        await logout();
      }
    }
  }, [authState.sessionId, logout]);

  // Auto-refresh session every 5 minutes
  useEffect(() => {
    if (authState.isAuthenticated) {
      const interval = setInterval(refreshSession, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [authState.isAuthenticated, refreshSession]);

  return {
    ...authState,
    login,
    logout,
    changePassword,
    hasPermission,
    refreshSession,
    checkLockout,
  };
};

// Simulate login API call
const simulateLogin = async (credentials: LoginCredentials): Promise<LoginResult> => {
  try {
    // Try Supabase authentication first
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });

    if (data.user && !error) {
      // Get user profile from database
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('email', credentials.email)
        .single();

      if (profile && !profileError) {
        return {
          success: true,
          user: {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            role: profile.role,
            permissions: profile.permissions,
            lastLogin: new Date(),
            mfaEnabled: profile.mfa_enabled,
            company: profile.company,
            region: profile.region,
            avatar: profile.avatar_url
          }
        };
      }
    }
  } catch (supabaseError) {
    console.log('Supabase auth failed, falling back to demo mode');
  }

  // Fallback to demo authentication
  await new Promise(resolve => setTimeout(resolve, 100));

  // Demo credentials for testing
  const demoUsers: Record<string, User> = {
    'admin@intellx.co.tz': {
      id: '1',
      email: 'admin@intellx.co.tz',
      name: 'John Mwangi',
      role: 'admin',
      permissions: ['read', 'write', 'delete', 'admin'],
      mfaEnabled: true,
      company: 'intelX Tanzania',
      region: 'Dar es Salaam',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    'analyst@intellx.co.tz': {
      id: '2',
      email: 'analyst@intellx.co.tz',
      name: 'Sarah Kimani',
      role: 'analyst',
      permissions: ['read', 'write'],
      mfaEnabled: false,
      company: 'Market Analytics Ltd',
      region: 'Mwanza',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    // Allow any email for trial users
    'trial@demo.com': {
      id: '3',
      email: 'trial@demo.com',
      name: 'Trial User',
      role: 'trial',
      permissions: ['read'],
      mfaEnabled: false,
      company: 'Demo Company',
      region: 'Tanzania',
    },
  };

  // Check if it's a demo user or allow any email for trial
  let user = demoUsers[credentials.email];
  
  // If not a demo user, create a trial user for any valid email
  if (!user && credentials.email.includes('@')) {
    const name = credentials.email.split('@')[0]
      .replace(/[^a-zA-Z]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .trim() || 'Demo User';
      
    user = {
      id: Date.now().toString(),
      email: credentials.email,
      name,
      role: 'trial',
      permissions: ['read'],
      mfaEnabled: false,
      company: 'Trial Company',
      region: 'Tanzania',
    };
  }
  
  // Accept any password for demo purposes, or specific demo passwords
  const validPassword = credentials.password === 'IntelX2024!' || 
                       credentials.password === 'demo' || 
                       credentials.password === 'trial' ||
                       credentials.password.length >= 6;
  
  if (user && validPassword) {
    if (user.mfaEnabled && !credentials.mfaCode) {
      return { success: false, requiresMFA: true };
    }
    
    if (user.mfaEnabled && credentials.mfaCode !== '123456') {
      return { success: false, error: 'Invalid MFA code' };
    }

    return { 
      success: true, 
      user: { 
        ...user, 
        lastLogin: new Date() 
      } 
    };
  }

  return { success: false, error: 'Invalid email or password. Please try again.' };
};

// Simulate password change API call
const simulatePasswordChange = async (userId: string, currentPassword: string, newPassword: string): Promise<boolean> => {
  try {
    // Try Supabase password update
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (!error) {
      return true;
    }
  } catch (supabaseError) {
    console.log('Supabase password change failed, using demo mode');
  }

  // Fallback to demo mode
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Accept any reasonable current password for demo
  return currentPassword.length >= 6;
};