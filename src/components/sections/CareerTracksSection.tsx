import React, { useState } from 'react';
import { 
  Sparkles, 
  Link2, 
  BarChart3, 
  Code2, 
  Smartphone, 
  Lightbulb, 
  Database, 
  PieChart, 
  TrendingUp, 
  FileText, 
  Layout, 
  ArrowRight, 
  GraduationCap, 
  Layers, 
  ShieldCheck, 
  Briefcase,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface CareerTracksSectionProps {
  onSelectTrackForAudit?: (trackId: string) => void;
  onExploreTrack?: (trackId: string) => void;
  onEnrollTrack?: (trackId: string) => void;
}

export const CareerTracksSection: React.FC<CareerTracksSectionProps> = ({
  onSelectTrackForAudit,
  onExploreTrack,
  onEnrollTrack,
}) => {
  // Default active track to 'software-product' as shown in reference image
  const [activeTrackId, setActiveTrackId] = useState<string>('software-product');

  const tracks = [
    {
      id: 'ai-automation',
      num: '01',
      title: 'AI & Business Automation',
      route: '/paths/ai-business-automation',
      description: 'Build intelligent systems that automate real business workflows.',
      badge: 'Most Popular',
      badgeIcon: Zap,
      badgeColor: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
      accentColor: '#2563EB',
      gradientBar: 'bg-[#2563EB]',
      btnBg: 'bg-[#2563EB] hover:bg-[#1D4ED8]',
      cardBorder: 'hover:border-[#93C5FD] focus-within:border-[#2563EB]',
      activeRing: 'ring-2 ring-[#2563EB]/20 border-[#93C5FD]',
      ctaText: 'Explore AI & Automation',
      skills: [
        { label: 'AI Agents & Automation', icon: Sparkles, color: 'text-[#2563EB]' },
        { label: 'APIs & System Integration', icon: Link2, color: 'text-[#2563EB]' },
        { label: 'Real Business Use-Cases', icon: BarChart3, color: 'text-[#2563EB]' },
      ],
      outcomeIcon: FileText,
      outcomeText: 'Build and deploy AI agents, workflow automation systems, and real business tools used in companies.',
      outcomeBg: 'bg-[#F0F7FF] border-[#DBEAFE] text-[#1E3A8A]',
      iconColor: 'text-[#2563EB]',
      workWith: ['Python', 'APIs', 'AI Models', 'Automation Workflows', 'AI Agents', 'Webhooks', 'Databases'],
      youBuild: [
        'AI Lead Intake System',
        'WhatsApp Support Dispatcher',
        'Autonomous Business Agent',
        'Multi-System Webhook Engine'
      ],
      illustration: (
        <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 overflow-visible shrink-0 transition-transform duration-300 group-hover:scale-105">
          <defs>
            <linearGradient id="aiTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="aiMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="aiBotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <filter id="aiGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#2563EB" floodOpacity="0.25" />
            </filter>
          </defs>
          {/* Bottom Layer */}
          <g transform="translate(50, 68)" filter="url(#aiGlow)">
            <path d="M 0 -12 L 32 4 L 0 20 L -32 4 Z" fill="url(#aiBotGrad)" opacity="0.75" />
            <path d="M -32 4 L 0 20 L 0 28 L -32 12 Z" fill="#1E40AF" opacity="0.9" />
            <path d="M 0 20 L 32 4 L 32 12 L 0 28 Z" fill="#1D4ED8" />
          </g>
          {/* Middle Layer */}
          <g transform="translate(50, 48)">
            <path d="M 0 -12 L 32 4 L 0 20 L -32 4 Z" fill="url(#aiMidGrad)" />
            <path d="M -32 4 L 0 20 L 0 28 L -32 12 Z" fill="#1D4ED8" />
            <path d="M 0 20 L 32 4 L 32 12 L 0 28 Z" fill="#2563EB" />
          </g>
          {/* Top Layer */}
          <g transform="translate(50, 28)">
            <path d="M 0 -14 L 34 3 L 0 20 L -34 3 Z" fill="url(#aiTopGrad)" />
            <path d="M -34 3 L 0 20 L 0 28 L -34 11 Z" fill="#1E3A8A" />
            <path d="M 0 20 L 34 3 L 34 11 L 0 28 Z" fill="#1D4ED8" />
            <text x="0" y="8" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle" transform="skewX(-15) rotate(5)">AI</text>
          </g>
        </svg>
      )
    },
    {
      id: 'software-product',
      num: '02',
      title: 'Software & Product',
      route: '/paths/software-product',
      description: 'Design, build, and ship modern software products from scratch.',
      badge: 'High Demand',
      badgeIcon: BarChart3,
      badgeColor: 'bg-[#FFEDD5] text-[#C2410C] border-[#FED7AA]',
      accentColor: '#EA580C',
      gradientBar: 'bg-[#EA580C]',
      btnBg: 'bg-[#EA580C] hover:bg-[#C2410C]',
      cardBorder: 'hover:border-[#FDBA74] focus-within:border-[#EA580C]',
      activeRing: 'ring-2 ring-[#EA580C]/20 border-[#FDBA74]',
      ctaText: 'Explore Software & Product',
      skills: [
        { label: 'Full Stack Development', icon: Code2, color: 'text-[#EA580C]' },
        { label: 'Modern Web & Mobile', icon: Smartphone, color: 'text-[#EA580C]' },
        { label: 'Product Thinking', icon: Lightbulb, color: 'text-[#EA580C]' },
      ],
      outcomeIcon: Layout,
      outcomeText: 'Build and deploy fullstack applications with real users, modern tech stacks, and production-grade architecture.',
      outcomeBg: 'bg-[#FFF7ED] border-[#FED7AA] text-[#7C2D12]',
      iconColor: 'text-[#EA580C]',
      workWith: ['TypeScript', 'React', 'Node.js', 'Next.js', 'PostgreSQL', 'Docker', 'Tailwind CSS'],
      youBuild: [
        'Multi-tenant SaaS Workspace',
        'Live Collaborative Document Engine',
        'Scalable Microservices API',
        'Fintech Payment Orchestration'
      ],
      illustration: (
        <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 overflow-visible shrink-0 transition-transform duration-300 group-hover:scale-105">
          <defs>
            <linearGradient id="softTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="softMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDBA74" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
            <linearGradient id="softBotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#EA580C" floodOpacity="0.25" />
            </filter>
          </defs>
          {/* Bottom Layer */}
          <g transform="translate(50, 68)" filter="url(#softGlow)">
            <path d="M 0 -12 L 32 4 L 0 20 L -32 4 Z" fill="url(#softBotGrad)" opacity="0.75" />
            <path d="M -32 4 L 0 20 L 0 28 L -32 12 Z" fill="#9A3412" opacity="0.9" />
            <path d="M 0 20 L 32 4 L 32 12 L 0 28 Z" fill="#C2410C" />
          </g>
          {/* Middle Layer */}
          <g transform="translate(50, 48)">
            <path d="M 0 -12 L 32 4 L 0 20 L -32 4 Z" fill="url(#softMidGrad)" />
            <path d="M -32 4 L 0 20 L 0 28 L -32 12 Z" fill="#C2410C" />
            <path d="M 0 20 L 32 4 L 32 12 L 0 28 Z" fill="#EA580C" />
          </g>
          {/* Top Layer */}
          <g transform="translate(50, 28)">
            <path d="M 0 -14 L 34 3 L 0 20 L -34 3 Z" fill="url(#softTopGrad)" />
            <path d="M -34 3 L 0 20 L 0 28 L -34 11 Z" fill="#7C2D12" />
            <path d="M 0 20 L 34 3 L 34 11 L 0 28 Z" fill="#9A3412" />
            <text x="0" y="8" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle" transform="skewX(-15) rotate(5)">&lt;/&gt;</text>
          </g>
        </svg>
      )
    },
    {
      id: 'data-bi',
      num: '03',
      title: 'Data & BI',
      route: '/paths/data-bi',
      description: 'Turn data into insights, products, and real business impact.',
      badge: 'Growing Field',
      badgeIcon: TrendingUp,
      badgeColor: 'bg-[#EDE9FE] text-[#6D28D9] border-[#DDD6FE]',
      accentColor: '#7C3AED',
      gradientBar: 'bg-[#7C3AED]',
      btnBg: 'bg-[#8B5CF6] hover:bg-[#7C3AED]',
      cardBorder: 'hover:border-[#DDD6FE] focus-within:border-[#7C3AED]',
      activeRing: 'ring-2 ring-[#7C3AED]/20 border-[#C4B5FD]',
      ctaText: 'Explore Data & BI',
      skills: [
        { label: 'Data Analysis & Visualization', icon: BarChart3, color: 'text-[#7C3AED]' },
        { label: 'Data Engineering', icon: Database, color: 'text-[#7C3AED]' },
        { label: 'Business Intelligence', icon: PieChart, color: 'text-[#7C3AED]' },
      ],
      outcomeIcon: TrendingUp,
      outcomeText: 'Build data products, dashboards, and analytics systems that drive real decisions.',
      outcomeBg: 'bg-[#FAF5FF] border-[#E9D5FF] text-[#581C87]',
      iconColor: 'text-[#7C3AED]',
      workWith: ['SQL', 'Python', 'Pandas', 'dbt', 'Snowflake', 'Power BI / Tableau', 'BigQuery'],
      youBuild: [
        'Real-time Revenue Analytics Pipeline',
        'Executive Decision Dashboard',
        'Customer Churn Machine Learning Model',
        'Automated dbt Data Warehouse'
      ],
      illustration: (
        <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 overflow-visible shrink-0 transition-transform duration-300 group-hover:scale-105">
          <defs>
            <linearGradient id="dataGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
            <linearGradient id="dataGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="dataGrad3" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            <linearGradient id="dataGrad4" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <filter id="dataGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#7C3AED" floodOpacity="0.2" />
            </filter>
          </defs>
          {/* Bar 1 */}
          <g transform="translate(18, 55)" filter="url(#dataGlow)">
            <path d="M 0 -6 L 10 -1 L 10 25 L 0 20 Z" fill="#9333EA" />
            <path d="M 10 -1 L 20 -6 L 20 20 L 10 25 Z" fill="#6B21A8" />
            <path d="M 0 -6 L 10 -11 L 20 -6 L 10 -1 Z" fill="#C084FC" />
          </g>
          {/* Bar 2 */}
          <g transform="translate(38, 42)" filter="url(#dataGlow)">
            <path d="M 0 -6 L 10 -1 L 10 38 L 0 33 Z" fill="#7C3AED" />
            <path d="M 10 -1 L 20 -6 L 20 33 L 10 38 Z" fill="#5B21B6" />
            <path d="M 0 -6 L 10 -11 L 20 -6 L 10 -1 Z" fill="#A855F7" />
          </g>
          {/* Bar 3 */}
          <g transform="translate(58, 30)" filter="url(#dataGlow)">
            <path d="M 0 -6 L 10 -1 L 10 50 L 0 45 Z" fill="#6366F1" />
            <path d="M 10 -1 L 20 -6 L 20 45 L 10 50 Z" fill="#4338CA" />
            <path d="M 0 -6 L 10 -11 L 20 -6 L 10 -1 Z" fill="#818CF8" />
          </g>
          {/* Bar 4 */}
          <g transform="translate(78, 16)" filter="url(#dataGlow)">
            <path d="M 0 -6 L 10 -1 L 10 64 L 0 59 Z" fill="#0284C7" />
            <path d="M 10 -1 L 20 -6 L 20 59 L 10 64 Z" fill="#0369A1" />
            <path d="M 0 -6 L 10 -11 L 20 -6 L 10 -1 Z" fill="#38BDF8" />
          </g>
        </svg>
      )
    },
  ];

  const bottomBenefits = [
    {
      num: '01',
      title: 'Industry-Relevant Skills',
      subtitle: 'Learn what actually matters',
      icon: GraduationCap,
      color: 'text-[#2563EB]',
      bg: 'bg-[#EFF6FF]'
    },
    {
      num: '02',
      title: 'Real-World Projects',
      subtitle: 'Build production-ready systems',
      icon: Layers,
      color: 'text-[#0284C7]',
      bg: 'bg-[#F0F9FF]'
    },
    {
      num: '03',
      title: 'Verified Proof',
      subtitle: 'Show your capability',
      icon: ShieldCheck,
      color: 'text-[#10B981]',
      bg: 'bg-[#ECFDF5]'
    },
    {
      num: '04',
      title: 'Career Support',
      subtitle: 'Get noticed by the right opportunities',
      icon: Briefcase,
      color: 'text-[#DB2777]',
      bg: 'bg-[#FDF2F8]'
    }
  ];

  return (
    <section id="tracks" className="py-16 sm:py-20 lg:py-28 bg-[#FFFFFF] relative overflow-hidden">
      
      {/* Subtle background ambient gradient */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(239, 246, 255, 0.7) 0%, rgba(254, 242, 242, 0.3) 40%, rgba(255, 255, 255, 0) 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================ */}
        {/* SECTION HEADER */}
        {/* ============================================================ */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-4xl mx-auto mb-12 sm:mb-16 relative">
          
          {/* Eyebrow: — CAREER PATHWAYS — */}
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="w-5 sm:w-8 h-[2px] bg-[#2563EB] rounded-full shrink-0" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#2563EB]">
              CAREER PATHWAYS
            </span>
            <span className="w-5 sm:w-8 h-[2px] bg-[#2563EB] rounded-full shrink-0" />
          </div>

          {/* Main heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-[1.18]">
            Three rigorous career pathways.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#DB2777]">
              Zero toy projects.
            </span>
          </h2>

          {/* Supporting line */}
          <p className="text-sm sm:text-base lg:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed font-normal">
            Choose a direction. Build real skills. Create real systems. Prove your capability.
          </p>

          {/* Handwritten Annotation at Top Right */}
          <div className="absolute -top-4 right-0 hidden md:flex items-start gap-1 select-none pointer-events-none">
            <div className="text-right">
              <span className="font-[family-name:var(--font-handwriting)] text-[#64748B] text-xl sm:text-2xl font-semibold">
                Practical skills<br />for real opportunities
              </span>
            </div>
            <svg viewBox="0 0 35 40" fill="none" className="w-6 h-8 text-[#64748B] mt-2 rotate-6">
              <path d="M5 5 C 18 10, 24 24, 18 35 M18 35 L 22 28 M18 35 L 24 34" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

        </div>

        {/* ============================================================ */}
        {/* THREE PATHWAY CARDS (Responsive: 1 col on mobile, 3 on md+) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-5 lg:gap-8 items-stretch mb-8 sm:mb-16">
          {tracks.map((track) => {
            const isActive = activeTrackId === track.id;
            const OutcomeIcon = track.outcomeIcon;
            const BadgeIcon = track.badgeIcon;

            return (
              <div
                key={track.id}
                id={`pathway-card-${track.id}`}
                onMouseEnter={() => setActiveTrackId(track.id)}
                onClick={() => setActiveTrackId(track.id)}
                tabIndex={0}
                onFocus={() => setActiveTrackId(track.id)}
                className={`
                  group relative bg-white rounded-2xl lg:rounded-3xl p-5 sm:p-5 lg:p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between
                  ${isActive 
                    ? `shadow-[0_16px_36px_rgba(15,23,42,0.08)] scale-[1.01] sm:scale-[1.02] ${track.activeRing} z-20` 
                    : 'border-[#E2E8F0] shadow-xs hover:shadow-md opacity-92 hover:opacity-100 z-10'}
                  ${track.cardBorder}
                `}
              >
                {/* Top Number & Status Badge */}
                <div>
                  <div className="flex items-center justify-between gap-1 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <span className="text-base sm:text-base lg:text-xl font-bold font-mono text-[#0F172A]">
                        {track.num}
                      </span>
                      <span className={`w-5 sm:w-6 lg:w-8 h-[2px] sm:h-[2.5px] rounded-full ${track.gradientBar}`} />
                    </div>

                    <span className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-0.5 rounded-full text-xs sm:text-[10px] lg:text-xs font-semibold border ${track.badgeColor}`}>
                      <BadgeIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{track.badge}</span>
                    </span>
                  </div>

                  {/* Header & 3D Visual Illustration Header */}
                  <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="space-y-1 sm:space-y-2">
                      <h3 className="text-xl sm:text-lg lg:text-2xl font-bold text-[#0F172A] tracking-tight leading-tight">
                        {track.title}
                      </h3>
                      <p className="text-sm sm:text-xs lg:text-sm text-[#64748B] leading-relaxed mt-1 sm:mt-2">
                        {track.description}
                      </p>
                    </div>

                    {/* Distinctive 3D Layered Graphic scaled proportionally */}
                    <div className="scale-90 sm:scale-75 lg:scale-100 origin-top-right shrink-0">
                      {track.illustration}
                    </div>
                  </div>

                  {/* 3 Core Skill Pills */}
                  <div className="space-y-2 mb-4 sm:mb-6">
                    {track.skills.map((skill, sIdx) => {
                      const SkillIcon = skill.icon;
                      return (
                        <div
                          key={sIdx}
                          className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] text-xs sm:text-xs lg:text-sm font-semibold text-[#1E293B]"
                        >
                          <SkillIcon className={`w-4 h-4 ${skill.color} shrink-0`} />
                          <span className="truncate">{skill.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Example Outcomes Box */}
                  <div className="space-y-1.5 mb-4 sm:mb-6">
                    <div className="text-[10px] sm:text-[10px] lg:text-[11px] font-mono font-bold tracking-wider uppercase text-[#64748B]">
                      EXAMPLE OUTCOMES
                    </div>

                    <div className={`p-3 sm:p-3.5 lg:p-4 rounded-xl sm:rounded-2xl border ${track.outcomeBg} flex items-start justify-between gap-2 sm:gap-3 text-xs sm:text-xs lg:text-sm leading-relaxed transition-colors`}>
                      <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                        <OutcomeIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${track.iconColor} shrink-0 mt-0.5`} />
                        <span className="font-medium text-[#1E293B]">
                          {track.outcomeText}
                        </span>
                      </div>
                      <ArrowRight className={`w-4 h-4 ${track.iconColor} shrink-0 mt-0.5`} />
                    </div>
                  </div>

                  {/* Expanded Information (Revealed on active / hover) */}
                  {isActive && (
                    <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-2 pb-3 sm:pb-4 border-t border-[#F1F5F9] animate-in fade-in duration-200">
                      
                      {/* You'll work with */}
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#64748B] block mb-1.5 sm:mb-2">
                          YOU&apos;LL WORK WITH
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {track.workWith.map((tool, tIdx) => (
                            <span 
                              key={tIdx}
                              className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded text-xs sm:text-[11px] font-mono font-medium bg-[#F1F5F9] text-[#334155] border border-[#E2E8F0]"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* You'll build */}
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#64748B] block mb-1.5 sm:mb-2">
                          YOU&apos;LL BUILD & DEFEND
                        </span>
                        <div className="space-y-1.5">
                          {track.youBuild.map((item, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
                              <CheckCircle2 className={`w-3.5 h-3.5 ${track.iconColor} shrink-0`} />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>

                {/* CTA Actions: Primary Enrollment + Secondary Curriculum Preview */}
                <div className="pt-2 sm:pt-2 space-y-2">
                  <button
                    type="button"
                    id={`enroll-track-btn-${track.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onEnrollTrack) {
                        onEnrollTrack(track.id);
                      } else if (onExploreTrack) {
                        onExploreTrack(track.id);
                      }
                    }}
                    className={`
                      w-full py-3 sm:py-3 px-4 sm:px-5 rounded-xl ${track.btnBg} text-white font-bold text-xs sm:text-sm 
                      flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer min-h-[42px]
                    `}
                  >
                    <span>Enroll in Pathway</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>

                  <button
                    type="button"
                    id={`explore-track-btn-${track.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onExploreTrack) {
                        onExploreTrack(track.id);
                      } else if (onSelectTrackForAudit) {
                        onSelectTrackForAudit(track.id);
                      }
                    }}
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{track.ctaText}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* BOTTOM BENEFIT STRIP (4 Compact Supporting Principles) */}
        {/* Responsive: 1-2 cols on mobile/tablet, 4 on desktop          */}
        {/* ============================================================ */}
        <div className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 lg:gap-4 lg:divide-x divide-[#E2E8F0]">
            {bottomBenefits.map((benefit) => {
              const BenefitIcon = benefit.icon;
              return (
                <div 
                  key={benefit.num}
                  className="flex items-center sm:items-start text-left gap-3.5 px-2 lg:px-4 justify-start"
                >
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full ${benefit.bg} ${benefit.color} flex items-center justify-center shrink-0 shadow-2xs`}>
                    <BenefitIcon className="w-5 h-5" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-sm lg:text-sm font-bold text-[#0F172A] truncate">
                      {benefit.title}
                    </div>
                    <div className="text-xs text-[#64748B] leading-relaxed mt-0.5">
                      {benefit.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
