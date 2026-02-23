import React from "react";

const ThemeLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden">

      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:40px_40px] animate-gridMove opacity-20"></div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px]"></div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
};

export default ThemeLayout;
