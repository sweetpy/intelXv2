import React, { createContext, useContext, useEffect, useState } from 'react';
import { security, AuditLogger, SECURITY_HEADERS } from '../utils/security';

interface SecurityContextType {
  csrfToken: string;
  isSecureConnection: boolean;
  securityLevel: 'low' | 'medium' | 'high';
  auditLogger: AuditLogger;
  reportSecurityEvent: (event: SecurityEvent) => void;
}

interface SecurityEvent {
  type: 'suspicious_activity' | 'security_violation' | 'data_breach' | 'unauthorized_access';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  metadata?: any;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext must be used within a SecurityProvider');
  }
  return context;
};

interface SecurityProviderProps {
  children: React.ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [isSecureConnection, setIsSecureConnection] = useState<boolean>(false);
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high'>('medium');
  
  const auditLogger = AuditLogger.getInstance();

  useEffect(() => {
    // Initialize security measures
    initializeSecurity();
    
    // Set up security monitoring
    setupSecurityMonitoring();
    
    // Apply security headers (in a real app, this would be done server-side)
    applySecurityHeaders();
    
    return () => {
      // Cleanup security monitoring
      cleanupSecurityMonitoring();
    };
  }, []);

  const initializeSecurity = () => {
    // Generate CSRF token
    const token = security.generateCSRFToken();
    setCsrfToken(token);
    
    // Check if connection is secure
    setIsSecureConnection(window.location.protocol === 'https:');
    
    // Determine security level based on environment
    const level = determineSecurityLevel();
    setSecurityLevel(level);
    
    // Log security initialization
    auditLogger.log({
      action: 'SECURITY_INITIALIZED',
      resource: 'SECURITY',
      success: true,
      details: {
        securityLevel: level,
        isSecure: window.location.protocol === 'https:',
        userAgent: navigator.userAgent,
      },
    });
  };

  const determineSecurityLevel = (): 'low' | 'medium' | 'high' => {
    // Check various security factors
    const factors = {
      httpsEnabled: window.location.protocol === 'https:',
      modernBrowser: 'crypto' in window && 'fetch' in window,
      secureContext: window.isSecureContext,
      localStorage: typeof Storage !== 'undefined',
    };

    const secureFactors = Object.values(factors).filter(Boolean).length;
    
    if (secureFactors >= 4) return 'high';
    if (secureFactors >= 2) return 'medium';
    return 'low';
  };

  const setupSecurityMonitoring = () => {
    // Monitor for suspicious activities
    
    // 1. Monitor for rapid-fire requests (potential bot activity)
    let requestCount = 0;
    const requestWindow = 60000; // 1 minute
    
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      requestCount++;
      
      // Reset counter after window
      setTimeout(() => {
        requestCount = Math.max(0, requestCount - 1);
      }, requestWindow);
      
      // Alert on suspicious activity
      if (requestCount > 100) {
        reportSecurityEvent({
          type: 'suspicious_activity',
          severity: 'high',
          description: 'Excessive API requests detected',
          metadata: { requestCount, timeWindow: requestWindow },
        });
      }
      
      return originalFetch(...args);
    };

    // 2. Monitor for console access (potential developer tools usage)
    let devToolsOpen = false;
    const threshold = 160;
    
