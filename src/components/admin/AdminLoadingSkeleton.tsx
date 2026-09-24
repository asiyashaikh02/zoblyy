import React from 'react';

export const AdminKpiSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 animate-pulse">
      {[1, 2, 3, 4, 5].map((idx) => (
        <div
          key={idx}
          className="bg-white rounded-[22px] border border-[#E2E8F0]/80 p-4.5 sm:p-5 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)]"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="h-3 w-20 bg-slate-100 rounded-md" />
            <div className="w-8 h-8 rounded-xl bg-slate-100" />
          </div>
          <div className="h-7 w-16 bg-slate-200 rounded-lg mb-3" />
          <div className="h-4 w-full bg-slate-50 rounded" />
        </div>
      ))}
    </div>
  );
};

export const AdminTableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="bg-white rounded-[22px] border border-[#E2E8F0]/80 p-5 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] animate-pulse space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
        <div className="h-5 w-40 bg-slate-200 rounded" />
        <div className="h-4 w-24 bg-slate-100 rounded" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-32 bg-slate-200 rounded" />
                <div className="h-2.5 w-24 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="h-3.5 w-24 bg-slate-100 rounded hidden sm:block" />
            <div className="h-3.5 w-28 bg-slate-100 rounded hidden md:block" />
            <div className="h-5 w-16 bg-slate-100 rounded-full" />
            <div className="h-6 w-12 bg-slate-100 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminCardsSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-[22px] border border-[#E2E8F0]/80 p-5 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.04)] space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 shrink-0" />
            <div className="space-y-1.5 flex-1">
              <div className="h-4 w-32 bg-slate-200 rounded" />
              <div className="h-3 w-24 bg-slate-100 rounded" />
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-slate-50">
            <div className="h-3 w-3/4 bg-slate-100 rounded" />
            <div className="h-3 w-1/2 bg-slate-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
