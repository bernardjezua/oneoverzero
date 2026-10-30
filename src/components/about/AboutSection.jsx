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
  return (
    <section className="section about-home" id="about">
      <div className="space-bg" aria-hidden="true">
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
            Founded in 2017, One Over Zero Innovations provides software development and system integration services that help organizations achieve operational efficiency.
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
