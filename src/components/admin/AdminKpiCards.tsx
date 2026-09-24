import React from 'react';
import {
  Users,
  UserPlus,
  Phone,
  Heart,
  GraduationCap,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';
import type { StudentEnrollment, RegistrationStatus } from '../../types/firebase';

interface AdminKpiCardsProps {
  enrollments: StudentEnrollment[];
  onSelectFilter?: (status: 'ALL' | RegistrationStatus) => void;
}

export const AdminKpiCards: React.FC<AdminKpiCardsProps> = ({
  enrollments,
  onSelectFilter,
}) => {
  const totalCount = enrollments.length;

  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  // Safely parse timestamp
  const parseDate = (item: StudentEnrollment): Date | null => {
    if (!item.createdAt) return null;
    if (typeof (item.createdAt as any).toDate === 'function') {
      return (item.createdAt as any).toDate();
    }
    if ((item.createdAt as any).seconds) {
      return new Date((item.createdAt as any).seconds * 1000);
    }
    const parsed = new Date(item.createdAt as any);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  // 1. Dynamic Status Counts from live Firestore collection
  const newTodayCount = enrollments.filter((e) => {
    const d = parseDate(e);
    return d && d >= today;
  }).length;

  const contactedCount = enrollments.filter((e) => e.status === 'CONTACTED').length;
  const interestedCount = enrollments.filter((e) => e.status === 'INTERESTED').length;
  const enrolledCount = enrollments.filter((e) => e.status === 'ENROLLED').length;

  // 2. Dynamic Trend Calculation (Current 7 days vs Prior 7 days)
  const computeTrend = (subset: StudentEnrollment[]) => {
    const thisWeek = subset.filter((e) => {
      const d = parseDate(e);
      return d && d >= sevenDaysAgo && d <= now;
    }).length;

    const prevWeek = subset.filter((e) => {
      const d = parseDate(e);
      return d && d >= fourteenDaysAgo && d < sevenDaysAgo;
    }).length;

    if (prevWeek === 0) {
      if (thisWeek === 0) {
        return {
          label: '0 in last 7 days',
          color: 'text-[#64748B]',
          direction: 'neutral' as const,
        };
      }
      return {
        label: `+${thisWeek} in last 7d`,
        color: 'text-emerald-500',
        direction: 'up' as const,
      };
    }

    const pct = Math.round(((thisWeek - prevWeek) / prevWeek) * 100);
    if (pct > 0) {
      return {
        label: `+${pct}% vs last week`,
        color: 'text-emerald-500',
        direction: 'up' as const,
      };
    }
    if (pct < 0) {
      return {
        label: `${pct}% vs last week`,
        color: 'text-rose-500',
        direction: 'down' as const,
      };
    }
    return {
      label: 'Same as last week',
      color: 'text-[#64748B]',
      direction: 'neutral' as const,
    };
  };

  // 3. Dynamic 7-Day Sparkline generation from live registration dates
  const generateDynamicSparkline = (subset: StudentEnrollment[]) => {
    const dailyCounts: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date(now);
      dayStart.setDate(now.getDate() - i);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayStart.getDate() + 1);

      const count = subset.filter((e) => {
        const d = parseDate(e);
        return d && d >= dayStart && d < dayEnd;
      }).length;
      dailyCounts.push(count);
    }

    const maxVal = Math.max(...dailyCounts, 1);
    // ViewBox is 210 x 24
    const pts = dailyCounts.map((val, idx) => {
      const x = idx * 35;
      const y = Math.round(20 - (val / maxVal) * 15);
      return { x, y };
    });

    let path = `M${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const curr = pts[i];
      const next = pts[i + 1];
      const mx = (curr.x + next.x) / 2;
      path += ` C${mx},${curr.y} ${mx},${next.y} ${next.x},${next.y}`;
    }
    return path;
  };

  const totalTrend = computeTrend(enrollments);
  const contactedTrend = computeTrend(enrollments.filter((e) => e.status === 'CONTACTED'));
  const interestedTrend = computeTrend(enrollments.filter((e) => e.status === 'INTERESTED'));
  const enrolledTrend = computeTrend(enrollments.filter((e) => e.status === 'ENROLLED'));

  const cards = [
    {
      id: 'total',
      label: 'Total Registrations',
      value: totalCount,
      trend: totalTrend.label,
      trendColor: totalTrend.color,
      direction: totalTrend.direction,
      icon: Users,
      iconBg: 'bg-[#EFF6FF]',
      iconColor: 'text-[#0080FF]',
      strokeColor: '#38BDF8',
      filter: 'ALL' as const,
      sparkline: generateDynamicSparkline(enrollments),
    },
    {
      id: 'new_today',
      label: 'New Today',
      value: newTodayCount,
      subtext: newTodayCount === 1 ? '1 lead requires review' : `${newTodayCount} leads require review`,
      dotColor: newTodayCount > 0 ? 'bg-amber-500' : 'bg-slate-300',
      icon: UserPlus,
      iconBg: 'bg-[#F0F9FF]',
      iconColor: 'text-[#0284C7]',
      strokeColor: '#A78BFA',
      filter: 'NEW' as RegistrationStatus,
      sparkline: generateDynamicSparkline(enrollments.filter((e) => e.status === 'NEW')),
    },
    {
      id: 'contacted',
      label: 'Contacted',
      value: contactedCount,
      trend: contactedTrend.label,
      trendColor: contactedTrend.color,
      direction: contactedTrend.direction,
      icon: Phone,
      iconBg: 'bg-[#EFF6FF]',
      iconColor: 'text-[#2563EB]',
      strokeColor: '#60A5FA',
      filter: 'CONTACTED' as RegistrationStatus,
      sparkline: generateDynamicSparkline(enrollments.filter((e) => e.status === 'CONTACTED')),
    },
    {
      id: 'interested',
      label: 'Interested',
      value: interestedCount,
      trend: interestedTrend.label,
      trendColor: interestedTrend.color,
      direction: interestedTrend.direction,
      icon: Heart,
      iconBg: 'bg-[#FAF5FF]',
      iconColor: 'text-[#9333EA]',
      strokeColor: '#C084FC',
      filter: 'INTERESTED' as RegistrationStatus,
      sparkline: generateDynamicSparkline(enrollments.filter((e) => e.status === 'INTERESTED')),
    },
    {
      id: 'enrolled',
      label: 'Enrolled',
      value: enrolledCount,
      trend: enrolledTrend.label,
      trendColor: enrolledTrend.color,
      direction: enrolledTrend.direction,
      icon: GraduationCap,
      iconBg: 'bg-[#ECFDF5]',
      iconColor: 'text-[#059669]',
      strokeColor: '#34D399',
      filter: 'ENROLLED' as RegistrationStatus,
      showViewAll: true,
      sparkline: generateDynamicSparkline(enrollments.filter((e) => e.status === 'ENROLLED')),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-4.5">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.id}
            onClick={() => onSelectFilter && onSelectFilter(c.filter)}
            className="group relative bg-white rounded-[20px] border border-[#E2E8F0]/80 p-5 flex flex-col justify-between shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_25px_-5px_rgba(37,99,235,0.08)] hover:border-[#BFDBFE] transition-all duration-200 cursor-pointer overflow-hidden"
          >
            {/* Top Row: Icon + Label + Optional "View all" */}
            <div>
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl ${c.iconBg} ${c.iconColor} flex items-center justify-center transition-transform group-hover:scale-105`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                {c.showViewAll && (
                  <span className="text-[11px] font-semibold text-[#0080FF] hover:underline flex items-center">
                    View all
                  </span>
                )}
              </div>

              <div className="mt-3.5">
                <div className="text-xs font-semibold text-[#64748B]">
                  {c.label}
                </div>
                <div className="text-2xl sm:text-[28px] font-extrabold text-[#0F172A] tracking-tight mt-1 leading-none">
                  {c.value.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Bottom Row: Dynamic Trend/Subtext + Real Sparkline */}
            <div className="mt-4 pt-1 flex items-end justify-between">
              {c.trend ? (
                <div className={`text-[11px] font-semibold ${c.trendColor} flex items-center gap-0.5`}>
                  {c.direction === 'up' && <ArrowUpRight className="w-3 h-3" />}
                  {c.direction === 'down' && <ArrowDownRight className="w-3 h-3" />}
                  {c.direction === 'neutral' && <Minus className="w-3 h-3" />}
                  <span>{c.trend}</span>
                </div>
              ) : (
                <div className="text-[11px] font-medium text-[#64748B] flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${c.dotColor}`} />
                  <span>{c.subtext}</span>
                </div>
              )}

              {/* Dynamic SVG Sparkline calculated strictly from live dates */}
              <div className="w-16 h-6 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 210 24" className="w-full h-full overflow-visible" fill="none">
                  <path
                    d={c.sparkline}
                    stroke={c.strokeColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
