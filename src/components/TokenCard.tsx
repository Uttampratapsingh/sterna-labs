import { Copy, ExternalLink, Search, Users, Heart, MessageCircle } from "lucide-react";
import { Token } from "@/lib/types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TokenCardProps {
  token: Token;
}

export const TokenCard = ({ token }: TokenCardProps) => {
  const getPriceColor = (change: number) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-danger";
    return "text-muted-foreground";
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="group relative bg-card border border-border rounded-lg p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
          <div className="flex gap-3">
            {/* Token Image */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted">
                <img 
                  src={token.image} 
                  alt={token.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card"></div>
            </div>

            {/* Token Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground truncate">
                    {token.name} 
                    <span className="text-muted-foreground ml-2">{token.symbol}</span>
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{token.age}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button variant="ghost" size="icon" className="h-5 w-5">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-popover border-border">
                          Copy address
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Search className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-medium text-muted-foreground">MC</div>
                  <div className="text-primary font-bold font-mono">{token.marketCap}</div>
                  <div className="text-xs text-muted-foreground mt-1">V</div>
                  <div className="text-xs font-mono">{token.volume}</div>
                </div>
              </div>

              {/* Metrics Row */}
              <div className="flex items-center gap-3 text-xs mt-3">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span className="font-mono">{token.holders}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span className="font-mono">{token.likes}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span className="font-mono">{token.comments}</span>
                </div>
              </div>

              {/* Price Changes */}
              <div className="flex items-center gap-4 mt-3 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">5m:</span>
                  <span className={cn("font-mono font-medium", getPriceColor(token.change5m))}>
                    {token.change5m > 0 ? "+" : ""}{token.change5m}%
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">1h:</span>
                  <span className={cn("font-mono font-medium", getPriceColor(token.change1h))}>
                    {token.change1h > 0 ? "+" : ""}{token.change1h}%
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">6h:</span>
                  <span className={cn("font-mono font-medium", getPriceColor(token.change6h))}>
                    {token.change6h > 0 ? "+" : ""}{token.change6h}%
                  </span>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="flex items-center justify-between mt-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className={cn("font-mono", getPriceColor(token.priceChange))}>
                    {token.priceChange > 0 ? "↑" : "↓"} {Math.abs(token.priceChange)}%
                  </span>
                  <span className="text-muted-foreground font-mono">
                    DS {token.dexScore}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground font-mono">
                  <span>F = {token.fdv}</span>
                  <span>TX {token.transactions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-80 bg-popover border-border p-4" side="right">
        <div className="space-y-2">
          <h4 className="font-semibold">{token.name}</h4>
          <p className="text-sm text-muted-foreground">
            Market Cap: {token.marketCap}
          </p>
          <p className="text-sm text-muted-foreground">
            24h Volume: {token.volume}
          </p>
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Click to view detailed analytics
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};