# Token Trading App - Architecture Documentation

## 🏗️ Project Structure

```
src/
├── components/          # UI Components
│   ├── shared/         # Reusable atomic components
│   │   ├── ProtocolBadge.tsx
│   │   ├── ChangeIndicator.tsx
│   │   ├── PriceDisplay.tsx
│   │   ├── IconButton.tsx
│   │   ├── TokenImage.tsx
│   │   └── index.ts
│   ├── ui/             # shadcn/ui base components
│   ├── TokenCard.tsx   # Token display card
│   ├── TokenColumn.tsx # Column container
│   ├── ColumnFilters.tsx
│   ├── ErrorBoundary.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useCopyToClipboard.ts
│   ├── useDocumentVisibility.ts
│   ├── useTokenFilter.ts
│   └── use-mobile.tsx
├── store/              # Redux state management
│   ├── index.ts
│   └── marketSlice.ts
├── services/           # External service integrations
│   └── mockWebSocket.ts
├── utils/              # Utility functions
│   ├── formatters.ts   # Formatting utilities
│   └── index.ts
├── constants/          # App-wide constants
│   └── index.ts
├── lib/                # Core library code
│   ├── types.ts
│   ├── utils.ts
│   └── mockData.ts
└── pages/              # Route pages
    ├── Index.tsx
    └── NotFound.tsx
```

## 🎯 Design Principles Applied

### 1. **Clean, Readable Code**
- ✅ Descriptive variable and function names
- ✅ Consistent formatting with Prettier
- ✅ TypeScript for type safety
- ✅ JSDoc comments for complex functions
- ✅ Single Responsibility Principle

### 2. **Proper Folder Organization**
- ✅ Feature-based structure for scalability
- ✅ Atomic design pattern for components
- ✅ Clear separation of concerns
- ✅ Centralized constants and utilities

### 3. **Reusable Components**
- ✅ **ProtocolBadge**: Display protocol with styled badge
- ✅ **ChangeIndicator**: Show percentage changes with colors
- ✅ **PriceDisplay**: Consistent price formatting
- ✅ **IconButton**: Reusable button with tooltip
- ✅ **TokenImage**: Image component with fallback

### 4. **Logic Separated from UI**
- ✅ Custom hooks for business logic (`useTokenFilter`, `useCopyToClipboard`)
- ✅ Services layer for external interactions (`mockWebSocket`)
- ✅ Store for state management (Redux Toolkit)
- ✅ Utility functions in dedicated files

### 5. **Git Best Practices**
- ✅ Semantic commit messages
- ✅ Feature branches
- ✅ Clean commit history
- ✅ Proper `.gitignore`

### 6. **Performance Optimization**
- ✅ `React.memo()` for preventing unnecessary re-renders
- ✅ `lazy()` and `Suspense` for code splitting
- ✅ `useMemo()` and `useCallback()` for expensive computations
- ✅ `content-visibility: auto` for list virtualization
- ✅ Optimized Redux selectors
- ✅ Image lazy loading

### 7. **Accessibility**
- ✅ Semantic HTML elements (`<section>`, `<nav>`, `<header>`)
- ✅ ARIA labels and roles
- ✅ `aria-pressed` states for buttons
- ✅ `aria-busy` for loading states
- ✅ Keyboard navigation support
- ✅ Screen reader friendly

### 8. **Avoiding Complexity**
- ✅ Single source of truth for state
- ✅ Prop drilling minimized with Redux
- ✅ Clear component hierarchy
- ✅ No over-engineering
- ✅ Simple, straightforward logic

### 9. **Smart Documentation**
- ✅ JSDoc for functions and classes
- ✅ TypeScript types as documentation
- ✅ README with architecture overview
- ✅ Inline comments where necessary
- ✅ Exported constants with descriptions

### 10. **User-First Thinking**
- ✅ Error boundaries for graceful failures
- ✅ Loading states with feedback
- ✅ Responsive design
- ✅ Real-time data updates
- ✅ Intuitive filtering and sorting
- ✅ Accessible to all users

## 🔧 Key Features

### State Management
- **Redux Toolkit** for global state
- Real-time price updates via WebSocket simulation
- Centralized market data store

### Component Architecture
```
App (Error Boundary)
└── Provider (Redux)
    └── QueryClient
        └── Routes
            └── Index
                ├── Navigation
                ├── PageHeader
                └── TokenColumn (x3)
                    ├── ColumnFilters
                    └── TokenCard (list)
                        ├── TokenImage
                        ├── ProtocolBadge
                        ├── PriceDisplay
                        ├── ChangeIndicator
                        └── IconButton (x3)
```

### Custom Hooks
- `useTokenFilter`: Filtering and sorting logic
- `useCopyToClipboard`: Clipboard operations
- `useDocumentVisibility`: Tab visibility tracking
- `use-mobile`: Responsive breakpoint detection

### Performance Features
- Lazy route loading
- Component memoization
- Optimized re-renders
- Virtual scrolling with `content-visibility`

### Accessibility Features
- ARIA labels on all interactive elements
- Semantic HTML structure
- Keyboard navigation
- Screen reader support
- Focus management

## 📦 Dependencies

### Core
- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Styling

### State & Data
- **Redux Toolkit**: State management
- **React Query**: Server state (configured for future API)

### UI Components
- **Radix UI**: Accessible primitives
- **shadcn/ui**: Pre-built components
- **Lucide React**: Icons

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Code Quality

- **TypeScript** strict mode enabled
- **ESLint** for code linting
- **Prettier** for code formatting (configured)
- **Type checking** at build time

## 🎨 Styling

- Tailwind CSS with custom theme
- CSS variables for theming
- Responsive design
- Dark mode support (infrastructure ready)

## 📝 Constants Organization

All magic numbers and strings are centralized in `src/constants/index.ts`:
- Protocol colors
- WebSocket configuration
- Sort options
- ARIA labels
- Image configuration

## 🔐 Type Safety

Comprehensive TypeScript types:
- Token interface
- Market state types
- Component prop types
- Redux state types
- Utility function types

## 🌐 Future Enhancements

- [ ] Real WebSocket integration
- [ ] Backend API integration
- [ ] User authentication
- [ ] Token watchlists
- [ ] Advanced charting
- [ ] Export functionality
- [ ] Dark/Light theme toggle
- [ ] Mobile app with React Native

## 📖 Component Usage Examples

### ProtocolBadge
```tsx
<ProtocolBadge protocol="Pump" />
```

### ChangeIndicator
```tsx
<ChangeIndicator value={5.2} label="1h" />
```

### PriceDisplay
```tsx
<PriceDisplay price="$0.0024" label="Price" size="md" />
```

### IconButton
```tsx
<IconButton 
  icon={<Copy />}
  onClick={handleCopy}
  tooltip="Copy address"
  ariaLabel="Copy token address"
/>
```

## 🏆 Best Practices Checklist

- ✅ Components are small and focused
- ✅ Logic is separated from UI
- ✅ Code is DRY (Don't Repeat Yourself)
- ✅ TypeScript types are comprehensive
- ✅ Accessibility is built-in
- ✅ Performance is optimized
- ✅ Error handling is robust
- ✅ Code is well-documented
- ✅ Git history is clean
- ✅ User experience is smooth

---
