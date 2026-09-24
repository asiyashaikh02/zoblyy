import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Zap,
  BookOpen,
  Workflow,
  Link2,
  Bot,
  Layers,
  ShieldCheck,
  Settings,
  Box,
  Code2,
  Globe,
  Award,
  Layout,
  Server,
  Cloud,
  Database,
  FileSpreadsheet,
  TrendingUp,
  PieChart,
  BarChart3,
  LucideIcon
} from 'lucide-react';

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export interface ProgressionStep {
  label: string;
  outcome: string;
  icon: LucideIcon;
}

export interface PathwayData {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  badgeLabel: string;
  badgeSub: string;
  badgeIcon: LucideIcon;
  skillsHeaderTag: string;
  categories: SkillCategory[];
  progressionHeaderTag: string;
  progressionSteps: ProgressionStep[];
}

export const PATHWAYS_DATA: Record<string, PathwayData> = {
  'ai-automation': {
    id: 'ai-automation',
    eyebrow: 'EXPLORE PATHWAY',
    title: 'AI & Business Automation',
    subtitle: 'Learn to build intelligent systems that actually work.',
    description: 'From AI fundamentals to automation workflows, agents and production-ready systems — build skills through hands-on work and leave with verifiable proof.',
    badgeLabel: 'Practical Skills',
    badgeSub: 'Real Projects • Career Ready',
    badgeIcon: Zap,
    skillsHeaderTag: 'INDUSTRY RELEVANT. HANDS-ON. FUTURE READY.',
    categories: [
      {
        title: 'Foundations',
        icon: BookOpen,
        skills: ['AI Fundamentals', 'LLM Ecosystem', 'Generative AI', 'Prompting']
      },
      {
        title: 'Workflows',
        icon: Workflow,
        skills: ['AI Workflows', 'AI-assisted Research', 'Productivity Systems', 'Workflow Automation']
      },
      {
        title: 'Integration',
        icon: Link2,
        skills: ['APIs & Webhooks', 'Data Flows', 'No-code / Low-code', 'Third-party Tools']
      },
      {
        title: 'AI Agents',
        icon: Bot,
        skills: ['AI Agents', 'Agent Workflows', 'Tool Calling', 'Context & Memory']
      },
      {
        title: 'Build',
        icon: Layers,
        skills: ['App Architecture', 'Frontend + Backend', 'LLM Integration', 'Database & Authentication']
      },
      {
        title: 'Ship & Prove',
        icon: ShieldCheck,
        skills: ['Deployment', 'Testing & Security', 'Git & GitHub', 'Technical Defense']
      }
    ],
    progressionHeaderTag: 'FROM CONCEPTS TO REAL-WORLD IMPACT',
    progressionSteps: [
      { label: 'Learn', outcome: 'AI Workflow', icon: BookOpen },
      { label: 'Build', outcome: 'Automation System', icon: Settings },
      { label: 'Ship', outcome: 'AI Agent', icon: Bot },
      { label: 'Deploy', outcome: 'Production App', icon: Box },
      { label: 'Prove', outcome: 'GitHub', icon: Code2 },
      { label: 'Launch', outcome: 'Live URL', icon: Globe },
      { label: 'Grow', outcome: 'Technical Defense', icon: Award }
    ]
  },
  'software-product': {
    id: 'software-product',
    eyebrow: 'EXPLORE PATHWAY',
    title: 'Software & Product',
    subtitle: 'Don’t just learn to code. Build software worth showing.',
    description: 'From software engineering fundamentals to modern full-stack architectures, interactive frontend applications, scalable backends, and production deployment — build real software and defend your code.',
    badgeLabel: 'Production Code',
    badgeSub: 'Clean Architecture • Career Ready',
    badgeIcon: Code2,
    skillsHeaderTag: 'ENGINEERING EXCELLENCE. PRODUCT-GRADE ARCHITECTURE.',
    categories: [
      {
        title: 'Software Foundations',
        icon: BookOpen,
        skills: ['Core Data Structures', 'Modern TypeScript & JS', 'Git & Terminal Mastery', 'Clean Code Architecture']
      },
      {
        title: 'Frontend Engineering',
        icon: Layout,
        skills: ['Modern React Ecosystem', 'Responsive Layouts & Tailwind', 'State Management & Hooks', 'Web Performance Optimization']
      },
      {
        title: 'Backend & APIs',
        icon: Server,
        skills: ['REST & GraphQL Architecture', 'Node.js & Server Frameworks', 'Relational Database & ORMs', 'Authentication & Security']
      },
      {
        title: 'Full-Stack Product',
        icon: Layers,
        skills: ['End-to-End System Design', 'Modular Service Architecture', 'Real-time WebSockets', 'Third-Party Integrations']
      },
      {
        title: 'Deployment & Production',
        icon: Cloud,
        skills: ['CI/CD Pipelines', 'Cloud Hosting & Docker', 'Observability & Logging', 'Database Migrations']
      },
      {
        title: 'GitHub & Code Defense',
        icon: ShieldCheck,
        skills: ['Production Deployment', 'Automated Testing Suites', 'GitHub Portfolio & PRs', 'Live Code Defense']
      }
    ],
    progressionHeaderTag: 'FROM CONCEPTS TO REAL-WORLD IMPACT',
    progressionSteps: [
      { label: 'Learn', outcome: 'Software Architecture', icon: BookOpen },
      { label: 'Build', outcome: 'Full-Stack App', icon: Settings },
      { label: 'Ship', outcome: 'Production API', icon: Server },
      { label: 'Deploy', outcome: 'Cloud & Docker', icon: Box },
      { label: 'Prove', outcome: 'Clean Codebase', icon: Code2 },
      { label: 'Launch', outcome: 'Live Web App', icon: Globe },
      { label: 'Grow', outcome: 'Code Defense', icon: Award }
    ]
  },
  'data-bi': {
    id: 'data-bi',
    eyebrow: 'EXPLORE PATHWAY',
    title: 'Data & BI',
    subtitle: 'Turn data into decisions—and decisions into proof.',
    description: 'From data fundamentals and SQL database mastery to interactive business intelligence dashboards, automated analytical pipelines, and executive presentations — transform raw data into actionable business impact.',
    badgeLabel: 'Actionable Insights',
    badgeSub: 'Live Dashboards • Career Ready',
    badgeIcon: BarChart3,
    skillsHeaderTag: 'DECISION INTELLIGENCE. REPRODUCIBLE ANALYTICS.',
    categories: [
      {
        title: 'Data Foundations',
        icon: BookOpen,
        skills: ['Data Principles & Pipelines', 'Statistical Thinking & KPIs', 'Data Quality & Cleaning', 'Business Metrics Modeling']
      },
      {
        title: 'Excel & Data Handling',
        icon: FileSpreadsheet,
        skills: ['Advanced Excel & Formulas', 'Pivot Tables & Lookups', 'Power Query Automation', 'Data Modeling Best Practices']
      },
      {
        title: 'SQL & Databases',
        icon: Database,
        skills: ['Relational Database Design', 'Complex Queries & Joins', 'Aggregations & Window Functions', 'Performance Indexing']
      },
      {
        title: 'Data Analytics',
        icon: TrendingUp,
        skills: ['Exploratory Data Analysis (EDA)', 'Python & Pandas', 'Data Cleaning & Wrangling', 'Statistical Hypothesis Testing']
      },
      {
        title: 'Business Intelligence',
        icon: PieChart,
        skills: ['Interactive Dashboard Design', 'Power BI & Tableau', 'Visual Storytelling', 'Executive KPI Dashboards']
      },
      {
        title: 'Data Project & Defense',
        icon: ShieldCheck,
        skills: ['Predictive Analytics Basics', 'Automated Reporting Pipelines', 'Data Portfolio & GitHub', 'Executive Defense & Presentation']
      }
    ],
    progressionHeaderTag: 'FROM CONCEPTS TO REAL-WORLD IMPACT',
    progressionSteps: [
      { label: 'Learn', outcome: 'Data Modeling', icon: BookOpen },
      { label: 'Build', outcome: 'SQL Warehouse', icon: Database },
      { label: 'Ship', outcome: 'Python Pipeline', icon: Workflow },
      { label: 'Deploy', outcome: 'Automated ETL', icon: Box },
      { label: 'Prove', outcome: 'GitHub Analytics', icon: Code2 },
      { label: 'Launch', outcome: 'Live BI Dashboard', icon: Globe },
      { label: 'Grow', outcome: 'Executive Defense', icon: Award }
    ]
  }
};

