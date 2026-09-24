import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoblyProofSection } from './ZoblyProofSection';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Milestone {
  num: string;
  id: number;
  title: string;
  subtitle: string;
  detail: string;
  color: string;
  bgColor: string;
  glowColor: string;
  borderColor: string;
  ctaText?: string;
  ctaAction?: 'assessment' | 'plan';
  cx: number;
  cy: number;
}

const MILESTONES: Milestone[] = [
  {
    num: '01',
    id: 1,
    title: 'Assess',
    subtitle: 'Understand where you are',
    detail: 'Understand your interests, strengths and starting point.',
    color: '#2563EB', // blue
    bgColor: 'bg-[#EFF6FF]',
    glowColor: 'rgba(37,99,235,0.35)',
    borderColor: 'border-[#BFDBFE]',
    ctaText: 'Start Assessment',
    ctaAction: 'assessment',
    cx: 90,
    cy: 240
  },
  {
    num: '02',
    id: 2,
    title: 'Discover',
    subtitle: 'Find your best path',
    detail: 'Find the pathway that naturally fits your interests and strengths.',
    color: '#8B5CF6', // purple
    bgColor: 'bg-[#F5F3FF]',
    glowColor: 'rgba(139,92,246,0.35)',
    borderColor: 'border-[#DDD6FE]',
    cx: 245,
    cy: 195
  },
  {
    num: '03',
    id: 3,
    title: 'Plan',
    subtitle: 'Get your roadmap',
    detail: 'Get a personalized learning roadmap for your chosen direction.',
    color: '#EC4899', // pink
    bgColor: 'bg-[#FDF2F8]',
    glowColor: 'rgba(236,72,153,0.35)',
    borderColor: 'border-[#FBCFE8]',
    ctaText: 'Explore Learning Plans',
    ctaAction: 'plan',
    cx: 410,
    cy: 235
  },
  {
    num: '04',
    id: 4,
    title: 'Build',
    subtitle: 'Learn by doing',
    detail: 'Learn through structured learning and hands-on implementation.',
    color: '#F97316', // orange
    bgColor: 'bg-[#FFF7ED]',
    glowColor: 'rgba(249,115,22,0.35)',
    borderColor: 'border-[#FED7AA]',
    cx: 575,
    cy: 180
  },
  {
    num: '05',
    id: 5,
    title: 'Practice',
    subtitle: 'Work on real projects',
    detail: 'Work on real projects and turn learning into practical experience.',
    color: '#EAB308', // yellow/amber
    bgColor: 'bg-[#FEFCE8]',
    glowColor: 'rgba(234,179,8,0.35)',
    borderColor: 'border-[#FEF08A]',
    cx: 735,
    cy: 130
  },
  {
    num: '06',
    id: 6,
    title: 'Prove',
    subtitle: 'Show what you can do',
    detail: 'Build verifiable proof of what you can actually do.',
    color: '#10B981', // green
    bgColor: 'bg-[#ECFDF5]',
    glowColor: 'rgba(16,185,129,0.35)',
    borderColor: 'border-[#A7F3D0]',
    cx: 895,
    cy: 90
  },
  {
    num: '07',
    id: 7,
    title: 'Launch',
    subtitle: 'Step into opportunities',
    detail: 'Take your skills, projects and proof into real opportunities.',
    color: '#06B6D4', // cyan/teal
    bgColor: 'bg-[#ECFEFF]',
    glowColor: 'rgba(6,182,212,0.35)',
    borderColor: 'border-[#A5F3FC]',
    cx: 1045,
    cy: 50
  }
];

