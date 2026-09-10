export function Wordmark({
  light = false,
  size = "md",
}: {
  light?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const title =
    size === "lg" ? "text-6xl" : size === "sm" ? "text-[32px]" : "text-[42px]";
  return (
    <div className={light ? "text-cream" : "text-ink"}>
      <p className={`font-script leading-none ${title}`}>Praguery</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.38em] opacity-80">
        Homemade goodness
      </p>
    </div>
  );
}
