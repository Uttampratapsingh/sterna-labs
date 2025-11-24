import { useState, useMemo } from "react";
import { Token } from "@/lib/types";
import { parseCurrencyValue, parseAgeToSeconds } from "@/lib/utils";

export type SortOption = "mc" | "age" | "volume" | "change";
export type SortDirection = "asc" | "desc";

export function useTokenFilter(tokens: Token[]) {
  const [sortBy, setSortBy] = useState<SortOption>("mc");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
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
      const keywords = searchKeywords.toLowerCase().split(",").map((k) => k.trim());
      filtered = filtered.filter((token) =>
        keywords.some(
          (keyword) =>
            token.name.toLowerCase().includes(keyword) ||
            token.symbol.toLowerCase().includes(keyword)
        )
      );
    }

    // Filter by market cap range
    if (minMC || maxMC) {
      filtered = filtered.filter((token) => {
        const mc = parseCurrencyValue(token.marketCap);
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
          aVal = parseCurrencyValue(a.marketCap);
          bVal = parseCurrencyValue(b.marketCap);
          break;
        case "volume":
          aVal = parseCurrencyValue(a.volume);
          bVal = parseCurrencyValue(b.volume);
          break;
        case "age":
          aVal = parseAgeToSeconds(a.age);
          bVal = parseAgeToSeconds(b.age);
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

  return {
    sortBy,
    sortDirection,
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
  };
}
