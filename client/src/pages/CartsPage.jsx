import React from "react";
import { useApp } from "../context/ShopContextProvider";
import { useNavigate } from "react-router-dom";
import { X, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CartPage = () => {
  const { cart, removeFromCart } = useApp();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-10 rounded-3xl flex flex-col items-center max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
          <p className="text-gray-400 mb-8 font-light">Looks like you haven't added anything to your cart yet.</p>
          <button
            onClick={() => navigate('/shop')}
            className="w-full py-4 bg-yellow-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 hover:-translate-y-1 transition-all duration-300"
          >
            Start Shopping
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050505] text-white px-6 py-16 relative">
      <div className="max-w-7xl mx-auto relative z-10">

        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center tracking-tight">
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Shopping Cart</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Left Side – Cart Items */}
          <div className="flex-1 space-y-4">
            <AnimatePresence>
              {cart.items.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row items-center bg-[#0a0a0a] border border-white/10 p-4 rounded-2xl gap-6 relative shadow-lg group hover:border-white/20 transition-colors"
                >
                  <button
                    onClick={() => removeFromCart(index)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 hover:bg-red-500/10 p-1.5 rounded-full transition-all cursor-pointer"
                    aria-label="Remove item"
                  >
                    <X size={18} />
                  </button>

                  <div className="w-full sm:w-28 h-28 flex-shrink-0 bg-white/5 rounded-xl overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 w-full text-center sm:text-left pt-2 sm:pt-0">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {product.title}
                    </h3>

                    {product.selectedSize && (
                      <p className="text-gray-400 text-sm mb-2">
                        Size: <span className="font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded ml-1">{product.selectedSize}</span>
                        Quantity: <span className="font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded ml-1">{product.quantity}</span>
                      </p>
                    )}

                    <p className="font-bold text-lg text-white mt-auto">
                      PKR {product.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Side – Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full lg:w-[400px] h-fit bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col gap-6"
          >
            <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-400 text-lg">
              <span>Total Items</span>
              <span className="text-white font-medium">
                {cart.items.reduce((acc, item) => acc + (item.quantity || 1), 0)}
              </span>
            </div>

            <div className="flex justify-between text-2xl font-bold border-b border-white/10 pb-6">
              <span>Total</span>
              <span className="text-yellow-400">PKR {cart.totalPrice}</span>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-start gap-3">
              <ShieldCheck className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-white font-medium text-sm">Safe & Secure Checkout</p>
                <p className="text-gray-400 text-xs mt-1 font-light">Your data is encrypted. Payment is processed securely.</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/delivery")}
              className="w-full py-4 bg-yellow-500 text-black text-lg font-bold rounded-xl hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:-translate-y-1 hover:bg-yellow-400 transition-all duration-300 flex justify-center items-center gap-2 group"
            >
              Proceed to Delivery
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;