import React, { useEffect } from 'react';
import useConversation from '../zustand/useConversation';
import { useAuthContext } from '../context/AuthContext';
import MessageInput from './MessageInput';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import useListenMessages from '../hooks/useListenMessages';
import { TiMessages } from "react-icons/ti";
const Messages = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { messages, loading } = useGetMessages();
    useListenMessages();

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    const { authUser } = useAuthContext();

    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    <div className="name font-bold text-3xl p-4 gap-7 l flex items-center border-b-2 border-white text-white sticky top-0 z-50 bg-black">
                        <img className='h-16 w-16' src={selectedConversation.profilepic} alt="User Avatar" />
                        <p>{selectedConversation.fullname}</p>
                    </div>
                    <div className="overflow-auto min-h-[79vh] max-h-[80vh] overflow-scrol">
                        <Message messages={messages} loading={loading} />
                        {/* {loading && <p>Loading messages...</p>} */}
                    </div>
                    <MessageInput />
                </>
            )}
        </div>
    );
};

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className=''>
            <div className='flex justify-center items-center flex-col m-10 text-4xl font-bold'>
                <p className='f'>Welcome 👋 {authUser.fullname} </p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};

export default Messages;
