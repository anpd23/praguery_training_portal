"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAcademy } from "@/lib/academy-context";
import { ui } from "@/lib/brand/copy";
import { locations } from "@/lib/data/catalog";

export default function SettingsPage() {
  const {
    session,
    setLocation,
    signOut,
    pendingSync,
    lastSyncMessage,
    online,
    syncNow,
    saveIncident,
  } = useAcademy();
  const [summary, setSummary] = useState("");
  const [kind, setKind] = useState<"incident" | "near_miss">("near_miss");
  const [saved, setSaved] = useState(false);

  if (!session) return null;

  return (
    <AppShell title="Settings">
      <Card className="mb-4">
        <p className="text-[13px] font-semibold text-muted">Working location</p>
        <select
          className="mt-2 w-full rounded-[10px] border border-border px-3 text-[16px]"
          value={session.locationId}
          onChange={(event) => void setLocation(event.target.value)}
        >
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </Card>

      <Card className="mb-4">
        <p className="font-bold">Sync</p>
        <p className="text-[14px] text-muted">
          {online ? "Online" : "Offline"} · {ui.syncPending(pendingSync)}
        </p>
        {lastSyncMessage ? <p className="mt-1 text-sm text-dark-teal">{lastSyncMessage}</p> : null}
        <Button className="mt-3 w-full" onClick={() => void syncNow()}>
          {ui.syncNow}
        </Button>
        <p className="mt-2 text-[13px] text-muted">
          Language switch is ready in the architecture (English ships in v1). Punjabi, Mandarin,
          Tagalog, and Spanish are phase 2.
        </p>
      </Card>

      <Card className="mb-4">
        <p className="font-bold">Incident or near-miss</p>
        <select
          className="mt-2 w-full rounded-[10px] border border-border px-3 text-[16px]"
          value={kind}
          onChange={(event) => setKind(event.target.value as "incident" | "near_miss")}
        >
          <option value="near_miss">Near-miss</option>
          <option value="incident">Incident</option>
        </select>
        <textarea
          className="mt-2 min-h-24 w-full rounded-[10px] border border-border px-3 py-2 text-[16px]"
          placeholder="What happened, and who was told?"
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
        />
        <Button
          className="mt-3 w-full"
          disabled={!summary.trim()}
          onClick={async () => {
            await saveIncident({
              employeeId: session.employeeId,
              locationId: session.locationId,
              kind,
              summary: summary.trim(),
            });
            setSummary("");
            setSaved(true);
          }}
        >
          Save note
        </Button>
        {saved ? <p className="mt-2 text-sm text-dark-teal">Saved on this iPad.</p> : null}
      </Card>

      <Button variant="secondary" className="w-full" onClick={() => void signOut()}>
        {ui.switchUser}
      </Button>
    </AppShell>
  );
}
