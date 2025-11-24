# Contributing to Token Trading App

Thank you for your interest in contributing! This document provides guidelines and standards for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Component Guidelines](#component-guidelines)
- [Performance Best Practices](#performance-best-practices)
- [Accessibility Requirements](#accessibility-requirements)
- [Testing Guidelines](#testing-guidelines)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/Uttampratapsingh/sterna-labs.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 💻 Development Workflow

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our code standards
3. **Test your changes** thoroughly
4. **Update documentation** as needed
5. **Submit a pull request**

### Branch Naming Convention

- `feat/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `perf/` - Performance improvements
- `test/` - Test additions or updates

Example: `feat/add-token-search`

## 📝 Code Standards

### TypeScript

- **Always use TypeScript** - No plain JavaScript files
- **Define explicit types** - Avoid `any` unless absolutely necessary
- **Use interfaces** for object shapes
- **Use type aliases** for unions and complex types
- **Document with JSDoc** - Add descriptions for public APIs

```typescript
/**
 * Formats a token price with proper decimal places
 * @param price - The raw price value
 * @param decimals - Number of decimal places (default: 6)
 * @returns Formatted price string
 */
export function formatTokenPrice(price: number, decimals: number = 6): string {
  return price.toFixed(decimals);
}
```

### Component Structure

```typescript
// 1. Imports
import { useState, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { useCustomHook } from "@/hooks/useCustomHook";

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  onSubmit: (data: FormData) => void;
}

// 3. Constants (if any)
const MAX_ITEMS = 100;

// 4. Component
export const Component = memo(({ title, onSubmit }: ComponentProps) => {
  // Hooks
  const [state, setState] = useState<string>("");
  
  // Callbacks
  const handleClick = useCallback(() => {
    // Implementation
  }, []);
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
});

// 5. Display name (for React DevTools)
Component.displayName = "Component";
```

## 🧩 Component Guidelines

### When to Create a New Component

- **Reusability**: Used in 2+ places
- **Complexity**: >100 lines of code
- **Separation of Concerns**: Distinct functionality
- **Testability**: Needs isolated testing

### Component Types

1. **Atomic Components** (`/components/shared/`)
   - Small, reusable building blocks
   - No business logic
   - Pure presentation

2. **Feature Components** (`/components/`)
   - Specific features
   - Can contain business logic
   - Compose atomic components

3. **Page Components** (`/pages/`)
   - Route-level components
   - Orchestrate features
   - Handle page-level state

### Optimization

- **Use `React.memo`** for components that receive stable props
- **Use `useCallback`** for callback props passed to memoized children
- **Use `useMemo`** for expensive calculations
- **Avoid inline functions** in props when using memo

```typescript
// ❌ Bad - Creates new function on every render
<Button onClick={() => handleClick(id)} />

// ✅ Good - Memoized callback
const handleButtonClick = useCallback(() => handleClick(id), [id]);
<Button onClick={handleButtonClick} />
```

## ⚡ Performance Best Practices

### Code Splitting

```typescript
// Lazy load heavy components
const HeavyComponent = lazy(() => import("./HeavyComponent"));

// Use Suspense
<Suspense fallback={<Skeleton />}>
  <HeavyComponent />
</Suspense>
```

### List Rendering

```typescript
// Always use keys
{items.map(item => (
  <Item key={item.id} {...item} />
))}

// For large lists, consider virtualization
import { FixedSizeList } from "react-window";
```

### Memoization

```typescript
// Expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Stable references
const stableCallback = useCallback(() => {
  doSomething(value);
}, [value]);
```

## ♿ Accessibility Requirements

### ARIA Labels

```typescript
// Interactive elements need labels
<button aria-label="Close modal">
  <XIcon />
</button>

// Form controls need labels
<input 
  id="email" 
  aria-describedby="email-help"
  aria-required="true"
/>
```

### Semantic HTML

```typescript
// Use semantic elements
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// Not generic divs
<div className="nav">
  <div className="nav-item">
    <div onClick={...}>Home</div>
  </div>
</div>
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Tab order must be logical
- Focus indicators must be visible
- Escape key should close modals/dropdowns

### Color Contrast

- Text must meet WCAG AA standards (4.5:1 for normal text)
- Don't rely on color alone to convey information
- Support both light and dark themes

## 🧪 Testing Guidelines

### Unit Tests

```typescript
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
  
  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText("Click me").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Accessibility Tests

```typescript
import { axe } from "jest-axe";

it("has no accessibility violations", async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 📦 Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions or updates
- `chore`: Build process or auxiliary tool changes

### Examples

```bash
feat(auth): add JWT authentication

Implement JWT-based authentication system with:
- Login/logout functionality
- Token refresh mechanism
- Protected route guards

Closes #123

---

fix(ui): correct button hover state

The primary button was not showing the correct hover state
in dark mode. Updated the CSS to use the proper color variable.

---

perf(list): implement virtual scrolling

Added react-window for token list virtualization,
reducing initial render time by 60% for lists over 1000 items.
```

## 🔄 Pull Request Process

1. **Update documentation** - README, ARCHITECTURE.md, JSDoc comments
2. **Add/update tests** - Maintain or improve test coverage
3. **Run linters** - `npm run lint` should pass
4. **Build successfully** - `npm run build` should complete without errors
5. **Update CHANGELOG.md** - Add entry for your changes
6. **Request review** - Tag relevant maintainers

### PR Title Format

```
<type>(<scope>): <description>

Example: feat(search): add fuzzy token name search
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to break)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Accessibility tested

## Screenshots (if applicable)
Before / After screenshots

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 💬 Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions or ideas
- Join our Discord community (if applicable)

---

**Thank you for contributing!** 🎉
