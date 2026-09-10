"use client";

import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { useAcademy } from "@/lib/academy-context";
import { checklistsForLocation, locationById, locations } from "@/lib/data/catalog";

export default function ChecklistsIndexPage() {
  const { session, setLocation, runs } = useAcademy();
  if (!session) return null;
  const location = locationById(session.locationId);
  const templates = location ? checklistsForLocation(location) : [];

  return (
    <AppShell title="Shift checklists" subtitle={location?.name}>
      <label className="mb-4 block text-[13px] font-semibold text-muted">
        Working at
        <select
          className="mt-1 block w-full rounded-[10px] border border-border bg-white px-3 text-[16px]"
          value={session.locationId}
          onChange={(event) => void setLocation(event.target.value)}
        >
          {locations.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <p className="mb-1 text-[14px] text-muted">{location?.address}</p>
      <p className="mb-1 text-[13px] text-muted">{location?.hours}</p>
      <p className="mb-3 text-[14px] text-muted">{location?.personality}</p>
      <ul className="space-y-3">
        {templates.map((template) => {
          const today = new Date().toDateString();
          const complete = runs.some(
            (run) =>
              run.templateId === template.id &&
              run.locationId === session.locationId &&
              run.completedAt &&
              new Date(run.startedAt).toDateString() === today,
          );
          return (
            <li key={template.id}>
              <Link href={`/checklists/${template.type}/${location?.slug}`}>
                <Card className={complete ? "border border-[#B8EDE8]" : ""}>
                  <p className="text-[12px] font-semibold uppercase text-muted">
                    {template.documentNumber} · {template.cadence.replace("_", " ")}
                  </p>
                  <p className="text-lg font-bold">{template.title}</p>
                  <p className="text-[13px] text-muted">
                    {template.items.length} steps · {complete ? "Done today" : "Tap to run"}
                  </p>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
