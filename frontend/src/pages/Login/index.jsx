import React, { useState } from 'react';
import '../style.css';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import uselogin from '../../hooks/uselogin';

const Login = () => {
  const { login, loading } = uselogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800 ">
      <div className="bg-gray-900 container h-[45vh] w-11/12 max-w-md md:h-[63vh] md:w-[55vw] rounded-xl flex flex-col pt-6 items-center gap-6 md:gap-10 text-white">
        <h1 className="font-bold text-2xl md:text-3xl text-white">SIGN IN</h1>
        <div className="flex items-center gap-4 md:gap-8">
          <span className="h-1 w-12 md:w-36 bg-white rounded-full opacity-65"></span>
          <div className="border-2 h-16 w-16 md:h-20 md:w-20 flex justify-center items-center p-4 rounded-full">
            <FaUser className="text-4xl md:text-6xl" />
          </div>
          <span className="h-1 w-12 md:w-36 bg-white rounded-full opacity-65"></span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-4/5 md:w-1/2 gap-4">
          <input 
            type="text" 
            placeholder="Enter your username" 
            className="h-10 p-2 bg-white rounded-xl text-black" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Enter your Password" 
            className="h-10 p-2 bg-white rounded-xl text-black" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <div className="flex justify-between p-2 text-white">
            <p>Don't have an account?</p>
            <Link to="/signup" className="hover:underline hover:text-gray-400">Register</Link>
          </div>
          <button 
            className="btn bg-white text-black hover:text-white hover:bg-blue-950 " 
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
