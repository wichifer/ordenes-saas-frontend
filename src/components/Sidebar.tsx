/* src/components/Sidebar.tsx */
import { Link } from 'react-router-dom';

export default function Sidebar() {

  return (

<div
  style={{
    width: "220px",
    minHeight: "100vh",
    borderRight: "1px solid #ccc",
    padding: "20px",
    background: "#111827",
    color: "#ffffff",
  }}
>

      <h2>POS SaaS</h2>

      <hr />

      <p>
        <Link to="/dashboard">
          Dashboard
        </Link>
      </p>

      <p>
        <Link to="/clients">
          Clientes
        </Link>
      </p>

      <p>
        <Link to="/products">
          Productos
        </Link>
      </p>

      <p>
        <Link to="/orders">
          Órdenes
        </Link>
      </p>

      <p>
        <Link to="/payments">
          Pagos
        </Link>
      </p>

      <p>
        <Link to="/cash">
          Caja
        </Link>
      </p>

      <p>
        <Link to="/stock-movements">
          Stock
        </Link>
      </p>

      <p>
        <Link to="/reports">
          Reportes
        </Link>
      </p>

      <p>
        <Link to="/audit">
          Auditoría
        </Link>
      </p>

    </div>

  );

}