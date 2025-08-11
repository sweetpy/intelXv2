export interface PredictiveModel {
  id: string;
  name: string;
  accuracy: number;
  prediction: string;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  impact: 'high' | 'medium' | 'low';
}

export interface MarketIntelligence {
  competitor: string;
  marketShare: number;
  recentActivity: string;
  threat: 'high' | 'medium' | 'low';
  recommendation: string;
}

export const PREDICTIVE_MODELS: PredictiveModel[] = [
  {
    id: 'demand-forecast',
    name: 'Demand Forecasting',
    accuracy: 94.2,
    prediction: '25% increase in FMCG demand for Q2 2024',
    confidence: 89,
    trend: 'up',
    impact: 'high'
  },
  {
    id: 'price-optimization',
    name: 'Price Optimization',
    accuracy: 87.5,
    prediction: '12% margin improvement with dynamic pricing',
    confidence: 82,
    trend: 'up',
    impact: 'medium'
  },
  {
    id: 'churn-prediction',
    name: 'Customer Churn',
    accuracy: 91.8,
    prediction: '15 distributors at risk in next 30 days',
    confidence: 76,
    trend: 'down',
    impact: 'high'
  },
  {
    id: 'market-expansion',
    name: 'Market Expansion',
    accuracy: 88.3,
    prediction: 'Mbeya region shows 32% growth potential',
    confidence: 85,
    trend: 'up',
    impact: 'high'
  }
];

export const MARKET_INTELLIGENCE: MarketIntelligence[] = [
  {
    competitor: 'Competitor A',
    marketShare: 28.5,
    recentActivity: 'Launched new product line in Dar es Salaam',
    threat: 'high',
    recommendation: 'Deploy counter-strategy within 48 hours'
  },
  {
    competitor: 'Competitor B',
    marketShare: 22.1,
    recentActivity: 'Expanded distribution network in Mwanza',
    threat: 'medium',
    recommendation: 'Monitor closely and strengthen partnerships'
  },
  {
    competitor: 'Competitor C',
    marketShare: 18.7,
    recentActivity: 'Price reduction campaign in Arusha',
    threat: 'medium',
    recommendation: 'Consider promotional response'
  }
];

export const ANALYSIS_TIMEOUT_MS = parseInt(
  (import.meta as any)?.env?.VITE_ANALYSIS_TIMEOUT_MS ?? '3000',
  10
);
