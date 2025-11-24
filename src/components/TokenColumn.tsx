import { ArrowUpDown, Zap, SlidersHorizontal } from "lucide-react";
import { TokenCard } from "./TokenCard";
import { TokenCardSkeleton } from "./TokenCardSkeleton";
import { ColumnFilters } from "./ColumnFilters";
import { Token } from "@/lib/types";
import { useState, useMemo } from "react";
import { Button } from "./ui/button";
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

type SortOption = "mc" | "age" | "volume" | "change";

export const TokenColumn = ({ title, tokens, category }: TokenColumnProps) => {
  const [isLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("mc");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchKeywords, setSearchKeywords] = useState("");
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [minMC, setMinMC] = useState("");
  const [maxMC, setMaxMC] = useState("");

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(option);
      setSortDirection("desc");
    }
  };

  const filteredAndSortedTokens = useMemo(() => {
    let filtered = [...tokens];

    // Filter by search keywords
    if (searchKeywords) {
      const keywords = searchKeywords.toLowerCase().split(",").map(k => k.trim());
      filtered = filtered.filter(token =>
        keywords.some(keyword =>
          token.name.toLowerCase().includes(keyword) ||
          token.symbol.toLowerCase().includes(keyword)
        )
      );
    }

    // Filter by market cap range
    if (minMC || maxMC) {
      filtered = filtered.filter(token => {
        const mc = parseFloat(token.marketCap.replace(/[$KM]/g, "")) * 
                   (token.marketCap.includes("K") ? 1000 : token.marketCap.includes("M") ? 1000000 : 1);
        const min = minMC ? parseFloat(minMC) : 0;
        const max = maxMC ? parseFloat(maxMC) : Infinity;
        return mc >= min && mc <= max;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal: number, bVal: number;

      switch (sortBy) {
        case "mc":
          aVal = parseFloat(a.marketCap.replace(/[$KM]/g, "")) * 
                (a.marketCap.includes("K") ? 1000 : a.marketCap.includes("M") ? 1000000 : 1);
          bVal = parseFloat(b.marketCap.replace(/[$KM]/g, "")) * 
                (b.marketCap.includes("K") ? 1000 : b.marketCap.includes("M") ? 1000000 : 1);
          break;
        case "volume":
          aVal = parseFloat(a.volume.replace(/[$KM]/g, "")) * 
                (a.volume.includes("K") ? 1000 : a.volume.includes("M") ? 1000000 : 1);
          bVal = parseFloat(b.volume.replace(/[$KM]/g, "")) * 
                (b.volume.includes("K") ? 1000 : b.volume.includes("M") ? 1000000 : 1);
          break;
        case "age":
          const ageToSeconds = (age: string) => {
            const num = parseInt(age);
            if (age.includes("s")) return num;
            if (age.includes("m")) return num * 60;
            if (age.includes("h")) return num * 3600;
            return num;
          };
          aVal = ageToSeconds(a.age);
          bVal = ageToSeconds(b.age);
          break;
        case "change":
          aVal = a.change1h;
          bVal = b.change1h;
          break;
        default:
          return 0;
      }

      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  }, [tokens, sortBy, sortDirection, searchKeywords, minMC, maxMC]);

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
