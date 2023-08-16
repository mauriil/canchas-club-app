import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../customHooks/useAuth";

const ProtectedRoute = () => {

  return <Outlet />;
};

export default ProtectedRoute;
