export type AccentColor = 'electric' | 'violet' | 'cyan' | 'coral' | 'lime' | 'pink';

export interface JourneyStage {
  id: string;
  step: string; // e.g. "01"
  name: string; // e.g. "DISCOVER", "LEARN", "PRACTICE", "BUILD", "PROVE", "LAUNCH", "GET SEEN"
  tagline: string;
  learnerState: string; // "I don't know where I stand" -> "I can prove it"
  accent: AccentColor;
  accentHex: string;
  badge: string;
  details: string;
  artifacts: string[];
}

export interface CareerTrack {
  id: string;
  code: string; // "01", "02", "03"
  title: string;
  subtitle: string;
  accent: AccentColor;
  accentHex: string;
  whoItIsFor: string;
  whatYouLearn: string[];
  tools: string[];
  projects: string[];
  proofOutcome: string;
  careerRoles: string[];
}

export interface LearningToProofMilestone {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  accent: AccentColor;
  accentHex: string;
  keyDeliverable: string;
  proofType: 'audit' | 'labs' | 'defense' | 'launchpad' | 'visibility';
}

export interface ProofArtifact {
  id: string;
  title: string;
  type: 'live_url' | 'git_repo' | 'code_defense' | 'case_study';
  status: 'VERIFIED' | 'DEPLOYED' | 'DEFENDED' | 'PUBLIC';
  track: string;
  description: string;
  metrics: string;
}
