import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from "lucide-react";
// import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const formRef = useRef();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example EmailJS
    // emailjs.sendForm("SERVICE_ID", "TEMPLATE_ID", formRef.current, "PUBLIC_KEY")

    setSuccess(true);
    formRef.current.reset();
    
    // Auto hide success message after 5 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <section className="min-h-screen bg-[#050505] text-white px-6 pt-32 pb-20 relative overflow-hidden flex items-center justify-center">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left Side Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
            Let's Start a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 italic">
              Conversation
            </span>
          </h1>

          <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light max-w-md">
            Got a question about our products, sizing, or want to discuss a custom bulk order? We are here to help and answer any question you might have.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-yellow-400 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Our Location</h3>
                <p className="text-gray-400 text-sm">Karachi, Sindh, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-yellow-400 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Email Us</h3>
                <p className="text-gray-400 text-sm">support@nextfit.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-yellow-400 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Call Us</h3>
                <p className="text-gray-400 text-sm">+92 300 1234567</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-yellow-400 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
                <Clock size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Business Hours</h3>
                <p className="text-gray-400 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side Form */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
            Send Us a Message
          </h2>

          <AnimatePresence>
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl mb-6 flex items-center gap-3"
              >
                <CheckCircle2 size={20} className="text-green-500" />
                <span className="font-medium">Message sent successfully! We'll be in touch soon.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-1">
              <label className="text-sm text-gray-400 font-medium pl-1">Full Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="John Doe"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:bg-white/10 focus:ring-1 focus:ring-yellow-400/50 transition-all duration-300"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-400 font-medium pl-1">Email Address</label>
              <input
                type="email"
                name="user_email"
                placeholder="john@example.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:bg-white/10 focus:ring-1 focus:ring-yellow-400/50 transition-all duration-300"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-400 font-medium pl-1">Message</label>
              <textarea
                name="message"
                placeholder="How can we help you?"
                required
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:bg-white/10 focus:ring-1 focus:ring-yellow-400/50 transition-all duration-300 resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-4 bg-yellow-500 text-black text-lg font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:-translate-y-1 transition-all duration-300 group"
            >
              Send Message
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactPage;