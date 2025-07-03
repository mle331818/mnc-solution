import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api";
import { Product } from "../components/ProductForm";

export const useProduct = (id: string | undefined) =>
  useQuery<Product>({
    enabled: !!id,
    queryKey: ["product", id],
    queryFn: () => getProduct(id!).then((r) => r.data as Product),
  }); 