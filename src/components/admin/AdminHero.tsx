import React from 'react';
import { GraduationCap, BarChart3, Sparkles } from 'lucide-react';

interface AdminHeroProps {
  adminName?: string;
}

export const AdminHero: React.FC<AdminHeroProps> = ({ adminName }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = adminName && adminName !== 'Admin' 
    ? adminName.trim().split(' ')[0] 
    : 'Admin';

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#EFF6FF] via-[#F3F4FD] to-[#F5F3FF] border border-[#E2E8F0]/80 p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(219,234,254,0.4)]">
      {/* Subtle Ambient Radial Glows */}
      <div 
        className="absolute -top-16 -right-10 w-80 h-80 bg-gradient-to-br from-[#0080FF]/10 via-[#818CF8]/10 to-transparent rounded-full blur-2xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-20 right-48 w-60 h-60 bg-gradient-to-tr from-[#60A5FA]/10 to-transparent rounded-full blur-xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Narrative */}
        <div className="space-y-1">
          <div className="text-sm font-medium text-[#475569] flex items-center gap-1.5">
            <span>{getGreeting()},</span>
          </div>
          <h1 className="text-2xl sm:text-[32px] font-extrabold text-[#0F172A] tracking-tight flex items-center gap-2">
            <span>{displayName}</span>
            <span className="inline-block animate-wave origin-bottom-right">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] pt-0.5">
            Here's what's happening with your student registrations.
          </p>
        </div>

        {/* Right 3D Translucent Glass Graphic Matching Reference Image */}
        <div className="hidden sm:flex items-center gap-3 self-end md:self-center pr-2">
          {/* Frosted Glass Card 1 - Education Cap */}
          <div className="relative transform -rotate-6 hover:rotate-0 transition-transform duration-300 w-24 h-20 sm:w-28 sm:h-22 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-[0_10px_25px_-5px_rgba(37,99,235,0.15)] flex items-center justify-center group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0080FF] to-[#60A5FA] flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            {/* Sparkle badge */}
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white shadow-xs border border-blue-100 flex items-center justify-center text-[#0080FF]">
              <Sparkles className="w-3 h-3" />
            </div>
          </div>

          {/* Frosted Glass Card 2 - Analytics Chart */}
          <div className="relative transform rotate-6 hover:rotate-0 transition-transform duration-300 w-20 h-24 sm:w-22 sm:h-26 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_-5px_rgba(99,102,241,0.12)] flex items-center justify-center">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#6366F1] to-[#A5B4FC] flex items-center justify-center text-white shadow-md">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
