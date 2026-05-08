import { useState } from "react";

import InventoryForm from "../components/InventoryForm";
import InventoryList from "../components/InventoryList";

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

export default function InventoryPage() {

  const [refresh, setRefresh] =
    useState(false);

  const [inventoryToEdit,
    setInventoryToEdit] =
    useState<Inventory | null>(null);

  const handleSuccess = () => {
    setRefresh(!refresh);
  };

  const clearEdit = () => {
    setInventoryToEdit(null);
  };

  return (
    <div>

      <h2 className="text-3xl font-bold text-center mb-6">
        Módulo de Inventario
      </h2>

      <InventoryForm
        onSuccess={handleSuccess}
        inventoryToEdit={inventoryToEdit}
        clearEdit={clearEdit}
      />

      <InventoryList
        refresh={refresh}
        onEdit={(inventory) =>
          setInventoryToEdit(inventory)
        }
      />

    </div>
  );
}