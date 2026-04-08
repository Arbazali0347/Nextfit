import React from "react";
import { useApp } from "../context/ShopContextProvider";
import { useNavigate } from "react-router-dom";
import { X, ShoppingBag, ArrowRight, ShieldCheck, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CartPage = () => {
  const { cart, removeFromCart } = useApp();
  const navigate = useNavigate();

  // Empty State - Ab ye bhi Dark theme mein hai
  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center max-w-md w-full text-center"
        >
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
              <ShoppingBag size={40} strokeWidth={1} className="text-gray-500" />
            </div>
          </div>
          <h2 className="text-3xl font-light tracking-tighter uppercase mb-2">Empty Gallery</h2>
          <p className="text-gray-500 mb-10 font-light text-sm tracking-wide">
            Your collection is waiting for its first masterpiece.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="group flex items-center gap-3 px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-200 transition-all"
          >
            Start Exploring
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col mb-16 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase italic font-serif">
            Your <span className="font-sans font-black not-italic tracking-normal text-white">Selection</span>
          </h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.5em] mt-4">Review your items before checkout</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Side: Items List */}
          <div className="flex-1 space-y-8">
            <AnimatePresence>
              {cart.items.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-white/5 group relative"
                >
                  {/* Image Container */}
                  <div className="w-full sm:w-40 h-52 bg-[#111] overflow-hidden rounded-sm relative border border-white/5">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 w-full flex flex-col py-2">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold tracking-tight uppercase text-gray-100">
                        {product.title}
                      </h3>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-gray-600 hover:text-white transition-colors p-1"
                      >
                        <Trash2 size={18} strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex flex-col">
                        <span className="text-[8px] uppercase tracking-widest text-gray-500">Size</span>
                        <span className="text-xs font-bold text-gray-300">{product.selectedSize || "N/A"}</span>
                      </div>
                      <div className="flex flex-col border-l border-white/10 pl-4">
                        <span className="text-[8px] uppercase tracking-widest text-gray-500">Quantity</span>
                        <span className="text-xs font-bold text-gray-300">{product.quantity}</span>
                      </div>
                    </div>

                    <p className="text-xl font-light mt-auto italic font-serif tracking-tighter text-white">
                      PKR {Number(product.price).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-[380px]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#111] border border-white/5 p-10 sticky top-32 shadow-2xl"
            >
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-gray-500 border-b border-white/5 pb-4">
                Summary
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs uppercase tracking-widest">Subtotal</span>
                  <span className="font-bold text-sm text-gray-300">PKR {Number(cart.totalPrice).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs uppercase tracking-widest">Shipping</span>
                  <span className="text-[10px] font-bold uppercase text-gray-400">Calculated at next step</span>
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                  <span className="font-serif italic text-2xl tracking-tighter">Total</span>
                  <span className="text-2xl font-black tracking-tighter text-white">
                    PKR {Number(cart.totalPrice).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8 bg-white/5 p-4 rounded-sm border border-white/5">
                <ShieldCheck size={20} strokeWidth={1} className="text-gray-500" />
                <p className="text-[9px] uppercase tracking-widest leading-relaxed text-gray-400">
                  Secure checkout with premium data encryption.
                </p>
              </div>

              <button
                onClick={() => navigate("/delivery")}
                className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 group hover:bg-gray-200 transition-all shadow-xl shadow-white/5"
              >
                Checkout Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => navigate("/shop")}
                className="w-full mt-4 py-2 text-[8px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
              >
                Return to Shop
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;