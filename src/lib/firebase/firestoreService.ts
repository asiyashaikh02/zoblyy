import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore';
import { db } from './config';
import type {
  UserProfile,
  UserResume,
  UserProject,
  CareerPlan,
  InterviewSession,
  JobApplication,
  AiGeneration,
  StudentEnrollment,
  AdminNotification,
  RegistrationStatus,
} from '../../types/firebase';

export const COLLECTIONS = {
  USERS: 'users',
  USER_PROFILES: 'userProfiles',
  ENROLLMENTS: 'enrollments',
  ADMIN_NOTIFICATIONS: 'adminNotifications',
  ADMINS: 'admins',
  RESUMES: 'resumes',
  PROJECTS: 'projects',
  CAREER_PLANS: 'careerPlans',
  INTERVIEWS: 'interviews',
  JOB_APPLICATIONS: 'jobApplications',
  AI_GENERATIONS: 'aiGenerations',
} as const;

export const enrollmentService = {
  async createEnrollment(data: Omit<StudentEnrollment, 'id' | 'enrollmentId' | 'createdAt' | 'updatedAt'> & { studentId?: string }): Promise<string> {
    const leadId = data.studentId || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const courseTitle = data.interestedCourse || `${data.pathway || 'Selected Pathway'} • ${data.duration || data.program || 'Program'}`;
    const generatedId = `enrollment_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Always persist to local cache first so applicant data is never lost
    const newRecord: StudentEnrollment = {
      ...data,
      id: generatedId,
      enrollmentId: generatedId,
      studentId: leadId,
      interestedCourse: courseTitle,
      college: data.college || '',
      city: data.city || '',
      educationStatus: data.educationStatus || '',
      status: data.status || 'NEW',
      adminNotes: data.adminNotes || '',
      createdAt: { seconds: Math.floor(Date.now() / 1000) },
      updatedAt: { seconds: Math.floor(Date.now() / 1000) },
    };

    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('zobly_local_enrollments');
        const list: StudentEnrollment[] = stored ? JSON.parse(stored) : [];
        list.unshift(newRecord);
        localStorage.setItem('zobly_local_enrollments', JSON.stringify(list));

        const storedNotifs = localStorage.getItem('zobly_local_notifications');
        const notifs: AdminNotification[] = storedNotifs ? JSON.parse(storedNotifs) : [];
        notifs.unshift({
          id: `notif_${Date.now()}`,
          type: 'new_registration',
          title: `New student registration: ${data.name}`,
          message: `${data.name} (${data.college || data.city || 'Applicant'}) registered for ${courseTitle}`,
          enrollmentId: generatedId,
          studentId: leadId,
          studentName: data.name,
          read: false,
          createdAt: { seconds: Math.floor(Date.now() / 1000) },
        });
        localStorage.setItem('zobly_local_notifications', JSON.stringify(notifs));
      }
    } catch (storageErr) {
      console.warn('LocalStorage save warning:', storageErr);
    }

    if (db) {
      try {
        // Add enrollment record in Firestore
        const ref = await addDoc(collection(db, COLLECTIONS.ENROLLMENTS), {
          ...data,
          studentId: leadId,
          interestedCourse: courseTitle,
          college: data.college || '',
          city: data.city || '',
          educationStatus: data.educationStatus || '',
          status: data.status || 'NEW',
          adminNotes: data.adminNotes || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        // Also update with its generated ID
        await updateDoc(ref, {
          id: ref.id,
          enrollmentId: ref.id,
        });

        // Generate in-app admin notification
        try {
          await addDoc(collection(db, COLLECTIONS.ADMIN_NOTIFICATIONS), {
            type: 'new_registration',
            title: `New student registration: ${data.name}`,
            message: `${data.name} (${data.college || data.city || 'Applicant'}) registered for ${courseTitle}`,
            enrollmentId: ref.id,
            studentId: leadId,
            studentName: data.name,
            read: false,
            createdAt: serverTimestamp(),
          });
        } catch (notifErr) {
          console.warn('Could not generate Firestore admin notification:', notifErr);
        }

        return ref.id;
      } catch (firestoreErr) {
        console.warn('Firestore createEnrollment synced to persistent local store:', firestoreErr);
      }
    }

    return generatedId;
  },

  async getByStudentId(studentId: string): Promise<StudentEnrollment[]> {
    if (db) {
      try {
        const q = query(
          collection(db, COLLECTIONS.ENROLLMENTS),
          where('studentId', '==', studentId),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        return snap.docs.map((d) => ({ id: d.id, enrollmentId: d.id, ...d.data() } as StudentEnrollment));
      } catch (err) {
        console.warn('Firestore getByStudentId fallback to local storage:', err);
      }
    }
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('zobly_local_enrollments');
        const list: StudentEnrollment[] = stored ? JSON.parse(stored) : [];
        return list.filter((e) => e.studentId === studentId);
      }
      return [];
    } catch {
      return [];
    }
  },

  async getAllEnrollments(): Promise<StudentEnrollment[]> {
    let firestoreList: StudentEnrollment[] = [];
    if (db) {
      try {
        let snap;
        try {
          const q = query(
            collection(db, COLLECTIONS.ENROLLMENTS),
            orderBy('createdAt', 'desc')
          );
          snap = await getDocs(q);
        } catch {
          // Fallback if index on createdAt is pending or rules require simple collection query
          snap = await getDocs(collection(db, COLLECTIONS.ENROLLMENTS));
        }
        firestoreList = snap.docs.map((d) => ({ id: d.id, enrollmentId: d.id, ...d.data() } as StudentEnrollment));
      } catch (err) {
        console.warn('Firestore getAllEnrollments falling back to persistent storage:', err);
      }
    }

    try {
      const stored = typeof window !== 'undefined' && typeof localStorage !== 'undefined'
        ? localStorage.getItem('zobly_local_enrollments')
        : null;
      const localList: StudentEnrollment[] = stored ? JSON.parse(stored) : [];

      if (firestoreList.length > 0) {
        const ids = new Set(firestoreList.map((e) => e.enrollmentId || e.id));
        const missingFromFirestore = localList.filter((e) => !ids.has(e.enrollmentId || e.id));
        const combined = [...firestoreList, ...missingFromFirestore];
        return combined.sort((a, b) => {
          const timeA = a.createdAt?.seconds || (typeof a.createdAt === 'string' ? new Date(a.createdAt).getTime() / 1000 : 0);
          const timeB = b.createdAt?.seconds || (typeof b.createdAt === 'string' ? new Date(b.createdAt).getTime() / 1000 : 0);
          return timeB - timeA;
        });
      }
      return localList;
    } catch {
      return firestoreList;
    }
  },

  async updateStatusAndNotes(enrollmentId: string, status: RegistrationStatus, adminNotes: string): Promise<void> {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('zobly_local_enrollments');
        const list: StudentEnrollment[] = stored ? JSON.parse(stored) : [];
        const updated = list.map((item) =>
          item.id === enrollmentId || item.enrollmentId === enrollmentId
            ? { ...item, status, adminNotes, updatedAt: { seconds: Math.floor(Date.now() / 1000) } }
            : item
        );
        localStorage.setItem('zobly_local_enrollments', JSON.stringify(updated));
      }
    } catch (storageErr) {
      console.warn(storageErr);
    }

    if (db) {
      try {
        await updateDoc(doc(db, COLLECTIONS.ENROLLMENTS, enrollmentId), {
          status,
          adminNotes,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        console.warn('Firestore updateStatusAndNotes synced to local store:', err);
      }
    }
  },

  async getById(enrollmentId: string): Promise<StudentEnrollment | null> {
    if (db) {
      try {
        const snap = await getDoc(doc(db, COLLECTIONS.ENROLLMENTS, enrollmentId));
        if (snap.exists()) {
          return { id: snap.id, enrollmentId: snap.id, ...snap.data() } as StudentEnrollment;
        }
      } catch (err) {
        console.warn('Firestore getById fallback to local store:', err);
      }
    }
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('zobly_local_enrollments');
        const list: StudentEnrollment[] = stored ? JSON.parse(stored) : [];
        return list.find((e) => e.id === enrollmentId || e.enrollmentId === enrollmentId) || null;
      }
      return null;
    } catch {
      return null;
    }
  },

  async deleteEnrollment(enrollmentId: string): Promise<void> {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('zobly_local_enrollments');
        const list: StudentEnrollment[] = stored ? JSON.parse(stored) : [];
        const filtered = list.filter((e) => e.id !== enrollmentId && e.enrollmentId !== enrollmentId);
        localStorage.setItem('zobly_local_enrollments', JSON.stringify(filtered));
      }
    } catch (storageErr) {
      console.warn(storageErr);
    }

    if (db) {
      try {
        await deleteDoc(doc(db, COLLECTIONS.ENROLLMENTS, enrollmentId));
      } catch (err) {
        console.warn('Firestore deleteEnrollment synced to local store:', err);
      }
    }
  },
};

export const adminNotificationService = {
  async getNotifications(): Promise<AdminNotification[]> {
    let firestoreList: AdminNotification[] = [];
    if (db) {
      try {
        let snap;
        try {
          const q = query(
            collection(db, COLLECTIONS.ADMIN_NOTIFICATIONS),
            orderBy('createdAt', 'desc')
          );
          snap = await getDocs(q);
        } catch {
          snap = await getDocs(collection(db, COLLECTIONS.ADMIN_NOTIFICATIONS));
        }
        firestoreList = snap.docs.map((d) => ({ id: d.id, ...d.data() } as AdminNotification));
      } catch (err) {
        console.warn('Firestore getNotifications falling back to persistent storage:', err);
      }
    }

    try {
      const stored = typeof window !== 'undefined' && typeof localStorage !== 'undefined'
        ? localStorage.getItem('zobly_local_notifications')
        : null;
      const localList: AdminNotification[] = stored ? JSON.parse(stored) : [];

      if (firestoreList.length > 0) {
        const ids = new Set(firestoreList.map((n) => n.id));
        const missing = localList.filter((n) => !ids.has(n.id));
        return [...firestoreList, ...missing];
      }
      return localList;
    } catch {
      return firestoreList;
    }
  },

  async markAsRead(notificationId: string): Promise<void> {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('zobly_local_notifications');
        const list: AdminNotification[] = stored ? JSON.parse(stored) : [];
        const updated = list.map((n) => (n.id === notificationId ? { ...n, read: true } : n));
        localStorage.setItem('zobly_local_notifications', JSON.stringify(updated));
      }
    } catch (err) {
      console.warn(err);
    }

    if (db) {
      try {
        await updateDoc(doc(db, COLLECTIONS.ADMIN_NOTIFICATIONS, notificationId), {
          read: true,
        });
      } catch (err) {
        console.warn('Firestore markAsRead synced to local store:', err);
      }
    }
  },

  async markAllAsRead(): Promise<void> {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('zobly_local_notifications');
        const list: AdminNotification[] = stored ? JSON.parse(stored) : [];
        const updated = list.map((n) => ({ ...n, read: true }));
        localStorage.setItem('zobly_local_notifications', JSON.stringify(updated));
      }
    } catch (err) {
      console.warn(err);
    }

    if (db) {
      try {
        const unreadQ = query(
          collection(db, COLLECTIONS.ADMIN_NOTIFICATIONS),
          where('read', '==', false)
        );
        const snap = await getDocs(unreadQ);
        const promises = snap.docs.map((d) => updateDoc(d.ref, { read: true }));
        await Promise.all(promises);
      } catch (err) {
        console.warn('Firestore markAllAsRead synced to local store:', err);
      }
    }
  },
};

export const userProfileService = {
  async get(uid: string): Promise<UserProfile | null> {
    if (!db) return null;
    const snap = await getDoc(doc(db, COLLECTIONS.USERS, uid));
    return snap.exists() ? (snap.data() as UserProfile) : null;
  },

  async update(uid: string, data: Partial<UserProfile>): Promise<void> {
    if (!db) throw new Error('Firestore not initialized');
    await updateDoc(doc(db, COLLECTIONS.USERS, uid), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  },
};

export const resumeService = {
  async getByUserId(userId: string): Promise<UserResume[]> {
    if (!db) return [];
    const q = query(
      collection(db, COLLECTIONS.RESUMES),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserResume));
  },

  async create(data: Omit<UserResume, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!db) throw new Error('Firestore not initialized');
    const ref = await addDoc(collection(db, COLLECTIONS.RESUMES), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return ref.id;
  },

  async delete(id: string): Promise<void> {
    if (!db) throw new Error('Firestore not initialized');
    await deleteDoc(doc(db, COLLECTIONS.RESUMES, id));
  },
};

export const projectService = {
  async getByUserId(userId: string): Promise<UserProject[]> {
    if (!db) return [];
    const q = query(
      collection(db, COLLECTIONS.PROJECTS),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserProject));
  },

  async create(data: Omit<UserProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!db) throw new Error('Firestore not initialized');
    const ref = await addDoc(collection(db, COLLECTIONS.PROJECTS), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return ref.id;
  },
};

export const careerPlanService = {
  async getActiveByUserId(userId: string): Promise<CareerPlan | null> {
    if (!db) return null;
    const q = query(
      collection(db, COLLECTIONS.CAREER_PLANS),
      where('userId', '==', userId),
      where('status', '==', 'active')
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return { id: snap.docs[0].id, ...snap.docs[0].data() } as CareerPlan;
  },

  async save(plan: Omit<CareerPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!db) throw new Error('Firestore not initialized');
    const ref = await addDoc(collection(db, COLLECTIONS.CAREER_PLANS), {
      ...plan,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return ref.id;
  },
};

export const interviewService = {
  async getByUserId(userId: string): Promise<InterviewSession[]> {
    if (!db) return [];
    const q = query(
      collection(db, COLLECTIONS.INTERVIEWS),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as InterviewSession));
  },
};

export const jobApplicationService = {
  async getByUserId(userId: string): Promise<JobApplication[]> {
    if (!db) return [];
    const q = query(
      collection(db, COLLECTIONS.JOB_APPLICATIONS),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as JobApplication));
  },
};

export const aiGenerationService = {
  async log(data: Omit<AiGeneration, 'id' | 'createdAt'>): Promise<string> {
    if (!db) throw new Error('Firestore not initialized');
    const ref = await addDoc(collection(db, COLLECTIONS.AI_GENERATIONS), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return ref.id;
  },
};
