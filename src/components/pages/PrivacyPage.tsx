import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Phone, Mail, Globe, Lock } from 'lucide-react';
import { Navbar } from '../layout/Navbar';
import { LegalFooter } from '../layout/LegalFooter';
import { IndiaFlag } from '../common/IndiaFlag';

interface PrivacyPageProps {
  onNavigatePage: (path: string) => void;
  onOpenAuditModal: () => void;
  onOpenEnrollModal?: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigatePage, onOpenAuditModal, onOpenEnrollModal }) => {
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
              <Lock className="w-3.5 h-3.5" />
              <span>ZOBLY LEGAL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
              Privacy Policy
            </h1>

            <p className="text-sm text-[#64748B]">
              Last updated: March 2026
            </p>
          </header>

          {/* Privacy Content Body */}
          <article className="prose prose-slate max-w-none text-[#334155] space-y-10 leading-relaxed text-sm sm:text-base">
            
            {/* 1. Introduction */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                1. Introduction
              </h2>
              <p>
                At Zobly (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), an initiative by Synckraft Technologies, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website at{' '}
                <a href="https://zobly.ai" className="text-[#2563EB] hover:underline">zobly.ai</a>, take our assessments, or enroll in our programs and services.
              </p>
              <p>
                By accessing or using our platform, you acknowledge that you understand and agree to the data practices described in this policy.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                2. Information We Collect
              </h2>
              <p>We may collect information directly from you when you interact with our platform, including:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#475569]">
                <li><span className="font-semibold text-[#0F172A]">Personal Identifiers:</span> Name, email address, phone number, and institutional/organization affiliation.</li>
                <li><span className="font-semibold text-[#0F172A]">Educational &amp; Professional Background:</span> Current degree or career background, technical interests, and self-reported coding experience.</li>
                <li><span className="font-semibold text-[#0F172A]">Payment Information:</span> Transaction identifiers and billing records processed via verified payment gateway partners. (We do not directly store full payment card numbers on our servers).</li>
                <li><span className="font-semibold text-[#0F172A]">Device &amp; Usage Data:</span> IP address, browser type, device information, operating system, and interaction logs.</li>
              </ul>
            </section>

            {/* 3. How We Use Information */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                3. How We Use Information
              </h2>
              <p>We use the information we collect for purpose-driven operational needs:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#475569]">
                <li>To evaluate assessment responses and recommend suitable career pathways.</li>
                <li>To deliver, coordinate, and administer our learning programs and mentoring sessions.</li>
                <li>To communicate cohort schedules, curriculum updates, and onboarding procedures.</li>
                <li>To provide technical and customer support.</li>
                <li>To continually enhance platform usability, security, and learning outcomes.</li>
              </ul>
            </section>

            {/* 4. Assessment and Learning Data */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                4. Assessment and Learning Data
              </h2>
              <p>
                When you participate in our diagnostic assessments or submit project deliverables, we collect data regarding your answers, technical competencies, completion milestones, and defense outcomes. This data is used to tailor your learning recommendations and generate your verifiable proof-of-work portfolio.
              </p>
            </section>

            {/* 5. Account Information */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                5. Account Information
              </h2>
              <p>
                If you create an account or register for a cohort, you are responsible for maintaining the accuracy of your profile information. You may review, update, or correct your contact details by notifying our support team.
              </p>
            </section>

            {/* 6. Communications */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                6. Communications
              </h2>
              <p>
                We may send you operational announcements, transactional confirmations, and program updates. You may opt out of non-essential promotional communications at any time by clicking the unsubscribe link or contacting us directly at{' '}
                <a href="mailto:zobly@synckraft.in" className="text-[#2563EB] hover:underline">zobly@synckraft.in</a>.
              </p>
            </section>

            {/* 7. Cookies and Similar Technologies */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                7. Cookies and Similar Technologies
              </h2>
              <p>
                We use cookies and similar browser storage technologies to ensure basic site functionality, remember preferences, and analyze aggregate visitor trends. For full details on how we utilize cookies and how you can manage them, please consult our standalone{' '}
                <button 
                  onClick={() => onNavigatePage('/cookies')}
                  className="text-[#2563EB] font-medium hover:underline cursor-pointer"
                >
                  Cookie Policy
                </button>.
              </p>
            </section>

            {/* 8. Data Sharing */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                8. Data Sharing
              </h2>
              <p>
                We do not sell, rent, or trade your personal data to third parties. We may share necessary information only in the following limited circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#475569]">
                <li><span className="font-semibold text-[#0F172A]">Authorized Service Providers:</span> Trusted infrastructure, communication, and payment partners who assist in operating our Services under strict confidentiality obligations.</li>
                <li><span className="font-semibold text-[#0F172A]">Hiring &amp; Institutional Partners:</span> Where you explicitly opt in to share your verified technical portfolio and defense credentials with prospective employers or collaborating academic institutions.</li>
                <li><span className="font-semibold text-[#0F172A]">Legal Obligations:</span> When required by valid law, legal process, or regulatory authority.</li>
              </ul>
            </section>

            {/* 9. Data Security */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                9. Data Security
              </h2>
              <p>
                We maintain appropriate administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, loss, destruction, or alteration. While we employ industry-standard practices, no electronic transmission over the internet or data storage system is guaranteed to be 100% secure.
              </p>
              <p className="text-[#64748B] italic">
                [Specific technical security standards and external audit certifications are subject to formal legal verification and internal governance policies.]
              </p>
            </section>

            {/* 10. Data Retention */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                10. Data Retention
              </h2>
              <p>
                We retain personal information for the period necessary to fulfill the educational and certification purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and maintain verifiable graduation records.
              </p>
            </section>

            {/* 11. Your Rights and Choices */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                11. Your Rights and Choices
              </h2>
              <p>
                Depending on your location and applicable privacy laws, you may have rights to request access to, correction of, or deletion of your personal data held by us. To submit a data inquiry or request, please contact{' '}
                <a href="mailto:zobly@synckraft.in" className="text-[#2563EB] hover:underline">zobly@synckraft.in</a>.
              </p>
            </section>

            {/* 12. Children&apos;s Privacy */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                12. Children&apos;s Privacy
              </h2>
              <p>
                Our platform and professional training programs are not directed toward children under the age of 16. We do not knowingly collect personal information from children without verified parental or institutional authorization. If you believe a child has provided us with personal information without proper consent, please contact us immediately.
              </p>
            </section>

            {/* 13. Changes to This Policy */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                13. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our services, technologies, or regulatory requirements. Any modifications will be posted here with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
              </p>
            </section>

            {/* 14. Contact Us */}
            <section className="space-y-4 pt-4 border-t border-[#E2E8F0]">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                14. Contact Us
              </h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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
                  <IndiaFlag className="w-4 h-2.5" id="privacy-india-flag" />
                </div>
              </div>
            </section>

          </article>

        </div>
      </main>

      {/* Simplified Legal Footer */}
      <LegalFooter 
        onNavigatePage={onNavigatePage}
        currentPath="/privacy"
      />
    </div>
  );
};
