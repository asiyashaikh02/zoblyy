import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  GraduationCap,
  Code2,
  Cloud,
  CheckCircle2
} from 'lucide-react';
import { ZoblyLogo } from '../common/ZoblyLogo';

export interface FloatingCardDef {
  id: string;
  name: string;
  iconType: 'python' | 'github' | 'javascript' | 'react' | 'nodejs' | 'html' | 'sql' | 'figma' | 'css';
  leftPct: number;    // % from left container edge (balanced across Left / Center / Right)
  topPx: number;      // px from top of stage
  zIndex: number;
  initialRotate?: number;
}

export interface FloatingPillDef {
  id: string;
  label: string;
  bg: string;
  border: string;
  text: string;
  leftPct: number;
  topPx: number;
  zIndex: number;
  rotate?: number;
  hasSparkle?: boolean;
}

// =========================================================================
// REFINED BALANCED FLOATING CONSTELLATION
// Spacious, organized, zero heavy stacking.
// Each major skill card has intentional breathing room:
//
//                 Python (50%)
//
//        Node.js (24%)          JavaScript (76%)
//
//             GitHub (39%)    React (63%)
//
//         HTML (19%)     SQL (51%)     Figma (83%)
//
//              CSS (37%)
// =========================================================================
const REFERENCE_CARDS: FloatingCardDef[] = [
  {
    id: 'python',
    name: 'Python',
    iconType: 'python',
    leftPct: 50,
    topPx: 12,
    zIndex: 16,
    initialRotate: 0,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    iconType: 'nodejs',
    leftPct: 24,
    topPx: 46,
    zIndex: 14,
    initialRotate: -2,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    iconType: 'javascript',
    leftPct: 76,
    topPx: 42,
    zIndex: 14,
    initialRotate: 2,
  },
  {
    id: 'github',
    name: 'GitHub',
    iconType: 'github',
    leftPct: 39,
    topPx: 82,
    zIndex: 20,
    initialRotate: 1,
  },
  {
    id: 'react',
    name: 'React',
    iconType: 'react',
    leftPct: 63,
    topPx: 86,
    zIndex: 18,
    initialRotate: -1,
  },
  {
    id: 'html',
    name: 'HTML',
    iconType: 'html',
    leftPct: 19,
    topPx: 136,
    zIndex: 15,
    initialRotate: 1,
  },
  {
    id: 'sql',
    name: 'SQL',
    iconType: 'sql',
    leftPct: 51,
    topPx: 144,
    zIndex: 17,
    initialRotate: 0,
  },
  {
    id: 'figma',
    name: 'Figma',
    iconType: 'figma',
    leftPct: 83,
    topPx: 134,
    zIndex: 15,
    initialRotate: -2,
  },
  {
    id: 'css',
    name: 'CSS',
    iconType: 'css',
    leftPct: 37,
    topPx: 194,
    zIndex: 19,
    initialRotate: 0,
  }
];

// Supporting pastel floating skill pills placed naturally in open pockets:
// They never cover Python, GitHub, React, JavaScript, Node.js, HTML, SQL, or Figma.
const REFERENCE_PILLS: FloatingPillDef[] = [
  {
    id: 'ai-tools',
    label: 'AI Tools',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    text: '#7C3AED',
    leftPct: 12,
    topPx: 20,
    zIndex: 22,
    rotate: -4,
    hasSparkle: true,
  },
  {
    id: 'apis',
    label: 'APIs',
    bg: '#F0FDF4',
    border: '#BAE6FD',
    text: '#0284C7',
    leftPct: 27,
    topPx: 154,
    zIndex: 24,
    rotate: 0,
  },
  {
    id: 'automation',
    label: 'Automation',
    bg: '#FFF7ED',
    border: '#FED7AA',
    text: '#EA580C',
    leftPct: 64,
    topPx: 198,
    zIndex: 25,
    rotate: 0,
  },
  {
    id: 'databases',
    label: 'Databases',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    text: '#059669',
    leftPct: 24,
    topPx: 228,
    zIndex: 23,
    rotate: 0,
  },
  {
    id: 'deployment',
    label: 'Deployment',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    text: '#2563EB',
    leftPct: 77,
    topPx: 220,
    zIndex: 23,
    rotate: 1,
  },
];

