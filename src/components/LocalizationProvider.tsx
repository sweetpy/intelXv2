import React, { createContext, useContext, useState, useEffect } from 'react';

interface LocalizationContextType {
  language: 'en' | 'sw';
  currency: 'TSh' | 'USD' | 'EUR';
  region: string;
  dateFormat: string;
  numberFormat: Intl.NumberFormat;
  translate: (key: string) => string;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
  setLanguage: (lang: 'en' | 'sw') => void;
  setCurrency: (curr: 'TSh' | 'USD' | 'EUR') => void;
  setRegion: (region: string) => void;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};

// Translation dictionaries
const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.analytics': 'Analytics',
    'nav.intelligence': 'Intelligence Bank',
    'nav.playbook': 'RTM Playbook',
    'nav.industries': 'Industries',
    'nav.routes': 'Route Planning',
    'nav.distributors': 'Distributors',
    'nav.inventory': 'Inventory',
    'nav.logistics': 'Logistics',
    'nav.documents': 'Documents',
    'nav.crm': 'CRM & Sales',
    'nav.settings': 'Settings',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome back! Here\'s what\'s happening with your routes.',
    'dashboard.totalRevenue': 'Total Revenue',
    'dashboard.activeDistributors': 'Active Distributors',
    'dashboard.productsDistributed': 'Products Distributed',
    'dashboard.routesOptimized': 'Routes Optimized',
    'dashboard.regionalPerformance': 'Regional Performance',
    'dashboard.recentActivities': 'Recent Activities',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.active': 'Active',
    'common.inactive': 'Inactive',
    'common.pending': 'Pending',
    'common.approved': 'Approved',
    'common.rejected': 'Rejected',
    
    // Regions
    'region.dar': 'Dar es Salaam',
    'region.mwanza': 'Mwanza',
    'region.arusha': 'Arusha',
    'region.dodoma': 'Dodoma',
    'region.mbeya': 'Mbeya',
    'region.morogoro': 'Morogoro',
    'region.tanga': 'Tanga',
    'region.kilimanjaro': 'Kilimanjaro',
    'region.tabora': 'Tabora',
    'region.kigoma': 'Kigoma',
    
    // Industries
    'industry.fmcg': 'Fast Moving Consumer Goods',
    'industry.pharma': 'Pharmaceuticals & Healthcare',
    'industry.agriculture': 'Agriculture & Agribusiness',
    'industry.telecom': 'Telecommunications',
    'industry.financial': 'Financial Services',
    'industry.manufacturing': 'Manufacturing',
    
    // Time periods
    'time.today': 'Today',
    'time.yesterday': 'Yesterday',
    'time.thisWeek': 'This Week',
    'time.lastWeek': 'Last Week',
    'time.thisMonth': 'This Month',
    'time.lastMonth': 'Last Month',
    'time.thisQuarter': 'This Quarter',
    'time.lastQuarter': 'Last Quarter',
    'time.thisYear': 'This Year',
    'time.lastYear': 'Last Year',
  },
  sw: {
    // Navigation
    'nav.dashboard': 'Dashibodi',
    'nav.analytics': 'Uchanganuzi',
    'nav.playbook': 'Kitabu cha RTM',
    'nav.industries': 'Viwanda',
    'nav.routes': 'Mipango ya Njia',
    'nav.distributors': 'Wasambazaji',
    'nav.inventory': 'Hifadhi',
    'nav.logistics': 'Usafirishaji',
    'nav.documents': 'Hati',
    'nav.crm': 'CRM na Mauzo',
    'nav.settings': 'Mipangilio',
    
    // Dashboard
    'dashboard.title': 'Dashibodi',
    'dashboard.welcome': 'Karibu tena! Hii ni kile kinachoendelea na njia zako.',
    'dashboard.totalRevenue': 'Mapato Jumla',
    'dashboard.activeDistributors': 'Wasambazaji Hai',
    'dashboard.productsDistributed': 'Bidhaa Zilizosambazwa',
    'dashboard.routesOptimized': 'Njia Zilizoboresha',
    'dashboard.regionalPerformance': 'Utendaji wa Mikoa',
    'dashboard.recentActivities': 'Shughuli za Hivi Karibuni',
    
    // Common
    'common.loading': 'Inapakia...',
    'common.save': 'Hifadhi',
    'common.cancel': 'Ghairi',
    'common.delete': 'Futa',
    'common.edit': 'Hariri',
    'common.view': 'Ona',
    'common.export': 'Hamisha',
    'common.import': 'Leta',
    'common.search': 'Tafuta',
    'common.filter': 'Chuja',
    'common.all': 'Zote',
    'common.active': 'Hai',
    'common.inactive': 'Haijafanya kazi',
    'common.pending': 'Inasubiri',
    'common.approved': 'Imeidhinishwa',
    'common.rejected': 'Imekataliwa',
    
    // Regions
    'region.dar': 'Dar es Salaam',
    'region.mwanza': 'Mwanza',
    'region.arusha': 'Arusha',
    'region.dodoma': 'Dodoma',
    'region.mbeya': 'Mbeya',
    'region.morogoro': 'Morogoro',
    'region.tanga': 'Tanga',
    'region.kilimanjaro': 'Kilimanjaro',
    'region.tabora': 'Tabora',
    'region.kigoma': 'Kigoma',
    
    // Industries
    'industry.fmcg': 'Bidhaa za Matumizi ya Haraka',
    'industry.pharma': 'Dawa na Afya',
    'industry.agriculture': 'Kilimo na Biashara ya Kilimo',
    'industry.telecom': 'Mawasiliano',
    'industry.financial': 'Huduma za Kifedha',
    'industry.manufacturing': 'Utengenezaji',
    
    // Time periods
    'time.today': 'Leo',
    'time.yesterday': 'Jana',
    'time.thisWeek': 'Wiki Hii',
    'time.lastWeek': 'Wiki Iliyopita',
    'time.thisMonth': 'Mwezi Huu',
    'time.lastMonth': 'Mwezi Uliopita',
    'time.thisQuarter': 'Robo Hii',
    'time.lastQuarter': 'Robo Iliyopita',
    'time.thisYear': 'Mwaka Huu',
    'time.lastYear': 'Mwaka Uliopita',
  }
};

