import React, { useState } from "react";
import { useApp } from "../context/ShopContextProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Building2, MessageSquare, ArrowRight, CreditCard } from "lucide-react";
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
      toast.error("Please fill all required fields");
      return;
    }
    if (cart.items.length === 0) {
      toast.error("Your gallery bag is empty");
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
    <section className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-6 md:px-10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-500 mb-4">Checkout Atelier</p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter italic font-serif">
            Delivery <span className="font-sans not-italic text-white">Details.</span>
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
          
          {/* LEFT – MINIMAL FORM */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Name Input */}
              <div className="relative group border-b border-white/10 focus-within:border-white transition-colors pb-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-3 block">Recipient Name *</label>
                <div className="flex items-center gap-4">
                  <User size={16} className="text-gray-700" />
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Arbaz Ali"
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm font-light tracking-widest text-white placeholder-gray-800 outline-none"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="relative group border-b border-white/10 focus-within:border-white transition-colors pb-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-3 block">Contact Number *</label>
                <div className="flex items-center gap-4">
                  <Phone size={16} className="text-gray-700" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="0744 180 146"
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm font-light tracking-widest text-white placeholder-gray-800 outline-none"
                  />
                </div>
              </div>

              {/* City Input */}
              <div className="relative group border-b border-white/10 focus-within:border-white transition-colors pb-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-3 block">City / Region *</label>
                <div className="flex items-center gap-4">
                  <Building2 size={16} className="text-gray-700" />
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Sinza, Dar es Salaam"
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm font-light tracking-widest text-white placeholder-gray-800 outline-none"
                  />
                </div>
              </div>

              {/* Address Input */}
              <div className="relative group border-b border-white/10 focus-within:border-white transition-colors pb-2 md:col-span-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-3 block">Full Shipping Address *</label>
                <div className="flex items-start gap-4">
                  <MapPin size={16} className="text-gray-700 mt-1" />
                  <textarea
                    name="address"
                    placeholder="Enter complete street and house details..."
                    onChange={handleChange}
                    rows="2"
                    className="w-full bg-transparent text-sm font-light tracking-widest text-white placeholder-gray-800 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Order Note */}
              <div className="relative group border-b border-white/10 focus-within:border-white transition-colors pb-2 md:col-span-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-3 block">Order Notes (Optional)</label>
                <div className="flex items-start gap-4">
                  <MessageSquare size={16} className="text-gray-700 mt-1" />
                  <textarea
                    name="message"
                    placeholder="Any special instructions for delivery?"
                    onChange={handleChange}
                    rows="2"
                    className="w-full bg-transparent text-sm font-light tracking-widest text-white placeholder-gray-800 outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT – ORDER SUMMARY */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-[400px] bg-[#111] border border-white/5 p-10 md:p-12 shadow-2xl relative"
          >
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-10 border-b border-white/5 pb-4">
              Your Order Summary
            </h2>

            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center text-xs tracking-widest font-light">
                <span className="text-gray-500 uppercase">Selected Items</span>
                <span>{cart.items.reduce((acc, item) => acc + (item.quantity || 1), 0)}</span>
              </div>
              <div className="flex justify-between items-center text-lg tracking-tighter">
                <span className="font-serif italic">Total Amount</span>
                <span className="font-sans font-normal underline underline-offset-8">
                  {cart.totalPrice} TZS
                </span>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/5 p-6 mb-10 flex items-start gap-4">
              <CreditCard size={18} strokeWidth={1} className="text-gray-400" />
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-1">Method</p>
                <p className="text-[11px] font-light tracking-widest text-white">Cash on Delivery (COD)</p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-4 group hover:bg-gray-200 transition-all disabled:bg-gray-800 disabled:text-gray-500"
            >
              {loading ? "Processing..." : "Place Final Order"}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[8px] text-gray-700 uppercase tracking-[0.2em] text-center mt-6">
              By placing an order, you agree to <br /> Garb Gallery's terms of service.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryPage;