import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct, deleteProduct } from "../api";
import { Product } from "../components/ProductForm";
import { useToast } from "./use-toast";

export const useProductMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      // Invalidate and refetch products
      queryClient.invalidateQueries({ queryKey: ["products"] });
      
      toast({
        title: "Product Created!",
        description: `${data.data.name} has been successfully added.`,
        duration: 3000,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to create product",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      updateProduct(id, data),
    onSuccess: (data) => {
      // Invalidate and refetch products
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", data.data._id] });
      
      toast({
        title: "Product Updated!",
        description: `${data.data.name} has been successfully updated.`,
        duration: 3000,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update product",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data, variables) => {
      // Invalidate and refetch products
      queryClient.invalidateQueries({ queryKey: ["products"] });
      
      toast({
        title: "Product Deleted!",
        description: "Product has been successfully removed.",
        duration: 3000,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete product",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  return {
    createProduct: createProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
    isCreating: createProductMutation.isPending,
    isUpdating: updateProductMutation.isPending,
    isDeleting: deleteProductMutation.isPending,
  };
}; 