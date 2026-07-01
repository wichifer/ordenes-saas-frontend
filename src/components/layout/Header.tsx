/* src/components/layout/Header.tsx */
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Header() {
  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>

        <span className="font-semibold text-sm">
          SaaS T420
        </span>
      </div>

      {/* Center (opcional futuro search) */}
      <div className="hidden md:block text-sm text-muted-foreground">
        Dashboard
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Notificaciones placeholder */}
        <Button variant="ghost" size="icon">
          🔔
        </Button>

        <ThemeToggle />

        {/* User avatar placeholder */}
        <Button variant="ghost" size="sm">
          👤 Admin
        </Button>
      </div>
    </header>
  );
}