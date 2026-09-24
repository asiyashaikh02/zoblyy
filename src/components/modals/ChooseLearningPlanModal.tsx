import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoblyLogo } from '../common/ZoblyLogo';
import { ZoblyRocketIllustration } from '../common/ZoblyRocketIllustration';
import { enrollmentService } from '../../lib/firebase/firestoreService';
import { useAuth } from '../../lib/firebase/authContext';
import {
  X,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Building2,
  Sparkles,
  FolderGit2,
  TrendingUp,
  BookOpen,
  Layers,
  Rocket,
  Award,
  Bot,
  Code2,
  BarChart3,
  Calendar,
  Clock,
  Plus,
  Edit3,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export interface LearningPlanFormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  educationStatus: string;
  collegeOrg: string;
  pathway: string;
  duration: '4-weeks' | '6-weeks' | '8-weeks' | '';
  price: string;
  totalHours: number;
  currentSkills: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | '';
  careerGoals: string[];
  targetSkills: string[];
  additionalGoalDetails: string;
  source: 'pathway_popup' | 'pricing_section' | 'hero' | 'direct' | string;
}

// Pathway normalization helper to ensure consistent ID matching
export const normalizePathwayId = (id: string | null | undefined): string => {
  if (!id) return '';
  const lower = id.toLowerCase().trim();
  if (lower === 'ai-automation' || lower === 'ai-business-automation' || lower.includes('ai') || lower.includes('automation')) {
    return 'ai-automation';
  }
  if (lower === 'software-product' || lower.includes('software') || lower.includes('product')) {
    return 'software-product';
  }
  if (lower === 'data-bi' || lower.includes('data') || lower.includes('bi')) {
    return 'data-bi';
  }
  return id;
};

// Duration normalization helper to ensure exact plan ID matching
export const normalizeDuration = (duration: string | null | undefined): '4-weeks' | '6-weeks' | '8-weeks' | '' => {
  if (!duration) return '';
  const lower = duration.toLowerCase().trim();
  if (lower === '4-weeks' || lower === '4' || lower.includes('4')) return '4-weeks';
  if (lower === '6-weeks' || lower === '6' || lower.includes('6')) return '6-weeks';
  if (lower === '8-weeks' || lower === '8' || lower.includes('8')) return '8-weeks';
  return '';
};

interface ChooseLearningPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPathway?: string | null;
  initialDuration?: '4-weeks' | '6-weeks' | '8-weeks' | null;
  source?: 'pathway_popup' | 'pricing_section' | 'hero' | 'direct' | string;
  onNavigatePage?: (path: string) => void;
}

const AVAILABLE_SKILLS = [
  'Python',
  'JavaScript',
  'PHP',
  'Laravel',
  'React',
  'HTML/CSS',
  'SQL',
  'Excel',
  'Power BI',
  'APIs',
  'Automation',
  'AI Tools',
  'Prompt Engineering',
  'Git/GitHub',
  'Data Analysis',
  'Other'
];

const AVAILABLE_GOALS = [
  'Build Real Projects',
  'Learn AI & Automation',
  'Become Job Ready',
  'Build Software Products',
  'Improve Data Skills',
  'Build a Portfolio',
  'Prepare for Technical Interviews',
  'Start Freelancing',
  'Upskill for Current Career',
  'Explore a New Career Path'
];

const POPULAR_TARGET_SKILLS = [
  'AI Agents',
  'System Design',
  'Advanced SQL',
  'Cloud & Docker',
  'LLM Workflows',
  'Next.js & TypeScript',
  'Executive BI Dashboards',
  'CI/CD Pipelines'
];

const PATHWAYS = [
  {
    id: 'ai-automation',
    title: 'AI & Business Automation',
    desc: 'Build intelligent systems and automate real work.',
    icon: Bot
  },
  {
    id: 'software-product',
    title: 'Software & Product',
    desc: 'Build modern software and real products.',
    icon: Code2
  },
  {
    id: 'data-bi',
    title: 'Data & BI',
    desc: 'Turn data into insights and decisions.',
    icon: BarChart3
  }
];

const PLANS = [
  {
    id: '4-weeks' as const,
    durationLabel: '4 Weeks',
    price: '₹4,999',
    hours: 144,
    hoursLabel: '144 Hours'
  },
  {
    id: '6-weeks' as const,
    durationLabel: '6 Weeks',
    price: '₹6,999',
    hours: 216,
    hoursLabel: '216 Hours'
  },
  {
    id: '8-weeks' as const,
    durationLabel: '8 Weeks',
    price: '₹11,999',
    hours: 288,
    hoursLabel: '288 Hours'
  }
];

