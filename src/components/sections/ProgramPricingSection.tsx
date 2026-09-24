import React from 'react';
import { 
  Calendar, 
  Clock, 
  BarChart3, 
  Award, 
  BookOpen, 
  Users, 
  ArrowRight
} from 'lucide-react';

interface ProgramPricingSectionProps {
  onSelectDuration: (durationId: '4-weeks' | '6-weeks' | '8-weeks') => void;
  onSelectPathwayPill?: (pathwayId: string) => void;
}

export const ProgramPricingSection: React.FC<ProgramPricingSectionProps> = ({
  onSelectDuration,
  onSelectPathwayPill,
}) => {
  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-28 bg-[#FAFAFA] relative overflow-hidden">
      
      {/* Subtle background ambient glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-[#38BDF8]/10 via-[#818CF8]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==================================================
            SECTION HEADER
            ================================================== */}
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="w-5 sm:w-8 h-[2px] bg-[#2563EB] rounded-full shrink-0" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#2563EB]">
              LEARNING PROGRAMS
            </span>
            <span className="w-5 sm:w-8 h-[2px] bg-[#2563EB] rounded-full shrink-0" />
          </div>

          {/* Main Heading */}
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-[1.18]">
            Choose How Far{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#9333EA]">
              You Want to Go.
            </span>
          </h2>

          {/* Supporting Line */}
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto font-normal">
            The time you invest becomes the proof you show.
          </p>

        </div>

        {/* ==================================================
            PROGRAM SCHEDULE ROW
            ================================================== */}
        <div className="mt-6 sm:mt-8 mb-8 sm:mb-12 max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm border border-[#E2E8F0] shadow-sm rounded-2xl p-3 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-0 sm:divide-x divide-[#E2E8F0]">
            
            {/* 01: Schedule */}
            <div className="flex items-center gap-2.5 sm:gap-3 px-2 sm:px-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-xs font-bold text-[#0F172A] truncate">Mon – Sat</div>
                <div className="text-[11px] sm:text-[11px] text-[#64748B] font-mono truncate">11 AM – 5 PM</div>
              </div>
            </div>

            {/* 02: Daily Pace */}
            <div className="flex items-center gap-2.5 sm:gap-3 px-2 sm:px-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-xs font-bold text-[#0F172A] truncate">6 Hrs Daily</div>
                <div className="text-[11px] sm:text-[11px] text-[#64748B] truncate">Hands-on</div>
              </div>
            </div>

            {/* 03: Projects */}
            <div className="flex items-center gap-2.5 sm:gap-3 px-2 sm:px-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center shrink-0">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-xs font-bold text-[#0F172A] truncate">Real Projects</div>
                <div className="text-[11px] sm:text-[11px] text-[#64748B] truncate">Build. Prove.</div>
              </div>
            </div>

            {/* 04: Career Ready */}
            <div className="flex items-center gap-2.5 sm:gap-3 px-2 sm:px-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FAF5FF] text-[#9333EA] flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-xs font-bold text-[#0F172A] truncate">Career Ready</div>
                <div className="text-[11px] sm:text-[11px] text-[#64748B] truncate">Placement</div>
              </div>
            </div>

          </div>
        </div>

        {/* ==================================================
            THREE DURATION CARDS
            ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* --------------------------------------------------
              CARD 01: 04 WEEKS
              -------------------------------------------------- */}
          <div className="group bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#BFDBFE] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative">
            
            <div className="space-y-4 lg:space-y-5">
              {/* Header pill & duration */}
              <div className="flex items-center justify-between gap-1">
                <span className="font-extrabold text-xs lg:text-sm tracking-wider text-[#2563EB] uppercase truncate">
                  04 WEEKS
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE] whitespace-nowrap truncate">
                  Foundation
                </span>
              </div>

              {/* Headline */}
              <div>
                <h3 className="text-xl sm:text-xl lg:text-2xl font-bold text-[#0F172A] leading-tight">
                  Your Time.<br />
                  <span className="text-[#2563EB]">Your Skills.</span>
                </h3>
                <p className="mt-2 text-sm sm:text-xs lg:text-sm text-[#64748B] leading-relaxed">
                  Kickstart your journey with focused learning, core concepts and hands-on practice.
                </p>
              </div>

              {/* Hours calculation */}
              <div className="pt-2 pb-1">
                <div className="flex items-center justify-between bg-[#F8FAFC] border border-[#F1F5F9] rounded-xl px-3.5 py-2.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span className="font-extrabold text-xs lg:text-sm text-[#0F172A]">144 Hours</span>
                  </div>
                  <span className="text-xs text-[#64748B] font-mono">
                    24d × 6h
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-xs lg:text-sm font-medium text-[#334155]">
                  <BookOpen className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="truncate">Core Skills & Labs</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs lg:text-sm font-medium text-[#334155]">
                  <Users className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="truncate">Mini Projects</span>
                </div>
              </div>
            </div>

            {/* Bottom Price & CTA */}
            <div className="pt-6 lg:pt-8 border-t border-[#F1F5F9] mt-6 space-y-4">
              <div>
                <div className="text-2xl sm:text-2xl lg:text-4xl font-black text-[#0F172A] tracking-tight">
                  ₹4,999
                </div>
                <div className="text-xs text-[#64748B] mt-0.5 truncate">
                  One-time fee
                </div>
              </div>

              <button
                id="btn-choose-4-weeks"
                onClick={() => onSelectDuration('4-weeks')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-[#BFDBFE] hover:border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF] font-semibold text-sm sm:text-base transition-all duration-150 cursor-pointer min-h-[44px]"
              >
                <span>Choose 4-Week Program</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

          </div>

          {/* --------------------------------------------------
              CARD 02: 06 WEEKS (MOST POPULAR)
              -------------------------------------------------- */}
          <div className="group bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border-2 border-[#2563EB] shadow-lg shadow-[#2563EB]/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative ring-2 sm:ring-4 ring-[#2563EB]/5">
            
            <div className="space-y-4 lg:space-y-5">
              {/* Header pill & duration */}
              <div className="flex items-center justify-between gap-1">
                <span className="font-extrabold text-xs lg:text-sm tracking-wider text-[#2563EB] uppercase truncate">
                  06 WEEKS
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold bg-[#2563EB] text-white shadow-sm whitespace-nowrap truncate">
                  Most Popular
                </span>
              </div>

              {/* Headline */}
              <div>
                <h3 className="text-xl sm:text-xl lg:text-2xl font-bold text-[#0F172A] leading-tight">
                  Your Skills.<br />
                  <span className="text-[#2563EB]">Your Proof.</span>
                </h3>
                <p className="mt-2 text-sm sm:text-xs lg:text-sm text-[#64748B] leading-relaxed">
                  Go deeper with advanced concepts, build real systems and create verifiable proof of your skills.
                </p>
              </div>

              {/* Hours calculation */}
              <div className="pt-2 pb-1">
                <div className="flex items-center justify-between bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl px-3.5 py-2.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span className="font-extrabold text-xs lg:text-sm text-[#0F172A]">216 Hours</span>
                  </div>
                  <span className="text-xs text-[#2563EB] font-mono font-medium">
                    36d × 6h
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-xs lg:text-sm font-medium text-[#334155]">
                  <BookOpen className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="truncate">Real Projects</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs lg:text-sm font-medium text-[#334155]">
                  <Users className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="truncate">Mentorship</span>
                </div>
              </div>
            </div>

            {/* Bottom Price & CTA */}
            <div className="pt-6 lg:pt-8 border-t border-[#F1F5F9] mt-6 space-y-4">
              <div>
                <div className="text-2xl sm:text-2xl lg:text-4xl font-black text-[#0F172A] tracking-tight">
                  ₹6,999
                </div>
                <div className="text-xs text-[#64748B] mt-0.5 truncate">
                  One-time fee
                </div>
              </div>

              <button
                id="btn-choose-6-weeks"
                onClick={() => onSelectDuration('6-weeks')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer min-h-[44px]"
              >
                <span>Choose 6-Week Program</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

          </div>

          {/* --------------------------------------------------
              CARD 03: 08 WEEKS
              -------------------------------------------------- */}
          <div className="group bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#DDD6FE] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative">
            
            <div className="space-y-4 lg:space-y-5">
              {/* Header pill & duration */}
              <div className="flex items-center justify-between gap-1">
                <span className="font-extrabold text-xs lg:text-sm tracking-wider text-[#7C3AED] uppercase truncate">
                  08 WEEKS
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium bg-[#FAF5FF] text-[#7C3AED] border border-[#EDE9FE] whitespace-nowrap truncate">
                  Complete
                </span>
              </div>

              {/* Headline */}
              <div>
                <h3 className="text-xl sm:text-xl lg:text-2xl font-bold text-[#0F172A] leading-tight">
                  The Time You Invest<br />
                  Becomes the Proof<br />
                  <span className="text-[#7C3AED]">You Show.</span>
                </h3>
                <p className="mt-2 text-sm sm:text-xs lg:text-sm text-[#64748B] leading-relaxed">
                  A complete learning-to-proof journey with advanced projects, deployment and career launchpad.
                </p>
              </div>

              {/* Hours calculation */}
              <div className="pt-2 pb-1">
                <div className="flex items-center justify-between bg-[#FAF5FF] border border-[#F3E8FF] rounded-xl px-3.5 py-2.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#7C3AED] shrink-0" />
                    <span className="font-extrabold text-xs lg:text-sm text-[#0F172A]">288 Hours</span>
                  </div>
                  <span className="text-xs text-[#7C3AED] font-mono">
                    48d × 6h
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-xs lg:text-sm font-medium text-[#334155]">
                  <BookOpen className="w-4 h-4 text-[#7C3AED] shrink-0" />
                  <span className="truncate">End-to-End Dev</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs lg:text-sm font-medium text-[#334155]">
                  <Users className="w-4 h-4 text-[#7C3AED] shrink-0" />
                  <span className="truncate">Career Launchpad</span>
                </div>
              </div>
            </div>

            {/* Bottom Price & CTA */}
            <div className="pt-6 lg:pt-8 border-t border-[#F1F5F9] mt-6 space-y-4">
              <div>
                <div className="text-2xl sm:text-2xl lg:text-4xl font-black text-[#0F172A] tracking-tight">
                  ₹11,999
                </div>
                <div className="text-xs text-[#64748B] mt-0.5 truncate">
                  One-time fee
                </div>
              </div>

              <button
                id="btn-choose-8-weeks"
                onClick={() => onSelectDuration('8-weeks')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-[#DDD6FE] hover:border-[#7C3AED] text-[#7C3AED] hover:bg-[#FAF5FF] font-semibold text-sm sm:text-base transition-all duration-150 cursor-pointer min-h-[44px]"
              >
                <span>Choose 8-Week Program</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
