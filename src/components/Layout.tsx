import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-red-500">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}