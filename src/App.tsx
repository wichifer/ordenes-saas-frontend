import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import CreateClient from "./pages/CreateClient";
import EditClient from "./pages/EditClient";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import LowStock from "./pages/LowStock";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";
import OrderDetail from "./pages/OrderDetail";
import Cash from "./pages/Cash";
import StockMovements from "./pages/StockMovements";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Audit from "./pages/Audit";
import EmpresasPage from "./features/empresas/pages/EmpresasPage";

import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./features/components/saas/ProtectedRoute";

import GlobalModal from "./store/components/GlobalModal";
import GlobalLoading from "./components/GlobalLoading";
import { Toaster } from "sonner";


import Layout from "./components/layout/AppLayout";
import Playground from "./pages/Playground";




function App() {
  return (
    <>
      <Routes>

        {/* PUBLICA */}
        <Route path="/" element={<Login />} />

        {/* PROTEGIDAS */}
        <Route element={<ProtectedRoute />}>
          
          <Route element={<AppLayout />}>
 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/new" element={<CreateClient />} />
            <Route path="/clients/edit/:id" element={<EditClient />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<CreateProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />

            <Route path="/low-stock" element={<LowStock />} />

            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/new" element={<CreateOrder />} />
            <Route path="/orders/:id" element={<OrderDetail />} />

            <Route path="/cash" element={<Cash />} />
            <Route path="/stock-movements" element={<StockMovements />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/audit" element={<Audit />} />

            <Route path="/saas/empresas" element={<EmpresasPage />} />
           <Route path="/playground" element={<Playground />} />
          </Route>
        </Route>

      </Routes>

      <Toaster richColors position="top-right" />
      <GlobalLoading />
      <GlobalModal />
    </>
  );
}

export default App;