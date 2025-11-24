import { Mountain, Search, Bell, Wallet, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export const Navigation = () => {
  const { theme, setTheme } = useTheme();
  
  const navItems = [
    { label: "Discover", active: false },
    { label: "Pulse", active: true },
    { label: "Trackers", active: false },
    { label: "Perpetuals", active: false },
    { label: "Yield", active: false },
    { label: "Vision", active: false },
    { label: "Portfolio", active: false },
    { label: "Rewards", active: false },
  ];

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Mountain className="w-8 h-8 text-primary" />
            </div>
            
            {/* Nav Items */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                    item.active
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="w-5 h-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">≡</span>
                    <span>SOL</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                <DropdownMenuItem>SOL</DropdownMenuItem>
                <DropdownMenuItem>USDC</DropdownMenuItem>
                <DropdownMenuItem>USDT</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary">
              Deposit
            </Button>

            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Wallet className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
