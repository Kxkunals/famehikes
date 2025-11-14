import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.send(
      "service_b6xy4ih",   // replace with your EmailJS service ID
      "template_a72eeyj",  // replace with your EmailJS template ID
      formData,
      "ZHoVyUMbMuEhk2-ak"    // replace with your EmailJS public key
    )
    .then(() => {
      alert("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }, (error) => {
      console.error(error);
      alert("Oops, something went wrong. Try again later.");
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <div className="mb-6">
        <p>📞 Phone: <a href="tel:+917055961246" className="text-blue-500">+91 705 596 1246</a></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
          rows="5"
        ></textarea>
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;

