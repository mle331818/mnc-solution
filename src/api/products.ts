import { API_BASE } from '@/lib/getApiBase';

export interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  description: string;
  sku: string;
  barcode?: string;
  stock: number;
  category: string;
  brand: string;
  features?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    current: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CategoryInfo {
  title: string;
  description: string;
  image: string;
}

// Fetch all products with optional filters
export async function fetchProducts(params: Record<string, string> = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${API_BASE}/api/products${query ? `?${query}` : ''}`;
  
  console.log('Fetching products from:', url);
  
  try {
    const res = await fetch(url);
    console.log('Products response status:', res.status);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Products API error:', errorText);
      throw new Error(`Failed to fetch products: ${res.status} ${errorText}`);
    }
    
    const data = await res.json();
    console.log('Products data received:', data.products?.length || 0, 'products');
    return data as ProductsResponse;
  } catch (error) {
    console.error('Products fetch error:', error);
    throw error;
  }
}

// Fetch a single product by ID
export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

// Fetch products by category
export async function fetchProductsByCategory(category: string, params: Record<string, string> = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/api/products/category/${category}${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch products by category');
  return res.json() as Promise<ProductsResponse>;
}

// Fetch products by brand
export async function fetchProductsByBrand(brand: string, params: Record<string, string> = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/api/products/brand/${brand}${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch products by brand');
  return res.json() as Promise<ProductsResponse>;
}

// Fetch all categories
export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/products/categories/list`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

// Fetch all brands
export async function fetchBrands(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/products/brands/list`);
  if (!res.ok) throw new Error('Failed to fetch brands');
  return res.json();
}

// Search products
export async function searchProducts(query: string, params: Record<string, string> = {}) {
  const searchParams = { ...params, search: query };
  const queryString = new URLSearchParams(searchParams).toString();
  const res = await fetch(`${API_BASE}/api/products?${queryString}`);
  if (!res.ok) throw new Error('Failed to search products');
  return res.json() as Promise<ProductsResponse>;
} 