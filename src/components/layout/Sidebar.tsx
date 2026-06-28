import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import {
  Building2,
  LayoutDashboard,
} from "lucide-react";

const menu = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Empresas",
    path: "/saas/empresas",
    icon: Building2,
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
      hidden md:flex
      w-64
      border-r
      bg-background
      flex-col
      "
    >
      <div className="h-16 px-6 flex items-center border-b">
        <Logo />
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                rounded-lg
                px-3 py-2
                transition
                hover:bg-muted
                ${
                  isActive
                    ? "bg-muted font-medium"
                    : ""
                }
              `
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}