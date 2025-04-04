import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({  }) => {
    const { user } = useAuth();
    const token = localStorage.getItem("token");

    return user || token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
