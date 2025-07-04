import { useEffect, useState } from "react";
import ProductForm, { Product } from "../components/ProductForm";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const { logout } = useAuth();
  const nav = useNavigate();
  const qc = useQueryClient();

  const checkConnection = async () => {
    try {
      await getProducts();
      setConnected(true);
    } catch {
      setConnected(false);
    }
  };

  const load = () => {
    getProducts()
      .then((res) => setProducts(res.data as Product[]))
      .catch(() => {});
  };

  useEffect(() => {
    load();
    checkConnection();
    const id = setInterval(checkConnection, 10000);
    return () => clearInterval(id);
  }, []);

  const handleSave = async (data: Product) => {
    try {
      if (editing) await updateProduct(editing._id!, data);
      else await createProduct(data);
      setModalOpen(false);
      setEditing(null);
      load();
      qc.invalidateQueries({ queryKey: ["products"] });
      alert("Saved");
    } catch (e) {
      console.error(e);
      alert("Error saving");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete product?")) return;
    try {
      await deleteProduct(id);
      load();
      qc.invalidateQueries({ queryKey: ["products"] });
    } catch (e) {
      console.error(e);
      alert("Error deleting");
    }
  };

  return (
    <div className="p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="space-x-3 flex items-center">
          <span className="flex items-center text-sm">
            <span
              className={`mr-1 inline-block h-3 w-3 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}
            />
            {connected ? "Connected" : "Offline"}
          </span>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded bg-green-600 px-4 py-2 text-white"
          >
            Add Product
          </button>
          <button
            onClick={() => {
              logout();
              nav("/login");
            }}
            className="rounded bg-gray-500 px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Image",
                "Name",
                "Category",
                "Price",
                "Stock",
                "Status",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-4 py-2 text-left text-sm font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p._id} className="text-sm">
                <td className="p-2">
                  {p.image && (
                    <img
                      src={p.image}
                      alt="img"
                      className="h-12 w-12 rounded object-cover"
                    />
                  )}
                </td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.category}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2">{p.stock}</td>
                <td className="p-2">
                  <span
                    className={
                      p.status === "active" ? "text-green-600" : "text-gray-500"
                    }
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditing(p);
                      setModalOpen(true);
                    }}
                    className="rounded bg-blue-500 px-2 py-1 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id!)}
                    className="rounded bg-red-500 px-2 py-1 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <ProductForm
          initial={editing}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
} 