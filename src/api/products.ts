import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

/* API functions*/

// Listar todos los productos(Get)
export const getProductos = () => API.get("/products");

// Obtener un producto por ID (Get)
export const getProductoById = (id: number) => API.get(`/products/${id}`);

// Crear un nuevo producto (Post)
export const createProducto = (data: {
  name: string;
  price: number;
  description: string;
  isActive: boolean;
}) => API.post("/products", data);

// Actualizar un producto existente por ID (Put)
export const updateProducto = (id: number, data: {
  name: string;
  price: number;
  description: string;
  isActive: boolean;
}) => API.put(`/products/${id}`, data);

// Actualizar un producto 
export const patchProducto = (id: number, data: {
  name?: string;
  price?: number;
  description?: string;
  isActive?: boolean;
}) => API.put(`/products/${id}`, data);

// Eliminar un producto por ID (Delete)
export const deleteProducto = (id: number) =>
  API.delete(`/products/${id}`);
