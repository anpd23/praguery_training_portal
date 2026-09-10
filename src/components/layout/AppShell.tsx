"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAcademy } from "@/lib/academy-context";
import { locationById, roleByKey } from "@/lib/data/catalog";
import { BottomNav } from "@/components/layout/BottomNav";
import { OfflineBanner } from "@/components/layout/OfflineBanner";
import { Wordmark } from "@/components/ui/Wordmark";

export function AppShell({
  title,
  subtitle,
  children,
  backHref,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  backHref?: string;
}) {
  const { ready, session } = useAcademy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !session) router.replace("/");
  }, [ready, session, router]);

  if (!ready || !session) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-ink text-cream">
        <Wordmark light />
      </div>
    );
  }

  const role = roleByKey(session.roleKey);
  const location = locationById(session.locationId);

  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col bg-background">
      <header className="bg-ink px-5 pb-6 pt-5 text-cream">
        <div className="mb-4 flex items-start justify-between gap-3">
          <Wordmark light size="sm" />
          {backHref ? (
            <Link
              href={backHref}
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-cream"
            >
              Back
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold"
            >
              Switch
            </button>
          )}
        </div>
        <p className="text-[13px] text-cream/70">
          {session.fullName} · {role?.label}
        </p>
        <p className="text-[13px] text-teal">{location?.name}</p>
        <h1 className="mt-2 font-serif text-[32px] leading-none tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-cream/75">{subtitle}</p> : null}
      </header>
      <OfflineBanner />
      <main className="flex-1 px-4 py-5 pb-8">{children}</main>
      <BottomNav />
    </div>
  );
}
