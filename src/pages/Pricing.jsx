import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaChartLine, FaRocket, FaStar, FaUsers } from "react-icons/fa";
import axios from "axios";
import { saveTransaction } from "../utils/transactionStorage";

const Pricing = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [message, setMessage] = useState("");

  const services = [
    { id: 1, name: "Instagram Followers", price: 100, serviceId: 2010 },
    { id: 2, name: "Instagram Likes", price: 80, serviceId: 2009 },
    { id: 3, name: "YouTube Views", price: 150, serviceId: 3001 },
    { id: 4, name: "YouTube Likes", price: 120, serviceId: 3002 },
  ];

  const handleOrder = async () => {
    if (!selectedService || !quantity || !link) {
      setMessage("⚠️ Please fill all fields: link and quantity are required.");
      return;
    }

    const amount = Number(selectedService.price * (quantity / 1000));
    console.log("Creating order with amount:", amount);

    try {
      const response = await axios.post(
        "https://famehikes-backend.onrender.com/api/order",
        { amount }
      );

      console.log("Order response:", response.data);

      if (!response.data.success) {
        setMessage("❌ Failed to create order on server.");
        return;
      }

      // Store order details for verification
      const orderDetails = {
        serviceId: selectedService.serviceId,
        serviceName: selectedService.name,
        link: link,
        quantity: quantity,
        amount: amount
      };

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // frontend public key
        amount: response.data.amount, // in paise
        currency: response.data.currency,
        name: "FameHikes",
        description: selectedService.name,
        order_id: response.data.orderId,
        handler: async function (razorpayResponse) {
          // Payment successful - now verify and deliver service
          setMessage("🔄 Verifying payment and delivering service...");
          
          try {
            // Send payment details to backend for verification
            const verifyResponse = await axios.post(
              "https://famehikes-backend.onrender.com/api/payment/verify",
              {
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
                link: orderDetails.link,
                quantity: orderDetails.quantity,
                serviceId: orderDetails.serviceId,
                serviceName: orderDetails.serviceName
              }
            );

            console.log("Payment verification response:", verifyResponse.data);

            if (verifyResponse.data.success) {
              // Payment verified and service delivered
              // Save transaction to history
              saveTransaction({
                serviceName: orderDetails.serviceName,
                serviceId: orderDetails.serviceId,
                quantity: orderDetails.quantity,
                amount: orderDetails.amount,
                link: orderDetails.link,
                paymentId: razorpayResponse.razorpay_payment_id,
                orderId: razorpayResponse.razorpay_order_id,
                smmOrderId: verifyResponse.data.smmOrderId || null,
                status: 'success'
              });
              
              setMessage(
                `✅ ${verifyResponse.data.message}\nPayment ID: ${razorpayResponse.razorpay_payment_id}`
              );
            } else {
              // Payment verification failed
              setMessage(
                `❌ ${verifyResponse.data.message || "Payment verification failed"}`
              );
            }
          } catch (verifyError) {
            console.error("Payment verification error:", verifyError);
            setMessage(
              `⚠️ Payment received but verification failed. Please contact support with Payment ID: ${razorpayResponse.razorpay_payment_id}`
            );
          }

          // Reset form after 3 seconds
          setTimeout(() => {
            setConfirmation(false);
            setSelectedService(null);
            setLink("");
            setQuantity("");
            setMessage("");
          }, 3000);
        },
        modal: {
          ondismiss: function() {
            setMessage("⚠️ Payment cancelled by user.");
          }
        },
        prefill: {
          // Optional: you can prefill email/name if you want
        },
        theme: { color: "#FF6B35" }, // Orange theme to match your design
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setMessage(
          `❌ Payment failed. Error: ${response.error.description || "Unknown error"}`
        );
      });
      
      rzp.open();

    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-black flex flex-col items-center justify-center py-10 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Social Media Icons */}
        <motion.div
          className="absolute top-20 left-10 bg-white rounded-full p-4 shadow-lg"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaInstagram className="text-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-full p-2" />
        </motion.div>
        
        <motion.div
          className="absolute top-40 right-20 bg-white rounded-full p-4 shadow-lg"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <FaYoutube className="text-3xl text-red-600" />
        </motion.div>

        {/* Growth Chart Illustration */}
        <motion.div
          className="absolute bottom-32 left-20 hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="bg-white rounded-xl p-6 shadow-xl border border-orange-200">
            <div className="flex items-center gap-2 mb-3">
              <FaChartLine className="text-orange-500 text-xl" />
              <span className="font-semibold text-black">Growth Stats</span>
            </div>
            <svg width="200" height="120" viewBox="0 0 200 120" className="overflow-visible">
              <defs>
                <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 10 100 Q 50 80, 90 60 T 170 20 T 190 10"
                stroke="#FF6B35"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 10 100 Q 50 80, 90 60 T 170 20 T 190 10 L 190 120 L 10 120 Z"
                fill="url(#growthGradient)"
              />
              <circle cx="190" cy="10" r="5" fill="#FF6B35" />
            </svg>
          </div>
        </motion.div>

        {/* Rocket Icon - Right Side */}
        <motion.div
          className="absolute bottom-40 right-10 hidden lg:block"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="bg-white rounded-full p-6 shadow-xl border-2 border-orange-300">
            <FaRocket className="text-4xl text-orange-500" />
          </div>
        </motion.div>

        {/* Stats Badges */}
        <motion.div
          className="absolute top-60 left-1/4 hidden md:block"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="bg-white rounded-lg p-4 shadow-lg border border-orange-200 flex items-center gap-3">
            <FaUsers className="text-orange-500 text-2xl" />
            <div>
              <div className="text-2xl font-bold text-orange-500">10K+</div>
              <div className="text-xs text-gray-600">Happy Clients</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-80 right-1/4 hidden md:block"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="bg-white rounded-lg p-4 shadow-lg border border-orange-200 flex items-center gap-3">
            <FaStar className="text-orange-500 text-2xl" />
            <div>
              <div className="text-2xl font-bold text-orange-500">4.9★</div>
              <div className="text-xs text-gray-600">Rating</div>
            </div>
          </div>
        </motion.div>

        {/* Orange Gradient Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <motion.h1
        className="text-4xl font-bold mb-6 text-orange-500 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Pricing
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="bg-white border border-orange-500 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform cursor-pointer relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ boxShadow: "0 20px 40px rgba(255, 107, 53, 0.2)" }}
          >
            {/* Decorative Corner Element */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-bl-full"></div>
            
            {/* Service Icon */}
            <div className="mb-4 flex items-center gap-3">
              {service.name.includes("Instagram") ? (
                <div className="p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-lg">
                  <FaInstagram className="text-white text-xl" />
                </div>
              ) : (
                <div className="p-3 bg-red-600 rounded-lg">
                  <FaYoutube className="text-white text-xl" />
                </div>
              )}
              <h2 className="text-2xl font-semibold text-orange-500">{service.name}</h2>
            </div>
            
            <p className="text-gray-600 mb-4 ml-14">₹{service.price} per 1000 units</p>
            
            {/* Popular Badge for first service */}
            {index === 0 && (
              <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
            )}
            
            <button
              onClick={() => setSelectedService(service)}
              className="bg-orange-500 text-white font-semibold py-2 px-6 rounded hover:bg-orange-600 w-full transition-colors"
            >
              Order Now
            </button>
          </motion.div>
        ))}
      </div>

      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-white border border-orange-500 rounded-xl p-8 w-96 text-center">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              {selectedService.name}
            </h2>
            <input
              type="text"
              placeholder="Enter your post/profile link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2 mb-3 bg-white border border-orange-500 rounded text-black"
            />
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 mb-4 bg-white border border-orange-500 rounded text-black"
            />
            <label className="flex items-center justify-center mb-4">
              <input
                type="checkbox"
                onChange={(e) => setConfirmation(e.target.checked)}
                className="mr-2"
              />
              Confirm Order
            </label>

            <div className="flex justify-around">
              <button
                disabled={!confirmation}
                onClick={handleOrder}
                className={`${
                  confirmation ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-400 cursor-not-allowed"
                } text-white font-semibold py-2 px-6 rounded`}
              >
                Place Order
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="bg-gray-700 text-white font-semibold py-2 px-6 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {message && (
        <motion.div
          className="mt-8 text-center text-orange-500 font-medium relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {message}
        </motion.div>
      )}

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path
            d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#FF8C5A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Pricing;