import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'proof-model',
    question: "What is proof-driven learning?",
    answer: "Instead of video watch-time or paper certificates, your progress is measured entirely by working software. You build, deploy, and defend production systems with verifiable Git commits."
  },
  {
    id: 'code-defense',
    question: "How does the live code defense work?",
    answer: "Before completing a milestone, you defend your architecture live before a senior engineer—explaining trade-offs, debugging edge cases, and verifying authentic mastery."
  },
  {
    id: 'proof-dossier',
    question: "What is a Proof Dossier?",
    answer: "A verified digital portfolio containing live production URLs, audited GitHub repositories with automated test suites, and recorded defense sessions reviewed by hiring partners."
  },
  {
    id: 'prerequisites',
    question: "Do I need a CS degree to enroll?",
    answer: "No. You start with a diagnostic audit that pinpoints your current baseline, tailoring the progression to your exact starting skillset."
  },
  {
    id: 'originality',
    question: "Are projects original or tutorial clones?",
    answer: "All projects are original systems built against real enterprise briefs with strict constraints—we strictly prohibit boilerplate clones."
  },
  {
    id: 'hiring-advantage',
    question: "How does this help me get hired?",
    answer: "Hiring partners skip initial screening tests because they can inspect your verified code commits, production architecture, and live defense audits directly."
  }
];

interface FaqSectionProps {
  onStartAssessment?: () => void;
  onContactClick?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onStartAssessment,
  onContactClick
}) => {
  const [openId, setOpenId] = useState<string | null>('proof-model');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section 
      id="faqs" 
      className="relative bg-white border-t border-[#E2E8F0] py-16 sm:py-20 lg:py-28 scroll-mt-14"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Crisp Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="w-5 sm:w-8 h-[2px] bg-[#2563EB] rounded-full shrink-0" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#2563EB]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <span className="w-5 sm:w-8 h-[2px] bg-[#2563EB] rounded-full shrink-0" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-[1.18]">
            Everything You Need to Know.
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#475569] leading-relaxed max-w-xl mx-auto font-normal">
            Fast answers about our proof model, code defense, and career outcomes.
          </p>
        </div>

        {/* Lean Accordion List */}
        <div className="divide-y divide-[#F1F5F9] border-y border-[#F1F5F9]">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="transition-colors">
                <button
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full py-4.5 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer group focus:outline-none focus-visible:text-[#2563EB]"
                >
                  <span className={`text-sm sm:text-base font-semibold transition-colors ${
                    isOpen ? 'text-[#2563EB]' : 'text-[#0F172A] group-hover:text-[#2563EB]'
                  }`}>
                    {item.question}
                  </span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#2563EB] bg-[#EFF6FF]' : 'text-[#94A3B8] group-hover:text-[#0F172A]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      key={`content-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-xs sm:text-sm text-[#475569] leading-relaxed pr-6">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Lean Footer Note */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
          <span>Still have questions about how Zobly works?</span>
          <div className="flex items-center gap-4">
            {onStartAssessment && (
              <button
                onClick={onStartAssessment}
                className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Take diagnostic audit</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
            {onContactClick && (
              <button
                onClick={onContactClick}
                className="font-medium text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer"
              >
                Contact advisor
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
