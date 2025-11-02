import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          {/* logo mark */}
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-bold">
          </div>
          <div>
            <div className="text-lg font-bold text-white">Fame<span className="text-muted">Hikes</span></div>
            <div className="text-xs muted -mt-1">Social Growth • Free Premium</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/services" className="hover:text-yellow-400 transition">Services</Link>
          <Link to="/pricing" className="hover:text-yellow-400 transition">Pricing</Link>
          <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
          <div className="flex items-center gap-3 ml-6">
            <a href="#" className="text-lg hover:text-yellow-400"><FaInstagram /></a>
            <a href="#" className="text-lg hover:text-yellow-400"><FaYoutube /></a>
            <a href="#" className="text-lg hover:text-yellow-400"><FaTwitter /></a>
            <a href="#" className="text-lg hover:text-yellow-400"><FaFacebook /></a>
          </div>
          <Link to="/pricing" className="ml-4 inline-block px-4 py-2 rounded-full gold-btn text-sm font-semibold">Buy Now</Link>
        </nav>

        <button className="md:hidden text-xl" onClick={() => setOpen(o => !o)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="glass-card p-4 flex flex-col space-y-3">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link to="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Link to="/pricing" onClick={() => setOpen(false)} className="mt-2 text-center gold-btn py-2 rounded-full font-semibold text-black">Buy Now</Link>
          </div>
        </div>
      )}
    </header>
  );
}
