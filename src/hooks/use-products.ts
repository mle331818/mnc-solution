import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api";
import { Product } from "../components/ProductForm";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await getProducts();
      return res.data as Product[];
    },
    staleTime: 1000 * 60, // 1 minute
  });
}; 