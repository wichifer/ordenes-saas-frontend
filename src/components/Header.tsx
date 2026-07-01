import { PanelLeft } from "lucide-react";
import ModeToggle from "./ModeToggle";
export default function Header() {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <PanelLeft className="h-5 w-5 text-muted-foreground" />

        <h1 className="text-lg font-semibold">
          Sistema Contable SaaS
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />
        {/* Avatar */}
      </div>
    </header>
  );
}