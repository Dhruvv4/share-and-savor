import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return true ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
