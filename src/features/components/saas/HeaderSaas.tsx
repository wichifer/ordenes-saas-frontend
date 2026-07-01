
import ModeToggle from "@/components/ModeToggle";

export default function HeaderSaas() {
  return (
    <header className="h-16 border-b bg-background px-6 flex items-center justify-between">

      {/* Left */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Panel Admin SaaS
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <ModeToggle />

        <div className="text-right">
          <p className="font-medium text-foreground">
            ADMIN_SAAS
          </p>

          <p className="text-sm text-muted-foreground">
            administrador@t420.com
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          A
        </div>

      </div>

    </header>
  );
}