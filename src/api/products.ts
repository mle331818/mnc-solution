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

// Helper function to create fetch with timeout
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// Fetch all products with optional filters
export async function fetchProducts(params: Record<string, string> = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE}/api/products${query ? `?${query}` : ''}`;
    console.log('Fetching products from:', url);
    
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<ProductsResponse>;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to load products. Please check your connection and try again.');
  }
}

// Fetch a single product by ID
export async function fetchProductById(id: string): Promise<Product> {
  try {
    const url = `${API_BASE}/api/products/${id}`;
    console.log('Fetching product by ID from:', url);
    
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Failed to load product details. Please try again.');
  }
}

// Fetch products by category
export async function fetchProductsByCategory(category: string, params: Record<string, string> = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE}/api/products/category/${category}${query ? `?${query}` : ''}`;
    console.log('Fetching products by category from:', url);
    
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch products by category: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<ProductsResponse>;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Failed to load category products. Please try again.');
  }
}

// Fetch products by brand
export async function fetchProductsByBrand(brand: string, params: Record<string, string> = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE}/api/products/brand/${brand}${query ? `?${query}` : ''}`;
    console.log('Fetching products by brand from:', url);
    
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch products by brand: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<ProductsResponse>;
  } catch (error) {
    console.error('Error fetching products by brand:', error);
    throw new Error('Failed to load brand products. Please try again.');
  }
}

// Fetch all categories
export async function fetchCategories(): Promise<string[]> {
  try {
    const url = `${API_BASE}/api/products/categories/list`;
    console.log('Fetching categories from:', url);
    
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to load categories. Please try again.');
  }
}

// Fetch all brands
export async function fetchBrands(): Promise<string[]> {
  try {
    const url = `${API_BASE}/api/products/brands/list`;
    console.log('Fetching brands from:', url);
    
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch brands: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw new Error('Failed to load brands. Please try again.');
  }
}

// Search products
export async function searchProducts(query: string, params: Record<string, string> = {}) {
  try {
    const searchParams = { ...params, search: query };
    const queryString = new URLSearchParams(searchParams).toString();
    const url = `${API_BASE}/api/products?${queryString}`;
    console.log('Searching products from:', url);
    
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      throw new Error(`Failed to search products: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<ProductsResponse>;
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Failed to search products. Please try again.');
  }
} 