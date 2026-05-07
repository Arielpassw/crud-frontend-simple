import { useEffect, useState } from "react";

import {
  createProducto,
  getProductos,
  deleteProducto,
  updateProducto,
} from "../api/products";

type Producto = {
  id: number;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
};

type Props = {
  onCreated?: () => void;
};

export default function ProductForm({
  onCreated,
}: Props) {

  // FORM
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] =
    useState("");
  const [isActive, setIsActive] =
    useState(true);

  // LISTA
  const [productos, setProductos] =
    useState<Producto[]>([]);

  // EDIT
  const [editingId, setEditingId] =
    useState<number | null>(null);

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

  useEffect(() => {
    loadProductos();
  }, []);

  // CREAR / ACTUALIZAR
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      const productoData = {
        name,
        price: Number(price),
        description,
        isActive,
      };

      // UPDATE
      if (editingId) {

        await updateProducto(
          editingId,
          productoData
        );

        alert(
          "Producto actualizado correctamente"
        );

        setEditingId(null);

      } else {

        // CREATE
        await createProducto(
          productoData
        );

        alert(
          "Producto guardado correctamente"
        );
      }

      // LIMPIAR FORM
      setName("");
      setPrice("");
      setDescription("");
      setIsActive(true);

      // RECARGAR LISTA
      loadProductos();

      // CALLBACK OPCIONAL
      onCreated?.();

    } catch (error) {

      console.error(error);

      alert(
        "Error al guardar el producto"
      );
    }
  };

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

  // EDITAR
  const handleEdit = (
    producto: Producto
  ) => {

    setEditingId(producto.id);

    setName(producto.name);

    setPrice(
      producto.price.toString()
    );

    setDescription(
      producto.description
    );

    setIsActive(
      producto.isActive
    );
  };

  return (
    <div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <h2 className="text-2xl font-semibold">

          {editingId
            ? "Editar Producto"
            : "Crear Producto"}

        </h2>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
        />

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) =>
              setIsActive(
                e.target.checked
              )
            }
          />

          Activo

        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >

          {editingId
            ? "Actualizar"
            : "Guardar"}

        </button>

      </form>

      <hr className="my-8" />

      <h2 className="text-2xl font-semibold mb-4">
        Lista de Productos
      </h2>

      <div className="space-y-4">

        {productos.map((p) => (

          <div
            key={p.id}
            className="border rounded-lg p-4 shadow-sm bg-gray-50"
          >

            <h3 className="text-xl font-bold">
              {p.name}
            </h3>

            <p>
              <strong>Precio:</strong>
              {" "}$
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
                onClick={() =>
                  handleEdit(p)
                }
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Editar
              </button>

              <button
                onClick={() =>
                  handleDelete(p.id)
                }
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Eliminar
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}