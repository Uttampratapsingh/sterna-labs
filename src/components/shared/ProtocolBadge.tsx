import { memo } from "react";
import { cn } from "@/utils";

interface ProtocolBadgeProps {
  protocol: "Pump" | "Mayhem" | "Moonshot" | "Daos.fun" | "Jupiter";
  className?: string;
}

const PROTOCOL_STYLES = {
  Pump: "text-green-400 border-green-400/50 bg-green-400/10",
  Mayhem: "text-red-400 border-red-400/50 bg-red-400/10",
  Moonshot: "text-purple-400 border-purple-400/50 bg-purple-400/10",
  "Daos.fun": "text-blue-400 border-blue-400/50 bg-blue-400/10",
  Jupiter: "text-yellow-400 border-yellow-400/50 bg-yellow-400/10",
} as const;

export const ProtocolBadge = memo(({ protocol, className }: ProtocolBadgeProps) => {
  return (
    <span
      className={cn(
        "text-[10px] px-1.5 py-0.5 rounded border font-medium",
        PROTOCOL_STYLES[protocol],
        className
      )}
      role="status"
      aria-label={`Protocol: ${protocol}`}
    >
      {protocol}
    </span>
  );
});

ProtocolBadge.displayName = "ProtocolBadge";
