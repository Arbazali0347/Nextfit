import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseURL, useApp } from "../context/ShopContextProvider";
import axios from "axios";
import { motion } from "framer-motion";
import { ShoppingBag, Truck, ShieldCheck, Undo2, ArrowLeft, ChevronRight } from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useApp();
  
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState("");

  const GetProductById = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseURL}/products/${id}`);
      if (res.data.success) {
        setProduct(res.data.product);
        if (res.data.product.images?.length > 0) setActiveImage(res.data.product.images[0]);
        if (res.data.product.sizes?.length > 0) setSelectedSize(res.data.product.sizes[0]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetProductById(id);
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select a size!");
    addToCart({ ...product, selectedSize });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <section className="min-h-screen bg-black text-white px-6 pt-32 pb-24 relative font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb / Back Navigation */}
        <nav className="flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 mb-12">
          <button onClick={() => navigate('/shop')} className="hover:text-white transition-colors">Shop</button>
          <ChevronRight size={12} />
          <span className="text-white truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: Image Gallery (Span 7) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="aspect-[3/4] bg-[#0a0a0a] overflow-hidden group">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Thumbnails Grid */}
            <div className="grid grid-cols-5 gap-4">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-[3/4] overflow-hidden border transition-all duration-500 ${
                    activeImage === img ? "border-white opacity-100" : "border-transparent opacity-40 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="preview" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Product Info (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 flex flex-col"
          >
            <span className="text-[10px] font-bold tracking-[0.4em] text-gray-500 uppercase mb-2">Luxury Wear // Series 01</span>
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-4 leading-none italic font-serif text-white">
              {product.title}
            </h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <p className="text-2xl font-bold tracking-widest text-white">Rs. {product.price}</p>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Inc. all taxes</span>
            </div>

            <div className="h-[1px] w-full bg-white/10 mb-8" />

            <p className="text-gray-400 text-sm leading-relaxed tracking-wide font-light mb-10">
              {product.description}
            </p>

            {/* Size Selector - Luxury Boxes */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Select Size</h3>
                <button className="text-[10px] font-bold text-white border-b border-white/20 hover:border-white transition-all uppercase tracking-widest">
                  Size Guide
                </button>
              </div>
              
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border transition-all duration-500 text-xs font-bold tracking-widest ${
                      selectedSize === size
                        ? "bg-white text-black border-white"
                        : "bg-transparent border-white/10 text-gray-500 hover:border-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-12">
              <button
                onClick={handleAddToCart}
                className="w-full py-5 bg-white text-black text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-gray-200 transition-all duration-500 flex items-center justify-center gap-3"
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                Add to Cart
              </button>
            </div>

            {/* Trust Markers */}
            <div className="grid grid-cols-1 gap-6 pt-10 border-t border-white/10">
              <div className="flex items-start gap-4 group">
                <Truck className="text-gray-500 group-hover:text-white transition-colors" size={20} strokeWidth={1} />
                <div>
                   <h4 className="text-[10px] font-bold tracking-widest uppercase mb-1 text-white">Complimentary Shipping</h4>
                   <p className="text-[10px] text-gray-500 uppercase tracking-wider">Estimated delivery: 2-4 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <Undo2 className="text-gray-500 group-hover:text-white transition-colors" size={20} strokeWidth={1} />
                <div>
                   <h4 className="text-[10px] font-bold tracking-widest uppercase mb-1 text-white">Exchanges</h4>
                   <p className="text-[10px] text-gray-500 uppercase tracking-wider">7-day returns on premium items</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <ShieldCheck className="text-gray-500 group-hover:text-white transition-colors" size={20} strokeWidth={1} />
                <div>
                   <h4 className="text-[10px] font-bold tracking-widest uppercase mb-1 text-white">Authenticity Guaranteed</h4>
                   <p className="text-[10px] text-gray-500 uppercase tracking-wider">Verified premium quality apparel</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;