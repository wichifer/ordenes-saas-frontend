import type { ReactNode } from 'react';
import SidebarSaas from './SidebarSaas';
import HeaderSaas from './HeaderSaas';

type Props = {
  children: ReactNode;
};

export default function LayoutSaas({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <SidebarSaas />

      <div className="flex-1 flex flex-col">
        <HeaderSaas />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}