import { LayoutGrid, List, Volume2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const PageHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-card/50">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Pulse</h1>
        <div className="flex items-center gap-2">
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <span className="text-sm">ⓘ</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <LayoutGrid className="w-4 h-4" />
              <span>Display</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
            <DropdownMenuItem>
              <LayoutGrid className="w-4 h-4 mr-2" />
              Grid View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <List className="w-4 h-4 mr-2" />
              List View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Volume2 className="w-5 h-5" />
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};