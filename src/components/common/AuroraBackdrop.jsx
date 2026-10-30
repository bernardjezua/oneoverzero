import { useEffect, useRef } from 'react'

// Quiet northern-lights backdrop for a section (put it first inside a `position: relative` section; the styles are in aurora-backdrop.css).
// arcs: thin broken rings, bleeding in from two corners, that turn slowly in opposite directions (lines only, so they never wash out the cards).
// rays: tall thin beams of light that sway and fade in and out.
// Only transform and opacity animate (no blur filters), and the animation is paused while the section is off screen.
const RAYS = [
  { left: '8%', w: '9%', color: '120,90,255', dur: '16s', delay: '0s' },
  { left: '30%', w: '6%', color: '70,230,170', dur: '22s', delay: '-8s' },
  { left: '62%', w: '10%', color: '90,210,240', dur: '19s', delay: '-4s' },
  { left: '84%', w: '6%', color: '150,100,255', dur: '25s', delay: '-13s' },
]

// Each ring is its own svg (so the browser turns it on the graphics card). `size` is its share of the corner cluster, `dash` the pattern of dashes round the circle (the two numbers add up to a divisor of 100, so the pattern closes cleanly).
const RINGS = [
  { size: 100, dash: '7 5.5', dur: '90s', rev: false, grad: ['70,230,170', '120,90,255'] },
  { size: 76, dash: '5 5', dur: '70s', rev: true, grad: ['120,90,255', '90,210,240'] },
  { size: 54, dash: '12 8', dur: '55s', rev: false, grad: ['90,210,240', '70,230,170'] },
  { size: 34, dash: '6 6.5', dur: '40s', rev: true, grad: ['70,230,170', '200,110,255'] },
]
const CLUSTERS = ['tr', 'bl']

function Ring({ r, id }) {
  return (
    <svg
      className={`ring${r.rev ? ' rev' : ''}`}
      style={{ width: `${r.size}%`, height: `${r.size}%`, top: `${(100 - r.size) / 2}%`, left: `${(100 - r.size) / 2}%`, '--dur': r.dur }}
      viewBox="0 0 100 100"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={`rgb(${r.grad[0]})`} stopOpacity="0.8" />
          <stop offset="1" stopColor={`rgb(${r.grad[1]})`} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="49" pathLength="100" strokeDasharray={r.dash} stroke={`url(#${id})`} />
    </svg>
  )
}

export default function AuroraBackdrop({ variant = 'arcs' }) {
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => ref.current?.classList.toggle('is-offscreen', !e.isIntersecting))
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div className={`aurora-bg ${variant}`} ref={ref} aria-hidden="true">
      {variant === 'rays'
        ? RAYS.map((r, i) => <i key={i} className="ray" style={{ left: r.left, width: r.w, '--c': r.color, '--dur': r.dur, '--delay': r.delay }} />)
        : CLUSTERS.map((c) => (
            <div key={c} className={`arc-set ${c}`}>
              {RINGS.map((r, i) => (
                <Ring key={i} r={r} id={`arc-${c}-${i}`} />
              ))}
            </div>
          ))}
    </div>
  )
}
