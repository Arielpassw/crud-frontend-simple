import { useState } from "react";

import {
  createStore,
  updateStore,
} from "../api/stores";

type Store = {
  id: number;
  name_store: string;
  address: string;
};

type Props = {
  editingStore: Store | null;
  onSaved: () => void;
};

export default function StoreForm({
  editingStore,
  onSaved,
}: Props) {

  const [nameStore, setNameStore] =
    useState(
      editingStore?.name_store || ""
    );

  const [address, setAddress] =
    useState(
      editingStore?.address || ""
    );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      const storeData = {
        name_store: nameStore,
        address,
      };

      // UPDATE
      if (editingStore) {

        await updateStore(
          editingStore.id,
          storeData
        );

        alert(
          "Tienda actualizada correctamente"
        );

      } else {

        // CREATE
        await createStore(storeData);

        alert(
          "Tienda creada correctamente"
        );
      }

      setNameStore("");
      setAddress("");

      onSaved();

    } catch (error) {

      console.error(error);

      alert(
        "Error al guardar tienda"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <h2 className="text-2xl font-semibold">

        {editingStore
          ? "Editar Tienda"
          : "Crear Tienda"}

      </h2>

      <input
        type="text"
        placeholder="Nombre tienda"
        value={nameStore}
        onChange={(e) =>
          setNameStore(
            e.target.value
          )
        }
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="text"
        placeholder="Dirección"
        value={address}
        onChange={(e) =>
          setAddress(
            e.target.value
          )
        }
        className="w-full border p-3 rounded-lg"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >

        {editingStore
          ? "Actualizar"
          : "Guardar"}

      </button>

    </form>
  );
}