import { Copy, ExternalLink, Search, Users, Heart, MessageCircle } from "lucide-react";
import { Token } from "@/lib/types";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { 
  ProtocolBadge, 
  ChangeIndicator, 
  PriceDisplay, 
  IconButton, 
  TokenImage 
} from "@/components/shared";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ARIA_LABELS } from "@/constants";

interface TokenCardProps {
  token: Token;
}

export const TokenCard = memo(({ token }: TokenCardProps) => {
  const marketData = useSelector((state: RootState) => state.market.prices[token.id]);
  const { copyToClipboard } = useCopyToClipboard();
  
  const displayPrice = marketData?.price || token.price;
  const displayChange1h = marketData?.change1h ?? token.change1h;
  const displayChange5m = marketData?.change5m ?? token.change5m;
  const displayChange6h = marketData?.change6h ?? token.change6h;

  const handleCopyAddress = async () => {
    const success = await copyToClipboard(token.id);
    if (success) {
      // Could add toast notification here
      console.log("Address copied!");
    }
  };

  const getPriceColor = (change: number) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-danger";
    return "text-muted-foreground";
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div 
          className="group relative bg-card border border-border rounded-lg p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
          role="article"
          aria-label={`Token: ${token.name} (${token.symbol})`}
        >
          <div className="flex gap-3">
            {/* Token Image */}
            <TokenImage 
              src={token.image} 
              alt={token.name}
              size="md"
            />

            {/* Token Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground truncate">
                    {token.name} 
                    <span className="text-muted-foreground ml-2">{token.symbol}</span>
                  </h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-muted-foreground">{token.age}</span>
                    <ProtocolBadge protocol={token.protocol} />
                    <IconButton
                      icon={<Copy className="h-3 w-3" />}
                      onClick={handleCopyAddress}
                      tooltip="Copy address"
                      ariaLabel={ARIA_LABELS.COPY_ADDRESS}
                    />
                    <IconButton
                      icon={<ExternalLink className="h-3 w-3" />}
                      tooltip="Open in external site"
                      ariaLabel={ARIA_LABELS.OPEN_EXTERNAL}
                    />
                    <IconButton
                      icon={<Search className="h-3 w-3" />}
                      tooltip="Search for token"
                      ariaLabel={ARIA_LABELS.SEARCH_TOKEN}
                    />
                  </div>
                </div>

                <PriceDisplay 
                  price={displayPrice}
                  label="Price"
                  size="md"
                />
              </div>

              <div className="text-xs text-muted-foreground mt-1">MC</div>
              <div className="text-xs font-mono">{token.marketCap}</div>

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
              <div className="flex items-center gap-4 mt-3">
                <ChangeIndicator value={displayChange5m} label="5m" />
                <ChangeIndicator value={displayChange1h} label="1h" />
                <ChangeIndicator value={displayChange6h} label="6h" />
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
});
TokenCard.displayName = "TokenCard";