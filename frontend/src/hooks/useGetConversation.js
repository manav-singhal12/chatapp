import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const { authUser } = useAuthContext(); // Assuming authUser contains user data including token

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token") || authUser?.token; // Check both localStorage and context for token

                if (!token) {
                    throw new Error("No token found");
                }

                const res = await fetch("https://chatapp-0jtv.onrender.com/api/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (res.ok) {
                    const loggedInUserId = authUser._id; // Use authUser from context
                    const filteredConversations = data.filter(user => user._id !== loggedInUserId);
                    setConversations(filteredConversations);
                } else {
                    throw new Error(data.error || "Failed to fetch conversations");
                }
            } catch (error) {
                console.error("Error fetching conversations:", error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (authUser) {
            getConversations();
        }
    }, [authUser]);

    return { loading, conversations };
};

export default useGetConversations;
