import React, { useMemo } from 'react';
import {
  GraduationCap,
  Users,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  Sparkles,
  Layers,
} from 'lucide-react';
import type { StudentEnrollment } from '../../types/firebase';

interface AdminCoursesViewProps {
  enrollments: StudentEnrollment[];
  onSelectCourseFilter: (courseName: string) => void;
}

interface CourseConfig {
  id: string;
  name: string;
  category: string;
  durations: string;
  description: string;
  badgeColor: string;
}

const PREDEFINED_COURSES: CourseConfig[] = [
  {
    id: 'ai-automation',
    name: 'AI & Business Automation',
    category: 'Flagship Track',
    durations: '4, 6, 8 Weeks',
    description: 'Building autonomous AI agents, workflow automation, and enterprise LLM integrations.',
    badgeColor: 'bg-blue-50 text-[#0080FF] border-blue-200',
  },
  {
    id: 'software-product',
    name: 'Software & Product',
    category: 'Engineering Track',
    durations: '4, 6, 8 Weeks',
    description: 'Full stack web architectures, scalable APIs, database design, and real production sprints.',
    badgeColor: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  },
  {
    id: 'data-bi',
    name: 'Data & BI',
    category: 'Analytics Track',
    durations: '4, 6, 8 Weeks',
    description: 'Data transformation, executive dashboards, predictive modeling, and business intelligence.',
    badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  {
    id: 'fullstack',
    name: 'Full Stack Development',
    category: 'Web Development',
    durations: '6 Weeks',
    description: 'Modern TypeScript, React, Node.js, and cloud backend microservices.',
    badgeColor: 'bg-sky-50 text-sky-600 border-sky-200',
  },
  {
    id: 'analytics',
    name: 'Data Analytics',
    category: 'Business Intelligence',
    durations: '6 Weeks',
    description: 'SQL, Python for analytics, Tableau, and automated reporting pipelines.',
    badgeColor: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    id: 'uiux',
    name: 'UI/UX Design',
    category: 'Design Systems',
    durations: '4 Weeks',
    description: 'Product thinking, user journey mapping, high-fidelity prototypes, and component design.',
    badgeColor: 'bg-amber-50 text-amber-600 border-amber-200',
  },
];

export const AdminCoursesView: React.FC<AdminCoursesViewProps> = ({
  enrollments,
  onSelectCourseFilter,
}) => {
  // Helper to reliably match an enrollment against a course/track definition
  const matchesCourse = (e: StudentEnrollment, courseId: string, courseName: string): boolean => {
    const pathway = (e.pathway || '').toLowerCase();
    const prog = (e.program || '').toLowerCase();
    const ic = (e.interestedCourse || '').toLowerCase();
    const cId = courseId.toLowerCase();
    const cName = courseName.toLowerCase();

    // Direct ID or name match
    if (pathway === cId || pathway === cName) return true;
    if (prog === cName) return true;
    if (ic === cName) return true;

    // Substring checks for formatted course titles like "AI & Business Automation • 6-Weeks Sprint"
    if (ic.includes(cName)) return true;
    if (prog.includes(cName)) return true;

    // Specific slug variations
    if (cId === 'ai-automation' && (pathway.includes('ai') || ic.includes('automation') || ic.includes('agent'))) return true;
    if (cId === 'software-product' && (pathway.includes('software') || ic.includes('software') || pathway.includes('product'))) return true;
    if (cId === 'data-bi' && ((pathway.includes('data') && pathway.includes('bi')) || ic.includes('business intelligence'))) return true;
    if (cId === 'fullstack' && (pathway.includes('full') || ic.includes('full stack') || ic.includes('fullstack'))) return true;
    if (cId === 'analytics' && (pathway.includes('analytics') || (ic.includes('data') && !ic.includes('& bi')))) return true;
    if (cId === 'uiux' && (pathway.includes('ui') || pathway.includes('ux') || ic.includes('design'))) return true;

    return false;
  };

  // Dynamically compute all tracks and discover any custom tracks from live Firestore data
  const { allTracks, topTrack, totalEnrolledCount, totalTrackLeads } = useMemo(() => {
    const assignedEnrollmentIds = new Set<string>();

    const tracks = PREDEFINED_COURSES.map((course) => {
      const matchingEnrollments = enrollments.filter((e) => {
        const isMatch = matchesCourse(e, course.id, course.name);
        const key = e.enrollmentId || e.id;
        if (isMatch && key) {
          assignedEnrollmentIds.add(key);
        }
        return isMatch;
      });

      const totalLeads = matchingEnrollments.length;
      const newCount = matchingEnrollments.filter((e) => e.status === 'NEW').length;
      const contactedCount = matchingEnrollments.filter((e) => e.status === 'CONTACTED').length;
      const interestedCount = matchingEnrollments.filter((e) => e.status === 'INTERESTED').length;
      const enrolledCount = matchingEnrollments.filter((e) => e.status === 'ENROLLED').length;
      const conversionRate = totalLeads > 0 ? Math.round((enrolledCount / totalLeads) * 100) : 0;
      const shareOfTotal = enrollments.length > 0 ? Math.round((totalLeads / enrollments.length) * 100) : 0;

      return {
        ...course,
        totalLeads,
        newCount,
        contactedCount,
        interestedCount,
        enrolledCount,
        conversionRate,
        shareOfTotal,
      };
    });

    // Detect any unassigned custom pathways from live Firestore /enrollments
    const customEnrollments = enrollments.filter((e) => !assignedEnrollmentIds.has(e.enrollmentId || e.id || ''));
    const customPathwayMap = new Map<string, StudentEnrollment[]>();

    customEnrollments.forEach((e) => {
      const pathwayLabel = e.interestedCourse || e.pathway || e.program || 'Other Programs';
      if (!customPathwayMap.has(pathwayLabel)) {
        customPathwayMap.set(pathwayLabel, []);
      }
      customPathwayMap.get(pathwayLabel)!.push(e);
    });

    customPathwayMap.forEach((leadList, pathwayName) => {
      const totalLeads = leadList.length;
      const newCount = leadList.filter((e) => e.status === 'NEW').length;
      const contactedCount = leadList.filter((e) => e.status === 'CONTACTED').length;
      const interestedCount = leadList.filter((e) => e.status === 'INTERESTED').length;
      const enrolledCount = leadList.filter((e) => e.status === 'ENROLLED').length;
      const conversionRate = totalLeads > 0 ? Math.round((enrolledCount / totalLeads) * 100) : 0;
      const shareOfTotal = enrollments.length > 0 ? Math.round((totalLeads / enrollments.length) * 100) : 0;

      tracks.push({
        id: `custom-${pathwayName.toLowerCase().replace(/\s+/g, '-')}`,
        name: pathwayName,
        category: 'Custom Track',
        durations: leadList[0]?.duration || 'Custom Duration',
        description: 'Custom pathway registered dynamically through student applications.',
        badgeColor: 'bg-teal-50 text-teal-600 border-teal-200',
        totalLeads,
        newCount,
        contactedCount,
        interestedCount,
        enrolledCount,
        conversionRate,
        shareOfTotal,
      });
    });

    // Find the track with highest demand
    const sorted = [...tracks].sort((a, b) => b.totalLeads - a.totalLeads);
    const top = sorted[0]?.totalLeads > 0 ? sorted[0] : null;

    const totalEnrolled = enrollments.filter((e) => e.status === 'ENROLLED').length;

    return {
      allTracks: tracks,
      topTrack: top,
      totalEnrolledCount: totalEnrolled,
      totalTrackLeads: enrollments.length,
    };
  }, [enrollments]);

  const overallConversion = totalTrackLeads > 0 ? Math.round((totalEnrolledCount / totalTrackLeads) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Courses & Career Programs
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Real-time applicant demand, enrollments, and conversion analytics computed directly from Firestore.
          </p>
        </div>

        {/* Live Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#0080FF] self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#0080FF] animate-pulse" />
          <span>{`Live Firestore Pipeline (${totalTrackLeads} total leads)`}</span>
        </div>
      </div>

      {/* Aggregate Overview Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-[20px] border border-[#E2E8F0]/80 p-5 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
            <BookOpen className="w-4 h-4 text-[#0080FF]" />
            <span>Active Programs</span>
          </div>
          <div className="text-2xl font-extrabold text-[#0F172A] mt-2">
            {allTracks.length}
          </div>
          <div className="text-[11px] text-[#94A3B8] mt-1">
            {allTracks.filter((t) => t.totalLeads > 0).length} tracks with live applicants
          </div>
        </div>

        <div className="bg-white rounded-[20px] border border-[#E2E8F0]/80 p-5 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
            <Award className="w-4 h-4 text-[#9333EA]" />
            <span>Top Track by Demand</span>
          </div>
          <div className="text-base font-extrabold text-[#0F172A] mt-2 truncate">
            {topTrack ? topTrack.name : 'Awaiting Leads'}
          </div>
          <div className="text-[11px] text-[#9333EA] font-semibold mt-1">
            {topTrack ? `${topTrack.totalLeads} applicants (${topTrack.shareOfTotal}% share)` : '0 applicants'}
          </div>
        </div>

        <div className="bg-white rounded-[20px] border border-[#E2E8F0]/80 p-5 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
            <GraduationCap className="w-4 h-4 text-[#059669]" />
            <span>Total Enrolled Students</span>
          </div>
          <div className="text-2xl font-extrabold text-[#0F172A] mt-2">
            {totalEnrolledCount}
          </div>
          <div className="text-[11px] text-[#059669] font-semibold mt-1">
            Across all verified cohorts
          </div>
        </div>

        <div className="bg-white rounded-[20px] border border-[#E2E8F0]/80 p-5 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
            <TrendingUp className="w-4 h-4 text-[#2563EB]" />
            <span>Overall Conversion Rate</span>
          </div>
          <div className="text-2xl font-extrabold text-[#0F172A] mt-2">
            {overallConversion}%
          </div>
          <div className="text-[11px] text-[#64748B] mt-1">
            Lead-to-enrollment ratio
          </div>
        </div>
      </div>

      {/* Grid of Career Program Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allTracks.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-[22px] border border-[#E2E8F0]/80 p-5 sm:p-6 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] flex flex-col justify-between hover:border-[#BFDBFE] hover:shadow-[0_8px_25px_-5px_rgba(37,99,235,0.08)] transition-all group"
          >
            <div>
              {/* Category Badge & Duration */}
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${course.badgeColor}`}>
                  {course.category}
                </span>
                <span className="text-xs font-semibold text-[#94A3B8] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#94A3B8]" />
                  <span>{course.durations}</span>
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-[#0F172A] mt-3 group-hover:text-[#0080FF] transition-colors">
                {course.name}
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed">
                {course.description}
              </p>

              {/* Demand Share Bar */}
              <div className="mt-4 pt-3 border-t border-[#F8FAFC]">
                <div className="flex items-center justify-between text-[11px] text-[#64748B] font-medium mb-1">
                  <span>Share of Total Inquiries</span>
                  <span className="font-bold text-[#0F172A]">{course.shareOfTotal}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0080FF] to-[#60A5FA] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(course.shareOfTotal, course.totalLeads > 0 ? 5 : 0))}%` }}
                  />
                </div>
              </div>

              {/* Dynamic Metric Counters */}
              <div className="grid grid-cols-4 gap-1.5 mt-4 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80 text-center">
                <div>
                  <div className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">Total</div>
                  <div className="text-sm font-extrabold text-[#0F172A] mt-0.5">{course.totalLeads}</div>
                </div>
                <div>
                  <div className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">Contacted</div>
                  <div className="text-sm font-extrabold text-[#7C3AED] mt-0.5">{course.contactedCount}</div>
                </div>
                <div>
                  <div className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">Interested</div>
                  <div className="text-sm font-extrabold text-[#D97706] mt-0.5">{course.interestedCount}</div>
                </div>
                <div>
                  <div className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">Enrolled</div>
                  <div className="text-sm font-extrabold text-[#059669] mt-0.5">{course.enrolledCount}</div>
                </div>
              </div>
            </div>

            {/* View registrations link */}
            <div className="mt-5 pt-3 border-t border-[#F1F5F9]">
              <button
                onClick={() => onSelectCourseFilter(course.name)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#0080FF] hover:text-[#0070E0] cursor-pointer group-hover:translate-x-0.5 transition-transform"
              >
                <span>Filter Registrations for {course.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
