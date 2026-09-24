import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import type { AdminNotification } from '../../types/firebase';

interface AdminNotificationsCardProps {
  notifications: AdminNotification[];
  onSelectNotification: (notif: AdminNotification) => void;
  onViewAll: () => void;
}

export const AdminNotificationsCard: React.FC<AdminNotificationsCardProps> = ({
  notifications,
  onSelectNotification,
  onViewAll,
}) => {
  const formatRelativeTime = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate 
      ? timestamp.toDate() 
      : timestamp.seconds 
      ? new Date(timestamp.seconds * 1000) 
      : new Date(timestamp);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffSec < 60) return `${Math.max(1, diffSec)}m ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const displayedNotifications = notifications.slice(0, 5);

  return (
    <div className="bg-white rounded-[22px] border border-[#E2E8F0]/80 p-5 sm:p-6 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#0080FF] flex items-center justify-center shrink-0">
              <Bell className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
              Notifications
            </h2>
          </div>
          <button
            onClick={onViewAll}
            className="text-xs font-semibold text-[#0080FF] hover:underline cursor-pointer"
          >
            View all
          </button>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-[#F8FAFC] mt-1">
          {displayedNotifications.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-10 h-10 rounded-full bg-[#F8FAFC] text-[#94A3B8] flex items-center justify-center mx-auto mb-2">
                <Bell className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-[#64748B]">No notifications yet</p>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">
                New student registrations will appear here
              </p>
            </div>
          ) : (
            displayedNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectNotification(item)}
                className="py-3.5 px-2 hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer group flex items-start justify-between gap-3 text-left"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  {/* Status Indicator Dot */}
                  <span
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      !item.read ? 'bg-[#0080FF]' : 'bg-[#CBD5E1]'
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#0080FF] transition-colors truncate">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[#64748B] truncate mt-0.5">
                      {item.studentName ? (
                        <span>{item.studentName} · {item.message.replace(item.studentName, '').replace(/^.*?registered for\s*/i, '') || 'Registration'}</span>
                      ) : (
                        item.message
                      )}
                    </div>
                  </div>
                </div>

                {/* Relative Timestamp */}
                <span className="text-[10px] text-[#94A3B8] shrink-0 font-medium pt-1">
                  {formatRelativeTime(item.createdAt)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
