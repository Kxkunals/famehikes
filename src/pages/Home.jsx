import React from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { FaInstagram, FaYoutube, FaTiktok, FaFacebook, FaTwitter } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-[#fafafa] text-black min-h-screen font-poppins">
      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-center text-center py-24 px-6 relative overflow-hidden min-h-[600px]">
        {/* Animated orange glow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#fafafa]">
          <motion.div
            className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl top-20 left-10"
            animate={{
              x: [0, 40, -40, 0],
              y: [0, 20, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-orange-400/10 rounded-full blur-3xl bottom-10 right-10"
            animate={{
              x: [0, -30, 30, 0],
              y: [0, -20, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Wizard Illustration - Left Side */}
        <motion.div
          className="hidden lg:block absolute left-10 bottom-20 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative">
            {/* Wizard SVG */}
            <svg
              width="200"
              height="300"
              viewBox="0 0 200 300"
              className="drop-shadow-lg"
            >
              {/* Broomstick */}
              <rect x="80" y="250" width="8" height="40" fill="#8B4513" rx="4" />
              
              {/* Wizard Body */}
              <ellipse cx="100" cy="200" rx="50" ry="60" fill="#8B5CF6" />
              
              {/* Wizard Hat */}
              <path
                d="M 50 120 L 100 60 L 150 120 L 140 140 L 60 140 Z"
                fill="#8B5CF6"
              />
              <circle cx="100" cy="80" r="8" fill="#FFD700" />
              
              {/* Beard */}
              <path
                d="M 70 180 Q 100 200 130 180 Q 120 220 100 240 Q 80 220 70 180"
                fill="#FFFFFF"
              />
              
              {/* Face */}
              <circle cx="90" cy="170" r="4" fill="#000" />
              <circle cx="110" cy="170" r="4" fill="#000" />
              <path
                d="M 90 180 Q 100 185 110 180"
                stroke="#000"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Hands */}
              <circle cx="60" cy="200" r="12" fill="#8B5CF6" />
              <circle cx="140" cy="200" r="12" fill="#8B5CF6" />
            </svg>
            
            {/* Floating Social Media Icons around Wizard */}
            <motion.div
              className="absolute -top-10 -left-10 bg-white rounded-lg p-3 shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FaInstagram className="text-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded p-1" />
            </motion.div>
            
            <motion.div
              className="absolute top-20 -right-10 bg-white rounded-lg p-3 shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              <FaYoutube className="text-2xl text-red-600" />
            </motion.div>
          </div>
        </motion.div>

        {/* Phone Mockup - Right Side */}
        <motion.div
          className="hidden lg:block absolute right-10 bottom-20 z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <div className="relative">
            {/* Large Orange Circle Background */}
            <div className="absolute inset-0 w-64 h-64 bg-orange-500 rounded-full opacity-20 blur-3xl -z-10"></div>
            
            {/* Phone Frame */}
            <motion.div
              className="relative w-48 h-80 bg-white rounded-[2.5rem] p-3 shadow-2xl"
              style={{ transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {/* Phone Screen */}
              <div className="w-full h-full bg-orange-500 rounded-[2rem] p-4 flex flex-col">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-2">
                  <div className="w-8 h-1 bg-orange-300 rounded-full"></div>
                  <div className="w-12 h-1 bg-orange-300 rounded-full"></div>
                </div>
                
                {/* Graph Area */}
                <div className="flex-1 bg-white/10 rounded-lg p-2 mb-2">
                  <svg viewBox="0 0 100 40" className="w-full h-full">
                    <path
                      d="M 0 30 Q 20 20, 40 15 T 80 10 T 100 5"
                      stroke="#1E40AF"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
                
                {/* List Items */}
                <div className="space-y-2 mb-2">
                  <div className="flex items-center gap-2 text-white text-xs">
                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                    <span>Lorem ipsum dolor</span>
                  </div>
                  <div className="flex items-center gap-2 text-white text-xs">
                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                    <span>Lorem ipsum dolor</span>
                  </div>
                </div>
                
                {/* Bottom Navigation */}
                <div className="flex justify-around items-center mt-auto pt-2 border-t border-orange-400/30">
                  <div className="w-6 h-6 bg-orange-300 rounded"></div>
                  <div className="w-6 h-6 bg-orange-300 rounded"></div>
                  <div className="w-6 h-6 bg-orange-300 rounded"></div>
                  <div className="w-6 h-6 bg-orange-300 rounded"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Floating Social Media Bubbles */}
            <motion.div
              className="absolute -left-20 top-10 bg-white rounded-xl p-4 shadow-xl flex items-center gap-2"
              animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FaFacebook className="text-blue-600 text-xl" />
              <span className="text-black text-sm font-semibold">Facebook</span>
            </motion.div>
            
            <motion.div
              className="absolute -right-20 top-20 bg-white rounded-xl p-4 shadow-xl flex items-center gap-2"
              animate={{ x: [0, -10, 0], y: [0, 5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
            >
              <FaTwitter className="text-blue-400 text-xl" />
              <span className="text-black text-sm font-semibold">Twitter</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to <span className="text-orange-500">FameHikes</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-700 mt-4 max-w-2xl text-center z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
           Turn Your Social Media Into a Success Story.
           Authentic Growth. Secure Service. Proven Results.
           Turn Your Social Media Into a Success Story.
           Enjoy our premium side for free.
          </motion.p>

          {/* Explore Button */}
          <motion.div
            className="flex justify-center mt-8 z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
          <ScrollLink
            to="services"
            smooth={true}
            duration={600}
            offset={-80}
            className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>Explore Services</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12l-7.5 7.5M21 12H3"
              />
            </svg>
          </ScrollLink>
        </motion.div>

          {/* Social Media Icons */}
          <motion.div
            className="flex gap-6 mt-12 text-orange-500 text-3xl z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a
              href="#"
              className="hover:text-orange-600 hover:scale-110 transition-all duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-orange-600 hover:scale-110 transition-all duration-300"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              className="hover:text-orange-600 hover:scale-110 transition-all duration-300"
            >
              <FaTiktok />
            </a>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 px-6 bg-gradient-to-b from-[#fafafa] via-[#f5f5f5] to-[#fafafa]">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-orange-500 mb-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Instagram Growth",
                desc: "Get authentic likes, followers, and views to boost your Instagram presence.",
                icon: <FaInstagram />,
              },
              {
                title: "YouTube Boost",
                desc: "Increase your reach with high-quality views, likes, and subscribers.",
                icon: <FaYoutube />,
              },
              {
                title: "TikTok Fame",
                desc: "Level up your TikTok profile with genuine likes and followers.",
                icon: <FaTiktok />,
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white border border-orange-400/30 rounded-2xl p-6 shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl text-orange-500 mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
