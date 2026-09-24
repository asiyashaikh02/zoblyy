import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onStartAssessment: () => void;
  onExploreTracks: () => void;
  onEnrollNow?: () => void;
}

interface JobOpportunity {
  id: string;
  company: string;
  role: string;
  badge?: {
    text: string;
    bg: string;
    color: string;
  };
  time: string;
  skills: string[];
  logo: React.ReactNode;
  floatClass: string;
  rotation: string;
  zIndex: number;
  opacity?: string;
  offsetStyle?: React.CSSProperties;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartAssessment,
  onExploreTracks,
  onEnrollNow,
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Accurate company logos as clean inline SVGs
  const companyLogos = {
    amazon: (
      <div className="w-10 h-10 rounded-full bg-[#131921] flex items-center justify-center shrink-0 shadow-xs">
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" role="img" aria-label="Amazon logo">
          <text x="5" y="14" fill="white" fontWeight="bold" fontSize="13" fontFamily="sans-serif">a</text>
          <path d="M6 16.5C10 19.5 15 19.5 18 16.5" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M16.5 15.5L18.5 17L18 15" fill="#FF9900" />
        </svg>
      </div>
    ),
    google: (
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs border border-[#F1F5F9]">
        <svg viewBox="0 0 24 24" className="w-5 h-5" role="img" aria-label="Google logo">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
      </div>
    ),
    microsoft: (
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs border border-[#F1F5F9]">
        <svg viewBox="0 0 24 24" className="w-5 h-5" role="img" aria-label="Microsoft logo">
          <rect x="2" y="2" width="9" height="9" fill="#F25022" />
          <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
          <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
          <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
        </svg>
      </div>
    ),
    openai: (
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs border border-[#F1F5F9] p-1.5 overflow-hidden">
        <img
          src="/openai-logo-v2.png"
          alt="OpenAI logo"
          className="w-full h-full object-contain"
        />
      </div>
    ),
    airbnb: (
      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shrink-0 shadow-xs border border-[#F1F5F9]">
        <img
          src="/airbnb-logo.png"
          alt="Airbnb logo"
          className="w-full h-full object-cover"
        />
      </div>
    ),
    dropbox: (
      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shrink-0 shadow-xs border border-[#F1F5F9]">
        <img
          src="/dropbox-logo.png"
          alt="Dropbox logo"
          className="w-full h-full object-cover"
        />
      </div>
    ),
    stripe: (
      <div className="w-10 h-10 rounded-full bg-[#635BFF] flex items-center justify-center shrink-0 shadow-xs">
        <span className="text-white font-bold text-lg font-sans">S</span>
      </div>
    ),
  };

  const jobCards: JobOpportunity[] = [
    {
      id: 'amazon',
      company: 'Amazon',
      role: 'Software Development Engineer',
      badge: {
        text: 'Hiring Now',
        bg: 'bg-[#DCFCE7]',
        color: 'text-[#16A34A]',
      },
      time: 'now',
      skills: ['Java', 'Distributed Systems', 'AWS DynamoDB'],
      logo: companyLogos.amazon,
      floatClass: 'animate-float-slow',
      rotation: 'rotate-[0.5deg]',
      zIndex: 30,
      offsetStyle: { transform: 'translate(0px, 0px)' },
    },
    {
      id: 'google',
      company: 'Google',
      role: 'Full Stack Developer',
      badge: {
        text: 'High Demand',
        bg: 'bg-[#DBEAFE]',
        color: 'text-[#1D4ED8]',
      },
      time: '2h ago',
      skills: ['TypeScript', 'React', 'Go', 'GCP'],
      logo: companyLogos.google,
      floatClass: 'animate-float-mid',
      rotation: 'rotate-[-0.8deg]',
      zIndex: 25,
      offsetStyle: { transform: 'translate(-20px, 6px)' },
    },
    {
      id: 'microsoft',
      company: 'Microsoft',
      role: 'Data Analyst',
      badge: {
        text: 'Hiring',
        bg: 'bg-[#DCFCE7]',
        color: 'text-[#16A34A]',
      },
      time: '4h ago',
      skills: ['SQL', 'Power BI', 'Python', 'Azure Synapse'],
      logo: companyLogos.microsoft,
      floatClass: 'animate-float-fast',
      rotation: 'rotate-[0.8deg]',
      zIndex: 20,
      offsetStyle: { transform: 'translate(15px, 12px)' },
    },
    {
      id: 'openai',
      company: 'OpenAI',
      role: 'AI Engineer',
      badge: {
        text: 'Growing Field',
        bg: 'bg-[#FFE4E6]',
        color: 'text-[#E11D48]',
      },
      time: '6h ago',
      skills: ['Python', 'LLM Fine-tuning', 'Vector Search', 'LangGraph'],
      logo: companyLogos.openai,
      floatClass: 'animate-float-mid',
      rotation: 'rotate-[-0.5deg]',
      zIndex: 18,
      offsetStyle: { transform: 'translate(-35px, 18px)' },
    },
    {
      id: 'airbnb',
      company: 'Airbnb',
      role: 'Backend Engineer',
      badge: {
        text: 'Remote',
        bg: 'bg-[#EFF6FF]',
        color: 'text-[#2563EB]',
      },
      time: '1d ago',
      skills: ['Kotlin', 'Microservices', 'GraphQL', 'Kafka'],
      logo: companyLogos.airbnb,
      floatClass: 'animate-float-slow',
      rotation: 'rotate-[0.6deg]',
      zIndex: 15,
      offsetStyle: { transform: 'translate(10px, 24px)' },
    },
    {
      id: 'dropbox',
      company: 'Dropbox',
      role: 'Cloud/DevOps Engineer',
      time: '3d ago',
      skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Python'],
      logo: companyLogos.dropbox,
      floatClass: 'animate-float-mid',
      rotation: 'rotate-[-1deg]',
      zIndex: 10,
      opacity: 'opacity-90',
      offsetStyle: { transform: 'translate(-15px, 30px)' },
    },
  ];

  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-80px)] bg-white overflow-hidden flex flex-col justify-center pt-8 pb-16 lg:py-20"
    >
      
      {/* Soft Blue Atmospheric Ambient Glow (Continuous and seamless across mobile, tablet & desktop) */}
      <div 
        className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[55%] h-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 65%, rgba(186, 230, 253, 0.35) 0%, rgba(219, 234, 254, 0.18) 45%, rgba(255, 255, 255, 0) 75%)',
        }}
      />
      <div 
        className="hidden lg:block absolute top-0 right-0 w-[55%] h-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 65% 35%, rgba(186, 230, 253, 0.45) 0%, rgba(219, 234, 254, 0.25) 45%, rgba(255, 255, 255, 0) 75%)',
        }}
      />

      {/* Subtle Ethereal Sparkle Lights */}
      <div className="absolute top-24 right-[28%] w-1.5 h-1.5 rounded-full bg-[#38BDF8] blur-[0.5px] opacity-70 animate-pulse pointer-events-none" />
      <div className="absolute top-[48%] right-[12%] w-2 h-2 rounded-full bg-[#60A5FA] blur-[0.5px] opacity-60 pointer-events-none" />
      <div className="absolute top-[68%] right-[38%] w-1 h-1 rounded-full bg-[#38BDF8] blur-[0.5px] opacity-80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* ============================================================ */}
          {/* LEFT SIDE CONTENT - Anchored and steady */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 lg:space-y-7 max-w-2xl lg:self-start lg:pt-4">
            
            {/* Eyebrow with blue line dash */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-5 sm:w-8 h-[2px] sm:h-[2.5px] bg-[#2563EB] rounded-full shrink-0" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.14em] uppercase text-[#2563EB] font-sans">
                CAREER INTELLIGENCE FOR WHAT'S NEXT
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
              Your Career Should<br />
              Start With<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#7C3AED]">
                Knowing Where You Stand.
              </span>
            </h1>

            {/* Supporting Statement */}
            <div className="space-y-1">
              <div className="text-xs sm:text-sm lg:text-base font-extrabold tracking-wider uppercase text-[#1E293B]">
                KNOW WHERE YOU STAND.
              </div>
              <div className="text-xs sm:text-sm lg:text-base font-extrabold tracking-wider uppercase text-[#1E293B]">
                BUILD WHAT PROVES IT.
              </div>
            </div>

            {/* Supporting Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-[#475569] leading-relaxed font-normal">
              Assess your current skills, discover the right career direction, build real systems, and create proof that shows what you can actually do.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                id="hero-cta-assessment"
                onClick={onStartAssessment}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-xl shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer min-h-[48px]"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              {onEnrollNow && (
                <button
                  id="hero-cta-enroll"
                  onClick={onEnrollNow}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-[#1D4ED8] bg-blue-50/80 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all duration-150 shadow-2xs cursor-pointer min-h-[48px]"
                >
                  <span>Enroll Now</span>
                </button>
              )}
            </div>

            {/* Bottom Metrics Row */}
            <div className="pt-4 sm:pt-6 border-t border-[#F1F5F9] flex items-center justify-between sm:justify-start gap-4 sm:gap-10">
              {/* Metric 1 */}
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#2563EB] tracking-tight">
                  3
                </div>
                <div className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                  Career Paths
                </div>
              </div>

              <div className="h-7 sm:h-9 w-px bg-[#E2E8F0]" />

              {/* Metric 2 */}
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#2563EB] tracking-tight">
                  100+
                </div>
                <div className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                  Roles
                </div>
              </div>

              <div className="h-7 sm:h-9 w-px bg-[#E2E8F0]" />

              {/* Metric 3 */}
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#2563EB] tracking-tight">
                  Real
                </div>
                <div className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                  Proof
                </div>
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT SIDE VISUAL: Responsive mobile vertical stack          */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 relative flex flex-col items-center w-full mt-8 sm:mt-10 lg:mt-0">
            
            {/* Handwritten Note with Arrow pointing to the cards */}
            {/* On desktop: absolute upper-right. On mobile: relative centered note above UFO */}
            <div className="relative mb-2 lg:mb-0 lg:absolute lg:-top-7 xl:-top-8 lg:right-2 xl:right-6 z-30 flex items-center lg:items-start justify-center lg:justify-end gap-1.5 select-none pointer-events-none w-full max-w-md">
              <div className="text-center lg:text-right">
                <span className="font-[family-name:var(--font-handwriting)] text-[#64748B] text-sm sm:text-base lg:text-xl xl:text-2xl font-semibold tracking-wide leading-tight block">
                  Real opportunities<br className="hidden sm:inline" /> for real builders.
                </span>
              </div>
              <svg 
                viewBox="0 0 40 45" 
                fill="none" 
                className="w-5 h-6 sm:w-7 sm:h-8 lg:w-7 lg:h-8 xl:w-8 xl:h-9 text-[#64748B] rotate-12 lg:-rotate-12 mt-0.5 lg:mt-2 shrink-0" 
                aria-hidden="true"
              >
                <path 
                  d="M5 5 C 18 15, 26 28, 14 38 M14 38 L 19 32 M14 38 L 22 39" 
                  stroke="currentColor" 
                  strokeWidth="1.6" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>

            {/* Central / Responsive UFO Object with radiant downward beam */}
            <div className="relative w-full max-w-md flex flex-col items-center lg:items-end lg:pr-6 xl:pr-10 z-20 pt-1 sm:pt-2 lg:pt-1 mb-2 sm:mb-3 select-none">
              
              {/* UFO Craft & Downward Conical Beam Assembly */}
              <div className="relative flex flex-col items-center">
                
                {/* UFO Craft (Detailed 3D glossy SVG) */}
                <div className="animate-ufo relative z-20 filter drop-shadow-[0_10px_20px_rgba(37,99,235,0.25)]">
                  <svg viewBox="0 0 280 120" className="w-36 sm:w-48 md:w-56 lg:w-64 xl:w-72 h-auto overflow-visible select-none pointer-events-none" aria-hidden="true">
                    <defs>
                      {/* Cockpit dome gradient */}
                      <linearGradient id="cockpit-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#E0F2FE" />
                        <stop offset="35%" stopColor="#7DD3FC" />
                        <stop offset="100%" stopColor="#2563EB" />
                      </linearGradient>

                      {/* Saucer top flange gradient */}
                      <linearGradient id="saucer-top-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="40%" stopColor="#38BDF8" />
                        <stop offset="85%" stopColor="#1D4ED8" />
                        <stop offset="100%" stopColor="#1E3A8A" />
                      </linearGradient>

                      {/* Rim metallic band */}
                      <linearGradient id="rim-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1E40AF" />
                        <stop offset="25%" stopColor="#38BDF8" />
                        <stop offset="50%" stopColor="#FFFFFF" />
                        <stop offset="75%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#1E40AF" />
                      </linearGradient>

                      {/* Cockpit spec reflection */}
                      <linearGradient id="spec-reflection" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Upper Cockpit Dome */}
                    <path 
                      d="M95 50 C95 20, 185 20, 185 50 Z" 
                      fill="url(#cockpit-grad)" 
                    />
                    {/* Cockpit Highlight Reflection */}
                    <ellipse 
                      cx="140" 
                      cy="35" 
                      rx="32" 
                      ry="12" 
                      fill="url(#spec-reflection)" 
                    />

                    {/* Main Flying Saucer Disc Upper Body */}
                    <ellipse 
                      cx="140" 
                      cy="58" 
                      rx="125" 
                      ry="28" 
                      fill="url(#saucer-top-grad)" 
                    />

                    {/* Saucer Upper Highlight Sweep */}
                    <path 
                      d="M35 56 C 65 38, 215 38, 245 56 C 210 44, 70 44, 35 56 Z" 
                      fill="#FFFFFF" 
                      fillOpacity="0.45" 
                    />

                    {/* Metallic Luminous Central Rim Band */}
                    <path 
                      d="M15 58 C 15 58, 40 76, 140 76 C 240 76, 265 58, 265 58 C 265 63, 235 80, 140 80 C 45 80, 15 63, 15 58 Z" 
                      fill="url(#rim-grad)" 
                    />

                    {/* Glowing Cyan Portholes / Lights around rim */}
                    <circle cx="45" cy="65" r="3" fill="#67E8F9" filter="drop-shadow(0 0 3px #38BDF8)" />
                    <circle cx="75" cy="70" r="3.2" fill="#BAE6FD" filter="drop-shadow(0 0 3px #38BDF8)" />
                    <circle cx="108" cy="73.5" r="3.5" fill="#FFFFFF" filter="drop-shadow(0 0 4px #67E8F9)" />
                    <circle cx="140" cy="74.5" r="3.8" fill="#FFFFFF" filter="drop-shadow(0 0 5px #67E8F9)" />
                    <circle cx="172" cy="73.5" r="3.5" fill="#FFFFFF" filter="drop-shadow(0 0 4px #67E8F9)" />
                    <circle cx="205" cy="70" r="3.2" fill="#BAE6FD" filter="drop-shadow(0 0 3px #38BDF8)" />
                    <circle cx="235" cy="65" r="3" fill="#67E8F9" filter="drop-shadow(0 0 3px #38BDF8)" />

                    {/* Saucer Underside Propulsion Core */}
                    <ellipse 
                      cx="140" 
                      cy="78" 
                      rx="58" 
                      ry="14" 
                      fill="#1E3A8A" 
                    />
                    <ellipse 
                      cx="140" 
                      cy="81" 
                      rx="42" 
                      ry="9" 
                      fill="#38BDF8" 
                      filter="drop-shadow(0 0 8px #60A5FA)" 
                    />
                    <ellipse 
                      cx="140" 
                      cy="82" 
                      rx="26" 
                      ry="5" 
                      fill="#FFFFFF" 
                    />
                  </svg>
                </div>

                {/* Downward Conical Light Beam radiating onto the cards */}
                <div 
                  className="animate-beam absolute top-8 sm:top-11 md:top-13 lg:top-15 w-44 sm:w-56 md:w-68 lg:w-76 xl:w-84 h-36 sm:h-48 md:h-56 lg:h-64 xl:h-72 pointer-events-none z-10 max-w-full"
                  style={{
                    clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
                    background: 'linear-gradient(to bottom, rgba(56, 189, 248, 0.42) 0%, rgba(37, 99, 235, 0.12) 45%, rgba(255, 255, 255, 0) 95%)',
                  }}
                />
              </div>
            </div>

            {/* Cascading Floating Job Opportunity Cards Container */}
            <div className="relative w-full max-w-md mx-auto space-y-2.5 sm:space-y-3.5 pt-1 sm:pt-2 z-20 min-h-[580px] sm:min-h-[620px]">
              {jobCards.map((card) => {
                const isSelected = hoveredCardId === card.id;

                return (
                  <div
                    key={card.id}
                    className="w-full transition-transform duration-300 ease-out"
                    style={{
                      transform: isLargeScreen && card.offsetStyle ? card.offsetStyle.transform : undefined,
                    }}
                  >
                    <div
                      className={`w-full ${card.floatClass}`}
                      style={{
                        animationPlayState: isSelected ? 'paused' : 'running',
                      }}
                    >
                      <div
                        id={`hero-job-card-${card.id}`}
                        onMouseEnter={() => setHoveredCardId(card.id)}
                        onMouseLeave={() => setHoveredCardId(null)}
                        onClick={() => setHoveredCardId(hoveredCardId === card.id ? null : card.id)}
                        className={`
                          relative group bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2.5 xs:p-3 sm:p-4 
                          border border-[#E2E8F0] 
                          shadow-[0_4px_12px_rgba(15,23,42,0.06)]
                          hover:shadow-[0_16px_32px_rgba(37,99,235,0.12)]
                          hover:border-[#93C5FD]
                          transition-all duration-200 cursor-pointer
                          select-none
                          ${isLargeScreen ? card.rotation : ''}
                          ${card.opacity || 'opacity-100'}
                          ${isSelected ? 'z-40 !opacity-100 ring-2 ring-[#2563EB]/25 border-[#93C5FD] shadow-[0_14px_30px_rgba(37,99,235,0.14)]' : ''}
                        `}
                        style={{
                          transform: isSelected ? 'scale(1.015)' : 'scale(1)',
                          transformOrigin: 'center center',
                          backfaceVisibility: 'hidden',
                          WebkitFontSmoothing: 'antialiased',
                        }}
                      >
                        <div className="flex items-center justify-between gap-2 sm:gap-3">
                          
                          {/* Left: Company Logo + Names */}
                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                            <div className="shrink-0 scale-85 sm:scale-100 origin-left">
                              {card.logo}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="text-[11px] sm:text-xs text-[#64748B] font-medium leading-none truncate">
                                {card.company}
                              </div>
                              <div className="text-xs xs:text-sm sm:text-base font-bold text-[#0F172A] truncate mt-0.5 sm:mt-1">
                                {card.role}
                              </div>
                            </div>
                          </div>

                          {/* Right: Status Badge & Time */}
                          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                            {card.badge && (
                              <span className={`px-1.5 xs:px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] xs:text-xs font-bold ${card.badge.bg} ${card.badge.color} whitespace-nowrap`}>
                                {card.badge.text}
                              </span>
                            )}

                            <span className="text-[10px] xs:text-xs text-[#94A3B8] font-mono shrink-0">
                              {card.time}
                            </span>
                          </div>

                        </div>

                        {/* Smooth Expandable Skills tags on hover or tap */}
                        <div
                          className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                            isSelected 
                              ? 'grid-rows-[1fr] opacity-100 mt-2.5 pt-2.5 border-t border-[#F1F5F9]' 
                              : 'grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                              <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase text-[#64748B]">
                                Verified Skills:
                              </span>
                              {card.skills.map((skill, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono font-medium bg-[#F1F5F9] text-[#1E293B]"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
