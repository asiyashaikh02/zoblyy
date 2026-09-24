import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Sparkles, UserCheck, PhoneCall, ShieldCheck } from 'lucide-react';
import { AuthBackground } from '../auth/AuthBackground';
import { RocketIllustration } from '../auth/RocketIllustration';

interface SignupSuccessPageProps {
  onNavigatePage: (path: string) => void;
}

const TRACK_TITLES: Record<string, string> = {
  'ai-automation': 'AI & Business Automation',
  'software-product': 'Software & Product Development',
  'data-bi': 'Data Analytics & Business Intelligence',
};

export const SignupSuccessPage: React.FC<SignupSuccessPageProps> = ({ onNavigatePage }) => {
  const [userName, setUserName] = useState('Student');
  const [userPhone, setUserPhone] = useState('');
  const [userCourse, setUserCourse] = useState('ai-automation');

  useEffect(() => {
    try {
      const storedName = sessionStorage.getItem('zobly_user_name');
      const storedPhone = sessionStorage.getItem('zobly_user_phone');
      const storedCourse = sessionStorage.getItem('zobly_user_course');
      if (storedName) setUserName(storedName);
      if (storedPhone) setUserPhone(storedPhone);
      if (storedCourse) setUserCourse(storedCourse);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const steps = [
    { id: 'step-1', label: 'Student account created' },
    { id: 'step-2', label: 'Enrollment details saved securely' },
    { id: 'step-3', label: 'Admissions advisor phone review scheduled' },
  ];

  return (
    <AuthBackground onNavigateHome={() => onNavigatePage('/')}>
      
      {/* =========================================================================
          SUCCESS / ONBOARDING CARD COMPONENT
          ========================================================================= */}
      <div className="w-full max-w-[480px] bg-white/95 backdrop-blur-xl border border-white/80 rounded-[32px] shadow-[0_20px_60px_-15px_rgba(37,99,235,0.18),0_10px_25px_-5px_rgba(15,23,42,0.06)] p-7 sm:p-9 text-center transition-all">
        
        {/* Central Upward Journey Rocket Launch Illustration */}
        <div className="pt-1 pb-4">
          <RocketIllustration launch={true} />
        </div>

        {/* Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-2 mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Registration Confirmed</span>
          </div>

          <h1 className="text-2xl sm:text-[30px] font-black text-[#0F172A] tracking-tight leading-tight">
            Welcome aboard,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#1D4ED8]">
              {userName}!
            </span>
          </h1>

          <p className="text-xs sm:text-sm font-medium text-[#475569] mt-2">
            Your registration for{' '}
            <span className="font-bold text-[#0F172A]">
              {TRACK_TITLES[userCourse] || 'your chosen program'}
            </span>{' '}
            has been received.
          </p>
        </motion.div>

        {/* Clean Progress/Status Checklist */}
        <div className="space-y-2.5 text-left max-w-[340px] mx-auto mb-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.18, duration: 0.4 }}
              className="flex items-center gap-3 py-1"
            >
              <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#1E293B]">
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Main Status Message Box: "Our advisor will call you" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]/50 border border-[#BFDBFE]/80 flex items-start gap-3.5 text-left shadow-2xs"
        >
          <div className="w-9 h-9 rounded-xl bg-white text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <PhoneCall className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#1E3A8A]">
              Our admissions team will call you shortly
            </div>
            <p className="text-[11px] sm:text-xs text-[#3B82F6] font-normal mt-0.5 leading-relaxed">
              {userPhone ? (
                <>We have scheduled a quick call to <span className="font-bold">{userPhone}</span> to discuss your learning schedule and answer questions.</>
              ) : (
                <>An admissions counselor will connect with you by phone to guide your course schedule and milestones.</>
              )}
            </p>
          </div>
        </motion.div>

        {/* Primary CTA: View Status Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.4 }}
          className="space-y-2.5"
        >
          <button
            id="success-view-dashboard-btn"
            onClick={() => onNavigatePage('/dashboard')}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-[0.99] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_10px_25px_-5px_rgba(29,78,216,0.35)] transition-all cursor-pointer group"
          >
            <span>View My Registration Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigatePage('/')}
            className="w-full py-2.5 px-4 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] cursor-pointer"
          >
            Explore Public Website
          </button>
        </motion.div>

        {/* Microcopy Brand Signature below */}
        <div className="mt-6 pt-4 border-t border-[#F1F5F9] text-center">
          <div className="font-extrabold text-sm text-[#0F172A] tracking-tight">
            zobly
          </div>
          <div className="text-[9px] uppercase tracking-widest font-mono text-[#94A3B8] font-semibold mt-0.5">
            BUILD SKILLS • BUILD PROOF • BUILD YOUR CAREER
          </div>
        </div>

      </div>

    </AuthBackground>
  );
};
