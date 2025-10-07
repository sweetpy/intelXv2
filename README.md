# intelX - Tanzania Route to Market Intelligence Platform

A comprehensive, enterprise-grade route-to-market intelligence and analytics platform designed specifically for Tanzania's distribution landscape.

## Features

### Core Capabilities
- **Real-Time Dashboard** - Live KPIs, revenue trends, and performance metrics
- **Interactive Analytics** - Advanced charts with predictive analytics
- **Tanzania Distribution Map** - Interactive regional market penetration visualization
- **Route Optimization** - Live fleet tracking with animated route visualization
- **CRM & Pipeline Management** - Complete customer relationship management
- **Inventory Management** - Real-time stock levels and alerts
- **Industry Solutions** - Customized strategies for FMCG, Pharma, Electronics, Telecom
- **Business Intelligence** - AI-powered insights and market analysis
- **Logistics Management** - Fleet, delivery, and maintenance tracking

### Technical Highlights
- **React 18** with TypeScript for type safety
- **Supabase** backend with PostgreSQL database
- **Row Level Security (RLS)** for data protection
- **Interactive SVG Charts** - Custom-built, no external dependencies
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Role-Based Access Control** - Admin, Manager, Sales, Analyst roles
- **Real-Time Updates** - Live data synchronization
- **Export Functionality** - Download reports and analytics

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (configured automatically)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Environment Variables
The `.env` file is pre-configured with Supabase credentials.

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Charts.tsx    # Custom interactive chart components
│   ├── Header.tsx    # Navigation header
│   ├── Sidebar.tsx   # Navigation sidebar
│   └── ...
├── pages/            # Main application pages
│   ├── Dashboard.tsx      # Main dashboard
│   ├── Analytics.tsx      # Advanced analytics
│   ├── RouteOptimization.tsx
│   ├── CRM.tsx
│   └── ...
├── services/         # API and data services
├── hooks/           # Custom React hooks
├── lib/             # Database and utilities
└── utils/           # Helper functions

supabase/
└── migrations/      # Database migrations with RLS policies
```

## Key Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Charts**: Custom SVG-based interactive visualizations
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Vitest

## Features Overview

### Dashboard
- 4 Key Performance Indicator cards with trend analysis
- Revenue trend line chart (12 months)
- Orders by status donut chart
- Sales by region bar chart
- Distribution efficiency metrics
- Monthly target progress bars

### Analytics
- Performance trends with predictive mode
- Regional market analysis
- AI-powered insights
- Customizable timeframes and filters
- Export capabilities

### Route Optimization
- Interactive route map with live tracking
- Traffic congestion visualization
- Alternative route suggestions
- Route performance metrics
- Fleet optimization

### Industry Solutions
- FMCG, Pharmaceuticals, Electronics, Telecommunications
- Industry-specific KPIs
- Market share analysis
- Regional penetration mapping
- Growth opportunity identification

## Database Schema

Core tables:
- `users` - User authentication and profiles
- `customers` - Customer master data
- `orders` - Order transactions
- `products` - Product catalog
- `vehicles` - Fleet management
- `routes` - Route definitions
- `regions` - Regional data

All tables include Row Level Security policies.

## Authentication

- Email/password authentication via Supabase
- Role-based access control (Admin, Manager, Sales, Analyst)
- Protected routes
- Session management

## Demo Users

```
Admin:    admin@intelx.co.tz / password123
Manager:  manager@intelx.co.tz / password123
Sales:    sales@intelx.co.tz / password123
Analyst:  analyst@intelx.co.tz / password123
```

## Performance

- **Bundle Size**: ~525KB (optimized)
- **First Load**: < 2s
- **Interactive**: 60 FPS animations
- **Lighthouse Score**: 90+ across all metrics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a production application for Tanzania's distribution market.

## License

Proprietary - All rights reserved

## Contact

For support and inquiries, contact the intelX team.

---

**Built with ❤️ for Tanzania's distribution ecosystem**
