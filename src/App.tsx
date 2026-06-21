import {
BrowserRouter,
Routes,
Route,
} from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import CreateClient from './pages/CreateClient';
import EditClient from './pages/EditClient';
import Products from './pages/Products';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import LowStock from './pages/LowStock';
import Orders from './pages/Orders';
import CreateOrder from './pages/CreateOrder';
import OrderDetail from './pages/OrderDetail';
import Cash from './pages/Cash';
import StockMovements from './pages/StockMovements';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Audit from './pages/Audit';
import EmpresasPage from './features/empresas/pages/EmpresasPage';
import LayoutSaas from './features/components/saas/LayoutSaas';

function App() {

return (

<BrowserRouter>

  <Routes>

    <Route
      path="/"
      element={<Login />}
    />

    <Route
      path="/dashboard"
      element={
        <Layout>
          <Dashboard />
        </Layout>
      }
    />

    <Route
      path="/clients"
      element={
        <Layout>
          <Clients />
        </Layout>
      }
    />

    <Route
      path="/clients/new"
      element={
        <Layout>
          <CreateClient />
        </Layout>
      }
    />

    <Route
      path="/clients/edit/:id"
      element={
        <Layout>
          <EditClient />
        </Layout>
      }
    />

    <Route
      path="/products"
      element={
        <Layout>
          <Products />
        </Layout>
      }
    />

    <Route
      path="/products/new"
      element={
        <Layout>
          <CreateProduct />
        </Layout>
      }
    />

    <Route
      path="/products/edit/:id"
      element={
        <Layout>
          <EditProduct />
        </Layout>
      }
    />

    <Route
      path="/low-stock"
      element={
        <Layout>
          <LowStock />
        </Layout>
      }
    />

    <Route
      path="/orders"
      element={
        <Layout>
          <Orders />
        </Layout>
      }
    />

    <Route
      path="/orders/new"
      element={
        <Layout>
          <CreateOrder />
        </Layout>
      }
    />

    <Route
      path="/orders/:id"
      element={
        <Layout>
          <OrderDetail />
        </Layout>
      }
    />

    <Route
      path="/cash"
      element={
        <Layout>
          <Cash />
        </Layout>
      }
    />

    <Route
      path="/stock-movements"
      element={
        <Layout>
          <StockMovements />
        </Layout>
      }
    />

    <Route
      path="/payments"
      element={
        <Layout>
          <Payments />
        </Layout>
      }
    />

    <Route
      path="/reports"
      element={
        <Layout>
          <Reports />
        </Layout>
      }
    />

    <Route
      path="/audit"
      element={
        <Layout>
          <Audit />
        </Layout>
      }
    />
        <Route
      path="/saas/empresas"
      element={
        <LayoutSaas>
          <EmpresasPage />
        </LayoutSaas>
      }
    />

  </Routes>

</BrowserRouter>


);

}

export default App;
