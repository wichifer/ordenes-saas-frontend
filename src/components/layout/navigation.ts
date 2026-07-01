import {
  LayoutDashboard,
  Users,
  Package,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export const navigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Clientes",
    href: "/clients",
    icon: Users,
  },
  {
    label: "Productos",
    href: "/products",
    icon: Package,
  },
];