// Continuous sequence of skills entering/pulsing and descending toward the white box
const SEQUENCE_SKILLS = [
  { name: 'Python', id: 'python', color: '#387EB8' },
  { name: 'GitHub', id: 'github', color: '#181717' },
  { name: 'React', id: 'react', color: '#00D8FF' },
  { name: 'JavaScript', id: 'javascript', color: '#F7DF1E' },
  { name: 'Node.js', id: 'nodejs', color: '#339933' },
  { name: 'HTML', id: 'html', color: '#E34F26' },
  { name: 'SQL', id: 'sql', color: '#0284C7' },
  { name: 'Figma', id: 'figma', color: '#F24E1E' },
  { name: 'CSS', id: 'css', color: '#264DE4' },
];

export const ZoblyProofSection: React.FC = () => {
  // Active skill in continuous calm loop
  const [activeCycleIndex, setActiveCycleIndex] = useState(0);

  // Slow, calm, premium pacing: cycles every 4.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCycleIndex((prev) => (prev + 1) % SEQUENCE_SKILLS.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const activeSkill = SEQUENCE_SKILLS[activeCycleIndex];

  // Render high-fidelity SVG icon for each skill matching the reference
  const renderSkillIcon = (iconType: string) => {
    switch (iconType) {
      case 'python':
        return (
          <svg viewBox="0 0 110 110" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
            <defs>
              <linearGradient id="proofPyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#387EB8" />
                <stop offset="100%" stopColor="#366994" />
              </linearGradient>
              <linearGradient id="proofPyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE873" />
                <stop offset="100%" stopColor="#FFD43B" />
              </linearGradient>
            </defs>
            <path d="M54.5 9c-24.3 0-22.8 10.5-22.8 10.5l.02 10.9h23.3v3.3H22.4S6.2 31.8 6.2 56.4c0 24.5 14.1 23.7 14.1 23.7h8.4v-11.8c0-13.4 11.5-13 11.5-13h22.7s11-.2 11-10.7V20.2S75.8 9 54.5 9zm-12.7 7.2a3.8 3.8 0 1 1 0 7.7 3.8 3.8 0 0 1 0-7.7z" fill="url(#proofPyGrad1)" />
            <path d="M55.5 101c24.3 0 22.8-10.5 22.8-10.5l-.02-10.9H55v-3.3h32.6s16.2 1.9 16.2-22.7c0-24.5-14.1-23.7-14.1-23.7h-8.4v11.8c0 13.4-11.5 13-11.5 13H47.6s-11 .2-11 10.7v24.4s-1.9 11.2 18.9 11.2zm12.7-7.2a3.8 3.8 0 1 1 0 7.7 3.8 3.8 0 0 1 0-7.7z" fill="url(#proofPyGrad2)" />
          </svg>
        );
      case 'github':
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-[#181717]">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        );
      case 'javascript':
        return (
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-[#F7DF1E] text-[#000000] font-black text-xs flex items-end justify-end p-0.5 shadow-2xs">
            <span className="leading-none pr-0.5 pb-0.5 font-mono text-xs sm:text-sm font-bold">JS</span>
          </div>
        );
      case 'react':
        return (
          <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#00D8FF] animate-[spin_26s_linear_infinite]">
            <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2"/>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
          </svg>
        );
      case 'nodejs':
        return (
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center shadow-2xs">
            <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-[#339933]">
              <path d="M16 2.2L3.5 9.4v13.2L16 29.8l12.5-7.2V9.4L16 2.2zm9.8 19.3L16 27.1 6.2 21.5V10.5L16 4.9l9.8 5.6v11z"/>
              <path d="M16 8.8l-5.6 3.2v6.4l5.6 3.2 5.6-3.2V12L16 8.8zm-3.2 8.3v-3.7l3.2-1.8 3.2 1.8v3.7l-3.2 1.8-3.2-1.8z"/>
            </svg>
          </div>
        );
      case 'html':
        return (
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-[#E34F26] text-white flex items-center justify-center font-black shadow-2xs">
            <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white">
              <path d="M4 2h16l-1.5 17.5L12 22l-6.5-2.5L4 2zm13.8 4H6.2l.3 3.5h11l-.3 3.5-5.2 1.5-5.2-1.5-.2-2H4.5l.4 4.5L12 18.5l7.1-2.9.7-9.6z" />
            </svg>
          </div>
        );
      case 'sql':
        return (
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shadow-2xs">
            <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0284C7] fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
            </svg>
          </div>
        );
      case 'figma':
        return (
          <svg viewBox="0 0 38 57" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
            <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
            <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
            <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
            <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
            <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
          </svg>
        );
      case 'css':
        return (
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-[#264DE4] text-white flex items-center justify-center font-black shadow-2xs">
            <span className="font-mono text-xs sm:text-sm font-bold">3</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      id="zobly-proof" 
      aria-label="Zobly Proof"
      className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-gradient-to-b from-[#FAFAFA] via-[#F3F8FF]/50 to-[#FAFAFA] border-t border-[#E2E8F0]/80 select-none"
    >
      {/* ============================================================ */}
      {/* 1. SOFT CONTINUOUS BACKGROUND ENVIRONMENT                     */}
      {/* ============================================================ */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] lg:w-[1250px] h-[650px] pointer-events-none -z-0 opacity-70"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(224, 238, 255, 0.7) 0%, rgba(240, 235, 255, 0.4) 45%, rgba(250, 250, 250, 0) 75%)',
        }}
      />
      <div 
        className="absolute top-1/3 left-[5%] w-[380px] h-[380px] pointer-events-none -z-0 opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(191, 219, 254, 0.55) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute top-1/3 right-[5%] w-[380px] h-[380px] pointer-events-none -z-0 opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(233, 213, 255, 0.5) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ============================================================ */}
        {/* 2. THE MAIN COMPOSITION: FLOATING CLUSTER -> LIGHT BEAMS -> BOX */}
        {/* ============================================================ */}
        <div className="relative max-w-3xl mx-auto flex flex-col items-center">
          
          {/* STAGE CONTAINER: Clean vertical stack with intentional breathing room */}
          <div className="w-full relative flex flex-col items-center">

            {/* -------------------------------------------------------- */}
            {/* A. FLOATING SKILLS CONSTELLATION (UPPER PORTION)         */}
            {/* Spacious, balanced left/center/right distribution         */}
            {/* -------------------------------------------------------- */}
            <div className="relative w-full h-[280px] sm:h-[300px] md:h-[310px] overflow-visible scale-[0.85] xs:scale-95 sm:scale-100 origin-top">

              {/* 1. MAJOR SKILL CARDS */}
              {REFERENCE_CARDS.map((card, idx) => {
                const isCurrentlyActive = activeSkill.id === card.id;

                return (
                  <motion.div
                    key={card.id}
                    className="absolute -translate-x-1/2 will-change-transform cursor-pointer group"
                    style={{
                      left: `${card.leftPct}%`,
                      top: `${card.topPx}px`,
                      zIndex: isCurrentlyActive ? 30 : card.zIndex,
                    }}
                    initial={{ y: 0, rotate: card.initialRotate || 0 }}
                    animate={
                      isCurrentlyActive
                        ? { 
                            // Only the active skill has gentle downward flowing progression
                            y: [0, 6, 14, 22, 0],
                            scale: [1, 1.05, 1.04, 1, 1],
                            rotate: [card.initialRotate || 0, 0, card.initialRotate || 0],
                          }
                        : { 
                            // Other skills remain calm with minimal soft floating
                            y: [0, -3, 0, 3, 0],
                            rotate: [card.initialRotate || 0, (card.initialRotate || 0) + 0.8, card.initialRotate || 0],
                          }
                    }
                    transition={{
                      duration: isCurrentlyActive ? 4.2 : 7.5 + (idx % 3) * 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: isCurrentlyActive ? 0 : idx * 0.3,
                    }}
                    whileHover={{ scale: 1.08, y: -4 }}
                    onClick={() => {
                      const foundIdx = SEQUENCE_SKILLS.findIndex(s => s.id === card.id);
                      if (foundIdx !== -1) setActiveCycleIndex(foundIdx);
                    }}
                  >
                    {/* The Clean White Card */}
                    <div 
                      className={`relative flex flex-col items-center justify-center rounded-xl sm:rounded-2xl bg-white border transition-all duration-300 ${
                        isCurrentlyActive 
                          ? 'border-blue-400 shadow-[0_12px_28px_rgba(37,99,235,0.18),0_4px_10px_rgba(15,23,42,0.05)] ring-2 ring-blue-400/40' 
                          : 'border-[#E2E8F0] shadow-[0_6px_18px_-4px_rgba(15,23,42,0.06),0_2px_6px_-2px_rgba(15,23,42,0.03)] group-hover:border-blue-200'
                      } p-2 sm:p-2.5 min-w-[66px] sm:min-w-[76px] md:min-w-[82px]`}
                    >
                      {/* Icon */}
                      <div className="flex items-center justify-center">
                        {renderSkillIcon(card.iconType)}
                      </div>

                      {/* Tool Name Label */}
                      <span className="text-[10px] sm:text-[11px] md:text-xs font-bold text-[#0F172A] mt-1 sm:mt-1.5 font-sans tracking-tight leading-none text-center">
                        {card.name}
                      </span>

                      {/* Subtle Active Indicator Beacon */}
                      {isCurrentlyActive && (
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* 2. SUPPORTING PASTEL SKILL PILLS (Sitting gracefully between cards) */}
              {REFERENCE_PILLS.map((pill, pIdx) => {
                const isCurrentlyActive = activeSkill.id === pill.id;

                return (
                  <motion.div
                    key={pill.id}
                    className="absolute -translate-x-1/2 will-change-transform cursor-pointer"
                    style={{
                      left: `${pill.leftPct}%`,
                      top: `${pill.topPx}px`,
                      zIndex: pill.zIndex,
                    }}
                    initial={{ y: 0, rotate: pill.rotate || 0 }}
                    animate={{ 
                      y: [0, 2.5, 0, -2.5, 0],
                    }}
                    transition={{
                      duration: 6.5 + (pIdx % 2) * 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: pIdx * 0.4,
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div 
                      className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-tight shadow-[0_2px_8px_rgba(0,0,0,0.03)] border transition-all duration-300 ${
                        isCurrentlyActive ? 'ring-2 ring-blue-400 scale-105 shadow-xs' : ''
                      }`}
                      style={{
                        backgroundColor: pill.bg,
                        borderColor: pill.border,
                        color: pill.text,
                      }}
                    >
                      {pill.hasSparkle && (
                        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 fill-current opacity-75" />
                      )}
                      <span className="whitespace-nowrap">{pill.label}</span>
                    </div>
                  </motion.div>
                );
              })}

            </div>

            {/* -------------------------------------------------------- */}
            {/* B. STYLISH 3D PERSPECTIVE SKILLS CONVERGENCE FUNNEL      */}
            {/* Architectural 3D perspective vessel with elliptical intake*/}
            {/* rim, concentric depth rings, volumetric glass gradients  */}
            {/* and animated streamlines tapering into the Zobly engine  */}
            {/* -------------------------------------------------------- */}
            <div 
              id="skills-convergence-funnel"
              className="relative w-full max-w-xl sm:max-w-2xl h-32 sm:h-36 md:h-40 -my-3 sm:-my-4 z-15 pointer-events-none select-none flex flex-col items-center justify-end"
            >
              
              {/* 3D Perspective SVG Funnel Vessel */}
              <svg 
                viewBox="0 0 600 152" 
                className="w-full h-full overflow-visible"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* 3D Volumetric Body Gradient (Depth perception left-to-right highlight & center cone) */}
                  <linearGradient id="funnel3DBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.28" />
                    <stop offset="12%" stopColor="#93C5FD" stopOpacity="0.14" />
                    <stop offset="50%" stopColor="#2563EB" stopOpacity="0.30" />
                    <stop offset="88%" stopColor="#93C5FD" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.34" />
                  </linearGradient>

                  {/* Vertical Falloff Gradient for Cone */}
                  <linearGradient id="funnelVerticalFalloff" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.05" />
                    <stop offset="40%" stopColor="#60A5FA" stopOpacity="0.18" />
                    <stop offset="80%" stopColor="#3B82F6" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.48" />
                  </linearGradient>

                  {/* Top Perspective Rim Gradient */}
                  <linearGradient id="funnelRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                    <stop offset="25%" stopColor="#BAE6FD" stopOpacity="1" />
                    <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.75" />
                    <stop offset="75%" stopColor="#BAE6FD" stopOpacity="1" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.9" />
                  </linearGradient>

                  {/* Left Specular Glass Highlight */}
                  <linearGradient id="funnelLeftHighlight" x1="0%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.95" />
                    <stop offset="40%" stopColor="#93C5FD" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.9" />
                  </linearGradient>

                  {/* Right Specular Glass Highlight */}
                  <linearGradient id="funnelRightHighlight" x1="100%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.95" />
                  </linearGradient>

                  {/* Flow Ray Dash Gradient */}
                  <linearGradient id="streamRayGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.3" />
                    <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="1" />
                  </linearGradient>

                  {/* Center Core Beam Gradient */}
                  <linearGradient id="centerCoreBeamGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity="1" />
                  </linearGradient>

                  {/* Deep Interior Throat Glow */}
                  <radialGradient id="funnelInteriorGlow" cx="50%" cy="40%" r="50%">
                    <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.02" />
                  </radialGradient>

                  {/* Soft Radial Intake Light */}
                  <radialGradient id="funnelIntakeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.75" />
                    <stop offset="50%" stopColor="#93C5FD" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
                  </radialGradient>

                  {/* Neck Coupler Cylinder Gradient */}
                  <linearGradient id="throatNeckGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#EFF6FF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.7" />
                  </linearGradient>

                  {/* Collar Glow Filter */}
                  <filter id="collarGlow" x="-20%" y="-40%" width="140%" height="180%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* 1. TOP 3D PERSPECTIVE INTAKE RIM - BACK ARC (Recedes into depth) */}
                <path
                  d="M 60,18 A 240,16 0 0,1 540,18"
                  stroke="#93C5FD"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.55"
                  fill="none"
                />

                {/* 2. INTERIOR DEPTH VOLUME (Gives true 3D hollow mouth perception) */}
                <ellipse 
                  cx="300" 
                  cy="18" 
                  rx="238" 
                  ry="15.5" 
                  fill="url(#funnelInteriorGlow)" 
                />

                {/* 3. VOLUMETRIC CONE BODY (3D Shaded Funnel Walls with Broader Lower End) */}
                <path
                  d="M 60,18 C 120,44 175,92 215,140 L 385,140 C 425,92 480,44 540,18 A 240,16 0 0,1 60,18 Z"
                  fill="url(#funnel3DBodyGrad)"
                />
                <path
                  d="M 60,18 C 120,44 175,92 215,140 L 385,140 C 425,92 480,44 540,18 A 240,16 0 0,1 60,18 Z"
                  fill="url(#funnelVerticalFalloff)"
                />

                {/* 4. FOUR CONCENTRIC 3D PERSPECTIVE RINGS (Architectural Depth Slices) */}
                {/* Ring 1 - Upper Rim Level (y = 44) */}
                <g opacity="0.65">
                  <path
                    d="M 104,44 A 196,13 0 0,1 496,44"
                    stroke="#93C5FD"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                    fill="none"
                  />
                  <path
                    d="M 104,44 A 196,13 0 0,0 496,44"
                    stroke="#60A5FA"
                    strokeWidth="1.25"
                    fill="none"
                  />
                </g>

                {/* Ring 2 - Mid Level (y = 74) */}
                <g opacity="0.75">
                  <path
                    d="M 146,74 A 154,10.5 0 0,1 454,74"
                    stroke="#93C5FD"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                    fill="none"
                  />
                  <path
                    d="M 146,74 A 154,10.5 0 0,0 454,74"
                    stroke="#3B82F6"
                    strokeWidth="1.25"
                    fill="none"
                  />
                </g>

                {/* Ring 3 - Lower-Mid Level (y = 104) */}
                <g opacity="0.85">
                  <path
                    d="M 182,104 A 118,8 0 0,1 418,104"
                    stroke="#93C5FD"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                    fill="none"
                  />
                  <path
                    d="M 182,104 A 118,8 0 0,0 418,104"
                    stroke="#2563EB"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </g>

                {/* Ring 4 - Broadened Throat Entry Level (y = 132) */}
                <ellipse 
                  cx="300" 
                  cy="132" 
                  rx="88" 
                  ry="6" 
                  fill="none" 
                  stroke="#38BDF8" 
                  strokeWidth="1.5" 
                  strokeOpacity="0.9"
                />

                {/* 5. DYNAMIC 3D STREAMLINES & VORTEX CONVERGENCE */}
                {/* Stream 1 - Far Left Curved Vortex */}
                <path
                  d="M 90,20 C 135,48 180,90 228,138"
                  stroke="url(#streamRayGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="6 7"
                  className="animate-funnel-stream"
                />
                {/* Stream 2 - Mid Left Sweeping Spiral */}
                <path
                  d="M 190,24 C 218,56 248,96 268,138"
                  stroke="url(#streamRayGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                  className="animate-funnel-stream-slow"
                />
                {/* Stream 3 - Center High-Power Optical Axis */}
                <path
                  d="M 300,18 L 300,140"
                  stroke="url(#centerCoreBeamGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  className="animate-funnel-stream"
                />
                {/* Stream 4 - Mid Right Sweeping Spiral */}
                <path
                  d="M 410,24 C 382,56 352,96 332,138"
                  stroke="url(#streamRayGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                  className="animate-funnel-stream-slow"
                />
                {/* Stream 5 - Far Right Curved Vortex */}
                <path
                  d="M 510,20 C 465,48 420,90 372,138"
                  stroke="url(#streamRayGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="6 7"
                  className="animate-funnel-stream"
                />

                {/* 6. TOP 3D PERSPECTIVE INTAKE RIM - FRONT ARC (Crisp glass bevel) */}
                <path
                  d="M 60,18 A 240,16 0 0,0 540,18"
                  stroke="url(#funnelRimGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Left Outer Glass Bevel Wall */}
                <path
                  d="M 60,18 C 120,44 175,92 215,140"
                  stroke="url(#funnelLeftHighlight)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Right Outer Glass Bevel Wall */}
                <path
                  d="M 540,18 C 480,44 425,92 385,140"
                  stroke="url(#funnelRightHighlight)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* 7. BROADENED THROAT DOCKING COUPLER & AMBIENT PROOF POOL */}
                {/* Broadened Cylindrical Docking Collar Neck */}
                <rect 
                  x="214" 
                  y="138" 
                  width="172" 
                  height="12" 
                  rx="4" 
                  fill="url(#throatNeckGrad)" 
                  stroke="#93C5FD" 
                  strokeWidth="1" 
                />

                {/* Broadened Glowing Aperture Collar Ring */}
                <g filter="url(#collarGlow)">
                  <ellipse 
                    cx="300" 
                    cy="144" 
                    rx="86" 
                    ry="7" 
                    fill="url(#funnelIntakeGlow)" 
                    stroke="#38BDF8" 
                    strokeWidth="1.5"
                    className="animate-funnel-ring origin-center"
                  />
                </g>

                {/* Light Pooling onto top of white box */}
                <ellipse 
                  cx="300" 
                  cy="149" 
                  rx="145" 
                  ry="14" 
                  fill="url(#funnelIntakeGlow)" 
                  opacity="0.9"
                />

                {/* Floating 3D Spark Energy Beacons */}
                <circle cx="260" cy="54" r="2" fill="#38BDF8" className="animate-pulse" />
                <circle cx="340" cy="68" r="2.5" fill="#60A5FA" className="animate-pulse" />
                <circle cx="285" cy="98" r="2.5" fill="#2563EB" className="animate-pulse" />
                <circle cx="320" cy="118" r="2" fill="#38BDF8" className="animate-pulse" />
              </svg>

              {/* Minimalist Floating Perspective Status Badge */}
              <div 
                id="skills-funnel-indicator"
                className="absolute -bottom-2 sm:-bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-white/95 border border-[#BFDBFE] text-[#1D4ED8] shadow-[0_4px_14px_rgba(37,99,235,0.14)] backdrop-blur-xs text-[10px] sm:text-xs font-mono font-semibold tracking-wide whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-ping" />
                <span>3D CONVERGENCE</span>
                <span className="text-[#93C5FD] font-light">&bull;</span>
                <span className="text-[#64748B] font-sans font-medium">All Skills Flow into Proof</span>
              </div>

            </div>

            {/* -------------------------------------------------------- */}
            {/* C. LARGE WHITE ZOBLY BOX (CENTRAL ANCHOR CONTAINER)     */}
            {/* Pure white, large rounded corners, subtle hairline       */}
            {/* border, soft shadow, generous whitespace, completely     */}
            {/* stable as requested.                                     */}
            {/* -------------------------------------------------------- */}
            <div className="relative w-full max-w-xl sm:max-w-2xl bg-white rounded-3xl sm:rounded-[36px] md:rounded-[42px] border border-[#E2E8F0] shadow-[0_20px_50px_-12px_rgba(37,99,235,0.12),0_8px_24px_-4px_rgba(15,23,42,0.04)] pt-8 sm:pt-10 md:pt-12 pb-7 sm:pb-9 px-6 sm:px-12 text-center z-25">
              
              {/* Subtle top inner gradient accent line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

              {/* Brand Wordmark (Authentic Zobly Logo) */}
              <div className="flex items-center justify-center">
                <ZoblyLogo className="h-10 sm:h-12 md:h-14 w-auto" id="zobly-proof-main-logo" />
              </div>

              {/* Centered Monospace Tagline: LEARN • BUILD • PROVE • EARN */}
              <div className="mt-3.5 sm:mt-4 text-[11px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.22em] text-[#475569] uppercase select-none">
                LEARN &bull; BUILD &bull; PROVE &bull; EARN
              </div>

              {/* Clean Subtle Proof Status Conduit */}
              <div className="mt-4 sm:mt-5 pt-3 border-t border-[#F8FAFC] max-w-xs mx-auto flex items-center justify-center gap-2 text-xs text-[#64748B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
                <span className="truncate font-medium">Verified Proof Engine &bull; {activeSkill.name}</span>
              </div>

            </div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. PROCESS / PROOF STEPS (Below Visual Card)                 */}
        {/* Four consistent pastel rounded pills with matching icons:    */}
        {/* LEARNING (Cap) — BUILDING (Code) — DEPLOYING (Cloud) — PROVING (Check) */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-11 flex items-center justify-center">
          <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 flex-wrap max-w-3xl mx-auto px-2">
            
            {/* 1. LEARNING (Pastel Lavender/Purple) */}
            <div className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full bg-[#F3E8FF] border border-[#DDD6FE] text-[#7C3AED] font-bold text-xs sm:text-sm tracking-wide shadow-2xs whitespace-nowrap">
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7C3AED]" />
              <span>LEARNING</span>
            </div>

            <span className="text-[#94A3B8] font-medium text-xs sm:text-sm select-none">&mdash;</span>

            {/* 2. BUILDING (Pastel Orange/Warm) */}
            <div className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full bg-[#FFEDD5] border border-[#FED7AA] text-[#EA580C] font-bold text-xs sm:text-sm tracking-wide shadow-2xs whitespace-nowrap">
              <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EA580C]" />
              <span>BUILDING</span>
            </div>

            <span className="text-[#94A3B8] font-medium text-xs sm:text-sm select-none">&mdash;</span>

            {/* 3. DEPLOYING (Pastel Blue) */}
            <div className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] font-bold text-xs sm:text-sm tracking-wide shadow-2xs whitespace-nowrap">
              <Cloud className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0284C7]" />
              <span>DEPLOYING</span>
            </div>

            <span className="text-[#94A3B8] font-medium text-xs sm:text-sm select-none">&mdash;</span>

            {/* 4. PROVING (Pastel Green) */}
            <div className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A] font-bold text-xs sm:text-sm tracking-wide shadow-2xs whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16A34A]" />
              <span>PROVING</span>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. MAIN SECTION HEADLINE & SUBTITLE                          */}
        {/* Real Skills. Real Opportunities.                             */}
        {/* ============================================================ */}
        <div className="text-center mt-9 sm:mt-12 space-y-3 sm:space-y-4 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
            Real Skills.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#9333EA]">
              Real Opportunities.
            </span>
          </h2>
          
          <p className="text-sm sm:text-base lg:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed pt-1 sm:pt-2 font-normal">
            Go beyond theory. Build real skills, real projects, and verified proof that shows what you can actually do.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 5. FOUR CONNECTED PROOF ARTIFACT CARDS                       */}
        {/* ============================================================ */}
        <div className="mt-10 sm:mt-14 max-w-4xl mx-auto">
          
          {/* Desktop & Tablet Connected Row */}
          <div className="hidden sm:flex items-center justify-between gap-2 py-1">
            
            {/* 01 GITHUB */}
            <div className="flex-1 min-w-0 bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-orange-200 transition-all duration-200 text-left flex flex-col items-start min-h-[120px] lg:min-h-[148px]">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] text-[#181717] flex items-center justify-center mb-2 lg:mb-3 shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 lg:w-5 lg:h-5 fill-current">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <div className="font-bold text-[#0F172A] text-xs lg:text-base leading-none truncate w-full">
                GitHub
              </div>
              <p className="text-[10px] lg:text-xs text-[#64748B] mt-1.5 leading-tight line-clamp-2">
                Verified commits & repos.
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="w-5 h-5 rounded-full bg-white border border-[#E2E8F0] text-[#94A3B8] flex items-center justify-center shrink-0 shadow-2xs">
              <ArrowRight className="w-2.5 h-2.5" />
            </div>

            {/* 02 LIVE URL */}
            <div className="flex-1 min-w-0 bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-blue-200 transition-all duration-200 text-left flex flex-col items-start min-h-[120px] lg:min-h-[148px]">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center mb-2 lg:mb-3 shrink-0">
                <Globe className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              <div className="font-bold text-[#0F172A] text-xs lg:text-base leading-none truncate w-full">
                Live URL
              </div>
              <p className="text-[10px] lg:text-xs text-[#64748B] mt-1.5 leading-tight line-clamp-2">
                Deployed systems.
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="w-5 h-5 rounded-full bg-white border border-[#E2E8F0] text-[#94A3B8] flex items-center justify-center shrink-0 shadow-2xs">
              <ArrowRight className="w-2.5 h-2.5" />
            </div>

            {/* 03 CASE STUDY */}
            <div className="flex-1 min-w-0 bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-purple-200 transition-all duration-200 text-left flex flex-col items-start min-h-[120px] lg:min-h-[148px]">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-[#FAF5FF] border border-[#F3E8FF] text-[#7C3AED] flex items-center justify-center mb-2 lg:mb-3 shrink-0">
                <FileText className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              <div className="font-bold text-[#0F172A] text-xs lg:text-base leading-none truncate w-full">
                Case Study
              </div>
              <p className="text-[10px] lg:text-xs text-[#64748B] mt-1.5 leading-tight line-clamp-2">
                Process & impact.
              </p>
            </div>

            {/* Arrow 3 */}
            <div className="w-5 h-5 rounded-full bg-white border border-[#E2E8F0] text-[#94A3B8] flex items-center justify-center shrink-0 shadow-2xs">
              <ArrowRight className="w-2.5 h-2.5" />
            </div>

            {/* 04 VERIFIED PROOF */}
            <div className="flex-1 min-w-0 bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 border border-[#BBF7D0] shadow-2xs hover:shadow-md hover:border-emerald-300 ring-1 sm:ring-2 ring-[#10B981]/15 transition-all duration-200 text-left flex flex-col items-start min-h-[120px] lg:min-h-[148px]">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#10B981] flex items-center justify-center mb-2 lg:mb-3 shrink-0">
                <ShieldCheck className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              <div className="font-bold text-[#0F172A] text-xs lg:text-base leading-none truncate w-full">
                Proof
              </div>
              <p className="text-[10px] lg:text-xs text-[#64748B] mt-1.5 leading-tight line-clamp-2">
                Industry showcase.
              </p>
            </div>

          </div>

          {/* Mobile 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            
            {/* 01 GITHUB */}
            <div className="bg-white rounded-xl p-3 border border-[#E2E8F0] shadow-2xs text-left flex flex-col items-start">
              <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] border border-[#FFEDD5] text-[#181717] flex items-center justify-center mb-2 shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <div className="font-bold text-[#0F172A] text-sm leading-none truncate w-full">
                GitHub
              </div>
              <p className="text-xs text-[#64748B] mt-1 leading-tight">
                Verified commits & repos.
              </p>
            </div>

            {/* 02 LIVE URL */}
            <div className="bg-white rounded-xl p-3 border border-[#E2E8F0] shadow-2xs text-left flex flex-col items-start">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center mb-2 shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div className="font-bold text-[#0F172A] text-sm leading-none truncate w-full">
                Live URL
              </div>
              <p className="text-xs text-[#64748B] mt-1 leading-tight">
                Deployed systems.
              </p>
            </div>

            {/* 03 CASE STUDY */}
            <div className="bg-white rounded-xl p-3 border border-[#E2E8F0] shadow-2xs text-left flex flex-col items-start">
              <div className="w-8 h-8 rounded-lg bg-[#FAF5FF] border border-[#F3E8FF] text-[#7C3AED] flex items-center justify-center mb-2 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="font-bold text-[#0F172A] text-sm leading-none truncate w-full">
                Case Study
              </div>
              <p className="text-xs text-[#64748B] mt-1 leading-tight">
                Process & impact.
              </p>
            </div>

            {/* 04 VERIFIED PROOF */}
            <div className="bg-white rounded-xl p-3 border border-[#BBF7D0] shadow-2xs ring-1 ring-[#10B981]/15 text-left flex flex-col items-start">
              <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-[#10B981] flex items-center justify-center mb-2 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="font-bold text-[#0F172A] text-sm leading-none truncate w-full">
                Proof
              </div>
              <p className="text-xs text-[#64748B] mt-1 leading-tight">
                Industry showcase.
              </p>
            </div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* 6. BOTTOM CONNECTING LINE WITH ACCENT DOTS & SUMMARY PILL   */}
        {/* [From Learning to a Career That's Real.]                    */}
        {/* ============================================================ */}
        <div className="pt-12 sm:pt-16">
          <div className="relative flex items-center justify-center max-w-4xl mx-auto">
            
            {/* Horizontal Line */}
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#93C5FD]/50" />
            </div>

            {/* Left Dot */}
            <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-[#2563EB] shadow-xs" />

            {/* Center Pill */}
            <div className="relative px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-white border border-[#BAE6FD] text-[#0284C7] text-xs sm:text-sm font-medium shadow-2xs select-none max-w-[92%] sm:max-w-none text-center truncate">
              From Learning to a Career That&apos;s Real.
            </div>

            {/* Right Dot */}
            <div className="absolute right-0 w-2.5 h-2.5 rounded-full bg-[#2563EB] shadow-xs" />

          </div>
        </div>

      </div>

    </section>
  );
};

export const LearningProofBoxSection = ZoblyProofSection;
export default ZoblyProofSection;
