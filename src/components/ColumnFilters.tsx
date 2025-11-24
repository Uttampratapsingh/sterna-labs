import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ColumnFiltersProps {
  searchKeywords: string;
  setSearchKeywords: (value: string) => void;
  selectedProtocols: string[];
  setSelectedProtocols: (value: string[]) => void;
  minMC: string;
  setMinMC: (value: string) => void;
  maxMC: string;
  setMaxMC: (value: string) => void;
}

const protocols = [
  { name: "Pump", color: "text-green-400 border-green-400" },
  { name: "Mayhem", color: "text-red-400 border-red-400" },
  { name: "Moonshot", color: "text-purple-400 border-purple-400" },
  { name: "Daos.fun", color: "text-blue-400 border-blue-400" },
  { name: "Jupiter", color: "text-yellow-400 border-yellow-400" },
];

export const ColumnFilters = ({
  searchKeywords,
  setSearchKeywords,
  selectedProtocols,
  setSelectedProtocols,
  minMC,
  setMinMC,
  maxMC,
  setMaxMC,
}: ColumnFiltersProps) => {
  const toggleProtocol = (protocol: string) => {
    if (selectedProtocols.includes(protocol)) {
      setSelectedProtocols(selectedProtocols.filter(p => p !== protocol));
    } else {
      setSelectedProtocols([...selectedProtocols, protocol]);
    }
  };

  const clearFilters = () => {
    setSearchKeywords("");
    setSelectedProtocols([]);
    setMinMC("");
    setMaxMC("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Search Keywords */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-xs text-muted-foreground">
          Search Keywords
        </Label>
        <Input
          id="search"
          placeholder="keyword1, keyword2..."
          value={searchKeywords}
          onChange={(e) => setSearchKeywords(e.target.value)}
          className="h-8 text-sm bg-muted border-border"
        />
      </div>

      {/* Protocols */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Protocols</Label>
        <div className="flex flex-wrap gap-2">
          {protocols.map((protocol) => (
            <Badge
              key={protocol.name}
              variant="outline"
              className={`${protocol.color} bg-transparent cursor-pointer transition-all text-xs py-1 ${
                selectedProtocols.includes(protocol.name) ? "ring-2 ring-current" : ""
              }`}
              onClick={() => toggleProtocol(protocol.name)}
            >
              {protocol.name}
              {selectedProtocols.includes(protocol.name) && (
                <X className="w-3 h-3 ml-1" />
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Market Cap Range */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Market Cap Range</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Min (e.g. 1000)"
            value={minMC}
            onChange={(e) => setMinMC(e.target.value)}
            type="text"
            className="h-8 text-sm bg-muted border-border"
          />
          <Input
            placeholder="Max (e.g. 50000)"
            value={maxMC}
            onChange={(e) => setMaxMC(e.target.value)}
            type="text"
            className="h-8 text-sm bg-muted border-border"
          />
        </div>
        <p className="text-[10px] text-muted-foreground">
          Enter values in dollars (e.g., 1000 for $1K, 1000000 for $1M)
        </p>
      </div>

      {/* Active Filters Summary */}
      {(searchKeywords || selectedProtocols.length > 0 || minMC || maxMC) && (
        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Filters active
          </p>
        </div>
      )}
    </div>
  );
};