    const detectDevTools = () => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          reportSecurityEvent({
            type: 'security_violation',
            severity: 'medium',
            description: 'Developer tools detected',
            metadata: { 
              outerHeight: window.outerHeight,
              innerHeight: window.innerHeight,
              outerWidth: window.outerWidth,
              innerWidth: window.innerWidth,
            },
          });
        }
      } else {
        devToolsOpen = false;
      }
    };

    const devToolsInterval = setInterval(detectDevTools, 1000);
    
    // Store interval ID for cleanup
    (window as any).__securityIntervals = [devToolsInterval];

    // 3. Monitor for clipboard access
    document.addEventListener('copy', () => {
      auditLogger.log({
        action: 'CLIPBOARD_COPY',
        resource: 'SECURITY',
        success: true,
        details: { timestamp: Date.now() },
      });
    });

    document.addEventListener('paste', () => {
      auditLogger.log({
        action: 'CLIPBOARD_PASTE',
        resource: 'SECURITY',
        success: true,
        details: { timestamp: Date.now() },
      });
    });

    // 4. Monitor for right-click (context menu)
    document.addEventListener('contextmenu', (e) => {
      if (securityLevel === 'high') {
        e.preventDefault();
        reportSecurityEvent({
          type: 'security_violation',
          severity: 'low',
          description: 'Context menu access attempted',
          metadata: { target: e.target },
        });
      }
    });

    // 5. Monitor for key combinations (F12, Ctrl+Shift+I, etc.)
    document.addEventListener('keydown', (e) => {
      const suspiciousKeys = [
        { key: 'F12' },
        { key: 'I', ctrlKey: true, shiftKey: true },
        { key: 'J', ctrlKey: true, shiftKey: true },
        { key: 'C', ctrlKey: true, shiftKey: true },
        { key: 'U', ctrlKey: true },
      ];

      const isSuspicious = suspiciousKeys.some(combo => 
        e.key === combo.key && 
        (!combo.ctrlKey || e.ctrlKey) && 
        (!combo.shiftKey || e.shiftKey)
      );

      if (isSuspicious && securityLevel === 'high') {
        e.preventDefault();
        reportSecurityEvent({
          type: 'security_violation',
          severity: 'medium',
          description: 'Suspicious key combination detected',
          metadata: { 
            key: e.key, 
            ctrlKey: e.ctrlKey, 
            shiftKey: e.shiftKey,
            altKey: e.altKey,
          },
        });
      }
    });
  };

  const cleanupSecurityMonitoring = () => {
    // Clear intervals
    const intervals = (window as any).__securityIntervals || [];
    intervals.forEach((interval: number) => clearInterval(interval));
    
    // Restore original fetch
    // Note: In a real implementation, you'd want to store the original reference
  };

  const applySecurityHeaders = () => {
    // In a real application, these would be set server-side
    // This is for demonstration purposes only
    
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = SECURITY_HEADERS['Content-Security-Policy'];
    document.head.appendChild(meta);

    // Add other security-related meta tags
    const nosniff = document.createElement('meta');
    nosniff.httpEquiv = 'X-Content-Type-Options';
    nosniff.content = 'nosniff';
    document.head.appendChild(nosniff);
  };

  const reportSecurityEvent = (event: SecurityEvent) => {
    // Log the security event
    auditLogger.log({
      action: 'SECURITY_EVENT',
      resource: 'SECURITY',
      success: false,
      details: {
        type: event.type,
        severity: event.severity,
        description: event.description,
        metadata: event.metadata,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: Date.now(),
      },
    });

    // In a real application, you would also:
    // 1. Send to security monitoring service
    // 2. Alert security team for critical events
    // 3. Potentially block the user for severe violations
    
    if (event.severity === 'critical') {
      console.warn('CRITICAL SECURITY EVENT:', event);
      // In production, this might trigger an immediate logout or account lock
    }
  };

  const contextValue: SecurityContextType = {
    csrfToken,
    isSecureConnection,
    securityLevel,
    auditLogger,
    reportSecurityEvent,
  };

  return (
    <SecurityContext.Provider value={contextValue}>
      {children}
    </SecurityContext.Provider>
  );
};

// Security HOC for protecting components
export const withSecurity = <P extends object>(
  Component: React.ComponentType<P>,
  requiredSecurityLevel: 'low' | 'medium' | 'high' = 'medium'
) => {
  return (props: P) => {
    const { securityLevel, reportSecurityEvent } = useSecurityContext();
    
    const securityLevels = { low: 1, medium: 2, high: 3 };
    const hasRequiredLevel = securityLevels[securityLevel] >= securityLevels[requiredSecurityLevel];
    
    if (!hasRequiredLevel) {
      reportSecurityEvent({
        type: 'unauthorized_access',
        severity: 'high',
        description: `Insufficient security level for component access`,
        metadata: { 
          required: requiredSecurityLevel, 
          current: securityLevel,
          component: Component.name,
        },
      });
      
      return (
        <div className="p-8 text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Security Level Insufficient</h2>
          <p className="text-gray-600">This component requires a higher security level to access.</p>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
};