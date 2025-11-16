import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const loaction = useLocation();

  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-100  shadow-md z-20">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-8 py-4">
        {/* Logo or Site Name */}
        <div className="text-xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate('/')}>
          DemoSite
        </div>

       
        { loaction.pathname==='/'&&(  <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 border border-gray-700 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-700 hover:text-white transition-all"
        >
          Login
        </button>)}
      </div>
    </nav>
  );
};

export default Navbar;
