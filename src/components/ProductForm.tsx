import { useEffect, useState } from "react";
import { CATEGORIES } from "../lib/categories";

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number | string;
  stock: number | string;
  status: "active" | "inactive";
  image: string;
  sku?: string;
}

interface Props {
  initial?: Product | null;
  onClose: () => void;
  onSave: (p: Product) => void;
}

const empty: Product = {
  name: "",
  description: "",
  category: CATEGORIES[0],
  price: "",
  stock: "",
  status: "active",
  image: "",
};

export default function ProductForm({ initial, onClose, onSave }: Props) {
  const [data, setData] = useState<Product>(initial ?? empty);

  useEffect(() => setData(initial ?? empty), [initial]);

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setData((d) => ({ ...d, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...data, price: Number(data.price), stock: Number(data.stock) });
  };

  const input = (
    key: keyof Product,
    placeholder: string,
    type: string = "text"
  ) => (
    <input
      required
      className="w-full rounded border px-3 py-2"
      placeholder={placeholder}
      type={type}
      value={data[key] as string}
      onChange={(e) => setData({ ...data, [key]: e.target.value })}
    />
  );

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">
      <form
        onSubmit={submit}
        className="w-full max-w-lg space-y-4 rounded bg-white p-6 shadow-lg overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-xl font-semibold">
          {initial ? "Edit Product" : "Add Product"}
        </h2>
        {input("name", "Name")}
        {input("description", "Description")}
        <select
          className="w-full rounded border px-3 py-2"
          value={data.category}
          onChange={(e) => setData({ ...data, category: e.target.value })}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {input("price", "Price", "number")}
        {input("stock", "Stock", "number")}
        <div className="flex items-center gap-3">
          <span>Status:</span>
          <select
            className="border rounded px-2 py-1"
            value={data.status}
            onChange={(e) =>
              setData({ ...data, status: e.target.value as "active" | "inactive" })
            }
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <input type="file" accept="image/*" onChange={handleImg} />
        {data.image && (
          <img src={data.image} alt="preview" className="h-24 object-contain" />
        )}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
} 