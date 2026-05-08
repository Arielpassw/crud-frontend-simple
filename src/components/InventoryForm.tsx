import { useEffect, useState } from "react";

import {
  createInventory,
  updateInventory,
} from "../api/inventory";

import { getProductos } from "../api/products";
import { getStores } from "../api/stores";

type Product = {
  id: number;
  name: string;
};

type Store = {
  id: number;
  name_store: string;
};

type Inventory = {
  id: number;
  stock: number;

  product: Product;

  store: Store;
};

type Props = {
  onSuccess: () => void;
  inventoryToEdit?: Inventory | null;
  clearEdit: () => void;
};

export default function InventoryForm({
  onSuccess,
  inventoryToEdit,
  clearEdit,
}: Props) {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [stores, setStores] =
    useState<Store[]>([]);

  const [productId, setProductId] =
    useState("");

  const [storeId, setStoreId] =
    useState("");

  const [stock, setStock] =
    useState("");

  // CARGAR PRODUCTS Y STORES
  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const productsRes =
        await getProductos();

      const storesRes =
        await getStores();

      setProducts(productsRes.data);

      setStores(storesRes.data);

    } catch (error) {

      console.error(error);
    }
  };

  // CARGAR INVENTORY A EDITAR
  useEffect(() => {

    if (inventoryToEdit) {

      setProductId(
        inventoryToEdit.product.id.toString()
      );

      setStoreId(
        inventoryToEdit.store.id.toString()
      );

      setStock(
        inventoryToEdit.stock.toString()
      );
    }

  }, [inventoryToEdit]);

  // LIMPIAR FORM
  const resetForm = () => {

    setProductId("");
    setStoreId("");
    setStock("");

    clearEdit?.();
  };

  // SUBMIT
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const data = {
        productId:
          Number(productId),

        storeId:
          Number(storeId),

        stock:
          Number(stock),
      };

      if (inventoryToEdit) {

        await updateInventory(
          inventoryToEdit.id,
          data
        );

        alert(
          "Inventario actualizado"
        );

      } else {

        await createInventory(data);

        alert(
          "Inventario creado"
        );
      }

      resetForm();

      onSuccess();

    } catch (error) {

      console.error(error);

      alert(
        "Error al guardar inventario"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <h2 className="text-2xl font-semibold">

        {inventoryToEdit
          ? "Editar Inventario"
          : "Crear Inventario"}

      </h2>

      {/* PRODUCTO */}
      <select
        value={productId}
        onChange={(e) =>
          setProductId(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
      >

        <option value="">
          Seleccione un producto
        </option>

        {products.map((p) => (

          <option
            key={p.id}
            value={p.id}
          >
            {p.name}
          </option>

        ))}

      </select>

      {/* TIENDA */}
      <select
        value={storeId}
        onChange={(e) =>
          setStoreId(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
      >

        <option value="">
          Seleccione una tienda
        </option>

        {stores.map((s) => (

          <option
            key={s.id}
            value={s.id}
          >
            {s.name_store}
          </option>

        ))}

      </select>

      {/* STOCK */}
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) =>
          setStock(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
      />

      <div className="flex gap-2">

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >

          {inventoryToEdit
            ? "Actualizar"
            : "Guardar"}

        </button>

        {inventoryToEdit && (

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