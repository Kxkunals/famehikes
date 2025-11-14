import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook, FaWhatsapp, FaShoppingCart, FaUserPlus, FaClipboardList, FaGoogle } from "react-icons/fa";

const Home = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                G
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></div>
            </div>
            <div>
              <div className="text-xl font-bold text-black">
                GROW <span className="relative">UP<span className="text-red-500">↑</span>karo</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <FaFacebook className="text-blue-600 text-xs" />
                <FaInstagram className="text-pink-600 text-xs" />
                <FaYoutube className="text-red-600 text-xs" />
                <FaTwitter className="text-blue-400 text-xs" />
                <span className="text-red-500 text-xs ml-2">🎲🎲</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link to="/login" className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition">
              <FaShoppingCart className="text-sm" />
              <span className="text-sm font-medium">Login</span>
            </Link>
            <Link to="/signup" className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition">
              <FaUserPlus className="text-sm" />
              <span className="text-sm font-medium">Signup</span>
            </Link>
            <Link to="/services" className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition">
              <FaClipboardList className="text-sm" />
              <span className="text-sm font-medium">Services</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="space-y-6">
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight">
              Nº1 SMM Panel Provider
            </h1>

            {/* Tagline */}
            <p className="text-lg text-gray-700">
              Cheapest Price, Highest Quality, Fastest Delivery, 24/7 Support
            </p>

            {/* Question */}
            <p className="text-2xl font-bold italic text-black mt-8">
              How To Login & Singup?
            </p>

            {/* Wizard Illustration Section */}
            <div className="relative mt-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-100 relative overflow-visible">
                {/* Wizard Character - Centered */}
                <div className="flex items-center justify-center mb-8 relative z-10">
                  <div className="relative">
                    <div className="w-40 h-40 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-7xl shadow-lg">
                      🧙
                    </div>
                    {/* Purple hat with stars effect */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-purple-600 rounded-t-full"></div>
                  </div>
                </div>

                {/* Floating Social Media Metrics */}
                <div className="relative space-y-4">
                  {/* Instagram Followers - Left side */}
                  <div className="bg-black text-white p-3 rounded-lg flex items-center gap-3 shadow-lg relative -left-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaInstagram className="text-white text-xs" />
                    </div>
                    <div className="text-sm font-semibold">56456 Instagram Followers</div>
                  </div>

                  {/* Facebook Growth - Below wizard */}
                  <div className="bg-black text-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <FaFacebook className="text-blue-500 text-lg" />
                      <span className="font-semibold text-sm">Facebook</span>
                    </div>
                    <p className="text-xs text-gray-300 mb-2">Sed ut perspiciatis unde omnis iste</p>
                    <div className="text-orange-500 font-bold text-sm">30.00% Growth</div>
                  </div>

                  {/* YouTube Subscribers - Right side */}
                  <div className="bg-black text-white p-3 rounded-lg flex items-center gap-3 shadow-lg relative -right-4">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaYoutube className="text-white text-xs" />
                    </div>
                    <div className="text-sm font-semibold">1456 Youtube Subscribers</div>
                  </div>

                  {/* Emoji Stack - Right side floating */}
                  <div className="flex gap-2 justify-end mt-4">
                    <span className="text-4xl transform hover:scale-110 transition-transform">😊</span>
                    <span className="text-4xl transform hover:scale-110 transition-transform">😉</span>
                    <span className="text-4xl transform hover:scale-110 transition-transform">😂</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
              {/* Login Form */}
              <form className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username or Email
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username or Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg"
                >
                  Log In
                </button>
              </form>

              {/* Google Login */}
              <div className="mt-6">
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center gap-3">
                  <FaGoogle className="text-xl" />
                  <span>Continue with Google</span>
                </button>
              </div>

              {/* Signup Prompt */}
              <div className="mt-6 text-center">
                <p className="text-gray-700 mb-3">Do not have an account?</p>
                <Link
                  to="/signup"
                  className="inline-block w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
          aria-label="WhatsApp Support"
        >
          <FaWhatsapp className="text-white text-2xl" />
        </a>
      </div>
    </div>
  );
};

export default Home;
