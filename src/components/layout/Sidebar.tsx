import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Box,
  Building2,
} from "lucide-react";

const items = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Clientes", icon: Users, to: "/clients" },
  { label: "Productos", icon: Box, to: "/products" },
  { label: "Empresas", icon: Building2, to: "/empresas" },
];

export default function Sidebar() {
  return (
    <aside
      className="
        hidden md:flex
        w-64 shrink-0
        flex-col
        border-r border-border
        bg-sidebar
        text-sidebar-foreground
        min-h-screen
      "
    >
      {/* Header */}
      <div className="h-14 flex items-center px-4 border-b border-sidebar-border">
        <span className="font-bold text-sm text-sidebar-foreground">
          SaaS T420
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition w-full truncate",
                  "hover:bg-sidebar-primary/10 hover:text-sidebar-foreground",
                  isActive
                    ? "bg-sidebar-primary text-white"
                    : "text-sidebar-foreground/90"
                )
              }
            >
              <Icon className="h-4 w-4" />
              <span className="truncate">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}