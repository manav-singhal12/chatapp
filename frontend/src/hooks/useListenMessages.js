import { useEffect } from 'react';
import io from 'socket.io-client';
import useConversation from '../zustand/useConversation';

const useListenMessages = () => {
    const { selectedConversation, addMessage } = useConversation();

    useEffect(() => {
        const socket = io('http://localhost:5000');

        if (selectedConversation?._id) {
            socket.emit('joinRoom', selectedConversation._id);

            socket.on('message', (newMessage) => {
                addMessage(selectedConversation._id, newMessage);
            });
        }

        return () => {
            if (selectedConversation?._id) {
                socket.emit('leaveRoom', selectedConversation._id);
            }
            socket.off('message');
        };
    }, [selectedConversation?._id, addMessage]);

    return null;
};

export default useListenMessages;
