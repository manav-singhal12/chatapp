import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/usesignup';

const Signup = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputs, setInputs] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setInputs({ ...inputs, gender: event.target.value });
  };

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-gray-900 container h-[63vh] w-11/12 max-w-md md:h-[80vh] md:w-[50vw] rounded-xl flex flex-col pt-6 items-center gap-6 md:gap-8 text-white">
        <h1 className='font-bold text-2xl md:text-3xl text-white'>SIGN UP</h1>
        <div className='flex items-center gap-4 md:gap-8'>
          <span className='h-1 w-12 md:w-36 bg-white rounded-full opacity-65'></span>
          <div className="border-2 h-16 w-16 md:h-20 md:w-20 flex justify-center items-center p-4 rounded-full">
            <FaUser className="text-4xl md:text-6xl" />
          </div>
          <span className='h-1 w-12 md:w-36 bg-white rounded-full opacity-65'></span>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col w-3/5 md:w-1/2 gap-4'>
          <input 
            type='text' 
            placeholder='Enter your Full Name' 
            className='h-10 p-2 bg-white rounded-xl text-black' 
            value={inputs.fullname} 
            onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })} 
          />
          <input 
            type='text' 
            placeholder='Enter your username' 
            className='h-10 p-2 bg-white rounded-xl text-black' 
            value={inputs.username} 
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })} 
          />
          <input 
            type='password' 
            placeholder='Enter your Password' 
            className='h-10 p-2 bg-white rounded-xl text-black' 
            value={inputs.password} 
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })} 
          />
          <input 
            type='password' 
            placeholder='Confirm Password' 
            className='h-10 p-2 bg-white rounded-xl text-black' 
            value={inputs.confirmPassword} 
            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} 
          />
          <div className="flex gap-6 md:gap-10 mx-2 md:mx-4">
            <label className="block mb-2">
              <input 
                type="radio" 
                value="Male" 
                checked={selectedOption === 'Male'} 
                onChange={handleOptionChange} 
                className="mr-2" 
              />
              Male
            </label>
            <label className="block mb-2">
              <input 
                type="radio" 
                value="Female" 
                checked={selectedOption === 'Female'} 
                onChange={handleOptionChange} 
                className="mr-2" 
              />
              Female
            </label>
          </div>
          <div className="flex gap-0 justify-between text-white">
            <p className='w-3/4'>Already have an account?</p>
            <Link to="/Login" className='hover:underline hover:textgray-400 w-1/4'>Sign in</Link>
          </div>
          <button 
            className="btn mt-6 bg-white text-black hover:text-white hover:bg-blue-950" 
            disabled={loading}
          >
            {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
