"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { useAcademy } from "@/lib/academy-context";
import { addOns, allergyNotice, cones, dips, drinks, menuItems, takeHome } from "@/lib/data/menu";

export default function MenuBoardPage() {
  const { session } = useAcademy();
  const [showTill, setShowTill] = useState(false);
  if (!session) return null;

  return (
    <AppShell
      title="The board"
      subtitle="Vanilla soft serve. Freshly baked cinnamon cones. Same language as the truck window."
    >
      <div className="mb-5 overflow-hidden rounded-3xl bg-chalkboard">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/menu-board-truck.jpg"
          alt="Outdoor Praguery menu board at the ice cream truck"
          className="h-56 w-full object-cover object-top sm:h-72"
        />
        <p className="px-5 py-4 text-[13px] text-cream/70">
          Guests photograph this. If a flavour is gone, say so to the whole line. Never promise a
          Premium cone you cannot build well.
        </p>
      </div>

      <h2 className="mb-3 font-serif text-2xl">Premium cones</h2>
      <ul className="space-y-4">
        {cones.map((item) => (
          <li key={item.id}>
            <Card className="overflow-hidden p-0">
              {item.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.photo} alt={item.name} className="h-48 w-full object-cover" />
              ) : null}
              <div className="p-5">
                <div className="flex items-center gap-2">
                  {item.number ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-sm font-bold text-cream">
                      {item.number}
                    </span>
                  ) : null}
                  {item.isPremium ? (
                    <span className="rounded-full bg-teal px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                      Premium
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-2 font-serif text-2xl">{item.name}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.description}</p>
                <p className="mt-2 text-[12px] text-muted">Contains: {item.allergens.join(", ") || "see allergy notice"}</p>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      <h2 className="mb-3 mt-8 font-serif text-2xl">Drinks</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {drinks.map((item) => (
          <Card key={item.id}>
            <p className="font-serif text-xl">{item.name}</p>
            <p className="mt-1 text-[14px] text-muted">{item.description}</p>
          </Card>
        ))}
      </div>
      <p className="mt-3 text-[13px] text-muted">Add-ons: {addOns.join(" · ")}</p>

      <h2 className="mb-3 mt-8 font-serif text-2xl">Take-home cones</h2>
      <p className="mb-3 text-[14px] text-muted">No ice cream included unless the guest asks to add it.</p>
      <ul className="space-y-3">
        {takeHome.map((item) => (
          <li key={item.id}>
            <Card>
              <p className="font-serif text-xl">
                {item.number}. {item.name}
              </p>
              <p className="text-[14px] text-muted">{item.description}</p>
            </Card>
          </li>
        ))}
      </ul>

      <h2 className="mb-3 mt-8 font-serif text-2xl">House-made dips</h2>
      <div className="flex flex-wrap gap-3">
        {dips.map((dip) => (
          <div key={dip.id} className="flex items-center gap-2 rounded-full bg-paper px-3 py-2 shadow-sm">
            <span className="h-4 w-4 rounded-full" style={{ background: dip.color }} />
            <span className="text-sm font-semibold">{dip.name}</span>
          </div>
        ))}
      </div>

      <Card className="mt-8 border border-gold/40">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">Food allergy notice</p>
        <p className="mt-2 text-[15px] leading-relaxed">{allergyNotice}</p>
      </Card>

      <Card className="mt-4">
        <p className="font-serif text-xl">Staff till card</p>
        <p className="mt-1 text-[14px] text-muted">
          Prices stay off guest photos and social. Open this only on the iPad at the window.
        </p>
        <button
          type="button"
          className="mt-3 rounded-full bg-ink px-4 text-sm font-semibold text-cream"
          onClick={() => setShowTill((value) => !value)}
        >
          {showTill ? "Hide till notes" : "Show till notes"}
        </button>
        {showTill ? (
          <ul className="mt-4 space-y-2 text-[14px]">
            {menuItems
              .filter((item) => item.staffPriceLabel)
              .map((item) => (
                <li key={item.id}>
                  {item.name}: {item.staffPriceLabel}
                </li>
              ))}
            <li>Read the physical board for today&apos;s numbers. This app does not publish prices.</li>
          </ul>
        ) : null}
      </Card>
    </AppShell>
  );
}
