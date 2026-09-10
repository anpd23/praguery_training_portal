"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { useAcademy } from "@/lib/academy-context";
import { sopDocuments } from "@/lib/data/catalog";
import type { SopCategory } from "@/types/academy";

const categories: SopCategory[] = [
  "Daily Operations",
  "Food Safety",
  "Recipes",
  "Team & Management",
];

export default function LibraryPage() {
  const { session } = useAcademy();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sopDocuments.filter((doc) => {
      if (!q) return true;
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q) ||
        doc.bodyMarkdown.toLowerCase().includes(q) ||
        doc.documentNumber.toLowerCase().includes(q)
      );
    });
  }, [query]);

  if (!session) return null;

  return (
    <AppShell title="Library" subtitle="The method lives here. The board is for what guests see.">
      <Link href="/menu" className="mb-5 block overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/cone-chocolate-brownie.jpg"
          alt="Chocolate brownie premium cone"
          className="h-40 w-full object-cover"
        />
        <div className="bg-ink px-5 py-4 text-cream">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">Start here</p>
          <p className="font-serif text-2xl">Open the board</p>
        </div>
      </Link>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search SOPs, allergens, recipes…"
        className="mb-5 w-full rounded-2xl border border-border bg-paper px-4 text-[16px]"
      />
      {categories.map((category) => {
        const docs = filtered.filter((doc) => doc.category === category);
        if (docs.length === 0) return null;
        return (
          <section key={category} className="mb-6">
            <h2 className="mb-3 font-serif text-xl">{category}</h2>
            <ul className="space-y-3">
              {docs.map((doc) => (
                <li key={doc.id}>
                  <Link href={`/library/${doc.id}`}>
                    <Card>
                      <p className="font-serif text-xl">{doc.title}</p>
                      <p className="mt-1 text-[14px] text-muted">{doc.summary}</p>
                      <p className="mt-2 text-[12px] text-teal">
                        {doc.documentNumber} · v{doc.version} · {doc.effectiveDate}
                      </p>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </AppShell>
  );
}
