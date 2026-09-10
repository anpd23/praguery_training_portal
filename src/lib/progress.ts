import { modulesForPath, pathForRole } from "@/lib/data/catalog";
import type { ModuleProgressRecord, RoleKey } from "@/types/academy";

export function pathProgress(roleKey: RoleKey, progress: ModuleProgressRecord[]) {
  const path = pathForRole(roleKey);
  const pathModules = path ? modulesForPath(path.id) : [];
  const done = pathModules.filter((module) =>
    progress.some((record) => record.moduleId === module.id && record.status === "completed"),
  ).length;
  const pct = pathModules.length === 0 ? 0 : Math.round((done / pathModules.length) * 100);
  const next = pathModules.find(
    (module) => !progress.some((record) => record.moduleId === module.id && record.status === "completed"),
  );
  return { path, pathModules, done, total: pathModules.length, pct, next };
}

export function isUnlocked(
  moduleId: string,
  pathModules: ReturnType<typeof modulesForPath>,
  progress: ModuleProgressRecord[],
) {
  const lesson = pathModules.find((item) => item.id === moduleId);
  if (!lesson?.prerequisiteModuleId) return true;
  return progress.some(
    (record) => record.moduleId === lesson.prerequisiteModuleId && record.status === "completed",
  );
}
