import Dexie, { type EntityTable } from "dexie";
import type {
  CertificationRecord,
  ChecklistRunRecord,
  IncidentReport,
  ModuleProgressRecord,
  QuizAttemptRecord,
  Session,
  SyncQueueItem,
  TrialScorecard,
} from "@/types/academy";

export type LocalSopOverride = {
  id: string;
  title: string;
  bodyMarkdown: string;
  version: number;
  updatedAt: string;
};

export type LocalChecklistOverride = {
  id: string;
  items: { id: string; label: string; requiresPhoto: boolean; sortOrder: number }[];
  version: number;
  updatedAt: string;
};

class AcademyDB extends Dexie {
  sessions!: EntityTable<Session, "employeeId">;
  moduleProgress!: EntityTable<ModuleProgressRecord, "id">;
  quizAttempts!: EntityTable<QuizAttemptRecord, "id">;
  checklistRuns!: EntityTable<ChecklistRunRecord, "id">;
  certifications!: EntityTable<CertificationRecord, "id">;
  trialScorecards!: EntityTable<TrialScorecard, "id">;
  incidents!: EntityTable<IncidentReport, "id">;
  syncQueue!: EntityTable<SyncQueueItem, "id">;
  sopOverrides!: EntityTable<LocalSopOverride, "id">;
  checklistOverrides!: EntityTable<LocalChecklistOverride, "id">;

  constructor() {
    super("praguery-academy");
    this.version(1).stores({
      sessions: "employeeId",
      moduleProgress: "id, employeeId, moduleId, status",
      quizAttempts: "id, employeeId, quizId, attemptedAt",
      checklistRuns: "id, templateId, locationId, startedBy, startedAt",
      certifications: "id, employeeId, issuedAt",
      trialScorecards: "id, scoredBy, locationId, createdAt",
      incidents: "id, employeeId, locationId, createdAt",
      syncQueue: "id, kind, createdAt",
      sopOverrides: "id",
      checklistOverrides: "id",
    });
  }
}

export const db = new AcademyDB();
