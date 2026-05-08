import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

// GET ALL
export const getStores = () =>
  API.get("/store");

// CREATE
export const createStore = (data: {
  name_store: string;
  address: string;
}) =>
  API.post("/store", data);

// UPDATE
export const updateStore = (
  id: number,
  data: {
    name_store: string;
    address: string;
  }
) =>
  API.put(`/store/${id}`, data);

// DELETE
export const deleteStore = (
  id: number
) =>
  API.delete(`/store/${id}`);