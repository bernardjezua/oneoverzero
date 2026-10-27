import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import { NAV_LINKS, SOCIAL } from '../data.js'

// Three groups across: the logo, the page links (two columns of three) and the contact links. A slim bar underneath holds the legal links.
export default function Footer({ onCookies }) {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo href="/" />
        </div>

        <nav className="footer-links" aria-label="Footer">
          <h4>Explore</h4>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-contact">
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="mailto:support@oneoverzero.com.ph">
                <Icon name="mail" size={18} />
                Email Us
              </a>
            </li>
            {SOCIAL.linkedin && (
              <li>
                <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">
                  <Icon name="linkedin" size={18} />
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <small>&copy; {new Date().getFullYear()} One Over Zero Innovations. All rights reserved.</small>
        <div className="footer-legal">
          <a className="textbtn" href="/privacy-policy">
            Privacy
          </a>
          <a className="textbtn" href="/cookie-policy">
            Cookie Policy
          </a>
          <button className="textbtn" onClick={onCookies}>
            Cookie Settings
          </button>
        </div>
      </div>
    </footer>
  )
}
