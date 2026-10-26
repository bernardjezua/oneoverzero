import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './components/Icon.jsx'
import Logo from './components/Logo.jsx'
import HeroCanvas from './components/HeroCanvas.jsx'
import { CookieBanner, CookieDialog, PrivacyDialog } from './components/Legal.jsx'
import { readConsent, saveConsent, useActiveSection, useCountUp, useReveal, useScrollProgress } from './hooks.js'
import { CLIENT_LOGOS, NAV_LINKS, PROJECTS, SERVICES, STATS, TESTIMONIALS } from './data.js'

function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}

function SectionHead({ eyebrow, title, sub }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </Reveal>
  )
}

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1))

function Header() {
  const activeId = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap header-inner">
        <Logo />
        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={activeId === l.href.slice(1) ? "active" : ""} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a className="btn btn-glow nav-cta" href="#contact" onClick={() => setOpen(false)}>
            Schedule a Consultation
          </a>
        </nav>
        <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Toggle menu">
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}

const FLOATERS = [
  { icon: "code", top: "6%", left: "8%", delay: "0s", dur: "6s" },
  { icon: "shield", top: "18%", left: "84%", delay: "-2s", dur: "7s" },
  { icon: "cloud", top: "72%", left: "2%", delay: "-4s", dur: "8s" },
  { icon: "bot", top: "84%", left: "74%", delay: "-1s", dur: "6.5s" },
  { icon: "server", top: "46%", left: "94%", delay: "-3s", dur: "7.5s" },
  { icon: "chart", top: "50%", left: "-6%", delay: "-5s", dur: "9s" },
]

function Hero() {
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
              <path d="M52 48V2Q52 48 98 48Z" fill="var(--accent)" />
              <path d="M48 52H2Q48 52 48 98Z" fill="var(--mark-dark)" />
            </g>
          </g>
        </svg>
        {FLOATERS.map((f) => (
          <span key={f.icon} className="floater" style={{ top: f.top, left: f.left, "--delay": f.delay, "--dur": f.dur }}>
            <Icon name={f.icon} size={16} />
          </span>
        ))}
      </div>
      <div className="wrap hero-inner">
        <h1>
          Defining Infinite Possibilities Through <span className="grad">Intelligent Tech</span>
        </h1>
        <p className="lead">
          Founded in 2017, One Over Zero provides software development and system integration services built around open-source technologies and
          enterprise solutions, helping organizations achieve operational efficiency.
        </p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#services">
            Discover Our Capabilities
          </a>
          <a className="btn btn-glass" href="#work">
            View Our Work
          </a>
        </div>
      </div>
    </section>
  )
}

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
      <div className={`marquee-track ${reverse ? "rev" : ""}`}>
        {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
          <div key={i} aria-hidden={i >= logos.length} className="logo-slot">
            <ClientLogo logo={logo} index={i % logos.length} />
          </div>
        ))}
      </div>
    </div>
  )
}

