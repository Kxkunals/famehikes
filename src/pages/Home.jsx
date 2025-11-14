import React from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-[#fafafa] text-black min-h-screen font-poppins">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 relative overflow-hidden">
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

        {/* Text Content */}
        <motion.h1
          className="text-5xl md:text-6xl font-bold z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-orange-500">FameHikes</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-700 mt-4 max-w-2xl z-10"
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
