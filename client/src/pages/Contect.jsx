import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Clock, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

const ContactPage = () => {
  const formRef = useRef();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    formRef.current.reset();
    setTimeout(() => { setSuccess(false); }, 5000);
  };

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white pt-40 pb-20 px-6 md:px-10 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">

          {/* Left Side: Brand Identity Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] uppercase tracking-[0.6em] text-gray-500 mb-8 font-medium">Garb Gallery Studio</p>
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-12 italic font-serif text-white">
              Elegant <br />
              <span className="font-sans font-normal not-italic">Outfits.</span>
            </h1>

            <p className="text-gray-500 text-sm md:text-base mb-16 leading-relaxed font-light tracking-wide max-w-sm">
              Providing a clean premium look with fair prices. Visit our galleries in Sinza and Manzese.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 border-t border-white/5 pt-12">
              {/* Location 1 */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-600 block italic">Main Gallery</span>
                <p className="text-xs font-light tracking-widest text-gray-300">Sinza A., Tanzania</p>
              </div>
              {/* Location 2 */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-600 block italic">Branch</span>
                <p className="text-xs font-light tracking-widest text-gray-300">Manzese Argentina</p>
              </div>
              {/* WhatsApp / Phone */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-600 block italic">WhatsApp Us</span>
                <p className="text-xs font-light tracking-widest text-gray-300">0744 180 146</p>
              </div>
              {/* Brand Status */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-600 block italic">Community</span>
                <p className="text-xs font-light tracking-widest text-gray-300">13.1K+ Followers</p>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <a 
              href="https://wa.me/0744180146" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-4 mt-16 group"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <MessageCircle size={20} strokeWidth={1} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Chat on WhatsApp</span>
            </a>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#111] border border-white/5 p-8 md:p-16 shadow-2xl relative"
          >
            <AnimatePresence>
              {success && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#111] z-20 flex flex-col items-center justify-center text-center p-6"
                >
                  <CheckCircle2 size={40} strokeWidth={1} className="text-gray-400 mb-4" />
                  <h3 className="text-lg font-serif italic tracking-tighter mb-2 text-white">Inquiry Sent</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Garb Gallery team will reach out shortly.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
              <div className="relative group border-b border-white/10 focus-within:border-white transition-colors pb-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-2 block font-medium">Your Name</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Enter your name"
                  required
                  className="w-full bg-transparent text-sm font-light tracking-widest text-white placeholder-gray-800 outline-none"
                />
              </div>

              <div className="relative group border-b border-white/10 focus-within:border-white transition-colors pb-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-2 block font-medium">WhatsApp / Email</label>
                <input
                  type="text"
                  name="user_contact"
                  placeholder="Contact details"
                  required
                  className="w-full bg-transparent text-sm font-light tracking-widest text-white placeholder-gray-800 outline-none"
                />
              </div>

              <div className="relative group border-b border-white/10 focus-within:border-white transition-colors pb-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-2 block font-medium">Your Message</label>
                <textarea
                  name="message"
                  placeholder="Ask about outfits or prices..."
                  required
                  rows="3"
                  className="w-full bg-transparent text-sm font-light tracking-widest text-white placeholder-gray-800 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-4 group hover:bg-gray-200 transition-all shadow-xl shadow-white/5"
              >
                Send Inquiry
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactPage;