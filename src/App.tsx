import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProductsPage from "@/modules/products/pages/ProductsPage";
import ClientesPage from "@/modules/clientes/pages/ClientesPage";
import EmpresasPage from "./modules/empresas/pages/EmpresasPage";

import OrdersPage from "@/modules/orders/pages/OrdersPage";
import CreateOrder from "./pages/CreateOrder";
import OrderDetail from "./pages/OrderDetail";

import LowStock from "./pages/LowStock";
import Cash from "./pages/Cash";
import StockMovements from "./pages/StockMovements";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Audit from "./pages/Audit";
import Playground from "./pages/Playground";

import DashboardPage from "@/modules/dashboard/pages/DashboardPage";

import EmpresaLayout from "./layouts/EmpresaLayout";
import SaaSLayout from "./layouts/SaaSLayout";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import GlobalModal from "./components/modals/GlobalModal";
import GlobalConfirmDialog from "./components/modals/GlobalConfirmDialog";
import GlobalLoading from "./components/GlobalLoading";

import { Toaster } from "sonner";


function App() {
  return (
    <>
      <Routes>

        {/* PUBLICA */}
        <Route
          path="/"
          element={<Login />}
        />


        {/* PROTEGIDAS */}
        <Route element={<ProtectedRoute />}>


          {/* =========================
              PANEL EMPRESA / ERP
          ========================== */}
          <Route element={<EmpresaLayout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/clients"
              element={<ClientesPage />}
            />

            <Route
              path="/products"
              element={<ProductsPage />}
            />


            <Route
              path="/low-stock"
              element={<LowStock />}
            />


            <Route
              path="/orders"
              element={<OrdersPage />}
            />

            <Route
              path="/orders/new"
              element={<CreateOrder />}
            />

            <Route
              path="/orders/:id"
              element={<OrderDetail />}
            />


            <Route
              path="/cash"
              element={<Cash />}
            />


            <Route
              path="/stock-movements"
              element={<StockMovements />}
            />


            <Route
              path="/payments"
              element={<Payments />}
            />


            <Route
              path="/reports"
              element={<Reports />}
            />


            <Route
              path="/audit"
              element={<Audit />}
            />


            <Route
              path="/playground"
              element={<Playground />}
            />

          </Route>



          {/* =========================
              PANEL ADMIN SaaS
          ========================== */}
          <Route element={<SaaSLayout />}>

            <Route
              path="/saas/dashboard"
              element={<DashboardPage />}
            />


            <Route
              path="/saas/empresas"
              element={<EmpresasPage />}
            />

          </Route>


        </Route>


      </Routes>


      <Toaster
        richColors
        position="top-right"
      />

      <GlobalLoading />

      <GlobalModal />

      <GlobalConfirmDialog />

    </>
  );
}


export default App;