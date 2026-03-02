import React, { useState } from "react";
import { useApp } from "../context/ShopContextProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Building2, MessageSquare, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

const DeliveryPage = () => {
  const { cart, placeOrder, loading } = useApp();
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
      alert("Please fill all required fields marked with *");
      return;
    }

    if (cart.items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      const result = await placeOrder(formData);
      if (result.success) {
        navigate("/");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-[#050505] text-white px-6 py-16 relative">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">

        {/* LEFT – FORM */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl"
        >
          <div className="mb-8 border-b border-white/10 pb-6">
            <h2 className="text-3xl font-bold text-white mb-2">Delivery Details</h2>
            <p className="text-gray-400 font-light">Please enter your shipping information below.</p>
          </div>

          <div className="flex flex-col gap-6">

            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 px-12 py-4 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 focus:ring-1 focus:ring-yellow-400/50 transition-all"
              />
            </div>

            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors" size={20} />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 px-12 py-4 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 focus:ring-1 focus:ring-yellow-400/50 transition-all"
              />
            </div>

            <div className="relative group">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors" size={20} />
              <input
                type="text"
                name="city"
                placeholder="City *"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 px-12 py-4 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 focus:ring-1 focus:ring-yellow-400/50 transition-all"
              />
            </div>

            <div className="relative group">
              <MapPin className="absolute left-4 top-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" size={20} />
              <textarea
                name="address"
                placeholder="Full Shipping Address *"
                onChange={handleChange}
                rows="3"
                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 focus:ring-1 focus:ring-yellow-400/50 transition-all resize-none"
              />
            </div>

            <div className="relative group">
              <MessageSquare className="absolute left-4 top-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" size={20} />
              <textarea
                name="message"
                placeholder="Order Note / Special Instructions (Optional)"
                onChange={handleChange}
                rows="2"
                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 focus:ring-1 focus:ring-yellow-400/50 transition-all resize-none"
              />
            </div>

          </div>
        </motion.div>

        {/* RIGHT – SUMMARY */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-[420px] h-fit bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Final Summary</h2>

          <div className="flex justify-between text-gray-400 text-lg">
            <span>Total Items</span>
            <span className="text-white font-medium">{cart.items.reduce((acc, item) => acc + (item.quantity || 1), 0)}</span>
          </div>

          <div className="flex justify-between text-2xl font-bold border-b border-white/10 pb-6">
            <span>Amount to Pay</span>
            <span className="text-yellow-400">PKR {cart.totalPrice}</span>
          </div>

          <div className="bg-[#0a0a0a] border border-yellow-500/30 p-5 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Payment Method</p>
              <p className="text-white font-semibold">Cash on Delivery (COD)</p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-4 py-4 bg-yellow-500 text-black text-lg font-bold rounded-xl hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:-translate-y-1 hover:bg-yellow-400 transition-all duration-300"
          >
            {loading ? "Loading..." : "Confirm Order"}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default DeliveryPage;