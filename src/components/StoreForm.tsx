import { useEffect, useState } from "react";

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
  onSuccess: () => void;
  storeToEdit?: Store | null;
  clearEdit: () => void;
};

export default function StoreForm({
  onSuccess,
  storeToEdit,
  clearEdit,
}: Props) {

  const [nameStore, setNameStore] =
    useState("");

  const [address, setAddress] =
    useState("");

  useEffect(() => {

    if (storeToEdit) {

      setNameStore(
        storeToEdit.name_store
      );

      setAddress(
        storeToEdit.address
      );
    }

  }, [storeToEdit]);

  // LIMPIAR FORM
  const resetForm = () => {

    setNameStore("");
    setAddress("");

    clearEdit?.();
  };

  // SUBMIT
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const data = {
        name_store: nameStore,
        address,
      };

      if (storeToEdit) {

        await updateStore(
          storeToEdit.id,
          data
        );

        alert(
          "Tienda actualizada"
        );

      } else {

        await createStore(data);

        alert(
          "Tienda creada"
        );
      }

      resetForm();

      onSuccess();

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

        {storeToEdit
          ? "Editar Tienda"
          : "Crear Tienda"}

      </h2>

      <input
        type="text"
        placeholder="Nombre de tienda"
        value={nameStore}
        onChange={(e) =>
          setNameStore(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="text"
        placeholder="Dirección"
        value={address}
        onChange={(e) =>
          setAddress(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
      />

      <div className="flex gap-2">

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >

          {storeToEdit
            ? "Actualizar"
            : "Guardar"}

        </button>

        {storeToEdit && (

          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg"
          >
            Cancelar
          </button>

        )}

      </div>

    </form>
  );
}