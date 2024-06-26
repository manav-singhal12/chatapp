import React, { useMemo } from 'react';
import { MdEmojiEmotions } from "react-icons/md";
import useGetConversations from '../hooks/useGetConversation';
import { getRandomEmoji } from '../utils/emoji';
import Conversation from './Conversation';

const Users = () => {
    const { loading, conversations } = useGetConversations();

    // Filter out duplicate usernames
    const uniqueConversations = useMemo(() => {
        const seenUsernames = new Set();
        return conversations.filter(conversation => {
            if (seenUsernames.has(conversation.username)) {
                return false;
            }
            seenUsernames.add(conversation.username);
            return true;
        });
    }, [conversations]);

    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {uniqueConversations.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === uniqueConversations.length - 1}
                />
            ))}

            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    );
}

export default Users;
