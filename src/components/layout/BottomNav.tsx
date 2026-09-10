"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAcademy } from "@/lib/academy-context";

const items = [
  { href: "/home", label: "Home" },
  { href: "/menu", label: "Board" },
  { href: "/checklists", label: "Shift" },
  { href: "/library", label: "Library" },
  { href: "/settings", label: "More" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { session } = useAcademy();
  if (!session) return null;

  const nav =
    session.roleKey === "supervisor" || session.roleKey === "manager"
      ? [...items.slice(0, 3), { href: "/supervisor", label: "Team" }, items[4]]
      : items;

  return (
    <nav className="sticky bottom-0 z-40 border-t border-border/80 bg-cream/90 px-2 py-2 backdrop-blur-md">
      <ul className="mx-auto flex max-w-3xl items-stretch justify-between gap-1">
        {nav.map((item) => {
          const active =
            pathname === item.href || (item.href !== "/home" && pathname.startsWith(`${item.href}/`));
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex min-h-11 items-center justify-center rounded-2xl px-1 text-[12px] font-semibold ${
                  active ? "bg-ink text-cream" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
