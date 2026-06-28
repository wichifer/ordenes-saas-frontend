import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import {
  Menu,
  Building2,
  LayoutDashboard,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";

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

export default function MobileSidebar() {
  const [open, setOpen] =
    useState(false);

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <div className="mb-8">
          <Logo />
        </div>

        <nav className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="
                flex
                items-center
                gap-3
                rounded-lg
                p-3
                hover:bg-muted
                "
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}