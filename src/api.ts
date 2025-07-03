import axios from "axios";

// Determine the API base URL based on environment
const getApiBaseUrl = () => {
  // Check for Vite environment variable first
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Fallback to environment-based logic
  if (import.meta.env.PROD) {
    // Use your actual Vercel backend deployment URL
    return "https://mnc-solution-backend.vercel.app/api";
  }
  return "http://localhost:4000/api";
};

const API = axios.create({ 
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for logging
API.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Product API functions
export const getProducts = () => API.get("/products");
export const createProduct = (data: any) => API.post("/products", data);
export const updateProduct = (id: string, data: any) => API.put(`/products/${id}`, data);
export const deleteProduct = (id: string) => API.delete(`/products/${id}`);
export const getProduct = (id: string) => API.get(`/products/${id}`);
export const getProductsByCat = (cat: string) =>
  API.get("/products", { params: { category: cat } });

// Health check
export const checkApiHealth = () => API.get("/health");

export default API; 