import { ArrowUpDown, Zap, SlidersHorizontal } from "lucide-react";
import { TokenCard } from "./TokenCard";
import { TokenCardSkeleton } from "./TokenCardSkeleton";
import { ColumnFilters } from "./ColumnFilters";
import { Token } from "@/lib/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { useTokenFilter } from "@/hooks/useTokenFilter";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TokenColumnProps {
  title: string;
  tokens: Token[];
  category: "new" | "final" | "migrated";
}

export const TokenColumn = ({ title, tokens, category }: TokenColumnProps) => {
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
    <div className="flex flex-col h-full min-h-0 bg-background">
      {/* Column Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-border bg-card/50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground h-8 w-8"
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
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSort("mc")}
              className={`flex items-center gap-1 transition-colors ${
                sortBy === "mc" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>0</span>
            </button>
            
            <div className="flex items-center gap-1 text-muted-foreground">
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
            >
              MC
            </button>
            <button
              onClick={() => handleSort("age")}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                sortBy === "age" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Age
            </button>
            <button
              onClick={() => handleSort("volume")}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                sortBy === "volume" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Vol
            </button>
            <button
              onClick={() => handleSort("change")}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                sortBy === "change" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Δ%
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3">
        <div className="space-y-3 pb-4">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <TokenCardSkeleton key={i} />)
            : filteredAndSortedTokens.map((token) => (
                <TokenCard key={token.id} token={token} />
              ))}
          {!isLoading && filteredAndSortedTokens.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No tokens found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
