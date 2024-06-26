import './App.css';
import { Toaster } from "react-hot-toast";
import Signup from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext, AuthContextProvider } from './context/AuthContext';

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className='setcolor min-h-screen min-w-screen '>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to='/signup' />}></Route>
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />}></Route>
          <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />}></Route>
        </Routes>
        <Toaster />
      </div>
    </>
  );
}


export default App;
