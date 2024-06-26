import React, { useState } from 'react';
import { IoIosSend } from "react-icons/io";
import useSentMessage from '../hooks/useSentMessage';
import { useAuthContext } from '../context/AuthContext';

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSentMessage();
    const { authUser } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
    };

    return (
        <form className="send flex" onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Send Message'
                className='sticky bottom-0 z-50 w-full h-16 p-4 border-none focus:outline-none rounded-lg pl-4 ml-2'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className='flex justify-center items-center'>
                {loading ? <div className='loading loading-spinner'></div> : <IoIosSend style={{ color: "white", height: '6vh', width: '6vw' }} />}
            </button>
            {/* <p>{authUser._id}</p> */}
        </form>
    );
};

export default MessageInput;
