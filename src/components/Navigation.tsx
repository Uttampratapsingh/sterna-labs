import { Mountain, Search, Bell, Wallet, Moon, Sun, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { memo } from "react";

/**
 * Navigation item configuration
 */
interface NavItem {
  label: string;
  active: boolean;
}

/**
 * Main navigation bar component
 * Provides app-wide navigation, theme toggle, and utility actions
 * Optimized with React.memo to prevent unnecessary re-renders
 */
export const Navigation = memo(() => {
  const { theme, setTheme } = useTheme();
  
  const navItems: NavItem[] = [
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
      <div className="px-4">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 lg:gap-8">
            <div className="flex items-center gap-2">
              <Mountain className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
            </div>
            
            {/* Nav Items - Desktop only */}
            <div className="hidden xl:flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                    item.active
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  aria-current={item.active ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Hide some items on mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex text-muted-foreground hover:text-foreground h-9 w-9 lg:h-10 lg:w-10"
              aria-label="Search"
            >
              <Search className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1.5 lg:gap-2 h-9 lg:h-10 text-sm">
                  <div className="flex items-center gap-1.5 lg:gap-2">
                    <span className="text-primary text-xs lg:text-sm">≡</span>
                    <span className="hidden sm:inline">SOL</span>
                    <span className="sm:hidden">0</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                <DropdownMenuItem>SOL</DropdownMenuItem>
                <DropdownMenuItem>USDC</DropdownMenuItem>
                <DropdownMenuItem>USDT</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Show globe icon on mobile instead of Deposit */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1.5 lg:gap-2 h-9 lg:h-10 text-sm">
                  <div className="flex items-center gap-1.5 lg:gap-2">
                    <span className="text-primary text-xs lg:text-sm">🌐</span>
                    <span className="hidden sm:inline">0</span>
                    <span className="sm:hidden">0</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              className="hidden lg:flex bg-primary hover:bg-primary/90 text-primary-foreground glow-primary h-10"
            >
              Deposit
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden lg:flex text-muted-foreground hover:text-foreground h-10 w-10"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden lg:flex text-muted-foreground hover:text-foreground h-10 w-10"
              aria-label="Wallet"
            >
              <Wallet className="w-5 h-5" />
            </Button>

            {/* Mobile: Show only essential buttons */}
            <Button 
              className="lg:hidden bg-primary/10 hover:bg-primary/20 text-primary h-9 px-3 text-sm font-medium"
            >
              Paste CA
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground h-9 w-9 lg:h-10 lg:w-10"
              aria-label="Search"
            >
              <Search className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>

            {/* Mobile Menu - Three dots with theme toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground h-9 w-9 lg:hidden"
                  aria-label="Menu"
                >
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* Theme Toggle in Menu */}
                <DropdownMenuItem
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>Theme</span>
                    <div className="flex items-center gap-2">
                      {theme === "dark" ? (
                        <>
                          <Moon className="h-4 w-4" />
                          <span className="text-xs text-muted-foreground">Dark</span>
                        </>
                      ) : (
                        <>
                          <Sun className="h-4 w-4" />
                          <span className="text-xs text-muted-foreground">Light</span>
                        </>
                      )}
                    </div>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem>
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </DropdownMenuItem>
                
                <DropdownMenuItem>
                  <Wallet className="w-4 h-4 mr-2" />
                  Wallet
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem>
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden lg:flex text-muted-foreground hover:text-foreground h-10 w-10"
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
});
