import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

const ProtectedRoute = () => {
    const { user, fetchUserProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");


    return user || token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;

