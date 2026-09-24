import React, { useState, useEffect, useCallback, useTransition } from 'react';
import { useAuth } from '../../lib/firebase/authContext';
import { enrollmentService, adminNotificationService } from '../../lib/firebase/firestoreService';
import type { StudentEnrollment, AdminNotification, RegistrationStatus } from '../../types/firebase';

import { AdminSidebar, AdminTab } from '../admin/AdminSidebar';
import { AdminHeader } from '../admin/AdminHeader';
import { AdminHero } from '../admin/AdminHero';
import { AdminKpiCards } from '../admin/AdminKpiCards';
import { AdminActivityChart } from '../admin/AdminActivityChart';
import { AdminNotificationsCard } from '../admin/AdminNotificationsCard';
import { AdminRecentRegistrationsTable } from '../admin/AdminRecentRegistrationsTable';
import { AdminQuickActions } from '../admin/AdminQuickActions';
import { AdminStudentDetailDrawer } from '../admin/AdminStudentDetailDrawer';
import { AdminNewRegistrationModal } from '../admin/AdminNewRegistrationModal';

import { AdminRegistrationsView } from '../admin/AdminRegistrationsView';
import { AdminStudentsView } from '../admin/AdminStudentsView';
import { AdminCoursesView } from '../admin/AdminCoursesView';
import { AdminNotificationsView } from '../admin/AdminNotificationsView';
import { AdminSettingsView } from '../admin/AdminSettingsView';
import { AdminKpiSkeleton, AdminTableSkeleton, AdminCardsSkeleton } from '../admin/AdminLoadingSkeleton';
import { AlertTriangle } from 'lucide-react';

interface AdminPanelPageProps {
  onNavigatePage: (path: string) => void;
  currentPath?: string;
}

