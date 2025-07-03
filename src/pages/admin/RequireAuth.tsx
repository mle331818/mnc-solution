import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/api/admin";

const RequireAuth = () => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

export default RequireAuth; 