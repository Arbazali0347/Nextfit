import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseURL, useApp } from "../context/ShopContextProvider";
import axios from "axios";
import { motion } from "framer-motion";
import { ShoppingCart, Truck, ShieldCheck, Undo2, ArrowLeft } from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useApp();
  
  // States for interactive UI
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState("");

  // Fetch product
  const GetProductById = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseURL}/products/${id}`);
      if (res.data.success) {
        setProduct(res.data.product);
        
        // Initialize active image and selected size
        if (res.data.product.images && res.data.product.images.length > 0) {
          setActiveImage(res.data.product.images[0]);
        }
        if (res.data.product.sizes && res.data.product.sizes.length > 0) {
          setSelectedSize(res.data.product.sizes[0]);
        }
      } else {
        console.error("Product not found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetProductById(id);
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select a size first!");
    addToCart({ ...product, selectedSize });
  };

  // Loading UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-yellow-400">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/10 border-t-yellow-400 rounded-full animate-spin"></div>
          <p className="font-medium tracking-widest text-sm uppercase">Loading Product...</p>
        </div>
      </div>
    );
  }

  // Not Found UI
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-400 mb-8">The item you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/shop')} className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050505] text-white px-6 py-16 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 mb-8 transition-colors group w-fit"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to products</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Product Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {/* Main Image */}
            <div className="w-full aspect-[4/5] md:aspect-square bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 relative group">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`flex-shrink-0 w-20 h-24 md:w-24 md:h-28 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === img ? "border-yellow-400 opacity-100" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Side: Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
              {product.title}
            </h1>
            
            <p className="text-3xl font-bold text-yellow-400 mb-6">
              PKR {product.price}
            </p>

            <p className="text-gray-400 mb-8 text-lg leading-relaxed font-light">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Select Size</h3>
                <button className="text-sm text-yellow-400/80 hover:text-yellow-400 underline decoration-yellow-400/30 underline-offset-4">
                  Size Guide
                </button>
              </div>
              
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-full border flex items-center justify-center text-lg font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-yellow-500 text-black border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                        : "bg-white/5 border-white/10 text-gray-300 hover:border-yellow-500/50 hover:bg-white/10"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-yellow-500 text-black text-lg font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:-translate-y-1 transition-all duration-300 group mb-10"
            >
              <ShoppingCart size={24} className="group-hover:-rotate-12 transition-transform" />
              Add to Cart
            </button>

            {/* Trust Signals / Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 text-gray-400">
                <Truck className="text-yellow-500" size={24} />
                <span className="text-sm">Free shipping over PKR 2000</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Undo2 className="text-yellow-500" size={24} />
                <span className="text-sm">7 days easy return policy</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <ShieldCheck className="text-yellow-500" size={24} />
                <span className="text-sm">Secure & encrypted checkout</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;