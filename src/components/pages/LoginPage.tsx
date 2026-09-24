import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { AuthBackground } from '../auth/AuthBackground';
import { ZoblyLogo } from '../common/ZoblyLogo';
import { IndiaFlag } from '../common/IndiaFlag';
import { useAuth } from '../../lib/firebase/authContext';

interface LoginPageProps {
  onNavigatePage: (path: string) => void;
  onOpenEnrollModal?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigatePage, onOpenEnrollModal }) => {
  const { signInWithEmail, signInWithGoogle, sendPasswordReset, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (isConfigured) {
        await signInWithEmail(email.trim(), password);
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }
      setIsLoading(false);
      const isDesignatedAdmin = email.trim().toLowerCase() === 'ilaeequrrahman@gmail.com';
      onNavigatePage(isDesignatedAdmin ? '/admin' : '/');
    } catch (err: any) {
      setIsLoading(false);
      const code = err?.code || '';
      let msg = err?.message || 'Failed to sign in. Please verify your credentials.';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        msg = 'Invalid email or password. Please check and try again.';
      } else if (code === 'auth/too-many-requests') {
        msg = 'Access temporarily locked due to many failed attempts. Try again later.';
      }
      setErrors({ form: msg });
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setErrors({});
    try {
      if (isConfigured) {
        const authedUser = await signInWithGoogle();
        setIsLoading(false);
        const isDesignatedAdmin = authedUser?.email?.toLowerCase() === 'ilaeequrrahman@gmail.com';
        onNavigatePage(isDesignatedAdmin ? '/admin' : '/');
        return;
      } else {
        await new Promise((r) => setTimeout(r, 500));
      }
      setIsLoading(false);
      onNavigatePage('/');
    } catch (err: any) {
      setIsLoading(false);
      if (err?.code !== 'auth/popup-closed-by-user') {
        const domain = typeof window !== 'undefined' ? window.location.hostname : '';
        let message = err?.message || 'Google sign-in could not be completed.';
        if (err?.code === 'auth/unauthorized-domain') {
          message = `Firebase auth/unauthorized-domain: This domain (${domain}) is not authorized. Add "${domain}" to Firebase Console -> Authentication -> Settings -> Authorized domains.`;
        }
        setErrors({ form: message });
      }
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      return;
    }
    setForgotError(null);
    try {
      if (isConfigured) {
        await sendPasswordReset(forgotEmail.trim());
      }
      setForgotPasswordSubmitted(true);
      setTimeout(() => {
        setIsForgotModalOpen(false);
        setForgotPasswordSubmitted(false);
        setForgotEmail('');
      }, 2500);
    } catch (err: any) {
      setForgotError(err?.message || 'Could not send password reset email. Please try again.');
    }
  };

  return (
    <AuthBackground onNavigateHome={() => onNavigatePage('/')}>
      
      {/* =========================================================================
          LOGIN CARD COMPONENT (MATCHING REFERENCE IMAGE)
          ========================================================================= */}
      <div className="w-full max-w-[460px] bg-white/90 sm:bg-white/95 backdrop-blur-xl border border-white/80 rounded-[32px] shadow-[0_20px_60px_-15px_rgba(37,99,235,0.18),0_10px_25px_-5px_rgba(15,23,42,0.06)] p-7 sm:p-9 transition-all">
        
        {/* Top Header Row inside Card: Brand Logo + SKILLS / PROOF / CAREER microcopy */}
        <div className="flex items-start justify-between">
          
          {/* Zobly Brand Logo */}
          <div className="flex items-center">
            <ZoblyLogo className="h-8 w-auto" id="login-brand-logo" />
          </div>

          {/* Right Microcopy Badge matching reference */}
          <div className="text-right text-[9px] font-bold tracking-widest text-[#94A3B8] uppercase leading-tight font-mono select-none">
            <div>SKILLS</div>
            <div>PROOF</div>
            <div>CAREER</div>
            <div className="text-[#CBD5E1] font-normal">—</div>
          </div>

        </div>

        {/* Headings */}
        <div className="mt-6 mb-6 text-left">
          <h1 className="text-2xl sm:text-[32px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Every great career starts{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#1D4ED8]">
              somewhere.
            </span>
          </h1>

          <p className="text-sm font-semibold text-[#1E293B] mt-2">
            Keep learning. Keep building. Keep moving.
          </p>

          <p className="text-xs text-[#64748B] mt-1">
            Your next opportunity could be closer than you think.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {errors.form && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600">
              {errors.form}
            </div>
          )}
          
          {/* Email Address */}
          <div>
            <div className={`relative flex items-center rounded-xl border bg-[#F8FAFC]/80 px-3.5 py-2.5 transition-all ${errors.email ? 'border-red-400 focus-within:ring-2 focus-within:ring-red-200' : 'border-[#E2E8F0] focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/15'}`}>
              <Mail className="w-4 h-4 text-[#94A3B8] shrink-0 mr-2.5" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                }}
                placeholder="Email address"
                className="w-full bg-transparent text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-500 mt-1 pl-2">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className={`relative flex items-center rounded-xl border bg-[#F8FAFC]/80 px-3.5 py-2.5 transition-all ${errors.password ? 'border-red-400 focus-within:ring-2 focus-within:ring-red-200' : 'border-[#E2E8F0] focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/15'}`}>
              <Lock className="w-4 h-4 text-[#94A3B8] shrink-0 mr-2.5" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                }}
                placeholder="Password"
                className="w-full bg-transparent text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#94A3B8] hover:text-[#475569] transition-colors p-1 cursor-pointer focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-red-500 mt-1 pl-2">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs text-[#64748B] pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                id="login-remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#CBD5E1] text-[#2563EB] focus:ring-[#2563EB]/20 cursor-pointer"
              />
              <span className="text-[#475569]">Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-[#2563EB] hover:underline font-medium cursor-pointer focus:outline-none"
            >
              Forgot password?
            </button>
          </div>

          {/* Primary CTA: Log In → */}
          <div className="pt-2">
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed min-h-[44px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Log In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

        {/* Divider: OR */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E2E8F0]" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase font-semibold">
            <span className="bg-white/95 px-2 text-[#94A3B8]">OR</span>
          </div>
        </div>

        {/* Secondary Authentication: Continue with Google */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F8FAFC] active:bg-[#F1F5F9] border border-[#E2E8F0] text-[#1E293B] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-2xs transition-all duration-150 cursor-pointer min-h-[44px]"
        >
          {/* Official Google G Logo SVG */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.37 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* New student? Enroll Now */}
        <div className="mt-5 text-center text-xs text-[#64748B]">
          New student?{' '}
          <button
            type="button"
            onClick={() => {
              if (onOpenEnrollModal) {
                onOpenEnrollModal();
              } else {
                onNavigatePage('/');
              }
            }}
            className="font-semibold text-[#2563EB] hover:underline cursor-pointer focus:outline-none"
          >
            Enroll Now
          </button>
        </div>

        {/* Subtle Footer Microcopy */}
        <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex items-center justify-center gap-3 text-[11px] text-[#64748B]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Your data is safe with us</span>
          </div>
          <span className="text-[#CBD5E1]">|</span>
          <div className="flex items-center gap-1.5">
            <span>Made in India</span>
            <IndiaFlag className="w-3.5 h-2.5" id="login-india-flag" />
          </div>
        </div>

      </div>

      {/* Forgot Password Minimal Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-xl border border-[#E2E8F0] space-y-4">
            <h3 className="text-lg font-bold text-[#0F172A]">Reset Password</h3>
            <p className="text-xs text-[#64748B]">
              Enter your registered student email address to receive password reset instructions.
            </p>

            {forgotPasswordSubmitted ? (
              <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl flex items-center gap-2.5 text-xs text-[#1D4ED8]">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2563EB]" />
                <span>Reset instructions sent to your email.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
                {forgotError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                    {forgotError}
                  </div>
                )}
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="student@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]"
                />
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1D4ED8] text-white hover:bg-[#1E40AF]"
                  >
                    Send Instructions
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </AuthBackground>
  );
};
