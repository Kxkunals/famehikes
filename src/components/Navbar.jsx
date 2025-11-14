import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          {/* logo mark */}
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold">
          </div>
          <div>
            <div className="text-lg font-bold text-black">Fame<span className="text-red-600">Hikes</span></div>
            <div className="text-xs muted -mt-1">Social Growth • Free Premium</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-orange-500 transition text-[#FFB6A3]">Home</Link>
          <Link to="/services" className="hover:text-orange-500 transition text-[#FFB6A3]">Services</Link>
          <Link to="/pricing" className="hover:text-orange-500 transition text-[#FFB6A3]">Pricing</Link>
          <Link to="/about" className="hover:text-orange-500 transition text-[#FFB6A3]">About</Link>
          <Link to="/contact" className="hover:text-orange-500 transition text-[#FFB6A3]">Contact</Link>
          <div className="flex items-center gap-3 ml-6">
            <a href="#" className="text-lg hover:text-orange-500 text-black"><FaInstagram /></a>
            <a href="#" className="text-lg hover:text-orange-500 text-black"><FaYoutube /></a>
            <a href="#" className="text-lg hover:text-orange-500 text-black"><FaTwitter /></a>
            <a href="#" className="text-lg hover:text-orange-500 text-black"><FaFacebook /></a>
          </div>
          
          {currentUser ? (
            <div className="ml-4 flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-black">
                <FaUser className="text-orange-500" />
                <span className="hidden lg:inline">{currentUser.email?.split('@')[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-black text-sm font-semibold transition-colors"
              >
                <FaSignOutAlt />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="ml-4 flex items-center gap-3">
              <Link to="/login" className="inline-block px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors">
                Login
              </Link>
              <Link to="/signup" className="inline-block px-4 py-2 rounded-full bg-white border-2 border-orange-500 hover:bg-orange-50 text-orange-500 text-sm font-semibold transition-colors">
                Signup
              </Link>
            </div>
          )}
          
          <Link to="/pricing" className="ml-4 inline-block px-4 py-2 rounded-full gold-btn text-sm font-semibold">Buy Now</Link>
        </nav>

        <button className="md:hidden text-xl text-black" onClick={() => setOpen(o => !o)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="glass-card p-4 flex flex-col space-y-3">
            <Link to="/" onClick={() => setOpen(false)} className="text-black">Home</Link>
            <Link to="/services" onClick={() => setOpen(false)} className="text-black">Services</Link>
            <Link to="/pricing" onClick={() => setOpen(false)} className="text-black">Pricing</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="text-black">About</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="text-black">Contact</Link>
            {currentUser ? (
              <>
                <div className="flex items-center gap-2 text-black pt-2 border-t border-gray-200">
                  <FaUser className="text-orange-500" />
                  <span className="text-sm">{currentUser.email?.split('@')[0]}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-black text-sm font-semibold transition-colors"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="text-black">Login</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="text-black">Signup</Link>
              </>
            )}
            <Link to="/pricing" onClick={() => setOpen(false)} className="mt-2 text-center gold-btn py-2 rounded-full font-semibold">Buy Now</Link>
          </div>
        </div>
      )}
    </header>
  );
}
