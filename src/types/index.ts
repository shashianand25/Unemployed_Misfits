export interface UserProfile {
  name: string;
  educationLevel: string;
  fieldOfStudy: string;
  careerGoal: string;
  existingSkills: string[];
  preferredRole: string;
}

export type SkillStatus = 'matched' | 'missing' | 'recommended';
export interface Skill { name: string; status: SkillStatus; }

export type MilestoneStatus = 'locked' | 'active' | 'completed';
export interface Milestone { id: string; title: string; description: string; tasks: string[]; status: MilestoneStatus; }

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  milestones: Milestone[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface JobAnalysis {
  jobTitle: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendedSkills: string[];
  recommendedProject: Project;
}

export type ApplicationStatus = 'interested' | 'preparing' | 'applied' | 'interview' | 'completed';
export interface Application {
  id: string;
  company: string;
  jobTitle: string;
  requiredSkills: string[];
  matchScore: number;
  status: ApplicationStatus;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  type: 'technical' | 'project-based';
  suggestedAnswer: string;
  practiced: boolean;
}

export interface AppState {
  user: UserProfile | null;
  isDemoMode: boolean;
  completedMilestones: string[];
  applicationStatuses: Record<string, ApplicationStatus>;
  practicedQuestions: string[];
  projectGithubUrls: Record<string, string>;
  jobAnalysis: JobAnalysis | null;
  isAnalysing: boolean;
}
