import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        const success = handleInputErrors({ username, password });
        if (!success) {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                const decodedToken = jwtDecode(data.token);
                const userData = {
                    ...data,
                    ...decodedToken // Merging the decoded token data with the original data
                };
                localStorage.setItem("chat-user", JSON.stringify(userData));
                localStorage.setItem("token", data.token);
                toast.success("Logged in successfully");
                setAuthUser(userData); // Ensure the user context is updated here
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { login, loading };
};

export default useLogin;

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}
