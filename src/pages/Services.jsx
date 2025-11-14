import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import axios from "axios";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [message, setMessage] = useState("");

  const services = [
    {
      title: "YouTube Subscribers",
      description: "Boost your channel's growth with genuine subscribers.",
      icon: <FaYoutube className="text-red-500 text-4xl mb-4" />,
      price: 150,
      serviceId: 3001,
    },
    {
      title: "YouTube Views",
      description: "Get real views to increase engagement and visibility.",
      icon: <FaYoutube className="text-red-500 text-4xl mb-4" />,
      price: 150,
      serviceId: 3001,
    },
    {
      title: "YouTube Likes",
      description: "Enhance your videos' credibility with authentic likes.",
      icon: <FaYoutube className="text-red-500 text-4xl mb-4" />,
      price: 120,
      serviceId: 3002,
    },
    {
      title: "Instagram Likes",
      description: "Increase the reach of your posts with high-quality likes.",
      icon: <FaInstagram className="text-pink-500 text-4xl mb-4" />,
      price: 80,
      serviceId: 2009,
    },
    {
      title: "Instagram Views",
      description: "Get more visibility on your reels and stories.",
      icon: <FaInstagram className="text-pink-500 text-4xl mb-4" />,
      price: 80,
      serviceId: 2009,
    },
    {
      title: "Instagram Followers",
      description: "Gain authentic followers to build your online presence.",
      icon: <FaInstagram className="text-pink-500 text-4xl mb-4" />,
      price: 100,
      serviceId: 2010,
    },
  ];

  const handleOrder = async () => {
    if (!selectedService || !quantity || !link) {
      setMessage("⚠️ Please fill all fields: username/link and quantity are required.");
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
        serviceName: selectedService.title,
        link: link,
        quantity: quantity,
        amount: amount
      };

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: response.data.amount,
        currency: response.data.currency,
        name: "FameHikes",
        description: selectedService.title,
        order_id: response.data.orderId,
        handler: async function (razorpayResponse) {
          setMessage("🔄 Verifying payment and delivering service...");
          
          try {
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
              setMessage(
                `✅ ${verifyResponse.data.message}\nPayment ID: ${razorpayResponse.razorpay_payment_id}`
              );
            } else {
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
        theme: { color: "#FF6B35" },
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
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,107,53,0.3)" }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-orange-500 rounded-2xl p-8 hover:bg-orange-500/10 transition-all cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="flex flex-col items-center">
                {service.icon}
                <h3 className="text-2xl font-semibold text-orange-500 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                <p className="text-lg font-bold text-orange-500">₹{service.price} per 1000</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <motion.div
              className="bg-white border border-orange-500 rounded-xl p-8 w-96 max-w-[90vw] text-center relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <button
                onClick={() => {
                  setSelectedService(null);
                  setLink("");
                  setQuantity("");
                  setMessage("");
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
              >
                ×
              </button>
              
              <h2 className="text-2xl font-bold text-orange-500 mb-4">
                {selectedService.title}
              </h2>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Price: ₹{selectedService.price} per 1000 units</p>
              </div>

              <input
                type="text"
                placeholder="Enter Instagram/YouTube username or link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-3 mb-3 bg-white border border-orange-500 rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              
              <input
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                className="w-full p-3 mb-4 bg-white border border-orange-500 rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              {quantity && (
                <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Total Amount: <span className="font-bold text-orange-600">
                      ₹{Number(selectedService.price * (quantity / 1000)).toFixed(2)}
                    </span>
                  </p>
                </div>
              )}

              <label className="flex items-center justify-center mb-4">
                <input
                  type="checkbox"
                  checked={confirmation}
                  onChange={(e) => setConfirmation(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">Confirm Order</span>
              </label>

              <div className="flex justify-around gap-3">
                <button
                  disabled={!confirmation || !link || !quantity}
                  onClick={handleOrder}
                  className={`${
                    confirmation && link && quantity
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-gray-400 cursor-not-allowed"
                  } text-white font-semibold py-2 px-6 rounded flex-1 transition-colors`}
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    setLink("");
                    setQuantity("");
                    setMessage("");
                  }}
                  className="bg-gray-700 text-white font-semibold py-2 px-6 rounded hover:bg-gray-600 flex-1 transition-colors"
                >
                  Cancel
                </button>
              </div>

              {message && (
                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-700 whitespace-pre-line">{message}</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
