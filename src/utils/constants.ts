// Application constants and configuration
export const APP_CONFIG = {
  name: 'intelX',
  version: '1.0.0',
  description: 'Tanzania Route to Market Intelligence Platform',
  author: 'intelX Team',
  supportEmail: 'support@intellx.co.tz',
  website: 'https://intellx.co.tz',
} as const;

export const TANZANIA_REGIONS = [
  'Dar es Salaam',
  'Mwanza',
  'Arusha',
  'Dodoma',
  'Mbeya',
  'Morogoro',
  'Tanga',
  'Kilimanjaro',
  'Tabora',
  'Kigoma',
  'Shinyanga',
  'Kagera',
  'Mtwara',
  'Ruvuma',
  'Iringa',
  'Lindi',
  'Singida',
  'Rukwa',
  'Katavi',
  'Njombe',
  'Simiyu',
  'Geita',
  'Songwe',
  'Manyara',
  'Pemba',
  'Unguja'
] as const;

export const INDUSTRIES = [
  'FMCG',
  'Pharmaceuticals',
  'Agriculture',
  'Electronics',
  'Telecommunications',
  'Financial Services',
  'Manufacturing',
  'Automotive',
  'Construction',
  'Energy'
] as const;

export const CURRENCIES = {
  TSh: {
    symbol: 'TSh',
    name: 'Tanzanian Shilling',
    code: 'TZS'
  },
  USD: {
    symbol: '$',
    name: 'US Dollar',
    code: 'USD'
  },
  EUR: {
    symbol: '€',
    name: 'Euro',
    code: 'EUR'
  }
} as const;

export const LANGUAGES = {
  en: {
    name: 'English',
    flag: '🇬🇧',
    code: 'en'
  },
  sw: {
    name: 'Kiswahili',
    flag: '🇹🇿',
    code: 'sw'
  }
} as const;

export const API_ENDPOINTS = {
  auth: '/api/auth',
  users: '/api/users',
  analytics: '/api/analytics',
  distributors: '/api/distributors',
  routes: '/api/routes',
  inventory: '/api/inventory',
  reports: '/api/reports'
} as const;

export const LOCAL_STORAGE_KEYS = {
  session: 'intellx_session',
  user: 'intellx_user',
  language: 'intellx_language',
  currency: 'intellx_currency',
  region: 'intellx_region',
  lastPage: 'intellx_last_page',
  lockout: 'intellx_lockout'
} as const;

export const CHART_COLORS = {
  primary: '#10b981',
  secondary: '#3b82f6',
  accent: '#8b5cf6',
  success: '#059669',
  warning: '#d97706',
  error: '#dc2626',
  gray: '#6b7280'
} as const;

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;