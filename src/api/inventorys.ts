import axios from "axios";

const API_URL =
  "http://localhost:3000/inventory";

export const getInventory = () =>
  axios.get(API_URL);

export const createInventory = (
  data: any
) =>
  axios.post(API_URL, data);

export const updateInventory = (
  id: number,
  data: any
) =>
  axios.patch(
    `${API_URL}/${id}`,
    data
  );

export const deleteInventory = (
  id: number
) =>
  axios.delete(`${API_URL}/${id}`);