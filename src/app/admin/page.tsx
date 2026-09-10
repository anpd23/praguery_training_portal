"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAcademy } from "@/lib/academy-context";
import { findVocabIssues } from "@/lib/brand/vocab";
import { db } from "@/lib/offline/db";
import {
  checklistTemplates,
  employees,
  locations,
  modules,
  sopDocuments,
} from "@/lib/data/catalog";

export default function AdminPage() {
  const { session, allProgress, runs, scorecards } = useAcademy();
  const [sopId, setSopId] = useState(sopDocuments[0]?.id ?? "");
  const [body, setBody] = useState(sopDocuments[0]?.bodyMarkdown ?? "");
  const [saved, setSaved] = useState<string | null>(null);

  const vocabHits = useMemo(() => findVocabIssues(body), [body]);

  if (!session) return null;
  if (session.roleKey !== "manager") {
    return (
      <AppShell title="Admin" backHref="/home">
        <p>Content CMS is for managers.</p>
      </AppShell>
    );
  }

  async function saveSop() {
    const current = sopDocuments.find((doc) => doc.id === sopId);
    if (!current) return;
    await db.sopOverrides.put({
      id: sopId,
      title: current.title,
      bodyMarkdown: body,
      version: current.version + 1,
      updatedAt: new Date().toISOString(),
    });
    setSaved("SOP saved on this iPad. Link Supabase to publish to every location.");
  }

  function exportCsv() {
    const rows = [
      ["employee", "role", "module", "status"],
      ...allProgress.map((row) => {
        const person = employees.find((emp) => emp.id === row.employeeId);
        const lesson = modules.find((item) => item.id === row.moduleId);
        return [person?.fullName ?? row.employeeId, person?.roleKey ?? "", lesson?.title ?? row.moduleId, row.status];
      }),
    ];
    const csv = rows.map((line) => line.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "praguery-academy-progress.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AppShell title="Admin CMS" subtitle="No deploy needed for copy fixes">
      <Card className="mb-4">
        <h2 className="font-bold">Locations</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {locations.map((location) => (
            <li key={location.id}>
              {location.name} · {location.type.replace("_", " ")}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[13px] text-muted">
          Adding a live site is a Supabase row. This demo lists the four current operations plus catering.
        </p>
      </Card>

      <Card className="mb-4">
        <h2 className="font-bold">Edit SOP</h2>
        <select
          className="mt-2 w-full rounded-[10px] border border-border px-3 text-[16px]"
          value={sopId}
          onChange={(event) => {
            const id = event.target.value;
            setSopId(id);
            setBody(sopDocuments.find((doc) => doc.id === id)?.bodyMarkdown ?? "");
            setSaved(null);
          }}
        >
          {sopDocuments.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.documentNumber} — {doc.title}
            </option>
          ))}
        </select>
        <textarea
          className="mt-3 min-h-48 w-full rounded-[10px] border border-border px-3 py-2 text-[15px]"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
        {vocabHits.length > 0 ? (
          <p className="mt-2 text-sm text-danger">
            Vocab check: avoid {vocabHits.join(", ")}. Rewrite so we never minimize the craft.
          </p>
        ) : (
          <p className="mt-2 text-[13px] text-muted">Vocab check passed.</p>
        )}
        <Button className="mt-3 w-full" onClick={() => void saveSop()}>
          Save SOP version
        </Button>
        {saved ? <p className="mt-2 text-sm text-dark-teal">{saved}</p> : null}
      </Card>

      <Card className="mb-4">
        <h2 className="font-bold">Checklists on file</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {checklistTemplates.map((template) => (
            <li key={template.id}>
              {template.title} · {template.items.length} items · v{template.version}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-bold">Franchise compliance export</h2>
        <p className="mt-1 text-[13px] text-muted">
          {allProgress.length} progress rows · {runs.length} checklist runs · {scorecards.length}{" "}
          trial scorecards on this iPad.
        </p>
        <Button className="mt-3 w-full" variant="secondary" onClick={exportCsv}>
          Download CSV
        </Button>
      </Card>
    </AppShell>
  );
}
