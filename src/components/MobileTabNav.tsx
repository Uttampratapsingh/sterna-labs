import { memo, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Tab configuration for mobile navigation
 */
interface TabConfig {
  id: string;
  label: string;
}

interface MobileTabNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: TabConfig[] = [
  { id: "new", label: "New Pairs" },
  { id: "final", label: "Final Stretch" },
  { id: "migrated", label: "Mig" },
  { id: "p1", label: "P1" },
];

/**
 * Mobile tab navigation component
 * Displays horizontal scrollable tabs for switching between token categories
 */
export const MobileTabNav = memo(({ activeTab, onTabChange }: MobileTabNavProps) => {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card/50 overflow-x-auto scrollbar-hide">
      {/* Left icons */}
      <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      </button>
      
      <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
      </button>

      {/* Tab buttons */}
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
            activeTab === tab.id
              ? "bg-muted text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-current={activeTab === tab.id ? "page" : undefined}
        >
          {tab.label}
        </button>
      ))}

      {/* Settings icon */}
      <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground ml-auto">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6m8.66-13.66l-4.24 4.24m-4.24 4.24l-4.24 4.24M23 12h-6m-6 0H1m17.66 8.66l-4.24-4.24m-4.24-4.24l-4.24-4.24" />
        </svg>
      </button>
    </div>
  );
});

MobileTabNav.displayName = "MobileTabNav";
