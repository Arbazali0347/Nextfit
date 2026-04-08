import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, Search, Plus } from "lucide-react";
import { useApp } from "../context/ShopContextProvider";

const ShopPage = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000); 
  const navigate = useNavigate();
  const { products } = useApp();

  const filteredProducts = products.filter(
    (p) =>
      (selectedSize === "" || p.sizes.includes(selectedSize)) &&
      p.price <= maxPrice
  );

  return (
    <section className="min-h-screen bg-black text-white px-6 pt-32 pb-24 relative">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-[10px] font-bold tracking-[0.5em] text-gray-500 uppercase mb-4 block">
            Garb Gallery // Browse
          </span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white">
            Our <span className="italic font-serif">Collections.</span>
          </h1>
        </motion.div>

        {/* Minimalist Filter Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 py-8 border-y border-white/10 gap-8"
        >
          {/* Size Filter */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Select Size</span>
            <div className="flex flex-wrap gap-2">
              {["", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border transition-all duration-500 text-[11px] font-bold tracking-widest uppercase ${
                    selectedSize === size 
                      ? "bg-white text-black border-white" 
                      : "bg-transparent border-white/20 text-gray-400 hover:border-white"
                  }`}
                >
                  {size === "" ? "All" : size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="flex flex-col gap-4 w-full lg:w-72">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Max Price</span>
              <span className="text-sm font-light text-white italic">Rs. {maxPrice}</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full accent-white cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </motion.div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer relative"
              >
                {/* Image Container */}
                <div 
                  className="aspect-[3/4] overflow-hidden bg-[#111] relative mb-6"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  
                  {/* Premium Slide-up Add to Cart */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-expo">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart function yahan call karein
                        console.log("Added to cart:", product.title);
                      }}
                      className="w-full bg-white text-black py-4 text-[10px] font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                    >
                      <Plus size={14} /> Add to Cart
                    </button>
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-1 px-1">
                   <div className="flex justify-between items-baseline">
                      <h3 className="text-[13px] font-medium text-gray-300 tracking-wide uppercase group-hover:text-white transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-[13px] font-bold text-white">
                        Rs. {product.price}
                      </p>
                   </div>
                   <div className="flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                      <p className="text-[10px] text-gray-500 font-light tracking-widest uppercase">
                        {product.sizes.join(" • ")}
                      </p>
                      <span className="text-[9px] text-gray-400 italic font-serif">Luxury Edition</span>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 border border-white/5 bg-[#050505]"
          >
            <Search size={40} className="mx-auto text-gray-700 mb-6 font-light" />
            <h3 className="text-xl font-light text-white mb-2 tracking-[0.2em] uppercase">No matches found</h3>
            <p className="text-gray-500 text-sm font-light">Refine your selection or explore all items.</p>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default ShopPage;