function TrackRecord() {
  const half = Math.ceil(CLIENT_LOGOS.length / 2)
  return (
    <section className="section clients" id="clients">
      <div className="wrap">
        <SectionHead eyebrow="Proven Track Record" title="Trusted by 50+ Industry-Leading Companies & Growing Brands" />
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

function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`)
}

function Services() {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <SectionHead
          eyebrow="What We Offer"
          title="Full-stack technology, under one roof"
          sub="From software and security to cloud, data centers and marketing, one team covers the full stack."
        />
        <div className="offer-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 90} className="glass offer-card lift" onMouseMove={spotlight}>
              <span className="ico">
                <Icon name={s.icon} size={24} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.summary}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Project({ name, type, src, desc, tags }) {
  return (
    <Reveal className={`glass project lift ${type}`}>
      <div className="project-frame">
        {src ? (
          <img src={src} alt={`${name} screenshot`} loading="lazy" />
        ) : (
          <div className="shot-ph" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        )}
      </div>
      <div className="project-body">
        <h3>{name}</h3>
        <p>{desc}</p>
        <ul className="chips">
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

function Work() {
  return (
    <section className="section work" id="work">
      <div className="wrap">
        <SectionHead
          eyebrow="Our Work"
          title="Notable projects we&rsquo;ve worked on"
          sub="A selection of the products and platforms we&rsquo;ve built and shipped."
        />
        <div className="project-grid">
          {PROJECTS.map((p) => (
            <Project key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const trackRef = useRef(null)
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(1)

  // Pages are derived from how many cards fit, so it adapts to every screen width.
  const measure = useCallback(() => {
    const el = trackRef.current
    const first = el?.firstElementChild
    if (!first) return null
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const step = first.getBoundingClientRect().width + gap
    const per = Math.max(1, Math.round((el.clientWidth + gap) / step))
    const count = Math.max(1, Math.ceil(el.children.length / per))
    return { el, step, per, count, max: el.scrollWidth - el.clientWidth }
  }, [])

  const update = useCallback(() => {
    const m = measure()
    if (!m) return
    setPages(m.count)
    setPage(m.max <= 0 ? 0 : Math.round((m.el.scrollLeft / m.max) * (m.count - 1)))
  }, [measure])

  useEffect(() => {
    const el = trackRef.current
    const ro = new ResizeObserver(update)
    ro.observe(el)
    el.addEventListener('scroll', update, { passive: true })
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', update)
    }
  }, [update])

  const go = (i) => {
    const m = measure()
    if (!m) return
    const target = Math.min(Math.max(i, 0), m.count - 1)
    m.el.scrollTo({ left: Math.min(target * m.per * m.step, m.max), behavior: 'smooth' })
  }

  return (
    <section className="section reviews" id="reviews">
      <div className="wrap">
        <SectionHead eyebrow="Client Reviews" title="What our clients say" />
        <Reveal className={`carousel ${pages > 1 ? '' : 'single'}`}>
          <button className="car-btn prev" onClick={() => go(page - 1)} disabled={page === 0} aria-label="Previous reviews">
            <Icon name="left" />
          </button>
          <div className="review-track" ref={trackRef} tabIndex={0} aria-label="Client reviews">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="glass quote">
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption>
                  <b>{t.name}</b>
                  {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
          <button
            className="car-btn next"
            onClick={() => go(page + 1)}
            disabled={page >= pages - 1}
            aria-label="Next reviews"
          >
            <Icon name="right" />
          </button>
          <div className="dots" role="group" aria-label="Choose reviews page">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                className={i === page ? 'on' : ''}
                onClick={() => go(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === page}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const ADDRESS = '4th Floor PhilCox Building, Salcedo, Legazpi Village, Makati, Metro Manila, Philippines'

const TIMEFRAMES = ['As soon as possible', 'Within 1 month', '1 to 3 months', '3 to 6 months', 'Just exploring']
const SOURCES = ['Google search', 'Social media', 'Referral', 'Event or conference', 'Existing client', 'Other']

// The full address also matches every '4th Floor' listing nearby, so the pin uses the building name.
const MAP_QUERY = 'PhilCox Building, Salcedo Village, Makati, Metro Manila, Philippines'

const DIRECTIONS_URL = `https://www.google.com/maps/dir//${encodeURIComponent(ADDRESS).replace(/%20/g, '+')}`

function Contact({ onPrivacy }) {
  const [sent, setSent] = useState(false)
  // PLACEHOLDER: no backend yet. Wire this to your form endpoint before launch.
  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }
  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-grid">
        <Reveal>
          <span className="eyebrow">Get in Touch</span>
          <h2>Have an idea? Let&rsquo;s make it real.</h2>
          <p className="lead">
            Whether it&rsquo;s a new platform, a design review or an infrastructure upgrade, share what you&rsquo;re working on and
            our team will get back to you shortly.
          </p>
          <div className="contact-info">
            <a className="info-card glass lift" href="mailto:support@oneoverzero.com.ph">
              <span className="ico">
                <Icon name="mail" size={20} />
              </span>
              <span className="info-text">
                <small>Email us</small>
                <b>support@oneoverzero.com.ph</b>
              </span>
            </a>
            <div className="info-card glass">
              <span className="ico">
                <Icon name="pin" size={20} />
              </span>
              <span className="info-text">
                <small>Visit our office</small>
                <b>4th Floor PhilCox Building</b>
                <span>Salcedo, Legazpi Village, Makati, Metro Manila, Philippines</span>
              </span>
              <a className="link" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                Get directions <Icon name="arrow" size={16} />
              </a>
            </div>
            <div className="map">
              <iframe
                title="Map showing the One Over Zero office in Legazpi Village, Makati"
                src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=17&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={100} className="glass form-card">
          {sent ? (
            <div className="sent" role="status">
              <Icon name="check" size={40} />
              <h3>Thanks, we&rsquo;ll be in touch.</h3>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="two">
                <label>
                  <span>
                    Your Name<i aria-hidden="true">*</i>
                  </span>
                  <input name="name" required autoComplete="name" />
                </label>
                <label>
                  <span>
                    Company<i aria-hidden="true">*</i>
                  </span>
                  <input name="company" required autoComplete="organization" />
                </label>
              </div>
              <label>
                <span>
                  Email Address<i aria-hidden="true">*</i>
                </span>
                <input name="email" type="email" required autoComplete="email" />
              </label>
              <label>
                <span>
                  What are you looking for?<i aria-hidden="true">*</i>
                </span>
                <select name="service" required defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                  <option value="other">Something else</option>
                </select>
              </label>
              <label>
                <span>
                  Tell us about what you need<i aria-hidden="true">*</i>
                </span>
                <textarea name="message" rows={5} required />
              </label>
              <label>
                <span>
                  When are you looking to start?<i aria-hidden="true">*</i>
                </span>
                <select name="timeframe" required defaultValue="">
                  <option value="" disabled>
                    Select a timeframe
                  </option>
                  {TIMEFRAMES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>
                  Where did you hear about us?<i aria-hidden="true">*</i>
                </span>
                <select name="source" required defaultValue="">
                  <option value="" disabled>
                    Select a source
                  </option>
                  {SOURCES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <p className="fine">
                We&rsquo;ll use these details only to respond to your inquiry. See our{" "}
                <button type="button" className="textbtn" onClick={onPrivacy}>
                  privacy policy
                </button>
                .
              </p>
              <button className="btn btn-primary" type="submit">
                Send Message
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

function Footer({ onPrivacy, onCookies }) {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <Logo />
        <div className="legal-links">
          <button className="textbtn" onClick={onPrivacy}>
            Privacy Policy
          </button>
          <button className="textbtn" onClick={onCookies}>
            Cookie Settings
          </button>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const progress = useScrollProgress()
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [cookiesOpen, setCookiesOpen] = useState(false)
  const [consent, setConsent] = useState(() => readConsent())

  const choose = (c) => {
    saveConsent(c)
    setConsent(c)
  }

  return (
    <>
      <div className="progress" style={{ '--p': progress }} aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <TrackRecord />
        <Services />
        <Work />
        <Reviews />
        <Contact onPrivacy={() => setPrivacyOpen(true)} />
      </main>
      <Footer onPrivacy={() => setPrivacyOpen(true)} onCookies={() => setCookiesOpen(true)} />
      {!consent && (
        <CookieBanner
          onAccept={() => choose({ analytics: true, marketing: true })}
          onReject={() => choose({ analytics: false, marketing: false })}
          onCustomize={() => setCookiesOpen(true)}
          onPrivacy={() => setPrivacyOpen(true)}
        />
      )}
      <PrivacyDialog open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <CookieDialog open={cookiesOpen} onClose={() => setCookiesOpen(false)} onSave={choose} />
    </>
  )
}
