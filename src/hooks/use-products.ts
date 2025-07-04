import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../api";
import { Product } from "../components/ProductForm";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await getProducts();
      return res.data as Product[];
    },
    staleTime: 1000 * 30, // 30 seconds - more frequent updates
    refetchOnWindowFocus: true, // Refetch when user returns to tab
    refetchOnMount: true, // Always refetch on component mount
    retry: 3, // Retry failed requests
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook for category-specific products
export const useProductsByCategory = (category: string) => {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () => {
      const res = await getProducts();
      const allProducts = res.data as Product[];
      return allProducts.filter(p => p.category === category);
    },
    staleTime: 1000 * 30,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook for single product
export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await getProducts();
      const allProducts = res.data as Product[];
      const product = allProducts.find(p => p._id === id);
      if (!product) throw new Error("Product not found");
      return product;
    },
    enabled: !!id, // Only run if id is provided
    staleTime: 1000 * 60 * 5, // 5 minutes for single product
    retry: 3,
  });
}; 