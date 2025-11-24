import { memo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils";

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  tooltip?: string;
  className?: string;
  ariaLabel: string;
  disabled?: boolean;
}

export const IconButton = memo(
  ({
    icon,
    onClick,
    tooltip,
    className,
    ariaLabel,
    disabled = false,
  }: IconButtonProps) => {
    const button = (
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-5 w-5", className)}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {icon}
      </Button>
    );

    if (!tooltip) return button;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent className="bg-popover border-border">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

IconButton.displayName = "IconButton";
