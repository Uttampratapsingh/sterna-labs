# 🚀 Token Trading Dashboard

> A production-grade, real-time cryptocurrency token tracking platform built with cutting-edge frontend engineering practices

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://sterna-labs.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

A high-performance, enterprise-grade cryptocurrency token tracking dashboard engineered with modern web technologies and best practices. This application provides real-time monitoring of token pairs across different lifecycle stages with advanced filtering, sorting, and live data updates.

**Live Demo:** [https://sterna-labs.vercel.app](https://sterna-labs.vercel.app)

## 📸 Screenshots

### Desktop View
![Desktop Dashboard](./docs/images/desktop-view.png)
*Dashboard view showing all three token columns with filtering options.*

### Mobile View
<div style="display: flex; gap: 10px;">
  <img src="./docs/images/mobile-view-1.png" alt="Mobile List" width="300" />
  <img src="./docs/images/mobile-view-2.png" alt="Mobile Menu" width="300" />
</div>
*Responsive mobile layout optimized for smaller screens.*


---

## 🎯 Key Highlights

- ⚡️ **Sub-second Performance** - Optimized with React.memo, lazy loading, and virtual scrolling
- ♿️ **WCAG 2.1 Compliant** - Full keyboard navigation, ARIA labels, and screen reader support
- 📱 **Responsive Design** - Seamless experience across desktop, tablet, and mobile
- 🎨 **Atomic Design System** - Reusable components following industry best practices
- 🔄 **Real-time Updates** - WebSocket simulation with 800ms update intervals
- 🏗️ **Scalable Architecture** - Feature-based structure with clear separation of concerns
- 🎭 **Error Resilient** - Comprehensive error boundaries and graceful fallbacks
- 📊 **Live Data Simulation** - Real-time price tracking with cumulative volatility

---

## 🛠️ Tech Stack

### Core Framework
- **[Vite 5.4](https://vitejs.dev/)** - Lightning-fast build tool with HMR
- **[React 18](https://react.dev/)** - UI library with concurrent features
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe development with strict mode

### State Management
- **[Redux Toolkit 2.11](https://redux-toolkit.js.org/)** - Predictable state container
- **[React Redux 9.2](https://react-redux.js.org/)** - Official React bindings
- **[TanStack Query 5.83](https://tanstack.com/query/latest)** - Powerful async state management

### UI & Styling
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icon set
- **[class-variance-authority](https://cva.style/)** - Component variant styling

### Routing & Navigation
- **[React Router 6.30](https://reactrouter.com/)** - Declarative routing with lazy loading

### Developer Experience
- **ESLint** - Code quality and consistency
- **TypeScript Strict Mode** - Maximum type safety
- **Git Hooks** - Pre-commit validation (ready to configure)

---

## ✨ Features

### 🎪 Multi-Column Dashboard
- **New Pairs** - Recently listed tokens with age tracking
- **Final Stretch** - Tokens gaining momentum and volume
- **Migrated** - Established tokens with proven track records
- **Real-time Sync** - Live price updates across all columns

### 🔍 Advanced Filtering & Sorting
- **Search** - Multi-keyword comma-separated search
- **Protocol Filter** - Filter by Pump, Mayhem, Moonshot, Daos.fun, Jupiter
- **Market Cap Range** - Min/max filtering with smart parsing
- **Dynamic Sort** - MC, Age, Volume, Change (1h/5m/6h)
- **Single-Click Sort** - Instant response with toggle direction

### 🎨 Interactive UI/UX
- **Hover Cards** - Detailed metrics on hover
- **Live Indicators** - Color-coded price changes
- **Protocol Badges** - Visual protocol identification
- **Smooth Animations** - CSS transitions for state changes
- **Loading States** - Skeleton screens during data fetch
- **Empty States** - User-friendly messages

### ⚡️ Performance Optimizations
- **Code Splitting** - Route-based lazy loading
- **Component Memoization** - React.memo on all cards
- **Virtual Scrolling** - CSS content-visibility
- **Optimized Selectors** - Redux state slicing
- **Image Lazy Loading** - Progressive image rendering
- **Debounced Inputs** - Reduced re-render overhead

### ♿️ Accessibility (WCAG 2.1 AA)
- **Semantic HTML** - Proper HTML5 elements
- **ARIA Labels** - Comprehensive screen reader support
- **Keyboard Navigation** - Full keyboard operability
- **Focus Management** - Visible focus indicators
- **Color Contrast** - WCAG AA compliant
- **Status Announcements** - Live region updates

---

## 🏗️ Frontend Engineering Principles

### Architecture Patterns
```
┌─────────────────────────────────────────┐
│         Atomic Design System            │
├─────────────────────────────────────────┤
│  Atoms → Molecules → Organisms → Pages  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│      Feature-Based Structure            │
├─────────────────────────────────────────┤
│  Shared → Features → Pages → App        │
└─────────────────────────────────────────┘
```

### Design Principles Applied
1. **SOLID Principles**
   - Single Responsibility (each component does one thing)
   - Open/Closed (extensible via props, closed for modification)
   - Dependency Inversion (depend on abstractions, not concretions)

2. **DRY (Don't Repeat Yourself)**
   - Reusable atomic components
   - Centralized utilities and constants
   - Custom hooks for shared logic

3. **Separation of Concerns**
   - Business logic in hooks
   - UI in components
   - State in Redux
   - Services layer for external APIs

4. **Performance First**
   - Memoization strategies
   - Lazy loading and code splitting
   - Optimistic UI updates
   - Virtual scrolling for large lists

---

## 📂 Project Structure

```
token-trading-app/
├── src/
│   ├── components/           # UI Components
│   │   ├── shared/          # Atomic reusable components
│   │   │   ├── ProtocolBadge.tsx
│   │   │   ├── ChangeIndicator.tsx
│   │   │   ├── PriceDisplay.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── TokenImage.tsx
│   │   │   └── index.ts
│   │   ├── ui/              # shadcn/ui primitives
│   │   ├── TokenCard.tsx    # Token display molecule
│   │   ├── TokenColumn.tsx  # Column organism
│   │   ├── ColumnFilters.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── ...
│   ├── hooks/               # Custom React Hooks
│   │   ├── useTokenFilter.ts      # Filter & sort logic
│   │   ├── useCopyToClipboard.ts  # Clipboard operations
│   │   ├── useDocumentVisibility.ts # Tab visibility
│   │   └── use-mobile.tsx         # Responsive breakpoints
│   ├── store/               # Redux State
│   │   ├── index.ts         # Store configuration
│   │   └── marketSlice.ts   # Market data slice
│   ├── services/            # External Services
│   │   └── mockWebSocket.ts # Real-time data simulation
│   ├── utils/               # Utilities
│   │   ├── formatters.ts    # Format functions
│   │   └── index.ts         # Re-exports
│   ├── constants/           # App Constants
│   │   └── index.ts         # Config, colors, labels
│   ├── lib/                 # Core Library
│   │   ├── types.ts         # TypeScript types
│   │   ├── utils.ts         # Helper functions
│   │   └── mockData.ts      # Mock data generator
│   ├── pages/               # Route Pages
│   │   ├── Index.tsx        # Home page
│   │   └── NotFound.tsx     # 404 page
│   ├── App.tsx              # App entry point
│   └── main.tsx             # React DOM root
├── public/                  # Static assets
├── docs/                    # Documentation
├── ARCHITECTURE.md          # Architecture deep-dive
├── PROJECT_SUMMARY.md       # Refactoring summary
└── README.md               # This file
```

---

## 🎯 Component Architecture

### Atomic Components (Shared)
```typescript
// ProtocolBadge - Color-coded protocol display
<ProtocolBadge protocol="Pump" />

// ChangeIndicator - Dynamic percentage changes
<ChangeIndicator value={5.2} label="1h" />

// PriceDisplay - Consistent price formatting
<PriceDisplay price="$0.0024" label="Price" size="md" />

// IconButton - Reusable button with tooltip
<IconButton 
  icon={<Copy />}
  tooltip="Copy address"
  ariaLabel="Copy token address"
/>

// TokenImage - Smart image with fallback
<TokenImage src={url} alt={name} size="md" />
```

### State Management Flow
```
User Action → Dispatch → Reducer → Store Update → Selector → Component Re-render
     ↓                                    ↓
  WebSocket → Market Slice → Prices → TokenCard (Memoized)
```

---

## 🔄 Workflow & User Journey

### 1. Initial Load
```mermaid
App Load → Error Boundary → Redux Provider → Query Client → Routes → Index
                                                                        ↓
                                              WebSocket Connection ← Connect
                                                                        ↓
                                              Fetch Mock Data → Render Columns
```

### 2. Real-time Updates
- WebSocket emits price updates every 800ms
- Redux updates market prices with cumulative changes
- React components re-render via useSelector
- Memoized components prevent unnecessary updates

### 3. User Interactions
1. **Filter Tokens** → Opens popover → Updates state → useMemo recalculates → List updates
2. **Sort Columns** → Click button → handleSort → Update sortBy/direction → Re-render
3. **Copy Address** → Click icon → useCopyToClipboard → Write to clipboard → Show feedback

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.x or higher
- **npm** 9.x or **yarn** 1.22.x

### Installation

```bash
# Clone the repository
git clone https://github.com/Uttampratapsingh/sterna-labs.git
cd token-trading-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables (Optional)
```env
# Create .env file
VITE_API_URL=https://api.example.com
VITE_WS_URL=wss://ws.example.com
```

---

## 📊 Performance Metrics

### Bundle Analysis
| Asset | Size | Gzipped |
|-------|------|---------|
| index.js | 338.07 KB | 109.91 KB |
| Index chunk | 84.14 KB | 23.67 KB |
| CSS | 27.07 KB | 5.85 KB |

### Lighthouse Score (Target)
- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

---

## 🧪 Code Quality

### Type Safety
- TypeScript strict mode enabled
- Comprehensive interface definitions
- No `any` types in production code
- Proper null handling

### Best Practices
- ✅ Component memoization
- ✅ Custom hooks for logic reuse
- ✅ Error boundaries
- ✅ Accessibility standards
- ✅ Semantic HTML
- ✅ Clean code principles

---

## 📖 Documentation

- **[Architecture Guide](./ARCHITECTURE.md)** - Deep dive into project structure
- **[Project Summary](./PROJECT_SUMMARY.md)** - Refactoring details
- **Inline JSDoc** - Function-level documentation
- **TypeScript Types** - Self-documenting interfaces

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Test additions/changes

---

## 👨‍💻 Author

**Uttam Pratap Singh**
- GitHub: [@Uttampratapsingh](https://github.com/Uttampratapsingh)
- Repository: [sterna-labs](https://github.com/Uttampratapsingh/sterna-labs)

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the component system
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vercel](https://vercel.com/) for hosting and deployment

---

## 🔮 Roadmap

- [ ] Real WebSocket integration
- [ ] Backend API connection
- [ ] User authentication
- [ ] Portfolio tracking
- [ ] Advanced charting with TradingView
- [ ] Mobile app (React Native)
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Trading signals and alerts

---
