import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Users from '../../components/Users';
import Messages from '../../components/Messages';
import useLogout from '../../hooks/uselogout';
import MessageInput from '../../components/MessageInput';
import useAuthContext from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversation';

const Home = () => {
  const { loading, handleLogout } = useLogout();
  const { authUser } = useAuthContext();
  const [search, setSearch] = useState("");

  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()));

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen min-w-screen'>
      <div className="left w-full md:w-[30vw] border-r-2 border-white">
        <div className="sticky top-0 z-50 bg-black">
          <div className="flex  md:flex-row items-center p-4 gap-2">
            <img
              className='h-12 w-12 cursor-pointer'
              src={authUser.profilepic}
              alt="User Avatar"
            />
            <form onSubmit={handleSubmit} className="flex items-center mt-2 md:mt-0 w-full">
              <input
                type="text"
                className="w-full md:w-[20vw] px-4 py-2 text-gray-700 focus:outline-none rounded-l-full"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 h-10 w-10 flex justify-center items-center hover:bg-blue-600 transition-colors duration-200 rounded-r-full"
              >
                <FaSearch style={{ color: "white", height: '1.5rem', width: '1.5rem' }} />
              </button>
            </form>
          </div>
          <div className="border-b-2 mx-auto"></div>
        </div>
        <div className="Userss overflow-auto max-h-[70vh] md:max-h-[80vh] border-b-2">
          <Users />
        </div>
        <div className="logout  m-2 h-16 fixed bottom-0 ">
        
              <button onClick={handleLogout}><a href="#" class="btn btn-info btn-lg">
        <i class="fa-solid fa-right-from-bracket"></i> Log out
        </a></button>
      
        </div>
      </div>
      <div className="right w-full md:w-[70vw]">
        <Messages />
        {/* <div className="fixed bottom-0 left-0 right-0 bg-black p-4 md:static">
          <MessageInput />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
