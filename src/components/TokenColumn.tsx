import { ArrowUpDown, Zap, SlidersHorizontal } from "lucide-react";
import { TokenCard } from "./TokenCard";
import { TokenCardSkeleton } from "./TokenCardSkeleton";
import { ColumnFilters } from "./ColumnFilters";
import { Token } from "@/lib/types";
import { useState, memo } from "react";
import { Button } from "./ui/button";
import { useTokenFilter } from "@/hooks/useTokenFilter";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ARIA_LABELS } from "@/constants";

/**
 * Props for TokenColumn component
 */
interface TokenColumnProps {
  /** Column title displayed in header */
  title: string;
  /** Array of tokens to display */
  tokens: Token[];
  /** Category for grouping and styling */
  category: "new" | "final" | "migrated";
}

/**
 * Token column component displaying filtered and sortable token lists
 * Features real-time filtering, sorting, and performance optimizations
 * Uses React.memo to prevent unnecessary re-renders
 */
export const TokenColumn = memo(({ title, tokens, category }: TokenColumnProps) => {
  const [isLoading] = useState(false);
  
  const {
    sortBy,
    searchKeywords,
    setSearchKeywords,
    selectedProtocols,
    setSelectedProtocols,
    minMC,
    setMinMC,
    maxMC,
    setMaxMC,
    handleSort,
    filteredAndSortedTokens,
  } = useTokenFilter(tokens);

  return (
    <section 
      className="flex flex-col h-full min-h-0 bg-background"
      aria-label={`${title} token list`}
    >
      {/* Column Header */}
      <header className="flex-shrink-0 px-4 py-3 border-b border-border bg-card/50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground h-8 w-8"
                  aria-label={ARIA_LABELS.FILTER_TOKENS}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-popover border-border p-4" align="start">
                <ColumnFilters
                  searchKeywords={searchKeywords}
                  setSearchKeywords={setSearchKeywords}
                  selectedProtocols={selectedProtocols}
                  setSelectedProtocols={setSelectedProtocols}
                  minMC={minMC}
                  setMinMC={setMinMC}
                  maxMC={maxMC}
                  setMaxMC={setMaxMC}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <nav className="flex items-center justify-between text-sm" aria-label="Token sorting options">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSort("mc")}
              className={`flex items-center gap-1 transition-colors ${
                sortBy === "mc" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Flash indicator"
            >
              <Zap className="w-4 h-4" />
              <span>0</span>
            </button>
            
            <div className="flex items-center gap-1 text-muted-foreground" aria-label="Protocol indicators">
              <span className="text-primary">≡</span>
              <span>P1</span>
              <span>P2</span>
              <span>P3</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSort("mc")}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                sortBy === "mc" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={ARIA_LABELS.SORT_BY_MC}
              aria-pressed={sortBy === "mc"}
            >
              MC
            </button>
            <button
              onClick={() => handleSort("age")}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                sortBy === "age" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={ARIA_LABELS.SORT_BY_AGE}
              aria-pressed={sortBy === "age"}
            >
              Age
            </button>
            <button
              onClick={() => handleSort("volume")}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                sortBy === "volume" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={ARIA_LABELS.SORT_BY_VOLUME}
              aria-pressed={sortBy === "volume"}
            >
              Vol
            </button>
            <button
              onClick={() => handleSort("change")}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                sortBy === "change" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={ARIA_LABELS.SORT_BY_CHANGE}
              aria-pressed={sortBy === "change"}
            >
              Δ%
            </button>
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle sort direction"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* Scrollable Content */}
      <div 
        className="flex-1 min-h-0 overflow-y-auto px-4 py-3"
        role="feed"
        aria-busy={isLoading}
        aria-label={`${title} tokens`}
      >
        <div className="space-y-3 pb-4" style={{ contentVisibility: "auto" }}>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <TokenCardSkeleton key={i} />)
            : filteredAndSortedTokens.map((token, index) => (
                <TokenCard key={token.id} token={token} priority={index < 3} />
              ))}
          {!isLoading && filteredAndSortedTokens.length === 0 && (
            <div 
              className="text-center py-8 text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              No tokens found
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
