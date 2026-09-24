import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ZoblyLogo } from '../common/ZoblyLogo';
import { FlyingBirdsBackground } from './FlyingBirdsBackground';

interface AuthBackgroundProps {
  children: React.ReactNode;
  onNavigateHome: () => void;
}

export const AuthBackground: React.FC<AuthBackgroundProps> = ({ children, onNavigateHome }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#6BAEE8] via-[#A6D6F7] to-[#E9F4FE] flex flex-col justify-between selection:bg-[#2563EB] selection:text-white">
      
      {/* =========================================================================
          ATMOSPHERIC SKY, MOUNTAINS, AND CLOUD LAYERS (MATCHING REFERENCE COMPOSITION)
          ========================================================================= */}
      
      {/* Sun glow radiance in upper atmosphere */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-white/70 via-[#E0F2FE]/40 to-transparent rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Subtle sunbeam flare */}
      <div 
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#FEF08A]/25 rounded-full blur-[80px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Ambient distant mountain ridges SVG */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden h-[420px] sm:h-[500px] z-0">
        <svg 
          viewBox="0 0 1440 480" 
          fill="none" 
          preserveAspectRatio="none" 
          className="w-full h-full object-cover"
        >
          {/* Backmost mountain ridge with blue atmospheric haze */}
          <path 
            d="M-50 480L-50 290L120 230L260 270L410 190L580 260L740 180L900 240L1080 170L1250 250L1390 200L1500 280L1500 480Z" 
            fill="url(#mountain_back_grad)" 
            opacity="0.45"
          />

          {/* Middle mountain ridge with jagged peaks */}
          <path 
            d="M-30 480L-30 330L150 260L320 310L490 220L670 290L820 210L990 280L1160 230L1320 300L1480 250L1480 480Z" 
            fill="url(#mountain_mid_grad)" 
            opacity="0.65"
          />

          {/* Foreground mountain ridge */}
          <path 
            d="M-20 480L-20 370L180 300L350 350L530 270L710 330L880 260L1040 320L1220 270L1400 330L1460 310L1460 480Z" 
            fill="url(#mountain_front_grad)" 
            opacity="0.8"
          />

          {/* Lower soft billowing mist and cloud bank */}
          <path 
            d="M0 480C140 430 260 450 400 420C550 390 680 440 850 410C1010 380 1180 430 1340 410C1400 405 1440 415 1440 480Z" 
            fill="url(#cloud_mist_grad)" 
          />

          <defs>
            <linearGradient id="mountain_back_grad" x1="720" y1="170" x2="720" y2="480" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60A5FA" />
              <stop offset="0.5" stopColor="#93C5FD" />
              <stop offset="1" stopColor="#BFDBFE" />
            </linearGradient>
            
            <linearGradient id="mountain_mid_grad" x1="720" y1="210" x2="720" y2="480" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="0.6" stopColor="#60A5FA" />
              <stop offset="1" stopColor="#DBEAFE" />
            </linearGradient>

            <linearGradient id="mountain_front_grad" x1="720" y1="260" x2="720" y2="480" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="0.4" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#EFF6FF" />
            </linearGradient>

            <linearGradient id="cloud_mist_grad" x1="720" y1="380" x2="720" y2="480" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="0.7" stopColor="#FFFFFF" stopOpacity="0.98" />
              <stop offset="1" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating billowy clouds at corners */}
      <div 
        className="absolute top-1/4 -left-20 w-80 h-40 bg-white/50 rounded-full blur-2xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/3 -right-20 w-96 h-48 bg-white/50 rounded-full blur-2xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-40 bg-white/70 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Realistic Avian Flight Layer across Mountain Sky */}
      <FlyingBirdsBackground />

      {/* =========================================================================
          TOP MINIMAL NAVIGATION
          ========================================================================= */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Subtle Back to Zobly button */}
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs sm:text-sm font-semibold text-[#1E293B] shadow-xs backdrop-blur-md border border-white/80 transition-all cursor-pointer group"
          title="Back to Zobly Homepage"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#2563EB] group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Zobly</span>
        </button>

        {/* Brand Tag */}
        <button
          onClick={onNavigateHome}
          className="flex items-center text-left cursor-pointer group"
          id="auth-header-brand-btn"
        >
          <ZoblyLogo className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105" id="auth-header-brand-logo" />
        </button>
      </header>

      {/* =========================================================================
          MAIN AUTH CARD CONTAINER
          ========================================================================= */}
      <main 
        className="relative z-10 flex-grow flex items-center justify-center px-4 py-8 sm:py-12"
        id="auth-main-container"
      >
        {children}
      </main>

      {/* =========================================================================
          SUBTLE MINIMAL BRAND FOOTNOTE
          ========================================================================= */}
      <footer className="relative z-10 pb-6 text-center text-[11px] text-[#64748B] tracking-wide">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[#475569] opacity-80">
          zobly • Build Skills. Build Proof. Build Your Career.
        </div>
      </footer>

    </div>
  );
};
