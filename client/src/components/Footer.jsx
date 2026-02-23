import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-gray-500 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <p>Phone: +92 300 1234567</p>
          <p>Email: nextfitbrand@gmail.com</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Branding / Created by */}
        <div className="text-center md:text-right md:flex md:flex-col md:justify-end">
          <p className="text-sm">Created by <span className="font-semibold text-white">arbaz.framer.website</span></p>
        </div>

      </div>

      <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Nextfit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
