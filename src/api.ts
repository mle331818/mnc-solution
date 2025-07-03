import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000/api" });

export const getProducts = () => API.get("/products");
export const createProduct = (data: any) => API.post("/products", data);
export const updateProduct = (id: string, data: any) => API.put(`/products/${id}`, data);
export const deleteProduct = (id: string) => API.delete(`/products/${id}`);
export const getProduct = (id: string) => API.get(`/products/${id}`);
export const getProductsByCat = (cat: string) =>
  API.get("/products", { params: { category: cat } }); 