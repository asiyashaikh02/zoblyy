import React from 'react';
import { Phone, Mail, Link as LinkIcon, ArrowUpRight } from 'lucide-react';
import { ZoblyLogo } from '../common/ZoblyLogo';
import { IndiaFlag } from '../common/IndiaFlag';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAuditModal: () => void;
  onNavigatePage?: (path: string) => void;
  onOpenPartnerModal?: () => void;
  onExplorePathway?: (pathwayId: string) => void;
  onOpenEnrollModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  onOpenAuditModal, 
  onNavigatePage,
  onOpenPartnerModal,
  onExplorePathway,
  onOpenEnrollModal
}) => {
  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      id="contact" 
      className="relative bg-white text-[#0F172A] border-t border-[#E2E8F0] pt-16 sm:pt-20 pb-6 sm:pb-8 overflow-hidden scroll-mt-6"
    >
      {/* ============================================================ */}
      {/* LARGE SUBTLE ZOBLY WATERMARK LOGO                            */}
      {/* Soft blue decorative background watermark positioned above line */}
      {/* ============================================================ */}
      <div 
        aria-hidden="true" 
        className="absolute left-1/2 -translate-x-1/2 bottom-20 sm:bottom-28 lg:bottom-32 pointer-events-none select-none w-[360px] sm:w-[640px] lg:w-[880px] max-w-[92vw] opacity-[0.08] z-0 flex items-center justify-center"
      >
        <ZoblyLogo className="w-full h-auto" id="footer-faded-watermark-logo" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* TOP SECTION: BRAND & NAVIGATION COLUMNS                     */}
        {/* ============================================================ */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-8 pb-24 sm:pb-36 lg:pb-48">
          
          {/* ---------------------------------------------------------- */}
          {/* LEFT: ZOBLY BRAND & CONTACT DETAILS (approx 4.5 cols)      */}
          {/* ---------------------------------------------------------- */}
          <div className="col-span-2 md:col-span-2 lg:col-span-4 xl:col-span-4 space-y-4 sm:space-y-5 text-left">
            
            {/* Zobly Logo */}
            <div className="flex items-center">
              <ZoblyLogo className="h-7 sm:h-9 w-auto" id="footer-brand-logo" />
            </div>

            {/* Slogan */}
            <div className="text-sm sm:text-[17px] font-bold text-[#0F172A] tracking-tight">
              Build Skills. Build Proof. Build Your Career.
            </div>

            {/* Compact Description */}
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-sm">
              A proof-driven career readiness ecosystem helping learners build real technical skills, real projects, and real opportunities.
            </p>

            {/* Contact Details List */}
            <div className="pt-1 sm:pt-2 flex flex-col gap-2.5 text-xs sm:text-sm text-[#475569]">
              
              {/* Phone Number */}
              <div className="flex items-center gap-2 sm:gap-3 group">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#BFDBFE]/60">
                  <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <a 
                  href="tel:+919867799655" 
                  className="hover:text-[#2563EB] transition-colors duration-200 font-medium text-[11px] sm:text-sm truncate"
                >
                  +91 98677 99655
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 sm:gap-3 group">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#BFDBFE]/60">
                  <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <a 
                  href="mailto:zobly@synckraft.in" 
                  className="hover:text-[#2563EB] transition-colors duration-200 font-medium text-[11px] sm:text-sm truncate"
                >
                  zobly@synckraft.in
                </a>
              </div>

              {/* Website */}
              <div className="flex items-center gap-2 sm:gap-3 group">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#BFDBFE]/60">
                  <LinkIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <a 
                  href="https://zobly.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#2563EB] transition-colors duration-200 font-medium text-[11px] sm:text-sm"
                >
                  zobly.ai
                </a>
              </div>

            </div>

          </div>

          {/* ---------------------------------------------------------- */}
          {/* COLUMN 01: EXPLORE                                         */}
          {/* ---------------------------------------------------------- */}
          <div className="col-span-1 lg:col-span-2 space-y-3 sm:space-y-4 text-left">
            <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-[#64748B]">
              <li>
                <button 
                  onClick={() => onNavigate('tracks')}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer"
                >
                  Explore Paths
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('philosophy')}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer"
                >
                  Programs & Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAuditModal}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer"
                >
                  Assessment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenEnrollModal ? onOpenEnrollModal() : (onNavigatePage && onNavigatePage('/'))}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer font-medium"
                >
                  Enroll Now
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigatePage && onNavigatePage('/login')}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer font-medium text-[#2563EB]"
                >
                  Student Portal
                </button>
              </li>
            </ul>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* COLUMN 02: CAREER PATHWAYS                                 */}
          {/* ---------------------------------------------------------- */}
          <div className="col-span-1 lg:col-span-2 space-y-3 sm:space-y-4 text-left">
            <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
              Career Pathways
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-[#64748B]">
              <li>
                <button 
                  onClick={() => onExplorePathway ? onExplorePathway('ai-automation') : onNavigate('tracks')}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer"
                >
                  AI & Automation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onExplorePathway ? onExplorePathway('software-product') : onNavigate('tracks')}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer"
                >
                  Software & Product
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onExplorePathway ? onExplorePathway('data-bi') : onNavigate('tracks')}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer"
                >
                  Data & BI
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('tracks')}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer"
                >
                  Design & Creative
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('tracks')}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer"
                >
                  Business & Mgmt
                </button>
              </li>
            </ul>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* COLUMN 03: FOR                                             */}
          {/* ---------------------------------------------------------- */}
          <div className="col-span-1 lg:col-span-2 space-y-3 sm:space-y-4 text-left">
            <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
              For
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-[#64748B]">
              <li>
                <button 
                  onClick={() => onNavigate('tracks')}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer"
                >
                  Students
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPartnerModal ? onOpenPartnerModal() : onNavigate('timeline')}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer"
                >
                  Universities
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPartnerModal ? onOpenPartnerModal() : onNavigate('timeline')}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer"
                >
                  Training Partners
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPartnerModal ? onOpenPartnerModal() : onNavigate('timeline')}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer"
                >
                  Hiring Partners
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPartnerModal ? onOpenPartnerModal() : onNavigate('timeline')}
                  className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer text-[#2563EB] font-medium"
                >
                  Partner With Zobly
                </button>
              </li>
            </ul>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* COLUMN 04: SUPPORT                                         */}
          {/* ---------------------------------------------------------- */}
          <div className="col-span-1 lg:col-span-2 space-y-4 sm:space-y-6 text-left">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
                Support
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-[#64748B]">
                <li>
                  <a 
                    href="#faqs"
                    onClick={(e) => { e.preventDefault(); onNavigate('faqs'); }}
                    className="hover:text-[#2563EB] transition-colors duration-200 block"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <button 
                    onClick={handleScrollToContact}
                    className="hover:text-[#2563EB] transition-colors duration-200 text-left cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <a 
                    href="#faqs"
                    onClick={(e) => { e.preventDefault(); onNavigate('faqs'); }}
                    className="hover:text-[#2563EB] transition-colors duration-200 block"
                  >
                    Help Centre
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* DIVIDER                                                      */}
        {/* ============================================================ */}
        <div className="border-t border-[#E2E8F0]" />

        {/* ============================================================ */}
        {/* BOTTOM LEGAL BAR                                             */}
        {/* ============================================================ */}
        <div className="pt-6 pb-2 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          
          {/* Left: Copyright & Certificate */}
          <div className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left">
            <a
              href="/certificate.png"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center group transition-all duration-200 hover:opacity-95"
              title="View recognition certificate"
            >
              <img 
                src="/certificate.png" 
                alt="Recognition Certificate" 
                referrerPolicy="no-referrer"
                className="h-14 sm:h-16 md:h-18 w-auto max-w-[280px] sm:max-w-[340px] object-contain rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 shadow-xs group-hover:border-[#BFDBFE] group-hover:shadow-sm transition-all"
                id="footer-certificate-badge"
              />
            </a>
            <div className="text-[11px] sm:text-xs text-[#64748B]">
              © 2026 Synckraft Technologies. All rights reserved.
            </div>
          </div>

          {/* Middle: Company Attribution */}
          <div className="text-center">
            <a 
              href="https://synckraft.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#475569] hover:text-[#2563EB] transition-colors duration-200 font-medium group"
            >
              <span>An initiative by <strong className="font-semibold text-[#2563EB]">Synckraft Technologies</strong></span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Right: Legal Links & Made in India */}
          <div className="flex flex-col items-center lg:items-end gap-1.5 text-center lg:text-right">
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-3 gap-y-1 sm:gap-4 text-center">
              <a 
                href="/terms" 
                onClick={(e) => {
                  if (onNavigatePage) {
                    e.preventDefault();
                    onNavigatePage('/terms');
                  }
                }} 
                className="hover:text-[#2563EB] transition-colors duration-200"
              >
                Terms of Service
              </a>
              <span className="text-[#CBD5E1] hidden sm:inline">|</span>
              <a 
                href="/privacy" 
                onClick={(e) => {
                  if (onNavigatePage) {
                    e.preventDefault();
                    onNavigatePage('/privacy');
                  }
                }} 
                className="hover:text-[#2563EB] transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <span className="text-[#CBD5E1] hidden sm:inline">|</span>
              <a 
                href="/cookies" 
                onClick={(e) => {
                  if (onNavigatePage) {
                    e.preventDefault();
                    onNavigatePage('/cookies');
                  }
                }} 
                className="hover:text-[#2563EB] transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>

            {/* Made with love in India badge */}
            <div 
              id="footer-made-in-india" 
              className="text-xs sm:text-[13px] text-[#475569] inline-flex items-center gap-1.5 select-none pt-0.5 font-medium"
            >
              <span>made with <span className="text-[#EF4444] text-xs sm:text-[13px]">❤️</span> in india</span>
              <IndiaFlag className="w-4 h-3 sm:w-4.5 sm:h-3.5 rounded-[2px]" id="footer-india-flag" />
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

