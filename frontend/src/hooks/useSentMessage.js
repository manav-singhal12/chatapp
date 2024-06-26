import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";

const useSentMessage = () => {
    const [loading, setLoading] = useState(false);
    const { setMessages, selectedConversation } = useConversation();
    const { socket } = useSocketContext();

    const sendMessage = async (message) => {
        if (!selectedConversation) {
            toast.error("No conversation selected");
            return;
        }

        setLoading(true);
        try {
            const messageData = {
                receiverId: selectedConversation._id,
                message,
            };

            if (socket) {
                socket.emit("sendMessage", messageData);
                // toast.success("Message sent successfully");
            } else {
                toast.error("Socket not connected");
            }
        } catch (error) {
            console.error("Error sending message:", error.message);
            toast.error(error.message || "Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
};

export default useSentMessage;
