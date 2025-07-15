import { useState, useEffect } from 'react';
import { fetchProducts, fetchProductsByCategory, fetchCategories, fetchBrands, searchProducts, type Product, type ProductsResponse } from '../api/products';

// Category information mapping
const categoryInfo = {
  'cctv': {
    title: 'CCTV Systems',
    description: 'Professional security cameras and surveillance systems',
    image: '/images/categories/cctv.jpg'
  },
  'network-solution': {
    title: 'Network Solutions',
    description: 'Complete networking infrastructure and connectivity solutions',
    image: '/images/categories/network-solution.jpg'
  },
  'softwares': {
    title: 'Software Solutions',
    description: 'Custom software development and business applications',
    image: '/images/categories/softwares.jpg'
  },
  'computer-laptops': {
    title: 'Computers & Laptops',
    description: 'High-quality computers, laptops, and accessories',
    image: '/images/categories/computer-laptops.jpg'
  },
  'satellite': {
    title: 'Satellite Solutions',
    description: 'Satellite communication and broadcasting equipment',
    image: '/images/categories/satellite.jpg'
  },
  'fiber-solution': {
    title: 'Fiber Solutions',
    description: 'Fiber optic networking and connectivity solutions',
    image: '/images/categories/fiber-solution.jpg'
  },
  'interphone-solution': {
    title: 'Interphone Solutions',
    description: 'Professional intercom and communication systems',
    image: '/images/categories/interphone-solution.jpg'
  },
  '3d-printers-cnc': {
    title: '3D Printers & CNC',
    description: '3D printing and CNC machining solutions',
    image: '/images/categories/3d-printers-cnc.jpg'
  },
  'automation-system': {
    title: 'Automation System',
    description: 'Smart automation and control systems for modern homes and businesses',
    image: '/images/categories/automation-system.jpg'
  }
};

export interface CategoryData {
  title: string;
  description: string;
  image: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    hasNext: false,
    hasPrev: false
  });

  // Load initial data with retry logic
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async (retryCount = 0) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Attempting to load data, attempt:', retryCount + 1);

      // Load products, categories, and brands in parallel
      const [productsResponse, categoriesData, brandsData] = await Promise.all([
        fetchProducts({ limit: '100' }),
        fetchCategories(),
        fetchBrands()
      ]);

      setProducts(productsResponse.products);
      setCategories(categoriesData);
      setBrands(brandsData);
      setPagination(productsResponse.pagination);
      
      console.log('Data loaded successfully:', {
        productsCount: productsResponse.products.length,
        categoriesCount: categoriesData.length,
        brandsCount: brandsData.length
      });
    } catch (err) {
      console.error('Error loading products (attempt', retryCount + 1, '):', err);
      
      // Retry logic for network issues
      if (retryCount < 2) {
        console.log('Retrying in 2 seconds...');
        setTimeout(() => loadInitialData(retryCount + 1), 2000);
        return;
      }
      
      setError(err instanceof Error ? err.message : 'Failed to load products. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get all products
  const getAllProducts = (): Product[] => {
    return products;
  };

  // Get products by category
  const getProductsByCategory = async (category: string, page = 1, limit = 50): Promise<ProductsResponse> => {
    try {
      const response = await fetchProductsByCategory(category, { page: page.toString(), limit: limit.toString() });
      return response;
    } catch (err) {
      console.error('Error fetching products by category:', err);
      throw new Error(err instanceof Error ? err.message : 'Failed to fetch products by category');
    }
  };

  // Get category info
  const getCategoryInfo = (category: string): CategoryData | null => {
    return categoryInfo[category as keyof typeof categoryInfo] || null;
  };

  // Get all categories with info
  const getAllCategories = () => {
    return categories.map(category => ({
      slug: category,
      ...getCategoryInfo(category)
    })).filter(cat => cat.title); // Only return categories with info
  };

  // Search products
  const searchProductsByQuery = async (query: string, page = 1, limit = 50): Promise<ProductsResponse> => {
    try {
      const response = await searchProducts(query, { page: page.toString(), limit: limit.toString() });
      return response;
    } catch (err) {
      console.error('Error searching products:', err);
      throw new Error(err instanceof Error ? err.message : 'Failed to search products');
    }
  };

  // Get product by ID
  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product._id === id);
  };

  // Refresh data
  const refreshData = () => {
    loadInitialData();
  };

  return {
    products,
    categories,
    brands,
    loading,
    error,
    pagination,
    getAllProducts,
    getProductsByCategory,
    getCategoryInfo,
    getAllCategories,
    searchProductsByQuery,
    getProductById,
    refreshData
  };
}; 