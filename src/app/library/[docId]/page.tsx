"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Markdown } from "@/components/ui/Markdown";
import { useAcademy } from "@/lib/academy-context";
import { sopById } from "@/lib/data/catalog";
import { db } from "@/lib/offline/db";

export default function SopPage() {
  const params = useParams<{ docId: string }>();
  const { session } = useAcademy();
  const doc = sopById(params.docId);
  const [body, setBody] = useState(doc?.bodyMarkdown ?? "");
  const [version, setVersion] = useState(doc?.version ?? 1);

  useEffect(() => {
    if (!doc) return;
    void db.sopOverrides.get(doc.id).then((override) => {
      if (override) {
        setBody(override.bodyMarkdown);
        setVersion(override.version);
      } else {
        setBody(doc.bodyMarkdown);
        setVersion(doc.version);
      }
    });
  }, [doc]);

  if (!session) return null;
  if (!doc) {
    return (
      <AppShell title="Missing document" backHref="/library">
        <p>That SOP is not in the library.</p>
      </AppShell>
    );
  }

  return (
    <AppShell title={doc.title} subtitle={`${doc.documentNumber} · v${version}`} backHref="/library">
      <p className="mb-3 text-[13px] text-muted">
        Last updated {doc.effectiveDate}. Status: ACTIVE.
      </p>
      <Card>
        <Markdown text={body} />
      </Card>
    </AppShell>
  );
}
