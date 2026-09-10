"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { brandCopy } from "@/lib/brand/copy";
import { roles } from "@/lib/data/catalog";
import { useAcademy } from "@/lib/academy-context";
import { OfflineBanner } from "@/components/layout/OfflineBanner";
import type { RoleKey } from "@/types/academy";

export default function LandingPage() {
  const { signIn, signOut, session } = useAcademy();
  const router = useRouter();
  const [busy, setBusy] = useState<RoleKey | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function begin(roleKey: RoleKey) {
    setBusy(roleKey);
    setError(null);
    try {
      const next = await signIn(roleKey);
      router.push(next.roleKey === "supervisor" || next.roleKey === "manager" ? "/supervisor" : "/home");
    } catch {
      setError("That role is not available on this iPad yet.");
      setBusy(null);
    }
  }

  return (
    <div className="min-h-dvh bg-ink">
      <section className="relative isolate min-h-[72vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/sauce-pour.jpg"
          alt="House-made sauce spooned into a freshly baked chimney cone"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-5xl flex-col justify-end px-5 pb-10 pt-8">
          <div className="flex items-start justify-between gap-3">
            <Wordmark light size="lg" />
            {session ? (
              <button
                type="button"
                className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-cream"
                onClick={() => void signOut()}
              >
                Sign out
              </button>
            ) : null}
          </div>
          <p className="mt-8 max-w-md font-serif text-4xl leading-tight text-cream">
            Make life just a little bit sweeter.
          </p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-cream/80">
            Staff academy for Praguery Cafe, the ice cream trucks, and Metro Vancouver catering.
            Same craft guests photograph. Same board you serve from.
          </p>
          <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-teal">
            Lafarge Lake · McArthurGlen · Sea-to-Sky · Grouse · Catering
          </p>
        </div>
      </section>
      <OfflineBanner />
      <section className="-mt-6 rounded-t-[32px] bg-background px-4 pb-10 pt-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-serif text-3xl">{brandCopy.landingTitle}</h1>
          <p className="mt-2 max-w-xl text-[15px] text-muted">{brandCopy.landingSubtitle}</p>
          {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {roles.map((role) => (
              <button
                key={role.key}
                type="button"
                disabled={busy !== null}
                onClick={() => void begin(role.key)}
                className="rounded-3xl bg-paper p-5 text-left shadow-[0_16px_40px_rgba(22,20,17,0.08)] disabled:opacity-60"
              >
                <p className="font-serif text-2xl">{role.label}</p>
                <p className="mt-1 text-[14px] text-muted">{role.subtitle}</p>
                <span className="mt-4 inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm font-semibold text-cream">
                  {busy === role.key ? "Opening…" : "Begin"}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-8 overflow-hidden rounded-3xl bg-chalkboard">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/menu-board-maps.jpg"
              alt="Praguery truck menu board — vanilla soft serve in freshly baked cinnamon cones"
              className="h-48 w-full object-cover object-top opacity-90 sm:h-64"
            />
            <p className="px-5 py-4 text-[13px] leading-relaxed text-cream/75">
              Know the board by heart. Premium cones get the teal badge. Never post prices on
              guest photos — the till card lives inside Academy for staff.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
