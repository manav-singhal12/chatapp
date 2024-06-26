import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:5000", {
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(socket);

            socket.on("connect", () => {
                console.log("Socket connected:", socket.id);
            });

            socket.on("disconnect", () => {
                console.log("Socket disconnected");
            });

            socket.on("getOnlineUsers", (users) => {
                console.log("Received online users:", users);
                setOnlineUsers(users);
            });

            socket.on("newMessage", (message) => {
                console.log("New message received:", message);
                // Handle the new message here
            });

            return () => {
                socket.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;
