import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
// import dummyProducts from "../assets/Data";
import { useApp } from "../context/ShopContextProvider";

const ProductSection = () => {
  // Home page par sirf top 4 products dikhane ke liye
  const {products} = useApp();
  const featuredProducts = products.slice(0, 4);



  return (
    <section className="relative z-20 bg-[#050505] py-24 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Now</span>
            </h2>
            <p className="text-gray-400 mt-3 font-light">Explore our most popular premium picks.</p>
          </div>
          
          <Link
            to="/shop"
            className="group hidden md:flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
          >
            View All Collection
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/product/${product._id}`}
                className="group block bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 relative"
              >
                <div className="overflow-hidden relative aspect-[4/5]">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-yellow-400 transition-colors">
                    {product.title.slice(0, 25)}{product.title.length > 30 ? "..." : ""}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2 font-light">
                    {product.description}
                  </p>
                  <p className="font-bold text-yellow-500 text-lg">
                    PKR {product.price}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link
            to="/shop"
            className="px-8 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition duration-300 flex items-center gap-2"
          >
            Explore More <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ProductSection;