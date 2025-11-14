import React from "react";
import { motion } from "framer-motion";
import { FaYoutube, FaInstagram } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      title: "YouTube Subscribers",
      description: "Boost your channel’s growth with genuine subscribers.",
      icon: <FaYoutube className="text-red-500 text-4xl mb-4" />,
    },
    {
      title: "YouTube Views",
      description: "Get real views to increase engagement and visibility.",
      icon: <FaYoutube className="text-red-500 text-4xl mb-4" />,
    },
    {
      title: "YouTube Likes",
      description: "Enhance your videos’ credibility with authentic likes.",
      icon: <FaYoutube className="text-red-500 text-4xl mb-4" />,
    },
    {
      title: "Instagram Likes",
      description: "Increase the reach of your posts with high-quality likes.",
      icon: <FaInstagram className="text-pink-500 text-4xl mb-4" />,
    },
    {
      title: "Instagram Views",
      description: "Get more visibility on your reels and stories.",
      icon: <FaInstagram className="text-pink-500 text-4xl mb-4" />,
    },
    {
      title: "Instagram Followers",
      description: "Gain authentic followers to build your online presence.",
      icon: <FaInstagram className="text-pink-500 text-4xl mb-4" />,
    },
  ];

  return (
    <section className="py-24 bg-[#fafafa] text-black" id="services">
      <div className="container mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-orange-500 mb-12"
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,215,0,0.5)" }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-orange-500 rounded-2xl p-8 hover:bg-orange-500/10 transition-all"
            >
              <div className="flex flex-col items-center">
                {service.icon}
                <h3 className="text-2xl font-semibold text-orange-500 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
