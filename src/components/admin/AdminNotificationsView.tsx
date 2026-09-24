import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Clock,
  UserCheck,
  Check,
  ArrowRight,
} from 'lucide-react';
import type { AdminNotification } from '../../types/firebase';

interface AdminNotificationsViewProps {
  notifications: AdminNotification[];
  onSelectNotification: (notif: AdminNotification) => void;
  onMarkAllAsRead: () => void;
}

export const AdminNotificationsView: React.FC<AdminNotificationsViewProps> = ({
  notifications,
  onSelectNotification,
  onMarkAllAsRead,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'READ'>('ALL');

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'UNREAD') return !n.read;
    if (filter === 'READ') return n.read;
    return true;
  });

  const formatDateTime = (timestamp: any) => {
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Notifications Center
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Real-time registration alerts, student interest updates, and admissions activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onMarkAllAsRead}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#475569] shadow-2xs transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 text-[#0080FF]" />
            <span>Mark all as read</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            filter === 'ALL'
              ? 'bg-[#0080FF] text-white shadow-2xs'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('UNREAD')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            filter === 'UNREAD'
              ? 'bg-[#0080FF] text-white shadow-2xs'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          Unread ({notifications.filter((n) => !n.read).length})
        </button>
        <button
          onClick={() => setFilter('READ')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            filter === 'READ'
              ? 'bg-[#0080FF] text-white shadow-2xs'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          Read ({notifications.filter((n) => n.read).length})
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-[22px] border border-[#E2E8F0]/80 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] divide-y divide-[#F8FAFC] overflow-hidden">
        {filteredNotifs.length === 0 ? (
          <div className="py-16 text-center">
            <Bell className="w-10 h-10 text-[#94A3B8] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#475569]">No notifications found</p>
            <p className="text-xs text-[#94A3B8] mt-0.5">When students register, alerts will appear here</p>
          </div>
        ) : (
          filteredNotifs.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNotification(item)}
              className={`p-5 hover:bg-[#F8FAFC] transition-colors cursor-pointer group flex items-start justify-between gap-4 ${
                !item.read ? 'bg-[#F0F7FF]/50' : ''
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    !item.read ? 'bg-[#0080FF] text-white shadow-2xs' : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}
                >
                  <Bell className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#0080FF] transition-colors">
                      {item.title}
                    </h3>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#0080FF]" />
                    )}
                  </div>
                  <p className="text-xs text-[#475569] mt-1">
                    {item.message}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] font-mono mt-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatDateTime(item.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#0080FF] shrink-0 pt-1">
                <span>View Registration</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
