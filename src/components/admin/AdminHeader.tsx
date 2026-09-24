import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  RefreshCw,
  LogOut,
  ExternalLink,
  Shield,
  CheckCircle,
} from 'lucide-react';
import type { AdminNotification } from '../../types/firebase';

interface AdminHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  unreadCount: number;
  notifications: AdminNotification[];
  onNotificationClick: (notif: AdminNotification) => void;
  onViewAllNotifications: () => void;
  adminName: string;
  adminEmail: string;
  isLoading: boolean;
  onRefresh: () => void;
  onLogout: () => void;
  onNavigateHome: () => void;
  onOpenMobileSidebar: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  searchQuery,
  onSearchChange,
  unreadCount,
  notifications,
  onNotificationClick,
  onViewAllNotifications,
  adminName,
  adminEmail,
  isLoading,
  onRefresh,
  onLogout,
  onNavigateHome,
  onOpenMobileSidebar,
}) => {
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatRelativeTime = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate ? timestamp.toDate() : timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffSec < 60) return `${Math.max(1, diffSec)}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <header className="h-[72px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile Menu Toggle & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-xl cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Input Bar matching Reference Image */}
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search students, courses, or registrations..."
            className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#0080FF] focus:ring-2 focus:ring-[#0080FF]/10 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-[#94A3B8] hover:text-[#0F172A]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right: Actions, Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Refresh Data Button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh Data"
          className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-xl transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#0080FF]' : ''}`} />
        </button>

        {/* Notifications Bell with Counter */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
            className="relative p-2.5 text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-full transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 bg-[#0080FF] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white shadow-2xs">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {isNotifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-[#F1F5F9] flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Notifications
                </span>
                <button
                  onClick={() => {
                    setIsNotifDropdownOpen(false);
                    onViewAllNotifications();
                  }}
                  className="text-xs font-semibold text-[#0080FF] hover:underline cursor-pointer"
                >
                  View all
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#F8FAFC]">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#94A3B8]">
                    No notifications yet
                  </div>
                ) : (
                  notifications.slice(0, 6).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        onNotificationClick(notif);
                        setIsNotifDropdownOpen(false);
                      }}
                      className={`p-3.5 hover:bg-[#F8FAFC] transition-colors cursor-pointer text-left ${
                        !notif.read ? 'bg-[#F0F7FF]/60' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-[#0F172A] line-clamp-1">
                          {notif.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#94A3B8] shrink-0">
                          {formatRelativeTime(notif.createdAt)}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#64748B] line-clamp-1 mt-0.5">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-[#E2E8F0] mx-1 hidden sm:block" />

        {/* Admin Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-full sm:rounded-xl hover:bg-[#F1F5F9] transition-all cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-full bg-[#1E293B] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              {(adminName || 'A').charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-[#0F172A] leading-tight">
                {adminName || 'Admin'}
              </div>
              <div className="text-[11px] text-[#94A3B8] leading-tight">
                Administrator
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] hidden sm:block" />
          </button>

          {/* Profile Menu Dropdown */}
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-[#F1F5F9]">
                <div className="text-xs font-bold text-[#0F172A] truncate">
                  {adminName || 'Admin'}
                </div>
                <div className="text-[11px] text-[#64748B] truncate">
                  {adminEmail || 'admin@zobly.in'}
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    onNavigateHome();
                  }}
                  className="w-full px-4 py-2 text-xs text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] flex items-center gap-2.5 cursor-pointer text-left"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Public Website</span>
                </button>
              </div>

              <div className="border-t border-[#F1F5F9] pt-1">
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50/70 flex items-center gap-2.5 cursor-pointer text-left font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
