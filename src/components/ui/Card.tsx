import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-3xl bg-paper p-5 shadow-[0_12px_40px_rgba(22,20,17,0.08)] ${className}`}>
      {children}
    </div>
  );
}

export function PhotoCard({
  src,
  alt,
  eyebrow,
  title,
  body,
  children,
}: {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <article className="overflow-hidden rounded-3xl bg-paper shadow-[0_16px_50px_rgba(22,20,17,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal">{eyebrow}</p>
        ) : null}
        <h3 className="font-serif text-2xl leading-tight">{title}</h3>
        {body ? <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p> : null}
        {children}
      </div>
    </article>
  );
}
