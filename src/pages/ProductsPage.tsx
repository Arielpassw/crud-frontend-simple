import { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

type Producto = {
  id: number;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
};

export default function ProductsPage() {
  const [refresh, setRefresh] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Producto | null>(null);

  const handleSuccess = () => {
    setRefresh(!refresh);
  };

  const clearEdit = () => {
    setProductToEdit(null);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">
        Módulo de Productos
      </h2>

      {/* FORM */}
      <ProductForm
        onSuccess={handleSuccess}
        productToEdit={productToEdit}
        clearEdit={clearEdit}
      />

      {/* LISTA */}
      <ProductList
        refresh={refresh}
        onEdit={(product) => setProductToEdit(product)}
      />
    </div>
  );
}