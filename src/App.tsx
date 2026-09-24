import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { CareerTracksSection } from './components/sections/CareerTracksSection';
import { LearningToProofTimelineSection } from './components/sections/LearningToProofTimelineSection';
import { ProgramPricingSection } from './components/sections/ProgramPricingSection';
import { FaqSection } from './components/sections/FaqSection';
import { Footer } from './components/layout/Footer';
import { AssessmentModal } from './components/modals/AssessmentModal';
import { ChooseLearningPlanModal } from './components/modals/ChooseLearningPlanModal';
import { TermsPage } from './components/pages/TermsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { CookiesPage } from './components/pages/CookiesPage';
import { SignupPage } from './components/pages/SignupPage';
import { LoginPage } from './components/pages/LoginPage';
import { SignupSuccessPage } from './components/pages/SignupSuccessPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { AdminPanelPage } from './components/pages/AdminPanelPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthProvider } from './lib/firebase/authContext';
import { EnrollmentProvider, useEnrollment } from './context/EnrollmentContext';
import { PartnerWithZoblyModal } from './components/modals/PartnerWithZoblyModal';
import { PathwayExploreModal } from './components/modals/PathwayExploreModal';
import { updatePageSEO } from './utils/seo';

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [auditTargetTrack, setAuditTargetTrack] = useState<string>('ai-automation');
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState<boolean>(false);
  const [isExploreModalOpen, setIsExploreModalOpen] = useState<boolean>(false);
  const [selectedExplorePathway, setSelectedExplorePathway] = useState<string>('ai-automation');

  // Shared Canonical Enrollment Modal State from Context
  const { isOpen, pathwayId, duration, source, openEnrollment, closeEnrollment } = useEnrollment();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    updatePageSEO(currentPath);
    if (currentPath.startsWith('/paths/')) {
      const pathwaySlug = currentPath.replace('/paths/', '');
      let matchedTrack = 'ai-automation';
      if (pathwaySlug.includes('software') || pathwaySlug.includes('product')) {
        matchedTrack = 'software-product';
      } else if (pathwaySlug.includes('data') || pathwaySlug.includes('bi')) {
        matchedTrack = 'data-bi';
      }
      setSelectedExplorePathway(matchedTrack);
      setIsExploreModalOpen(true);
    }
  }, [currentPath]);

  const navigatePage = (path: string) => {
    if (path.startsWith('/#')) {
      const sectionId = path.slice(2);
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
      }
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 60);
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuditForTrack = (trackId: string) => {
    setAuditTargetTrack(trackId);
    setIsAuditModalOpen(true);
  };

  const handleChoosePlanFromPathway = (pathwayIdToSet: string) => {
    setIsExploreModalOpen(false);
    if (currentPath.startsWith('/paths/')) {
      navigatePage('/');
    }
    openEnrollment({ pathwayId: pathwayIdToSet, source: 'pathway_popup' });
  };

  const handleOpenExplorePathway = (trackId: string) => {
    setSelectedExplorePathway(trackId);
    setIsExploreModalOpen(true);
  };

  const renderPageContent = () => {
    // Render standalone legal pages if route matches
    if (currentPath === '/terms') {
      return (
        <TermsPage 
          onNavigatePage={navigatePage}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
          onOpenEnrollModal={() => openEnrollment({ source: 'terms_page' })}
        />
      );
    }

    if (currentPath === '/privacy') {
      return (
        <PrivacyPage 
          onNavigatePage={navigatePage}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
          onOpenEnrollModal={() => openEnrollment({ source: 'privacy_page' })}
        />
      );
    }

    if (currentPath === '/cookies') {
      return (
        <CookiesPage 
          onNavigatePage={navigatePage}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
          onOpenEnrollModal={() => openEnrollment({ source: 'cookies_page' })}
        />
      );
    }

    // Render dedicated Student Authentication flow matching reference image
    if (currentPath === '/signup') {
      return (
        <SignupPage 
          onNavigatePage={navigatePage} 
          onOpenEnrollModal={() => openEnrollment({ source: 'signup_page' })}
        />
      );
    }

    if (currentPath === '/login') {
      return (
        <LoginPage 
          onNavigatePage={navigatePage} 
          onOpenEnrollModal={() => openEnrollment({ source: 'login_page' })}
        />
      );
    }

    if (currentPath === '/signup-success') {
      return <SignupSuccessPage onNavigatePage={navigatePage} />;
    }

    if (currentPath === '/dashboard') {
      return (
        <ProtectedRoute onNavigatePage={navigatePage}>
          <DashboardPage onNavigatePage={navigatePage} />
        </ProtectedRoute>
      );
    }

    if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
      return (
        <ProtectedRoute onNavigatePage={navigatePage} requiredRole="admin">
          <AdminPanelPage onNavigatePage={navigatePage} currentPath={currentPath} />
        </ProtectedRoute>
      );
    }

    // Default Landing / Home Page
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#0F172A] font-sans selection:bg-[#2563EB] selection:text-white">
        
        {/* Primary Navigation */}
        <Navbar
          activeSection={activeSection}
          onNavigate={scrollToSection}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
          onNavigatePage={navigatePage}
          onOpenEnrollModal={() => openEnrollment({ source: 'navbar' })}
        />

        <main className="flex-grow">
          
          {/* Hero Section & Core Interactive Journey Launchpad */}
          <HeroSection
            onStartAssessment={() => setIsAuditModalOpen(true)}
            onExploreTracks={() => scrollToSection('tracks')}
            onEnrollNow={() => openEnrollment({ source: 'hero' })}
          />

          {/* Philosophy: Career Journey Roadmap & Learning to Proof */}
          <PhilosophySection
            onStartAssessment={() => setIsAuditModalOpen(true)}
            onExplorePlans={() => openEnrollment({ source: 'philosophy_roadmap' })}
          />

          {/* 03 Distinct Career Tracks: AI, Software, Data */}
          <CareerTracksSection
            onSelectTrackForAudit={handleOpenAuditForTrack}
            onExploreTrack={handleOpenExplorePathway}
            onEnrollTrack={(trackId) => openEnrollment({ pathwayId: trackId, source: 'career_tracks' })}
          />

          {/* The Institutional Partnership CTA Banner */}
          <LearningToProofTimelineSection 
            onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
          />

          {/* NEW PROGRAM DURATION & PRICING SECTION */}
          <ProgramPricingSection
            onSelectDuration={(d) => openEnrollment({ duration: d, source: 'pricing_section' })}
            onSelectPathwayPill={(pId) => openEnrollment({ pathwayId: pId, source: 'pricing_section_pill' })}
          />

          {/* Accordion FAQ Component: Common questions about Proof-Driven Model */}
          <FaqSection
            onStartAssessment={() => setIsAuditModalOpen(true)}
            onContactClick={() => scrollToSection('contact')}
          />

        </main>

        {/* Footer */}
        <Footer
          onNavigate={scrollToSection}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
          onNavigatePage={navigatePage}
          onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
          onExplorePathway={handleOpenExplorePathway}
          onOpenEnrollModal={() => openEnrollment({ source: 'footer' })}
        />

      </div>
    );
  };

  return (
    <>
      {renderPageContent()}

      {/* Zobly "Find Your Best Path" Career Assessment Modal */}
      <AssessmentModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        defaultTrackId={auditTargetTrack}
        onExplorePathway={(recPathwayId) => {
          setIsAuditModalOpen(false);
          openEnrollment({ pathwayId: recPathwayId, source: 'assessment' });
        }}
        onExploreCurriculum={(pathwayIdToExplore) => {
          setIsAuditModalOpen(false);
          setSelectedExplorePathway(pathwayIdToExplore);
          setIsExploreModalOpen(true);
        }}
      />

      {/* Partner With Zobly Modal (Initiative by Synckraft) */}
      <PartnerWithZoblyModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />

      {/* Career Pathway Explore Modal */}
      <PathwayExploreModal
        isOpen={isExploreModalOpen}
        onClose={() => {
          setIsExploreModalOpen(false);
          if (currentPath.startsWith('/paths/')) {
            navigatePage('/');
          }
        }}
        pathwayId={selectedExplorePathway}
        onChooseLearningPlan={handleChoosePlanFromPathway}
      />

      {/* SINGLE CANONICAL ChooseLearningPlanModal INSTANCE AT ROOT LEVEL */}
      <ChooseLearningPlanModal
        isOpen={isOpen}
        onClose={closeEnrollment}
        initialPathway={pathwayId}
        initialDuration={duration}
        source={source}
        onNavigatePage={navigatePage}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <EnrollmentProvider>
        <AppContent />
      </EnrollmentProvider>
    </AuthProvider>
  );
}
