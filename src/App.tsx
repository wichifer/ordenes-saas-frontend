import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

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
          element={<Dashboard />}
        />
        <Route
          path="/clients"
          element={<Clients />}
        />
        <Route
          path="/clients/new"
          element={<CreateClient />}
        />
        <Route
          path="/clients/edit/:id"
          element={<EditClient />}
        />
        <Route
          path="/products"
          element={<Products />}
        />
        <Route
          path="/products/new"
          element={<CreateProduct />}
        />
        <Route
          path="/products/edit/:id"
          element={<EditProduct />}
        />
        <Route
          path="/low-stock"
          element={<LowStock />}
        />
        <Route
          path="/orders"
          element={<Orders />}
        />
        <Route
          path="/orders/new"
          element={<CreateOrder />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;