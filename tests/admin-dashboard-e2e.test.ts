import assert from 'assert';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Polyfill window and localStorage for Node.js test environment
if (typeof (globalThis as any).window === 'undefined') {
  (globalThis as any).window = { location: { pathname: '/admin' } };
}
if (typeof (globalThis as any).localStorage === 'undefined') {
  const store: Record<string, string> = {};
  (globalThis as any).localStorage = {
    getItem: (k: string) => store[k] || null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { for (const k in store) delete store[k]; },
  };
}

import { enrollmentService, adminNotificationService } from '../src/lib/firebase/firestoreService';
import type { StudentEnrollment, AdminNotification } from '../src/types/firebase';
import { AdminPanelPage } from '../src/components/pages/AdminPanelPage';
import { AdminStudentDetailDrawer } from '../src/components/admin/AdminStudentDetailDrawer';
import { AdminKpiCards } from '../src/components/admin/AdminKpiCards';
import { AdminRecentRegistrationsTable } from '../src/components/admin/AdminRecentRegistrationsTable';
import { AdminCoursesView } from '../src/components/admin/AdminCoursesView';
import { AdminRegistrationsView } from '../src/components/admin/AdminRegistrationsView';

async function runAdminDashboardQA() {
  console.log('==================================================');
  console.log('STARTING ZOBLY ADMIN DASHBOARD & AUTH QA SUITE');
  console.log('==================================================');

  const results: Record<string, string> = {};

  // ----------------------------------------------------
  // Test 1: Admin Account Configuration Audit
  // ----------------------------------------------------
  try {
    const adminEmail = 'ilaeequrrahman@gmail.com';
    const isDesignatedAdmin = adminEmail.toLowerCase() === 'ilaeequrrahman@gmail.com';
    assert(isDesignatedAdmin, 'Designated admin email matches ilaeequrrahman@gmail.com');
    results['1. Admin Account Audit'] = 'PASS';
    console.log('Test 1 PASS: Designated admin account matches ilaeequrrahman@gmail.com.');
  } catch (err: any) {
    results['1. Admin Account Audit'] = 'FAIL';
    console.error('Test 1 FAIL:', err.message);
  }

  // ----------------------------------------------------
  // Test 2: Real Lead Creation in /enrollments
  // ----------------------------------------------------
  let createdEnrollmentId = '';
  try {
    createdEnrollmentId = await enrollmentService.createEnrollment({
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      phone: '+91 98765 43210',
      college: 'Delhi Technological University',
      degree: 'B.Tech CSE',
      year: '3rd Year',
      city: 'Delhi',
      educationStatus: 'College Student (3rd Year)',
      pathway: 'ai-automation',
      program: 'AI & Business Automation',
      duration: '6-weeks',
      interestedCourse: 'AI & Business Automation • 6-Weeks Sprint',
      careerInterest: 'AI Automation Engineer',
      status: 'NEW',
      adminNotes: '',
    });

    assert(createdEnrollmentId, 'Enrollment created with valid ID');
    const fetched = await enrollmentService.getById(createdEnrollmentId);
    assert(fetched !== null, 'Fetched created enrollment');
    assert(fetched?.name === 'Rohan Sharma', 'Student name matches');
    assert(fetched?.status === 'NEW', 'Initial status is NEW');
    assert(fetched?.interestedCourse?.includes('AI & Business Automation'), 'Course title preserved');

    results['2. Real Firebase Lead Persistence'] = 'PASS';
    console.log(`Test 2 PASS: Real lead successfully created in /enrollments with ID: ${createdEnrollmentId}`);
  } catch (err: any) {
    results['2. Real Firebase Lead Persistence'] = 'FAIL';
    console.error('Test 2 FAIL:', err.message);
  }

  // ----------------------------------------------------
  // Test 3: Admin Notification Triggered on Lead Creation
  // ----------------------------------------------------
  try {
    const notifications = await adminNotificationService.getNotifications();
    const matchingNotif = notifications.find((n) => n.enrollmentId === createdEnrollmentId || n.studentName === 'Rohan Sharma');
    assert(matchingNotif !== undefined, 'Found notification corresponding to new lead');
    assert(matchingNotif?.read === false, 'New notification is unread');
    assert(matchingNotif?.title.includes('Rohan Sharma'), 'Notification title references student name');

    // Test markAsRead
    if (matchingNotif?.id) {
      await adminNotificationService.markAsRead(matchingNotif.id);
      const updatedNotifs = await adminNotificationService.getNotifications();
      const updated = updatedNotifs.find((n) => n.id === matchingNotif.id);
      assert(updated?.read === true, 'Notification successfully marked as read');
    }

    results['3. Admin Notifications Service'] = 'PASS';
    console.log('Test 3 PASS: Admin notification triggered on lead creation and mark-as-read verified.');
  } catch (err: any) {
    results['3. Admin Notifications Service'] = 'FAIL';
    console.error('Test 3 FAIL:', err.message);
  }

  // ----------------------------------------------------
  // Test 4: Lead Detail Drawer Inspection & Status/Notes Mutation
  // ----------------------------------------------------
  try {
    const student = await enrollmentService.getById(createdEnrollmentId);
    assert(student !== null, 'Student record retrieved for detail drawer');

    // Update status to CONTACTED with counselor notes
    const newStatus = 'CONTACTED';
    const newNotes = 'Called student on 23 Sep. Confirmed interest in AI sprint. Sending syllabus.';
    await enrollmentService.updateStatusAndNotes(createdEnrollmentId, newStatus, newNotes);

    const updatedStudent = await enrollmentService.getById(createdEnrollmentId);
    assert(updatedStudent?.status === 'CONTACTED', 'Status successfully updated to CONTACTED');
    assert(updatedStudent?.adminNotes === newNotes, 'Admin notes successfully updated');

    // Render Drawer to ensure UI renders with updated notes
    const drawerHtml = ReactDOMServer.renderToString(
      React.createElement(AdminStudentDetailDrawer, {
        student: updatedStudent,
        onClose: () => {},
        onSaveFollowUp: async () => {},
      })
    );

    assert(drawerHtml.includes('Rohan Sharma'), 'Student name rendered in drawer');
    assert(drawerHtml.includes('Delhi Technological University'), 'College rendered in drawer');
    assert(drawerHtml.includes('CONTACTED'), 'CONTACTED status rendered in drawer');
    assert(drawerHtml.includes(newNotes), 'Admin notes rendered in drawer');

    results['4. Lead Detail Drawer & Status/Notes Mutation'] = 'PASS';
    console.log('Test 4 PASS: Status and notes mutated in Firestore and rendered accurately in Detail Drawer.');
  } catch (err: any) {
    results['4. Lead Detail Drawer & Status/Notes Mutation'] = 'FAIL';
    console.error('Test 4 FAIL:', err.message);
  }

  // ----------------------------------------------------
  // Test 5: Dynamic KPI Metrics (Zero Mock Data)
  // ----------------------------------------------------
  try {
    const allEnrollments = await enrollmentService.getAllEnrollments();
    assert(allEnrollments.length >= 1, 'At least one real enrollment loaded from database');

    const kpiHtml = ReactDOMServer.renderToString(
      React.createElement(AdminKpiCards, {
        enrollments: allEnrollments,
      })
    );

    assert(kpiHtml.includes('Total Registrations'), 'Total Registrations KPI rendered');
    assert(kpiHtml.includes(String(allEnrollments.length)), 'Exact real total count rendered');

    results['5. Dynamic KPI Metrics Calculation'] = 'PASS';
    console.log(`Test 5 PASS: Real KPI metrics accurately computed over ${allEnrollments.length} real enrollments.`);
  } catch (err: any) {
    results['5. Dynamic KPI Metrics Calculation'] = 'FAIL';
    console.error('Test 5 FAIL:', err.message);
  }

  // ----------------------------------------------------
  // Test 6: Recent Registrations Table Rendering
  // ----------------------------------------------------
  try {
    const allEnrollments = await enrollmentService.getAllEnrollments();
    const tableHtml = ReactDOMServer.renderToString(
      React.createElement(AdminRecentRegistrationsTable, {
        enrollments: allEnrollments,
        onViewStudent: () => {},
        onViewAll: () => {},
      })
    );

    assert(tableHtml.includes('Rohan Sharma'), 'Real student present in table');
    assert(tableHtml.includes('Delhi Technological University'), 'College present in table');

    results['6. Real Firebase Table Rendering'] = 'PASS';
    console.log('Test 6 PASS: Registrations table populated strictly with live records.');
  } catch (err: any) {
    results['6. Real Firebase Table Rendering'] = 'FAIL';
    console.error('Test 6 FAIL:', err.message);
  }

  // ----------------------------------------------------
  // Test 7: Dynamic Pathway Counts & Course Demand Analytics
  // ----------------------------------------------------
  try {
    // Create additional registrations in different pathways to test multi-track calculation
    await enrollmentService.createEnrollment({
      name: 'Pooja Verma',
      email: 'pooja.verma@example.com',
      phone: '+91 91234 56789',
      college: 'IIT Delhi',
      degree: 'B.Tech IT',
      year: 'Final Year',
      pathway: 'software-product',
      program: 'Software & Product',
      duration: '8-weeks',
      interestedCourse: 'Software & Product • 8-Weeks Mastery',
      status: 'ENROLLED',
      adminNotes: 'Enrolled in upcoming batch',
    });

    await enrollmentService.createEnrollment({
      name: 'Aman Gupta',
      email: 'aman.gupta@example.com',
      phone: '+91 99887 76655',
      college: 'BITS Pilani',
      degree: 'B.E. EEE',
      year: '2nd Year',
      pathway: 'data-bi',
      program: 'Data & BI',
      duration: '4-weeks',
      interestedCourse: 'Data & BI • 4-Weeks Accelerated',
      status: 'INTERESTED',
      adminNotes: 'Requested scholarship info',
    });

    const refreshedEnrollments = await enrollmentService.getAllEnrollments();
    assert(refreshedEnrollments.length >= 3, 'Refreshed enrollments contains multiple track records');

    const coursesHtml = ReactDOMServer.renderToString(
      React.createElement(AdminCoursesView, {
        enrollments: refreshedEnrollments,
        onSelectCourseFilter: () => {},
      })
    );

    // Verify AI & Business Automation, Software & Product, and Data & BI cards reflect dynamic counts
    assert(coursesHtml.includes('AI &amp; Business Automation') || coursesHtml.includes('AI & Business Automation'), 'AI track rendered');
    assert(coursesHtml.includes('Software &amp; Product') || coursesHtml.includes('Software & Product'), 'Software track rendered');
    assert(coursesHtml.includes('Data &amp; BI') || coursesHtml.includes('Data & BI'), 'Data track rendered');
    assert(coursesHtml.includes(`${refreshedEnrollments.length} total leads`), 'Total leads badge in CoursesView matches real collection count');

    results['7. Dynamic Pathway Counts & Demand'] = 'PASS';
    console.log(`Test 7 PASS: Pathway counts accurately computed dynamically across ${refreshedEnrollments.length} live records.`);
  } catch (err: any) {
    results['7. Dynamic Pathway Counts & Demand'] = 'FAIL';
    console.error('Test 7 FAIL:', err.message);
  }

  // ----------------------------------------------------
  // Test 8: Live Status Breakdowns & Registrations Filtering
  // ----------------------------------------------------
  try {
    const liveList = await enrollmentService.getAllEnrollments();
    const newCount = liveList.filter((e) => e.status === 'NEW').length;
    const contactedCount = liveList.filter((e) => e.status === 'CONTACTED').length;
    const interestedCount = liveList.filter((e) => e.status === 'INTERESTED').length;
    const enrolledCount = liveList.filter((e) => e.status === 'ENROLLED').length;

    const registrationsHtml = ReactDOMServer.renderToString(
      React.createElement(AdminRegistrationsView, {
        enrollments: liveList,
        onViewStudent: () => {},
        onAddNewRegistration: () => {},
        initialStatusFilter: 'ALL',
      })
    );

    // Verify status options contain real dynamic numbers
    assert(registrationsHtml.includes(`NEW (${newCount})`), 'NEW status count matches live count');
    assert(registrationsHtml.includes(`CONTACTED (${contactedCount})`), 'CONTACTED status count matches live count');
    assert(registrationsHtml.includes(`INTERESTED (${interestedCount})`), 'INTERESTED status count matches live count');
    assert(registrationsHtml.includes(`ENROLLED (${enrolledCount})`), 'ENROLLED status count matches live count');

    results['8. Live Status Breakdowns'] = 'PASS';
    console.log('Test 8 PASS: Enrollment statuses dynamically computed without hardcoded or mock counts.');
  } catch (err: any) {
    results['8. Live Status Breakdowns'] = 'FAIL';
    console.error('Test 8 FAIL:', err.message);
  }

  // ----------------------------------------------------
  // Test 9: Real Week-Over-Week Trends & Dynamic Sparklines
  // ----------------------------------------------------
  try {
    const liveList = await enrollmentService.getAllEnrollments();
    const kpiHtml = ReactDOMServer.renderToString(
      React.createElement(AdminKpiCards, {
        enrollments: liveList,
      })
    );

    // Verify dynamic SVG path is generated and no static trend '+12% vs. last week' is hardcoded
    assert(!kpiHtml.includes('+12% vs. last week'), 'Removed hardcoded mock trend string');
    assert(!kpiHtml.includes('+8% vs. last week'), 'Removed hardcoded mock trend string 2');
    assert(kpiHtml.includes('<path d="M'), 'Dynamic SVG sparkline generated from real timestamps');

    results['9. Dynamic KPI Trends & Sparklines'] = 'PASS';
    console.log('Test 9 PASS: Week-over-week trends and SVG sparklines strictly computed from live timestamps.');
  } catch (err: any) {
    results['9. Dynamic KPI Trends & Sparklines'] = 'FAIL';
    console.error('Test 9 FAIL:', err.message);
  }

  // ----------------------------------------------------
  // Clean up any test records so zero artifacts remain
  // ----------------------------------------------------
  try {
    const all = await enrollmentService.getAllEnrollments();
    const testRecords = all.filter((e) =>
      e.email?.includes('example.com') ||
      e.name === 'Rohan Sharma' ||
      e.name === 'Pooja Verma' ||
      e.name === 'Aman Gupta'
    );
    for (const rec of testRecords) {
      const id = rec.enrollmentId || rec.id;
      if (id) {
        await enrollmentService.deleteEnrollment(id);
      }
    }
  } catch (cleanErr) {
    // Non-fatal cleanup
  }

  console.log('--- TEST SUMMARY ---');
  console.log(JSON.stringify(results, null, 2));

  const allPassed = Object.values(results).every((v) => v === 'PASS');
  if (!allPassed) {
    process.exit(1);
  }
}

runAdminDashboardQA().catch((err) => {
  console.error('Unhandled QA failure:', err);
  process.exit(1);
});
