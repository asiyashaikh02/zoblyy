import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Users,
  Download,
  MoreVertical,
  Eye,
  CheckCircle2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Plus,
  ArrowUpDown,
  X,
  RotateCcw,
} from 'lucide-react';
import type { StudentEnrollment, RegistrationStatus } from '../../types/firebase';
import { ConfirmModal } from '../common/ConfirmModal';

interface AdminRegistrationsViewProps {
  enrollments: StudentEnrollment[];
  onViewStudent: (student: StudentEnrollment) => void;
  onAddNewRegistration: () => void;
  onQuickUpdateStatus?: (enrollmentId: string, status: RegistrationStatus) => void;
  onDeleteEnrollment?: (enrollmentId: string) => void;
  initialStatusFilter?: 'ALL' | RegistrationStatus;
  initialCourseFilter?: string;
}

export const AdminRegistrationsView: React.FC<AdminRegistrationsViewProps> = ({
  enrollments,
  onViewStudent,
  onAddNewRegistration,
  onQuickUpdateStatus,
  onDeleteEnrollment,
  initialStatusFilter = 'ALL',
  initialCourseFilter = 'ALL',
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | RegistrationStatus>(initialStatusFilter);
  const [courseFilter, setCourseFilter] = useState(initialCourseFilter);
  const [collegeFilter, setCollegeFilter] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name_asc' | 'name_desc' | 'status'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sync state if initial props change
  React.useEffect(() => {
    if (initialStatusFilter) setStatusFilter(initialStatusFilter);
  }, [initialStatusFilter]);

  React.useEffect(() => {
    if (initialCourseFilter) setCourseFilter(initialCourseFilter);
  }, [initialCourseFilter]);

  // Extract unique courses and pathways from live data
  const availableCourses = useMemo(() => {
    const set = new Set<string>();
    enrollments.forEach((e) => {
      if (e.interestedCourse) set.add(e.interestedCourse);
      if (e.program && !set.has(e.program)) set.add(e.program);
      if (e.pathway && !set.has(e.pathway)) set.add(e.pathway);
    });
    return Array.from(set).sort();
  }, [enrollments]);

  // Parse item date for sorting
  const parseDate = (item: StudentEnrollment): number => {
    if (!item.createdAt) return 0;
    if (typeof (item.createdAt as any).toDate === 'function') {
      return (item.createdAt as any).toDate().getTime();
    }
    if ((item.createdAt as any).seconds) {
      return (item.createdAt as any).seconds * 1000;
    }
    const d = new Date(item.createdAt as any).getTime();
    return isNaN(d) ? 0 : d;
  };

  // Filtered & sorted registrations computed strictly from live enrollments
  const filteredList = useMemo(() => {
    const list = enrollments.filter((item) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        (item.name || '').toLowerCase().includes(q) ||
        (item.email || '').toLowerCase().includes(q) ||
        (item.phone || '').toLowerCase().includes(q) ||
        (item.college || '').toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

      const matchesCourse =
        courseFilter === 'ALL' ||
        item.interestedCourse === courseFilter ||
        (item.interestedCourse && item.interestedCourse.toLowerCase().includes(courseFilter.toLowerCase())) ||
        (item.pathway && item.pathway.toLowerCase().includes(courseFilter.toLowerCase())) ||
        (item.program && item.program.toLowerCase().includes(courseFilter.toLowerCase()));

      const matchesCollege = !collegeFilter || (item.college || '').toLowerCase().includes(collegeFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesCourse && matchesCollege;
    });

    return list.sort((a, b) => {
      if (sortBy === 'newest') return parseDate(b) - parseDate(a);
      if (sortBy === 'oldest') return parseDate(a) - parseDate(b);
      if (sortBy === 'name_asc') return (a.name || '').localeCompare(b.name || '');
      if (sortBy === 'name_desc') return (b.name || '').localeCompare(a.name || '');
      if (sortBy === 'status') return (a.status || '').localeCompare(b.status || '');
      return 0;
    });
  }, [enrollments, search, statusFilter, courseFilter, collegeFilter, sortBy]);

  const totalPages = Math.ceil(filteredList.length / pageSize) || 1;
  const paginatedList = filteredList.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getStatusBadge = (status: RegistrationStatus) => {
    switch (status) {
      case 'NEW':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E0F2FE] text-[#0284C7] tracking-wider uppercase">
            NEW
          </span>
        );
      case 'CONTACTED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EDE9FE] text-[#7C3AED] tracking-wider uppercase">
            CONTACTED
          </span>
        );
      case 'INTERESTED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#D97706] tracking-wider uppercase">
            INTERESTED
          </span>
        );
      case 'ENROLLED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D1FAE5] text-[#059669] tracking-wider uppercase">
            ENROLLED
          </span>
        );
      case 'NOT_INTERESTED':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F1F5F9] text-[#64748B] tracking-wider uppercase">
            NOT INTERESTED
          </span>
        );
    }
  };

  const formatDateTime = (timestamp: any) => {
    if (!timestamp) return { date: 'Recent', time: '—' };
    const d = timestamp.toDate 
      ? timestamp.toDate() 
      : timestamp.seconds 
      ? new Date(timestamp.seconds * 1000) 
      : new Date(timestamp);
    
    const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return { date: dateStr, time: timeStr };
  };

  const avatarColors = [
    'bg-[#2563EB] text-white',
    'bg-[#0284C7] text-white',
    'bg-[#0D9488] text-white',
    'bg-[#7C3AED] text-white',
    'bg-[#4F46E5] text-white',
  ];

  const exportCSV = () => {
    if (filteredList.length === 0) return;
    const headers = ['Name', 'Email', 'Phone', 'College', 'Degree', 'Year', 'Course', 'Status', 'Notes'];
    const rows = filteredList.map((e) => [
      `"${e.name || ''}"`,
      `"${e.email || ''}"`,
      `"${e.phone || ''}"`,
      `"${e.college || ''}"`,
      `"${e.degree || ''}"`,
      `"${e.year || ''}"`,
      `"${e.interestedCourse || ''}"`,
      `"${e.status || 'NEW'}"`,
      `"${(e.adminNotes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `zobly_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Registrations
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Manage student registrations and admissions follow-ups.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#475569] shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onAddNewRegistration}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0080FF] hover:bg-[#0070E0] text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Registration</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar Card */}
      <div className="bg-white rounded-[22px] border border-[#E2E8F0]/80 p-5 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
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
              placeholder="Search student or email..."
              className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#0080FF]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:border-[#0080FF] cursor-pointer"
          >
            <option value="ALL">{`All Statuses (${enrollments.length})`}</option>
            <option value="NEW">{`NEW (${enrollments.filter((e) => e.status === 'NEW').length})`}</option>
            <option value="CONTACTED">{`CONTACTED (${enrollments.filter((e) => e.status === 'CONTACTED').length})`}</option>
            <option value="INTERESTED">{`INTERESTED (${enrollments.filter((e) => e.status === 'INTERESTED').length})`}</option>
            <option value="ENROLLED">{`ENROLLED (${enrollments.filter((e) => e.status === 'ENROLLED').length})`}</option>
            <option value="NOT_INTERESTED">{`NOT_INTERESTED (${enrollments.filter((e) => e.status === 'NOT_INTERESTED').length})`}</option>
          </select>

          {/* Course Filter */}
          <select
            value={courseFilter}
            onChange={(e) => {
              setCourseFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:border-[#0080FF] cursor-pointer"
          >
            <option value="ALL">All Courses</option>
            {availableCourses.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* College Filter */}
          <input
            type="text"
            value={collegeFilter}
            onChange={(e) => {
              setCollegeFilter(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Filter by college..."
            className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#0080FF]"
          />

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:border-[#0080FF] cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="name_asc">Sort: Name (A → Z)</option>
              <option value="name_desc">Sort: Name (Z → A)</option>
              <option value="status">Sort: Status</option>
            </select>
          </div>
        </div>

        {/* Results summary & Active filter indicators */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F8FAFC] text-xs text-[#64748B]">
          <div className="flex flex-wrap items-center gap-2">
            <span>
              Showing <span className="font-bold text-[#0F172A]">{filteredList.length}</span> of {enrollments.length} enrollments
            </span>

            {/* Active Filter Chips */}
            {statusFilter !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0080FF] text-[11px] font-semibold border border-blue-200">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter('ALL')} className="hover:text-blue-900 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {courseFilter !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-semibold border border-purple-200">
                Course: {courseFilter}
                <button onClick={() => setCourseFilter('ALL')} className="hover:text-purple-900 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {collegeFilter && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200">
                College: {collegeFilter}
                <button onClick={() => setCollegeFilter('')} className="hover:text-slate-900 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {search && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-semibold border border-amber-200">
                Query: "{search}"
                <button onClick={() => setSearch('')} className="hover:text-amber-900 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {(search || statusFilter !== 'ALL' || courseFilter !== 'ALL' || collegeFilter) && (
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('ALL');
                setCourseFilter('ALL');
                setCollegeFilter('');
                setCurrentPage(1);
              }}
              className="inline-flex items-center gap-1 text-[#0080FF] hover:underline font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[22px] border border-[#E2E8F0]/80 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="border-b border-[#F1F5F9] bg-[#F8FAFC]/60 text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Student</th>
                <th className="py-3.5 px-3">Contact</th>
                <th className="py-3.5 px-3">College</th>
                <th className="py-3.5 px-3">Education</th>
                <th className="py-3.5 px-3">Interested Course</th>
                <th className="py-3.5 px-3">Registered</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8FAFC]">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-xs text-[#94A3B8]">
                    <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-slate-600 text-sm">No registrations found</p>
                    <p className="mt-1">Try adjusting your filters or search keywords</p>
                    {(search || statusFilter !== 'ALL' || courseFilter !== 'ALL' || collegeFilter) && (
                      <button
                        onClick={() => {
                          setSearch('');
                          setStatusFilter('ALL');
                          setCourseFilter('ALL');
                          setCollegeFilter('');
                          setCurrentPage(1);
                        }}
                        className="mt-3 px-3.5 py-1.5 bg-[#EFF6FF] text-[#0080FF] hover:bg-[#DBEAFE] rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Clear Filters
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedList.map((item, idx) => {
                  const { date, time } = formatDateTime(item.createdAt);
                  const colorClass = avatarColors[idx % avatarColors.length];
                  const rowId = item.enrollmentId || item.id || `idx-${idx}`;

                  return (
                    <tr
                      key={rowId}
                      className="hover:bg-[#F8FAFC]/90 transition-colors group cursor-pointer"
                      onClick={() => onViewStudent(item)}
                    >
                      {/* Student */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full ${colorClass} flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}
                          >
                            {(item.name || 'S').slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#0080FF] transition-colors truncate">
                              {item.name}
                            </div>
                            <a
                              href={`mailto:${item.email}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-[11px] text-[#64748B] hover:text-[#0080FF] hover:underline truncate block"
                            >
                              {item.email}
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-3 text-xs" onClick={(e) => e.stopPropagation()}>
                        {item.phone ? (
                          <a
                            href={`tel:${item.phone}`}
                            className="text-[#0F172A] hover:text-[#0080FF] font-medium flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3 text-[#94A3B8]" />
                            <span>{item.phone}</span>
                          </a>
                        ) : (
                          <span className="text-[#94A3B8]">—</span>
                        )}
                      </td>

                      {/* College */}
                      <td className="py-3.5 px-3 text-xs text-[#475569] font-medium max-w-[150px] truncate">
                        {item.college || '—'}
                      </td>

                      {/* Education */}
                      <td className="py-3.5 px-3 text-xs">
                        <div className="font-semibold text-[#0F172A]">{item.degree || 'B.Tech'}</div>
                        <div className="text-[11px] text-[#94A3B8]">{item.year || 'Student'}</div>
                      </td>

                      {/* Course */}
                      <td className="py-3.5 px-3 text-xs text-[#0F172A] font-medium max-w-[180px] truncate">
                        {item.interestedCourse}
                      </td>

                      {/* Registered Date & Time */}
                      <td className="py-3.5 px-3 text-xs">
                        <div className="font-medium text-[#0F172A]">{date}</div>
                        <div className="text-[11px] text-[#94A3B8] font-mono">{time}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        {getStatusBadge(item.status)}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5 relative">
                          <button
                            onClick={() => onViewStudent(item)}
                            className="px-3 py-1 bg-white border border-[#E2E8F0] hover:border-[#0080FF] hover:text-[#0080FF] text-[#0F172A] text-xs font-semibold rounded-lg transition-colors shadow-2xs cursor-pointer"
                          >
                            View
                          </button>

                          <button
                            onClick={() => setActiveMenuId(activeMenuId === rowId ? null : rowId)}
                            className="p-1 text-[#94A3B8] hover:text-[#0F172A] rounded-lg hover:bg-[#F1F5F9] cursor-pointer"
                            aria-label="More options"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuId === rowId && (
                            <div className="absolute right-0 top-8 w-44 bg-white border border-[#E2E8F0] rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100 text-left">
                              <button
                                onClick={() => {
                                  onViewStudent(item);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 text-xs text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-2 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-[#0080FF]" />
                                <span>View Details</span>
                              </button>
                              {onQuickUpdateStatus && item.enrollmentId && (
                                <button
                                  onClick={() => {
                                    onQuickUpdateStatus(item.enrollmentId!, 'ENROLLED');
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-2 cursor-pointer"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Mark Enrolled</span>
                                </button>
                              )}
                              {onDeleteEnrollment && item.enrollmentId && (
                                <button
                                  onClick={() => {
                                    setDeleteTarget({ id: item.enrollmentId!, name: item.name || 'this student' });
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete Record</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 bg-[#F8FAFC] border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
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

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Registration Record"
        message={`Are you sure you want to permanently delete the registration record for "${deleteTarget?.name}"? This action removes the student enrollment record from Firestore.`}
        confirmLabel="Delete Record"
        cancelLabel="Keep Record"
        isDestructive={true}
        isLoading={isDeleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (!deleteTarget || !onDeleteEnrollment) return;
          setIsDeleting(true);
          try {
            await onDeleteEnrollment(deleteTarget.id);
            setDeleteTarget(null);
          } finally {
            setIsDeleting(false);
          }
        }}
      />
    </div>
  );
};
