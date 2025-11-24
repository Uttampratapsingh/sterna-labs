import { useState, useMemo, useCallback } from "react";
import { Token } from "@/lib/types";
import { parseCurrencyValue, parseAgeToSeconds } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export type SortOption = "mc" | "age" | "volume" | "change";
export type SortDirection = "asc" | "desc";

export function useTokenFilter(tokens: Token[]) {
  const [sortBy, setSortBy] = useState<SortOption>("mc");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [searchKeywords, setSearchKeywords] = useState("");
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [minMC, setMinMC] = useState("");
  const [maxMC, setMaxMC] = useState("");

  const marketPrices = useSelector((state: RootState) => state.market.prices);

  const handleSort = useCallback((option: SortOption) => {
    setSortBy((prevSortBy) => {
      const newDirection = prevSortBy === option 
        ? (sortDirection === "asc" ? "desc" : "asc")
        : "desc";
      setSortDirection(newDirection);
      return option;
    });
  }, [sortDirection]);

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

    // Filter by protocols
    if (selectedProtocols.length > 0) {
      filtered = filtered.filter((token) =>
        selectedProtocols.includes(token.protocol)
      );
    }

    // Filter by market cap range
    if (minMC || maxMC) {
      filtered = filtered.filter((token) => {
        const mc = parseCurrencyValue(token.marketCap);
        const min = minMC ? parseCurrencyValue(minMC) : 0;
        const max = maxMC ? parseCurrencyValue(maxMC) : Infinity;
        return mc >= min && mc <= max;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal: number, bVal: number;

      const getChange = (t: Token) => {
        const live = marketPrices[t.id];
        return live ? live.change1h : t.change1h;
      };

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
          aVal = getChange(a);
          bVal = getChange(b);
          break;
        default:
          return 0;
      }

      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  }, [tokens, sortBy, sortDirection, searchKeywords, selectedProtocols, minMC, maxMC, sortBy === "change" ? marketPrices : null]);

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
