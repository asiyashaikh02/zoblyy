import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as fbSignOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, collection, addDoc, updateDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './config';
import type { UserProfile, RegistrationStatus } from '../../types/firebase';

const ADMIN_EMAILS = ['ilaeequrrahman@gmail.com'];

export interface StudentRegistrationParams {
  fullName: string;
  email: string;
  password?: string;
  phone: string;
  college: string;
  degree: string;
  year: string;
  interestedCourse: string;
  careerInterest?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isConfigured: boolean;
  signInWithGoogle: () => Promise<User>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (name: string, email: string, pass: string, phone?: string) => Promise<User>;
  registerStudentWithEnrollment: (params: StudentRegistrationParams) => Promise<{ uid: string; enrollmentId: string }>;
  sendPasswordReset: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkIsAdmin = async (firebaseUser: User): Promise<boolean> => {
    if (firebaseUser.email && ADMIN_EMAILS.includes(firebaseUser.email.toLowerCase())) {
      return true;
    }
    if (!db) return false;
    try {
      const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid));
      return adminDoc.exists();
    } catch {
      return false;
    }
  };

  const syncUserProfile = async (firebaseUser: User, fallbackName?: string, phone?: string) => {
    const isDesignatedAdmin = Boolean(firebaseUser.email && ADMIN_EMAILS.includes(firebaseUser.email.toLowerCase()));

    if (!db) {
      setProfile({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || fallbackName || (isDesignatedAdmin ? 'Admin' : 'Student'),
        photoURL: firebaseUser.photoURL || null,
        phoneNumber: phone || firebaseUser.phoneNumber || null,
        role: isDesignatedAdmin ? 'admin' : 'student',
        createdAt: null,
        updatedAt: null,
      });
      return;
    }

    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userDocRef);
      const isAdmin = isDesignatedAdmin || (await checkIsAdmin(firebaseUser));

      if (!userSnap.exists()) {
        const newProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || fallbackName || (isAdmin ? 'Admin' : 'Student'),
          photoURL: firebaseUser.photoURL || null,
          phoneNumber: phone || firebaseUser.phoneNumber || null,
          role: isAdmin ? 'admin' : 'student',
          targetTrack: 'ai-automation',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        await setDoc(userDocRef, newProfile);
        setProfile(newProfile);
      } else {
        const existingData = userSnap.data() as UserProfile;
        // Keep role updated if admin
        if (isAdmin && existingData.role !== 'admin') {
          const updated = { ...existingData, role: 'admin' as const, updatedAt: serverTimestamp() };
          await setDoc(userDocRef, updated, { merge: true });
          setProfile(updated);
        } else if (!isAdmin && existingData.role === 'admin') {
          // Zero-trust: if user is not in admins collection or designated admin, do not trust client admin role
          const safeStudent = { ...existingData, role: 'student' as const, updatedAt: serverTimestamp() };
          setProfile(safeStudent);
        } else {
          setProfile(existingData);
        }
      }
    } catch (err) {
      console.warn('Could not sync user profile to Firestore:', err);
      setProfile({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || fallbackName || (isDesignatedAdmin ? 'Admin' : 'Student'),
        photoURL: firebaseUser.photoURL || null,
        phoneNumber: phone || firebaseUser.phoneNumber || null,
        role: isDesignatedAdmin ? 'admin' : 'student',
        createdAt: null,
        updatedAt: null,
      });
    }
  };

  useEffect(() => {
    if (!auth || !isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserProfile(currentUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<User> => {
    if (!auth) {
      throw new Error('Firebase is not configured. Please supply Firebase configuration variables.');
    }
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    await syncUserProfile(result.user);
    return result.user;
  };

  const signInWithEmail = async (email: string, pass: string) => {
    if (!auth) {
      throw new Error('Firebase is not configured. Please supply Firebase configuration variables.');
    }
    const result = await signInWithEmailAndPassword(auth, email, pass);
    await syncUserProfile(result.user);
  };

  const signUpWithEmail = async (name: string, email: string, pass: string, phone?: string): Promise<User> => {
    if (!auth) {
      throw new Error('Firebase is not configured. Please supply Firebase configuration variables.');
    }
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    if (name.trim()) {
      await updateProfile(result.user, { displayName: name.trim() });
    }
    await syncUserProfile(result.user, name.trim(), phone);
    return result.user;
  };

  const registerStudentWithEnrollment = async (_params: StudentRegistrationParams): Promise<{ uid: string; enrollmentId: string }> => {
    // Architectural separation: Public enrollments are leads processed through ChooseLearningPlanModal.
    // They do NOT create Firebase Auth accounts or grant dashboard access.
    throw new Error(
      'Direct account creation via registration is deactivated. Public applications must be submitted through the canonical ChooseLearningPlanModal.'
    );
  };

  const sendPasswordReset = async (email: string) => {
    if (!auth) {
      throw new Error('Firebase is not configured.');
    }
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    if (auth) {
      await fbSignOut(auth);
    }
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
      await syncUserProfile(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isConfigured: isFirebaseConfigured,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        registerStudentWithEnrollment,
        sendPasswordReset,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
