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
  reload: boolean;
};

export default function ProductList({
  reload,
}: Props) {
  const [productos, setProductos] =
    useState<Producto[]>([]);

  // LISTAR PRODUCTOS
  const loadProductos = async () => {
    const res = await getProductos();

    setProductos(res.data);
  };

  // ELIMINAR PRODUCTO
  const handleDelete = async (
    id: number
  ) => {
    await deleteProducto(id);

    loadProductos();
  };

  // CARGAR PRODUCTOS
  useEffect(() => {
    loadProductos();
  }, [reload]);

  return (
    <div>
      <h2>Lista de Productos</h2>

      {productos.length === 0 ? (
        <p>No hay productos registrados</p>
      ) : (
        <ul>
          {productos.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong>
              {" - "}
              ${p.price}
              {" - "}
              {p.description}
              {" - "}
              {p.isActive
                ? "Activo"
                : "Inactivo"}

              <button
                onClick={() =>
                  handleDelete(p.id)
                }
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}