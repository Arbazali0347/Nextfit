import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/ShopContextProvider";
import TopOfferBar from "./TopSection";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { cart } = useApp();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Handle ESC key to close search modal
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

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <TopOfferBar />

        <div className="max-w-7xl mx-auto px-3 py-5 flex items-center justify-between">

          {/* Logo with gradient accent */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wider text-white hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2"
          >
            <span className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full"></span>
            Nextfit
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute left-0 -bottom-2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300"
            >
              <Menu size={24} />
            </button>

            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 group"
            >
              <Search size={20} />
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Cmd+K</span>
            </button>

            {/* Cart Button */}
            <Link
              to="/carts"
              className="relative p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 group"
            >
              <ShoppingCart size={20} />
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full animate-pulse">
                  {cart.items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex">
          <div className="w-64 bg-black/95 backdrop-blur-xl p-6 flex flex-col gap-6 relative border-r border-white/5 animate-in slide-in-from-left">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
            >
              <X size={24} />
            </button>

            <div className="mt-8 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-semibold text-white hover:text-yellow-400 transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-black/60 to-black/40 border border-white/10 rounded-2xl p-8 w-[90%] max-w-2xl relative backdrop-blur-xl shadow-2xl">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
            >
              <X size={24} />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Search Products</h2>
              <p className="text-gray-400 text-sm">Find your perfect style from our collection</p>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search Nextfit products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-all duration-300"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-3.5 p-0.5 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>Press <kbd className="px-2 py-1 bg-white/10 rounded text-gray-400 text-xs">ESC</kbd> to close</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
