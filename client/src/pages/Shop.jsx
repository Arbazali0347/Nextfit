import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, SlidersHorizontal, Search } from "lucide-react";
import { useApp } from "../context/ShopContextProvider";
// import dummyProducts from "../assets/Data";

const ShopPage = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000); // Set a realistic default max price
  const navigator = useNavigate();
  const {products} = useApp();

  const filteredProducts = products.filter(
    (p) =>
      (selectedSize === "" || p.sizes.includes(selectedSize)) &&
      p.price <= maxPrice
  );

  return (
    <section className="min-h-screen bg-[#050505] text-white px-6 py-16 relative">
      <div className="max-w-7xl mx-auto relative z-10">

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Shop Our <span className="text-yellow-400 italic">Collection</span>
          </h1>
          <p className="text-gray-400 font-light max-w-2xl mx-auto">Find your perfect fit from our exclusive range of premium apparel.</p>
        </motion.div>

        {/* Premium Filters Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 text-yellow-400 w-full md:w-auto">
            <SlidersHorizontal size={24} />
            <span className="font-semibold text-white">Filters</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            {/* Size Filter - Styled as Pills */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">Size:</span>
              <div className="flex gap-2">
                {["", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedSize === size 
                        ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]" 
                        : "bg-black/50 border border-white/10 text-gray-300 hover:border-yellow-500/50"
                    }`}
                  >
                    {size === "" ? "All" : size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter - Range Slider */}
            <div className="flex items-center gap-4 bg-black/50 border border-white/10 px-4 py-2 rounded-xl flex-1 sm:flex-none">
              <span className="text-gray-400 text-sm whitespace-nowrap">Max: PKR {maxPrice}</span>
              <input
                type="range"
                min="1000"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-24 md:w-32 accent-yellow-500 cursor-pointer"
              />
            </div>
          </div>
        </motion.div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => navigator(`/product/${product._id}`)}
                className="group bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                <div className="overflow-hidden relative aspect-[4/5]">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-2 rounded-full font-semibold translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      View Details
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-yellow-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 font-light flex-grow">
                    {product.description}
                  </p>
                  
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <div className="flex gap-1.5 mb-2">
                        {product.sizes.map((size) => (
                          <span key={size} className="bg-white/5 border border-white/10 px-1.5 py-0.5 text-[10px] rounded text-gray-400">
                            {size}
                          </span>
                        ))}
                      </div>
                      <p className="font-bold text-yellow-500 text-lg">
                        PKR {product.price}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic here
                      }}
                      className="p-3 bg-white/5 text-white hover:bg-yellow-500 hover:text-black rounded-full transition-colors duration-300"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/5 rounded-2xl border border-white/10"
          >
            <Search size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your filters or price range.</p>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default ShopPage;