import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useApp } from "../context/ShopContextProvider";

const ProductSection = () => {
  const { products } = useApp();
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="relative z-20 bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6"
        >
          <div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-gray-500 uppercase mb-2 block">
              Selection 2026
            </span>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tighter">
              Featured <span className="italic font-serif">Essentials.</span>
            </h2>
          </div>
          
          <Link
            to="/shop"
            className="group flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] text-gray-400 hover:text-white uppercase transition-all duration-300"
          >
            Explore Entire Gallery
            <div className="w-8 h-[1px] bg-gray-600 group-hover:w-12 group-hover:bg-white transition-all duration-500"></div>
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/product/${product._id}`}
                className="group block relative"
              >
                {/* Image Container */}
                <div className="overflow-hidden bg-[#111] aspect-[3/4] mb-6 relative">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  {/* Quick View Overlay (Subtle) */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold tracking-[0.3em] uppercase border border-white/40 px-4 py-2 backdrop-blur-sm">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-200 tracking-wide uppercase group-hover:text-white transition-colors">
                    {product.title.slice(0, 25)}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 font-light tracking-wider">
                      Premium Wear
                    </p>
                    <p className="text-sm font-bold text-white tracking-widest">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile View Button */}
        <div className="mt-16 flex justify-center md:hidden">
          <Link
            to="/shop"
            className="w-full text-center py-4 border border-white/10 text-[11px] font-bold tracking-[0.3em] text-white uppercase hover:bg-white hover:text-black transition-all duration-500"
          >
            Discover More
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ProductSection;