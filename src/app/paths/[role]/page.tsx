"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressRing";
import { useAcademy } from "@/lib/academy-context";
import { roleByKey } from "@/lib/data/catalog";
import { isUnlocked, pathProgress } from "@/lib/progress";
import { ui } from "@/lib/brand/copy";
import type { RoleKey } from "@/types/academy";

export default function PathPage() {
  const params = useParams<{ role: string }>();
  const { session, progress } = useAcademy();
  const roleKey = params.role as RoleKey;
  const role = roleByKey(roleKey);
  const stats = pathProgress(roleKey, progress);

  if (!session) return null;

  return (
    <AppShell title={role?.label ?? "Path"} subtitle={stats.path?.description} backHref="/home">
      <div className="mb-4">
        <ProgressBar value={stats.pct} color={role?.color} />
        <p className="mt-1 text-right text-[12px] text-muted">
          {stats.done}/{stats.total}
        </p>
      </div>
      <ol className="space-y-3">
        {stats.pathModules.map((module, index) => {
          const unlocked = isUnlocked(module.id, stats.pathModules, progress);
          const done = progress.some(
            (record) => record.moduleId === module.id && record.status === "completed",
          );
          return (
            <li key={module.id}>
              {unlocked ? (
                <Link href={`/modules/${module.id}`}>
                  <Card className={done ? "border border-[#B8EDE8]" : ""}>
                    <p className="text-[12px] font-semibold text-muted">Module {index + 1}</p>
                    <p className="text-lg font-bold">{module.title}</p>
                    <p className="text-[13px] text-muted">
                      {done ? "Completed" : module.quizId ? "Guide + quiz" : "Step-by-step guide"}
                    </p>
                  </Card>
                </Link>
              ) : (
                <Card className="opacity-70">
                  <p className="text-lg font-bold">{module.title}</p>
                  <p className="text-[13px] text-muted">{ui.lockedModule}</p>
                </Card>
              )}
            </li>
          );
        })}
      </ol>
    </AppShell>
  );
}
