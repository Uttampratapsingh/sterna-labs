export const TokenCardSkeleton = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex gap-3">
        {/* Image skeleton */}
        <div className="w-16 h-16 rounded-lg bg-muted animate-shimmer relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-shimmer"></div>
        </div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            <div className="h-5 bg-muted rounded w-3/4 animate-shimmer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-shimmer"></div>
            </div>
            <div className="h-4 bg-muted rounded w-1/2 animate-shimmer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-shimmer"></div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-4 bg-muted rounded w-16 animate-shimmer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-shimmer"></div>
            </div>
            <div className="h-4 bg-muted rounded w-16 animate-shimmer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-shimmer"></div>
            </div>
            <div className="h-4 bg-muted rounded w-16 animate-shimmer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};