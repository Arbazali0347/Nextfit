import React, { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusSquare, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight 
} from "lucide-react";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Overview", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Orders", path: "/dashboard/orders", icon: <ShoppingBag size={20} /> },
    { name: "Add Product", path: "/dashboard/add-product", icon: <PlusSquare size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#09090b] text-white overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#121214] border-r border-white/5 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="h-16 flex items-center px-6 border-b border-white/5">
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent cursor-pointer" onClick={() => navigate('/')}>
              GARB Gallery
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"} // Only exact match for Overview
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? "bg-yellow-500 text-black font-semibold shadow-[0_0_15px_rgba(234,179,8,0.4)]" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
                <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </NavLink>
            ))}
          </nav>

          {/* Logout Area */}
          <div className="p-4 border-t border-white/5">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header (Mobile Toggle) */}
        <header className="h-16 flex items-center justify-between px-6 bg-[#09090b] border-b border-white/5 md:hidden">
          <span className="font-bold text-lg">Dashboard</span>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-400 hover:text-white"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-800">
          {children || <Outlet />} 
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;