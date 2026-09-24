import { User } from 'firebase/auth';

export type RegistrationStatus = 'NEW' | 'CONTACTED' | 'INTERESTED' | 'ENROLLED' | 'NOT_INTERESTED';

export interface StudentEnrollment {
  id?: string;
  enrollmentId?: string;
  studentId?: string; // Firebase UID if logged in, or lead ID
  name: string;
  email: string;
  phone: string;
  city?: string;
  educationStatus?: string;
  college?: string;
  degree?: string;
  year?: string;
  pathway?: string;
  program?: string;
  duration?: string;
  skills?: string[];
  skillLevel?: string;
  goals?: string[];
  targetSkills?: string[];
  additionalGoal?: string;
  price?: string;
  totalHours?: number;
  source?: string;
  interestedCourse?: string; // Unified with pathway / program
  careerInterest?: string;
  status: RegistrationStatus;
  adminNotes: string;
  createdAt: any;
  updatedAt: any;
}

export interface AdminNotification {
  id?: string;
  type: 'new_registration' | 'status_change';
  title: string;
  message: string;
  enrollmentId: string;
  studentId: string;
  studentName: string;
  read: boolean;
  createdAt: any;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber?: string | null;
  role: 'student' | 'admin' | 'mentor';
  headline?: string;
  bio?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  targetTrack?: 'ai-automation' | 'software-product' | 'data-bi' | string;
  currentSkillLevel?: 'beginner' | 'intermediate' | 'advanced';
  createdAt: any;
  updatedAt: any;
}

export interface UserResume {
  id: string;
  userId: string;
  title: string;
  fileUrl: string;
  storagePath: string;
  fileName: string;
  fileSizeBytes: number;
  fileType: string;
  parsedSummary?: string;
  targetRole?: string;
  createdAt: any;
  updatedAt: any;
}

export interface UserProject {
  id: string;
  userId: string;
  title: string;
  slug: string;
  summary: string;
  problemStatement?: string;
  architectureNotes?: string;
  techStack: string[];
  track: 'ai-automation' | 'software-product' | 'data-bi' | string;
  githubRepoUrl?: string;
  liveDemoUrl?: string;
  proofAuditHash?: string;
  proofVerified: boolean;
  score?: number;
  createdAt: any;
  updatedAt: any;
}

export interface CareerPlan {
  id: string;
  userId: string;
  selectedTrack: string;
  planDuration: '4-weeks' | '6-weeks' | '8-weeks';
  status: 'draft' | 'active' | 'completed';
  weeklyMilestones: {
    week: number;
    title: string;
    description: string;
    completed: boolean;
  }[];
  startDate?: any;
  targetCompletionDate?: any;
  createdAt: any;
  updatedAt: any;
}

export interface InterviewSession {
  id: string;
  userId: string;
  targetTrack: string;
  roleTitle: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  score?: number;
  feedback?: {
    technicalAccuracy?: number;
    problemSolving?: number;
    communication?: number;
    strengths?: string[];
    improvementAreas?: string[];
    summaryNotes?: string;
  };
  questionsAnswered?: {
    question: string;
    transcript?: string;
    score?: number;
  }[];
  createdAt: any;
  updatedAt: any;
}

export interface JobApplication {
  id: string;
  userId: string;
  companyName: string;
  roleTitle: string;
  jobPostUrl?: string;
  status: 'bookmarked' | 'applied' | 'interviewing' | 'offered' | 'rejected';
  appliedDate?: any;
  notes?: string;
  matchedScore?: number;
  resumeUsedId?: string;
  createdAt: any;
  updatedAt: any;
}

export interface AiGeneration {
  id: string;
  userId: string;
  type: 'resume-audit' | 'cover-letter' | 'code-review' | 'career-roadmap' | 'mock-interview';
  promptSummary?: string;
  inputContext?: Record<string, any>;
  resultOutput: string;
  model: string;
  tokenCount?: number;
  createdAt: any;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}
