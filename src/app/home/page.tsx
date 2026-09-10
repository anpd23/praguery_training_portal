"use client";

import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Card, PhotoCard } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressRing";
import { useAcademy } from "@/lib/academy-context";
import { brandCopy } from "@/lib/brand/copy";
import { checklistsForLocation, locationById } from "@/lib/data/catalog";
import { cones } from "@/lib/data/menu";
import { pathProgress } from "@/lib/progress";

export default function HomePage() {
  const { session, progress, certifications, announcements } = useAcademy();
  if (!session) return null;

  const location = locationById(session.locationId);
  const stats = pathProgress(session.roleKey, progress);
  const locationChecklists = location ? checklistsForLocation(location) : [];
  const featured = cones.find((item) => item.id === "cone-pistachio") ?? cones[0];

  return (
    <AppShell
      title={`Welcome back, ${session.fullName.split(" ")[0]}`}
      subtitle={location?.personality}
    >
      {stats.next ? (
        <Link href={`/modules/${stats.next.id}`} className="mb-5 block">
          <PhotoCard
            src={featured.photo ?? "/brand/cone-pistachio.jpg"}
            alt={featured.name}
            eyebrow={brandCopy.continueTraining}
            title={stats.next.title}
            body={`${stats.done} of ${stats.total} modules · ${brandCopy.taglinePrimary}`}
          >
            <div className="mt-4">
              <ProgressBar value={stats.pct} color="#1AA6A1" />
            </div>
          </PhotoCard>
        </Link>
      ) : (
        <Card className="mb-5 bg-ink text-cream">
          <p className="font-serif text-2xl">Path complete. You earned this.</p>
          <p className="mt-2 text-cream/70">{brandCopy.certificateSignOff}</p>
        </Card>
      )}

      <div className="mb-5 grid grid-cols-2 gap-3">
        <Link href="/menu">
          <Card className="h-full min-h-32">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">The board</p>
            <p className="mt-2 font-serif text-xl">Cones & drinks</p>
            <p className="mt-1 text-[13px] text-muted">What guests point at</p>
          </Card>
        </Link>
        <Link href="/checklists">
          <Card className="h-full min-h-32">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">This shift</p>
            <p className="mt-2 font-serif text-xl">Opening & close</p>
            <p className="mt-1 text-[13px] text-muted">{locationChecklists.length} checklists</p>
          </Card>
        </Link>
      </div>

      <Link href={`/paths/${session.roleKey}`} className="mb-5 block">
        <Card>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">My path</p>
          <p className="mt-1 font-serif text-2xl">{stats.path?.title}</p>
          <p className="mt-2 text-[14px] text-muted">{stats.done}/{stats.total} complete</p>
        </Card>
      </Link>

      <section className="mb-5">
        <h2 className="mb-3 font-serif text-xl">Tonight&apos;s board</h2>
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
          {cones
            .filter((item) => item.photo)
            .map((item) => (
              <Link key={item.id} href="/menu" className="w-40 shrink-0">
                <div className="overflow-hidden rounded-3xl bg-paper shadow-[0_10px_30px_rgba(22,20,17,0.1)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.photo} alt={item.name} className="h-40 w-full object-cover" />
                  <div className="p-3">
                    {item.isPremium ? (
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal">Premium</p>
                    ) : null}
                    <p className="font-serif text-[17px] leading-tight">{item.name}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <Card className="mb-5">
        <h2 className="font-serif text-xl">Certifications</h2>
        {certifications.length === 0 ? (
          <p className="mt-2 text-[15px] text-muted">Pass your path quizzes to earn a certificate.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {certifications.map((cert) => (
              <li key={cert.id} className="rounded-2xl bg-light-gold px-3 py-3">
                <p className="font-bold">{cert.title}</p>
                <p className="text-[12px] text-muted">{new Date(cert.issuedAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <h2 className="font-serif text-xl">From the floor</h2>
        <ul className="mt-3 space-y-3">
          {announcements.map((item) => (
            <li key={item.id}>
              <p className="font-semibold">{item.title}</p>
              <p className="text-[14px] text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Card>
    </AppShell>
  );
}
