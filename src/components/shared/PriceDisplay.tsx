import { memo } from "react";
import { cn } from "@/utils";

interface PriceDisplayProps {
  price: string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

export const PriceDisplay = memo(
  ({ price, label, className, size = "md" }: PriceDisplayProps) => {
    return (
      <div className={cn("text-right", className)}>
        {label && (
          <div className="text-xs font-medium text-muted-foreground">
            {label}
          </div>
        )}
        <div
          className={cn(
            "text-primary font-bold font-mono transition-colors duration-300",
            SIZE_CLASSES[size]
          )}
          role="status"
          aria-label={`${label || "Price"}: ${price}`}
        >
          {price}
        </div>
      </div>
    );
  }
);

PriceDisplay.displayName = "PriceDisplay";
