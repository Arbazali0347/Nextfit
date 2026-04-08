import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 tracking-wide uppercase text-sm">Contact Us</h3>
          <p className="mb-2">WhatsApp: <span className="text-gray-200">0744 180 146</span></p>
          <p className="mb-2">Locations: <span className="text-gray-200">Sinza A. & Manzese Argentina</span></p>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 tracking-wide uppercase text-sm">Follow Us</h3>
          <div className="flex gap-5">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="https://wa.me/0744180146"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaWhatsapp size={22} />
            </a>
          </div>
        </div>

        {/* Branding / Created by */}
        <div className="text-center md:text-right md:flex md:flex-col md:justify-end">
          <p className="text-sm tracking-wider">
            Created by <a href="https://arbaz-aro.vercel.app" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-gray-300 transition">Arbaz Ali</a>
          </p>
        </div>

      </div>

      <div className="mt-10 text-center text-gray-600 text-xs border-t border-gray-800 pt-6 tracking-widest uppercase">
        &copy; {new Date().getFullYear()} Garb Gallery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;