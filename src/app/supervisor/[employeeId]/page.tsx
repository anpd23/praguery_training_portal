"use client";

import { useParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressRing";
import { useAcademy } from "@/lib/academy-context";
import { employeeById, modulesForPath, pathForRole, roleByKey } from "@/lib/data/catalog";
import { pathProgress } from "@/lib/progress";

export default function TraineeDetailPage() {
  const params = useParams<{ employeeId: string }>();
  const { session, allProgress, runs } = useAcademy();
  const person = employeeById(params.employeeId);

  if (!session) return null;
  if (!person) {
    return (
      <AppShell title="Teammate" backHref="/supervisor">
        <p>No profile on this iPad for that person.</p>
      </AppShell>
    );
  }

  const role = roleByKey(person.roleKey);
  const personProgress = allProgress.filter((row) => row.employeeId === person.id);
  const stats = pathProgress(person.roleKey, personProgress);
  const path = pathForRole(person.roleKey);
  const pathModules = path ? modulesForPath(path.id) : [];

  return (
    <AppShell title={person.fullName} subtitle={role?.label} backHref="/supervisor">
      <Card className="mb-4">
        <p className="text-[13px] font-semibold text-muted">Path progress</p>
        <p className="text-2xl font-bold text-dark-teal">{stats.pct}%</p>
        <ProgressBar value={stats.pct} color={role?.color} />
      </Card>
      <ul className="space-y-2">
        {pathModules.map((module) => {
          const record = personProgress.find((row) => row.moduleId === module.id);
          return (
            <li key={module.id}>
              <Card>
                <p className="font-bold">{module.title}</p>
                <p className="text-[13px] text-muted">{record?.status ?? "not_started"}</p>
              </Card>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-[13px] text-muted">
        Checklist runs on this iPad:{" "}
        {runs.filter((run) => run.startedBy === person.id).length}
      </p>
    </AppShell>
  );
}
