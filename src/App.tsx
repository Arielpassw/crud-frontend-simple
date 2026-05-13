import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import StorePage from "./pages/StorePage";
import InventoryPage from "./pages/InventoryPage";
import ReportsPage from "./pages/ReportsPage";

function App() {

  return (
    <BrowserRouter>

      <div className="min-h-screen bg-gray-100 p-10">

        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">

          {/* TITULO */}
          <h1 className="text-4xl font-bold text-center mb-8">
            Sistema CRUD
          </h1>

          {/* MENU */}
          <nav className="flex gap-6 justify-center mb-8">

            <Link
              to="/products"
              className="text-blue-600 font-semibold hover:text-blue-800"
            >
              Productos
            </Link>

            <Link
              to="/stores"
              className="text-blue-600 font-semibold hover:text-blue-800"
            >
              Tiendas
            </Link>

            <Link
              to="/inventory"
              className="text-blue-600 font-semibold hover:text-blue-800"
            >
              Inventario
            </Link>

            <Link
              to="/reports"
              className="text-blue-600 font-semibold hover:text-blue-800"
            >
              Reportes
            </Link>

          </nav>

          {/* RUTAS */}
          <Routes>

            {/* REDIRECCION INICIAL */}
            <Route
              path="/"
              element={
                <Navigate to="/products" />
              }
            />

            {/* PRODUCTS */}
            <Route
              path="/products"
              element={<ProductsPage />}
            />

            {/* STORES */}
            <Route
              path="/stores"
              element={<StorePage />}
            />

            {/* INVENTORY */}
            <Route
              path="/inventory"
              element={<InventoryPage />}
            />

            {/* REPORTS */}
            <Route
              path="/reports"
              element={
                <ReportsPage />
              }
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;