// Error handling utilities
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const ERROR_CODES = {
  // Authentication errors
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_SESSION_EXPIRED: 'AUTH_SESSION_EXPIRED',
  AUTH_INSUFFICIENT_PERMISSIONS: 'AUTH_INSUFFICIENT_PERMISSIONS',
  AUTH_ACCOUNT_LOCKED: 'AUTH_ACCOUNT_LOCKED',
  
  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  NETWORK_TIMEOUT: 'NETWORK_TIMEOUT',
  NETWORK_OFFLINE: 'NETWORK_OFFLINE',
  
  // Data errors
  DATA_NOT_FOUND: 'DATA_NOT_FOUND',
  DATA_VALIDATION_ERROR: 'DATA_VALIDATION_ERROR',
  DATA_CORRUPTION: 'DATA_CORRUPTION',
  
  // System errors
  SYSTEM_ERROR: 'SYSTEM_ERROR',
  SYSTEM_MAINTENANCE: 'SYSTEM_MAINTENANCE',
  SYSTEM_OVERLOAD: 'SYSTEM_OVERLOAD',
} as const;

export const ERROR_MESSAGES = {
  [ERROR_CODES.AUTH_INVALID_CREDENTIALS]: 'Invalid email or password. Please try again.',
  [ERROR_CODES.AUTH_SESSION_EXPIRED]: 'Your session has expired. Please log in again.',
  [ERROR_CODES.AUTH_INSUFFICIENT_PERMISSIONS]: 'You do not have permission to perform this action.',
  [ERROR_CODES.AUTH_ACCOUNT_LOCKED]: 'Your account has been temporarily locked. Please try again later.',
  
  [ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your connection and try again.',
  [ERROR_CODES.NETWORK_TIMEOUT]: 'Request timed out. Please try again.',
  [ERROR_CODES.NETWORK_OFFLINE]: 'You are currently offline. Please check your connection.',
  
  [ERROR_CODES.DATA_NOT_FOUND]: 'The requested data could not be found.',
  [ERROR_CODES.DATA_VALIDATION_ERROR]: 'Please check your input and try again.',
  [ERROR_CODES.DATA_CORRUPTION]: 'Data corruption detected. Please refresh and try again.',
  
  [ERROR_CODES.SYSTEM_ERROR]: 'A system error occurred. Please try again later.',
  [ERROR_CODES.SYSTEM_MAINTENANCE]: 'System is under maintenance. Please try again later.',
  [ERROR_CODES.SYSTEM_OVERLOAD]: 'System is currently overloaded. Please try again later.',
} as const;

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorQueue: AppError[] = [];

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  handle(error: Error | AppError): void {
    console.error('Error handled:', error);

    if (error instanceof AppError) {
      this.handleAppError(error);
    } else {
      this.handleGenericError(error);
    }
  }

  private handleAppError(error: AppError): void {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${error.code}] ${error.message}`, error);
    }

    // Add to error queue for potential retry
    if (error.isOperational) {
      this.errorQueue.push(error);
    }

    // Show user-friendly message
    this.showErrorToUser(error);

    // Report to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error);
    }
  }

  private handleGenericError(error: Error): void {
    const appError = new AppError(
      'An unexpected error occurred',
      ERROR_CODES.SYSTEM_ERROR,
      500,
      false
    );

    this.handleAppError(appError);
  }

  private showErrorToUser(error: AppError): void {
    // In a real app, this would show a toast notification or modal
    const message = ERROR_MESSAGES[error.code as keyof typeof ERROR_MESSAGES] || error.message;
    
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-float';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 5000);
  }

  private reportError(error: AppError): void {
    // In production, send to error tracking service like Sentry
    console.log('Reporting error to tracking service:', error);
  }

  getErrorQueue(): AppError[] {
    return [...this.errorQueue];
  }

  clearErrorQueue(): void {
    this.errorQueue = [];
  }

  retry(error: AppError, retryFunction: () => Promise<any>): Promise<any> {
    return retryFunction().catch((retryError) => {
      this.handle(retryError);
      throw retryError;
    });
  }
}

// Global error handler
export const setupGlobalErrorHandling = (): void => {
  const errorHandler = ErrorHandler.getInstance();

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    errorHandler.handle(new AppError(
      event.reason?.message || 'Unhandled promise rejection',
      ERROR_CODES.SYSTEM_ERROR
    ));
  });

  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    errorHandler.handle(new AppError(
      event.error?.message || event.message || 'Uncaught error',
      ERROR_CODES.SYSTEM_ERROR
    ));
  });

  // Handle network errors
  window.addEventListener('offline', () => {
    errorHandler.handle(new AppError(
      'You are now offline',
      ERROR_CODES.NETWORK_OFFLINE,
      0,
      true
    ));
  });

  window.addEventListener('online', () => {
    // Clear network-related errors when back online
    const errorQueue = errorHandler.getErrorQueue();
    const networkErrors = errorQueue.filter(error => 
      error.code === ERROR_CODES.NETWORK_OFFLINE ||
      error.code === ERROR_CODES.NETWORK_ERROR
    );
    
    if (networkErrors.length > 0) {
      console.log('Back online, clearing network errors');
      errorHandler.clearErrorQueue();
    }
  });
};

// Utility functions for common error scenarios
export const createAuthError = (message: string): AppError => {
  return new AppError(message, ERROR_CODES.AUTH_INVALID_CREDENTIALS, 401);
};

export const createNetworkError = (message: string): AppError => {
  return new AppError(message, ERROR_CODES.NETWORK_ERROR, 0);
};

export const createValidationError = (message: string): AppError => {
  return new AppError(message, ERROR_CODES.DATA_VALIDATION_ERROR, 400);
};

export const createNotFoundError = (message: string): AppError => {
  return new AppError(message, ERROR_CODES.DATA_NOT_FOUND, 404);
};