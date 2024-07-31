import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, setMessages } = useConversation();
    const { authUser } = useAuthContext();

    useEffect(() => {
        let intervalId;

        const getMessages = async () => {
            if (!selectedConversation?._id || !authUser?._id) {
                return;
            }
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    `https://chatapp-0jtv.onrender.com/api/messages/${selectedConversation._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();

                if (response.ok) {
                    setMessages(selectedConversation._id, data);
                } else {
                    throw new Error(data.error || "Failed to fetch messages");
                }
            } catch (error) {
                console.error("Error fetching messages:", error.message);
                toast.error(error.message || "Failed to fetch messages");
            } finally {
                setLoading(false);
            }
        };

        getMessages();

        if (selectedConversation?._id && authUser?._id) {
            intervalId = setInterval(getMessages, 2000);  // Reduced interval
        }

        return () => clearInterval(intervalId);
    }, [selectedConversation?._id, authUser?._id, setMessages]);

    return { loading };
};

export default useGetMessages;
