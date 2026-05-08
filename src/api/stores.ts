import axios from "axios";

const API_URL = "http://localhost:3000/store";

export const getStores = () =>
  axios.get(API_URL);

export const createStore = (data: any) =>
  axios.post(API_URL, data);

export const updateStore = (
  id: number,
  data: any
) =>
  axios.patch(`${API_URL}/${id}`, data);

export const deleteStore = (
  id: number
) =>
  axios.delete(`${API_URL}/${id}`);