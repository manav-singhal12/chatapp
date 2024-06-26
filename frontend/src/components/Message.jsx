import React, { useEffect, useRef } from 'react';
import useConversation from '../zustand/useConversation';
import useGetMessages from '../hooks/useGetMessages';
import useListenMessages from '../hooks/useListenMessages';
import { useAuthContext } from '../context/AuthContext';

const MessageList = () => {
    const { selectedConversation, messages } = useConversation();
    const { authUser } = useAuthContext();
    useGetMessages();
    useListenMessages();
    
    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, selectedConversation]);

    const formatDate = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString([], options);
    };

    return (
        <div className="p-4 space-y-4 overflow-auto max-h-[calc(100vh-8rem)]">
            {selectedConversation && messages[selectedConversation._id]?.map((message) => {
                const isSentByUser = message.senderId === authUser._id;

                return (
                    <div
                        key={message._id}
                        className={`flex ${isSentByUser ? 'justify-end chat-end' : 'justify-start chat-start'}`}
                    >
                        {!isSentByUser && (
                            <img
                                src={selectedConversation.profilepic} // Assuming message.senderPhoto contains the URL to the sender's photo
                                alt="User"
                                className="w-10 h-10 rounded-full mr-2"
                            />
                        )}
                        <div
                            className={`p-2 rounded-lg shadow-md chat-bubble flex ${
                                isSentByUser ? "chat-bubble-primary" : "chat-bubble-secondary"
                            }`}
                        >
                            <p>{message.message}</p>
                            <span className="chat-footer opacity-50 text-xs relative top-3 left-2 flex gap-1 items-center">
                                {formatDate(message.createdAt)}
                            </span>
                        </div>
                    </div>
                );
            })}
            <div ref={bottomRef} />
        </div>
    );
};

export default MessageList;
