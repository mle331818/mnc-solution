import { useState, useEffect } from 'react';
import productsData from '../data/products.json';

export interface Product {
  id: string;
  name: string;
  price: number | string;
  salePrice?: number | string;
  image: string;
  description: string;
  sku?: string;
  barcode?: string;
  stock?: number;
  category: string;
  brand?: string;
  features?: string[];
}

export interface Category {
  title: string;
  description: string;
  products: Product[];
}

export interface ProductsData {
  categories: Record<string, Category>;
}

// Simple product management functions
export const useProducts = () => {
  const [products, setProducts] = useState<ProductsData>(productsData);

  // Get all products from all categories
  const getAllProducts = (): Product[] => {
    return Object.values(products.categories).flatMap(category => category.products);
  };

  // Get products by category
  const getProductsByCategory = (category: string): Product[] => {
    return products.categories[category]?.products || [];
  };

  // Get category info
  const getCategoryInfo = (category: string) => {
    return products.categories[category];
  };

  // Get all categories
  const getAllCategories = () => {
    return Object.keys(products.categories).map(key => ({
      slug: key,
      ...products.categories[key]
    }));
  };

  // Search products
  const searchProducts = (query: string): Product[] => {
    const allProducts = getAllProducts();
    const terms = query.toLowerCase().split(/\s+/);
    
    return allProducts.filter(product => {
      const text = `${product.name} ${product.sku || ''} ${product.description}`.toLowerCase();
      return terms.every(term => text.includes(term));
    });
  };

  // Get product by ID
  const getProductById = (id: string): Product | undefined => {
    const allProducts = getAllProducts();
    return allProducts.find(product => product.id === id);
  };

  return {
    products,
    getAllProducts,
    getProductsByCategory,
    getCategoryInfo,
    getAllCategories,
    searchProducts,
    getProductById
  };
}; 