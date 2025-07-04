import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct, updateProduct, getDBStatus, DBStatus } from "@/api/admin";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import ProductForm from "./ProductForm";
import { Switch } from "@/components/ui/switch";
import { logout } from "@/api/admin";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["admin-products"],
    queryFn: getProducts,
  });

  const { data: dbStatus } = useQuery<DBStatus>({
    queryKey: ["db-status"],
    queryFn: getDBStatus,
    refetchInterval: 30000, // refresh every 30s
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      toast({ title: "Product deleted" });
      qc.invalidateQueries({ queryKey: ["admin-products"] });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleToggleActive = async (p: Product) => {
    try {
      await updateProduct(p._id!, { isActive: !p.isActive });
      qc.invalidateQueries({ queryKey: ["admin-products"] });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <div className="space-x-2">
          <Button onClick={() => setOpenForm(true)}>Add Product</Button>
          <Button variant="destructive" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4">
        <div className="bg-white p-4 rounded shadow md:w-1/3 w-full">
          <h2 className="font-medium mb-2">Database Status</h2>
          {dbStatus?.connected ? (
            <div className="text-sm space-y-1">
              <p className="text-green-600 font-semibold">Connected</p>
              <p>DB: {dbStatus.dbName}</p>
              <p>Host: {dbStatus.host}</p>
              <p>Storage Used: {dbStatus.storageSizeMB} MB</p>
              <p>Data Size: {dbStatus.dataSizeMB} MB</p>
            </div>
          ) : (
            <p className="text-red-600">Not connected</p>
          )}
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Image</th>
                <th className="px-4 py-2 text-left font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Price</th>
                <th className="px-4 py-2 font-medium">Stock</th>
                <th className="px-4 py-2 font-medium">Active</th>
                <th className="px-4 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products?.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded" />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap max-w-xs truncate">{p.name}</td>
                  <td className="px-4 py-2">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-2">{p.stock ?? 0}</td>
                  <td className="px-4 py-2">
                    <Switch checked={!!p.isActive} onCheckedChange={() => handleToggleActive(p)} />
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <Button size="sm" onClick={() => { setEditing(p); setOpenForm(true); }}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(p._id!)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ProductForm open={openForm} onOpenChange={(o) => { if(!o) setEditing(null); setOpenForm(o); }} product={editing} />
    </div>
  );
};

export default AdminDashboard; 