interface PathwayExploreModalProps {
  pathwayId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onChooseLearningPlan?: (pathwayId: string) => void;
}

export const PathwayExploreModal: React.FC<PathwayExploreModalProps> = ({
  pathwayId,
  isOpen,
  onClose,
  onChooseLearningPlan
}) => {
  // Map aliases if needed
  const normalizedId = pathwayId === 'ai-business-automation' ? 'ai-automation' : pathwayId;
  const pathway = normalizedId ? PATHWAYS_DATA[normalizedId] || PATHWAYS_DATA['ai-automation'] : null;

  // Escape key handler
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
  }, [isOpen, onClose]);

  if (!isOpen || !pathway) return null;

  const BadgeIcon = pathway.badgeIcon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="explore-pathway-title"
    >
      {/* =========================================================================
          SOFT TRANSLUCENT OVERLAY + SUBTLE BACKDROP BLUR
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0B192C]/40 backdrop-blur-md cursor-pointer"
        aria-hidden="true"
      />

      {/* =========================================================================
          CENTERED FLOATING MODAL
          Width: 850-950px on desktop, 90-94vw on mobile. Max-height: 90vh with internal scroll.
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[920px] max-h-[90vh] overflow-y-auto bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_25px_70px_-15px_rgba(37,99,235,0.22),0_15px_35px_-10px_rgba(15,23,42,0.12)] border border-[#BFDBFE]/60 z-10 p-6 sm:p-8 lg:p-10"
      >
        {/* Subtle decorative atmospheric gradient at top */}
        <div 
          className="absolute -top-16 -right-16 w-80 h-80 bg-gradient-to-br from-[#DBEAFE]/40 via-[#EFF6FF]/30 to-transparent rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        {/* =======================================================================
            HEADER SECTION
            ======================================================================= */}
        <div className="relative z-10 flex items-start justify-between gap-4 pb-6 border-b border-[#F1F5F9]">
          
          <div className="space-y-2 pr-2 sm:pr-6">
            {/* Eyebrow */}
            <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
              {pathway.eyebrow}
            </div>

            {/* Title */}
            <h2 
              id="explore-pathway-title"
              className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#0F172A] tracking-tight leading-tight"
            >
              {pathway.title}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-semibold text-[#1E293B]">
              {pathway.subtitle}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-2xl pt-1">
              {pathway.description}
            </p>
          </div>

          {/* Top-Right Column: Close button + Accent Pill Badge */}
          <div className="flex flex-col items-end gap-3 shrink-0">
            {/* Clean Close Button */}
            <button
              id="close-pathway-modal-btn"
              onClick={onClose}
              className="p-2 rounded-full text-[#64748B] hover:text-[#0F172A] hover:bg-[#F0F7FF] transition-colors cursor-pointer group"
              aria-label="Close pathway details"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
            </button>

            {/* Floating Soft Accent Card matching reference */}
            <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE]/70 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                <BadgeIcon className="w-4 h-4" />
              </div>
              <div className="text-left text-xs leading-tight">
                <div className="font-bold text-[#1E3A8A]">{pathway.badgeLabel}</div>
                <div className="text-[10px] text-[#2563EB] font-medium">{pathway.badgeSub}</div>
              </div>
            </div>
          </div>

        </div>

        {/* =======================================================================
            SECTION 1: WHAT YOU'LL LEARN (6 Compact Cards)
            ======================================================================= */}
        <div className="relative z-10 pt-7 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
              What You’ll Learn
            </h3>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-[#2563EB] uppercase">
              {pathway.skillsHeaderTag}
            </span>
          </div>

          {/* 6 Categories Grid: 3 columns on desktop, 1 column on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {pathway.categories.map((cat, idx) => {
              const CategoryIcon = cat.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#BFDBFE] transition-all duration-200 shadow-2xs hover:shadow-xs group flex flex-col justify-between"
                >
                  <div>
                    {/* Category Title & Icon */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-[#0F172A] tracking-tight">
                        {cat.title}
                      </h4>
                    </div>

                    {/* Skill Bullet Points with Checkmarks */}
                    <ul className="space-y-2">
                      {cat.skills.map((skill, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-xs text-[#334155] font-medium leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* =======================================================================
            SECTION 2: YOUR LEARNING PROGRESSION (7 Connected Stages)
            ======================================================================= */}
        <div className="relative z-10 pt-8 mt-6 border-t border-[#F1F5F9] space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
              Your Learning Progression
            </h3>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-[#2563EB] uppercase">
              {pathway.progressionHeaderTag}
            </span>
          </div>

          {/* Desktop & Tablet: Horizontal Connected Sequence */}
          <div className="hidden md:flex items-center justify-between gap-1.5 p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            {pathway.progressionSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isLast = idx === pathway.progressionSteps.length - 1;

              return (
                <React.Fragment key={idx}>
                  {/* Step Node */}
                  <div className="flex flex-col items-center text-center group flex-1">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs group-hover:border-[#2563EB] text-[#2563EB] flex items-center justify-center transition-colors mb-2">
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-[#0F172A] leading-tight">
                      {step.label}
                    </div>
                    <div className="text-[10px] text-[#64748B] font-medium leading-tight mt-0.5">
                      {step.outcome}
                    </div>
                  </div>

                  {/* Connector Arrow */}
                  {!isLast && (
                    <div className="flex items-center justify-center px-1 text-[#94A3B8] shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8]" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Mobile: Compact Grid / Flow for Small Screens */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:hidden p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            {pathway.progressionSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#E2E8F0]/80">
                  <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                    <StepIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left overflow-hidden">
                    <div className="text-[11px] font-bold text-[#0F172A] truncate">
                      {step.label}
                    </div>
                    <div className="text-[9px] text-[#64748B] truncate">
                      {step.outcome}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Optional CTA to configure Learning Plan with preselected pathway */}
          {onChooseLearningPlan && (
            <div className="pt-5 border-t border-[#E2E8F0] mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#64748B]">
                <span className="font-semibold text-[#0F172A]">Ready to design your path?</span> 4, 6 or 8 week tracks • Hands-on proof.
              </div>
              <button
                type="button"
                id={`btn-choose-plan-from-${pathway.id}`}
                onClick={() => onChooseLearningPlan(pathway.id)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Choose Your Learning Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
};
