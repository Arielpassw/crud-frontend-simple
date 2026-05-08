import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 p-10">

        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

          <h1 className="text-4xl font-bold text-center mb-8">
            Sistema CRUD
          </h1>

          {/* MENU */}
          <div className="flex gap-4 justify-center mb-6">
            <Link to="/products" className="text-blue-600">Productos</Link>
            <Link to="/stores" className="text-blue-600">Tiendas</Link>
            <Link to="/inventory" className="text-blue-600">Inventario</Link>
          </div>

          {/* RUTAS */}
          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/stores" element={<div>Stores aquí</div>} />
            <Route path="/inventory" element={<div>Inventory aquí</div>} />
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;