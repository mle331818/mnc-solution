import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/types";
import { createProduct, updateProduct } from "@/api/admin";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
}

const ProductForm = ({ open, onOpenChange, product }: Props) => {
  const isEdit = Boolean(product);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState<number | "">("");
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const qc = useQueryClient();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSku(product.sku);
      setDescription(product.description);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setStock(product.stock ?? 0);
      setIsActive(product.isActive ?? true);
    } else {
      setName("");
      setSku("");
      setDescription("");
      setPrice("");
      setBrand("");
      setCategory("");
      setStock("");
      setIsActive(true);
      setImageFile(null);
    }
  }, [product, open]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const form = new FormData();
      form.append("name", name);
      form.append("sku", sku);
      form.append("description", description);
      form.append("price", String(price));
      form.append("brand", brand);
      form.append("category", category);
      form.append("stock", String(stock));
      form.append("isActive", String(isActive));
      if (imageFile) form.append("image", imageFile);

      if (isEdit && product?._id) {
        await updateProduct(product._id, form);
        toast({ title: "Product updated" });
      } else {
        await createProduct(form);
        toast({ title: "Product created" });
      }
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      onOpenChange(false);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} required />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
          />
          <Input
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
          <Input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
          />
          <div className="flex items-center space-x-2">
            <Switch checked={isActive} onCheckedChange={setIsActive} />
            <span>Active</span>
          </div>
          <div>
            <label className="block text-sm mb-1">Image</label>
            <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm; 