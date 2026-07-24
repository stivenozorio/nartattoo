"use client";

const PARTICLE_COUNT = 34;

// Deterministic pseudo-random generator (mulberry32) so the layout is identical
// on server and client — avoids hydration mismatches from Math.random().
function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const random = seededRandom(1337);

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: `${(random() * 100).toFixed(2)}%`,
  top: `${(random() * 100).toFixed(2)}%`,
  size: 1 + random() * 2,
  duration: 3 + random() * 5,
  delay: random() * 6,
}));

/** Ultra-subtle fixed field of blue sparkles, purely decorative. */
export default function Sparkles() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-electric animate-twinkle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: "0 0 6px rgba(0,174,239,0.8)",
          }}
        />
      ))}
    </div>
  );
}
