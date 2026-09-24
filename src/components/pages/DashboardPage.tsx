import React, { useState, useEffect } from 'react';
import { useAuth } from '../../lib/firebase/authContext';
import { enrollmentService } from '../../lib/firebase/firestoreService';
import type { StudentEnrollment } from '../../types/firebase';
import {
  User,
  LogOut,
  ShieldCheck,
  Phone,
  GraduationCap,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { ZoblyLogo } from '../common/ZoblyLogo';

interface DashboardPageProps {
  onNavigatePage: (path: string) => void;
}

const TRACK_LABELS: Record<string, string> = {
  'ai-automation': 'AI & Business Automation',
  'software-product': 'Software & Product Development',
  'data-bi': 'Data Analytics & Business Intelligence',
};

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigatePage }) => {
  const { user, profile, logout, isConfigured } = useAuth();
  const [enrollments, setEnrollments] = useState<StudentEnrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (user?.uid) {
        try {
          const list = await enrollmentService.getByStudentId(user.uid);
          setEnrollments(list);
        } catch (err) {
          console.warn('Could not load student enrollments:', err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchStudentData();
  }, [user]);

  const activeEnrollment = enrollments[0]; // Most recent registration

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
    return 'Recent';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigatePage('/')}
              className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
            >
              <ZoblyLogo className="h-7 sm:h-8 w-auto" id="dashboard-header-logo" />
            </button>
            <span className="hidden sm:inline-block w-px h-5 bg-[#CBD5E1]" />
            <span className="hidden sm:inline-block text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
              Student Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            {profile?.role === 'admin' && (
              <button
                onClick={() => onNavigatePage('/admin')}
                className="px-3 py-1.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] hover:bg-[#DBEAFE] font-bold text-xs transition-colors cursor-pointer"
              >
                Go to Admin CRM →
              </button>
            )}

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F1F5F9] text-xs font-medium text-[#334155]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isConfigured ? 'Connected to Firebase' : 'Live Mode'}</span>
            </div>

            <button
              onClick={async () => {
                await logout();
                onNavigatePage('/');
              }}
              className="p-2 text-[#64748B] hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Welcome Banner */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#2563EB] text-xs font-mono font-bold tracking-wider uppercase border border-[#DBEAFE]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Registered Student Candidate</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Welcome, {user?.displayName || profile?.displayName || 'Student'}!
            </h1>
            <p className="text-sm text-[#64748B] max-w-xl">
              Your registration is securely recorded in the Zobly admissions database. Below are your current application details.
            </p>
          </div>

          <button
            onClick={() => onNavigatePage('/')}
            className="px-4 py-2.5 text-xs font-semibold text-[#0F172A] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-xl transition-colors cursor-pointer self-start md:self-auto shrink-0"
          >
            Explore Public Website
          </button>
        </div>

        {/* Enrollment Status Card */}
        {isLoading ? (
          <div className="p-12 text-center bg-white border border-[#E2E8F0] rounded-3xl shadow-xs">
            <RefreshCw className="w-8 h-8 text-[#2563EB] animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#0F172A]">Loading your registration details...</p>
          </div>
        ) : activeEnrollment ? (
          <div className="bg-white border border-[#E2E8F0] rounded-3xl shadow-xs overflow-hidden">
            
            {/* Status Header Bar */}
            <div className="p-6 bg-gradient-to-r from-[#EFF6FF] via-[#DBEAFE]/40 to-white border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-[#2563EB] font-mono uppercase tracking-wider">
                  Registration ID: {activeEnrollment.enrollmentId || activeEnrollment.id}
                </span>
                <h2 className="text-xl font-black text-[#0F172A] mt-0.5">
                  {(activeEnrollment.interestedCourse && TRACK_LABELS[activeEnrollment.interestedCourse]) || activeEnrollment.pathway || activeEnrollment.interestedCourse || 'Career Pathway'}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#64748B]">Status:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {activeEnrollment.status === 'NEW'
                      ? 'Under Admissions Review'
                      : activeEnrollment.status === 'CONTACTED'
                      ? 'Admissions Call Completed'
                      : activeEnrollment.status === 'INTERESTED'
                      ? 'Interest Confirmed'
                      : activeEnrollment.status === 'ENROLLED'
                      ? 'Officially Enrolled'
                      : 'Closed'}
                  </span>
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              
              <div>
                <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-mono">
                  Full Name
                </div>
                <div className="text-base font-bold text-[#0F172A] mt-1">
                  {activeEnrollment.name}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-mono">
                  Email Address
                </div>
                <div className="text-base font-semibold text-[#0F172A] mt-1">
                  {activeEnrollment.email}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-mono">
                  Phone Number
                </div>
                <div className="text-base font-bold text-[#1D4ED8] font-mono mt-1">
                  {activeEnrollment.phone}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-mono">
                  College / University
                </div>
                <div className="text-base font-semibold text-[#0F172A] mt-1">
                  {activeEnrollment.college || '—'}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-mono">
                  Degree & Year
                </div>
                <div className="text-base font-semibold text-[#0F172A] mt-1">
                  {activeEnrollment.degree} ({activeEnrollment.year})
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-mono">
                  Registration Date
                </div>
                <div className="text-base font-semibold text-[#0F172A] mt-1 font-mono">
                  {formatDate(activeEnrollment.createdAt)}
                </div>
              </div>

            </div>

            {/* Next Steps Guidance */}
            <div className="px-6 sm:px-8 pb-8 pt-2">
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#2563EB]" />
                  <span>What happens next in your onboarding?</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-[#E2E8F0]">
                    <div className="font-bold text-[#2563EB] mb-1">1. Admissions Call</div>
                    <p className="text-[#64748B] leading-relaxed">
                      Our advisor calls your mobile number ({activeEnrollment.phone}) to understand your career goals and discuss the 4, 6, or 8-week schedule.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#E2E8F0]">
                    <div className="font-bold text-[#2563EB] mb-1">2. Track Alignment</div>
                    <p className="text-[#64748B] leading-relaxed">
                      Confirm your learning hours and program syllabus tailored to your college graduation timeline.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#E2E8F0]">
                    <div className="font-bold text-[#2563EB] mb-1">3. Formal Enrollment</div>
                    <p className="text-[#64748B] leading-relaxed">
                      Once confirmed, your batch schedule and cohort access will be activated by our team.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 text-center space-y-4 shadow-xs">
            <GraduationCap className="w-12 h-12 text-[#2563EB] mx-auto" />
            <h3 className="text-xl font-bold text-[#0F172A]">Complete Your Course Registration</h3>
            <p className="text-sm text-[#64748B] max-w-md mx-auto">
              You have an active student account, but no program enrollment record has been submitted yet. Register your course interest to connect with an admissions counselor.
            </p>
            <button
              onClick={() => onNavigatePage('/')}
              className="px-6 py-3 rounded-2xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-sm transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore Programs & Apply</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </main>
    </div>
  );
};
