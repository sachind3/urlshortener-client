//ProtectedRoute.tsx
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  let location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default ProtectedRoute;
