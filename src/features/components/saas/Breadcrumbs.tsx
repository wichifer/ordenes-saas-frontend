import { Link, useLocation } from "react-router-dom";

const routeNames: Record<string, string> = {
  dashboard: "Dashboard",
  saas: "SaaS",
  empresas: "Empresas",
  clients: "Clientes",
  products: "Productos",
  orders: "Órdenes",
  reports: "Reportes",
  audit: "Auditoría",
  payments: "Pagos",
  cash: "Caja",
};

export default function Breadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter(Boolean);

  return (
    <nav className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            to="/dashboard"
            className="hover:text-primary"
          >
            Inicio
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const to =
            "/" + pathnames.slice(0, index + 1).join("/");

          const isLast =
            index === pathnames.length - 1;

          return (
            <li
              key={to}
              className="flex items-center gap-2"
            >
              <span>/</span>

              {isLast ? (
                <span className="font-medium text-foreground">
                  {routeNames[value] || value}
                </span>
              ) : (
                <Link
                  to={to}
                  className="hover:text-primary"
                >
                  {routeNames[value] || value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}