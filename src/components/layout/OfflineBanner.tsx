"use client";

import { useAcademy } from "@/lib/academy-context";
import { brandCopy } from "@/lib/brand/copy";

export function OfflineBanner() {
  const { online } = useAcademy();
  if (online) return null;
  return (
    <div
      role="status"
      className="bg-gold/30 px-4 py-2 text-center text-[13px] font-semibold text-ink"
    >
      {brandCopy.offlineBanner}
    </div>
  );
}
