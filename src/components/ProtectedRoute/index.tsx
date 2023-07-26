import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../customHooks/useAuth";

const ProtectedRoute = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/index/logIn" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
