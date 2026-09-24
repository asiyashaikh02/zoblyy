import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  BookOpen,
  Edit3,
  CheckCircle2,
  Save,
  RefreshCw,
  Clock,
  Shield,
  Trash2,
  Target,
  Sparkles,
  MapPin,
  Tag,
} from 'lucide-react';
import type { StudentEnrollment, RegistrationStatus } from '../../types/firebase';
import { ConfirmModal } from '../common/ConfirmModal';

interface AdminStudentDetailDrawerProps {
  student: StudentEnrollment | null;
  onClose: () => void;
  onSaveFollowUp: (enrollmentId: string, status: RegistrationStatus, adminNotes: string) => Promise<void>;
  onDeleteEnrollment?: (enrollmentId: string) => Promise<void>;
}

export const AdminStudentDetailDrawer: React.FC<AdminStudentDetailDrawerProps> = ({
  student,
  onClose,
  onSaveFollowUp,
  onDeleteEnrollment,
}) => {
  const [status, setStatus] = useState<RegistrationStatus>(student?.status || 'NEW');
  const [adminNotes, setAdminNotes] = useState(student?.adminNotes || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    if (student) {
      setStatus(student.status || 'NEW');
      setAdminNotes(student.adminNotes || '');
      setSaveSuccess(false);
    }
  }, [student]);

  if (!student) return null;

  const handleSave = async () => {
    if (!student.enrollmentId) return;
    setIsSaving(true);
    try {
      await onSaveFollowUp(student.enrollmentId, status, adminNotes);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.warn('Notice saving follow-up:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!student.enrollmentId || !onDeleteEnrollment) return;
    setIsDeleting(true);
    try {
      await onDeleteEnrollment(student.enrollmentId);
      setIsConfirmDeleteOpen(false);
      onClose();
    } catch (err) {
      console.warn('Notice deleting registration:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    const d = timestamp.toDate 
      ? timestamp.toDate() 
      : timestamp.seconds 
      ? new Date(timestamp.seconds * 1000) 
      : new Date(timestamp);
    return d.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-gradient-to-r from-[#F8FAFC] to-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0080FF] to-[#2563EB] text-white flex items-center justify-center font-bold text-base shadow-sm">
              {(student.name || 'S').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
                {student.name}
              </h2>
              <div className="text-xs text-[#64748B] flex items-center gap-1.5 mt-0.5">
                <span>Registration Details</span>
                <span>•</span>
                <span className="font-mono text-[#94A3B8]">ID: {student.enrollmentId?.slice(0, 8)}...</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-xl transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* SECTION 1: STUDENT */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#0080FF]" />
              <span>Student Information</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
                <div className="text-[11px] font-medium text-[#64748B]">Full Name</div>
                <div className="text-sm font-bold text-[#0F172A] mt-0.5">{student.name}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
                <div className="text-[11px] font-medium text-[#64748B]">Phone Number</div>
                <a
                  href={`tel:${student.phone}`}
                  className="text-sm font-semibold text-[#0080FF] hover:underline mt-0.5 flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{student.phone || 'Not provided'}</span>
                </a>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80 sm:col-span-2">
                <div className="text-[11px] font-medium text-[#64748B]">Email Address</div>
                <a
                  href={`mailto:${student.email}`}
                  className="text-sm font-semibold text-[#0080FF] hover:underline mt-0.5 flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{student.email}</span>
                </a>
              </div>
              {student.city && (
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80 sm:col-span-2">
                  <div className="text-[11px] font-medium text-[#64748B] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#0080FF]" />
                    <span>City</span>
                  </div>
                  <div className="text-sm font-semibold text-[#0F172A] mt-0.5">{student.city}</div>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 2: EDUCATION */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#0080FF]" />
              <span>Education</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80 sm:col-span-2">
                <div className="text-[11px] font-medium text-[#64748B]">College / University</div>
                <div className="text-sm font-bold text-[#0F172A] mt-0.5">
                  {student.college || 'Not specified'}
                </div>
              </div>
              {student.educationStatus && (
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80 sm:col-span-2">
                  <div className="text-[11px] font-medium text-[#64748B]">Education Status</div>
                  <div className="text-sm font-semibold text-[#0F172A] mt-0.5">{student.educationStatus}</div>
                </div>
              )}
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
                <div className="text-[11px] font-medium text-[#64748B]">Degree / Branch</div>
                <div className="text-sm font-semibold text-[#0F172A] mt-0.5">
                  {student.degree || 'B.Tech'}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
                <div className="text-[11px] font-medium text-[#64748B]">Current Year</div>
                <div className="text-sm font-semibold text-[#0F172A] mt-0.5">
                  {student.year || '3rd Year'}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: PATHWAY & PROGRAM SELECTION */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#0080FF]" />
              <span>Pathway & Program</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#EFF6FF]/60 border border-[#BFDBFE] space-y-2">
              <div>
                <div className="text-[11px] font-medium text-[#1D4ED8]">Selected Program & Course</div>
                <div className="text-sm font-bold text-[#0F172A] mt-0.5">
                  {student.interestedCourse || `${student.pathway || 'Track'} • ${student.program || student.duration || ''}`}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-blue-200/60 text-xs">
                {student.pathway && (
                  <div>
                    <span className="text-[#64748B] block text-[10px]">Pathway:</span>
                    <span className="font-semibold text-[#1E293B]">{student.pathway}</span>
                  </div>
                )}
                {student.duration && (
                  <div>
                    <span className="text-[#64748B] block text-[10px]">Duration:</span>
                    <span className="font-semibold text-[#1E293B]">{student.duration}</span>
                  </div>
                )}
                {student.price && (
                  <div>
                    <span className="text-[#64748B] block text-[10px]">Price:</span>
                    <span className="font-semibold text-[#1E293B]">{student.price}</span>
                  </div>
                )}
                {student.totalHours ? (
                  <div>
                    <span className="text-[#64748B] block text-[10px]">Total Hours:</span>
                    <span className="font-semibold text-[#1E293B]">{student.totalHours} hrs</span>
                  </div>
                ) : null}
              </div>

              {student.careerInterest && (
                <div className="text-xs text-[#475569] mt-2 pt-2 border-t border-blue-200/60">
                  <span className="font-semibold text-[#1E293B]">Career Goal:</span> {student.careerInterest}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 4: SKILLS & CURRENT LEVEL */}
          {((student.skills && student.skills.length > 0) || student.skillLevel) && (
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0080FF]" />
                <span>Skills & Background</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80 space-y-2">
                {student.skillLevel && (
                  <div className="text-xs">
                    <span className="text-[#64748B]">Self-Assessed Skill Level: </span>
                    <span className="font-bold text-[#0F172A]">{student.skillLevel}</span>
                  </div>
                )}
                {student.skills && student.skills.length > 0 && (
                  <div>
                    <span className="text-[10px] text-[#64748B] block mb-1.5 font-medium">Current Tools & Skills:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {student.skills.map((sk, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded-md bg-white border border-[#CBD5E1] text-[11px] font-semibold text-[#334155]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 5: CAREER GOALS & TARGET SKILLS */}
          {((student.goals && student.goals.length > 0) || (student.targetSkills && student.targetSkills.length > 0) || student.additionalGoal) && (
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#0080FF]" />
                <span>Goals & Target Skills</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80 space-y-2.5">
                {student.goals && student.goals.length > 0 && (
                  <div>
                    <span className="text-[10px] text-[#64748B] block mb-1 font-medium">Selected Goals:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {student.goals.map((g, gIdx) => (
                        <span key={gIdx} className="px-2 py-0.5 rounded-md bg-[#EFF6FF] border border-[#BFDBFE] text-[11px] font-semibold text-[#1D4ED8]">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {student.targetSkills && student.targetSkills.length > 0 && (
                  <div>
                    <span className="text-[10px] text-[#64748B] block mb-1 font-medium">Target Skills to Master:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {student.targetSkills.map((ts, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded-md bg-[#FAF5FF] border border-[#E9D5FF] text-[11px] font-semibold text-[#7C3AED]">
                          {ts}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {student.additionalGoal && (
                  <div className="pt-1.5 border-t border-[#E2E8F0] text-xs">
                    <span className="text-[#64748B] block text-[10px] font-medium">Specific Aspirations:</span>
                    <p className="text-[#0F172A] mt-0.5 italic">&ldquo;{student.additionalGoal}&rdquo;</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 6: REGISTRATION METADATA */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#0080FF]" />
              <span>Registration Metadata</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
                <span className="text-[#64748B] block text-[11px]">Registered On</span>
                <span className="font-medium text-[#0F172A] mt-0.5 block">{formatDate(student.createdAt)}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
                <span className="text-[#64748B] block text-[11px]">Attribution Source</span>
                <span className="font-medium text-[#0F172A] mt-0.5 block flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#0080FF]" />
                  <span>{student.source || 'Direct Website'}</span>
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80 sm:col-span-2">
                <span className="text-[#64748B] block text-[11px]">Firebase Student UID</span>
                <span className="font-mono text-[#64748B] truncate mt-0.5 block">{student.studentId || '—'}</span>
              </div>
            </div>
          </div>

          {/* SECTION 7: FOLLOW-UP STATUS & NOTES */}
          <div className="space-y-4 pt-3 border-t border-[#E2E8F0]">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-[#0080FF]" />
                <span>Admissions Follow-Up & Call Notes</span>
              </div>
              <span className="text-[10px] text-[#94A3B8] flex items-center gap-1">
                <Shield className="w-3 h-3 text-[#0080FF]" />
                <span>Private internal notes</span>
              </span>
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1.5">
                Current Registration Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as RegistrationStatus)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm font-semibold text-[#0F172A] focus:outline-none focus:border-[#0080FF] focus:ring-2 focus:ring-[#0080FF]/10 transition-all cursor-pointer"
              >
                <option value="NEW">NEW — Pending Initial Contact</option>
                <option value="CONTACTED">CONTACTED — Call Completed</option>
                <option value="INTERESTED">INTERESTED — Considering Joining</option>
                <option value="ENROLLED">ENROLLED — Confirmed Student</option>
                <option value="NOT_INTERESTED">NOT_INTERESTED — Declined</option>
              </select>

              {/* Quick Status Selection Pills */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  { id: 'NEW' as RegistrationStatus, label: 'NEW', bg: 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300' },
                  { id: 'CONTACTED' as RegistrationStatus, label: 'CONTACTED', bg: 'hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300' },
                  { id: 'INTERESTED' as RegistrationStatus, label: 'INTERESTED', bg: 'hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300' },
                  { id: 'ENROLLED' as RegistrationStatus, label: 'ENROLLED', bg: 'hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300' },
                  { id: 'NOT_INTERESTED' as RegistrationStatus, label: 'NOT INTERESTED', bg: 'hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300' },
                ].map((pill) => (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setStatus(pill.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                      status === pill.id
                        ? 'bg-[#0080FF] text-white border-[#0080FF] shadow-2xs'
                        : `bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] ${pill.bg}`
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin Notes Textarea */}
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1.5">
                Counselor Notes & Follow-up Log
              </label>
              <textarea
                rows={4}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="e.g. Student called on 22 Sep: Interested in 6-week AI Automation sprint. Discussed schedule and curriculum. Follow up on Monday..."
                className="w-full p-3.5 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0080FF] focus:ring-2 focus:ring-[#0080FF]/10 transition-all"
              />
            </div>

            {/* Success Message Banner */}
            {saveSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 flex items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Follow-up status and notes saved to Firestore!</span>
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
          <div>
            {onDeleteEnrollment && student.enrollmentId && (
              <button
                type="button"
                onClick={() => setIsConfirmDeleteOpen(true)}
                disabled={isDeleting}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                title="Delete Registration Record"
              >
                <Trash2 className="w-4.5 h-4.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0080FF] hover:bg-[#0070E0] text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        <ConfirmModal
          isOpen={isConfirmDeleteOpen}
          title="Delete Registration Record"
          message={`Are you sure you want to permanently delete the registration record for "${student.name}"? This action removes the student enrollment record from Firestore.`}
          confirmLabel="Delete Record"
          cancelLabel="Keep Record"
          isDestructive={true}
          isLoading={isDeleting}
          onCancel={() => setIsConfirmDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
};
