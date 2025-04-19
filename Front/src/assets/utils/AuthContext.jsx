import { createContext, useContext, useState ,useEffect} from "react";

const AuthContext = createContext();

const GATEAWAY = import.meta.env.VITE_API_GATEAWAY;
const LOGIN_API = GATEAWAY + "/login";
const CHECK_API = GATEAWAY + "/verify-token";
const REGISTER_API = GATEAWAY + "/register";



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserProfile(token);
        }
    }, []);


    const fetchUserProfile = async (token) => {
        try {
            const response = await fetch(CHECK_API, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                console.log("logged out")
                logout(); // Invalid token, clear storage
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    //Register fun
    const register = async(credentials) => {
        const { password2, ...sendCredentials } = credentials;
        const jsonToSend = JSON.stringify(sendCredentials); 
        try {
            const response = await fetch(REGISTER_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Ensure the server knows you're sending JSON
                },
                body: jsonToSend,
            });

            const data = await response.json();
            if (response.ok) {
                setError("");
                const { username, password } = credentials;
                return login({ username, password })
            } else {
                setError({type:"error",message:data.detail});
                throw new Error(data.detail);
            }
        } catch (error) {
            console.error("Register failed:", error);
        }
    }


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
                return true;
            } else {
                setError({type:"error",message:data.detail});
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
        <AuthContext.Provider value={{ user, login, logout , error,setError,fetchUserProfile , register}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
