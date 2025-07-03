export interface Product {
  _id?: string;
  id?: string; // for legacy compatibility
  name: string;
  sku: string;
  description: string;
  price: number;
  salePrice?: number;
  brand: string;
  category: string;
  image?: string;
  imageUrl?: string;
  stock?: number;
  isActive?: boolean;
  features?: string[];
  specifications?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
} 