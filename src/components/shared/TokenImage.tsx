import { memo } from "react";
import { cn } from "@/utils";
import { IMAGE_CONFIG } from "@/constants";

interface TokenImageProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showOnlineIndicator?: boolean;
  priority?: boolean;
}

const SIZE_CLASSES = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
} as const;

export const TokenImage = memo(
  ({
    src,
    alt,
    size = "md",
    className,
    showOnlineIndicator = true,
    priority = false,
  }: TokenImageProps) => {
    return (
      <div className={cn("relative flex-shrink-0", className)}>
        <div
          className={cn(
            "rounded-lg overflow-hidden border border-border bg-muted",
            SIZE_CLASSES[size]
          )}
        >
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : (IMAGE_CONFIG.LOADING as any)}
            decoding={IMAGE_CONFIG.DECODING as any}
            fetchPriority={priority ? "high" : undefined}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = IMAGE_CONFIG.PLACEHOLDER;
            }}
          />
        </div>
        {showOnlineIndicator && (
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card"
            role="status"
            aria-label="Token is active"
          />
        )}
      </div>
    );
  }
);

TokenImage.displayName = "TokenImage";
