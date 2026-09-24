import React from 'react';
import { motion } from 'motion/react';

interface RocketIllustrationProps {
  launch?: boolean;
}

export const RocketIllustration: React.FC<RocketIllustrationProps> = ({ launch = true }) => {
  return (
    <div className="relative w-full max-w-[260px] mx-auto flex flex-col items-center justify-center select-none pointer-events-none">
      
      {/* Editorial Typographic Badge to the top-left matching reference:
          "Small Steps Big Futures —" */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute -top-4 -left-6 sm:-left-10 text-left font-serif italic text-xs sm:text-sm text-[#475569] leading-tight select-none opacity-85"
      >
        <span>Small</span><br />
        <span>Steps</span><br />
        <span className="font-semibold text-[#2563EB]">Big</span><br />
        <span>Futures</span><br />
        <span className="inline-block w-4 h-0.5 bg-[#94A3B8] mt-1" />
      </motion.div>

      {/* Twinkling ambient stars matching reference */}
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-2 right-2 text-[#FBBF24] text-xl font-bold"
      >
        ✦
      </motion.div>

      <motion.div 
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 1 }}
        className="absolute top-16 -right-6 text-[#60A5FA] text-sm"
      >
        ✦
      </motion.div>

      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 0.5 }}
        className="absolute -top-2 left-16 text-[#FBBF24] text-xs"
      >
        ✦
      </motion.div>

      {/* Main Rocket SVG + Upward Launch Motion */}
      <motion.div
        initial={launch ? { y: 25, opacity: 0.7 } : { y: 0, opacity: 1 }}
        animate={launch ? { y: [25, -6, 0] } : { y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <svg 
          viewBox="0 0 200 240" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-40 sm:w-48 h-auto drop-shadow-[0_20px_25px_rgba(37,99,235,0.25)]"
        >
          <defs>
            {/* Ceramic fuselage gradient */}
            <linearGradient id="fuselage_body" x1="60" y1="50" x2="140" y2="170" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.6" stopColor="#F8FAFC" />
              <stop offset="1" stopColor="#E2E8F0" />
            </linearGradient>

            {/* Nosecone royal blue gradient */}
            <linearGradient id="nose_cone" x1="100" y1="20" x2="100" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="0.5" stopColor="#2563EB" />
              <stop offset="1" stopColor="#1D4ED8" />
            </linearGradient>

            {/* Left fin gradient */}
            <linearGradient id="fin_left" x1="55" y1="120" x2="25" y2="185" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="0.7" stopColor="#1D4ED8" />
              <stop offset="1" stopColor="#1E3A8A" />
            </linearGradient>

            {/* Right fin gradient */}
            <linearGradient id="fin_right" x1="145" y1="120" x2="175" y2="185" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="0.7" stopColor="#1D4ED8" />
              <stop offset="1" stopColor="#1E3A8A" />
            </linearGradient>

            {/* Center spine fin */}
            <linearGradient id="fin_center" x1="100" y1="110" x2="100" y2="175" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60A5FA" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>

            {/* Rocket thrust flame */}
            <linearGradient id="exhaust_flame" x1="100" y1="175" x2="100" y2="235" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF08A" />
              <stop offset="0.3" stopColor="#F59E0B" />
              <stop offset="0.7" stopColor="#EF4444" stopOpacity="0.8" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>

            {/* Core electric plasma */}
            <linearGradient id="core_plasma" x1="100" y1="175" x2="100" y2="215" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.4" stopColor="#67E8F9" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>

            {/* Porthole badge */}
            <linearGradient id="porthole_z" x1="85" y1="85" x2="115" y2="115" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284C7" />
              <stop offset="0.5" stopColor="#2563EB" />
              <stop offset="1" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>

          {/* Exhaust thrust flame (animating) */}
          <g>
            <path 
              d="M85 174C85 174 72 205 100 235C128 205 115 174 115 174H85Z" 
              fill="url(#exhaust_flame)" 
              className="animate-pulse"
            />
            <path 
              d="M91 174C91 174 85 195 100 215C115 195 109 174 109 174H91Z" 
              fill="url(#core_plasma)" 
            />
          </g>

          {/* Left swept wing / aerodynamic fin */}
          <path 
            d="M62 135C52 145 32 172 28 185C42 186 60 176 65 168L62 135Z" 
            fill="url(#fin_left)" 
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
          />

          {/* Right swept wing / aerodynamic fin */}
          <path 
            d="M138 135C148 145 168 172 172 185C158 186 140 176 135 168L138 135Z" 
            fill="url(#fin_right)" 
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
          />

          {/* Main Ceramic Fuselage Body */}
          <path 
            d="M100 24C80 50 64 95 64 160C64 172 72 176 100 176C128 176 136 172 136 160C136 95 120 50 100 24Z" 
            fill="url(#fuselage_body)" 
            stroke="#CBD5E1" 
            strokeWidth="1.5"
          />

          {/* Glossy Fuselage Highlight Reflection */}
          <path 
            d="M86 45C76 65 72 100 72 155C75 140 82 75 93 48C90 47 88 46 86 45Z" 
            fill="#FFFFFF" 
            opacity="0.85"
          />

          {/* Nosecone Cap */}
          <path 
            d="M100 24C88 40 76 62 74 76C82 78 118 78 126 76C124 62 112 40 100 24Z" 
            fill="url(#nose_cone)" 
          />

          {/* Metallic Nozzle Base */}
          <path 
            d="M82 172H118L114 180H86L82 172Z" 
            fill="#334155" 
          />

          {/* Circular Port Window */}
          <circle cx="100" cy="104" r="18" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
          <circle cx="100" cy="104" r="14" fill="url(#porthole_z)" />
          
          {/* Z mark inside port window */}
          <path 
            d="M94 99H106L97 109H106" 
            stroke="#FFFFFF" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Center Keel/Rudder Fin */}
          <path 
            d="M98 135L98 175C100 176 102 176 102 175L102 135C100 134 100 134 98 135Z" 
            fill="url(#fin_center)" 
          />
        </svg>
      </motion.div>

      {/* Billowing cloud puffs at launch pad / base */}
      <div className="relative -mt-6 flex items-center justify-center gap-1">
        <div className="w-14 h-8 bg-white/90 rounded-full blur-[2px] shadow-sm -mr-3" />
        <div className="w-20 h-10 bg-white rounded-full blur-[2px] shadow-md z-10" />
        <div className="w-14 h-8 bg-white/90 rounded-full blur-[2px] shadow-sm -ml-3" />
      </div>

    </div>
  );
};
