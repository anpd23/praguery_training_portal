"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { db } from "@/lib/offline/db";
import {
  announcements,
  employees,
  modules,
  pathForRole,
  quizzes,
} from "@/lib/data/catalog";
import { seedSharedIpadDemo } from "@/lib/offline/seed-demo";
import { enqueue, flushSyncQueue, pendingCount } from "@/lib/offline/sync";
import type {
  CertificationRecord,
  ChecklistRunRecord,
  IncidentReport,
  ModuleProgressRecord,
  QuizAttemptRecord,
  Session,
  TrialScorecard,
} from "@/types/academy";

type AcademyContextValue = {
  ready: boolean;
  online: boolean;
  session: Session | null;
  progress: ModuleProgressRecord[];
  allProgress: ModuleProgressRecord[];
  attempts: QuizAttemptRecord[];
  runs: ChecklistRunRecord[];
  certifications: CertificationRecord[];
  allCertifications: CertificationRecord[];
  scorecards: TrialScorecard[];
  incidents: IncidentReport[];
  pendingSync: number;
  lastSyncMessage: string | null;
  announcements: typeof announcements;
  signIn: (roleKey: Session["roleKey"]) => Promise<Session>;
  signOut: () => Promise<void>;
  setLocation: (locationId: string) => Promise<void>;
  markModule: (
    moduleId: string,
    status: ModuleProgressRecord["status"],
  ) => Promise<void>;
  submitQuiz: (input: {
    quizId: string;
    answers: Record<string, string>;
  }) => Promise<QuizAttemptRecord>;
  saveChecklistRun: (run: ChecklistRunRecord) => Promise<void>;
  saveScorecard: (card: TrialScorecard) => Promise<void>;
  saveIncident: (report: Omit<IncidentReport, "id" | "createdAt">) => Promise<void>;
  syncNow: () => Promise<void>;
};

const AcademyContext = createContext<AcademyContextValue | null>(null);

function progressId(employeeId: string, moduleId: string) {
  return `${employeeId}:${moduleId}`;
}

