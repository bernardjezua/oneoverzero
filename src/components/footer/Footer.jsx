import Icon from '../common/Icon.jsx'
import Logo from '../common/Logo.jsx'
import { NAV_LINKS, SOCIAL } from '../../data.js'

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

        <nav className="footer-contact footer-legal-col" aria-label="Legal">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="/privacy-policy">Privacy</a>
            </li>
            <li>
              <a href="/cookie-policy">Cookie Policy</a>
            </li>
            <li>
              <button type="button" className="footer-link-btn" onClick={onCookies}>
                Cookie Settings
              </button>
            </li>
          </ul>
        </nav>

        <div className="footer-contact">
          <h4>Contact Us</h4>
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

      {/* The year is read from the visitor's clock each time the page loads, so it never needs updating by hand */}
      <div className="wrap footer-bottom">
        <small>&copy; {new Date().getFullYear()} One Over Zero Innovations. All rights reserved.</small>
      </div>
    </footer>
  )
}
