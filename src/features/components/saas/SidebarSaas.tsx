import { Link } from 'react-router-dom';

export default function SidebarSaas() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">

      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          T420 SaaS
        </h1>

        <p className="text-sm text-slate-400">
          Panel Administrador
        </p>
      </div>

      <nav className="space-y-2">

        <Link
          to="/saas/empresas"
          className="block p-3 rounded hover:bg-slate-800"
        >
          🏢 Empresas
        </Link>

        <Link
          to="#"
          className="block p-3 rounded hover:bg-slate-800"
        >
          👥 Usuarios
        </Link>

        <Link
          to="#"
          className="block p-3 rounded hover:bg-slate-800"
        >
          ⚙ Configuración
        </Link>

      </nav>
    </aside>
  );
}