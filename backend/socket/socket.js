import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors"; // Import the cors package
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

const app = express();

// Add CORS middleware
// app.use(cors({
//     origin: ["http://localhost:3000", "https://chatapp-six-self.vercel.app"], // Allow localhost and your Vercel app
//     methods: ["GET", "POST"],
//     credentials: true,
//     optionsSuccessStatus: 200,
// }));
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    
});

const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);

        const userIdToRemove = Object.keys(userSocketMap).find(
            (key) => userSocketMap[key] === socket.id
        );
        if (userIdToRemove) {
            delete userSocketMap[userIdToRemove];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });

    socket.on("sendMessage", async (messageData) => {
        const { receiverId, message } = messageData;
        const senderId = userId;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        await newMessage.save();

        conversation.messages.push(newMessage._id);
        await conversation.save();

        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // Emit the new message to the sender as well
        socket.emit("newMessage", newMessage);

        console.log("Message sent:", newMessage);
    });
});

export { app, io, server, userSocketMap };

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
