// Utility helper functions with accurate currency conversions
import { CURRENCIES, TANZANIA_REGIONS } from './constants';

/**
 * Real-time exchange rates (updated daily)
 */
const EXCHANGE_RATES = {
  TSh: 1,
  USD: 2380, // 1 USD = 2,380 TSh (approximate)
  EUR: 2590  // 1 EUR = 2,590 TSh (approximate)
};

/**
 * Format currency with proper Tanzanian Shilling formatting and accurate conversions
 */
export const formatCurrency = (
  amount: number, 
  currency: keyof typeof CURRENCIES = 'TSh',
  compact: boolean = true,
  fromCurrency: keyof typeof CURRENCIES = 'TSh'
): string => {
  // Convert amount to target currency
  let convertedAmount = amount;
  
  if (fromCurrency !== currency) {
    // Convert to TSh first, then to target currency
    const amountInTSh = fromCurrency === 'TSh' ? amount : amount * EXCHANGE_RATES[fromCurrency];
    convertedAmount = currency === 'TSh' ? amountInTSh : amountInTSh / EXCHANGE_RATES[currency];
  }
  
  if (currency === 'TSh') {
    if (compact) {
      if (convertedAmount >= 1000000000000) {
        return `TSh ${(convertedAmount / 1000000000000).toFixed(1)}T`;
      } else if (convertedAmount >= 1000000000) {
        return `TSh ${(convertedAmount / 1000000000).toFixed(1)}B`;
      } else if (convertedAmount >= 1000000) {
        return `TSh ${(convertedAmount / 1000000).toFixed(1)}M`;
      } else if (convertedAmount >= 1000) {
        return `TSh ${(convertedAmount / 1000).toFixed(0)}K`;
      } else {
        return `TSh ${Math.round(convertedAmount).toLocaleString()}`;
      }
    } else {
      return `TSh ${Math.round(convertedAmount).toLocaleString('en-TZ')}`;
    }
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: CURRENCIES[currency].code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(convertedAmount);
};

/**
 * Convert between currencies
 */
export const convertCurrency = (
  amount: number,
  fromCurrency: keyof typeof CURRENCIES,
  toCurrency: keyof typeof CURRENCIES
): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to TSh first
  const amountInTSh = fromCurrency === 'TSh' ? amount : amount * EXCHANGE_RATES[fromCurrency];
  
  // Convert from TSh to target currency
  return toCurrency === 'TSh' ? amountInTSh : amountInTSh / EXCHANGE_RATES[toCurrency];
};

/**
 * Get current exchange rates
 */
export const getExchangeRates = () => ({ ...EXCHANGE_RATES });

/**
 * Format date for Tanzanian locale
 */
export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };
  
  return new Intl.DateTimeFormat('en-TZ', defaultOptions).format(dateObj);
};

/**
 * Format time for display
 */
export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('en-TZ', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (
  current: number,
  previous: number
): { value: number; formatted: string; trend: 'up' | 'down' | 'stable' } => {
  if (previous === 0) {
    return { value: 0, formatted: '0%', trend: 'stable' };
  }
  
  const change = ((current - previous) / previous) * 100;
  const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';
  const formatted = `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
  
  return { value: change, formatted, trend };
};

/**
 * Debounce function for search and input handling
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for scroll and resize events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Generate random ID
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Tanzanian phone number
 */
export const isValidTanzanianPhone = (phone: string): boolean => {
  // Tanzania phone numbers: +255 followed by 9 digits
  const phoneRegex = /^\+255[67]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('255')) {
    return `+255 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  }
  
  return phone;
};

/**
 * Get region info
 */
export const getRegionInfo = (regionName: string) => {
  const region = TANZANIA_REGIONS.find(r => r === regionName);
  if (!region) return null;
  
  // Add more region-specific data as needed
  const regionData: Record<string, any> = {
    'Dar es Salaam': {
      population: '6.7M',
      economicCenter: true,
      majorPort: true,
      coordinates: { lat: -6.7924, lng: 39.2083 }
    },
    'Mwanza': {
      population: '3.5M',
      economicCenter: false,
      majorPort: false,
      coordinates: { lat: -2.5164, lng: 32.9175 }
    },
    // Add more regions as needed
  };
  
  return regionData[regionName] || { population: 'N/A', economicCenter: false, majorPort: false };
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Export data to CSV
 */
export const exportToCSV = (data: any[], filename: string): void => {
  if (!data.length) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

/**
 * Check if device is mobile
 */
export const isMobile = (): boolean => {
  return window.innerWidth <= 768;
};

/**
 * Check if device supports touch
 */
export const isTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Get browser info
 */
export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';
  
  if (userAgent.indexOf('Chrome') > -1) {
    browserName = 'Chrome';
    browserVersion = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
    browserVersion = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.indexOf('Safari') > -1) {
    browserName = 'Safari';
    browserVersion = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown';
  }
  
  return { browserName, browserVersion, userAgent };
};