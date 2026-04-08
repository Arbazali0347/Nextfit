import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Images
import style from "../assets/style.webp";
import style2 from "../assets/style2.webp";
import style3 from "../assets/style3.webp";
import style4 from "../assets/style6.jpg";
import style5 from "../assets/style7.jpg";

const images = [style, style2, style3, style4, style5];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-20">
      
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={images[current]}
              alt="Garb Gallery Collection"
              className="w-full h-full object-cover"
            />
            {/* Elegant Cinematic Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-grayscale-[20%]"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content - mt-10 added to balance the pt-20 from section */}
      <div className="relative z-10 text-center px-6 max-w-5xl mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Top Label */}
          <span className="text-[10px] md:text-xs font-bold tracking-[0.5em] text-gray-300 uppercase mb-4 block">
            Est. 2026 — Premium Apparel
          </span>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-light text-white leading-[0.9] tracking-tighter mb-8">
            Define Your <br />
            <span className="italic font-serif">Aesthetic.</span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-300 text-sm md:text-base max-w-lg mx-auto leading-relaxed tracking-wide font-light mb-10">
            Curated collections for those who appreciate the finer details in modern fashion. 
            Experience the art of dressing with <span className="text-white font-medium">Garb Gallery</span>.
          </p>

          {/* Refined CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/collections"
              className="px-10 py-4 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-all duration-300"
            >
              View Collections
            </Link>
            <Link
              to="/about"
              className="px-10 py-4 border border-white/30 text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300"
            >
              Our Story
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Side Label (Luxury Detail) */}
      <div className="absolute left-10 bottom-10 hidden lg:block">
        <p className="text-[10px] text-gray-500 tracking-[0.3em] uppercase rotate-[-90deg] origin-left">
          New Arrivals // Vol. 01
        </p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] text-gray-400 tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>

      {/* Bottom Vignette */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;