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

export default function Hero() {
  return (
    <section className="hero" id="top">
      <HeroCanvas />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-visual" aria-hidden="true">
        <svg viewBox="0 0 400 400">
          <circle className="ring r3" cx="200" cy="200" r="195" />
          <circle className="ring r1" cx="200" cy="200" r="150" />
          <circle className="ring r2" cx="200" cy="200" r="105" />
          <g className="orbit">
            <circle cx="200" cy="5" r="5" fill="var(--accent)" />
            <circle cx="200" cy="395" r="3" fill="var(--accent-2)" />
          </g>
          <g className="core">
            <g className="mark" transform="translate(84 84) scale(2.32)">
              <rect width="100" height="100" fill="transparent" />
              <path d="M50 50V2Q50 50 98 50Z" fill="url(#mark-cyan)" />
              <path d="M50 50H2Q50 50 50 98Z" fill="url(#mark-white)" />
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
          One team. Zero hassle. <span className="grad">Software and systems that deliver.</span>
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
        <span>Scroll</span>
      </a>
    </section>
  )
}
