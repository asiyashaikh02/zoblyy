import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from './config';

export const STORAGE_PATHS = {
  RESUMES: (userId: string, filename: string) => `users/${userId}/resumes/${Date.now()}_${filename}`,
  PROFILE_IMAGES: (userId: string, filename: string) => `users/${userId}/profile/${Date.now()}_${filename}`,
  DOCUMENTS: (userId: string, filename: string) => `users/${userId}/documents/${Date.now()}_${filename}`,
};

export const storageService = {
  async uploadResume(
    userId: string,
    file: File,
    onProgress?: (progressPercent: number) => void
  ): Promise<{ url: string; path: string }> {
    if (!storage) throw new Error('Firebase Storage not initialized');

    const storagePath = STORAGE_PATHS.RESUMES(userId, file.name);
    const storageRef = ref(storage, storagePath);

    if (onProgress) {
      const uploadTask = uploadBytesResumable(storageRef, file, {
        contentType: file.type || 'application/pdf',
      });

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(Math.round(progress));
          },
          (error) => reject(error),
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ url, path: storagePath });
          }
        );
      });
    }

    const snap = await uploadBytes(storageRef, file, {
      contentType: file.type || 'application/pdf',
    });
    const url = await getDownloadURL(snap.ref);
    return { url, path: storagePath };
  },

  async uploadProfileImage(userId: string, file: File): Promise<{ url: string; path: string }> {
    if (!storage) throw new Error('Firebase Storage not initialized');
    const storagePath = STORAGE_PATHS.PROFILE_IMAGES(userId, file.name);
    const storageRef = ref(storage, storagePath);
    const snap = await uploadBytes(storageRef, file, {
      contentType: file.type || 'image/jpeg',
    });
    const url = await getDownloadURL(snap.ref);
    return { url, path: storagePath };
  },

  async uploadDocument(userId: string, file: File): Promise<{ url: string; path: string }> {
    if (!storage) throw new Error('Firebase Storage not initialized');
    const storagePath = STORAGE_PATHS.DOCUMENTS(userId, file.name);
    const storageRef = ref(storage, storagePath);
    const snap = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snap.ref);
    return { url, path: storagePath };
  },

  async deleteFile(storagePath: string): Promise<void> {
    if (!storage) throw new Error('Firebase Storage not initialized');
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  },
};
