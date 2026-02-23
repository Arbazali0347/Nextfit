import React, { useState } from "react";
import { useApp } from "../context/ShopContextProvider";
import { useNavigate } from "react-router-dom";

const DeliveryPage = () => {
  const { cart, placeOrder } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { name, phone, city, address } = formData;

    if (!name || !phone || !city || !address) {
      alert("Please fill all required fields");
      return;
    }

    if (cart.items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    await placeOrder(formData);
    navigate("/");
  };

  return (
    <section className="min-h-screen bg-white text-black px-6 py-16 pt-32">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">

        {/* LEFT – FORM */}
        <div className="flex-1 bg-gray-50 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="bg-white border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="bg-white border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="bg-white border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
            />

            <textarea
              name="address"
              placeholder="Full Address"
              onChange={handleChange}
              className="bg-white border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition resize-none"
            />

            <textarea
              name="message"
              placeholder="Order Note (Optional)"
              onChange={handleChange}
              className="bg-white border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition resize-none"
            />
          </div>
        </div>

        {/* RIGHT – SUMMARY */}
        <div className="w-full md:w-96 bg-gray-50 p-8 rounded-2xl shadow-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          <div className="flex justify-between text-gray-700">
            <span>Total Items:</span>
            <span>{cart.items.length}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold">
            <span>Total Price:</span>
            <span>PKR {cart.totalPrice}</span>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-xl text-gray-700">
            Payment Method:{" "}
            <span className="font-semibold text-black">
              Cash on Delivery (COD)
            </span>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-black text-white font-semibold rounded-full hover:scale-105 hover:bg-gray-900 transition duration-300"
          >
            Submit Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeliveryPage;