export const AdminPanelPage: React.FC<AdminPanelPageProps> = ({
  onNavigatePage,
  currentPath = '/admin',
}) => {
  const { user, profile, logout } = useAuth();
  const [, startTransition] = useTransition();

  // Tab State
  const initialTab: AdminTab = currentPath.includes('/registrations')
    ? 'registrations'
    : currentPath.includes('/students')
    ? 'students'
    : currentPath.includes('/notifications')
    ? 'notifications'
    : currentPath.includes('/courses')
    ? 'courses'
    : currentPath.includes('/settings')
    ? 'settings'
    : 'overview';

  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Data States
  const [enrollments, setEnrollments] = useState<StudentEnrollment[]>([]);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [selectedStudent, setSelectedStudent] = useState<StudentEnrollment | null>(null);
  const [isNewRegistrationModalOpen, setIsNewRegistrationModalOpen] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'ALL' | RegistrationStatus>('ALL');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('ALL');

  // Sync tab with URL if prop changes
  useEffect(() => {
    if (currentPath.includes('/registrations')) setActiveTab('registrations');
    else if (currentPath.includes('/students')) setActiveTab('students');
    else if (currentPath.includes('/notifications')) setActiveTab('notifications');
    else if (currentPath.includes('/courses')) setActiveTab('courses');
    else if (currentPath.includes('/settings')) setActiveTab('settings');
    else if (currentPath === '/admin') setActiveTab('overview');
  }, [currentPath]);

  // Load Data from Firebase
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const [enrollmentList, notifList] = await Promise.all([
        enrollmentService.getAllEnrollments(),
        adminNotificationService.getNotifications(),
      ]);
      setEnrollments(enrollmentList);
      setNotifications(notifList);
    } catch (err: any) {
      console.warn('Notice loading admin data:', err);
      setLoadError(err?.message || 'Failed to synchronize live records from Firestore. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Tab Change & URL sync
  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    if (tab === 'overview') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', `/admin/${tab}`);
    }
  };

  // Follow-up status update
  const handleSaveFollowUp = async (
    enrollmentId: string,
    status: RegistrationStatus,
    adminNotes: string
  ) => {
    try {
      await enrollmentService.updateStatusAndNotes(enrollmentId, status, adminNotes);
      // Optimistic update
      setEnrollments((prev) =>
        prev.map((item) =>
          item.enrollmentId === enrollmentId || item.id === enrollmentId
            ? { ...item, status, adminNotes, updatedAt: new Date() }
            : item
        )
      );
      if (selectedStudent && (selectedStudent.enrollmentId === enrollmentId || selectedStudent.id === enrollmentId)) {
        setSelectedStudent((prev) => (prev ? { ...prev, status, adminNotes } : null));
      }
    } catch (err) {
      console.warn('Notice saving follow-up:', err);
    }
  };

  // Delete enrollment
  const handleDeleteEnrollment = async (enrollmentId: string) => {
    try {
      await enrollmentService.deleteEnrollment(enrollmentId);
      setEnrollments((prev) =>
        prev.filter((e) => e.enrollmentId !== enrollmentId && e.id !== enrollmentId)
      );
      if (selectedStudent && (selectedStudent.enrollmentId === enrollmentId || selectedStudent.id === enrollmentId)) {
        setSelectedStudent(null);
      }
    } catch (err) {
      console.warn('Notice deleting enrollment:', err);
    }
  };

  // Create new registration manually
  const handleCreateRegistration = async (formData: {
    name: string;
    email: string;
    phone: string;
    college: string;
    degree: string;
    year: string;
    interestedCourse: string;
    careerInterest?: string;
    status: RegistrationStatus;
    adminNotes: string;
  }) => {
    const studentUid = `admin_created_${Date.now()}`;
    await enrollmentService.createEnrollment({
      studentId: studentUid,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      college: formData.college,
      degree: formData.degree,
      year: formData.year,
      pathway: formData.interestedCourse,
      program: 'Custom Program',
      duration: '6-weeks',
      interestedCourse: formData.interestedCourse,
      careerInterest: formData.careerInterest || '',
      status: formData.status,
      adminNotes: formData.adminNotes,
    });
    // Refresh
    await loadData();
  };

  // Notifications Actions
  const handleNotificationClick = async (notif: AdminNotification) => {
    if (!notif.read && notif.id) {
      await adminNotificationService.markAsRead(notif.id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
      );
    }
    // Find matching student
    const matched = enrollments.find(
      (e) =>
        e.enrollmentId === notif.enrollmentId ||
        (notif.studentName && e.name.toLowerCase() === notif.studentName.toLowerCase())
    );
    if (matched) {
      setSelectedStudent(matched);
    } else {
      setActiveTab('registrations');
    }
  };

  const handleMarkAllAsRead = async () => {
    await adminNotificationService.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;
  const adminDisplayName = profile?.displayName || user?.displayName || 'Admin';
  const adminEmail = user?.email || 'admin@zobly.in';

  // Filtered registrations if global header search query is active
  const displayedEnrollments = searchQuery
    ? enrollments.filter(
        (e) =>
          (e.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (e.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (e.college || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (e.interestedCourse || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    : enrollments;

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex text-[#0F172A] font-sans antialiased selection:bg-[#0080FF] selection:text-white">
      {/* 1. Left Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        unreadCount={unreadNotifCount}
        adminName={adminDisplayName}
        adminEmail={adminEmail}
        onLogout={logout}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <AdminHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          unreadCount={unreadNotifCount}
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
          onViewAllNotifications={() => handleSelectTab('notifications')}
          adminName={adminDisplayName}
          adminEmail={adminEmail}
          isLoading={isLoading}
          onRefresh={loadData}
          onLogout={logout}
          onNavigateHome={() => onNavigatePage('/')}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dashboard Main Workspace */}
        <main className="flex-1 p-4 sm:p-7 md:p-8 max-w-[1400px] w-full mx-auto space-y-6 sm:space-y-7">
          {/* Synchronize Error Banner with Retry */}
          {loadError && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between gap-3 text-xs sm:text-sm animate-in fade-in duration-150">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>{loadError}</span>
              </div>
              <button
                onClick={loadData}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs cursor-pointer shrink-0 transition-colors shadow-2xs"
              >
                Retry Sync
              </button>
            </div>
          )}

          {/* Initial Loading Skeletons */}
          {isLoading && enrollments.length === 0 ? (
            <div className="space-y-6">
              <AdminHero adminName={adminDisplayName} />
              <AdminKpiSkeleton />
              <AdminTableSkeleton rows={6} />
            </div>
          ) : (
            <>
              {/* TAB: OVERVIEW (Primary Visual Design from Reference Image) */}
              {activeTab === 'overview' && (
                <>
                  {/* Hero Banner with Soft Gradient & 3D Glass Cards */}
                  <AdminHero adminName={adminDisplayName} />

                  {/* 5 KPI Metric Cards with Sparklines */}
                  <AdminKpiCards
                    enrollments={enrollments}
                    onSelectFilter={(status) => {
                      setSelectedStatusFilter(status);
                      setSelectedCourseFilter('ALL');
                      setActiveTab('registrations');
                    }}
                  />

                  {/* Middle Section: Registration Activity Chart (2/3) + Notifications (1/3) */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                    <div className="lg:col-span-2">
                      <AdminActivityChart enrollments={enrollments} />
                    </div>
                    <div className="lg:col-span-1">
                      <AdminNotificationsCard
                        notifications={notifications}
                        onSelectNotification={handleNotificationClick}
                        onViewAll={() => handleSelectTab('notifications')}
                      />
                    </div>
                  </div>

                  {/* Lower Section: Recent Registrations Table (2/3) + Quick Actions & Total Active Widget (1/3) */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                    <div className="lg:col-span-2">
                      <AdminRecentRegistrationsTable
                        enrollments={displayedEnrollments}
                        onViewStudent={(student) => setSelectedStudent(student)}
                        onViewAll={() => handleSelectTab('registrations')}
                        onQuickUpdateStatus={async (id, status) => {
                          await handleSaveFollowUp(id, status, '');
                        }}
                        onDeleteEnrollment={handleDeleteEnrollment}
                      />
                    </div>
                    <div className="lg:col-span-1">
                      <AdminQuickActions
                        totalActiveCount={enrollments.length}
                        onAddNewRegistration={() => setIsNewRegistrationModalOpen(true)}
                        onViewAllRegistrations={() => handleSelectTab('registrations')}
                        onManageNotifications={() => handleSelectTab('notifications')}
                      />
                    </div>
                  </div>
                </>
              )}

          {/* TAB: REGISTRATIONS */}
          {activeTab === 'registrations' && (
            <AdminRegistrationsView
              enrollments={displayedEnrollments}
              initialStatusFilter={selectedStatusFilter}
              initialCourseFilter={selectedCourseFilter}
              onViewStudent={(student) => setSelectedStudent(student)}
              onAddNewRegistration={() => setIsNewRegistrationModalOpen(true)}
              onQuickUpdateStatus={async (id, status) => {
                await handleSaveFollowUp(id, status, '');
              }}
              onDeleteEnrollment={handleDeleteEnrollment}
            />
          )}

          {/* TAB: STUDENTS */}
          {activeTab === 'students' && (
            <AdminStudentsView
              enrollments={displayedEnrollments}
              onViewStudent={(student) => setSelectedStudent(student)}
            />
          )}

          {/* TAB: COURSES */}
          {activeTab === 'courses' && (
            <AdminCoursesView
              enrollments={enrollments}
              onSelectCourseFilter={(courseName) => {
                setSelectedCourseFilter(courseName);
                setSelectedStatusFilter('ALL');
                setActiveTab('registrations');
              }}
            />
          )}

          {/* TAB: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <AdminNotificationsView
              notifications={notifications}
              onSelectNotification={handleNotificationClick}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <AdminSettingsView
              adminProfile={profile}
              adminEmail={adminEmail}
              adminName={adminDisplayName}
            />
          )}
            </>
          )}
        </main>
      </div>

      {/* 3. Student Registration Detail Side Drawer */}
      <AdminStudentDetailDrawer
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onSaveFollowUp={handleSaveFollowUp}
        onDeleteEnrollment={handleDeleteEnrollment}
      />

      {/* 4. Add New Registration Modal */}
      <AdminNewRegistrationModal
        isOpen={isNewRegistrationModalOpen}
        onClose={() => setIsNewRegistrationModalOpen(false)}
        onSubmit={handleCreateRegistration}
      />
    </div>
  );
};
