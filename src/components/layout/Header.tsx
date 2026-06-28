import MobileSidebar from "./MobileSidebar";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header
      className="
      h-16
      border-b
      px-4
      flex
      items-center
      justify-between
      bg-background
      sticky
      top-0
      z-30
      "
    >
      <div className="flex items-center gap-3">

        <MobileSidebar />

        <div>
          <h2 className="font-semibold">
            Dashboard
          </h2>

          <p className="text-sm text-muted-foreground">
            Bienvenido
          </p>
        </div>

      </div>

      <UserMenu />
    </header>
  );
}