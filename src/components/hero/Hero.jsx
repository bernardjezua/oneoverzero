import { useEffect, useRef } from 'react'
import Icon from '../common/Icon.jsx'
import HeroCanvas from './HeroCanvas.jsx'

const FLOATERS = [
  { icon: 'code', top: '6%', left: '8%', delay: '0s', dur: '6s' },
  { icon: 'shield', top: '18%', left: '84%', delay: '-2s', dur: '7s' },
  { icon: 'cloud', top: '72%', left: '2%', delay: '-4s', dur: '8s' },
  { icon: 'bot', top: '84%', left: '74%', delay: '-1s', dur: '6.5s' },
  { icon: 'server', top: '46%', left: '94%', delay: '-3s', dur: '7.5s' },
  { icon: 'chart', top: '50%', left: '-6%', delay: '-5s', dur: '9s' },
]

// 1/0: the logo is the point you divide by zero at. Copies of it start from nothing at the centre and grow outward forever (1 over a number
// shrinking to zero grows without end), each one starting a little after the last so the zoom never stops. The path is an infinity sign.
const ECHOES = 5
const INFINITY = 'M200 200C240 150 330 140 340 200C330 260 240 250 200 200C160 150 70 140 60 200C70 260 160 250 200 200Z'

export default function Hero() {
  const ref = useRef(null)

  // Once the hero is scrolled out of view its CSS animations are paused (see hero-animation.css), so they cost nothing further down the page
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => ref.current?.classList.toggle('is-offscreen', !e.isIntersecting))
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section className="hero" id="top" ref={ref}>
      <HeroCanvas />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-visual" aria-hidden="true">
        <svg viewBox="0 0 400 400">
          <defs>
            <radialGradient id="hero-halo">
              <stop offset="0" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.55" />
              <stop offset="1" stopColor="rgb(var(--accent-rgb))" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle className="halo" cx="200" cy="200" r="150" fill="url(#hero-halo)" />
          <circle className="ring r3" cx="200" cy="200" r="195" />
          <circle className="ring r1" cx="200" cy="200" r="150" />
          <g className="orbit">
            <circle cx="200" cy="5" r="5" fill="var(--accent)" />
            <circle cx="200" cy="395" r="3" fill="var(--accent-2)" />
          </g>
          <g className="float">
            <path className="infinity" d={INFINITY} />
            <path className="infinity-run" d={INFINITY} pathLength="100" />
            {Array.from({ length: ECHOES }, (_, i) => (
              <g key={i} className="echo" style={{ '--i': i }}>
                <g transform="translate(84 84) scale(2.32)">
                  <path className="echo-cyan" d="M50 50V2Q50 50 98 50Z" />
                  <path className="echo-white" d="M50 50H2Q50 50 50 98Z" />
                </g>
              </g>
            ))}
            <g className="core">
              <g className="mark" transform="translate(84 84) scale(2.32)">
                <rect width="100" height="100" fill="transparent" />
                <path d="M50 50V2Q50 50 98 50Z" fill="url(#mark-cyan)" />
                <path d="M50 50H2Q50 50 50 98Z" fill="url(#mark-white)" />
              </g>
            </g>
          </g>
        </svg>
        {FLOATERS.map((f) => (
          <span
            key={f.icon}
            className="floater"
            style={{
              top: f.top,
              left: f.left,
              '--delay': f.delay,
              '--dur': f.dur,
            }}
          >
            <Icon name={f.icon} size={16} />
          </span>
        ))}
      </div>
      <div className="wrap hero-inner">
        <span className="eyebrow">Defining Infinite Possibilities</span>
        <h1>
          <span className="hero-line">One team. Zero hassle.</span>
          <br />
          <span className="grad">
            Software and systems
            <br />
            that deliver.
          </span>
        </h1>
        <p className="lead">
          From custom applications to cloud infrastructure and cybersecurity, we design, build and maintain the
          technology that helps organizations across industries operate more efficiently.
        </p>
        <div className="cta-row">
          <a className="btn btn-primary" href="/services">
            Explore Our Services
          </a>
          <a className="btn btn-glass" href="/work">
            See What We&rsquo;ve Built
          </a>
        </div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll down">
        <span className="mouse" aria-hidden="true" />
      </a>
    </section>
  )
}