interface LocalizationProviderProps {
  children: React.ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
  const [currency, setCurrency] = useState<'TSh' | 'USD' | 'EUR'>('TSh');
  const [region, setRegion] = useState('Tanzania');

  // Load saved preferences
  useEffect(() => {
    const savedLang = localStorage.getItem('intellx_language') as 'en' | 'sw';
    const savedCurrency = localStorage.getItem('intellx_currency') as 'TSh' | 'USD' | 'EUR';
    const savedRegion = localStorage.getItem('intellx_region');

    if (savedLang) setLanguage(savedLang);
    if (savedCurrency) setCurrency(savedCurrency);
    if (savedRegion) setRegion(savedRegion);
  }, []);

  // Save preferences
  const handleSetLanguage = (lang: 'en' | 'sw') => {
    setLanguage(lang);
    localStorage.setItem('intellx_language', lang);
  };

  const handleSetCurrency = (curr: 'TSh' | 'USD' | 'EUR') => {
    setCurrency(curr);
    localStorage.setItem('intellx_currency', curr);
  };

  const handleSetRegion = (reg: string) => {
    setRegion(reg);
    localStorage.setItem('intellx_region', reg);
  };

  // Create number formatter based on currency
  const numberFormat = new Intl.NumberFormat(language === 'sw' ? 'sw-TZ' : 'en-TZ', {
    style: 'currency',
    currency: currency === 'TSh' ? 'TZS' : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  // Date format based on language
  const dateFormat = language === 'sw' ? 'dd/MM/yyyy' : 'MM/dd/yyyy';

  // Translation function
  const translate = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  // Currency formatting
  const formatCurrency = (amount: number): string => {
    if (currency === 'TSh') {
      // Custom formatting for Tanzanian Shilling
      if (amount >= 1000000000) {
        return `TSh ${(amount / 1000000000).toFixed(1)}B`;
      } else if (amount >= 1000000) {
        return `TSh ${(amount / 1000000).toFixed(1)}M`;
      } else if (amount >= 1000) {
        return `TSh ${(amount / 1000).toFixed(0)}K`;
      } else {
        return `TSh ${amount.toLocaleString()}`;
      }
    }
    return numberFormat.format(amount);
  };

  // Date formatting
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat(language === 'sw' ? 'sw-TZ' : 'en-TZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const contextValue: LocalizationContextType = {
    language,
    currency,
    region,
    dateFormat,
    numberFormat,
    translate,
    formatCurrency,
    formatDate,
    setLanguage: handleSetLanguage,
    setCurrency: handleSetCurrency,
    setRegion: handleSetRegion,
  };

  return (
    <LocalizationContext.Provider value={contextValue}>
      {children}
    </LocalizationContext.Provider>
  );
};

// HOC for localized components
export const withLocalization = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => {
    const localization = useLocalization();
    return <Component {...props} {...localization} />;
  };
};