import axios from "axios";

const API_URL =
  "http://localhost:3000/inventory";

// GET
export const getInventory = () =>
  axios.get(API_URL);

// CREATE
export const createInventory = (
  data: any
) =>
  axios.post(API_URL, data);

// UPDATE
export const updateInventory = (
  id: number,
  data: any
) =>
  axios.put(
    `${API_URL}/${id}`,
    data
  );

// DELETE
export const deleteInventory = (
  id: number
) =>
  axios.delete(
    `${API_URL}/${id}`
  );