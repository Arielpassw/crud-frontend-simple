import axios from "axios";

const API_URL =
  "http://localhost:3000/store";

// GET
export const getStores = () =>
  axios.get(API_URL);

// CREATE
export const createStore = (
  data: any
) =>
  axios.post(API_URL, data);

// UPDATE
export const updateStore = (
  id: number,
  data: any
) =>
  axios.put(
    `${API_URL}/${id}`,
    data
  );

// DELETE
export const deleteStore = (
  id: number
) =>
  axios.delete(
    `${API_URL}/${id}`
  );