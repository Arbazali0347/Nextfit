// TopSection.jsx (TopOfferBar)
import React from "react";
import { motion } from "framer-motion";

const TopOfferBar = () => {
  return (
    <div className="w-full bg-[#111] border-b border-white/10 text-white overflow-hidden relative flex items-center h-10">
      {/* Yellow gradient accent line at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
      
      {/* Marquee Effect Container */}
      <motion.div
        className="flex whitespace-nowrap text-xs md:text-sm font-medium tracking-wide"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20, // Speed of the text
        }}
      >
        <span className="mx-4 text-yellow-400">🔥 FLASH SALE:</span> 
        Use code <span className="font-bold text-white px-1">NEXT20</span> for 20% off all T-shirts! 
        <span className="mx-8 text-white/30">|</span> 
        <span className="mx-4 text-yellow-400">🚚 FREE DELIVERY</span> 
        for all Karachi customers!
        <span className="mx-8 text-white/30">|</span> 
        <span className="mx-4 text-yellow-400">⚡ FAST SHIPPING</span> 
        Nationwide.
      </motion.div>
    </div>
  );
};

export default TopOfferBar;