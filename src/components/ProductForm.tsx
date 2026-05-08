import { useEffect, useState } from "react";
import {
  createProducto,
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
  onSuccess: () => void;
  productToEdit?: Producto | null;
  clearEdit: () => void;
};

export default function ProductForm({
  onSuccess,
  productToEdit,
  clearEdit,
}: Props) {
  // FORM STATE
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Cargar datos cuando editas
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price.toString());
      setDescription(productToEdit.description);
      setIsActive(productToEdit.isActive);
    }
  }, [productToEdit]);

  // LIMPIAR FORM
  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setIsActive(true);
    clearEdit?.();
  };

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        name,
        price: Number(price),
        description,
        isActive,
      };

      if (productToEdit) {
        await updateProducto(productToEdit.id, data);
        alert("Producto actualizado");
      } else {
        await createProducto(data);
        alert("Producto creado");
      }

      resetForm();
      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Error al guardar producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <h2 className="text-2xl font-bold">
        {productToEdit ? "Editar Producto" : "Crear Producto"}
      </h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Activo
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {productToEdit ? "Actualizar" : "Guardar"}
        </button>

        {productToEdit && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}