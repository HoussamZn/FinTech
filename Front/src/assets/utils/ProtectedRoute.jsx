import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
    const { user, fetchUserProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const checkAuth = async () => {
            if (token && !user) {
                await fetchUserProfile(token);
            }
            setIsLoading(false);
        };
        checkAuth();
    }, [token]);

    if (isLoading) {
        return (
            <div className="flex bg-neutral-50 dark:bg-neutral-950 justify-center items-center h-screen">
                <SyncLoader color="#4f39f6" />
            </div>
        );
    }

    return user || token ? <Outlet /> : <Navigate to="/" />;
};


export default ProtectedRoute;

