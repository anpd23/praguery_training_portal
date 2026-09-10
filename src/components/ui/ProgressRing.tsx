export function ProgressRing({
  value,
  size = 88,
  color = "#00BFB3",
}: {
  value: number;
  size?: number;
  color?: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="relative inline-flex" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E8F8F7"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[15px] font-bold text-dark-teal">
        {pct}%
      </span>
    </div>
  );
}

export function ProgressBar({ value, color = "#00BFB3" }: { value: number; color?: string }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2.5 overflow-hidden rounded-lg bg-[#E8F8F7]">
      <div className="h-full rounded-lg transition-[width] duration-300" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}
