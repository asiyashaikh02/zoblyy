import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Users,
  Bell,
  GraduationCap,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import { ZoblyLogo } from '../common/ZoblyLogo';

export type AdminTab = 'overview' | 'registrations' | 'students' | 'notifications' | 'courses' | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  unreadCount: number;
  adminName: string;
  adminEmail: string;
  onLogout: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  unreadCount,
  adminName,
  adminEmail,
  onLogout,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const getInitials = (name: string, email: string) => {
    if (name && name !== 'Admin') {
      const parts = name.trim().split(' ');
      if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      return name.slice(0, 2).toUpperCase();
    }
    if (email) return email.slice(0, 2).toUpperCase();
    return 'AS';
  };

  const navItems = [
    {
      id: 'overview' as AdminTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'registrations' as AdminTab,
      label: 'Enrollments',
      icon: FileText,
    },
    {
      id: 'students' as AdminTab,
      label: 'Students',
      icon: Users,
    },
    {
      id: 'notifications' as AdminTab,
      label: 'Notifications',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
  ];

  const managementItems = [
    {
      id: 'courses' as AdminTab,
      label: 'Courses & Programs',
      icon: GraduationCap,
    },
    {
      id: 'settings' as AdminTab,
      label: 'Settings',
      icon: Settings,
    },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between py-6 px-4 bg-white/95 backdrop-blur-md border-r border-[#E2E8F0]">
      {/* Top Brand & Navigation */}
      <div className="space-y-7">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSelectTab('overview')}>
            <ZoblyLogo className="h-7 w-auto" id="admin-sidebar-logo" />
          </div>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-[#64748B] hover:bg-[#F1F5F9]"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#EEF4FF] text-[#0080FF] font-semibold shadow-2xs'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#0080FF]' : 'text-[#64748B]'}`} />
                  <span className={isActive ? 'text-[#0F172A] font-semibold' : ''}>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#0080FF] text-white text-[11px] font-bold flex items-center justify-center shadow-2xs">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Management Section */}
        <div className="pt-2">
          <div className="px-3 text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase mb-2 select-none">
            MANAGEMENT
          </div>
          <nav className="space-y-1">
            {managementItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#EEF4FF] text-[#0080FF] font-semibold shadow-2xs'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#0080FF]' : 'text-[#64748B]'}`} />
                    <span className={isActive ? 'text-[#0F172A] font-semibold' : ''}>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Profile & Logout */}
      <div className="pt-6 border-t border-[#F1F5F9] space-y-4">
        {/* Profile Card */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-[#0080FF] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-sm shrink-0">
            {getInitials(adminName, adminEmail)}
          </div>
          <div className="min-w-0 flex-1 text-left">
            <div className="text-sm font-bold text-[#0F172A] truncate">
              {adminName || 'Admin'}
            </div>
            <div className="text-[11px] text-[#94A3B8] truncate">
              {adminEmail || 'admin@zobly.in'}
            </div>
          </div>
        </div>

        {/* Logout Action */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#64748B] hover:text-red-600 hover:bg-red-50/60 rounded-xl transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-[236px] h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-[260px] h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
