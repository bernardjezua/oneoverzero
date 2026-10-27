import { CLIENT_LOGOS } from '../data.js'

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

// The two endlessly scrolling rows of client logos, shared by the landing page and the About page.
export default function ClientLogos() {
  const half = Math.ceil(CLIENT_LOGOS.length / 2)
  return (
    <div className="logo-rows" aria-label="Client logos">
      <LogoRow logos={CLIENT_LOGOS.slice(0, half)} />
      <LogoRow logos={CLIENT_LOGOS.slice(half)} reverse />
    </div>
  )
}
