import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Phone, Mail, Globe, Cookie } from 'lucide-react';
import { Navbar } from '../layout/Navbar';
import { LegalFooter } from '../layout/LegalFooter';
import { IndiaFlag } from '../common/IndiaFlag';

interface CookiesPageProps {
  onNavigatePage: (path: string) => void;
  onOpenAuditModal: () => void;
  onOpenEnrollModal?: () => void;
}

export const CookiesPage: React.FC<CookiesPageProps> = ({ onNavigatePage, onOpenAuditModal, onOpenEnrollModal }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavSection = (sectionId: string) => {
    onNavigatePage(`/#${sectionId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#0F172A] font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Existing Zobly Navbar */}
      <Navbar
        activeSection=""
        onNavigate={handleNavSection}
        onOpenAuditModal={onOpenAuditModal}
        onNavigatePage={onNavigatePage}
        onOpenEnrollModal={onOpenEnrollModal}
      />

      {/* Main Content Area */}
      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation */}
          <div className="mb-8">
            <button
              onClick={() => onNavigatePage('/')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#64748B] hover:text-[#2563EB] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Zobly</span>
            </button>
          </div>

          {/* Document Header Container */}
          <header className="pb-8 mb-10 border-b border-[#E2E8F0]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EFF6FF] text-[#2563EB] text-xs font-mono font-semibold tracking-wider uppercase mb-4 border border-[#DBEAFE]">
              <Cookie className="w-3.5 h-3.5" />
              <span>ZOBLY LEGAL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
              Cookie Policy
            </h1>

            <p className="text-sm text-[#64748B]">
              Last updated: March 2026
            </p>
          </header>

          {/* Cookies Content Body */}
          <article className="prose prose-slate max-w-none text-[#334155] space-y-10 leading-relaxed text-sm sm:text-base">
            
            {/* 1. What Are Cookies? */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that websites place on your computer, tablet, or mobile device as you browse. They are widely used by online service providers to enable web pages to function smoothly, retain user preferences across sessions, and provide aggregated reporting insights.
              </p>
              <p>
                In addition to cookies, web services may use similar client-side storage technologies, such as browser local storage and session storage, to preserve functional application states.
              </p>
            </section>

            {/* 2. How Zobly Uses Cookies */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                2. How Zobly Uses Cookies
              </h2>
              <p>
                Zobly, an initiative by Synckraft Technologies, uses cookies and local browser storage to provide a seamless, secure, and personalized learning experience. We use these technologies to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#475569]">
                <li>Remember your preferences, such as selected program duration or career pathway filters.</li>
                <li>Preserve your progress during diagnostic assessment flows.</li>
                <li>Ensure fast page loading times and prevent malicious automated interactions.</li>
                <li>Understand aggregate site navigation patterns to continually refine our platform layout.</li>
              </ul>
            </section>

            {/* 3. Types of Cookies */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                3. Types of Cookies
              </h2>
              <p>
                Cookies used on our website fall into three core functional categories:
              </p>
            </section>

            {/* 4. Essential Cookies */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                4. Essential Cookies
              </h2>
              <p>
                These cookies and storage mechanisms are strictly necessary for the core operation and security of the website. Without these, basic features—such as user navigation, session state handling, and interactive assessment modal triggers—cannot function properly. Because these are essential for service delivery, they cannot be disabled in our systems.
              </p>
            </section>

            {/* 5. Analytics Cookies */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                5. Analytics Cookies
              </h2>
              <p>
                Analytics cookies collect aggregated, anonymized information about how visitors navigate and interact with our pages (for instance, which pathways or pricing options are viewed most frequently). This aggregate data allows us to measure performance, identify errors, and improve our curriculum presentation.
              </p>
              <p className="text-[#64748B] italic">
                [Specific external analytics vendors will be listed here upon final technical integration and legal approval.]
              </p>
            </section>

            {/* 6. Preference Cookies */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                6. Preference Cookies
              </h2>
              <p>
                Preference cookies enable the website to remember choices you make across sessions (such as remembering selected cohort durations, localized preferences, or display configurations) to provide a more convenient and tailored user experience.
              </p>
            </section>

            {/* 7. Managing Cookies */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                7. Managing Cookies
              </h2>
              <p>
                Most modern web browsers allow you to control and manage cookies through their settings. You can configure your browser to notify you when you receive a cookie, reject cookies altogether, or delete existing cookies.
              </p>
              <p>
                Please note that if you choose to block or disable essential cookies, certain features or interactive sections of the Zobly platform may not function as intended.
              </p>
              <p className="text-xs text-[#64748B]">
                To learn more about how to manage cookies on popular browsers, consult your browser&apos;s official help documentation (Chrome, Safari, Firefox, Edge).
              </p>
            </section>

            {/* 8. Changes to This Cookie Policy */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                8. Changes to This Cookie Policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time to reflect adjustments to our technological stack, operational requirements, or applicable laws. When revisions are posted, we will update the &quot;Last updated&quot; date at the top of this page.
              </p>
            </section>

            {/* 9. Contact Us */}
            <section className="space-y-4 pt-4 border-t border-[#E2E8F0]">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                9. Contact Us
              </h2>
              <p>
                If you have any questions or require clarification regarding our use of cookies and tracking technologies, please reach out to:
              </p>

              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 space-y-3 max-w-lg shadow-xs">
                <div className="font-bold text-[#0F172A] text-base">
                  Zobly
                </div>
                <div className="text-xs text-[#64748B]">
                  An initiative by{' '}
                  <a 
                    href="https://synckraft.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#2563EB] font-semibold hover:underline inline-flex items-center gap-0.5"
                  >
                    Synckraft Technologies <ArrowUpRight className="w-3 h-3 inline" />
                  </a>
                </div>

                <div className="pt-2 space-y-2 text-sm text-[#475569]">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <a href="https://zobly.ai" target="_blank" rel="noopener noreferrer" className="hover:text-[#2563EB] transition-colors">
                      zobly.ai
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <a href="mailto:zobly@synckraft.in" className="hover:text-[#2563EB] transition-colors">
                      zobly@synckraft.in
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <a href="tel:+919867799655" className="hover:text-[#2563EB] transition-colors">
                      +91 98677 99655
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F1F5F9] text-xs font-medium text-[#64748B] flex items-center gap-1.5">
                  <span>Made in India</span>
                  <IndiaFlag className="w-4 h-2.5" id="cookies-india-flag" />
                </div>
              </div>
            </section>

          </article>

        </div>
      </main>

      {/* Simplified Legal Footer */}
      <LegalFooter 
        onNavigatePage={onNavigatePage}
        currentPath="/cookies"
      />
    </div>
  );
};
