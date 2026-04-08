import { useState, useEffect } from "react";
import { Search, Menu, X, ShoppingBag } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/ShopContextProvider";
import logo from "../assets/Glogo.png";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  
  const { cart } = useApp(); 

  // --- OLD CODE LOGIC APPLIED HERE ---
  // Agar cart ke andar items hain, toh unki quantity ko plus karega (jese purane code mein tha)
  const cartCount = cart?.items?.length > 0 
    ? cart.items.reduce((acc, item) => acc + (item.quantity || 1), 0) 
    : 0;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
        <nav
          className={`w-full transition-all duration-500 ease-in-out ${
            scrolled
              ? "bg-white/90 backdrop-blur-md py-3 shadow-sm border-b border-gray-100"
              : "bg-transparent py-6"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 z-50 group">
              <div className={`transition-all duration-500 ease-in-out overflow-hidden rounded-full border border-black/5 ${scrolled ? 'w-10 h-10' : 'w-14 h-14'}`}>
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-left">
                <span className={`font-bold tracking-[0.3em] uppercase transition-all duration-500 ${scrolled ? 'text-black text-sm' : 'text-white text-base'}`}>
                  Garb Gallery
                </span>
                <div className={`overflow-hidden transition-all duration-500 ${scrolled ? 'h-0 opacity-0' : 'h-4 opacity-100'}`}>
                   <span className="text-[8px] text-gray-400 tracking-[0.2em] uppercase font-bold">Premium Apparel</span>
                </div>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={index}
                    to={link.path}
                    className={`relative text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 ${
                      isActive 
                        ? (scrolled ? "text-black" : "text-white") 
                        : (scrolled ? "text-gray-400 hover:text-black" : "text-gray-300 hover:text-white")
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span 
                        layoutId="navUnderline"
                        className={`absolute -bottom-1 left-0 w-full h-[1.5px] ${scrolled ? 'bg-black' : 'bg-white'}`} 
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Section Icons */}
            <div className="flex items-center gap-1 md:gap-3">
              <button 
                onClick={() => setSearchOpen(true)} 
                className={`p-2 rounded-full transition-all ${scrolled ? 'text-black hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              {/* Shopping Cart Icon - path set to "/carts" as requested */}
              <Link 
                to="/carts" 
                className={`relative p-2 rounded-full transition-all flex items-center justify-center ${
                  scrolled ? 'text-black hover:bg-black/5' : 'text-white hover:bg-white/10'
                }`}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      key="cart-badge"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[9px] font-black flex items-center justify-center rounded-full z-10 shadow-[0_0_10px_rgba(0,0,0,0.1)] border ${
                        scrolled 
                          ? 'bg-black text-white border-white/10' 
                          : 'bg-white text-black border-black/10'
                      }`}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              <button 
                onClick={() => setMenuOpen(true)} 
                className={`md:hidden p-2 rounded-full ${scrolled ? 'text-black' : 'text-white'}`}
              >
                <Menu size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Overlays */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-white/40 text-[10px] font-black tracking-[0.5em] uppercase">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="text-white p-2">
                <X size={30} strokeWidth={1} />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div key={link.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link to={link.path} className="text-5xl font-light text-white tracking-tighter italic font-serif">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="pt-6 border-t border-white/10 mt-4">
                <Link to="/carts" className="text-2xl font-bold text-white tracking-widest uppercase flex items-center justify-between">
                  <span>Cart</span>
                  <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-black">{cartCount}</span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}

        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <button onClick={() => setSearchOpen(false)} className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors">
              <X size={32} strokeWidth={1} />
            </button>
            
            <div className="w-full max-w-3xl text-center">
              <span className="text-gray-500 text-[10px] uppercase tracking-[0.6em] mb-6 block font-black">Search Collections</span>
              <input 
                autoFocus
                type="text"
                placeholder="TYPE HERE..."
                className="w-full bg-transparent border-b border-white/10 py-6 text-3xl md:text-6xl text-white font-light focus:outline-none focus:border-white/50 transition-all text-center uppercase"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;