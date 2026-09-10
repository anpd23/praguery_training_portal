import { db } from "@/lib/offline/db";

export async function seedSharedIpadDemo() {
  const existing = await db.moduleProgress.count();
  if (existing > 0) return;

  const now = new Date().toISOString();
  await db.moduleProgress.bulkAdd([
    {
      id: "emp-maya:mod-barista-welcome",
      employeeId: "emp-maya",
      moduleId: "mod-barista-welcome",
      status: "completed",
      startedAt: now,
      completedAt: now,
    },
    {
      id: "emp-maya:mod-barista-basics",
      employeeId: "emp-maya",
      moduleId: "mod-barista-basics",
      status: "in_progress",
      startedAt: now,
    },
    {
      id: "emp-jordan:mod-cake-safety",
      employeeId: "emp-jordan",
      moduleId: "mod-cake-safety",
      status: "completed",
      startedAt: now,
      completedAt: now,
    },
    {
      id: "emp-sam:mod-truck-lead",
      employeeId: "emp-sam",
      moduleId: "mod-truck-lead",
      status: "in_progress",
      startedAt: now,
    },
  ]);
}
