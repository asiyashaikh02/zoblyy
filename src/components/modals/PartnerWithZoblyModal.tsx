import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoblyLogo } from '../common/ZoblyLogo';
import { 
  X, 
  User, 
  Building2, 
  Mail, 
  Phone, 
  ChevronDown, 
  ArrowRight, 
  TrendingUp, 
  FolderGit2, 
  Award, 
  Lock, 
  CheckCircle2, 
  Loader2,
  Sparkles
} from 'lucide-react';

interface PartnerWithZoblyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerWithZoblyModal: React.FC<PartnerWithZoblyModalProps> = ({
  isOpen,
  onClose
}) => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    partnerType: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Partnership Type Options
  const partnershipOptions = [
    'College',
    'University',
    'Training Institute',
    'Skill Development Organization',
    'Corporate / Industry Partner',
    'Technology Partner',
    'Other'
  ];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Your name is required';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Institution or organization name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid work email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.partnerType) {
      newErrors.partnerType = 'Please select a partnership type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate submission to Synckraft team
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 750);
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        organization: '',
        email: '',
        phone: '',
        partnerType: ''
      });
      setErrors({});
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleResetAndClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="partner-modal-title"
    >
      {/* =========================================================================
          SOFT TRANSLUCENT OVERLAY + SUBTLE BACKDROP BLUR
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-[#0B192C]/40 backdrop-blur-md cursor-pointer"
        aria-hidden="true"
      />

      {/* =========================================================================
          CENTERED FLOATING TWO-PANEL MODAL (Desktop: 45% Left / 55% Right)
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1000px] max-h-[92vh] overflow-y-auto bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_25px_70px_-15px_rgba(37,99,235,0.25),0_15px_35px_-10px_rgba(15,23,42,0.12)] border border-white/80 z-10 flex flex-col lg:flex-row"
      >

        {/* =======================================================================
            CLEAN CLOSE BUTTON (TOP-RIGHT)
            ======================================================================= */}
        <button
          id="close-partner-modal-btn"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 p-2 rounded-full text-[#64748B] hover:text-[#0F172A] hover:bg-[#F0F7FF] transition-colors cursor-pointer group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {/* =======================================================================
            LEFT PANEL: ZOBLY BRAND STORY (~45% on desktop)
            Soft sky-blue gradient, subtle cloud atmosphere, benefits & futuristic art
            ======================================================================= */}
        <div className="hidden md:flex w-full lg:w-[45%] relative bg-gradient-to-b from-[#EBF5FE] via-[#F1F8FE] to-[#DDF0FE] p-5 sm:p-7 lg:p-9 flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-[#E2E8F0]/70 shrink-0">
          
          {/* Ambient cloud & radiance background layers */}
          <div 
            className="absolute -top-16 -left-16 w-64 h-64 bg-white/70 rounded-full blur-2xl pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute top-1/3 -right-20 w-72 h-72 bg-[#BFDBFE]/30 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="relative z-10 space-y-6">
            
            {/* Top Brand Header Row */}
            <div className="flex items-start justify-between">
              
              {/* Zobly Brand Logo & Synckraft Initiative Eyebrow */}
              <div className="flex flex-col">
                <div className="flex items-center">
                  <ZoblyLogo className="h-8 w-auto" id="modal-brand-logo" />
                </div>

                {/* Clean technical eyebrow: A ZOBLY INITIATIVE BY SYNCKRAFT */}
                <div className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wider text-[#2563EB] uppercase select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  <span>A ZOBLY INITIATIVE BY SYNCKRAFT</span>
                </div>
              </div>

              {/* Right Technical Tag matching reference */}
              <div className="hidden sm:block text-right text-[9px] font-mono font-bold tracking-widest text-[#94A3B8] uppercase leading-tight select-none">
                <div>SKILLS</div>
                <div>PROOF</div>
                <div>CAREER</div>
                <div className="text-[#CBD5E1] font-normal">—</div>
              </div>

            </div>

            {/* Main Heading: Let's Build What's Next. */}
            <div>
              <h2 id="partner-modal-title" className="text-2xl sm:text-[30px] font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
                Let’s Build<br />
                What’s{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED]">
                  Next.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-2.5 max-w-sm">
                Partner with Zobly to connect learning, technology, and real career opportunities — backed by Synckraft.
              </p>
            </div>

            {/* 3 Small Visual Benefit Blocks */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1">
              
              {/* Benefit 1 */}
              <div className="p-2.5 rounded-xl bg-white/85 backdrop-blur-xs border border-white shadow-2xs">
                <div className="w-6 h-6 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px] font-bold text-[#0F172A] tracking-tight uppercase">
                  REAL SKILLS
                </div>
                <div className="text-[10px] text-[#64748B] leading-tight mt-0.5">
                  Build capabilities that matter.
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="p-2.5 rounded-xl bg-white/85 backdrop-blur-xs border border-white shadow-2xs">
                <div className="w-6 h-6 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-1.5">
                  <FolderGit2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px] font-bold text-[#0F172A] tracking-tight uppercase">
                  REAL PROJECTS
                </div>
                <div className="text-[10px] text-[#64748B] leading-tight mt-0.5">
                  Turn learning into practical work.
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="p-2.5 rounded-xl bg-white/85 backdrop-blur-xs border border-white shadow-2xs">
                <div className="w-6 h-6 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-1.5">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px] font-bold text-[#0F172A] tracking-tight uppercase">
                  CAREER PROOF
                </div>
                <div className="text-[10px] text-[#64748B] leading-tight mt-0.5">
                  Show what you can actually do.
                </div>
              </div>

            </div>

          </div>

          {/* =====================================================================
              BOTTOM PORTION: FUTURISTIC VISUAL (Learning → Technology → Career)
              Glowing Zobly holographic cube, digital pathway nodes, atmospheric clouds
              ===================================================================== */}
          <div className="relative mt-6 pt-2 select-none">
            
            <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-white/60 via-[#E0F2FE]/50 to-[#BFDBFE]/40 border border-white/80 shadow-2xs">
              
              {/* Atmospheric Sky and Clouds in illustration */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent z-10" />

              {/* SVG Futuristic Handshake & Glowing Holographic Z Crystal */}
              <svg 
                viewBox="0 0 400 180" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-cover"
              >
                <defs>
                  {/* Glowing Holographic Gradient */}
                  <linearGradient id="holo_grad" x1="160" y1="30" x2="240" y2="120" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#67E8F9" stopOpacity="0.9" />
                    <stop offset="0.4" stopColor="#3B82F6" stopOpacity="0.95" />
                    <stop offset="1" stopColor="#7C3AED" stopOpacity="0.85" />
                  </linearGradient>

                  {/* Horizon Glow */}
                  <radialGradient id="sun_radial" cx="200" cy="75" r="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="0.5" stopColor="#93C5FD" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#93C5FD" stopOpacity="0" />
                  </radialGradient>

                  {/* Left Arm Gradient */}
                  <linearGradient id="arm_left_grad" x1="0" y1="120" x2="170" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1E3A8A" />
                    <stop offset="0.6" stopColor="#2563EB" />
                    <stop offset="1" stopColor="#60A5FA" />
                  </linearGradient>

                  {/* Right Arm Cyber Gradient */}
                  <linearGradient id="arm_right_grad" x1="400" y1="120" x2="230" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1E293B" />
                    <stop offset="0.5" stopColor="#334155" />
                    <stop offset="1" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>

                {/* Ambient Radial Sunburst in background */}
                <circle cx="200" cy="75" r="90" fill="url(#sun_radial)" />

                {/* Distant Futuristic Tech Skyline / Grid silhouette */}
                <path 
                  d="M110 95L110 70L125 70L125 95L145 95L145 60L160 60L160 95L240 95L240 55L255 55L255 95L275 95L275 68L290 68L290 95Z" 
                  fill="#93C5FD" 
                  opacity="0.35" 
                />

                {/* Floating Holographic Crystal Tablet (Zobly symbol inside) */}
                <g filter="drop-shadow(0 8px 16px rgba(37,99,235,0.3))">
                  <rect 
                    x="165" 
                    y="32" 
                    width="70" 
                    height="70" 
                    rx="16" 
                    fill="url(#holo_grad)" 
                    stroke="#FFFFFF" 
                    strokeWidth="1.5" 
                  />

                  {/* Glowing Z emblem on the floating tablet */}
                  <path 
                    d="M188 53H212L194 77H212" 
                    stroke="#FFFFFF" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  
                  {/* Light flare glint */}
                  <circle cx="175" cy="42" r="2.5" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="225" cy="92" r="1.5" fill="#FFFFFF" opacity="0.7" />
                </g>

                {/* Collaborative Technology Handshake Silhouette */}
                {/* Left human sleeve / hand extending to center */}
                <path 
                  d="M0 160L80 125C110 115 140 110 175 112L195 118L185 130L150 135L0 180Z" 
                  fill="url(#arm_left_grad)" 
                  opacity="0.9" 
                />

                {/* Right cyber / partner sleeve extending to center */}
                <path 
                  d="M400 160L320 125C290 115 260 110 225 112L205 118L215 130L250 135L400 180Z" 
                  fill="url(#arm_right_grad)" 
                  opacity="0.9" 
                />

                {/* Clasping collaborative hands center node */}
                <path 
                  d="M175 112C185 106 215 106 225 112C230 118 220 134 200 134C180 134 170 118 175 112Z" 
                  fill="#60A5FA" 
                />

                {/* Glowing light particles */}
                <circle cx="140" cy="80" r="1.5" fill="#3B82F6" />
                <circle cx="260" cy="78" r="2" fill="#67E8F9" />
                <circle cx="200" cy="22" r="2" fill="#FBBF24" />
                <circle cx="180" cy="28" r="1" fill="#60A5FA" />
                <circle cx="220" cy="28" r="1" fill="#818CF8" />

                {/* Foreground soft white billowing clouds */}
                <path 
                  d="M0 180C40 150 90 155 140 165C190 175 220 160 270 165C320 170 360 150 400 180Z" 
                  fill="#FFFFFF" 
                  opacity="0.95" 
                />
              </svg>

              {/* Bottom Badge inside visual container */}
              <div className="absolute bottom-2 inset-x-0 z-20 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white text-[10px] font-semibold text-[#1E3A8A] shadow-2xs">
                  <Sparkles className="w-3 h-3 text-[#2563EB]" />
                  <span>Learning • Technology • Career</span>
                </span>
              </div>

            </div>

            {/* Bottom Technical Statement */}
            <div className="mt-3.5 pt-2 border-t border-[#CBD5E1]/50 text-left">
              <div className="font-mono text-[10px] font-bold tracking-wider text-[#334155] uppercase leading-tight select-none">
                BUILD SKILLS. BUILD PROOF. BUILD YOUR CAREER.
              </div>
              <div className="text-[10px] text-[#64748B] mt-0.5">
                Technology Partners for a Brighter Tomorrow.
              </div>
            </div>

          </div>

        </div>

        {/* =======================================================================
            RIGHT PANEL: PARTNERSHIP FORM (~55% on desktop)
            Clean, white / light blue, high contrast, responsive fields
            ======================================================================= */}
        <div className="w-full lg:w-[55%] bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            
            {/* SUCCESS STATE */}
            {isSubmitted ? (
              <motion.div
                key="success-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="py-10 sm:py-16 flex flex-col items-center justify-center text-center space-y-5"
              >
                {/* Animated Blue Checkmark Badge */}
                <div className="w-16 h-16 rounded-3xl bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(37,99,235,0.25)]">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
                </div>

                {/* Eyebrow: PARTNERSHIP REQUEST RECEIVED */}
                <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#2563EB]">
                  PARTNERSHIP REQUEST RECEIVED
                </div>

                {/* Main Heading */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  Thank you. You're on our radar.
                </h3>

                {/* Description */}
                <p className="text-sm text-[#475569] max-w-md leading-relaxed">
                  We've received your partnership request. The Synckraft team will review the details and contact you shortly.
                </p>

                {/* Supporting Line */}
                <div className="text-xs text-[#64748B] font-medium pt-1">
                  Zobly is an initiative by Synckraft.
                </div>

                {/* CTA: Close → */}
                <div className="pt-4 w-full max-w-xs">
                  <button
                    onClick={handleResetAndClose}
                    className="w-full py-3 px-6 rounded-2xl bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_10px_25px_-5px_rgba(29,78,216,0.35)] transition-all cursor-pointer"
                  >
                    <span>Close</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              
              /* PARTNERSHIP FORM */
              <motion.div
                key="form-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                
                {/* Top Eyebrow & Main Headings */}
                <div className="text-left">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#2563EB]">
                    PARTNER WITH ZOBLY
                  </div>
                  
                  <h3 className="text-2xl sm:text-[28px] font-extrabold text-[#0F172A] tracking-tight mt-1">
                    Partner With Zobly
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] mt-1.5 leading-relaxed">
                    Tell us about your institution or organization and let’s explore how we can work together to create stronger learning and career outcomes.
                  </p>

                  <p className="text-[11px] text-[#64748B] mt-1 font-medium">
                    Zobly is an initiative by Synckraft.
                  </p>
                </div>

                {/* Interactive Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
                  
                  {/* Field 1: Your Name */}
                  <div>
                    <div className={`relative flex items-center rounded-2xl border bg-[#F8FAFC]/80 px-3.5 py-2.5 transition-all ${errors.name ? 'border-red-400 focus-within:ring-2 focus-within:ring-red-200' : 'border-[#E2E8F0] focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/15'}`}>
                      <User className="w-4 h-4 text-[#94A3B8] shrink-0 mr-2.5" />
                      <input
                        id="partner-form-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                        }}
                        placeholder="Your Name"
                        className="w-full bg-transparent text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-[11px] text-red-500 mt-1 pl-2">{errors.name}</p>
                    )}
                  </div>

                  {/* Field 2: Institution / Organization Name */}
                  <div>
                    <div className={`relative flex items-center rounded-2xl border bg-[#F8FAFC]/80 px-3.5 py-2.5 transition-all ${errors.organization ? 'border-red-400 focus-within:ring-2 focus-within:ring-red-200' : 'border-[#E2E8F0] focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/15'}`}>
                      <Building2 className="w-4 h-4 text-[#94A3B8] shrink-0 mr-2.5" />
                      <input
                        id="partner-form-organization"
                        type="text"
                        value={formData.organization}
                        onChange={(e) => {
                          setFormData({ ...formData, organization: e.target.value });
                          if (errors.organization) setErrors(prev => ({ ...prev, organization: '' }));
                        }}
                        placeholder="Institution / Organization Name"
                        className="w-full bg-transparent text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none"
                      />
                    </div>
                    {errors.organization && (
                      <p className="text-[11px] text-red-500 mt-1 pl-2">{errors.organization}</p>
                    )}
                  </div>

                  {/* Field 3: Work Email */}
                  <div>
                    <div className={`relative flex items-center rounded-2xl border bg-[#F8FAFC]/80 px-3.5 py-2.5 transition-all ${errors.email ? 'border-red-400 focus-within:ring-2 focus-within:ring-red-200' : 'border-[#E2E8F0] focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/15'}`}>
                      <Mail className="w-4 h-4 text-[#94A3B8] shrink-0 mr-2.5" />
                      <input
                        id="partner-form-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        placeholder="Work Email"
                        className="w-full bg-transparent text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[11px] text-red-500 mt-1 pl-2">{errors.email}</p>
                    )}
                  </div>

                  {/* Field 4: Phone Number */}
                  <div>
                    <div className={`relative flex items-center rounded-2xl border bg-[#F8FAFC]/80 px-3.5 py-2.5 transition-all ${errors.phone ? 'border-red-400 focus-within:ring-2 focus-within:ring-red-200' : 'border-[#E2E8F0] focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/15'}`}>
                      <Phone className="w-4 h-4 text-[#94A3B8] shrink-0 mr-2.5" />
                      <input
                        id="partner-form-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                        }}
                        placeholder="Phone Number"
                        className="w-full bg-transparent text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 mt-1 pl-2">{errors.phone}</p>
                    )}
                  </div>

                  {/* Field 5: Partnership Type Dropdown */}
                  <div>
                    <div className={`relative flex items-center rounded-2xl border bg-[#F8FAFC]/80 px-3.5 py-2.5 transition-all ${errors.partnerType ? 'border-red-400 focus-within:ring-2 focus-within:ring-red-200' : 'border-[#E2E8F0] focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/15'}`}>
                      <Building2 className="w-4 h-4 text-[#94A3B8] shrink-0 mr-2.5" />
                      <select
                        id="partner-form-type"
                        value={formData.partnerType}
                        onChange={(e) => {
                          setFormData({ ...formData, partnerType: e.target.value });
                          if (errors.partnerType) setErrors(prev => ({ ...prev, partnerType: '' }));
                        }}
                        className={`w-full bg-transparent text-sm focus:outline-none appearance-none cursor-pointer ${formData.partnerType ? 'text-[#0F172A]' : 'text-[#94A3B8]'}`}
                      >
                        <option value="" disabled>Select Partnership Type</option>
                        {partnershipOptions.map((opt) => (
                          <option key={opt} value={opt} className="text-[#0F172A] bg-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#94A3B8] shrink-0 pointer-events-none ml-2" />
                    </div>
                    {errors.partnerType && (
                      <p className="text-[11px] text-red-500 mt-1 pl-2">{errors.partnerType}</p>
                    )}
                  </div>

                  {/* Primary CTA Button: Send Partnership Request → */}
                  <div className="pt-2">
                    <button
                      id="partner-form-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-2xl bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_10px_25px_-5px_rgba(29,78,216,0.35)] hover:shadow-[0_15px_30px_-5px_rgba(29,78,216,0.45)] hover:-translate-y-0.5 transition-all cursor-pointer group disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Partnership Request</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                </form>

                {/* Trust Message below button */}
                <div className="text-center pt-1 space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#334155] font-medium">
                    <Lock className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Your information is safe with us.</span>
                  </div>
                  <p className="text-[11px] text-[#64748B] leading-tight max-w-xs mx-auto">
                    Your request will be received by the Synckraft team and used only to explore a potential partnership.
                  </p>
                </div>

                {/* Bottom Line with subtle divider */}
                <div className="relative pt-4">
                  <div className="absolute inset-x-0 top-4 flex items-center">
                    <div className="w-full border-t border-[#F1F5F9]" />
                  </div>
                  <div className="relative pt-4 text-center">
                    <p className="text-xs text-[#64748B] font-medium">
                      Let’s build stronger opportunities — together.
                    </p>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </motion.div>

    </div>
  );
};
