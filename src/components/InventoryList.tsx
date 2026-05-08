import { useEffect, useState } from "react";

import {
  getInventory,
  deleteInventory,
} from "../api/inventory";

type Inventory = {
  id: number;
  stock: number;

  product: {
    id: number;
    name: string;
  };

  store: {
    id: number;
    name_store: string;
  };
};

type Props = {
  refresh: boolean;
  onEdit: (
    inventory: Inventory
  ) => void;
};

export default function InventoryList({
  refresh,
  onEdit,
}: Props) {

  const [inventory, setInventory] =
    useState<Inventory[]>([]);

  const loadInventory = async () => {

    try {

      const res =
        await getInventory();

      setInventory(res.data);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    loadInventory();

  }, [refresh]);

  const handleDelete = async (
    id: number
  ) => {

    const confirmar = window.confirm(
      "¿Eliminar inventario?"
    );

    if (!confirmar) return;

    try {

      await deleteInventory(id);

      alert(
        "Inventario eliminado"
      );

      loadInventory();

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <div>

      <hr className="my-8" />

      <h2 className="text-2xl font-semibold mb-4">
        Lista de Inventario
      </h2>

      <div className="space-y-4">

        {inventory.map((i) => (

          <div
            key={i.id}
            className="border rounded-lg p-4 shadow-sm bg-gray-50"
          >

            <h3 className="text-xl font-bold">

              {i.product.name}

            </h3>

            <p>
              <strong>Tienda:</strong>
              {" "}
              {i.store.name_store}
            </p>

            <p>
              <strong>Stock:</strong>
              {" "}
              {i.stock}
            </p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() =>
                  onEdit(i)
                }
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                Editar
              </button>

              <button
                onClick={() =>
                  handleDelete(i.id)
                }
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
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