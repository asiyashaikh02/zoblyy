import React, { useState } from 'react';
import { X, UserPlus, RefreshCw, CheckCircle2 } from 'lucide-react';
import type { RegistrationStatus } from '../../types/firebase';

interface AdminNewRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    college: string;
    degree: string;
    year: string;
    interestedCourse: string;
    careerInterest?: string;
    status: RegistrationStatus;
    adminNotes: string;
  }) => Promise<void>;
}

export const AdminNewRegistrationModal: React.FC<AdminNewRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    degree: 'B.Tech',
    year: '3rd Year',
    interestedCourse: 'AI & Business Automation',
    careerInterest: '',
    status: 'NEW' as RegistrationStatus,
    adminNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter student name and email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await onSubmit(formData);
      onClose();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Could not save student registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-[24px] shadow-2xl z-10 border border-[#E2E8F0] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-gradient-to-r from-[#F8FAFC] to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#0080FF] flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
                Add New Student Registration
              </h2>
              <p className="text-xs text-[#64748B]">
                Create a new applicant record in admissions CRM
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#0F172A] rounded-lg hover:bg-[#F1F5F9] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#475569] mb-1">
                Student Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Full Name"
                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#0080FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#475569] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="rahul@gmail.com"
                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#0080FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#475569] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#0080FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#475569] mb-1">
                College / University
              </label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="e.g. ABC College"
                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#0080FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#475569] mb-1">
                Degree
              </label>
              <select
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#0080FF]"
              >
                <option value="B.Tech">B.Tech / B.E.</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="B.Sc">B.Sc Computer Science</option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
                <option value="Other">Other Degree</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#475569] mb-1">
                Year
              </label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#0080FF]"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Graduate">Recent Graduate</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#475569] mb-1">
              Interested Course *
            </label>
            <select
              value={formData.interestedCourse}
              onChange={(e) => setFormData({ ...formData, interestedCourse: e.target.value })}
              className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#0080FF]"
            >
              <option value="AI & Business Automation">AI & Business Automation</option>
              <option value="Software & Product">Software & Product</option>
              <option value="Data & BI">Data & BI</option>
              <option value="Full Stack Development">Full Stack Development</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#475569] mb-1">
                Initial Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as RegistrationStatus })}
                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#0080FF]"
              >
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="INTERESTED">INTERESTED</option>
                <option value="ENROLLED">ENROLLED</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#475569] mb-1">
                Target Role / Career Goal
              </label>
              <input
                type="text"
                value={formData.careerInterest}
                onChange={(e) => setFormData({ ...formData, careerInterest: e.target.value })}
                placeholder="e.g. AI Engineer"
                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#0080FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#475569] mb-1">
              Initial Counselor Notes
            </label>
            <textarea
              rows={3}
              value={formData.adminNotes}
              onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value })}
              placeholder="e.g. Lead received via direct campus query. Scheduled demo..."
              className="w-full p-3 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0080FF]"
            />
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#0080FF] hover:bg-[#0070E0] text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 select-none"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Create Registration</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
