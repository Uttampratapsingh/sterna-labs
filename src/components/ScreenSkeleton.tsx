import { memo } from "react";

/**
 * Comprehensive skeleton loader for the entire application screen
 * Mimics the full layout structure while content is loading
 * Provides better perceived performance and UX
 */
export const ScreenSkeleton = memo(() => {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden" role="status" aria-live="polite" aria-label="Loading content">
      {/* Navigation Skeleton */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Skeleton */}
            <div className="flex items-center gap-8">
              <div className="w-8 h-8 bg-muted rounded-md animate-pulse" />
              
              {/* Nav Items Skeleton */}
              <div className="hidden md:flex items-center gap-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-8 bg-muted rounded-md animate-pulse"
                    style={{ width: `${60 + Math.random() * 40}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Right Section Skeleton */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-md animate-pulse" />
              <div className="w-24 h-10 bg-muted rounded-md animate-pulse" />
              <div className="w-20 h-10 bg-muted rounded-md animate-pulse" />
              <div className="w-10 h-10 bg-muted rounded-md animate-pulse" />
              <div className="w-10 h-10 bg-muted rounded-md animate-pulse" />
              <div className="w-10 h-10 bg-muted rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header Skeleton */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-24 bg-muted rounded-md animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-muted rounded-md animate-pulse" />
          <div className="w-32 h-10 bg-muted rounded-md animate-pulse" />
          <div className="w-10 h-10 bg-muted rounded-md animate-pulse" />
          <div className="w-10 h-10 bg-muted rounded-md animate-pulse" />
        </div>
      </div>

      {/* Main Content - Three Columns Skeleton */}
      <main className="flex-1 min-h-0">
        <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
          {["New Pairs", "Final Stretch", "Migrated"].map((title, columnIndex) => (
            <section key={columnIndex} className="flex flex-col h-full min-h-0 bg-background">
              {/* Column Header Skeleton */}
              <header className="flex-shrink-0 px-4 py-3 border-b border-border bg-card/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-6 w-32 bg-muted rounded-md animate-pulse" />
                  <div className="w-8 h-8 bg-muted rounded-md animate-pulse" />
                </div>
                
                <nav className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-6 bg-muted rounded-md animate-pulse" />
                    <div className="w-20 h-6 bg-muted rounded-md animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="w-12 h-6 bg-muted rounded-md animate-pulse" />
                    ))}
                    <div className="w-8 h-6 bg-muted rounded-md animate-pulse" />
                  </div>
                </nav>
              </header>

              {/* Token Cards Skeleton */}
              <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3">
                <div className="space-y-3 pb-4">
                  {Array.from({ length: 5 }).map((_, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="relative bg-card border border-border rounded-lg p-4 animate-pulse"
                    >
                      <div className="flex gap-3">
                        {/* Token Image Skeleton */}
                        <div className="w-12 h-12 bg-muted rounded-full flex-shrink-0" />

                        {/* Token Info Skeleton */}
                        <div className="flex-1 min-w-0 space-y-3">
                          {/* Title Row */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-2">
                              <div className="h-5 w-40 bg-muted rounded-md" />
                              <div className="flex items-center gap-2 flex-wrap">
                                <div className="h-4 w-12 bg-muted rounded-md" />
                                <div className="h-5 w-16 bg-muted rounded-full" />
                                <div className="h-4 w-4 bg-muted rounded" />
                                <div className="h-4 w-4 bg-muted rounded" />
                                <div className="h-4 w-4 bg-muted rounded" />
                              </div>
                            </div>
                            <div className="h-6 w-20 bg-muted rounded-md" />
                          </div>

                          {/* Market Cap */}
                          <div className="space-y-1">
                            <div className="h-3 w-8 bg-muted rounded" />
                            <div className="h-4 w-16 bg-muted rounded" />
                          </div>

                          {/* Metrics Row */}
                          <div className="flex items-center gap-3">
                            <div className="h-4 w-12 bg-muted rounded" />
                            <div className="h-4 w-12 bg-muted rounded" />
                            <div className="h-4 w-12 bg-muted rounded" />
                          </div>

                          {/* Price Changes */}
                          <div className="flex items-center gap-4">
                            <div className="h-5 w-16 bg-muted rounded" />
                            <div className="h-5 w-16 bg-muted rounded" />
                            <div className="h-5 w-16 bg-muted rounded" />
                          </div>

                          {/* Bottom Stats */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-4 w-12 bg-muted rounded" />
                              <div className="h-4 w-12 bg-muted rounded" />
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-16 bg-muted rounded" />
                              <div className="h-4 w-12 bg-muted rounded" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
      
      {/* Screen Reader Announcement */}
      <span className="sr-only">Loading token trading application...</span>
    </div>
  );
});

ScreenSkeleton.displayName = "ScreenSkeleton";
