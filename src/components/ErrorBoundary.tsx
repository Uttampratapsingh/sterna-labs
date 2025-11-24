import { Component, ErrorInfo, ReactNode } from "react";

/**
 * Props for ErrorBoundary component
 */
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  /** Callback function called when an error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Maximum number of retry attempts */
  maxRetries?: number;
}

/**
 * State for ErrorBoundary component
 */
interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
}

/**
 * Advanced Error Boundary component with retry logic and error logging
 * Catches JavaScript errors anywhere in child component tree
 * Provides graceful error handling with user-friendly fallback UI
 * 
 * Features:
 * - Automatic retry mechanism (up to maxRetries attempts)
 * - Error logging with stack traces
 * - Custom error callback support
 * - Accessible error messages with ARIA attributes
 * 
 * @example
 * ```tsx
 * <ErrorBoundary 
 *   maxRetries={3}
 *   onError={(error, info) => logErrorToService(error, info)}
 * >
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
      console.error("Component Stack:", errorInfo.componentStack);
    }

    // Store error info in state
    this.setState({ errorInfo });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you would send this to an error reporting service
    // Example: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
  }

  /**
   * Attempts to recover from error by resetting state
   * Increments retry counter to prevent infinite loops
   */
  handleReset = () => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;

    if (retryCount < maxRetries) {
      this.setState({ 
        hasError: false, 
        error: undefined, 
        errorInfo: undefined,
        retryCount: retryCount + 1
      });
    } else {
      // Max retries reached, reload the page
      window.location.reload();
    }
  };

  render() {
    const { hasError, error, errorInfo, retryCount } = this.state;
    const { fallback, maxRetries = 3 } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      const canRetry = retryCount < maxRetries;

      return (
        <div 
          className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center bg-background"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="max-w-md space-y-4">
            {/* Error Icon */}
            <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-destructive" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>

            {/* Error Message */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Something went wrong
              </h2>
              <p className="text-muted-foreground mb-2">
                {error?.message || "An unexpected error occurred"}
              </p>
              {retryCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  Retry attempt {retryCount} of {maxRetries}
                </p>
              )}
            </div>

            {/* Development mode: Show stack trace */}
            {process.env.NODE_ENV === 'development' && errorInfo && (
              <details className="text-left text-xs bg-muted p-3 rounded-md overflow-auto max-h-40">
                <summary className="cursor-pointer font-semibold text-foreground mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-muted-foreground whitespace-pre-wrap break-words">
                  {error?.stack}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              {canRetry ? (
                <button
                  onClick={this.handleReset}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                  aria-label="Try again"
                >
                  Try Again
                </button>
              ) : (
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                  aria-label="Reload page"
                >
                  Reload Page
                </button>
              )}
              <button
                onClick={() => window.history.back()}
                className="px-6 py-2.5 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-colors font-medium"
                aria-label="Go back"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
