import { useEffect, useState } from "react";
import {
  getProductos,
  deleteProducto,
} from "../api/products";

type Producto = {
  id: number;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
};

type Props = {
  refresh: boolean;
  onEdit: (product: Producto) => void;
};

export default function ProductList({
  refresh,
  onEdit,
}: Props) {
  const [productos, setProductos] = useState<Producto[]>([]);

  // LISTAR
  const loadProductos = async () => {
    try {
      const res = await getProductos();
      setProductos(res.data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar productos");
    }
  };

  useEffect(() => {
    loadProductos();
  }, [refresh]);

  // ELIMINAR
  const handleDelete = async (id: number) => {
    const confirm = window.confirm("¿Eliminar producto?");
    if (!confirm) return;

    try {
      await deleteProducto(id);
      loadProductos();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>

      {productos.length === 0 ? (
        <p>No hay productos registrados</p>
      ) : (
        <div className="space-y-4">
          {productos.map((p) => (
            <div
              key={p.id}
              className="border p-4 rounded shadow-sm bg-gray-50"
            >
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p>💲 {p.price}</p>
              <p>{p.description}</p>
              <p>
                {p.isActive ? "🟢 Activo" : "🔴 Inactivo"}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}