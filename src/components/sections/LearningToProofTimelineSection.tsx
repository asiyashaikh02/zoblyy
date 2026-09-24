import React, { useState } from 'react';
import { 
  Building2, 
  ArrowRight, 
  Users, 
  BookOpen, 
  TrendingUp, 
  CheckCircle2, 
  X,
  Mail,
  School,
  Sparkles
} from 'lucide-react';
import { PartnerWithZoblyModal } from '../modals/PartnerWithZoblyModal';

interface LearningToProofTimelineSectionProps {
  onOpenPartnerModal?: () => void;
}

export const LearningToProofTimelineSection: React.FC<LearningToProofTimelineSectionProps> = ({
  onOpenPartnerModal
}) => {
  const [isLocalPartnerModalOpen, setIsLocalPartnerModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (onOpenPartnerModal) {
      onOpenPartnerModal();
    } else {
      setIsLocalPartnerModalOpen(true);
    }
  };

  return (
    <section 
      id="timeline" 
      className="py-12 sm:py-16 bg-[#FAFAFA] relative overflow-hidden"
    >
      {/* Floating animation keyframes and accessibility overrides */}
      <style>{`
        @keyframes zoblyFloatA {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(0.8deg); }
        }
        @keyframes zoblyFloatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(-1deg); }
        }
        @keyframes zoblyFloatC {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(0.6deg); }
        }
        @keyframes zoblyOrbitalArc {
          0%, 100% { stroke-dashoffset: 0; opacity: 0.75; }
          50% { stroke-dashoffset: 8; opacity: 0.95; }
        }
        .zobly-anim-float-a {
          animation: zoblyFloatA 6s ease-in-out infinite;
        }
        .zobly-anim-float-b {
          animation: zoblyFloatB 7s ease-in-out infinite 1.2s;
        }
        .zobly-anim-float-c {
          animation: zoblyFloatC 6.5s ease-in-out infinite 2.4s;
        }
        .zobly-arc-pulse {
          animation: zoblyOrbitalArc 10s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .zobly-anim-float-a, .zobly-anim-float-b, .zobly-anim-float-c, .zobly-arc-pulse {
            animation: none !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* APPROVED COLLEGE / INSTITUTION HERO CONTAINER                */}
        {/* Single cohesive wide rounded hero container matching ref     */}
        {/* ============================================================ */}
        <div 
          className="relative bg-white rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] border border-[#E2E8F0] shadow-[0_16px_48px_rgba(37,99,235,0.06)] overflow-hidden transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-0 lg:min-h-[490px]">
            
            {/* ============================================================ */}
            {/* LEFT COLUMN: Text & CTAs (Full width on mobile, 6 cols on lg) */}
            {/* ============================================================ */}
            <div className="col-span-1 lg:col-span-6 p-6 sm:p-8 lg:p-12 xl:p-14 z-20 space-y-4 lg:space-y-6 text-left">
              
              {/* Eyebrow */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-5 sm:w-8 h-[2px] bg-[#2563EB] rounded-full shrink-0" />
                <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#2563EB]">
                  FOR COLLEGES & PARTNERS
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-[1.18]">
                Shape industry-ready<br />
                graduates{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#8B5CF6]">
                  with Zobly.
                </span>
              </h2>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base lg:text-lg text-[#475569] leading-relaxed max-w-lg font-normal">
                Partner with us to bring proof-based learning, real projects, and better career opportunities to your students.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap sm:flex-nowrap items-center gap-3">
                
                {/* Primary CTA: Partner With Zobly → */}
                <button
                  id="cta-partner-with-zobly"
                  onClick={handleOpenModal}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer min-h-[44px]"
                >
                  <span>Partner With Zobly</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                </button>

                {/* Secondary CTA: Learn More → */}
                <button
                  id="cta-partner-learn-more"
                  onClick={handleOpenModal}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#2563EB] border border-[#BFDBFE] hover:border-[#2563EB] font-semibold text-sm sm:text-base transition-all duration-150 cursor-pointer min-h-[44px]"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover:translate-x-1 transition-transform shrink-0" />
                </button>

              </div>

            </div>

            {/* ============================================================ */}
            {/* RIGHT COLUMN: Soft Illustrated Tech Landscape                */}
            {/* ============================================================ */}
            <div className="col-span-1 lg:col-span-6 relative w-full h-[260px] sm:h-[340px] lg:h-full lg:min-h-[490px] overflow-hidden flex items-center justify-center">
              
              {/* ---------------------------------------------------------- */}
              {/* 1. LAYERED EDITORIAL SUNRISE & MOUNTAIN LANDSCAPE          */}
              {/* Soft blue/violet atmosphere, mountains, water, pines, mist */}
              {/* ---------------------------------------------------------- */}
              <svg 
                viewBox="0 0 760 500" 
                preserveAspectRatio="xMidYMid slice" 
                className="absolute inset-0 w-full h-full select-none pointer-events-none"
              >
                <defs>
                  {/* Sky dawn gradient */}
                  <linearGradient id="zoblySkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#DBEAFE" />
                    <stop offset="35%" stopColor="#EDE9FE" />
                    <stop offset="68%" stopColor="#FCE7F3" />
                    <stop offset="85%" stopColor="#FEF3C7" />
                    <stop offset="100%" stopColor="#F8FAFC" />
                  </linearGradient>

                  {/* Gentle rising sun radial halo */}
                  <radialGradient id="zoblySunHalo" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
                    <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.8" />
                    <stop offset="55%" stopColor="#FDBA74" stopOpacity="0.35" />
                    <stop offset="85%" stopColor="#C4B5FD" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
                  </radialGradient>

                  {/* Rising sun solid disc */}
                  <radialGradient id="zoblySunDisc" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#FEF08A" />
                    <stop offset="100%" stopColor="#FBBF24" />
                  </radialGradient>

                  {/* Far mountain range gradient */}
                  <linearGradient id="zoblyFarMtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.35" />
                  </linearGradient>

                  {/* Mid mountain range gradient */}
                  <linearGradient id="zoblyMidMtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.5" />
                  </linearGradient>

                  {/* Near mountain ridge gradient */}
                  <linearGradient id="zoblyNearMtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1E3A8A" />
                  </linearGradient>

                  {/* Reflective lake water gradient */}
                  <linearGradient id="zoblyLakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C7D2FE" />
                    <stop offset="40%" stopColor="#DBEAFE" />
                    <stop offset="100%" stopColor="#93C5FD" />
                  </linearGradient>

                  {/* Sun water reflection */}
                  <linearGradient id="zoblyReflectGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#FDBA74" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#BFDBFE" stopOpacity="0.05" />
                  </linearGradient>

                  {/* Soft pine tree foliage gradient */}
                  <linearGradient id="zoblyPineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1E3A8A" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </linearGradient>
                </defs>

                {/* Sky canvas */}
                <rect width="760" height="500" fill="url(#zoblySkyGrad)" />

                {/* Soft dawn cloud wisps */}
                <path d="M 60 170 Q 140 140 240 165 Q 320 180 400 150 Q 480 130 580 155 Q 660 170 760 140 L 760 260 L 60 260 Z" fill="#FFFFFF" fillOpacity="0.35" />
                <path d="M 120 220 Q 220 195 340 215 Q 460 230 580 200 Q 670 185 760 210 L 760 300 L 120 300 Z" fill="#EDE9FE" fillOpacity="0.4" />

                {/* Flying bird silhouettes in gentle V-formation */}
                <g fill="#475569" opacity="0.65">
                  <path d="M 460 172 Q 466 166 472 172 Q 478 166 484 172 Q 478 170 472 174 Q 466 170 460 172 Z" />
                  <path d="M 482 186 Q 487 181 492 186 Q 497 181 502 186 Q 497 184 492 188 Q 487 184 482 186 Z" />
                  <path d="M 498 202 Q 502 198 506 202 Q 510 198 514 202 Q 510 200 506 203 Q 502 200 498 202 Z" />
                </g>

                {/* Sunrise Halo (Large soft aura radiating between peaks) */}
                <circle cx="560" cy="360" r="160" fill="url(#zoblySunHalo)" />

                {/* Sunrise Sun Disc rising behind peaks */}
                <circle cx="560" cy="365" r="48" fill="url(#zoblySunDisc)" />

                {/* Layer 1: Distant misty mountain ridges */}
                <path 
                  d="M 160 360 Q 280 270 380 320 Q 480 260 560 310 Q 640 270 760 330 L 760 500 L 160 500 Z" 
                  fill="url(#zoblyFarMtGrad)" 
                />

                {/* Layer 2: Midground mountain ridges with soft slopes */}
                <path 
                  d="M 120 380 Q 230 310 330 355 Q 430 295 520 345 Q 610 305 760 370 L 760 500 L 120 500 Z" 
                  fill="url(#zoblyMidMtGrad)" 
                />

                {/* Mid-valley mist band */}
                <ellipse cx="480" cy="385" rx="260" ry="22" fill="#FFFFFF" fillOpacity="0.45" />

                {/* Layer 3: Foreground mountain ridges framing the lake */}
                <path 
                  d="M 140 420 Q 240 360 360 410 Q 460 365 570 415 Q 670 375 760 415 L 760 500 L 140 500 Z" 
                  fill="url(#zoblyNearMtGrad)" 
                  opacity="0.88"
                />

                {/* Layer 4: Lake water surface */}
                <path 
                  d="M 0 420 L 760 420 L 760 500 L 0 500 Z" 
                  fill="url(#zoblyLakeGrad)" 
                />

                {/* Lake water sun reflection column */}
                <polygon points="530,420 590,420 620,500 500,500" fill="url(#zoblyReflectGrad)" />

                {/* Delicate water ripple highlights */}
                <line x1="440" y1="432" x2="630" y2="432" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.75" />
                <line x1="470" y1="444" x2="600" y2="444" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.65" />
                <line x1="510" y1="456" x2="640" y2="456" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.55" />
                <line x1="480" y1="468" x2="570" y2="468" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.45" />

                {/* Cluster of evergreen pine trees along right bank and slopes */}
                <g fill="url(#zoblyPineGrad)">
                  {/* Tall foreground pines on far right */}
                  <polygon points="720,335 712,360 728,360" />
                  <polygon points="720,350 710,380 730,380" />
                  <polygon points="720,370 706,410 734,410" />
                  <polygon points="720,395 702,460 738,460" />
                  <rect x="718" y="460" width="4" height="40" fill="#0F172A" />

                  <polygon points="685,355 678,380 692,380" />
                  <polygon points="685,372 675,405 695,405" />
                  <polygon points="685,395 672,440 698,440" />
                  <polygon points="685,420 668,480 702,480" />
                  <rect x="683" y="480" width="4" height="20" fill="#0F172A" />

                  <polygon points="650,380 644,405 656,405" />
                  <polygon points="650,398 641,430 659,430" />
                  <polygon points="650,420 638,465 662,465" />
                  <rect x="648" y="465" width="4" height="35" fill="#0F172A" />

                  {/* Midground pines on island ridge */}
                  <polygon points="410,400 405,420 415,420" />
                  <polygon points="410,415 402,440 418,440" />
                  
                  <polygon points="380,410 376,428 384,428" />
                  <polygon points="380,422 374,445 386,445" />

                  <polygon points="330,420 326,435 334,435" />
                  <polygon points="330,430 324,450 336,450" />
                </g>
              </svg>

              {/* ---------------------------------------------------------- */}
              {/* 2. SOFT FADE GRADIENT TRANSITION                           */}
              {/* Blends seamlessly from white hero background to landscape  */}
              {/* ---------------------------------------------------------- */}
              <div 
                className="absolute inset-y-0 left-0 w-28 sm:w-44 lg:w-56 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 35%, rgba(255,255,255,0) 100%)'
                }}
              />
              <div 
                className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)'
                }}
              />
              <div 
                className="absolute inset-x-0 bottom-0 h-12 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(to top, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)'
                }}
              />

              {/* ---------------------------------------------------------- */}
              {/* 3. DOTTED ORBITAL CURVE & CONNECTION NODES                 */}
              {/* Sweeping semi-circular arc matching approved reference     */}
              {/* ---------------------------------------------------------- */}
              <svg 
                viewBox="0 0 600 420" 
                className="absolute inset-0 w-full h-full pointer-events-none select-none z-15 overflow-visible"
              >
                {/* Dotted orbital arc */}
                <path 
                  d="M 65 240 Q 295 10 535 280" 
                  fill="none" 
                  stroke="#93C5FD" 
                  strokeWidth="1.6" 
                  strokeDasharray="4 6" 
                  strokeLinecap="round"
                  className="zobly-arc-pulse"
                />
                
                {/* Small orbital connection dots along the arc */}
                <circle cx="65" cy="240" r="3.5" fill="#3B82F6" />
                <circle cx="150" cy="148" r="3.5" fill="#3B82F6" />
                <circle cx="295" cy="85" r="3.5" fill="#2563EB" />
                <circle cx="435" cy="145" r="3.5" fill="#8B5CF6" />
                <circle cx="500" cy="205" r="3.5" fill="#3B82F6" />
                <circle cx="535" cy="280" r="3.5" fill="#F59E0B" />
              </svg>

              {/* ---------------------------------------------------------- */}
              {/* 4. TAGLINE: REAL SKILLS. BRIGHTER FUTURES.                 */}
              {/* Uppercase, modern geometric monospace, blue→violet grad     */}
              {/* ---------------------------------------------------------- */}
              <div className="absolute left-[54%] sm:left-[52%] top-[34%] sm:top-[36%] lg:top-[38%] -translate-x-1/2 z-25 text-center select-none pointer-events-none w-max">
                <div className="font-mono text-[7px] sm:text-[15px] lg:text-[17px] font-bold tracking-[0.14em] sm:tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#6366F1] to-[#8B5CF6] drop-shadow-xs">
                  REAL SKILLS.
                </div>
                <div className="font-mono text-[7px] sm:text-[15px] lg:text-[17px] font-bold tracking-[0.14em] sm:tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#6366F1] to-[#8B5CF6] drop-shadow-xs mt-0.2 sm:mt-1">
                  BRIGHTER FUTURES.
                </div>
                {/* Centered subtle accent bar matching reference */}
                <div className="w-6 sm:w-14 h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent via-[#818CF8] to-transparent rounded-full mx-auto mt-1 sm:mt-2.5 opacity-80" />
              </div>

              {/* ---------------------------------------------------------- */}
              {/* 5. FLOATING TECHNOLOGY ICONS (Inside white rounded cards)   */}
              {/* React, Google, GitHub, Figma, Azure, Python                */}
              {/* ---------------------------------------------------------- */}
              
              {/* 01. REACT (Lower-Left along orbital arc) */}
              <div 
                className="absolute left-[7%] sm:left-[9%] top-[48%] sm:top-[50%] z-25 zobly-anim-float-a group"
                title="React"
              >
                <div className="w-5 h-5 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-md sm:rounded-2xl bg-white p-0.5 sm:p-2 sm:p-2.5 border border-[#E2E8F0] shadow-xs sm:shadow-[0_8px_20px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_28px_rgba(37,99,235,0.22)] hover:border-[#93C5FD] hover:scale-115 transition-all duration-300 flex items-center justify-center cursor-pointer">
                  {/* React Atom */}
                  <svg viewBox="0 0 100 100" className="w-full h-full group-hover:rotate-45 transition-transform duration-500">
                    <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="#00D8FF" strokeWidth="6" />
                    <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="#00D8FF" strokeWidth="6" transform="rotate(60 50 50)" />
                    <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="#00D8FF" strokeWidth="6" transform="rotate(120 50 50)" />
                    <circle cx="50" cy="50" r="9" fill="#00D8FF" />
                  </svg>
                </div>
              </div>

              {/* 02. GOOGLE (Mid-Left along orbital arc) */}
              <div 
                className="absolute left-[20%] sm:left-[22%] top-[24%] sm:top-[25%] z-25 zobly-anim-float-b group"
                title="Google"
              >
                <div className="w-5 h-5 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-md sm:rounded-2xl bg-white p-0.5 sm:p-2 sm:p-2.5 border border-[#E2E8F0] shadow-xs sm:shadow-[0_8px_20px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_28px_rgba(234,67,53,0.2)] hover:border-[#FCA5A5] hover:scale-115 transition-all duration-300 flex items-center justify-center cursor-pointer">
                  {/* Google 4-Color Mark */}
                  <svg viewBox="0 0 48 48" className="w-full h-full">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                </div>
              </div>

              {/* 03. GITHUB (Apex Center-Top of orbital arc) */}
              <div 
                className="absolute left-[45%] sm:left-[47%] top-[8%] sm:top-[9%] z-25 zobly-anim-float-c group"
                title="GitHub"
              >
                <div className="w-5 h-5 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-md sm:rounded-2xl bg-white p-0.5 sm:p-2 sm:p-2.5 border border-[#E2E8F0] shadow-xs sm:shadow-[0_8px_20px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.22)] hover:border-[#94A3B8] hover:scale-115 transition-all duration-300 flex items-center justify-center cursor-pointer">
                  {/* GitHub Octocat Silhouette */}
                  <svg viewBox="0 0 24 24" className="w-full h-full fill-[#0F172A]">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </div>
              </div>

              {/* 04. FIGMA (Mid-Right along orbital arc) */}
              <div 
                className="absolute left-[70%] sm:left-[72%] top-[20%] sm:top-[22%] z-25 zobly-anim-float-a group"
                title="Figma"
              >
                <div className="w-5 h-5 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-md sm:rounded-2xl bg-white p-0.5 sm:p-2 sm:p-2.5 border border-[#E2E8F0] shadow-xs sm:shadow-[0_8px_20px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_28px_rgba(162,89,255,0.22)] hover:border-[#C4B5FD] hover:scale-115 transition-all duration-300 flex items-center justify-center cursor-pointer">
                  {/* Figma 5-piece logo */}
                  <svg viewBox="0 0 38 57" className="w-full h-full">
                    <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
                    <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
                    <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
                    <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
                    <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
                  </svg>
                </div>
              </div>

              {/* 05. MICROSOFT / AZURE (Lower-Mid-Right along orbital arc) */}
              <div 
                className="absolute left-[83%] sm:left-[85%] top-[36%] sm:top-[38%] z-25 zobly-anim-float-b group"
                title="Microsoft Azure"
              >
                <div className="w-5 h-5 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-md sm:rounded-2xl bg-white p-0.5 sm:p-2 sm:p-2.5 border border-[#E2E8F0] shadow-xs sm:shadow-[0_8px_20px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_28px_rgba(0,120,212,0.22)] hover:border-[#93C5FD] hover:scale-115 transition-all duration-300 flex items-center justify-center cursor-pointer">
                  {/* Azure Origami Geometry */}
                  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
                    <path d="M23.5 8L44.5 8L34 29L23.5 8Z" fill="#0078D4" />
                    <path d="M14 44L34 8L47 34L34 56L14 44Z" fill="#1490DF" />
                    <path d="M14 44L34 56L50 56L26 44H14Z" fill="#0862A8" />
                    <path d="M34 56L44 36L52 52L48 56H34Z" fill="#0078D4" />
                  </svg>
                </div>
              </div>

              {/* 06. PYTHON (Lower-Right along orbital arc) */}
              <div 
                className="absolute left-[88%] sm:left-[90%] top-[64%] sm:top-[66%] z-25 zobly-anim-float-c group"
                title="Python"
              >
                <div className="w-5 h-5 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-md sm:rounded-2xl bg-white p-0.5 sm:p-2 sm:p-2.5 border border-[#E2E8F0] shadow-xs sm:shadow-[0_8px_20px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_28px_rgba(255,212,59,0.25)] hover:border-[#FDE047] hover:scale-115 transition-all duration-300 flex items-center justify-center cursor-pointer">
                  {/* Python Intertwined Snakes */}
                  <svg viewBox="0 0 110 110" className="w-full h-full">
                    <defs>
                      <linearGradient id="pyGradA" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#387EB8" />
                        <stop offset="100%" stopColor="#366994" />
                      </linearGradient>
                      <linearGradient id="pyGradB" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFE873" />
                        <stop offset="100%" stopColor="#FFD43B" />
                      </linearGradient>
                    </defs>
                    <path d="M54.5 9c-24.3 0-22.8 10.5-22.8 10.5l.02 10.9h23.3v3.3H22.4S6.2 31.8 6.2 56.4c0 24.5 14.1 23.7 14.1 23.7h8.4v-11.8c0-13.4 11.5-13 11.5-13h22.7s11-.2 11-10.7V20.2S75.8 9 54.5 9zm-12.7 7.2a3.8 3.8 0 1 1 0 7.7 3.8 3.8 0 0 1 0-7.7z" fill="url(#pyGradA)" />
                    <path d="M55.5 101c24.3 0 22.8-10.5 22.8-10.5l-.02-10.9H55v-3.3h32.6s16.2 1.9 16.2-22.7c0-24.5-14.1-23.7-14.1-23.7h-8.4v11.8c0 13.4-11.5 13-11.5 13H47.6s-11 .2-11 10.7v24.4s-1.9 11.2 18.9 11.2zm12.7-7.2a3.8 3.8 0 1 1 0 7.7 3.8 3.8 0 0 1 0 7.7z" fill="url(#pyGradB)" />
                  </svg>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* PARTNER WITH ZOBLY MODAL (Initiative by Synckraft)            */}
      {/* ============================================================ */}
      <PartnerWithZoblyModal 
        isOpen={isLocalPartnerModalOpen} 
        onClose={() => setIsLocalPartnerModalOpen(false)} 
      />

    </section>
  );
};
