import React, { useState } from 'react';
import {
  Users,
  ArrowRight,
  MoreVertical,
  Eye,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import type { StudentEnrollment, RegistrationStatus } from '../../types/firebase';
import { ConfirmModal } from '../common/ConfirmModal';

interface AdminRecentRegistrationsTableProps {
  enrollments: StudentEnrollment[];
  onViewStudent: (student: StudentEnrollment) => void;
  onViewAll: () => void;
  onQuickUpdateStatus?: (studentId: string, status: RegistrationStatus) => void;
  onDeleteEnrollment?: (enrollmentId: string) => void;
}

export const AdminRecentRegistrationsTable: React.FC<AdminRecentRegistrationsTableProps> = ({
  enrollments,
  onViewStudent,
  onViewAll,
  onQuickUpdateStatus,
  onDeleteEnrollment,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Avatar colors rotation
  const avatarColors = [
    'bg-[#2563EB] text-white',
    'bg-[#0284C7] text-white',
    'bg-[#0D9488] text-white',
    'bg-[#7C3AED] text-white',
    'bg-[#4F46E5] text-white',
    'bg-[#059669] text-white',
  ];

  const getInitials = (name: string) => {
    if (!name) return 'ST';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
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

  const recentList = enrollments.slice(0, 6);

  return (
    <div className="bg-white rounded-[22px] border border-[#E2E8F0]/80 p-5 sm:p-6 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#0080FF] flex items-center justify-center shrink-0">
            <Users className="w-4.5 h-4.5" />
          </div>
          <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
            Recent Registrations
          </h2>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-[#0080FF] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View all registrations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto mt-2 -mx-5 sm:mx-0">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-3">Student</th>
              <th className="py-3 px-3">College</th>
              <th className="py-3 px-3">Education</th>
              <th className="py-3 px-3">Interested Course</th>
              <th className="py-3 px-3">Registered</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F8FAFC]">
            {recentList.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-xs text-[#94A3B8]">
                  No registrations recorded yet.
                </td>
              </tr>
            ) : (
              recentList.map((item, idx) => {
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
                    <td className="py-3 px-4 sm:px-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full ${colorClass} flex items-center justify-center font-bold text-[11px] shrink-0 shadow-2xs`}
                        >
                          {getInitials(item.name)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#0080FF] transition-colors truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[#64748B] truncate">
                            {item.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* College */}
                    <td className="py-3 px-3 text-xs text-[#475569] font-medium max-w-[140px] truncate">
                      {item.college || '—'}
                    </td>

                    {/* Education */}
                    <td className="py-3 px-3 text-xs">
                      <div className="font-semibold text-[#0F172A]">{item.degree || 'B.Tech'}</div>
                      <div className="text-[11px] text-[#94A3B8]">{item.year ? `${item.year}` : 'Student'}</div>
                    </td>

                    {/* Interested Course */}
                    <td className="py-3 px-3 text-xs text-[#0F172A] font-medium max-w-[160px] truncate">
                      {item.interestedCourse}
                    </td>

                    {/* Registered Date & Time */}
                    <td className="py-3 px-3 text-xs">
                      <div className="font-medium text-[#0F172A]">{date}</div>
                      <div className="text-[11px] text-[#94A3B8] font-mono">{time}</div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
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

                        {/* Dropdown Menu */}
                        {activeMenuId === rowId && (
                          <div className="absolute right-0 top-8 w-44 bg-white border border-[#E2E8F0] rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100 text-left">
                            <button
                              onClick={() => {
                                onViewStudent(item);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-1.5 text-xs text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-2"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#0080FF]" />
                              <span>View Details</span>
                            </button>
                            {onQuickUpdateStatus && item.enrollmentId && (
                              <button
                                onClick={() => {
                                  onQuickUpdateStatus(item.enrollmentId!, 'CONTACTED');
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 text-xs text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-2"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]" />
                                <span>Mark Contacted</span>
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

      {/* Confirmation Dialog for Record Deletion */}
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
