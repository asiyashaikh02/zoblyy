import React from 'react';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';

interface LegalFooterProps {
  onNavigatePage: (path: string) => void;
  currentPath: string;
}

export const LegalFooter: React.FC<LegalFooterProps> = ({ onNavigatePage, currentPath }) => {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] pt-12 pb-10 text-[#0F172A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top brand and contact summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#F1F5F9]">
          
          {/* Brand */}
          <div className="space-y-1.5">
            <button
              onClick={() => onNavigatePage('/')}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className="relative flex items-center justify-center w-7 h-7">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                  <path 
                    d="M6 8C6 6.89543 6.89543 6 8 6H28C29.1046 6 30 6.89543 30 8V11C30 11.7228 29.6105 12.3892 28.9839 12.7482L14.5 21H28C29.1046 21 30 21.8954 30 23V28C30 29.1046 29.1046 30 28 30H8C6.89543 30 6 29.1046 6 28V25C6 24.2772 6.38951 23.6108 7.01614 23.2518L21.5 15H8C6.89543 15 6 14.1046 6 13V8Z" 
                    fill="url(#legal_footer_gradient)" 
                  />
                  <defs>
                    <linearGradient id="legal_footer_gradient" x1="6" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0284C7" />
                      <stop offset="0.45" stopColor="#2563EB" />
                      <stop offset="1" stopColor="#1D4ED8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#0F172A]">
                zobly
              </span>
            </button>
            <p className="text-xs text-[#64748B]">
              Build Skills. Build Proof. Build Your Career.
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#475569]">
            <a 
              href="mailto:zobly@synckraft.in" 
              className="inline-flex items-center gap-1.5 hover:text-[#2563EB] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>zobly@synckraft.in</span>
            </a>
            <a 
              href="tel:+919867799655" 
              className="inline-flex items-center gap-1.5 hover:text-[#2563EB] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>+91 98677 99655</span>
            </a>
          </div>

        </div>

        {/* Legal links and company attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="/terms" 
              onClick={(e) => { e.preventDefault(); onNavigatePage('/terms'); }}
              className={`transition-colors ${currentPath === '/terms' ? 'font-semibold text-[#2563EB]' : 'hover:text-[#2563EB]'}`}
            >
              Terms of Service
            </a>
            <span className="text-[#CBD5E1]">|</span>
            <a 
              href="/privacy" 
              onClick={(e) => { e.preventDefault(); onNavigatePage('/privacy'); }}
              className={`transition-colors ${currentPath === '/privacy' ? 'font-semibold text-[#2563EB]' : 'hover:text-[#2563EB]'}`}
            >
              Privacy Policy
            </a>
            <span className="text-[#CBD5E1]">|</span>
            <a 
              href="/cookies" 
              onClick={(e) => { e.preventDefault(); onNavigatePage('/cookies'); }}
              className={`transition-colors ${currentPath === '/cookies' ? 'font-semibold text-[#2563EB]' : 'hover:text-[#2563EB]'}`}
            >
              Cookie Policy
            </a>
          </div>

          <div>
            <a 
              href="https://synckraft.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#475569] hover:text-[#2563EB] transition-colors font-medium group"
            >
              <span>An initiative by <strong className="font-semibold text-[#2563EB]">Synckraft Technologies</strong></span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-4 text-center sm:text-left text-[11px] text-[#94A3B8]">
          © 2026 Synckraft Technologies. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
