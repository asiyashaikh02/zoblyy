import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Phone, Mail, Globe, Shield } from 'lucide-react';
import { Navbar } from '../layout/Navbar';
import { LegalFooter } from '../layout/LegalFooter';
import { IndiaFlag } from '../common/IndiaFlag';

interface TermsPageProps {
  onNavigatePage: (path: string) => void;
  onOpenAuditModal: () => void;
  onOpenEnrollModal?: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigatePage, onOpenAuditModal, onOpenEnrollModal }) => {
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
              <Shield className="w-3.5 h-3.5" />
              <span>ZOBLY LEGAL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
              Terms of Service
            </h1>

            <p className="text-sm text-[#64748B]">
              Last updated: March 2026
            </p>
          </header>

          {/* Terms Content Body */}
          <article className="prose prose-slate max-w-none text-[#334155] space-y-10 leading-relaxed text-sm sm:text-base">
            
            {/* 1. Introduction */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                1. Introduction
              </h2>
              <p>
                Welcome to Zobly. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website located at{' '}
                <a href="https://zobly.ai" className="text-[#2563EB] hover:underline">zobly.ai</a>, together with any associated educational, assessment, or career readiness programs, materials, and services (collectively, the &quot;Services&quot;) provided by Zobly, an initiative by Synckraft Technologies.
              </p>
              <p>
                Please read these Terms carefully before accessing or using our Services. By accessing, enrolling, registering, or participating in any program, assessment, or service provided by Zobly, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
              </p>
            </section>

            {/* 2. About Zobly */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                2. About Zobly
              </h2>
              <p>
                Zobly is a proof-driven career readiness ecosystem focused on practical, hands-on learning across emerging technical disciplines, including AI &amp; Business Automation, Software &amp; Product, and Data &amp; Business Intelligence. Zobly emphasizes project-based portfolios, production-level technical deliverables, and verifiable proof of skill over passive credentialing.
              </p>
            </section>

            {/* 3. Eligibility */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                3. Eligibility
              </h2>
              <p>
                You must be at least 18 years of age, or the legal age of majority in your jurisdiction, to enroll in paid programs independently. Individuals under the age of majority may only participate with verified parental or legal guardian consent or through an authorized educational institution or training partner program.
              </p>
              <p>
                By using our Services, you represent and warrant that all registration information you submit is truthful and accurate, and that you have the legal capacity to enter into these Terms.
              </p>
            </section>

            {/* 4. Programs and Services */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                4. Programs and Services
              </h2>
              <p>
                Zobly offers structured learning programs of varying durations (including 4-week, 6-week, and 8-week cohorts), skill assessments, architectural defenses, capstone projects, and career readiness support.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#475569]">
                <li>Program curricula, mentors, schedules, and tools are subject to change to ensure alignment with current industry standards.</li>
                <li>Enrollment is subject to availability and completion of required prerequisites or diagnostic assessments where applicable.</li>
                <li>Zobly reserves the right to modify or discontinue any part of the Services with reasonable advance notice where practicable.</li>
              </ul>
            </section>

            {/* 5. Assessments and Learning Programs */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                5. Assessments and Learning Programs
              </h2>
              <p>
                Assessments provided by Zobly are diagnostic tools designed to evaluate technical readiness, baseline proficiencies, and program placement. Completion of an assessment does not guarantee admission to a specific program or track.
              </p>
              <p>
                Learners agree to submit original work during assessments, milestone evaluations, and final defense presentations. Academic integrity is fundamental to the proof-based credentialing model.
              </p>
            </section>

            {/* 6. Payments and Program Fees */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                6. Payments and Program Fees
              </h2>
              <p>
                Tuition and fees for Zobly programs are determined by the selected program duration and tier as displayed on our Programs &amp; Pricing section at the time of enrollment.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#475569]">
                <li>All applicable taxes, fees, and installment payment terms are clearly stated during checkout or invoice issuance.</li>
                <li>Payment must be completed through designated payment channels prior to program commencement unless an approved institutional or installment arrangement is in place.</li>
                <li>
                  <span className="font-medium text-[#0F172A]">Cancellation &amp; Refund Terms:</span>{' '}
                  <span className="text-[#64748B] italic">[Formal refund policy terms and withdrawal cut-off windows are subject to specific cohort enrollment agreements and applicable consumer protection laws; details will be explicitly confirmed upon cohort confirmation.]</span>
                </li>
              </ul>
            </section>

            {/* 7. User Responsibilities */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                7. User Responsibilities
              </h2>
              <p>When participating in Zobly programs or using our platform, you agree to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#475569]">
                <li>Maintain the confidentiality of your account credentials.</li>
                <li>Treat instructors, mentors, guest industry reviewers, and fellow learners with professional respect.</li>
                <li>Refrain from reverse-engineering, scraping, or attempting unauthorized access to any part of the platform.</li>
                <li>Not use Zobly resources for any unlawful, fraudulent, or abusive purpose.</li>
              </ul>
            </section>

            {/* 8. Intellectual Property */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                8. Intellectual Property
              </h2>
              <p>
                All course materials, lectures, curriculum designs, assessment methodologies, software frameworks, visual marks, logos, and website content provided by Zobly and Synckraft Technologies are the exclusive intellectual property of Synckraft Technologies or its licensors.
              </p>
              <p>
                You are granted a limited, non-exclusive, non-transferable license to access and view program content solely for your personal educational use during your enrolled period.
              </p>
            </section>

            {/* 9. User Content and Project Work */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                9. User Content and Project Work
              </h2>
              <p>
                You retain ownership of the code, original documentation, and creative deliverables you author in connection with your capstone projects and assignments.
              </p>
              <p>
                By participating, you grant Zobly a non-exclusive license to display, reference, or feature your verified public project repositories and defense outcomes for educational, portfolio verification, and program showcase purposes, unless you explicitly request confidentiality in writing prior to project kickoff.
              </p>
            </section>

            {/* 10. Career and Employment Disclaimer */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                10. Career and Employment Disclaimer
              </h2>
              <p>
                Zobly provides rigorous skill development, verified project portfolios, and career enablement opportunities. However, Zobly does not guarantee employment, job offers, specific salary levels, or employer placement.
              </p>
              <p>
                Career outcomes depend on multiple individual and market factors, including learner dedication, interview performance, prior experience, geographical market conditions, and independent employer hiring criteria.
              </p>
            </section>

            {/* 11. Third-Party Services */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                11. Third-Party Services
              </h2>
              <p>
                Programs may incorporate or recommend third-party tools, code repositories (such as GitHub), cloud providers, or automation platforms. Your use of any third-party services is governed by the respective terms and privacy policies of those providers. Zobly is not responsible for the availability, security, or practices of third-party platforms.
              </p>
            </section>

            {/* 12. Limitation of Liability */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                12. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, Zobly and Synckraft Technologies shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of or related to your use of the Services.
              </p>
              <p className="text-[#64748B] italic">
                [Total aggregate liability limitations and applicable statutory exclusions are subject to final legal counsel review and local governing regulations.]
              </p>
            </section>

            {/* 13. Changes to These Terms */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                13. Changes to These Terms
              </h2>
              <p>
                We may revise these Terms from time to time to reflect updates to our programs, technology, or legal requirements. When changes are made, we will update the &quot;Last updated&quot; date at the top of this page. Continued use of the Services after revisions become effective indicates your acceptance of the updated Terms.
              </p>
            </section>

            {/* 14. Contact Us */}
            <section className="space-y-4 pt-4 border-t border-[#E2E8F0]">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                14. Contact Us
              </h2>
              <p>
                If you have questions, feedback, or legal inquiries regarding these Terms of Service, please reach out to us:
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
                  <IndiaFlag className="w-4 h-2.5" id="terms-india-flag" />
                </div>
              </div>
            </section>

          </article>

        </div>
      </main>

      {/* Simplified Legal Footer */}
      <LegalFooter 
        onNavigatePage={onNavigatePage}
        currentPath="/terms"
      />
    </div>
  );
};
