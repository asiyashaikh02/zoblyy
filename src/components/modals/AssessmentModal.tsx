import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoblyLogo } from '../common/ZoblyLogo';
import {
  X,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Zap,
  Target,
  BarChart3,
  Bot,
  Code2,
  Monitor,
  Lightbulb,
  Workflow,
  Sparkles,
  TrendingUp,
  Briefcase,
  Layers,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import {
  ASSESSMENT_QUESTIONS,
  ASSESSMENT_STAGES,
  RECOMMENDATIONS_BY_PATHWAY,
  AssessmentOption
} from '../../data/assessmentQuestions';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTrackId?: string;
  onExplorePathway?: (pathwayId: string) => void;
  onExploreCurriculum?: (pathwayId: string) => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  defaultTrackId = 'ai-automation',
  onExplorePathway,
  onExploreCurriculum,
}) => {
  // Step flow: 'gate' (Name & Email) -> 'question' (1..15) -> 'analyzing' -> 'result'
  const [currentStep, setCurrentStep] = useState<'gate' | 'question' | 'analyzing' | 'result'>('gate');
  const [questionIndex, setQuestionIndex] = useState<number>(0); // 0 to 14

  // User details
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gateErrors, setGateErrors] = useState<{ fullName?: string; email?: string }>({});

  // Answers map: { [questionId: number]: 'a' | 'b' | 'c' | 'd' }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'a' | 'b' | 'c' | 'd'>>({});

  // Analysis screen animated check states
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);

  // Computed recommendation
  const [recommendedPathwayId, setRecommendedPathwayId] = useState<'ai-automation' | 'software-product' | 'data-bi'>('ai-automation');

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep('gate');
      setQuestionIndex(0);
      setSelectedAnswers({});
      setAnalysisProgress(0);
      setGateErrors({});
    }
  }, [isOpen]);

  // Keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
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

  // Handle Analysis transition (2.4s timer with stepped checklist)
  useEffect(() => {
    if (currentStep === 'analyzing') {
      const timer1 = setTimeout(() => setAnalysisProgress(1), 500);
      const timer2 = setTimeout(() => setAnalysisProgress(2), 1100);
      const timer3 = setTimeout(() => setAnalysisProgress(3), 1700);
      const timer4 = setTimeout(() => setAnalysisProgress(4), 2200);
      const timerFinal = setTimeout(() => {
        setCurrentStep('result');
      }, 2600);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timerFinal);
      };
    }
  }, [currentStep]);

  if (!isOpen) return null;

  // Gate validation
  const handleStartAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { fullName?: string; email?: string } = {};

    if (!fullName.trim()) {
      errors.fullName = 'Please enter your full name.';
    } else if (fullName.trim().length < 2) {
      errors.fullName = 'Name must be at least 2 characters.';
    }

    if (!email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(errors).length > 0) {
      setGateErrors(errors);
      return;
    }

    setGateErrors({});
    setCurrentStep('question');
    setQuestionIndex(0);
  };

  const currentQuestion = ASSESSMENT_QUESTIONS[questionIndex];
  const currentStageInfo = ASSESSMENT_STAGES[currentQuestion?.stageIndex || 0];
  const currentSelectedOptionId = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;

  // Selecting an answer option
  const handleSelectOption = (optionId: 'a' | 'b' | 'c' | 'd') => {
    if (!currentQuestion) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  // Navigating to Next Question
  const handleNextQuestion = () => {
    if (!currentSelectedOptionId) return;

    if (questionIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate final scores
      let aiScore = 0;
      let softwareScore = 0;
      let dataScore = 0;

      ASSESSMENT_QUESTIONS.forEach((q) => {
        const chosenOptionId = selectedAnswers[q.id];
        if (chosenOptionId) {
          const opt = q.options.find((o) => o.id === chosenOptionId);
          if (opt) {
            aiScore += opt.scores.ai;
            softwareScore += opt.scores.software;
            dataScore += opt.scores.data;
          }
        }
      });

      // Determine highest scoring pathway
      let highest: 'ai-automation' | 'software-product' | 'data-bi' = 'ai-automation';
      let maxScore = aiScore;

      if (softwareScore > maxScore) {
        highest = 'software-product';
        maxScore = softwareScore;
      }
      if (dataScore > maxScore) {
        highest = 'data-bi';
        maxScore = dataScore;
      }

      setRecommendedPathwayId(highest);
      setCurrentStep('analyzing');
    }
  };

  // Navigating to Previous Question
  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    }
  };

  // Reset & Retake
  const handleRetake = () => {
    setSelectedAnswers({});
    setQuestionIndex(0);
    setCurrentStep('question');
  };

  // Helper to render relevant option icon
  const renderOptionIcon = (type: AssessmentOption['iconType']) => {
    switch (type) {
      case 'ai':
        return <Bot className="w-4 h-4 text-[#2563EB]" />;
      case 'software':
        return <Code2 className="w-4 h-4 text-[#2563EB]" />;
      case 'monitor':
        return <Monitor className="w-4 h-4 text-[#2563EB]" />;
      case 'data':
        return <BarChart3 className="w-4 h-4 text-[#2563EB]" />;
      case 'trend':
        return <TrendingUp className="w-4 h-4 text-[#2563EB]" />;
      case 'process':
        return <Workflow className="w-4 h-4 text-[#2563EB]" />;
      case 'experiment':
        return <Sparkles className="w-4 h-4 text-[#2563EB]" />;
      case 'lightbulb':
      default:
        return <Lightbulb className="w-4 h-4 text-[#2563EB]" />;
    }
  };

  const recommendation = RECOMMENDATIONS_BY_PATHWAY[recommendedPathwayId] || RECOMMENDATIONS_BY_PATHWAY['ai-automation'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="career-assessment-title"
    >
      {/* Dark translucent overlay with subtle backdrop blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
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
        className="relative w-full max-w-[1140px] max-h-[92vh] bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_30px_90px_-20px_rgba(37,99,235,0.25),0_15px_35px_-10px_rgba(15,23,42,0.15)] border border-[#BFDBFE]/70 z-10 flex flex-col lg:flex-row overflow-hidden"
      >
        {/* =========================================================================
            LEFT PANEL: Informational Brand & Abstract Pathway Visual (~34%)
            ========================================================================= */}
        <div className="hidden md:flex lg:w-[34%] bg-gradient-to-b from-[#F0F7FF] via-[#EBF4FE] to-[#DFEDFE] p-5 sm:p-7 lg:p-10 flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#DBEAFE] relative overflow-hidden shrink-0">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#BFDBFE]/40 rounded-full blur-3xl pointer-events-none -translate-x-12 -translate-y-12" />

          {/* Top Brand & Narrative Header */}
          <div className="relative z-10 space-y-4 sm:space-y-5">
            {/* Logo */}
            <div className="flex items-center">
              <ZoblyLogo className="h-8 sm:h-9 w-auto" id="assessment-modal-logo" />
            </div>

            {/* Eyebrow */}
            <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#2563EB] uppercase">
              EXPLORE &nbsp; LEARN &nbsp; BUILD &nbsp; GROW
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
              Find Your<br />
              Best{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#4F46E5]">
                Path.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Answer 15 simple, real-world questions. We’ll understand your interests, strengths and learning style to recommend the right pathway for you.
            </p>

            {/* 3 Compact Benefit Cards */}
            <div className="space-y-2.5 pt-2">
              <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#BFDBFE]/60 shadow-2xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A] leading-tight">
                    Real-world scenarios
                  </div>
                  <div className="text-[10px] text-[#64748B] leading-tight mt-0.5">
                    Not theory. Actual situations.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#BFDBFE]/60 shadow-2xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A] leading-tight">
                    Personalized recommendation
                  </div>
                  <div className="text-[10px] text-[#64748B] leading-tight mt-0.5">
                    Based on your unique responses.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#BFDBFE]/60 shadow-2xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A] leading-tight">
                    A clearer future
                  </div>
                  <div className="text-[10px] text-[#64748B] leading-tight mt-0.5">
                    Choose a path that truly fits you.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Abstract Pathway Visual: 3 Slanted Floating Cards with script microcopy */}
          <div className="relative z-10 pt-6 mt-6 hidden sm:block">
            <div className="relative p-4 rounded-3xl bg-white/40 border border-white/60 backdrop-blur-sm space-y-2">
              
              {/* Card 1: AI & Automation */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/85 border border-white shadow-2xs transform -translate-x-1 hover:translate-x-0 transition-transform">
                <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#0F172A]">AI &amp; Automation</span>
              </div>

              {/* Card 2: Software & Product */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/85 border border-white shadow-2xs transform translate-x-3 hover:translate-x-4 transition-transform">
                <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#0F172A]">Software &amp; Product</span>
              </div>

              {/* Card 3: Data & BI */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/85 border border-white shadow-2xs transform translate-x-6 hover:translate-x-7 transition-transform">
                <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#0F172A]">Data &amp; BI</span>
              </div>

              {/* Script microcopy with arrow */}
              <div className="pt-2 text-right">
                <span className="text-[11px] font-medium text-[#2563EB] tracking-tight italic">
                  Different Thinking Styles. Brighter Futures. ↗
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================================
            RIGHT PANEL: Interactive Question Engine (~66%) with internal scroll
            ========================================================================= */}
        <div className="w-full lg:w-[66%] p-5 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto max-h-[92vh] relative bg-white">
          
          {/* Top Header: Eyebrow + Close Button */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
              {currentStep === 'gate' && 'GETTING STARTED'}
              {currentStep === 'question' && 'CAREER DISCOVERY ASSESSMENT'}
              {currentStep === 'analyzing' && 'SYNTHESIZING PATTERNS'}
              {currentStep === 'result' && 'YOUR RECOMMENDATION'}
            </div>

            <button
              id="btn-close-career-assessment-modal"
              onClick={onClose}
              className="p-2 rounded-full text-[#64748B] hover:text-[#0F172A] hover:bg-[#F0F7FF] transition-colors cursor-pointer"
              aria-label="Close assessment"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* =======================================================================
              SCREEN 0: GATE (Collect Full Name & Email Only)
              ======================================================================= */}
          {currentStep === 'gate' && (
            <div className="py-6 sm:py-8 space-y-6 max-w-lg mx-auto w-full animate-in fade-in duration-200">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center mx-auto shadow-xs">
                  <Target className="w-7 h-7" />
                </div>
                <h2 
                  id="career-assessment-title"
                  className="text-2xl font-black text-[#0F172A] tracking-tight"
                >
                  Ready to Discover Your Fit?
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto leading-relaxed">
                  Before we begin the 15 questions, please enter your name and email so we can tailor your results.
                </p>
              </div>

              <form onSubmit={handleStartAssessment} className="space-y-4 pt-2">
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
                        if (gateErrors.fullName) setGateErrors({ ...gateErrors, fullName: '' });
                      }}
                      placeholder="Enter your full name"
                      className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 ${
                        gateErrors.fullName ? 'border-red-400 focus:ring-red-300' : 'border-[#CBD5E1] focus:ring-[#2563EB]'
                      }`}
                    />
                  </div>
                  {gateErrors.fullName && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {gateErrors.fullName}
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
                        if (gateErrors.email) setGateErrors({ ...gateErrors, email: '' });
                      }}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 ${
                        gateErrors.email ? 'border-red-400 focus:ring-red-300' : 'border-[#CBD5E1] focus:ring-[#2563EB]'
                      }`}
                    />
                  </div>
                  {gateErrors.email && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {gateErrors.email}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    id="btn-start-career-assessment"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>START ASSESSMENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[11px] text-center text-[#94A3B8] pt-1">
                  15 short scenario choices • Takes 3–4 minutes • No wrong answers
                </p>
              </form>
            </div>
          )}

          {/* =======================================================================
              SCREEN 1 to 15: THE 15 QUESTIONS
              ======================================================================= */}
          {currentStep === 'question' && currentQuestion && (
            <div className="py-3 space-y-4 sm:space-y-5 animate-in fade-in duration-200">
              
              {/* ===================================================================
                  TOP 5-STAGE TIMELINE
                  =================================================================== */}
              <div className="pt-1">
                <div className="flex items-center justify-between max-w-lg mx-auto">
                  {ASSESSMENT_STAGES.map((stg, idx) => {
                    const isPassed = currentQuestion.stageIndex > stg.index;
                    const isActive = currentQuestion.stageIndex === stg.index;

                    return (
                      <React.Fragment key={stg.index}>
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isActive
                                ? 'bg-[#2563EB] text-white shadow-md ring-4 ring-[#DBEAFE]'
                                : isPassed
                                ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]'
                                : 'bg-[#F1F5F9] text-[#94A3B8]'
                            }`}
                          >
                            {isPassed ? <Check className="w-3.5 h-3.5" /> : stg.index + 1}
                          </div>
                          <span
                            className={`text-[10px] sm:text-[11px] font-bold mt-1.5 hidden sm:block ${
                              isActive ? 'text-[#2563EB]' : 'text-[#64748B]'
                            }`}
                          >
                            {stg.label}
                          </span>
                        </div>

                        {idx < ASSESSMENT_STAGES.length - 1 && (
                          <div
                            className={`flex-1 h-0.5 mx-1.5 sm:mx-2 transition-colors ${
                              currentQuestion.stageIndex > idx ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* ===================================================================
                  PROGRESS CONTEXT BANNER CARD (Light Bulb / Context message)
                  =================================================================== */}
              <div className="bg-[#F0F7FF] border border-[#DBEAFE] rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white text-[#2563EB] border border-[#BFDBFE] flex items-center justify-center shrink-0 shadow-2xs">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight">
                      {currentStageInfo.title}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#475569] leading-tight mt-0.5">
                      {currentStageInfo.contextMessage}
                    </div>
                  </div>
                </div>

                {/* Question badge pill: e.g. "3 of 15" */}
                <div className="px-3 py-1 rounded-full bg-white border border-[#BFDBFE] text-xs font-bold text-[#2563EB] shrink-0 shadow-2xs">
                  {questionIndex + 1} of 15
                </div>
              </div>

              {/* Visual animated thin progress bar */}
              <div className="w-full bg-[#F1F5F9] rounded-full h-1 overflow-hidden">
                <div
                  className="bg-[#2563EB] h-1 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((questionIndex + 1) / 15) * 100}%` }}
                />
              </div>

              {/* ===================================================================
                  QUESTION HEADER & SCENARIO
                  =================================================================== */}
              <div className="space-y-2 pt-1">
                {/* Badges row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE] text-[11px] font-bold uppercase tracking-wide">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{currentQuestion.badge}</span>
                  </div>

                  <span className="text-[11px] font-medium text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full">
                    Choose what feels most like you
                  </span>
                </div>

                {/* Scenario statement in bold */}
                <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-[#0F172A] leading-snug tracking-tight">
                  {currentQuestion.scenario}
                </h3>

                {/* Question line */}
                <p className="text-xs sm:text-sm font-semibold text-[#475569]">
                  {currentQuestion.question}
                </p>
              </div>

              {/* ===================================================================
                  4 SELECTABLE ANSWER CARDS
                  =================================================================== */}
              <div className="space-y-2.5 pt-1">
                {currentQuestion.options.map((option) => {
                  const isSelected = currentSelectedOptionId === option.id;

                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      className={`p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-left ${
                        isSelected
                          ? 'bg-[#EFF6FF] border-[#2563EB] shadow-xs ring-2 ring-[#2563EB]/20'
                          : 'bg-white hover:bg-[#F8FAFC] border-[#E2E8F0]'
                      }`}
                    >
                      {/* Custom Radio / Check Circle */}
                      <div
                        className={`w-5 h-5 rounded-full mt-0.5 flex items-center justify-center shrink-0 transition-colors border ${
                          isSelected
                            ? 'bg-[#2563EB] border-[#2563EB] text-white'
                            : 'bg-white border-[#CBD5E1]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>

                      {/* Option Icon */}
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'bg-[#DBEAFE]' : 'bg-[#F1F5F9]'
                        }`}
                      >
                        {renderOptionIcon(option.iconType)}
                      </div>

                      {/* Text content */}
                      <div className="flex-1">
                        <div className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight">
                          {option.title}
                        </div>
                        <div className="text-[11px] text-[#64748B] leading-tight mt-1 font-normal">
                          {option.supporting}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Nav Bar */}
              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-3">
                {questionIndex > 0 ? (
                  <button
                    type="button"
                    onClick={handlePreviousQuestion}
                    className="py-2.5 px-4 rounded-xl border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#334155] font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {/* Accent microcopy visible on md+ */}
                <div className="hidden sm:block text-[11px] font-medium text-[#64748B] italic">
                  Small Questions. Big Clarity. ↗
                </div>

                <button
                  type="button"
                  id="btn-assessment-next-question"
                  disabled={!currentSelectedOptionId}
                  onClick={handleNextQuestion}
                  className={`py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                    currentSelectedOptionId
                      ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-md hover:shadow-lg'
                      : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                  }`}
                >
                  <span>{questionIndex === 14 ? 'Complete Assessment' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* =======================================================================
              SCREEN 16: ANIMATED ANALYSIS SCREEN
              ======================================================================= */}
          {currentStep === 'analyzing' && (
            <div className="py-12 sm:py-16 space-y-8 max-w-md mx-auto text-center animate-in fade-in duration-300">
              
              <div className="relative w-20 h-20 mx-auto">
                <div className="w-20 h-20 rounded-3xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-9 h-9 animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs animate-ping" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                  Understanding Your Responses
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  We’re looking at your interests, thinking style and preferences to find the pathway that fits you best.
                </p>
              </div>

              {/* Sequential animated checklist */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 text-left">
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      analysisProgress >= 1 ? 'bg-[#059669] text-white' : 'bg-[#E2E8F0] text-[#94A3B8]'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                  <span className={analysisProgress >= 1 ? 'font-bold text-[#0F172A]' : 'text-[#94A3B8]'}>
                    Understanding your interests
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      analysisProgress >= 2 ? 'bg-[#059669] text-white' : 'bg-[#E2E8F0] text-[#94A3B8]'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                  <span className={analysisProgress >= 2 ? 'font-bold text-[#0F172A]' : 'text-[#94A3B8]'}>
                    Analysing your problem-solving style
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      analysisProgress >= 3 ? 'bg-[#059669] text-white' : 'bg-[#E2E8F0] text-[#94A3B8]'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                  <span className={analysisProgress >= 3 ? 'font-bold text-[#0F172A]' : 'text-[#94A3B8]'}>
                    Matching your response patterns
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      analysisProgress >= 4 ? 'bg-[#059669] text-white' : 'bg-[#E2E8F0] text-[#94A3B8]'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                  <span className={analysisProgress >= 4 ? 'font-bold text-[#0F172A]' : 'text-[#94A3B8]'}>
                    Preparing your pathway recommendation
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* =======================================================================
              SCREEN 17: RESULT SCREEN
              ======================================================================= */}
          {currentStep === 'result' && (
            <div className="py-4 space-y-6 animate-in fade-in duration-300">
              
              {/* Header Badge */}
              <div className="text-center space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5" />
                  <span>YOUR RECOMMENDED PATHWAY</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tight">
                  {recommendation.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#64748B] max-w-lg mx-auto leading-relaxed pt-1">
                  {recommendation.explanation}
                </p>
              </div>

              {/* Why this pathway card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                  <span className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wide">
                    WHY THIS PATHWAY?
                  </span>
                  <span className="text-[11px] font-semibold text-[#2563EB]">
                    {fullName ? `Personalized for ${fullName}` : 'Personalized Insights'}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {recommendation.reasons.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]">
                      <div className="w-4 h-4 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    id="btn-assessment-explore-pathway"
                    onClick={() => {
                      if (onExplorePathway) {
                        onExplorePathway(recommendation.id);
                      } else {
                        onClose();
                      }
                    }}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Choose Your Learning Path</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleRetake}
                    className="w-full sm:w-auto py-3.5 px-5 rounded-xl border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake</span>
                  </button>
                </div>

                {onExploreCurriculum && (
                  <button
                    type="button"
                    onClick={() => onExploreCurriculum(recommendation.id)}
                    className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:bg-blue-50/60 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Or explore curriculum & syllabus first</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Mandated ethical disclaimer */}
                <p className="text-[10px] text-center text-[#94A3B8] leading-tight">
                  This assessment is a guidance tool based on your responses and is not a psychological or aptitude diagnosis.
                </p>
              </div>

            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
};
