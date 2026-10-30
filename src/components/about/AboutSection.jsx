import { useEffect, useRef } from 'react'
import MissionVision from './MissionVision.jsx'
import Pillars from './Pillars.jsx'
import Reveal from '../common/Reveal.jsx'

// Fixed pseudo-random star positions, so the sky looks the same on every render and every visit (same idea as the How We Deliver backdrop)
const STARS = Array.from({ length: 22 }, (_, i) => {
  const r = (n) => {
    const x = Math.sin(i * 53.7 + n * 31.3) * 10000
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

// Aurora borealis: slow, glowing wavy ribbons drifting across the section. Each is a wave of 720-unit periods drawn four times across a 2880-wide strip, and the strip slides
// left by exactly two periods (half its width) before it loops, so the loop has no visible jump. Under each line a fading curtain (a gradient fill) gives the northern-lights look without any blur filter, so it stays light: only transform animates.
const wave = (y, a) => `M0 ${y}Q180 ${y - a} 360 ${y}` + 'T720 ' + y + 'T1080 ' + y + 'T1440 ' + y + 'T1800 ' + y + 'T2160 ' + y + 'T2520 ' + y + 'T2880 ' + y
// Two ribbons along the top edge and two along the bottom edge, drifting in opposite directions (`rev` ones drift the other way). Each one fills toward its own edge,
// so the wavy line is the lower border of the top ribbons and the upper border of the bottom ones, and the glow fades away toward the edge.
const AURORA = [
  { edge: 'top', y: 55, amp: 40, color: '70,230,170', dur: '40s', delay: '0s' },
  { edge: 'top', y: 40, amp: -30, color: '140,100,255', dur: '58s', delay: '-20s' },
  { edge: 'bottom', y: 105, amp: -40, color: '90,210,240', dur: '44s', delay: '-10s', rev: true },
  { edge: 'bottom', y: 120, amp: 30, color: '70,230,170', dur: '62s', delay: '-35s', rev: true },
]

// The One Over Zero mark at the centre of slowly turning rings, with a few small dots travelling around them
function Orbit() {
  return (
    <svg className="about-orbit" viewBox="0 0 300 300">
      <circle className="about-ring r1" cx="150" cy="150" r="140" />
      <g className="about-spin">
        <circle cx="150" cy="10" r="4" fill="var(--accent)" />
        <circle cx="150" cy="290" r="2.5" fill="var(--accent-2)" />
      </g>
      <circle className="about-ring r2" cx="150" cy="150" r="106" />
      <g className="about-spin rev">
        <circle cx="44" cy="150" r="3.5" fill="var(--accent-2)" />
        <circle cx="256" cy="150" r="2.5" fill="var(--accent)" />
      </g>
      <circle className="about-ring r3" cx="150" cy="150" r="72" />
      <g className="about-mark">
        <g transform="translate(95 95) scale(1.1)">
          <path d="M50 50V2Q50 50 98 50Z" fill="url(#mark-cyan)" />
          <path d="M50 50H2Q50 50 50 98Z" fill="url(#mark-white)" />
        </g>
      </g>
    </svg>
  )
}

// Company overview on the landing page, right under the hero, above the "Trusted by clients" section. The full story is on /about.
export default function AboutSection() {
  const ref = useRef(null)

  // Scrolled out of view: the aurora is paused (see about-home.css)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => ref.current?.classList.toggle('is-offscreen', !e.isIntersecting))
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section className="section about-home" id="about" ref={ref}>
      <div className="space-bg" aria-hidden="true">
        <div className="aurora">
          {AURORA.map((a, i) => (
            <svg
              key={i}
              className={`aurora-line${a.rev ? ' rev' : ''}`}
              style={{ [a.edge]: 0, '--c': a.color, '--dur': a.dur, '--delay': a.delay }}
              viewBox="0 0 2880 160"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={`aurora-${i}`} x1="0" y1={a.edge === 'top' ? 1 : 0} x2="0" y2={a.edge === 'top' ? 0 : 1}>
                  <stop offset="0" stopColor={`rgb(${a.color})`} stopOpacity="0.32" />
                  <stop offset="1" stopColor={`rgb(${a.color})`} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path className="aurora-curtain" d={`${wave(a.y, a.amp)}V${a.edge === 'top' ? 0 : 160}H0Z`} fill={`url(#aurora-${i})`} />
              <path className="aurora-core" d={wave(a.y, a.amp)} />
            </svg>
          ))}
        </div>
        {STARS.map((s, i) => (
          <i key={i} className="space-star" style={{ top: s.top, left: s.left, '--s': `${s.size}px`, '--delay': s.delay, '--dur': s.dur }} />
        ))}
        <span className="space-shoot" style={{ top: '14%', left: '38%', '--delay': '2s', '--dur': '14s', '--len': '260px' }} />
      </div>
      <div className="wrap about-home-grid">
        <Reveal className="section-head">
          <span className="eyebrow">About Us</span>
          <h2>
            About <span className="grad">One Over Zero</span>
          </h2>
          <p>
            Founded in 2017, One Over Zero Innovations provides software development and system integration services that help organizations achieve operational efficiency. We build websites, apps and platforms, set up the infrastructure and security behind them, and stay on to maintain and support what we deliver.
          </p>
          <a className="btn btn-primary about-btn" href="/about">
            Learn More
          </a>
        </Reveal>
        <Reveal className="about-home-mark" delay={120} aria-hidden="true">
          <Orbit />
        </Reveal>
      </div>
      <MissionVision />
      <Pillars />
    </section>
  )
}
