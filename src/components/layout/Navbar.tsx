import React, { useState } from 'react';
import { Menu, X, ArrowRight, User, LogOut, Sparkles, Shield } from 'lucide-react';
import { ZoblyLogo } from '../common/ZoblyLogo';
import { useAuth } from '../../lib/firebase/authContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAuditModal: () => void;
  onNavigatePage?: (path: string) => void;
  onOpenEnrollModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenAuditModal,
  onNavigatePage,
  onOpenEnrollModal,
}) => {
  const { user, profile, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'tracks', label: 'Explore Paths' },
    { id: 'philosophy', label: 'How It Works' },
    { id: 'pricing', label: 'Programs & Pricing' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#F1F5F9] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo: 3D glossy inflatable Zobly logo */}
        <button
          id="nav-brand-logo"
          onClick={() => {
            if (onNavigatePage && window.location.pathname !== '/') {
              onNavigatePage('/');
            } else {
              onNavigate('hero');
            }
          }}
          className="flex items-center text-left focus:outline-none rounded-lg cursor-pointer py-1 group transition-transform hover:scale-102"
          aria-label="Zobly Home"
        >
          <ZoblyLogo className="h-8 sm:h-11 w-auto" id="nav-brand-logo-img" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-link-${link.id}`}
              onClick={() => onNavigate(link.id)}
              className="text-sm font-medium text-[#334155] hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 shrink-0">
          {user ? (
            <div className="relative">
              <button
                id="nav-user-profile-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#0F172A] bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl transition-all shadow-2xs cursor-pointer min-h-[36px] sm:min-h-[40px]"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#EFF6FF] text-[#2563EB] font-bold text-[10px] flex items-center justify-center">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline max-w-[120px] truncate">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-2 border-b border-[#F1F5F9]">
                    <div className="text-xs font-bold text-[#0F172A] truncate">
                      {user.displayName || 'Student'}
                    </div>
                    <div className="text-[10px] text-[#64748B] truncate">
                      {user.email}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      if (onNavigatePage) onNavigatePage('/dashboard');
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold text-[#334155] hover:bg-[#F8FAFC] hover:text-[#2563EB] flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>My Registration Status</span>
                  </button>

                  {profile?.role === 'admin' && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        if (onNavigatePage) onNavigatePage('/admin');
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-semibold text-[#1D4ED8] bg-blue-50/60 hover:bg-blue-100/60 flex items-center gap-2 cursor-pointer"
                    >
                      <Shield className="w-3.5 h-3.5 text-[#1D4ED8]" />
                      <span>Admissions CRM</span>
                    </button>
                  )}

                  <button
                    onClick={async () => {
                      setUserDropdownOpen(false);
                      await logout();
                      if (onNavigatePage) onNavigatePage('/');
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer border-t border-[#F1F5F9]"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Login button: visible across all screens including mobile */
            <button
              id="nav-login-btn"
              onClick={() => onNavigatePage ? onNavigatePage('/login') : onOpenAuditModal()}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 xs:px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11px] xs:text-xs sm:text-sm font-semibold text-[#0F172A] bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl transition-all duration-150 cursor-pointer shadow-2xs whitespace-nowrap min-h-[36px] sm:min-h-[40px] shrink-0"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#475569] shrink-0" />
              <span>Login</span>
            </button>
          )}

          {/* Start Assessment CTA button: responsive label for tight viewports */}
          <button
            id="nav-cta-assessment"
            onClick={onOpenAuditModal}
            className="group inline-flex items-center gap-1 sm:gap-2 px-2.5 xs:px-3 sm:px-5 py-1.5 sm:py-2.5 text-[11px] xs:text-xs sm:text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-xl transition-all duration-150 shadow-xs cursor-pointer whitespace-nowrap min-h-[36px] sm:min-h-[40px] shrink-0"
          >
            <span className="hidden xs:inline">Start Assessment</span>
            <span className="xs:hidden">Assessment</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>

          {/* Mobile Menu Toggle for accessing sub-navigation */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-1.5 xs:p-2 sm:p-2.5 rounded-xl text-[#334155] hover:bg-[#F1F5F9] focus:outline-none lg:hidden cursor-pointer min-w-[36px] min-h-[36px] sm:min-w-[42px] sm:min-h-[42px] flex items-center justify-center border border-[#E2E8F0]/70 sm:border-transparent shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E2E8F0] bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3.5 py-3 rounded-xl text-sm font-semibold text-[#1E293B] hover:bg-[#F8FAFC] hover:text-[#1D4ED8] flex items-center justify-between min-h-[44px] cursor-pointer"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#94A3B8]">→</span>
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-[#F1F5F9] flex flex-col gap-2.5">
            {user ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigatePage) onNavigatePage('/dashboard');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-blue-50 border border-blue-200 text-[#1D4ED8] font-semibold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer min-h-[44px]"
                >
                  <Sparkles className="w-4 h-4 text-[#2563EB]" />
                  <span>My Proof Dashboard ({user.displayName || user.email?.split('@')[0]})</span>
                </button>
                <button
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await logout();
                    if (onNavigatePage) onNavigatePage('/');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#E2E8F0] text-red-600 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) {
                    onNavigatePage('/login');
                  } else {
                    onOpenAuditModal();
                  }
                }}
                className="w-full py-3 px-4 rounded-xl bg-white border border-[#E2E8F0] text-[#0F172A] font-semibold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer min-h-[44px]"
              >
                <User className="w-4 h-4 text-[#475569]" />
                <span>Student Login</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuditModal();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer min-h-[44px]"
            >
              <span>Take Diagnostic Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

