import { useState } from "react";

import StoreForm from "../components/StoreForm";
import StoreList from "../components/StoreList";

type Store = {
  id: number;
  name_store: string;
  address: string;
};

export default function StorePage() {

  const [refresh, setRefresh] =
    useState(false);

  const [storeToEdit, setStoreToEdit] =
    useState<Store | null>(null);

  const handleSuccess = () => {
    setRefresh(!refresh);
  };

  const clearEdit = () => {
    setStoreToEdit(null);
  };

  return (
    <div>

      <h2 className="text-3xl font-bold text-center mb-6">
        Módulo de Tiendas
      </h2>

      <StoreForm
        onSuccess={handleSuccess}
        storeToEdit={storeToEdit}
        clearEdit={clearEdit}
      />

      <StoreList
        refresh={refresh}
        onEdit={(store) =>
          setStoreToEdit(store)
        }
      />

    </div>
  );
}