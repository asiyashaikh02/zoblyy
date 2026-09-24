import React, { useEffect } from 'react';
import { useAuth } from '../../lib/firebase/authContext';
import { Loader2, Lock, ShieldAlert, LogOut, ArrowLeft } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onNavigatePage: (path: string) => void;
  requiredRole?: 'student' | 'admin' | 'mentor';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  onNavigatePage,
  requiredRole,
}) => {
  const { user, profile, loading, isConfigured, logout } = useAuth();

  useEffect(() => {
    if (!loading && isConfigured && !user) {
      onNavigatePage('/login');
    }
  }, [loading, isConfigured, user, onNavigatePage]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin mb-3" />
        <p className="text-sm font-medium text-[#64748B]">Verifying student session...</p>
      </div>
    );
  }

  // If Firebase is configured and user is not logged in, redirect to login
  if (isConfigured && !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center shadow-lg space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#2563EB] mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#0F172A]">Redirecting to Login...</h2>
          <p className="text-sm text-[#64748B]">
            This section requires authentication. Redirecting you to sign in...
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigatePage('/login')}
              className="w-full py-2.5 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl transition-all shadow-xs cursor-pointer text-sm"
            >
              Sign In to Zobly
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isDesignatedAdmin = Boolean(user?.email && user.email.toLowerCase() === 'ilaeequrrahman@gmail.com');
  const hasRequiredRole = requiredRole
    ? requiredRole === 'admin'
      ? profile?.role === 'admin' || isDesignatedAdmin
      : profile?.role === requiredRole
    : true;

  if (requiredRole && !hasRequiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#E2E8F0] p-8 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">Administrator Access Required</h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
              This administrative dashboard is restricted to designated Zobly administrators.
            </p>
          </div>

          {user?.email && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              Signed in as: <span className="font-bold text-slate-900">{user.email}</span>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => onNavigatePage('/')}
              className="w-full py-2.5 px-4 bg-[#0080FF] hover:bg-[#0070E0] text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Zobly Homepage</span>
            </button>
            <button
              onClick={async () => {
                await logout();
                onNavigatePage('/login');
              }}
              className="w-full py-2.5 px-4 bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#64748B] hover:text-[#0F172A] font-semibold rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign In with Admin Account</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
