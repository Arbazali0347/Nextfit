import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Make sure paths are correct
import style from "../assets/style.webp";
import style1 from "../assets/style1.webp";
import style2 from "../assets/style2.webp";
import style3 from "../assets/style3.webp";
import style4 from "../assets/style6.jpg";
import style5 from "../assets/style7.jpg";

const images = [style, style1, style2, style3, style4, style5];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Added pb-16 md:pb-24 for better bottom spacing
    <section className="relative min-h-[100vh] flex flex-col justify-center items-center overflow-hidden pt-10 pb-16 md:pb-24 bg-black">
      
      {/* Background Images with Slow Zoom Effect */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <img
            src={img}
            alt={`Nextfit lifestyle ${index + 1}`}
            className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
              index === current ? "scale-105" : "scale-100" // Reduced scale for a more subtle zoom
            }`}
          />
        </div>
      ))}

      {/* Softer Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-0"></div>

      {/* Center Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center w-full max-w-4xl px-6 flex flex-col items-center flex-grow justify-center"
      >
        {/* Offer Badge - Softer look */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
          </span>
          <span className="text-yellow-400/90 text-sm font-medium tracking-wide">
            New Summer Collection
          </span>
        </motion.div>

        {/* Main heading - Removed extrabold, using medium/semibold for elegance */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-[5rem] font-medium text-white leading-tight tracking-tight drop-shadow-lg"
        >
          Elevate Your <br />
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 italic pr-2">
            Everyday Style
          </span>
        </motion.h1>

        {/* Subtitle - Lighter text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md font-light"
        >
          Premium T-shirts designed for ultimate comfort and an unbeatable fit. 
          <span className="font-medium text-white"> Nextfit</span> is where your confidence begins.
        </motion.p>

        {/* CTA Buttons - More refined styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
        >
          <Link
            to="/shop"
            className="group relative px-8 py-3.5 bg-yellow-500 text-black text-base md:text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-400 hover:-translate-y-1 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Shop Men's
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </Link>

          <Link
            to="/collections"
            className="group px-8 py-3.5 border border-white/40 text-white text-base md:text-lg font-medium rounded-full hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            Explore Collections
          </Link>
        </motion.div>

        {/* Trust Signals */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-gray-300/80 font-light"
        >
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400/80">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <span><span className="text-white font-medium">4.9/5</span> (1k+ Reviews)</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-500/50"></div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
            <span>Free Shipping Over Rs. 2000</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Minimalistic Scroll Indicator - Adjusted positioning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/30 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-1.5 bg-white/60 rounded-full"></div>
        </motion.div>
      </motion.div>
      
      {/* Bottom fade gradient to blend into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;