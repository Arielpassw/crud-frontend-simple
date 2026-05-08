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

  const [productos, setProductos] =
    useState<Producto[]>([]);

  // LISTAR PRODUCTOS
  const loadProductos = async () => {

    try {

      const res = await getProductos();

      setProductos(res.data);

    } catch (error) {

      console.error(error);

      alert(
        "Error al cargar productos"
      );
    }
  };

  // CARGAR PRODUCTOS
  useEffect(() => {

    loadProductos();

  }, [refresh]);

  // ELIMINAR
  const handleDelete = async (
    id: number
  ) => {

    const confirmar = window.confirm(
      "¿Está seguro de eliminar este producto?"
    );

    if (!confirmar) return;

    try {

      await deleteProducto(id);

      alert(
        "Producto eliminado correctamente"
      );

      loadProductos();

    } catch (error) {

      console.error(error);

      alert(
        "Error al eliminar producto"
      );
    }
  };

  return (
    <div>

      <hr className="my-8" />

      <h2 className="text-2xl font-semibold mb-4">
        Lista de Productos
      </h2>

      <div className="space-y-4">

        {productos.length === 0 ? (

          <p className="text-gray-500">
            No hay productos registrados
          </p>

        ) : (

          productos.map((p) => (

            <div
              key={p.id}
              className="border rounded-lg p-4 shadow-sm bg-gray-50"
            >

              <h3 className="text-xl font-bold">
                {p.name}
              </h3>

              <p>
                <strong>Precio:</strong>
                {" "}
                $
                {p.price}
              </p>

              <p>
                <strong>Descripción:</strong>
                {" "}
                {p.description}
              </p>

              <p>
                <strong>Estado:</strong>
                {" "}
                {p.isActive
                  ? "Activo"
                  : "Inactivo"}
              </p>

              <div className="flex gap-3 mt-4">

                <button
                  onClick={() => onEdit(p)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Editar
                </button>

                <button
                  onClick={() =>
                    handleDelete(p.id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Eliminar
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}