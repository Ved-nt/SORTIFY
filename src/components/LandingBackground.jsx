import React, { useMemo } from "react";

/**
 * Static wave-like background made of vertical bars.
 * No external CSS required. Pure Tailwind + inline styles.
 */
export default function LandingBackground() {
  const bars = useMemo(() => {
    const n = 64;              // number of bars
    const base = 50;           // base height (% of container)
    const amp = 30;            // wave amplitude
    return Array.from({ length: n }, (_, i) => {
      const t = (i / (n - 1)) * Math.PI * 2;
      const h = Math.max(10, Math.min(90, base + Math.sin(t) * amp)); // clamp 10–90%
      return h;
    });
  }, []);

  return (
    <div className="absolute inset-0 flex items-end justify-between px-2 pointer-events-none">
      {bars.map((h, i) => (
        <div
          key={i}
          className="rounded-md"
          style={{
            height: `${h}%`,
            width: `${100 / bars.length - 0.4}%`, // fill width without overflow
            background:
              "linear-gradient(to top, rgba(99,102,241,0.45), rgba(34,211,238,0.45))",
            boxShadow: "0 0 14px rgba(99,102,241,0.35)",
            opacity: 0.65,
          }}
        />
      ))}
    </div>
  );
}


