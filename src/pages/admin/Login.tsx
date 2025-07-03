import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "@/api/admin";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(username, password);
    setLoading(false);
    if (res.success) {
      toast({ title: "Login successful" });
      navigate(from, { replace: true });
    } else {
      toast({ title: "Login failed", description: res.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow p-8 space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center">Admin Login</h1>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login; 