import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, ShieldCheck, Zap, Star } from "lucide-react";

const AboutPage = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="min-h-screen bg-[#050505] text-white pt-32 pb-20 relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        className="max-w-6xl mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Heading Section */}
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            The Story Behind <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
              Nextfit
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
            We are more than just an apparel brand. We are your everyday confidence booster, delivering modern, stylish, and high-quality clothing right to your doorstep.
          </p>
        </motion.div>

        {/* Core Values / Features (New Addition for E-commerce vibe) */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { icon: <ShieldCheck size={28} />, title: "Premium Quality", desc: "Crafted with the finest fabrics for ultimate durability." },
            { icon: <Star size={28} />, title: "Modern Style", desc: "Trendy designs that keep you looking sharp everyday." },
            { icon: <Zap size={28} />, title: "Fast Delivery", desc: "Quick and hassle-free shipping right to your door." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
              <div className="text-yellow-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Contact & Socials Section */}
        <motion.div variants={itemVariants} className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Get In Touch</h2>
            <p className="text-gray-400">Have questions? We'd love to hear from you.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-4xl mx-auto">
            {/* Phone Card */}
            <a href="tel:+923001234567" className="flex-1 bg-white/5 border border-white/5 p-6 rounded-2xl flex flex-col items-center hover:-translate-y-1 hover:border-yellow-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-400 mb-4 group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <h3 className="font-semibold text-white mb-1">Phone</h3>
              <p className="text-gray-400 group-hover:text-yellow-400 transition-colors">+92 300 1234567</p>
            </a>

            {/* Email Card */}
            <a href="mailto:nextfit.business@gmail.com" className="flex-1 bg-white/5 border border-white/5 p-6 rounded-2xl flex flex-col items-center hover:-translate-y-1 hover:border-yellow-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-400 mb-4 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <h3 className="font-semibold text-white mb-1">Email</h3>
              <p className="text-gray-400 group-hover:text-yellow-400 transition-colors">nextfit.business@gmail.com</p>
            </a>

            {/* Location Card (Optional but looks good) */}
            <div className="flex-1 bg-white/5 border border-white/5 p-6 rounded-2xl flex flex-col items-center hover:-translate-y-1 hover:border-yellow-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-400 mb-4 group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <h3 className="font-semibold text-white mb-1">Location</h3>
              <p className="text-gray-400 text-center">Karachi, Pakistan</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-12 pt-8 border-t border-white/10">
            {[
              { icon: <Facebook size={22} />, link: "https://facebook.com" },
              { icon: <Instagram size={22} />, link: "https://instagram.com" },
              { icon: <Youtube size={22} />, link: "https://youtube.com" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 hover:scale-110"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutPage;