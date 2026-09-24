import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  ArrowRight,
  LayoutGrid,
  List,
  Building,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import type { StudentEnrollment } from '../../types/firebase';

interface AdminStudentsViewProps {
  enrollments: StudentEnrollment[];
  onViewStudent: (student: StudentEnrollment) => void;
}

export const AdminStudentsView: React.FC<AdminStudentsViewProps> = ({
  enrollments,
  onViewStudent,
}) => {
  const [search, setSearch] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('ALL');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'recent' | 'name_asc' | 'name_desc' | 'tracks'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = viewMode === 'grid' ? 12 : 15;

  // Group enrollments by student email or studentId
  const uniqueStudents = useMemo(() => {
    const map = new Map<string, {
      studentId: string;
      name: string;
      email: string;
      phone: string;
      college: string;
      degree: string;
      year: string;
      courses: string[];
      latestEnrollment: StudentEnrollment;
      enrollmentCount: number;
    }>();

    enrollments.forEach((e) => {
      const key = (e.email ? e.email.toLowerCase() : e.studentId) || 'unknown';
      if (!map.has(key)) {
        map.set(key, {
          studentId: e.studentId || e.id || 'unknown',
          name: e.name || 'Anonymous Student',
          email: e.email || '',
          phone: e.phone || '',
          college: e.college || '',
          degree: e.degree || '',
          year: e.year || '',
          courses: e.interestedCourse ? [e.interestedCourse] : [e.pathway || 'Enrolled Program'],
          latestEnrollment: e,
          enrollmentCount: 1,
        });
      } else {
        const existing = map.get(key)!;
        existing.enrollmentCount += 1;
        const courseName = e.interestedCourse || e.pathway;
        if (courseName && !existing.courses.includes(courseName)) {
          existing.courses.push(courseName);
        }
      }
    });

    return Array.from(map.values());
  }, [enrollments]);

  // Derived filter options
  const uniqueColleges = useMemo(() => {
    const set = new Set<string>();
    uniqueStudents.forEach((s) => {
      if (s.college && s.college.trim()) set.add(s.college.trim());
    });
    return Array.from(set).sort();
  }, [uniqueStudents]);

  const uniqueCourses = useMemo(() => {
    const set = new Set<string>();
    uniqueStudents.forEach((s) => {
      s.courses.forEach((c) => {
        if (c && c.trim()) set.add(c.trim());
      });
    });
    return Array.from(set).sort();
  }, [uniqueStudents]);

  // Filtered & sorted student list
  const filteredStudents = useMemo(() => {
    const q = search.toLowerCase();
    const list = uniqueStudents.filter((s) => {
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.college.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q);

      const matchesCollege = collegeFilter === 'ALL' || s.college === collegeFilter;

      const matchesCourse =
        courseFilter === 'ALL' ||
        s.courses.some((c) => c.toLowerCase().includes(courseFilter.toLowerCase()));

      return matchesSearch && matchesCollege && matchesCourse;
    });

    return list.sort((a, b) => {
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name_desc') return b.name.localeCompare(a.name);
      if (sortBy === 'tracks') return b.enrollmentCount - a.enrollmentCount;
      // Default: recent (by latest enrollment createdAt)
      const dateA = a.latestEnrollment?.createdAt ? new Date(a.latestEnrollment.createdAt as any).getTime() : 0;
      const dateB = b.latestEnrollment?.createdAt ? new Date(b.latestEnrollment.createdAt as any).getTime() : 0;
      return dateB - dateA;
    });
  }, [uniqueStudents, search, collegeFilter, courseFilter, sortBy]);

  const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const avatarGradients = [
    'from-[#0080FF] to-[#2563EB]',
    'from-[#0D9488] to-[#059669]',
    'from-[#7C3AED] to-[#6D28D9]',
    'from-[#EA580C] to-[#C2410C]',
    'from-[#0284C7] to-[#0369A1]',
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Student Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Browse and manage unique registered learners across all Zobly cohorts.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-white p-1 rounded-xl border border-[#E2E8F0] shadow-2xs">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-[#0080FF] text-white shadow-2xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'table'
                ? 'bg-[#0080FF] text-white shadow-2xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Table</span>
          </button>
        </div>
      </div>

      {/* Directory Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white rounded-2xl border border-[#E2E8F0]/80 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0080FF] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-[#0F172A]">{uniqueStudents.length}</div>
            <div className="text-xs text-[#64748B] font-medium">Total Unique Learners</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0]/80 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-[#0F172A]">{uniqueColleges.length}</div>
            <div className="text-xs text-[#64748B] font-medium">Universities & Colleges</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0]/80 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-[#0F172A]">{uniqueCourses.length}</div>
            <div className="text-xs text-[#64748B] font-medium">Enrolled Career Tracks</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-[22px] border border-[#E2E8F0]/80 p-5 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search student, email, college..."
              className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#0080FF]"
            />
          </div>

          {/* College Filter */}
          <select
            value={collegeFilter}
            onChange={(e) => {
              setCollegeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:border-[#0080FF] cursor-pointer"
          >
            <option value="ALL">All Colleges ({uniqueColleges.length})</option>
            {uniqueColleges.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>

          {/* Track Filter */}
          <select
            value={courseFilter}
            onChange={(e) => {
              setCourseFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:border-[#0080FF] cursor-pointer"
          >
            <option value="ALL">All Programs ({uniqueCourses.length})</option>
            {uniqueCourses.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as any);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:border-[#0080FF] cursor-pointer"
          >
            <option value="recent">Sort: Most Recent</option>
            <option value="name_asc">Sort: Name (A → Z)</option>
            <option value="name_desc">Sort: Name (Z → A)</option>
            <option value="tracks">Sort: Most Enrollments</option>
          </select>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between pt-2 border-t border-[#F8FAFC] text-xs text-[#64748B]">
          <div>
            Showing <span className="font-bold text-[#0F172A]">{filteredStudents.length}</span> of {uniqueStudents.length} learners
          </div>
          {(search || collegeFilter !== 'ALL' || courseFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearch('');
                setCollegeFilter('ALL');
                setCourseFilter('ALL');
                setCurrentPage(1);
              }}
              className="inline-flex items-center gap-1 text-[#0080FF] hover:underline font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Main View: Grid or Table */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-[#E2E8F0] p-8">
              <Users className="w-10 h-10 text-[#94A3B8] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#475569]">No students match your query</p>
              <p className="text-xs text-[#94A3B8] mt-0.5">Try resetting search keywords or filters</p>
            </div>
          ) : (
            paginatedStudents.map((s, idx) => {
              const grad = avatarGradients[idx % avatarGradients.length];
              return (
                <div
                  key={s.email || s.studentId}
                  onClick={() => onViewStudent(s.latestEnrollment)}
                  className="bg-white rounded-[22px] border border-[#E2E8F0]/80 p-5 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_25px_-5px_rgba(37,99,235,0.08)] hover:border-[#BFDBFE] transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${grad} text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0`}>
                        {(s.name || 'S').slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#0080FF] transition-colors truncate">
                          {s.name}
                        </h3>
                        <a
                          href={`mailto:${s.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-[#64748B] hover:text-[#0080FF] hover:underline truncate block mt-0.5"
                        >
                          {s.email}
                        </a>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F8FAFC] space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-[#475569]">
                        <GraduationCap className="w-3.5 h-3.5 text-[#0080FF] shrink-0" />
                        <span className="truncate">{s.college || 'College not specified'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#64748B]">
                        <Phone className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                        {s.phone ? (
                          <a
                            href={`tel:${s.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-[#0080FF] hover:underline"
                          >
                            {s.phone}
                          </a>
                        ) : (
                          <span>No phone</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {s.courses.map((c) => (
                        <span
                          key={c}
                          className="px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1D4ED8] text-[10px] font-semibold"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#0080FF] font-semibold">
                    <span>View Profile & History</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-[22px] border border-[#E2E8F0]/80 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="border-b border-[#F1F5F9] bg-[#F8FAFC]/60 text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Student</th>
                  <th className="py-3.5 px-3">Contact</th>
                  <th className="py-3.5 px-3">College / University</th>
                  <th className="py-3.5 px-3">Enrolled Tracks</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8FAFC]">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-xs text-[#94A3B8]">
                      No students found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedStudents.map((s, idx) => {
                    const grad = avatarGradients[idx % avatarGradients.length];
                    return (
                      <tr
                        key={s.email || s.studentId}
                        onClick={() => onViewStudent(s.latestEnrollment)}
                        className="hover:bg-[#F8FAFC]/90 transition-colors group cursor-pointer"
                      >
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${grad} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}>
                              {(s.name || 'S').slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#0080FF] transition-colors truncate">
                                {s.name}
                              </div>
                              <div className="text-[11px] text-[#64748B] truncate">
                                {s.degree ? `${s.degree} ${s.year ? `• ${s.year}` : ''}` : s.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-xs" onClick={(e) => e.stopPropagation()}>
                          <a href={`mailto:${s.email}`} className="text-[#0080FF] hover:underline block truncate max-w-[160px]">
                            {s.email}
                          </a>
                          <div className="text-[11px] text-[#64748B] mt-0.5">{s.phone || '—'}</div>
                        </td>

                        <td className="py-3.5 px-3 text-xs text-[#475569] font-medium max-w-[180px] truncate">
                          {s.college || '—'}
                        </td>

                        <td className="py-3.5 px-3 text-xs">
                          <div className="flex flex-wrap gap-1 max-w-[220px]">
                            {s.courses.slice(0, 2).map((c) => (
                              <span key={c} className="px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1D4ED8] text-[10px] font-semibold truncate max-w-[150px]">
                                {c}
                              </span>
                            ))}
                            {s.courses.length > 2 && (
                              <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                                +{s.courses.length - 2}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => onViewStudent(s.latestEnrollment)}
                            className="px-3 py-1 bg-white border border-[#E2E8F0] hover:border-[#0080FF] hover:text-[#0080FF] text-[#0F172A] text-xs font-semibold rounded-lg transition-colors shadow-2xs cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] shadow-2xs">
          <div>
            Page <span className="font-bold text-[#0F172A]">{currentPage}</span> of {totalPages}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] disabled:opacity-50 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
