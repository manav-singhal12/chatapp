import React from 'react';
import useConversation from "../zustand/useConversation";
import { useSocketContext } from '../context/SocketContext';

const Conversation = ({ conversation, lastIdx, emoji }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();

    const isSelected = selectedConversation?._id === conversation._id;
    const isOnline = onlineUsers && onlineUsers.includes(conversation._id);
    console.log(onlineUsers)
    return (
        <>
            <div
                className={`flex gap-2 items-center hover:bg-sky-500 mx-2 my-1 h-16 rounded p-2 py-1 cursor-pointer
                ${isSelected ? "bg-sky-500" : ""}
            `}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className="relative">
                    <div className={`w-12 h-12 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <img className="w-full h-full object-cover rounded-full" src={conversation.profilepic} alt='user avatar' />
                        {isOnline && <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white"></div>}
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold mx-2 text-gray-200'>{conversation.fullname}</p>
                        {/* <span className='text-xl'>{emoji}</span> */}
                    </div>
                </div>
            </div>

            <div className='divider w-3/4 mx-auto bg-white my-0 py-0 h-[0.2vh]' />
        </>
    );
};

export default Conversation;
