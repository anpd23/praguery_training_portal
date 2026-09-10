"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAcademy } from "@/lib/academy-context";
import { employees, roleByKey, roles } from "@/lib/data/catalog";
import { pathProgress } from "@/lib/progress";
import type { RoleKey, TrialScorecard } from "@/types/academy";

const scoreFields = [
  "Punctuality",
  "Hygiene",
  "Guest warmth",
  "Follows the recipe",
  "Asks for help",
  "Pace",
];

export default function SupervisorPage() {
  const { session, allProgress, allCertifications, scorecards, saveScorecard, runs } = useAcademy();
  const [candidate, setCandidate] = useState("");
  const [roleKey, setRoleKey] = useState<RoleKey>("barista");
  const [notes, setNotes] = useState("");
  const [scores, setScores] = useState<Record<string, number>>({});
  const [recommendation, setRecommendation] = useState<TrialScorecard["recommendation"]>("second_shift");

  const roster = useMemo(() => {
    if (!session) return [];
    return employees.filter(
      (person) =>
        person.primaryLocationId === session.locationId || session.roleKey === "manager",
    );
  }, [session]);

  if (!session) return null;
  if (session.roleKey !== "supervisor" && session.roleKey !== "manager") {
    return (
      <AppShell title="Supervisor" backHref="/home">
        <p>This desk is for supervisors and managers.</p>
      </AppShell>
    );
  }

  const active = roster.filter((person) => {
    const stats = pathProgress(person.roleKey, allProgress.filter((row) => row.employeeId === person.id));
    return stats.pct > 0 && stats.pct < 100;
  }).length;
  const completed = roster.filter((person) => {
    const stats = pathProgress(person.roleKey, allProgress.filter((row) => row.employeeId === person.id));
    return stats.total > 0 && stats.pct === 100;
  }).length;
  const pending = roster.length - active - completed;
  const expiring = allCertifications.filter((cert) => cert.expiresAt);

  async function saveCard() {
    if (!session) return;
    const card: TrialScorecard = {
      id: crypto.randomUUID(),
      candidateName: candidate.trim(),
      roleKey,
      locationId: session.locationId,
      scoredBy: session.employeeId,
      scores,
      notes,
      recommendation,
      createdAt: new Date().toISOString(),
    };
    await saveScorecard(card);
    setCandidate("");
    setNotes("");
    setScores({});
  }

  return (
    <AppShell title="Supervisor dashboard" subtitle="Training progress — this location">
      <div className="mb-4 grid grid-cols-3 gap-2.5">
        <Metric label="Active trainees" value={String(active || roster.length)} color="#00BFB3" />
        <Metric label="Completed" value={String(completed)} color="#1D6A8A" />
        <Metric label="Pending" value={String(pending < 0 ? 0 : pending)} color="#EAAA00" />
      </div>

      <Card className="mb-4 overflow-hidden p-0">
        <div className="bg-dark-teal px-4 py-2.5 text-sm font-semibold text-white">Live roster</div>
        <ul>
          {roster.map((person) => {
            const personProgress = allProgress.filter((row) => row.employeeId === person.id);
            const stats = pathProgress(person.roleKey, personProgress);
            const todayRuns = runs.filter(
              (run) =>
                run.startedBy === person.id &&
                new Date(run.startedAt).toDateString() === new Date().toDateString(),
            );
            return (
              <li key={person.id} className="border-t border-border px-4 py-3">
                <Link href={`/supervisor/${person.id}`} className="block">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold">{person.fullName}</p>
                      <p className="text-[13px] text-muted">
                        {roleByKey(person.roleKey)?.label} · {stats.pct}% path · {todayRuns.length} checklist
                        {todayRuns.length === 1 ? "" : "s"} today
                      </p>
                    </div>
                    <span className="text-lg font-bold text-dark-teal">{stats.pct}%</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>

      {expiring.length > 0 ? (
        <Card className="mb-4 border border-gold">
          <p className="font-bold">Certification alerts</p>
          {expiring.map((cert) => (
            <p key={cert.id} className="text-sm">
              {cert.title} expires {cert.expiresAt}
            </p>
          ))}
        </Card>
      ) : (
        <p className="mb-4 text-[13px] text-muted">
          FoodSafe recertification is annual in this build until BC cadence is confirmed.
        </p>
      )}

      <Card className="mb-4">
        <h2 className="font-bold">Trial-shift scorecard</h2>
        <label className="mt-3 block text-[13px] font-semibold text-muted">
          Candidate name
          <input
            className="mt-1 w-full rounded-[10px] border border-border px-3 text-[16px]"
            value={candidate}
            onChange={(event) => setCandidate(event.target.value)}
          />
        </label>
        <label className="mt-3 block text-[13px] font-semibold text-muted">
          Role
          <select
            className="mt-1 w-full rounded-[10px] border border-border px-3 text-[16px]"
            value={roleKey}
            onChange={(event) => setRoleKey(event.target.value as RoleKey)}
          >
            {roles.map((role) => (
              <option key={role.key} value={role.key}>
                {role.label}
              </option>
            ))}
          </select>
        </label>
        <ul className="mt-3 space-y-2">
          {scoreFields.map((field) => (
            <li key={field} className="flex items-center justify-between gap-3">
              <span className="text-sm">{field}</span>
              <input
                type="number"
                min={1}
                max={5}
                className="w-16 rounded-[10px] border border-border px-2 text-center text-[16px]"
                value={scores[field] ?? ""}
                onChange={(event) =>
                  setScores((current) => ({ ...current, [field]: Number(event.target.value) }))
                }
              />
            </li>
          ))}
        </ul>
        <label className="mt-3 block text-[13px] font-semibold text-muted">
          Notes
          <textarea
            className="mt-1 min-h-24 w-full rounded-[10px] border border-border px-3 py-2 text-[16px]"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </label>
        <label className="mt-3 block text-[13px] font-semibold text-muted">
          Recommendation
          <select
            className="mt-1 w-full rounded-[10px] border border-border px-3 text-[16px]"
            value={recommendation}
            onChange={(event) =>
              setRecommendation(event.target.value as TrialScorecard["recommendation"])
            }
          >
            <option value="hire">Hire</option>
            <option value="second_shift">Second trial shift</option>
            <option value="pass">Pass</option>
          </select>
        </label>
        <Button className="mt-3 w-full" disabled={!candidate.trim()} onClick={() => void saveCard()}>
          Save scorecard
        </Button>
      </Card>

      {scorecards.length > 0 ? (
        <Card>
          <h2 className="font-bold">Saved scorecards</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {scorecards.map((card) => (
              <li key={card.id}>
                {card.candidateName} · {card.recommendation} ·{" "}
                {new Date(card.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {session.roleKey === "manager" ? (
        <Link
          href="/admin"
          className="mt-4 flex min-h-11 items-center justify-center rounded-[10px] bg-dark-teal font-semibold text-white"
        >
          Open admin CMS
        </Link>
      ) : null}
    </AppShell>
  );
}

function Metric({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl bg-white p-3.5 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <p className="text-[26px] font-bold" style={{ color }}>
        {value}
      </p>
      <p className="text-[11px] text-muted">{label}</p>
    </div>
  );
}
