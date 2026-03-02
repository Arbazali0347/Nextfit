// Navbar.jsx
import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X, TrendingUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/ShopContextProvider";
import TopOfferBar from "./TopSection";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const { cart } = useApp();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const popularSearches = ["Oversized Tees", "Summer Collection", "Black Hoodie", "Gym Wear"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    if (searchOpen || menuOpen) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [searchOpen, menuOpen]);

  useEffect(() => {
    if (searchOpen || menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [searchOpen, menuOpen]);

  return (
    <>
      {/* Changes Made Here: 
        Header is set to fixed, but we add pt-[100px] to your Hero section or main layout 
        so the content below doesn't get hidden. 
      */}
      <header className="fixed top-0 left-0 w-full z-50 flex flex-col">
        {/* Top Offer Bar is inside the fixed header now */}
        <div className={`transition-all duration-300 ${scrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-10 opacity-100'}`}>
          <TopOfferBar />
        </div>

        {/* Main Navbar */}
        <nav
          className={`w-full transition-all duration-500 ${scrolled
              ? "bg-black/90 backdrop-blur-xl border-b border-white/10 py-2 shadow-lg"
              : "bg-black/40 backdrop-blur-md py-4"
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between transition-all">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl md:text-3xl font-extrabold tracking-wider text-white hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 z-50"
            >
              <span className="w-1.5 h-7 md:h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></span>
              Nextfit
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={index}
                    to={link.path}
                    className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 group ${isActive ? "text-yellow-400" : "text-gray-300 hover:text-white"
                      }`}
                  >
                    {link.name}
                    <span
                      className={`absolute left-0 -bottom-2 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    ></span>
                  </Link>
                );
              })}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4 md:gap-6">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                aria-label="Search"
              >
                <Search size={22} className="group-hover:scale-110 transition-transform" />
                <span className="hidden lg:block text-xs text-gray-400 border border-gray-600 rounded px-2 py-1 group-hover:border-gray-400 transition-colors">
                  Cmd+K
                </span>
              </button>

              <Link
                to="/carts"
                className="relative p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 group"
                aria-label="Cart"
              >
                <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                {cart?.items?.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-yellow-400 text-black rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                    {cart.items.reduce((acc, item) => acc + (item.quantity || 1), 0)}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 z-50"
                aria-label="Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* CRITICAL FIX FOR SPACING: 
        This empty div acts as a spacer so your content below (like Hero) 
        doesn't get hidden under the fixed header. 
      */}
      <div className="h-[100px] w-full bg-black"></div>

      <AnimatePresence>
        {/* Mobile Sidebar  */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-72 bg-[#0a0a0a] border-r border-white/10 p-6 flex flex-col relative h-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10 mt-4">
                <span className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-yellow-400 rounded-full"></span> Nextfit
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={index}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300 ${isActive
                          ? "bg-yellow-400/10 text-yellow-400"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Search Modal */}
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-start justify-center z-[70] pt-[15vh] px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-2xl relative shadow-2xl"
            >
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Search Nextfit</h2>
                <p className="text-gray-400 text-sm">Find your perfect fit from our latest collection.</p>
              </div>

              <div className="relative group">
                <Search className="absolute left-4 top-4 text-gray-400 group-focus-within:text-yellow-400 transition-colors" size={22} />
                <input
                  type="text"
                  placeholder="Search for t-shirts, hoodies, etc..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all duration-300 text-lg"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-4 p-1 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Trending Searches */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-medium">
                  <TrendingUp size={16} className="text-yellow-500" />
                  <span>Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearch(term)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-full text-sm text-gray-300 hover:text-white transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-center text-sm text-gray-500">
                Press <kbd className="px-2 py-1 mx-1 bg-white/10 rounded-md text-gray-300 font-mono text-xs border border-white/5">ESC</kbd> to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;