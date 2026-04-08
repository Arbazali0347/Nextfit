import React from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, Phone, Mail, MapPin, ShieldCheck, Zap, Star, ArrowRight, MessageCircle } from "lucide-react";

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white pt-40 pb-20 relative overflow-hidden">
      {/* Subtle Ambient Light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full" />
      
      <motion.div 
        className="max-w-7xl mx-auto px-6 md:px-10 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="mb-32 text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-500 mb-6 font-medium">Est. Premium Clothing Brand</p>
          <h1 className="text-6xl md:text-[100px] font-light tracking-tighter leading-none mb-8 italic font-serif">
            Elegant <br />
            <span className="font-sans not-italic text-white">Outfits.</span>
          </h1>
          <div className="max-w-2xl">
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light tracking-wide">
              Garb Gallery is defined by a clean premium look and fair prices. We curate high-end fashion 
              for those who appreciate elegance in every detail, from Sinza to Manzese.
            </p>
          </div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/10 border border-white/10 mb-32 overflow-hidden">
          {[
            { icon: <ShieldCheck size={20} strokeWidth={1} />, title: "Premium Quality", desc: "Crafting a clean, high-end look that lasts." },
            { icon: <Star size={20} strokeWidth={1} />, title: "Fair Pricing", desc: "Elegant fashion accessible at reasonable rates." },
            { icon: <Zap size={20} strokeWidth={1} />, title: "Fast Service", desc: "Direct delivery across Tanzania from our galleries." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-[#0a0a0a] p-12 hover:bg-[#111] transition-colors duration-500">
              <div className="text-gray-500 mb-8">{feature.icon}</div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Contact & Interaction Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl font-light font-serif italic mb-8 tracking-tighter">Visit Our <br/> Local Galleries</h2>
            <div className="space-y-6">
              <div className="group flex items-center justify-between py-6 border-b border-white/5 transition-all">
                <div className="flex items-center gap-6">
                  <MapPin size={18} strokeWidth={1} className="text-gray-500" />
                  <span className="text-sm tracking-widest text-gray-300 uppercase">Sinza A., Tanzania</span>
                </div>
              </div>
              <div className="group flex items-center justify-between py-6 border-b border-white/5 transition-all">
                <div className="flex items-center gap-6">
                  <MapPin size={18} strokeWidth={1} className="text-gray-500" />
                  <span className="text-sm tracking-widest text-gray-300 uppercase">Manzese Argentina</span>
                </div>
              </div>
              <a href="https://wa.me/0744180146" className="group flex items-center justify-between py-6 border-b border-white/5 hover:border-white/20 transition-all">
                <div className="flex items-center gap-6">
                  <MessageCircle size={18} strokeWidth={1} className="text-gray-500" />
                  <span className="text-sm tracking-widest text-gray-300 group-hover:text-white transition-colors uppercase">WhatsApp: 0744 180 146</span>
                </div>
                <ArrowRight size={16} className="text-gray-700 group-hover:text-white group-hover:translate-x-2 transition-all" />
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 p-12 md:p-16 text-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-6">Our Community</h3>
            <div className="mb-10">
                <span className="text-4xl font-light tracking-tighter italic font-serif">13.1K+</span>
                <p className="text-[8px] uppercase tracking-[0.4em] text-gray-600 mt-2">Followers on Instagram</p>
            </div>
            <div className="flex justify-center gap-10 mb-12">
              <a href="#" className="text-gray-500 hover:text-white transition-all transform hover:scale-110">
                <Instagram size={24} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-all transform hover:scale-110">
                <Youtube size={24} strokeWidth={1.5} />
              </a>
            </div>
            <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em] leading-loose">
              Join our gallery for early access <br/> to exclusive elegant outfits.
            </p>
          </motion.div>
        </div>

        {/* Footer Typography Background */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02] translate-y-1/4">
          <h2 className="text-[18vw] font-black leading-none uppercase select-none tracking-tighter">Garb Gallery</h2>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutPage;