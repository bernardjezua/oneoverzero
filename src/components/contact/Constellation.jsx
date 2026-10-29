// Ursa Minor drawn from our products, ending in Polaris: "Your project", marked with the One Over Zero star.
// Decorative only (hidden from assistive tech). The star twinkle and the glow when you hover a star are in contact-constellation.css.
const STARS = [
  { x: 35, y: 63, label: 'HRIS', lx: 35, ly: 82 },
  { x: 108, y: 18 },
  { x: 129, y: 56, label: 'POS', lx: 129, ly: 75 },
  { x: 67, y: 99 },
  { x: 206, y: 41, label: 'Booking', lx: 206, ly: 28 },
  { x: 274, y: 66 },
]
const POLARIS = { x: 325, y: 99 }

// The bowl, then the handle running out to Polaris
const LINES = 'M35 63L108 18L129 56L67 99L35 63M129 56L206 41L274 66L325 99'

export default function Constellation() {
  return (
    <svg className="constellation" viewBox="0 0 360 130" aria-hidden="true">
      <path className="constellation-line" d={LINES} />
      {STARS.map((s, i) => (
        // Each star is a node: a larger invisible circle makes it easy to hover, and a halo fades in around the star
        <g key={i} className="constellation-node">
          <circle className="node-hit" cx={s.x} cy={s.y} r="14" />
          <circle className="node-halo" cx={s.x} cy={s.y} r="10" />
          <circle className="constellation-star" cx={s.x} cy={s.y} r={s.label ? 3 : 2.2} style={{ '--delay': `${(i * 0.7) % 3}s` }} />
          {s.label && (
            <text className="constellation-label" x={s.lx} y={s.ly} textAnchor="middle">
              {s.label}
            </text>
          )}
        </g>
      ))}
      <g className="constellation-node polaris">
        <circle className="node-hit" cx={POLARIS.x} cy={POLARIS.y} r="22" />
        <circle className="constellation-glow" cx={POLARIS.x} cy={POLARIS.y} r="16" />
        <g className="node-mark">
          <g transform={`translate(${POLARIS.x - 14} ${POLARIS.y - 14}) scale(0.28)`}>
            <path d="M50 50V2Q50 50 98 50Z" fill="url(#mark-cyan)" />
            <path d="M50 50H2Q50 50 50 98Z" fill="url(#mark-white)" />
          </g>
        </g>
        <text className="constellation-label strong" x={POLARIS.x} y={POLARIS.y + 30} textAnchor="middle">
          Your project
        </text>
      </g>
    </svg>
  )
}
