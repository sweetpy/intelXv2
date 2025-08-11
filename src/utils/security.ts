// Security utilities for intelX platform
import CryptoJS from 'crypto-js';

// Environment configuration
const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY;
if (!encryptionKey) {
  throw new Error('Missing VITE_ENCRYPTION_KEY environment variable');
}

export const SECURITY_CONFIG = {
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  PASSWORD_MIN_LENGTH: 12,
  ENCRYPTION_KEY: encryptionKey,
  API_RATE_LIMIT: 100, // requests per minute
  CSRF_TOKEN_LENGTH: 32,
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 1000); // Limit length
};

// SQL injection prevention
export const sanitizeSQLInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/['";\\]/g, '') // Remove SQL injection characters
    .replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi, '') // Remove SQL keywords
    .trim();
};

// XSS prevention
export const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// CSRF token generation
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(SECURITY_CONFIG.CSRF_TOKEN_LENGTH);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Data encryption
export const encryptData = (data: string): string => {
  try {
    return CryptoJS.AES.encrypt(data, SECURITY_CONFIG.ENCRYPTION_KEY).toString();
  } catch (error) {
    console.error('Encryption failed:', error);
    return '';
  }
};

// Data decryption
export const decryptData = (encryptedData: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECURITY_CONFIG.ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption failed:', error);
    return '';
  }
};

// Password strength validation
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length < SECURITY_CONFIG.PASSWORD_MIN_LENGTH) {
    feedback.push(`Password must be at least ${SECURITY_CONFIG.PASSWORD_MIN_LENGTH} characters long`);
  } else {
    score += 1;
  }

  if (!/[a-z]/.test(password)) {
    feedback.push('Password must contain lowercase letters');
  } else {
    score += 1;
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('Password must contain uppercase letters');
  } else {
    score += 1;
  }

  if (!/\d/.test(password)) {
    feedback.push('Password must contain numbers');
  } else {
    score += 1;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    feedback.push('Password must contain special characters');
  } else {
    score += 1;
  }

  return {
    isValid: score >= 4,
    score,
    feedback
  };
};

// Rate limiting
class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  isAllowed(identifier: string, limit: number = SECURITY_CONFIG.API_RATE_LIMIT): boolean {
    const now = Date.now();
    const windowStart = now - 60000; // 1 minute window

    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, []);
    }

    const userRequests = this.requests.get(identifier)!;
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => time > windowStart);
    
    if (validRequests.length >= limit) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }
}

export const rateLimiter = new RateLimiter();

// Session management
export class SessionManager {
  private static instance: SessionManager;
  private sessions: Map<string, { userId: string; expires: number; csrfToken: string }> = new Map();

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  createSession(userId: string): { sessionId: string; csrfToken: string } {
    const sessionId = this.generateSessionId();
    const csrfToken = generateCSRFToken();
    const expires = Date.now() + SECURITY_CONFIG.SESSION_TIMEOUT;

    this.sessions.set(sessionId, { userId, expires, csrfToken });
    
    // Auto-cleanup expired sessions
    setTimeout(() => this.cleanupExpiredSessions(), SECURITY_CONFIG.SESSION_TIMEOUT);

    return { sessionId, csrfToken };
  }

  validateSession(sessionId: string): { isValid: boolean; userId?: string; csrfToken?: string } {
    const session = this.sessions.get(sessionId);
    
    if (!session || session.expires < Date.now()) {
      if (session) {
        this.sessions.delete(sessionId);
      }
      return { isValid: false };
    }

    // Extend session
    session.expires = Date.now() + SECURITY_CONFIG.SESSION_TIMEOUT;
    
    return { 
      isValid: true, 
      userId: session.userId, 
      csrfToken: session.csrfToken 
    };
  }

  destroySession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  private generateSessionId(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  private cleanupExpiredSessions(): void {
    const now = Date.now();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.expires < now) {
        this.sessions.delete(sessionId);
      }
    }
  }
}

// Audit logging
export class AuditLogger {
  private static instance: AuditLogger;
  private logs: Array<{
    timestamp: number;
    userId?: string;
    action: string;
    resource: string;
    ip?: string;
    userAgent?: string;
    success: boolean;
    details?: any;
  }> = [];

  static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  log(entry: {
    userId?: string;
    action: string;
    resource: string;
    ip?: string;
    userAgent?: string;
    success: boolean;
    details?: any;
  }): void {
    this.logs.push({
      timestamp: Date.now(),
      ...entry
    });

    // Keep only last 1000 logs in memory
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }

    // In production, send to secure logging service
    if (process.env.NODE_ENV === 'production') {
      this.sendToSecureLogging(entry);
    }
  }

  getLogs(userId?: string): typeof this.logs {
    if (userId) {
      return this.logs.filter(log => log.userId === userId);
    }
    return [...this.logs];
  }

  private sendToSecureLogging(entry: any): void {
    // Implementation would send to secure logging service
    console.log('Audit log:', entry);
  }
}

// Content Security Policy
export const CSP_HEADER = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.intellx.co.tz wss://api.intellx.co.tz;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`.replace(/\s+/g, ' ').trim();

// Security headers
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Content-Security-Policy': CSP_HEADER,
};

// API request validation
export const validateApiRequest = (request: {
  method: string;
  headers: Record<string, string>;
  body?: any;
  sessionId?: string;
  csrfToken?: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate session
  if (request.sessionId) {
    const sessionManager = SessionManager.getInstance();
    const sessionValidation = sessionManager.validateSession(request.sessionId);
    
    if (!sessionValidation.isValid) {
      errors.push('Invalid or expired session');
    }

    // Validate CSRF token for state-changing operations
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method.toUpperCase())) {
      if (!request.csrfToken || request.csrfToken !== sessionValidation.csrfToken) {
        errors.push('Invalid CSRF token');
      }
    }
  }

  // Validate content type for POST/PUT requests
  if (['POST', 'PUT', 'PATCH'].includes(request.method.toUpperCase())) {
    const contentType = request.headers['content-type'] || request.headers['Content-Type'];
    if (!contentType || !contentType.includes('application/json')) {
      errors.push('Invalid content type');
    }
  }

  // Validate request size
  if (request.body && JSON.stringify(request.body).length > 1024 * 1024) { // 1MB limit
    errors.push('Request body too large');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Export security utilities
export const security = {
  sanitizeInput,
  sanitizeSQLInput,
  escapeHtml,
  generateCSRFToken,
  encryptData,
  decryptData,
  validatePasswordStrength,
  rateLimiter,
  SessionManager,
  AuditLogger,
  validateApiRequest,
  SECURITY_HEADERS,
  CSP_HEADER,
};