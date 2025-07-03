import { Product } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5000";

export async function login(username: string, password: string) {
  // Hard-coded client-side credentials (admin/admin123)
  if (username === "admin" && password === "admin123") {
    localStorage.setItem("mncc2_admin_auth", "true");
    return { success: true };
  }
  return { success: false, message: "Invalid credentials" };
}

export function logout() {
  localStorage.removeItem("mncc2_admin_auth");
}

export function isAuthenticated() {
  return localStorage.getItem("mncc2_admin_auth") === "true";
}

async function request<T>(url: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "Request failed");
  }
  return (await res.json()) as T;
}

export async function getProducts() {
  // Pass limit=0 so the backend returns *all* products (Mongo treats limit(0) as no limit)
  return request<Product[]>("/api/admin/products?limit=0").then((d: any) => d.products ?? d);
}

export async function createProduct(data: FormData) {
  const res = await fetch(`${API_BASE}/api/admin/products`, {
    method: "POST",
    body: data,
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error((await res.json()).message || "Failed to create product");
  }
  return res.json();
}

export async function updateProduct(id: string, data: FormData | Partial<Product>) {
  const isForm = data instanceof FormData;
  const res = await fetch(`${API_BASE}/api/admin/products/${id}`, {
    method: "PUT",
    body: isForm ? (data as FormData) : JSON.stringify(data),
    headers: isForm ? undefined : { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error((await res.json()).message || "Failed to update product");
  }
  return res.json();
}

export async function deleteProduct(id: string) {
  return request(`/api/admin/products/${id}`, { method: "DELETE" });
}

export interface DBStatus {
  connected: boolean;
  dbName?: string;
  host?: string;
  storageSizeMB?: string;
  dataSizeMB?: string;
  message?: string;
}

export async function getDBStatus() {
  return request<DBStatus>("/api/admin/db-status");
} 