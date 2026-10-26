import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import { useCountUp } from '../hooks.js'
import { CLIENT_LOGOS, STATS } from '../data.js'

function Stat({ value, suffix, label, decimals = 0 }) {
  const [ref, shown] = useCountUp(value, decimals)
  return (
    <div className="glass stat" ref={ref}>
      <div className="stat-num">
        {shown}
        <span>{suffix}</span>
      </div>
      <p>{label}</p>
    </div>
  )
}

const GLYPHS = [
  <path key="0" d="M12 3l9 9-9 9-9-9z" />,
  <circle key="1" cx="12" cy="12" r="8" />,
  <path key="2" d="M4 18L12 4l8 14z" />,
  <rect key="3" x="4" y="4" width="16" height="16" rx="4" />,
  <path key="4" d="M4 12h16M12 4v16" />,
  <path key="5" d="M5 5h14v14H5zM9 9h6v6H9z" />,
]

function ClientLogo({ logo, index }) {
  return (
    <span className="logo-chip" title={logo.name}>
      {logo.src ? (
        <img src={logo.src} alt={logo.name} loading="lazy" />
      ) : (
        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" role="img" aria-label={logo.name}>
          {GLYPHS[index % GLYPHS.length]}
        </svg>
      )}
    </span>
  )
}

function LogoRow({ logos, reverse }) {
  // Four copies so the track is wider than any screen and the -50% loop is seamless; the copy is hidden from assistive tech
  return (
    <div className="marquee">
      <div className={`marquee-track ${reverse ? 'rev' : ''}`}>
        {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
          <div key={i} aria-hidden={i >= logos.length} className="logo-slot">
            <ClientLogo logo={logo} index={i % logos.length} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TrackRecord() {
  const half = Math.ceil(CLIENT_LOGOS.length / 2)
  return (
    <section className="section clients" id="clients">
      <div className="wrap">
        <SectionHead eyebrow="Proven Track Record" title="Trusted by 30+ Industry-Leading Companies & Growing Brands" />
      </div>
      <div className="logo-rows" aria-label="Client logos">
        <LogoRow logos={CLIENT_LOGOS.slice(0, half)} />
        <LogoRow logos={CLIENT_LOGOS.slice(half)} reverse />
      </div>
      <div className="wrap stats">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <Stat {...s} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