interface PhilosophySectionProps {
  onStartAssessment?: () => void;
  onExplorePlans?: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  onStartAssessment,
  onExplorePlans
}) => {
  // Default active milestone: 01 — Assess
  const [activeMilestoneId, setActiveMilestoneId] = useState<number>(1);

  const activeMilestone = MILESTONES.find((m) => m.id === activeMilestoneId) || MILESTONES[0];

  const handleCtaClick = () => {
    if (activeMilestone.ctaAction === 'assessment' && onStartAssessment) {
      onStartAssessment();
    } else if (activeMilestone.ctaAction === 'plan' && onExplorePlans) {
      onExplorePlans();
    }
  };

  return (
    <section id="philosophy" className="relative bg-[#FAFAFA] border-b border-[#E2E8F0] overflow-hidden">
      
      {/* ============================================================ */}
      {/* PART 1: THE CURVED CAREER JOURNEY ROADMAP & DETAIL STRIP     */}
      {/* Replaces old 7-card layout with minimal, premium roadmap    */}
      {/* ============================================================ */}
      <div className="pt-20 pb-16 lg:pt-24 lg:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Soft Radial Ambient Background Glow */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[450px] pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(224, 242, 254, 0.45) 0%, rgba(243, 232, 255, 0.25) 45%, rgba(250, 250, 250, 0) 75%)',
          }}
        />

        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="w-5 sm:w-8 h-[2px] bg-[#2563EB] rounded-full shrink-0" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#2563EB]">
              YOUR CAREER JOURNEY
            </span>
            <span className="w-5 sm:w-8 h-[2px] bg-[#2563EB] rounded-full shrink-0" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-[1.18]">
            From Potential to Opportunity.
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed font-normal">
            A simple journey to discover your path, build real skills and create proof for your career.
          </p>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP / TABLET: CURVED CAREER JOURNEY ROADMAP (md and up)  */}
        {/* Preserves original layout, glowing curve and nodes           */}
        {/* ============================================================ */}
        <div className="hidden md:block w-full relative pt-6 pb-1 sm:pt-9 sm:pb-3 my-4 sm:my-6 select-none overflow-visible">
          <div className="relative w-full aspect-[1180/340] max-h-[380px]">
          
          {/* SVG Journey Curve */}
          <svg
            viewBox="0 0 1180 340"
            className="w-full h-full overflow-visible"
            fill="none"
          >
            <defs>
              {/* Multi-color gradient spanning 01 to 07 */}
              <linearGradient id="roadmapMultiGradient" x1="5%" y1="70%" x2="95%" y2="15%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="16%" stopColor="#8B5CF6" />
                <stop offset="34%" stopColor="#EC4899" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="68%" stopColor="#EAB308" />
                <stop offset="84%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>

              {/* Soft glow filter for line */}
              <filter id="roadmapGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Glowing background path */}
            <path
              d="M 60 245 C 80 245, 85 240, 90 240 C 160 240, 190 195, 245 195 C 310 195, 350 240, 410 235 C 475 230, 515 185, 575 180 C 635 175, 675 135, 735 130 C 795 125, 840 95, 895 90 C 955 85, 995 55, 1045 50"
              stroke="url(#roadmapMultiGradient)"
              strokeWidth="14"
              strokeOpacity="0.28"
              strokeLinecap="round"
              fill="none"
              filter="url(#roadmapGlow)"
            />

            {/* Main Sharp Curved Journey Line */}
            <path
              d="M 60 245 C 80 245, 85 240, 90 240 C 160 240, 190 195, 245 195 C 310 195, 350 240, 410 235 C 475 230, 515 185, 575 180 C 635 175, 675 135, 735 130 C 795 125, 840 95, 895 90 C 955 85, 995 55, 1045 50"
              stroke="url(#roadmapMultiGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Dashed Trajectory Line Past 07 into the Future */}
            <path
              d="M 1045 50 C 1070 45, 1095 35, 1120 22"
              stroke="#06B6D4"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />

            {/* Paper Airplane Flying at End */}
            <g transform="translate(1125, 18) rotate(-18)">
              <polygon points="0,0 24,-10 12,12 8,2" fill="#2563EB" />
              <polygon points="8,2 24,-10 12,12" fill="#38BDF8" />
              <polygon points="0,0 8,2 24,-10" fill="#60A5FA" />
              <line x1="28" y1="-14" x2="33" y2="-17" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="28" y1="-7" x2="34" y2="-7" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </svg>

          {/* Near Node 07 Floating Callout: "Your Career Starts Here →" */}
          <div 
            id="career-starts-here-callout"
            className="absolute -top-7 right-8 lg:right-14 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#BAE6FD] text-[#0284C7] shadow-xs text-xs font-semibold whitespace-nowrap"
          >
            <span>Your Career Starts Here</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>

          {/* 7 Positioned Nodes & Labels */}
          {MILESTONES.map((m) => {
            const isActive = activeMilestoneId === m.id;
            const leftPct = (m.cx / 1180) * 100;
            const topPct = (m.cy / 340) * 100;

            return (
              <div
                key={m.num}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10"
                onClick={() => setActiveMilestoneId(m.id)}
              >
                {/* Node 01 "Start Here" floating badge */}
                {m.id === 1 && (
                  <div className="absolute -top-8 px-2.5 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-[11px] font-bold shadow-xs whitespace-nowrap animate-bounce">
                    Start Here
                  </div>
                )}

                {/* Circular Numbered Node Sitting Directly on Path */}
                <div
                  className={`
                    w-9 h-9 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-mono font-bold text-xs lg:text-sm text-white
                    border-2 border-white shadow-md transition-all duration-200 cursor-pointer
                    ${isActive ? 'scale-115 ring-2 ring-offset-2 shadow-lg' : 'hover:scale-110 hover:shadow-lg'}
                  `}
                  style={{
                    backgroundColor: m.color,
                    boxShadow: isActive
                      ? `0 0 24px ${m.glowColor}, 0 8px 16px -4px rgba(15,23,42,0.15)`
                      : `0 4px 12px ${m.glowColor}`
                  }}
                >
                  {m.num}
                </div>

                {/* Vertical Pin connector */}
                <div
                  className={`w-[1.5px] h-3 transition-colors duration-150 ${
                    isActive ? 'bg-[#0F172A]' : 'bg-[#CBD5E1] group-hover:bg-[#94A3B8]'
                  }`}
                />

                {/* Short Title + ONE Short Description Underneath */}
                <div className="text-center w-28 lg:w-36 select-none">
                  <div
                    className={`text-xs lg:text-sm tracking-tight transition-colors duration-150 truncate ${
                      isActive ? 'font-extrabold text-[#0F172A]' : 'font-bold text-[#1E293B] group-hover:text-[#0F172A]'
                    }`}
                  >
                    {m.title}
                  </div>
                  <div className="text-[10px] lg:text-[11px] text-[#64748B] leading-tight mt-0.5 font-normal line-clamp-2">
                    {m.subtitle}
                  </div>
                </div>
              </div>
            );
          })}

          </div>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP / TABLET: THE SINGLE HORIZONTAL DETAIL STRIP         */}
        {/* ============================================================ */}
        <div className="hidden md:block mt-8 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.num}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="py-4 px-6 lg:px-8 border-y border-[#E2E8F0] flex items-center justify-between gap-4 text-left bg-white/50 backdrop-blur-xs rounded-2xl shadow-2xs"
            >
              {/* Left Segment: [01]  Assess  |  Understand your interests... */}
              <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0 border border-current shadow-2xs"
                  style={{
                    backgroundColor: `${activeMilestone.color}15`,
                    color: activeMilestone.color,
                    borderColor: `${activeMilestone.color}40`
                  }}
                >
                  {activeMilestone.num}
                </div>

                <div className="text-lg lg:text-xl font-black text-[#0F172A] tracking-tight shrink-0">
                  {activeMilestone.title}
                </div>

                <div className="text-[#CBD5E1] text-base lg:text-lg font-light shrink-0">
                  |
                </div>

                <div className="text-xs lg:text-sm text-[#475569] font-normal leading-relaxed truncate">
                  {activeMilestone.detail}
                </div>
              </div>

              {/* Right Segment: Single relevant CTA button if milestone has one */}
              {activeMilestone.ctaText && (
                <div className="shrink-0">
                  <button
                    type="button"
                    id={`roadmap-cta-${activeMilestone.num}`}
                    onClick={handleCtaClick}
                    className="px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-xs lg:text-sm shadow-xs hover:shadow-md transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap min-h-[40px]"
                  >
                    <span>{activeMilestone.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ============================================================ */}
        {/* MOBILE: CONNECTED VERTICAL ROADMAP TRACK (Below md)           */}
        {/* Designed specifically for smartphone screens (320px - 767px)  */}
        {/* Zero horizontal overflow, clear readable text, full fidelity  */}
        {/* ============================================================ */}
        <div className="block md:hidden w-full relative mt-6 space-y-3">
          
          {/* Top Starting Indicator */}
          <div className="flex items-center justify-between pb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-bold shadow-2xs animate-pulse">
              <span>●</span> Step-by-step career path
            </span>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#0284C7]">
              <span>To real hiring</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Vertical Milestone Stack with Connecting Track */}
          <div className="relative pl-6 space-y-3">
            
            {/* Colorful Vertical Track Line */}
            <div 
              className="absolute left-[17px] top-4 bottom-4 w-1 rounded-full"
              style={{
                background: 'linear-gradient(to bottom, #2563EB, #8B5CF6, #EC4899, #F97316, #EAB308, #10B981, #06B6D4)'
              }}
            />

            {MILESTONES.map((m) => {
              const isActive = activeMilestoneId === m.id;
              
              return (
                <div
                  key={m.num}
                  onClick={() => setActiveMilestoneId(m.id)}
                  className={`relative p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                    isActive
                      ? 'bg-white border-[#CBD5E1] shadow-md ring-1 ring-blue-500/20'
                      : 'bg-white/80 border-[#E2E8F0] shadow-2xs hover:bg-white'
                  }`}
                >
                  {/* Positioned Milestone Marker Pin */}
                  <div
                    className="absolute -left-6 top-3.5 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs text-white shadow-sm border-2 border-white transition-transform"
                    style={{
                      backgroundColor: m.color,
                      boxShadow: `0 0 12px ${m.glowColor}`
                    }}
                  >
                    {m.num}
                  </div>

                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-[#0F172A]">
                        {m.title}
                      </span>
                      <span className="text-[11px] font-medium text-[#64748B]">
                        • {m.subtitle}
                      </span>
                    </div>

                    {m.id === 1 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1D4ED8] text-[9px] font-bold shrink-0 border border-[#BFDBFE]">
                        Start Here
                      </span>
                    )}
                  </div>

                  {/* Detail text */}
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                    {m.detail}
                  </p>

                  {/* Inline Action CTA if milestone is active or has explicit CTA */}
                  {m.ctaText && (
                    <div className="mt-2.5 pt-2 border-t border-[#F1F5F9] flex justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (m.ctaAction === 'assessment' && onStartAssessment) onStartAssessment();
                          if (m.ctaAction === 'plan' && onExplorePlans) onExplorePlans();
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer min-h-[36px] transition-all duration-150"
                      >
                        <span>{m.ctaText}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Callout: Paper plane at the end */}
            <div className="pt-2 flex items-center justify-between bg-gradient-to-r from-[#EFF6FF] to-[#F0FDFA] border border-[#BAE6FD] rounded-xl p-3 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0284C7]">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2563EB] fill-current shrink-0">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
                <span>Your Career Starts Here</span>
              </div>
              <span className="text-[10px] font-mono text-[#64748B] font-medium">Ready to launch</span>
            </div>

          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* PART 2: THE APPROVED "ZOBLY PROOF" SECTION                   */}
      {/* Learn -> Build -> Prove -> Earn with tangible skills proof   */}
      {/* ============================================================ */}
      <ZoblyProofSection />

    </section>
  );
};
