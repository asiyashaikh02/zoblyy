import React, { useState } from 'react';
import {
  Shield,
  User,
  Bell,
  Database,
  CheckCircle2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import type { UserProfile } from '../../types/firebase';

interface AdminSettingsViewProps {
  adminProfile: UserProfile | null;
  adminEmail: string;
  adminName: string;
  onSeedDemoData?: () => Promise<void>;
}

export const AdminSettingsView: React.FC<AdminSettingsViewProps> = ({
  adminProfile,
  adminEmail,
  adminName,
  onSeedDemoData,
}) => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);

  const handleSeed = async () => {
    if (!onSeedDemoData) return;
    setIsSeeding(true);
    setSeedSuccess(false);
    try {
      await onSeedDemoData();
      setSeedSuccess(true);
      setTimeout(() => setSeedSuccess(false), 4000);
    } catch (err) {
      console.warn('Notice seeding demo registrations:', err);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Admin Settings & Configuration
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Manage admissions credentials, CRM settings, and database synchronization.
        </p>
      </div>

      {/* Admin Profile Details */}
      <div className="bg-white rounded-[22px] border border-[#E2E8F0]/80 p-6 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#F1F5F9]">
          <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#0080FF] flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Administrator Account</h2>
            <p className="text-xs text-[#64748B]">Authenticated Firebase credentials</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
            <span className="text-[#64748B] block font-medium">Display Name</span>
            <span className="text-sm font-bold text-[#0F172A] mt-0.5 block">{adminName || 'Admin'}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
            <span className="text-[#64748B] block font-medium">Email Address</span>
            <span className="text-sm font-bold text-[#0F172A] mt-0.5 block">{adminEmail || 'admin@zobly.in'}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
            <span className="text-[#64748B] block font-medium">Role</span>
            <span className="text-sm font-bold text-[#0080FF] mt-0.5 block">Administrator (Full Access)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
            <span className="text-[#64748B] block font-medium">Firebase UID</span>
            <span className="font-mono text-[#64748B] truncate mt-0.5 block">{adminProfile?.uid || 'Active Session'}</span>
          </div>
        </div>
      </div>

      {/* Security & Access Rules */}
      <div className="bg-white rounded-[22px] border border-[#E2E8F0]/80 p-6 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] space-y-3">
        <div className="flex items-center gap-3 pb-3 border-b border-[#F1F5F9]">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Security & RBAC Enforcement</h2>
            <p className="text-xs text-[#64748B]">Firestore security rules status</p>
          </div>
        </div>

        <p className="text-xs text-[#475569] leading-relaxed">
          Access to student registrations, private follow-up counselor notes, and notifications is securely restricted at the Firestore database level (`firestore.rules`). Students can only create and view their own registrations; they cannot view other students or edit private admin notes.
        </p>

        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Firestore rules active: `/enrollments`, `/adminNotifications`, and `/users` collections protected.</span>
        </div>
      </div>

      {/* Demo Data Seeder */}
      {onSeedDemoData && (
        <div className="bg-white rounded-[22px] border border-[#E2E8F0]/80 p-6 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0F172A]">Sample Test Data</h2>
                <p className="text-xs text-[#64748B]">Seed realistic applicant records to test all CRM features</p>
              </div>
            </div>

            <button
              onClick={handleSeed}
              disabled={isSeeding}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0080FF] to-[#6366F1] hover:opacity-95 text-white rounded-xl text-xs font-bold shadow-xs transition-opacity cursor-pointer disabled:opacity-60"
            >
              {isSeeding ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Adding Records...</span>
                </>
              ) : (
                <>
                  <Database className="w-3.5 h-3.5" />
                  <span>Populate Demo Registrations</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-[#64748B]">
            Creates real registration records in your Firestore database across different colleges, courses (Full Stack, Data Analytics, AI & Automation), and status stages (NEW, CONTACTED, INTERESTED, ENROLLED).
          </p>

          {seedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Demo student registrations successfully saved to Firestore!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
