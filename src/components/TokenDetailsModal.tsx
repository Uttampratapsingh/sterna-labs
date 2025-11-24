import { memo } from "react";
import { Token } from "@/lib/types";
import { X, ExternalLink, Copy, TrendingUp, TrendingDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TokenImage, ProtocolBadge, ChangeIndicator } from "@/components/shared";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/utils";

interface TokenDetailsModalProps {
  token: Token | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Modal dialog for displaying detailed token information
 * Features comprehensive token data, charts, and actions
 */
export const TokenDetailsModal = memo(({ token, open, onOpenChange }: TokenDetailsModalProps) => {
  const { copyToClipboard } = useCopyToClipboard();

  if (!token) return null;

  const handleCopyAddress = async () => {
    await copyToClipboard(token.id);
  };

  const priceChange = parseFloat(token.priceChange.toString());
  const isPositive = priceChange > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <TokenImage src={token.image} alt={token.name} size="lg" />
              <div>
                <DialogTitle className="text-2xl font-bold">
                  {token.name}
                  <span className="text-muted-foreground ml-2">{token.symbol}</span>
                </DialogTitle>
                <DialogDescription className="mt-1">
                  <ProtocolBadge protocol={token.protocol} />
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Price Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="text-3xl font-bold">{token.price}</p>
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                isPositive ? "text-success" : "text-danger"
              )}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {isPositive ? '+' : ''}{token.priceChange}%
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="text-2xl font-bold">{token.marketCap}</p>
              <p className="text-sm text-muted-foreground">Volume: {token.volume}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground mb-1">5m Change</p>
              <ChangeIndicator value={token.change5m} label="" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">1h Change</p>
              <ChangeIndicator value={token.change1h} label="" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">6h Change</p>
              <ChangeIndicator value={token.change6h} label="" />
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold">{token.holders}</p>
              <p className="text-xs text-muted-foreground">Holders</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold">{token.likes}</p>
              <p className="text-xs text-muted-foreground">Likes</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold">{token.comments}</p>
              <p className="text-xs text-muted-foreground">Comments</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">Age</span>
              <span className="font-mono font-medium">{token.age}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">Dex Score</span>
              <span className="font-mono font-medium">{token.dexScore}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">FDV</span>
              <span className="font-mono font-medium">{token.fdv}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">Transactions</span>
              <span className="font-mono font-medium">{token.transactions}</span>
            </div>
          </div>

          {/* Contract Address */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Contract Address</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs font-mono bg-background p-2 rounded truncate">
                {token.id}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyAddress}
                className="flex-shrink-0"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1" size="lg">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </Button>
            <Button variant="outline" className="flex-1" size="lg">
              Trade Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

TokenDetailsModal.displayName = "TokenDetailsModal";
