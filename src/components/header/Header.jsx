import { useEffect, useRef, useState } from 'react'
import Icon from '../common/Icon.jsx'
import Logo from '../common/Logo.jsx'
import { NAV_LINKS } from '../../data.js'

// The "Contact Us" button goes to the same page as the Contact link, so the header only needs the button (the footer keeps the link)
const HEADER_LINKS = NAV_LINKS.filter((l) => l.href !== '/contact')

export default function Header({ route = '/' }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  // Hides while scrolling down and returns as soon as the page is scrolled up (or back near the top).
  useEffect(() => {
    lastY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      const delta = y - lastY.current
      if (y < 80) setHidden(false)
      else if (delta > 6) setHidden(true)
      else if (delta < -6) setHidden(false)
      if (Math.abs(delta) > 6) lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // An open menu keeps the header on screen
  const away = hidden && !open

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''} ${away ? 'away' : ''}`}>
      <div className="wrap header-inner">
        <Logo href="/" />
        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Primary">
          {HEADER_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={route === l.href ? 'active' : ''}
              aria-current={route === l.href ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a className="btn btn-glow nav-cta" href="/contact" onClick={() => setOpen(false)}>
            Contact Us
          </a>
        </nav>
        <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Toggle menu">
          <span key={open ? 'close' : 'menu'} className="menu-icon">
            <Icon name={open ? 'close' : 'menu'} />
          </span>
        </button>
      </div>
    </header>
  )
}
