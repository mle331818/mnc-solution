import React, { useState, FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProducts } from "@/contexts/ProductContext";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  stock?: number;
  image: string;
  description: string;
}

interface FormData {
  name: string;
  category: string;
  price: string;
  salePrice: string;
  stock: string;
  description: string;
  image: File | null;
}

// Predefined categories
const PRODUCT_CATEGORIES = [
  { name: 'CCTV', slug: 'cctv', description: 'Security cameras and surveillance systems' },
  { name: 'Network Solution', slug: 'network-solution', description: 'Latest electronic devices and gadgets' },
  { name: 'Softwares', slug: 'softwares', description: 'Custom software and applications' },
  { name: 'Computer and Laptops', slug: 'computer-laptops', description: 'Quality hardware parts and components' },
  { name: 'Satellite', slug: 'satellite', description: 'Professional business and productivity tools' },
  { name: 'Fiber Solution', slug: 'fiber-solution', description: 'Digital products and online services' },
  { name: 'Interphone Solution', slug: 'interphone-solution', description: 'Expert consultation and advisory services' },
  { name: '3D Printers & CNC', slug: '3d-printers-cnc', description: '3D printing and CNC machining solutions' },
  { name: 'Automation System', slug: 'automation-system', description: 'Smart automation and control systems' }
];

const AdminDashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    price: "",
    salePrice: "",
    stock: "",
    description: "",
    image: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  // Calculate sale percentage
  const calculateSalePercentage = () => {
    const price = parseFloat(formData.price) || 0;
    const salePrice = parseFloat(formData.salePrice) || 0;
    if (price > 0 && salePrice > 0 && salePrice < price) {
      return Math.round(((price - salePrice) / price) * 100);
    }
    return 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const price = parseFloat(formData.price);
      const salePrice = formData.salePrice ? parseFloat(formData.salePrice) : undefined;
      const stock = formData.stock ? parseInt(formData.stock) : undefined;

      const productData = {
        name: formData.name,
        category: formData.category,
        price: price,
        salePrice: salePrice,
        stock: stock,
        description: formData.description,
        image: formData.image ? URL.createObjectURL(formData.image) : "",
      };

      if (selectedProduct) {
        updateProduct(selectedProduct.id, productData);
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        addProduct(productData);
        toast({
          title: "Success",
          description: "Product added successfully",
        });
      }

      // Reset form
      setFormData({
        name: "",
        category: "",
        price: "",
        salePrice: "",
        stock: "",
        description: "",
        image: null,
      });
      setSelectedProduct(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      salePrice: product.salePrice?.toString() || "",
      stock: product.stock?.toString() || "",
      description: product.description,
      image: null,
    });
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      deleteProduct(productId);
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const salePercentage = calculateSalePercentage();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Management Form */}
        <Card>
          <CardHeader>
            <CardTitle>{selectedProduct ? "Edit Product" : "Add New Product"}</CardTitle>
            <CardDescription>
              {selectedProduct ? "Modify existing product details" : "Create a new product listing"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mb-2"
                  required
                />
              </div>
              <div>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                  required
                >
                  <SelectTrigger className="mb-2">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_CATEGORIES.map((category) => (
                      <SelectItem key={category.slug} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  name="price"
                  type="number"
                  placeholder="Original Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mb-2"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Input
                  name="salePrice"
                  type="number"
                  placeholder="Sale Price (optional)"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                  className="mb-2"
                  min="0"
                  step="0.01"
                />
                {salePercentage > 0 && (
                  <div className="text-sm text-green-600 font-medium">
                    Sale: {salePercentage}% OFF
                  </div>
                )}
              </div>
              <div>
                <Input
                  name="stock"
                  type="number"
                  placeholder="Stock Quantity (optional)"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="mb-2"
                  min="0"
                />
              </div>
              <div>
                <Input
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mb-2"
                  required
                />
              </div>
              <div>
                <Input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="mb-2"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {selectedProduct ? "Update Product" : "Add Product"}
                </Button>
                {selectedProduct && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedProduct(null);
                      setFormData({
                        name: "",
                        category: "",
                        price: "",
                        salePrice: "",
                        stock: "",
                        description: "",
                        image: null,
                      });
                    }}
                  >
                    Cancel Edit
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle>Products List</CardTitle>
            <CardDescription>Manage your existing products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => {
                    const salePercentage = product.salePrice && product.price > product.salePrice 
                      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
                      : 0;
                    
                    return (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            {product.salePrice ? (
                              <>
                                <span className="text-red-600 font-semibold">${product.salePrice}</span>
                                <span className="text-gray-400 line-through text-sm">${product.price}</span>
                                <span className="text-green-600 text-xs font-medium">{salePercentage}% OFF</span>
                              </>
                            ) : (
                              <span>${product.price}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {product.stock !== undefined ? (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.stock > 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {product.stock > 5 ? 'In Stock' : 'Low Stock'} ({product.stock})
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard; 