import React, { useState } from "react";
import axios from "axios";

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
  try {
    if (!selectedService || !quantity) {
      setMessage("⚠️ Please select a service and enter quantity.");
      return;
    }

    // Calculate the total price based on selected service
    const amount = selectedService.price * (quantity / 1000);

    console.log("Creating order with amount:", amount);

    const response = await axios.post(
      "https://famehikes-backend.onrender.com/api/order",
      { amount }
    );

    console.log("Order response:", response.data);

    if (response.data.success) {
      setMessage(`✅ Order created successfully! Order ID: ${response.data.orderId}`);
    } else {
      setMessage("❌ Something went wrong while creating the order.");
    }
  } catch (error) {
    console.error("Error placing order:", error);
    setMessage("⚠️ Server error. Try again later.");
  } finally {
    setConfirmation(false);
  }
};

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-yellow-500">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#111] border border-yellow-500 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <h2 className="text-2xl font-semibold mb-2 text-yellow-400">{service.name}</h2>
            <p className="text-gray-300 mb-4">₹{service.price} per 1000 units</p>
            <button
              onClick={() => setSelectedService(service)}
              className="bg-yellow-500 text-black font-semibold py-2 px-6 rounded hover:bg-yellow-400"
            >
              Order Now
            </button>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-[#111] border border-yellow-500 rounded-xl p-8 w-96 text-center">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              {selectedService.name}
            </h2>
            <input
              type="text"
              placeholder="Enter your post/profile link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2 mb-3 bg-black border border-yellow-500 rounded text-white"
            />
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 mb-4 bg-black border border-yellow-500 rounded text-white"
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
                  confirmation
                    ? "bg-yellow-500 hover:bg-yellow-400"
                    : "bg-gray-600 cursor-not-allowed"
                } text-black font-semibold py-2 px-6 rounded`}
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
        <div className="mt-8 text-center text-yellow-400 font-medium">{message}</div>
      )}
    </div>
  );
};

export default Pricing;
