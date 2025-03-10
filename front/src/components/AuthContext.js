import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const LOGIN_API = "http://127.0.0.1:8000/login"

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");


    // Login function
    const login = async (credentials) => {
        try {
            const formDetails = new URLSearchParams();
            formDetails.append('username', credentials.username);
            formDetails.append('password', credentials.password);

            const response = await fetch(LOGIN_API, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded',},
                body: formDetails,
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                localStorage.setItem("token", data.access_token); // Save token
                setError("");
            } else {
                setError(data.detail);
                throw new Error(data.detail);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout , error}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
