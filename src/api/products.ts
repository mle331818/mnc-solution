import { API_BASE } from '@/lib/getApiBase';

export async function fetchProducts(params: Record<string,string> = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/api/products${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json().then(d=> d.products ?? d);
}

export async function fetchProductById(id: string) {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
} 