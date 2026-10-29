// Decorative space scene behind the "How we deliver" cards: a rocket, a ringed planet, a moon, a passing comet and twinkling stars.
// Purely visual (hidden from assistive tech, ignores the pointer) and positioned by the .space-* styles in index.css.

// Fixed pseudo-random star positions, so the sky looks the same on every render and every visit
const STARS = Array.from({ length: 34 }, (_, i) => {
  const r = (n) => {
    const x = Math.sin(i * 97.13 + n * 57.7) * 10000
    return x - Math.floor(x)
  }
  return {
    top: `${Math.round(r(1) * 100)}%`,
    left: `${Math.round(r(2) * 100)}%`,
    size: 1 + Math.round(r(3) * 2),
    delay: `${(r(4) * 5).toFixed(1)}s`,
    dur: `${(2.5 + r(5) * 3).toFixed(1)}s`,
  }
})

// Shooting stars: different spots, speeds and long, uneven gaps so they never look like a loop
const SHOOTING_STARS = [
  { top: '9%', left: '30%', delay: '1.5s', dur: '11s', len: '300px' },
  { top: '52%', left: '56%', delay: '6s', dur: '16s', len: '240px' },
  { top: '76%', left: '14%', delay: '10s', dur: '21s', len: '270px' },
]

export default function SpaceBackdrop() {
  return (
    <div className="space-bg" aria-hidden="true">
      {STARS.map((s, i) => (
        <i key={i} className="space-star" style={{ top: s.top, left: s.left, '--s': `${s.size}px`, '--delay': s.delay, '--dur': s.dur }} />
      ))}

      {SHOOTING_STARS.map((s, i) => (
        <span key={i} className="space-shoot" style={{ top: s.top, left: s.left, '--delay': s.delay, '--dur': s.dur, '--len': s.len }} />
      ))}

      <svg className="space-moon" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="#cfc9ef" />
        <circle cx="13" cy="15" r="3.4" fill="#a9a2d6" />
        <circle cx="26" cy="24" r="4.6" fill="#a9a2d6" />
        <circle cx="21" cy="10" r="2" fill="#a9a2d6" />
      </svg>

      <svg className="space-planet" viewBox="0 0 120 90">
        <defs>
          <linearGradient id="planet-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8a5cf0" />
            <stop offset="1" stopColor="#3fb5ae" />
          </linearGradient>
        </defs>
        <ellipse cx="60" cy="45" rx="56" ry="13" fill="none" stroke="rgba(183,244,238,0.45)" strokeWidth="3" transform="rotate(-18 60 45)" />
        <circle cx="60" cy="45" r="28" fill="url(#planet-body)" />
        <path d="M34 38q26 8 52-2M33 50q27 8 54-2" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
        <path d="M4 45A56 13 0 0 0 116 45" fill="none" stroke="rgba(183,244,238,0.7)" strokeWidth="3" transform="rotate(-18 60 45)" />
      </svg>

      <div className="space-rocket">
        <svg viewBox="0 0 64 100">
          <defs>
            <linearGradient id="rocket-body" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#b9b0ee" />
              <stop offset="0.5" stopColor="#ffffff" />
              <stop offset="1" stopColor="#c9c4ee" />
            </linearGradient>
            <linearGradient id="rocket-flame" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffe08a" />
              <stop offset="0.55" stopColor="#ff9a4d" />
              <stop offset="1" stopColor="#ff5a3d" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="rocket-flame">
            <path d="M25 70q7 30 14 0z" fill="url(#rocket-flame)" />
          </g>
          <path d="M20 46L6 66l14-4z" fill="#66ccc6" />
          <path d="M44 46l14 20-14-4z" fill="#66ccc6" />
          <path d="M32 4C45 16 49 36 45 64H19c-4-28 0-48 13-60z" fill="url(#rocket-body)" />
          <path d="M32 4C38 10 42 17 44 25H20c2-8 6-15 12-21z" fill="#66ccc6" />
          <circle cx="32" cy="38" r="7" fill="#0a0630" />
          <circle cx="32" cy="38" r="5" fill="#66ccc6" />
          <circle cx="30.4" cy="36.4" r="1.6" fill="#fff" opacity="0.8" />
          <path d="M24 64h16l-2 6H26z" fill="#8a82c4" />
        </svg>
      </div>
    </div>
  )
}
