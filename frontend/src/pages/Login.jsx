import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/appContext';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin } = useContext(AppContext);

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          navigate('/');
        } else {
          toast.error(data.message || 'Register failed');
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          navigate('/');
        } else {
          toast.error(data.message || 'Login failed');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
   
    <div className="flex justify-center items-center min-h-screen px-6 bg-gray-300 ">
       <Navbar/>
      
      <div className="w-full max-w-md bg-white/90 shadow-2xl rounded-2xl p-8 backdrop-blur-md">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {state === 'Sign Up' ? 'Join us today' : 'Welcome back'}
        </p>

        <form className="flex flex-col space-y-4" onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Full name"
              required
            />
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Email address"
            required
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password"
            required
          />

          {state === 'Login' && (
            <p
              onClick={() => navigate('/Reset')}
              className="text-sm text-left text-blue-600 hover:underline cursor-pointer"
            >
              Forgot password?
            </p>
          )}

          <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300">
            {state}
          </button>

          <p className="text-center text-sm text-gray-600">
            {state === 'Sign Up'
              ? 'Already have an account? '
              : "Don't have an account? "}
            <span
              onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {state === 'Sign Up' ? 'Login' : 'Sign Up'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
