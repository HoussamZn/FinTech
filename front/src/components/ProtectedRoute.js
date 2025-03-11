import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const token = localStorage.getItem("token");

    return user || token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
