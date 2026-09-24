import React, { useState, useMemo } from 'react';
import { Activity, ChevronDown } from 'lucide-react';
import type { StudentEnrollment } from '../../types/firebase';

interface AdminActivityChartProps {
  enrollments: StudentEnrollment[];
}

export const AdminActivityChart: React.FC<AdminActivityChartProps> = ({ enrollments }) => {
  const [timeRange, setTimeRange] = useState<'7days' | '30days'>('7days');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate 7 days labels and count enrollments per day
  const chartData = useMemo(() => {
    const daysCount = timeRange === '7days' ? 7 : 30;
    const result: { dateKey: string; label: string; count: number; fullDate: string }[] = [];
    const now = new Date();

    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      d.setHours(0, 0, 0, 0);

      const dayStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const fullDateStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      const nextDay = new Date(d);
      nextDay.setDate(d.getDate() + 1);

      // Count enrollments matching this day
      const count = enrollments.filter((e) => {
        if (!e.createdAt) return false;
        const eDate = e.createdAt.toDate 
          ? e.createdAt.toDate() 
          : e.createdAt.seconds 
          ? new Date(e.createdAt.seconds * 1000) 
          : new Date(e.createdAt);
        return eDate >= d && eDate < nextDay;
      }).length;

      result.push({
        dateKey: dayStr,
        label: dayStr,
        count,
        fullDate: fullDateStr,
      });
    }

    return result;
  }, [enrollments, timeRange]);

  // Determine scale
  const maxCount = Math.max(...chartData.map((d) => d.count), 5);
  // Round up to nice number: 10, 20, 30, 40, etc.
  const yMax = Math.ceil(maxCount / 10) * 10 || 40;
  const yTicks = [yMax, Math.round(yMax * 0.75), Math.round(yMax * 0.5), Math.round(yMax * 0.25), 0];

  // SVG Coordinates calculation
  const width = 640;
  const height = 210;
  const padLeft = 36;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 28;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const points = chartData.map((d, i) => {
    const x = padLeft + (i / (chartData.length - 1)) * chartW;
    const y = padTop + chartH - (d.count / yMax) * chartH;
    return { x, y, ...d };
  });

  // Generate smooth cubic bezier curve
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
    
    let path = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const current = pts[i];
      const next = pts[i + 1];
      const controlX = (current.x + next.x) / 2;
      path += ` C ${controlX},${current.y} ${controlX},${next.y} ${next.x},${next.y}`;
    }
    return path;
  };

  const linePath = createSmoothPath(points);
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x},${padTop + chartH} L ${points[0].x},${padTop + chartH} Z`
    : '';

  return (
    <div className="bg-white rounded-[22px] border border-[#E2E8F0]/80 p-5 sm:p-6 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] flex flex-col justify-between">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#0080FF] flex items-center justify-center shrink-0 mt-0.5">
            <Activity className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
              Registration Activity
            </h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              New student registrations over the last 7 days
            </p>
          </div>
        </div>

        {/* Dropdown Selector */}
        <div className="relative self-start sm:self-auto">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="appearance-none bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3.5 py-1.5 pr-8 text-xs font-semibold text-[#475569] hover:text-[#0F172A] focus:outline-none focus:border-[#0080FF] cursor-pointer transition-colors"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Interactive SVG Chart Container */}
      <div className="relative w-full overflow-hidden select-none pt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient id="activityChartAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0080FF" stopOpacity="0.22" />
              <stop offset="65%" stopColor="#0080FF" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#0080FF" stopOpacity="0" />
            </linearGradient>
            <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0080FF" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Horizontal Grid lines and Y-axis labels */}
          {yTicks.map((tickVal) => {
            const yPos = padTop + chartH - (tickVal / yMax) * chartH;
            return (
              <g key={tickVal}>
                <text
                  x={padLeft - 8}
                  y={yPos + 3.5}
                  textAnchor="end"
                  className="text-[10px] fill-[#94A3B8] font-sans font-medium"
                >
                  {tickVal}
                </text>
                <line
                  x1={padLeft}
                  y1={yPos}
                  x2={width - padRight}
                  y2={yPos}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </g>
            );
          })}

          {/* Area Fill */}
          {areaPath && (
            <path d={areaPath} fill="url(#activityChartAreaGradient)" />
          )}

          {/* Main Curved Line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#0080FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#shadowFilter)"
            />
          )}

          {/* Data Points and Interaction Hit Areas */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g key={pt.dateKey}>
                {/* Vertical guide line when hovered */}
                {isHovered && (
                  <line
                    x1={pt.x}
                    y1={padTop}
                    x2={pt.x}
                    y2={padTop + chartH}
                    stroke="#0080FF"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="opacity-60"
                  />
                )}

                {/* Visible Point Dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5.5 : 3.5}
                  fill="#FFFFFF"
                  stroke="#0080FF"
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-150 cursor-pointer"
                />

                {/* X-axis date label */}
                <text
                  x={pt.x}
                  y={height - 6}
                  textAnchor="middle"
                  className={`text-[10px] font-sans transition-colors ${
                    isHovered ? 'fill-[#0080FF] font-bold' : 'fill-[#94A3B8] font-medium'
                  }`}
                >
                  {pt.label}
                </text>

                {/* Broad transparent hit area for easy hover */}
                <rect
                  x={pt.x - chartW / (points.length * 2)}
                  y={padTop}
                  width={chartW / points.length}
                  height={chartH + padBottom}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip when hovering over a date */}
        {hoveredIndex !== null && points[hoveredIndex] && (
          <div
            className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-75"
            style={{
              left: `${(points[hoveredIndex].x / width) * 100}%`,
              top: `${(points[hoveredIndex].y / height) * 100}%`,
              marginTop: '-10px',
            }}
          >
            <div className="bg-[#0F172A] text-white px-3 py-1.5 rounded-xl shadow-xl text-left border border-slate-700/50">
              <div className="text-[10px] text-slate-400 font-medium">
                {points[hoveredIndex].fullDate}
              </div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0080FF]" />
                <span>{points[hoveredIndex].count} new registration{points[hoveredIndex].count === 1 ? '' : 's'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