export function AcademyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [online, setOnline] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [progress, setProgress] = useState<ModuleProgressRecord[]>([]);
  const [allProgress, setAllProgress] = useState<ModuleProgressRecord[]>([]);
  const [attempts, setAttempts] = useState<QuizAttemptRecord[]>([]);
  const [runs, setRuns] = useState<ChecklistRunRecord[]>([]);
  const [certifications, setCertifications] = useState<CertificationRecord[]>([]);
  const [allCertifications, setAllCertifications] = useState<CertificationRecord[]>([]);
  const [scorecards, setScorecards] = useState<TrialScorecard[]>([]);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);
  const [pendingSync, setPendingSync] = useState(0);
  const [lastSyncMessage, setLastSyncMessage] = useState<string | null>(null);

  const refresh = useCallback(async (employeeId?: string) => {
    const id = employeeId;
    const [allProgressRows, allAttempts, allRuns, allCerts, allCards, allIncidents, pending] =
      await Promise.all([
        db.moduleProgress.toArray(),
        db.quizAttempts.toArray(),
        db.checklistRuns.toArray(),
        db.certifications.toArray(),
        db.trialScorecards.toArray(),
        db.incidents.toArray(),
        pendingCount(),
      ]);
    setAllProgress(allProgressRows);
    setProgress(id ? allProgressRows.filter((row) => row.employeeId === id) : allProgressRows);
    setAttempts(id ? allAttempts.filter((row) => row.employeeId === id) : allAttempts);
    setRuns(allRuns);
    setAllCertifications(allCerts);
    setCertifications(id ? allCerts.filter((row) => row.employeeId === id) : allCerts);
    setScorecards(allCards);
    setIncidents(allIncidents);
    setPendingSync(pending);
  }, []);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    const frame = requestAnimationFrame(() => setOnline(navigator.onLine));

    void (async () => {
      await seedSharedIpadDemo();
      const stored = localStorage.getItem("praguery-session");
      if (stored) {
        const parsed = JSON.parse(stored) as Session;
        setSession(parsed);
        await refresh(parsed.employeeId);
      } else {
        await refresh();
      }
      setReady(true);
    })();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, [refresh]);

  useEffect(() => {
    if (online && ready) {
      void flushSyncQueue().then((result) => {
        if ("demo" in result && result.demo) {
          setLastSyncMessage("Demo mode — work is saved on this iPad.");
        } else if (result.flushed > 0) {
          setLastSyncMessage(`Synced ${result.flushed} change${result.flushed === 1 ? "" : "s"}.`);
        }
        void pendingCount().then(setPendingSync);
      });
    }
  }, [online, ready]);

  const signIn = useCallback(
    async (roleKey: Session["roleKey"]) => {
      const employee = employees.find(
        (person) => person.roleKey === roleKey && person.employmentStatus === "active",
      );
      if (!employee) {
        throw new Error("ROLE_UNAVAILABLE");
      }
      const next: Session = {
        employeeId: employee.id,
        fullName: employee.fullName,
        roleKey: employee.roleKey,
        locationId: employee.primaryLocationId,
        signedInAt: new Date().toISOString(),
      };
      localStorage.setItem("praguery-session", JSON.stringify(next));
      await db.sessions.put(next);
      setSession(next);
      await refresh(next.employeeId);
      return next;
    },
    [refresh],
  );

  const signOut = useCallback(async () => {
    localStorage.removeItem("praguery-session");
    setSession(null);
    await refresh();
  }, [refresh]);

  const setLocation = useCallback(
    async (locationId: string) => {
      if (!session) return;
      const next = { ...session, locationId };
      localStorage.setItem("praguery-session", JSON.stringify(next));
      await db.sessions.put(next);
      setSession(next);
    },
    [session],
  );

  const markModule = useCallback(
    async (moduleId: string, status: ModuleProgressRecord["status"]) => {
      if (!session) return;
      const existing = await db.moduleProgress.get(progressId(session.employeeId, moduleId));
      const now = new Date().toISOString();
      const record: ModuleProgressRecord = {
        id: progressId(session.employeeId, moduleId),
        employeeId: session.employeeId,
        moduleId,
        status,
        startedAt: existing?.startedAt ?? now,
        completedAt: status === "completed" ? now : existing?.completedAt,
      };
      await db.moduleProgress.put(record);
      await enqueue("module_progress", record);
      await refresh(session.employeeId);
    },
    [refresh, session],
  );

  const submitQuiz = useCallback(
    async ({ quizId, answers }: { quizId: string; answers: Record<string, string> }) => {
      if (!session) throw new Error("NO_SESSION");
      const quiz = quizzes.find((item) => item.id === quizId);
      if (!quiz) throw new Error("NO_QUIZ");
      const correct = quiz.questions.filter((question) => {
        const chosen = answers[question.id];
        return question.options.some((option) => option.id === chosen && option.isCorrect);
      }).length;
      const scorePct = Math.round((correct / quiz.questions.length) * 10000) / 100;
      const passed = scorePct >= quiz.passThresholdPct;
      const attempt: QuizAttemptRecord = {
        id: crypto.randomUUID(),
        employeeId: session.employeeId,
        quizId,
        scorePct,
        passed,
        attemptedAt: new Date().toISOString(),
        answers,
      };
      await db.quizAttempts.add(attempt);
      await enqueue("quiz_attempt", attempt);
      if (passed) {
        await markModule(quiz.moduleId, "completed");
        const path = pathForRole(session.roleKey);
        const pathModules = modules.filter((module) => module.pathId === path?.id);
        const allDone = await Promise.all(
          pathModules.map((module) =>
            db.moduleProgress.get(progressId(session.employeeId, module.id)),
          ),
        );
        const pathComplete = pathModules.every((module, index) => {
          if (module.id === quiz.moduleId) return true;
          return allDone[index]?.status === "completed";
        });
        if (pathComplete && path) {
          const cert: CertificationRecord = {
            id: crypto.randomUUID(),
            employeeId: session.employeeId,
            trainingPathId: path.id,
            title: `${path.title.replace(" — new hire path", "")} certified`,
            issuedAt: new Date().toISOString(),
          };
          await db.certifications.add(cert);
          await enqueue("certification", cert);
        }
      }
      await refresh(session.employeeId);
      return attempt;
    },
    [markModule, refresh, session],
  );

  const saveChecklistRun = useCallback(
    async (run: ChecklistRunRecord) => {
      await db.checklistRuns.put(run);
      await enqueue("checklist_run", run);
      if (session) await refresh(session.employeeId);
      else await refresh();
    },
    [refresh, session],
  );

  const saveScorecard = useCallback(
    async (card: TrialScorecard) => {
      await db.trialScorecards.put(card);
      await enqueue("trial_scorecard", card);
      await refresh(session?.employeeId);
    },
    [refresh, session?.employeeId],
  );

  const saveIncident = useCallback(
    async (report: Omit<IncidentReport, "id" | "createdAt">) => {
      const full: IncidentReport = {
        ...report,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      await db.incidents.add(full);
      await refresh(session?.employeeId);
    },
    [refresh, session?.employeeId],
  );

  const syncNow = useCallback(async () => {
    const result = await flushSyncQueue();
    setPendingSync(result.remaining);
    if ("demo" in result && result.demo) {
      setLastSyncMessage("Demo mode — work is saved on this iPad until Supabase is linked.");
    } else if (result.remaining === 0) {
      setLastSyncMessage("All caught up.");
    } else {
      setLastSyncMessage(`${result.remaining} still waiting.`);
    }
  }, []);

  const value = useMemo(
    () => ({
      ready,
      online,
      session,
      progress,
      allProgress,
      attempts,
      runs,
      certifications,
      allCertifications,
      scorecards,
      incidents,
      pendingSync,
      lastSyncMessage,
      announcements,
      signIn,
      signOut,
      setLocation,
      markModule,
      submitQuiz,
      saveChecklistRun,
      saveScorecard,
      saveIncident,
      syncNow,
    }),
    [
      ready,
      online,
      session,
      progress,
      allProgress,
      attempts,
      runs,
      certifications,
      allCertifications,
      scorecards,
      incidents,
      pendingSync,
      lastSyncMessage,
      signIn,
      signOut,
      setLocation,
      markModule,
      submitQuiz,
      saveChecklistRun,
      saveScorecard,
      saveIncident,
      syncNow,
    ],
  );

  return <AcademyContext.Provider value={value}>{children}</AcademyContext.Provider>;
}

export function useAcademy() {
  const ctx = useContext(AcademyContext);
  if (!ctx) throw new Error("useAcademy must be used within AcademyProvider");
  return ctx;
}