export const ChooseLearningPlanModal: React.FC<ChooseLearningPlanModalProps> = ({
  isOpen,
  onClose,
  initialPathway = null,
  initialDuration = null,
  source = 'pricing_section',
  onNavigatePage,
}) => {
  const { user } = useAuth();
  // Step state: 1: Details, 2: Skills, 3: Goals, 4: Review
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [registeredEnrollmentId, setRegisteredEnrollmentId] = useState<string | null>(null);
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [educationStatus, setEducationStatus] = useState('');
  const [collegeOrg, setCollegeOrg] = useState('');
  
  // Pathway & Duration
  const [selectedPathway, setSelectedPathway] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<'4-weeks' | '6-weeks' | '8-weeks' | ''>('');

  // Step 2: Skills
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [skillLevel, setSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | ''>('');
  const [customSkillInput, setCustomSkillInput] = useState('');

  // Step 3: Goals
  const [careerGoals, setCareerGoals] = useState<string[]>([]);
  const [targetSkills, setTargetSkills] = useState<string[]>([]);
  const [customTargetInput, setCustomTargetInput] = useState('');
  const [additionalGoalDetails, setAdditionalGoalDetails] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset & initialize when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSuccess(false);
      setSubmissionError(null);
      setRegisteredEnrollmentId(null);
      setShowConfirmLeave(false);
      setErrors({});

      if (user) {
        if (user.displayName && !fullName) setFullName(user.displayName);
        if (user.email && !email) setEmail(user.email);
      }

      // Set normalized pathway:
      setSelectedPathway(normalizePathwayId(initialPathway));

      // Set normalized duration:
      setSelectedDuration(normalizeDuration(initialDuration));
    }
  }, [isOpen, initialPathway, initialDuration]);

  // Check if form is dirty
  const isDirty = Boolean(
    fullName || email || phone || city || educationStatus ||
    currentSkills.length > 0 || careerGoals.length > 0
  );

  // Attempt Close
  const handleAttemptClose = () => {
    if (isDirty && !isSuccess) {
      setShowConfirmLeave(true);
    } else {
      onClose();
    }
  };

  const handleConfirmLeave = () => {
    setShowConfirmLeave(false);
    onClose();
  };

  // Keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (showConfirmLeave) {
          setShowConfirmLeave(false);
        } else {
          handleAttemptClose();
        }
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
  }, [isOpen, showConfirmLeave, isDirty, isSuccess]);

  // Validation for Step 1
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^[+0-9\s-]{8,16}$/.test(phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!city.trim()) {
      newErrors.city = 'City is required.';
    }

    if (!educationStatus) {
      newErrors.educationStatus = 'Please select your current education status.';
    }

    if (!selectedPathway) {
      newErrors.pathway = 'Please select a pathway of interest.';
    }

    if (!selectedDuration) {
      newErrors.duration = 'Please select an investment plan duration.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Step 2
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!skillLevel) {
      newErrors.skillLevel = 'Please select your current skill level.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Step 3
  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (careerGoals.length === 0) {
      newErrors.careerGoals = 'Please select at least one goal.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 1 -> Step 2
  const handleNextToSkills = () => {
    if (validateStep1()) {
      setErrors({});
      setStep(2);
    }
  };

  // Step 2 -> Step 3
  const handleNextToGoals = () => {
    if (validateStep2()) {
      setErrors({});
      setStep(3);
    }
  };

  // Step 3 -> Step 4
  const handleNextToReview = () => {
    if (validateStep3()) {
      setErrors({});
      setStep(4);
    }
  };

  // Toggle skill
  const toggleSkill = (skill: string) => {
    setCurrentSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Toggle goal
  const toggleGoal = (goal: string) => {
    setCareerGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
    if (errors.careerGoals) {
      setErrors((prev) => ({ ...prev, careerGoals: '' }));
    }
  };

  // Toggle target skill
  const toggleTargetSkill = (skill: string) => {
    setTargetSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Add custom target skill
  const handleAddCustomTargetSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    if (customTargetInput.trim()) {
      if (!targetSkills.includes(customTargetInput.trim())) {
        setTargetSkills((prev) => [...prev, customTargetInput.trim()]);
      }
      setCustomTargetInput('');
    }
  };

  // Final Submit to Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double-submissions
    setIsSubmitting(true);
    setSubmissionError(null);

    const selectedPlanObj = PLANS.find((p) => p.id === selectedDuration);
    const selectedPathwayObj = PATHWAYS.find((p) => p.id === selectedPathway);
    const pathwayName = selectedPathwayObj?.title || selectedPathway || 'AI & Business Automation';
    const programDuration = selectedPlanObj?.durationLabel || (selectedDuration ? `${selectedDuration.replace('-weeks', '')} Weeks` : '6 Weeks');

    try {
      const studentUid = user?.uid || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      const newId = await enrollmentService.createEnrollment({
        studentId: studentUid,
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim(),
        educationStatus,
        college: collegeOrg.trim(),
        pathway: pathwayName,
        program: programDuration,
        duration: selectedDuration || '6-weeks',
        price: selectedPlanObj?.price || '',
        totalHours: selectedPlanObj?.hours || 0,
        skills: currentSkills,
        skillLevel: skillLevel || 'Beginner',
        goals: careerGoals,
        targetSkills,
        additionalGoal: additionalGoalDetails.trim(),
        source,
        interestedCourse: `${pathwayName} (${programDuration})`,
        status: 'NEW',
        adminNotes: '',
      });

      setRegisteredEnrollmentId(newId);
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Failed to submit enrollment to Firestore:', err);
      setSubmissionError(
        err?.message || 'Unable to submit your registration. Please check your internet connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPathwayObj = PATHWAYS.find((p) => p.id === selectedPathway);
  const selectedPlanObj = PLANS.find((p) => p.id === selectedDuration);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="choose-plan-modal-title"
        >
      {/* Dark translucent overlay with subtle backdrop blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={handleAttemptClose}
        className="fixed inset-0 bg-[#0B192C]/40 backdrop-blur-md cursor-pointer"
        aria-hidden="true"
      />

      {/* Main Centered Floating Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${isSuccess ? 'max-w-lg' : 'max-w-[1120px]'} max-h-[90vh] bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_30px_90px_-20px_rgba(37,99,235,0.25),0_15px_35px_-10px_rgba(15,23,42,0.15)] border border-[#BFDBFE]/70 z-10 flex flex-col ${isSuccess ? '' : 'lg:flex-row'} overflow-hidden transition-all duration-300`}
      >
        
        {/* =========================================================================
            LEFT PANEL: Informational Brand & Abstract Visual (approx 38-40%)
            ========================================================================= */}
        {!isSuccess && (
          <div className="hidden md:flex md:w-[38%] bg-gradient-to-b from-[#F0F7FF] via-[#EBF4FE] to-[#DFEDFE] p-5 sm:p-7 lg:p-10 flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#DBEAFE] relative overflow-hidden shrink-0">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#BFDBFE]/40 rounded-full blur-3xl pointer-events-none -translate-x-12 -translate-y-12" />
          
          {/* Top Brand & Narrative Header */}
          <div className="relative z-10 space-y-4 sm:space-y-5">
            {/* Logo */}
            <div className="flex items-center">
              <ZoblyLogo className="h-8 sm:h-9 w-auto" id="plan-modal-logo" />
            </div>

            {/* Eyebrow */}
            <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#2563EB] uppercase">
              LEARN &nbsp; BUILD &nbsp; SHIP &nbsp; PROVE
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
              Let’s Build<br />
              Your Learning<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#4F46E5]">
                Plan.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-sm">
              Tell us where you’re starting from. We’ll help you choose the right path for your goals, skills and future opportunities.
            </p>

            {/* 3 Compact Benefit Items */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#BFDBFE]/60 shadow-2xs text-center flex flex-col items-center">
                <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-1.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-[#0F172A] leading-tight">
                  Hands-on
                </div>
                <div className="text-[9px] text-[#64748B] leading-tight mt-0.5">
                  Learning
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#BFDBFE]/60 shadow-2xs text-center flex flex-col items-center">
                <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-1.5">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-[#0F172A] leading-tight">
                  Real Projects
                </div>
                <div className="text-[9px] text-[#64748B] leading-tight mt-0.5">
                  &amp; Proof
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#BFDBFE]/60 shadow-2xs text-center flex flex-col items-center">
                <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-1.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-[#0F172A] leading-tight">
                  Career
                </div>
                <div className="text-[9px] text-[#64748B] leading-tight mt-0.5">
                  Ready Skills
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Abstract Visual: Slanted Layered Glass Steps representing Learn -> Build -> Ship -> Prove */}
          <div className="relative z-10 pt-6 mt-6 hidden sm:block">
            <div className="relative p-4 rounded-3xl bg-white/40 border border-white/60 backdrop-blur-sm space-y-2">
              
              {/* Step 1: Learn */}
              <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/80 border border-white shadow-2xs transform -translate-x-1 hover:translate-x-0 transition-transform">
                <div className="w-6 h-6 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-[#0F172A] italic">Learn</span>
              </div>

              {/* Step 2: Build */}
              <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/80 border border-white shadow-2xs transform translate-x-2 hover:translate-x-3 transition-transform">
                <div className="w-6 h-6 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-[#0F172A] italic">Build</span>
              </div>

              {/* Step 3: Ship */}
              <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/80 border border-white shadow-2xs transform translate-x-5 hover:translate-x-6 transition-transform">
                <div className="w-6 h-6 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Rocket className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-[#0F172A] italic">Ship</span>
              </div>

              {/* Step 4: Prove */}
              <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/90 border border-[#BFDBFE] shadow-sm transform translate-x-8 hover:translate-x-9 transition-transform">
                <div className="w-6 h-6 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-extrabold text-[#2563EB] italic">Prove</span>
              </div>

              {/* Elegant script microcopy with arrow */}
              <div className="pt-2 text-right">
                <span className="text-[11px] font-medium text-[#2563EB] tracking-tight">
                  Skills to a Brighter Future. ↗
                </span>
              </div>
            </div>
          </div>

        </div>
        )}

        {/* =========================================================================
            RIGHT / MAIN PANEL: Multi-step Form or IMAGE 2 Success Screen
            ========================================================================= */}
        <div className={`w-full ${isSuccess ? 'w-full' : 'lg:w-[62%]'} p-5 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto max-h-[90vh] relative bg-white`}>
          
          {/* Top Header: Eyebrow + Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
              {isSuccess ? 'ENROLLMENT CONFIRMATION' : 'YOUR LEARNING JOURNEY'}
            </div>

            <button
              id="btn-close-learning-plan-modal"
              onClick={handleAttemptClose}
              className="p-2 rounded-full text-[#64748B] hover:text-[#0F172A] hover:bg-[#F0F7FF] transition-colors cursor-pointer"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* If Success Screen (IMAGE 2 REFERENCE) */}
          {isSuccess ? (
            <div className="py-4 sm:py-6 px-2 sm:px-4 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300 relative w-full max-w-md mx-auto">
              {/* Top-left script text */}
              <div className="text-left font-serif italic text-xs sm:text-sm text-[#475569] leading-tight select-none">
                Small<br />
                Steps<br />
                <span className="font-bold text-[#2563EB]">Big</span><br />
                Futures<br />
                <span className="inline-block w-4 h-0.5 bg-[#64748B] mt-1" />
              </div>

              {/* Centered Rocket Illustration */}
              <div className="flex justify-center -mt-6 sm:-mt-8">
                <ZoblyRocketIllustration className="w-48 sm:w-56 h-48 sm:h-56" />
              </div>

              {/* Headline & Subtitle */}
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  You&apos;re on <span className="text-[#2563EB]">your way!</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#475569]">
                  Your dream career starts with one small step.
                </p>
              </div>

              {/* Checklist matching reference Image 2 */}
              <div className="max-w-xs sm:max-w-sm mx-auto text-left space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#0F172A]">
                  <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>Account details received</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#0F172A]">
                  <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>Registration received</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#0F172A]">
                  <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>Our team will onboard you shortly</span>
                </div>
              </div>

              {/* Light-blue Callout Card matching Image 2 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-start gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-white text-[#2563EB] shadow-xs flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-bold text-[#1E3A8A]">
                    Our team will onboard you shortly
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#3B82F6] leading-relaxed">
                    We are tailoring your pathway curriculum and matching you with an advisor.
                  </div>
                </div>
              </div>

              {/* Primary Action Button: Continue to Login */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  id="btn-success-continue-login"
                  onClick={() => {
                    onClose();
                    if (onNavigatePage) {
                      onNavigatePage('/login');
                    }
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue to Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          ) : (
            <div className="py-4 space-y-6">
              
              {/* ===================================================================
                  STEP INDICATOR: ① Details ─── ② Skills ─── ③ Goals ─── ④ Submit
                  =================================================================== */}
              <div className="relative py-2">
                <div className="flex items-center justify-between max-w-md mx-auto">
                  
                  {/* Step 1 */}
                  <div 
                    onClick={() => setStep(1)}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === 1 
                        ? 'bg-[#2563EB] text-white shadow-md ring-4 ring-[#DBEAFE]' 
                        : step > 1 
                        ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]' 
                        : 'bg-[#F1F5F9] text-[#94A3B8]'
                    }`}>
                      {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                    </div>
                    <span className={`text-[11px] font-bold mt-1.5 ${
                      step === 1 ? 'text-[#2563EB]' : 'text-[#64748B]'
                    }`}>
                      Details
                    </span>
                  </div>

                  <div className={`flex-1 h-0.5 mx-2 transition-colors ${
                    step >= 2 ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'
                  }`} />

                  {/* Step 2 */}
                  <div 
                    onClick={() => {
                      if (validateStep1()) setStep(2);
                    }}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === 2 
                        ? 'bg-[#2563EB] text-white shadow-md ring-4 ring-[#DBEAFE]' 
                        : step > 2 
                        ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]' 
                        : 'bg-[#F1F5F9] text-[#94A3B8]'
                    }`}>
                      {step > 2 ? <Check className="w-4 h-4" /> : '2'}
                    </div>
                    <span className={`text-[11px] font-bold mt-1.5 ${
                      step === 2 ? 'text-[#2563EB]' : 'text-[#64748B]'
                    }`}>
                      Skills
                    </span>
                  </div>

                  <div className={`flex-1 h-0.5 mx-2 transition-colors ${
                    step >= 3 ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'
                  }`} />

                  {/* Step 3 */}
                  <div 
                    onClick={() => {
                      if (validateStep1() && validateStep2()) setStep(3);
                    }}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === 3 
                        ? 'bg-[#2563EB] text-white shadow-md ring-4 ring-[#DBEAFE]' 
                        : step > 3 
                        ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]' 
                        : 'bg-[#F1F5F9] text-[#94A3B8]'
                    }`}>
                      {step > 3 ? <Check className="w-4 h-4" /> : '3'}
                    </div>
                    <span className={`text-[11px] font-bold mt-1.5 ${
                      step === 3 ? 'text-[#2563EB]' : 'text-[#64748B]'
                    }`}>
                      Goals
                    </span>
                  </div>

                  <div className={`flex-1 h-0.5 mx-2 transition-colors ${
                    step >= 4 ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'
                  }`} />

                  {/* Step 4 */}
                  <div 
                    onClick={() => {
                      if (validateStep1() && validateStep2() && validateStep3()) setStep(4);
                    }}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === 4 
                        ? 'bg-[#2563EB] text-white shadow-md ring-4 ring-[#DBEAFE]' 
                        : 'bg-[#F1F5F9] text-[#94A3B8]'
                    }`}>
                      4
                    </div>
                    <span className={`text-[11px] font-bold mt-1.5 ${
                      step === 4 ? 'text-[#2563EB]' : 'text-[#64748B]'
                    }`}>
                      Submit
                    </span>
                  </div>

                </div>
              </div>

              {/* ===================================================================
                  STEP 1: BASIC DETAILS, PATHWAY & DURATION SELECTION
                  =================================================================== */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  
                  <div>
                    <h2 
                      id="choose-plan-modal-title"
                      className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight"
                    >
                      Basic Details
                    </h2>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                      Let’s start with some basic information.
                    </p>
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors({ ...errors, fullName: '' });
                          }}
                          placeholder="Enter your full name"
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 ${
                            errors.fullName ? 'border-red-400 focus:ring-red-300' : 'border-[#CBD5E1] focus:ring-[#2563EB]'
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: '' });
                          }}
                          placeholder="you@example.com"
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 ${
                            errors.email ? 'border-red-400 focus:ring-red-300' : 'border-[#CBD5E1] focus:ring-[#2563EB]'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors({ ...errors, phone: '' });
                          }}
                          placeholder="+91 98765 43210"
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 ${
                            errors.phone ? 'border-red-400 focus:ring-red-300' : 'border-[#CBD5E1] focus:ring-[#2563EB]'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            if (errors.city) setErrors({ ...errors, city: '' });
                          }}
                          placeholder="Your city"
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 ${
                            errors.city ? 'border-red-400 focus:ring-red-300' : 'border-[#CBD5E1] focus:ring-[#2563EB]'
                          }`}
                        />
                      </div>
                      {errors.city && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.city}
                        </p>
                      )}
                    </div>

                    {/* Current Education Status */}
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Current Education Status <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        <select
                          value={educationStatus}
                          onChange={(e) => {
                            setEducationStatus(e.target.value);
                            if (errors.educationStatus) setErrors({ ...errors, educationStatus: '' });
                          }}
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 ${
                            errors.educationStatus ? 'border-red-400 focus:ring-red-300' : 'border-[#CBD5E1] focus:ring-[#2563EB]'
                          }`}
                        >
                          <option value="">Select an option</option>
                          <option value="College Student">College Student</option>
                          <option value="Recent Graduate">Recent Graduate</option>
                          <option value="Working Professional">Working Professional</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      {errors.educationStatus && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.educationStatus}
                        </p>
                      )}
                    </div>

                    {/* College / Organization */}
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        College / Organization <span className="text-xs text-[#94A3B8] font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        <input
                          type="text"
                          value={collegeOrg}
                          onChange={(e) => setCollegeOrg(e.target.value)}
                          placeholder="Enter college / organization"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        />
                      </div>
                    </div>

                  </div>

                  {/* ===============================================================
                      PATHWAY SELECTION (3 SELECTABLE CARDS)
                      =============================================================== */}
                  <div className="pt-2 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs sm:text-sm font-bold text-[#0F172A]">
                        Which pathway are you interested in? <span className="text-red-500">*</span>
                      </label>
                      {errors.pathway && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.pathway}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PATHWAYS.map((p) => {
                        const Icon = p.icon;
                        const isSelected = selectedPathway === p.id;
                        return (
                          <div
                            key={p.id}
                            onClick={() => {
                              setSelectedPathway(p.id);
                              if (errors.pathway) setErrors({ ...errors, pathway: '' });
                            }}
                            className={`relative p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between text-left ${
                              isSelected
                                ? 'bg-[#EFF6FF] border-[#2563EB] shadow-xs ring-2 ring-[#2563EB]/20'
                                : 'bg-white hover:bg-[#F8FAFC] border-[#E2E8F0]'
                            }`}
                          >
                            {/* Checkmark in top-right */}
                            {isSelected && (
                              <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </div>
                            )}

                            <div>
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 ${
                                isSelected ? 'bg-[#2563EB] text-white' : 'bg-[#EFF6FF] text-[#2563EB]'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-snug">
                                {p.title}
                              </h4>
                              <p className="text-[11px] text-[#64748B] mt-1 leading-normal">
                                {p.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ===============================================================
                      DURATION / PLAN SELECTION (3 SELECTABLE CARDS)
                      =============================================================== */}
                  <div className="pt-2 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs sm:text-sm font-bold text-[#0F172A]">
                        How much time do you want to invest? <span className="text-red-500">*</span>
                      </label>
                      {errors.duration && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.duration}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PLANS.map((plan) => {
                        const isSelected = selectedDuration === plan.id;
                        return (
                          <div
                            key={plan.id}
                            onClick={() => {
                              setSelectedDuration(plan.id);
                              if (errors.duration) setErrors({ ...errors, duration: '' });
                            }}
                            className={`relative p-3.5 rounded-2xl border transition-all cursor-pointer text-center flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#EFF6FF] border-[#2563EB] shadow-xs ring-2 ring-[#2563EB]/20'
                                : 'bg-white hover:bg-[#F8FAFC] border-[#E2E8F0]'
                            }`}
                          >
                            {/* Checkmark in top-right */}
                            {isSelected && (
                              <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </div>
                            )}

                            <div>
                              <div className="text-xs font-bold text-[#0F172A]">
                                {plan.durationLabel}
                              </div>
                              <div className="text-xl sm:text-2xl font-black text-[#2563EB] my-1">
                                {plan.price}
                              </div>
                              <div className="text-[11px] font-medium text-[#64748B]">
                                {plan.hoursLabel}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Informational schedule row */}
                    <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#64748B] font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Monday – Saturday | 11:00 AM – 5:00 PM</span>
                    </div>
                  </div>

                  {/* Step 1 Bottom CTA */}
                  <div className="pt-4 border-t border-[#F1F5F9]">
                    <button
                      type="button"
                      id="btn-step1-next"
                      onClick={handleNextToSkills}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Next: Your Skills</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

              {/* ===================================================================
                  STEP 2: CURRENT SKILLS & SKILL LEVEL
                  =================================================================== */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                      Tell us about your current skills
                    </h2>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                      Select the skills you already have experience with.
                    </p>
                  </div>

                  {/* Selectable Skill Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {AVAILABLE_SKILLS.map((skill) => {
                      const isSelected = currentSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-2xs'
                              : 'bg-white hover:bg-[#F8FAFC] text-[#334155] border-[#E2E8F0]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          <span>{skill}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Skill Level Selection */}
                  <div className="pt-4 space-y-2.5 border-t border-[#F1F5F9]">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs sm:text-sm font-bold text-[#0F172A]">
                        How would you describe your current skill level? <span className="text-red-500">*</span>
                      </label>
                      {errors.skillLevel && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.skillLevel}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => {
                        const isSelected = skillLevel === lvl;
                        return (
                          <div
                            key={lvl}
                            onClick={() => {
                              setSkillLevel(lvl);
                              if (errors.skillLevel) setErrors({ ...errors, skillLevel: '' });
                            }}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${
                              isSelected
                                ? 'bg-[#EFF6FF] border-[#2563EB] shadow-xs ring-2 ring-[#2563EB]/20'
                                : 'bg-white hover:bg-[#F8FAFC] border-[#E2E8F0]'
                            }`}
                          >
                            <div className="text-xs font-bold text-[#0F172A]">
                              {lvl}
                            </div>
                            <div className="text-[10px] text-[#64748B] mt-0.5">
                              {lvl === 'Beginner' && 'Starting fresh or basic basics'}
                              {lvl === 'Intermediate' && 'Some projects or coursework'}
                              {lvl === 'Advanced' && 'Solid code & building systems'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2 Bottom Navigation */}
                  <div className="pt-4 border-t border-[#F1F5F9] flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="py-3 px-5 rounded-xl border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#334155] font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      id="btn-step2-next"
                      onClick={handleNextToGoals}
                      className="flex-1 py-3 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Next: Your Goals</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

              {/* ===================================================================
                  STEP 3: GOALS & TARGET SKILLS
                  =================================================================== */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                      What do you want to achieve?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                      Tell us what you want to build or become better at.
                    </p>
                  </div>

                  {/* Goals Checkbox Cards */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-[#334155]">
                        Select your goals (Multiple choices allowed) <span className="text-red-500">*</span>
                      </label>
                      {errors.careerGoals && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.careerGoals}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {AVAILABLE_GOALS.map((goal) => {
                        const isSelected = careerGoals.includes(goal);
                        return (
                          <div
                            key={goal}
                            onClick={() => toggleGoal(goal)}
                            className={`p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center gap-2.5 ${
                              isSelected
                                ? 'bg-[#EFF6FF] border-[#2563EB] text-[#1E3A8A] font-semibold shadow-2xs'
                                : 'bg-white hover:bg-[#F8FAFC] border-[#E2E8F0] text-[#334155]'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                              isSelected ? 'bg-[#2563EB] border-[#2563EB] text-white' : 'border-[#CBD5E1] bg-white'
                            }`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span>{goal}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Target Skills */}
                  <div className="pt-2 space-y-2">
                    <label className="block text-xs font-semibold text-[#334155]">
                      Target Skills you are keen to learn (Optional)
                    </label>

                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_TARGET_SKILLS.map((tsk) => {
                        const isSelected = targetSkills.includes(tsk);
                        return (
                          <button
                            key={tsk}
                            type="button"
                            onClick={() => toggleTargetSkill(tsk)}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#2563EB] text-white border-[#2563EB]'
                                : 'bg-white hover:bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]'
                            }`}
                          >
                            + {tsk}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom skill input */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={customTargetInput}
                        onChange={(e) => setCustomTargetInput(e.target.value)}
                        onKeyDown={handleAddCustomTargetSkill}
                        placeholder="Add specific target skill (e.g. FastAPI, LangChain)..."
                        className="flex-1 px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomTargetSkill}
                        className="px-3 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                  {/* Additional Goal Details Textarea */}
                  <div className="pt-2 space-y-1">
                    <label className="block text-xs font-semibold text-[#334155]">
                      Tell us anything else about your goal <span className="text-xs text-[#94A3B8] font-normal">(Optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      value={additionalGoalDetails}
                      onChange={(e) => setAdditionalGoalDetails(e.target.value)}
                      placeholder="e.g., Transitioning from non-tech background, preparing for upcoming campus placement in 3 months..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
                    />
                  </div>

                  {/* Step 3 Bottom Navigation */}
                  <div className="pt-4 border-t border-[#F1F5F9] flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="py-3 px-5 rounded-xl border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#334155] font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      id="btn-step3-next"
                      onClick={handleNextToReview}
                      className="flex-1 py-3 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Review &amp; Submit</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

              {/* ===================================================================
                  STEP 4: REVIEW & SUBMIT
                  =================================================================== */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-200">
                  
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                      Review Your Learning Plan
                    </h2>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                      Please verify your details before submitting.
                    </p>
                  </div>

                  {/* Summary Card 1: Personal Details */}
                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                      <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">
                        Personal Details
                      </span>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[#64748B]">Name:</span> <strong className="text-[#0F172A]">{fullName}</strong>
                      </div>
                      <div>
                        <span className="text-[#64748B]">Email:</span> <strong className="text-[#0F172A]">{email}</strong>
                      </div>
                      <div>
                        <span className="text-[#64748B]">Phone:</span> <strong className="text-[#0F172A]">{phone}</strong>
                      </div>
                      <div>
                        <span className="text-[#64748B]">City:</span> <strong className="text-[#0F172A]">{city}</strong>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#64748B]">Education:</span> <strong className="text-[#0F172A]">{educationStatus} {collegeOrg && `• ${collegeOrg}`}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Summary Card 2: Selected Pathway & Plan */}
                  <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-[#DBEAFE]">
                      <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wide">
                        Selected Pathway &amp; Plan
                      </span>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <div className="font-bold text-sm text-[#0F172A]">
                          {selectedPathwayObj?.title}
                        </div>
                        <div className="text-[#475569] text-[11px]">
                          {selectedPathwayObj?.desc}
                        </div>
                      </div>

                      <div className="text-left sm:text-right bg-white px-3 py-1.5 rounded-xl border border-[#BFDBFE] shrink-0">
                        <div className="font-black text-sm text-[#2563EB]">
                          {selectedPlanObj?.durationLabel} ({selectedPlanObj?.price})
                        </div>
                        <div className="text-[10px] text-[#64748B]">
                          {selectedPlanObj?.hoursLabel} • Mon-Sat 11am-5pm
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Card 3: Skills & Goals */}
                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                      <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">
                        Skills &amp; Goals
                      </span>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div>
                        <span className="text-[#64748B]">Current Level:</span> <strong className="text-[#0F172A]">{skillLevel || 'Beginner'}</strong>
                      </div>
                      {currentSkills.length > 0 && (
                        <div>
                          <span className="text-[#64748B]">Experience:</span>{' '}
                          <span className="text-[#334155]">{currentSkills.join(', ')}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-[#64748B]">Selected Goals:</span>{' '}
                        <span className="text-[#334155]">{careerGoals.join(', ')}</span>
                      </div>
                      {targetSkills.length > 0 && (
                        <div>
                          <span className="text-[#64748B]">Target Skills:</span>{' '}
                          <span className="text-[#334155]">{targetSkills.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission Error Banner */}
                  {submissionError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-bold text-red-800">Registration Submission Failed</div>
                        <div className="text-[11px] text-red-600 mt-0.5">{submissionError}</div>
                      </div>
                    </div>
                  )}

                  {/* Trust note */}
                  <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2.5 text-xs text-[#166534]">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Your registration will be securely submitted to the Zobly admissions team.</span>
                  </div>

                  {/* Step 4 Submission CTA */}
                  <div className="pt-4 border-t border-[#F1F5F9] flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={isSubmitting}
                      className="py-3 px-5 rounded-xl border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#334155] font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      id="btn-submit-learning-plan"
                      className="flex-1 py-3.5 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-[#2563EB] disabled:hover:shadow-md text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin shrink-0 text-white" />
                          <span>Submitting Registration...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Registration</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          )}

        </div>

      </motion.div>

      {/* =========================================================================
          CONFIRM LEAVE POPUP (If user has entered data and attempts to dismiss)
          ========================================================================= */}
      {showConfirmLeave && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={() => setShowConfirmLeave(false)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-[#E2E8F0] space-y-4"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#0F172A]">
                Leave this form?
              </h4>
              <p className="text-xs text-[#64748B] mt-1">
                Your entered details will be lost if you leave without submitting.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmLeave(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer"
              >
                Continue Editing
              </button>
              <button
                type="button"
                onClick={handleConfirmLeave}
                className="py-2.5 px-4 rounded-xl border border-[#CBD5E1] text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

        </div>
      )}
    </AnimatePresence>
  );
};
