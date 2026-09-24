import React from 'react';
import {
  Users,
  Plus,
  List,
  Bell,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface AdminQuickActionsProps {
  totalActiveCount: number;
  onAddNewRegistration: () => void;
  onViewAllRegistrations: () => void;
  onManageNotifications: () => void;
}

export const AdminQuickActions: React.FC<AdminQuickActionsProps> = ({
  totalActiveCount,
  onAddNewRegistration,
  onViewAllRegistrations,
  onManageNotifications,
}) => {
  return (
    <div className="space-y-4">
      {/* Total Active Registrations Card with Wave Graphic matching Reference Image */}
      <div
        onClick={onViewAllRegistrations}
        className="relative overflow-hidden bg-white rounded-[22px] border border-[#E2E8F0]/80 p-5 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_25px_-5px_rgba(37,99,235,0.08)] hover:border-[#BFDBFE] transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#0080FF] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#0080FF] tracking-tight">
              Total Active Registrations
            </div>
            <div className="text-2xl sm:text-[26px] font-extrabold text-[#0F172A] tracking-tight flex items-center gap-1.5 mt-0.5">
              <span>{totalActiveCount}</span>
              <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0080FF] group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>

        {/* Soft Blue Wave Vector on Right */}
        <div className="absolute right-0 bottom-0 w-32 h-14 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 128 56" fill="none" className="w-full h-full">
            <path
              d="M0,45 C20,30 40,55 70,35 C95,15 110,40 128,25 L128,56 L0,56 Z"
              fill="url(#blueWaveGrad)"
            />
            <path
              d="M0,45 C20,30 40,55 70,35 C95,15 110,40 128,25"
              stroke="#60A5FA"
              strokeWidth="2"
              fill="none"
            />
            <defs>
              <linearGradient id="blueWaveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Quick Actions List Card */}
      <div className="bg-white rounded-[22px] border border-[#E2E8F0]/80 p-5 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-2 pb-3 mb-2 border-b border-[#F1F5F9]">
          <div className="w-6 h-6 rounded-lg bg-[#EFF6FF] text-[#0080FF] flex items-center justify-center">
            <Users className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">
            Quick Actions
          </h3>
        </div>

        <div className="space-y-1.5">
          {/* Action 1: Add New Registration */}
          <button
            onClick={onAddNewRegistration}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8FAFC] transition-colors group cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#0080FF] flex items-center justify-center group-hover:bg-[#0080FF] group-hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-[#475569] group-hover:text-[#0F172A] transition-colors">
                Add New Registration
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0080FF] group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Action 2: View All Registrations */}
          <button
            onClick={onViewAllRegistrations}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8FAFC] transition-colors group cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#0080FF] flex items-center justify-center group-hover:bg-[#0080FF] group-hover:text-white transition-colors">
                <List className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-[#475569] group-hover:text-[#0F172A] transition-colors">
                View All Registrations
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0080FF] group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Action 3: Manage Notifications */}
          <button
            onClick={onManageNotifications}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8FAFC] transition-colors group cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#0080FF] flex items-center justify-center group-hover:bg-[#0080FF] group-hover:text-white transition-colors">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-[#475569] group-hover:text-[#0F172A] transition-colors">
                Manage Notifications
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0080FF] group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
