import { useEffect, useState } from "react";

import {
  getStores,
  deleteStore,
} from "../api/stores";

type Store = {
  id: number;
  name_store: string;
  address: string;
};

type Props = {
  reload: boolean;
  onEdit: (store: Store) => void;
};

export default function StoreList({
  reload,
  onEdit,
}: Props) {

  const [stores, setStores] =
    useState<Store[]>([]);

  const loadStores = async () => {

    try {

      const res = await getStores();

      setStores(res.data);

    } catch (error) {

      console.error(error);

      alert(
        "Error al cargar tiendas"
      );
    }
  };

  useEffect(() => {
    loadStores();
  }, [reload]);

  const handleDelete = async (
    id: number
  ) => {

    const confirmar = window.confirm(
      "¿Desea eliminar esta tienda?"
    );

    if (!confirmar) return;

    try {

      await deleteStore(id);

      alert(
        "Tienda eliminada correctamente"
      );

      loadStores();

    } catch (error) {

      console.error(error);

      alert(
        "Error al eliminar tienda"
      );
    }
  };

  return (
    <div>

      <h2 className="text-2xl font-semibold mb-4">
        Lista de Tiendas
      </h2>

      <div className="space-y-4">

        {stores.map((s) => (

          <div
            key={s.id}
            className="border rounded-lg p-4 shadow-sm bg-gray-50"
          >

            <h3 className="text-xl font-bold">
              {s.name_store}
            </h3>

            <p>
              <strong>Dirección:</strong>
              {" "}
              {s.address}
            </p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() =>
                  onEdit(s)
                }
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Editar
              </button>

              <button
                onClick={() =>
                  handleDelete(s.id)
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