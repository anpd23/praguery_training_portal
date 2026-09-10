export type RoleKey =
  | "barista"
  | "cake_roller"
  | "truck_lead"
  | "supervisor"
  | "manager";

export type LocationType = "cafe" | "food_truck" | "catering_truck";

export type ContentType = "video" | "step_guide" | "checklist_intro" | "scenario";

export type ProgressStatus = "not_started" | "in_progress" | "completed";

export type ChecklistCadence = "per_shift" | "daily" | "weekly" | "monthly";

export type ChecklistType = "opening" | "closing" | "pre-close" | "cleaning";

export type SopCategory =
  | "Daily Operations"
  | "Food Safety"
  | "Recipes"
  | "Team & Management";

export type Location = {
  id: string;
  name: string;
  shortName: string;
  type: LocationType;
  slug: string;
  personality: string;
  address: string;
  hours: string;
};

export type Role = {
  key: RoleKey;
  label: string;
  subtitle: string;
  icon: string;
  color: string;
  lightBg: string;
  sortOrder: number;
};

export type Employee = {
  id: string;
  fullName: string;
  primaryLocationId: string;
  roleKey: RoleKey;
  hiredAt: string;
  employmentStatus: "active" | "on_leave" | "terminated";
};

export type TrainingPath = {
  id: string;
  roleKey: RoleKey;
  title: string;
  description: string;
  isNewHireDefault: boolean;
};

export type GuideStep = {
  title: string;
  body: string;
};

export type Module = {
  id: string;
  pathId: string;
  title: string;
  contentType: ContentType;
  bodyMarkdown: string;
  steps: GuideStep[];
  videoUrl?: string;
  captionsUrl?: string;
  durationSeconds?: number;
  sortOrder: number;
  prerequisiteModuleId?: string;
  isDownloadableOffline: boolean;
  quizId?: string;
};

export type QuizOption = {
  id: string;
  label: string;
  isCorrect: boolean;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  questionType: "multiple_choice" | "scenario";
  sortOrder: number;
  options: QuizOption[];
};

export type Quiz = {
  id: string;
  moduleId: string;
  title: string;
  passThresholdPct: number;
  maxAttempts?: number;
  questions: QuizQuestion[];
};

export type ChecklistItem = {
  id: string;
  label: string;
  requiresPhoto: boolean;
  sortOrder: number;
};

export type ChecklistTemplate = {
  id: string;
  type: ChecklistType;
  title: string;
  documentNumber: string;
  appliesTo: string;
  roles: string;
  owner: string;
  retention: string;
  relatedSops: string[];
  locationId?: string;
  locationType: LocationType | "all";
  cadence: ChecklistCadence;
  version: number;
  effectiveDate: string;
  items: ChecklistItem[];
  measurements: { id: string; label: string; range: string }[];
};

export type SopDocument = {
  id: string;
  category: SopCategory;
  title: string;
  summary: string;
  bodyMarkdown: string;
  locationId?: string;
  version: number;
  effectiveDate: string;
  documentNumber: string;
};

export type Session = {
  employeeId: string;
  fullName: string;
  roleKey: RoleKey;
  locationId: string;
  signedInAt: string;
};

export type ModuleProgressRecord = {
  id: string;
  employeeId: string;
  moduleId: string;
  status: ProgressStatus;
  startedAt?: string;
  completedAt?: string;
  syncedAt?: string;
};

export type QuizAttemptRecord = {
  id: string;
  employeeId: string;
  quizId: string;
  scorePct: number;
  passed: boolean;
  attemptedAt: string;
  answers: Record<string, string>;
  syncedAt?: string;
};

export type ChecklistRunRecord = {
  id: string;
  templateId: string;
  locationId: string;
  startedBy: string;
  startedAt: string;
  completedAt?: string;
  exceptions: string;
  verifiedBy: string;
  readings: Record<string, string>;
  items: Record<string, { completedAt?: string; photoDataUrl?: string }>;
  syncedAt?: string;
};

export type CertificationRecord = {
  id: string;
  employeeId: string;
  trainingPathId?: string;
  title: string;
  issuedAt: string;
  expiresAt?: string;
};

export type TrialScorecard = {
  id: string;
  candidateName: string;
  roleKey: RoleKey;
  locationId: string;
  scoredBy: string;
  scores: Record<string, number>;
  notes: string;
  recommendation: "hire" | "second_shift" | "pass";
  createdAt: string;
};

export type SyncQueueItem = {
  id: string;
  kind:
    | "module_progress"
    | "quiz_attempt"
    | "checklist_run"
    | "certification"
    | "trial_scorecard";
  payload: unknown;
  createdAt: string;
  lastError?: string;
};

export type MenuCategory = "cone" | "cup" | "drink" | "take_home" | "dip" | "add_on" | "snack";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  number?: number;
  description: string;
  isPremium: boolean;
  photo?: string;
  allergens: string[];
  /** Staff till only — never render on guest-facing boards or social. */
  staffPriceLabel?: string;
};

export type IncidentReport = {
  id: string;
  employeeId: string;
  locationId: string;
  kind: "incident" | "near_miss";
  summary: string;
  createdAt: string;
  syncedAt?: string;
};
