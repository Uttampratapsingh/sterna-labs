import { memo } from "react";
import { cn } from "@/utils";

interface ChangeIndicatorProps {
  value: number;
  label?: string;
  className?: string;
  showSign?: boolean;
}

export const ChangeIndicator = memo(
  ({ value, label, className, showSign = true }: ChangeIndicatorProps) => {
    const getColorClass = () => {
      if (value > 0) return "text-success";
      if (value < 0) return "text-danger";
      return "text-muted-foreground";
    };

    const formattedValue = `${showSign && value > 0 ? "+" : ""}${value}%`;

    return (
      <div className={cn("flex items-center gap-1", className)}>
        {label && (
          <span className="text-muted-foreground text-xs">{label}:</span>
        )}
        <span
          className={cn(
            "font-mono font-medium text-xs transition-colors duration-300",
            getColorClass()
          )}
          role="status"
          aria-label={`${label || "Change"}: ${formattedValue}`}
        >
          {formattedValue}
        </span>
      </div>
    );
  }
);

ChangeIndicator.displayName = "ChangeIndicator";
