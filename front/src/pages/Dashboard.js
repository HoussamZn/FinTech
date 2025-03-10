import { useAuth } from "../components/AuthContext";

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <h2>Welcome, {user?.email}</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;