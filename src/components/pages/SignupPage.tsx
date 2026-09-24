import React from 'react';
import { ShieldCheck, ArrowRight, Sparkles, Lock, ArrowLeft } from 'lucide-react';
import { AuthBackground } from '../auth/AuthBackground';
import { ZoblyLogo } from '../common/ZoblyLogo';
import { IndiaFlag } from '../common/IndiaFlag';

interface SignupPageProps {
  onNavigatePage: (path: string) => void;
  onOpenEnrollModal?: () => void;
}

/**
 * Deactivated Student Signup Route
 * Zobly admits students via the canonical ChooseLearningPlanModal.
 * Public account creation is disabled; student credentials are issued post-onboarding.
 */
export const SignupPage: React.FC<SignupPageProps> = ({ onNavigatePage, onOpenEnrollModal }) => {
  return (
    <AuthBackground onNavigateHome={() => onNavigatePage('/')}>
      <div className="w-full max-w-[500px] bg-white/95 backdrop-blur-xl border border-white/80 rounded-[32px] shadow-[0_20px_60px_-15px_rgba(37,99,235,0.18),0_10px_25px_-5px_rgba(15,23,42,0.06)] p-6 sm:p-8 transition-all text-center">
        {/* Brand Logo */}
        <div className="flex items-center justify-between mb-6">
          <ZoblyLogo className="h-7 sm:h-8 w-auto" id="signup-notice-logo" />
          <div className="text-right text-[9px] font-bold tracking-widest text-[#94A3B8] uppercase leading-tight font-mono select-none">
            <div>SKILLS</div>
            <div>PROOF</div>
            <div>CAREER</div>
          </div>
        </div>

        {/* Icon & Title */}
        <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] mx-auto flex items-center justify-center mb-4">
          <Sparkles className="w-7 h-7" />
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
          Admissions by Application Only
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] mt-2 mb-6 leading-relaxed">
          Direct account registration is disabled. To join an upcoming Zobly career track, please submit your customized learning plan through our canonical application form.
        </p>

        {/* Primary Action: Open Canonical Enrollment Modal */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              if (onOpenEnrollModal) {
                onOpenEnrollModal();
              } else {
                onNavigatePage('/');
              }
            }}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Apply / Enroll in a Program</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary Action: Login for Existing Approved Students */}
          <button
            type="button"
            onClick={() => onNavigatePage('/login')}
            className="w-full py-3 px-5 rounded-2xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#334155] border border-[#E2E8F0] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Already Enrolled? Student Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigatePage('/')}
            className="text-xs text-[#64748B] hover:text-[#0F172A] font-medium pt-2 inline-flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Homepage</span>
          </button>
        </div>

        {/* Footer Microcopy */}
        <div className="mt-8 pt-4 border-t border-[#F1F5F9] flex items-center justify-center gap-3 text-[11px] text-[#64748B]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Official Zobly Admissions</span>
          </div>
          <span className="text-[#CBD5E1]">|</span>
          <div className="flex items-center gap-1.5">
            <span>Made in India</span>
            <IndiaFlag className="w-3.5 h-2.5" id="signup-notice-flag" />
          </div>
        </div>
      </div>
    </AuthBackground>
  );
};
