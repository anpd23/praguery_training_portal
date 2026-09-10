"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAcademy } from "@/lib/academy-context";
import { ui } from "@/lib/brand/copy";
import { checklistsForLocation, locationBySlug } from "@/lib/data/catalog";
import type { ChecklistRunRecord, ChecklistType } from "@/types/academy";

function emptyRun(
  id: string,
  templateId: string,
  locationId: string,
  startedBy: string,
): ChecklistRunRecord {
  return {
    id,
    templateId,
    locationId,
    startedBy,
    startedAt: new Date().toISOString(),
    exceptions: "",
    verifiedBy: "",
    readings: {},
    items: {},
  };
}

function withRecordDefaults(run: ChecklistRunRecord): ChecklistRunRecord {
  return {
    ...run,
    exceptions: run.exceptions ?? "",
    verifiedBy: run.verifiedBy ?? "",
    readings: run.readings ?? {},
  };
}

export default function ChecklistRunPage() {
  const params = useParams<{ type: string; location: string }>();
  const { session, saveChecklistRun, runs } = useAcademy();
  const location = locationBySlug(params.location);
  const template = location
    ? checklistsForLocation(location).find((item) => item.type === (params.type as ChecklistType))
    : undefined;

  const existing = useMemo(() => {
    if (!session || !template) return undefined;
    const today = new Date().toDateString();
    return runs
      .filter(
        (run) =>
          run.templateId === template.id &&
          run.locationId === location?.id &&
          new Date(run.startedAt).toDateString() === today &&
          !run.completedAt,
      )
      .sort((a, b) => b.startedAt.localeCompare(a.startedAt))[0];
  }, [location?.id, runs, session, template]);

  const [draftId] = useState(() => crypto.randomUUID());
  const [run, setRun] = useState<ChecklistRunRecord | null>(null);
  const [seeded, setSeeded] = useState(false);

  if (!run && existing) {
    setRun(withRecordDefaults(existing));
  } else if (!run && session && template && location) {
    setRun(emptyRun(draftId, template.id, location.id, session.employeeId));
  }

  useEffect(() => {
    if (!run || seeded || existing) return;
    void saveChecklistRun(run).then(() => setSeeded(true));
  }, [existing, run, saveChecklistRun, seeded]);

  if (!session) return null;
  if (!template || !location || !run) {
    return (
      <AppShell title="Checklist" backHref="/checklists">
        <p>No checklist for this site and type.</p>
      </AppShell>
    );
  }

  const currentRun = run;
  const currentTemplate = template;

  async function persist(next: ChecklistRunRecord) {
    setRun(next);
    await saveChecklistRun(next);
  }

  async function toggle(itemId: string) {
    const current = currentRun.items[itemId];
    await persist({
      ...currentRun,
      items: {
        ...currentRun.items,
        [itemId]: current?.completedAt
          ? { photoDataUrl: current.photoDataUrl }
          : { completedAt: new Date().toISOString(), photoDataUrl: current?.photoDataUrl },
      },
    });
  }

  async function attachPhoto(itemId: string, file: File) {
    const photoDataUrl = await fileToDataUrl(file);
    await persist({
      ...currentRun,
      items: {
        ...currentRun.items,
        [itemId]: { ...currentRun.items[itemId], photoDataUrl },
      },
    });
  }

  async function complete() {
    await persist({ ...currentRun, completedAt: new Date().toISOString() });
  }

  const allDone = currentTemplate.items.every((item) => {
    const state = currentRun.items[item.id];
    if (!state?.completedAt) return false;
    if (item.requiresPhoto && !state.photoDataUrl) return false;
    return true;
  });
  const readingsDone = currentTemplate.measurements.every(
    (item) => (currentRun.readings[item.id] ?? "").trim().length > 0,
  );
  const exceptionsDone = currentRun.exceptions.trim().length > 0;
  const verifier = currentRun.verifiedBy.trim();
  const verifierOk = verifier.length > 0 && verifier !== session.fullName;
  const canComplete = allDone && readingsDone && exceptionsDone && verifierOk && !run.completedAt;

  return (
    <AppShell
      title={template.title}
      subtitle={`${template.documentNumber} · ${location.shortName} · v${template.version}`}
      backHref="/checklists"
    >
      <Card className="mb-4">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-muted">Record header</p>
        <p className="mt-1 text-[15px]">{location.name}</p>
        <p className="text-[13px] text-muted">{location.address}</p>
        <p className="text-[13px] text-muted">{location.hours}</p>
        <p className="mt-2 text-[13px] text-muted">
          Completes: {session.fullName} · Started{" "}
          {new Date(run.startedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">{template.roles}</p>
        <p className="mt-1 text-[12px] text-muted">{template.retention}</p>
      </Card>
      <p className="mb-3 text-[13px] text-muted">
        This is a dated record, not a lesson. Initial each line as you complete it. Never pre-tick.
        Teach from the related SOP numbers: {template.relatedSops.join(", ")}.
      </p>
      {template.measurements.length > 0 ? (
        <Card className="mb-4">
          <p className="font-bold">Actual readings</p>
          <p className="mb-2 text-[13px] text-muted">
            Write the number you see. Do not copy the target range onto this record.
          </p>
          {template.measurements.map((item) => (
            <label key={item.id} className="mb-2 block text-[13px] font-semibold">
              {item.label}
              <span className="ml-1 font-normal text-muted">({item.range})</span>
              <input
                className="mt-1 w-full rounded-[10px] border border-border px-3 py-2 text-[16px] font-normal"
                value={run.readings[item.id] ?? ""}
                placeholder="Actual reading"
                onChange={(event) =>
                  void persist({
                    ...currentRun,
                    readings: { ...currentRun.readings, [item.id]: event.target.value },
                  })
                }
              />
            </label>
          ))}
        </Card>
      ) : null}
      <ul className="space-y-2">
        {template.items.map((item) => {
          const state = run.items[item.id];
          const checked = Boolean(state?.completedAt);
          return (
            <li key={item.id}>
              <Card className={checked ? "border border-[#B8EDE8]" : ""}>
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => void toggle(item.id)}
                    aria-pressed={checked}
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] border-2 ${
                      checked ? "border-teal bg-teal text-white" : "border-border bg-[#F4F4F4]"
                    }`}
                  >
                    {checked ? "✓" : ""}
                  </button>
                  <div className="flex-1">
                    <p className={`text-[15px] leading-snug ${checked ? "text-muted line-through" : ""}`}>
                      {item.label}
                    </p>
                    {item.requiresPhoto ? (
                      <label className="mt-2 block text-[13px] font-semibold text-dark-teal">
                        Photo proof
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="mt-1 block w-full text-sm"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) void attachPhoto(item.id, file);
                          }}
                        />
                        {state?.photoDataUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={state.photoDataUrl}
                            alt="Proof"
                            className="mt-2 max-h-32 rounded-lg object-cover"
                          />
                        ) : null}
                      </label>
                    ) : null}
                    {checked ? (
                      <p className="mt-1 text-[12px] font-semibold text-teal">
                        {session.fullName} · {new Date(state!.completedAt!).toLocaleTimeString()}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
      <label className="mt-4 block text-[13px] font-semibold">
        Exceptions
        <textarea
          className="mt-1 min-h-20 w-full rounded-[10px] border border-border px-3 py-2 text-[16px] font-normal"
          placeholder='If nothing went wrong, write "none"'
          value={run.exceptions}
          onChange={(event) => void persist({ ...currentRun, exceptions: event.target.value })}
        />
      </label>
      <label className="mt-3 block text-[13px] font-semibold">
        Verified by (must be a different person)
        <input
          className="mt-1 w-full rounded-[10px] border border-border px-3 py-2 text-[16px] font-normal"
          placeholder="Supervisor or manager full name"
          value={run.verifiedBy}
          onChange={(event) => void persist({ ...currentRun, verifiedBy: event.target.value })}
        />
      </label>
      <Button className="mt-4 w-full" disabled={!canComplete} onClick={() => void complete()}>
        {run.completedAt ? ui.checklistComplete : "Complete checklist"}
      </Button>
    </AppShell>
  );
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
