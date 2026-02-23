import React from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

const AboutPage = () => {
  return (
    <section className="min-h-screen bg-white text-black px-6 pt-40 py-20">
      <div className="max-w-5xl mx-auto flex flex-col gap-12 items-center">

        {/* Heading */}
        <h1 className="text-5xl font-bold text-center">
          About <span className="text-black/80">Nextfit</span>
        </h1>

        {/* Description Card */}
        <div className="bg-gray-50 p-8 rounded-3xl shadow-lg text-center text-gray-700 text-lg leading-relaxed">
          Nextfit is your go-to brand for modern, stylish, and high-quality clothing. 
          We focus on comfort, style, and durability, bringing you the best T-shirts and apparel 
          for everyday life. Our mission is to make fashion accessible, trendy, and simple.
        </div>

        {/* Contact Info Cards */}
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
          <div className="bg-gray-50 p-6 rounded-2xl shadow-md flex-1 text-center hover:scale-105 transition cursor-pointer">
            <h2 className="font-semibold text-black mb-2">📞 Phone</h2>
            <p className="text-gray-600 text-lg">+92 300 1234567</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl shadow-md flex-1 text-center hover:scale-105 transition cursor-pointer">
            <h2 className="font-semibold text-black mb-2">📧 Email</h2>
            <p className="text-gray-600 text-lg">nextfit.business@gmail.com</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-8 mt-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="bg-gray-50 p-3 rounded-full shadow hover:bg-black hover:text-white transition"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="bg-gray-50 p-3 rounded-full shadow hover:bg-black hover:text-white transition"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="bg-gray-50 p-3 rounded-full shadow hover:bg-black hover:text-white transition"
          >
            <Youtube size={24} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default AboutPage;
