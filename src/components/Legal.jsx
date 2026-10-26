import { useEffect, useId, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { readConsent } from '../hooks.js'

function Modal({ open, onClose, title, children }) {
  const ref = useRef(null)
  const titleId = useId()
  useEffect(() => {
    const d = ref.current
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      className="modal glass"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div className="modal-head">
        <h3 id={titleId}>{title}</h3>
        <button className="icon-btn" onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>
      </div>
      <div className="modal-body">{children}</div>
    </dialog>
  )
}

const CONTACT_EMAIL = 'support@oneoverzero.com.ph'

export function PrivacyDialog({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Privacy Policy">
      <p className="note">Last updated: October 26, 2026</p>
      <p>
        One Over Zero Innovations (&ldquo;One Over Zero&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what
        personal information we collect through this website, how we use it, and the choices you have. We handle personal information in line with
        the Philippine Data Privacy Act of 2012 (Republic Act No. 10173) and its implementing rules.
      </p>

      <h4>Who we are</h4>
      <p>
        One Over Zero Innovations, 4th Floor PhilCox Building, Salcedo, Legazpi Village, Makati, Metro Manila, Philippines. For anything related to
        this policy, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h4>What we collect</h4>
      <p>When you send us an inquiry through the contact form, we collect the details you provide:</p>
      <ul>
        <li>your name, company and email address;</li>
        <li>the service you are interested in and a description of what you need;</li>
        <li>when you would like to start, and how you heard about us.</li>
      </ul>
      <p>
        If you email us directly, we also receive your email address and the contents of your message. We do not ask for sensitive personal
        information through this website, so please do not include any in your message.
      </p>

      <h4>How we use it</h4>
      <p>We use your information only to:</p>
      <ul>
        <li>reply to your inquiry and prepare proposals or quotations;</li>
        <li>manage our business relationship with you if we work together;</li>
        <li>keep records we need for legal, accounting and security purposes.</li>
      </ul>
      <p>We do not sell your personal information, and we do not use it for automated decision-making.</p>

      <h4>Legal basis</h4>
      <p>
        We process your information because you asked us to get in touch (your consent and your request to enter into a contract), and because we
        have a legitimate interest in running and securing our business. Where we rely on consent, such as for optional cookies, you can withdraw it
        at any time.
      </p>

      <h4>Sharing your information</h4>
      <p>
        We share personal information only with service providers who help us operate our business (for example, email and hosting providers) and
        who are required to protect it, and with authorities when the law requires us to. We do not share it for other companies&rsquo; marketing.
      </p>

      <h4>Cookies and similar technologies</h4>
      <p>
        This site stores one small item in your browser to remember your cookie choice. This is strictly necessary and is not used to track you.
        Optional analytics and marketing cookies are used only if you accept them, and you can change your choice at any time using Cookie Settings
        in the footer.
      </p>

      <h4>Third-party services</h4>
      <p>
        This site loads fonts from Google Fonts and shows our office location using an embedded Google Map. When these load, Google may receive
        technical information such as your IP address and browser details, and may set its own cookies. Their handling of that information is
        covered by Google&rsquo;s own privacy policy.
      </p>

      <h4>How long we keep it</h4>
      <p>
        We keep inquiry details only as long as needed to respond to you and for legitimate record-keeping, then delete or anonymize them. If we
        work together, we keep project records for as long as our contract and the law require.
      </p>

      <h4>Security</h4>
      <p>
        We use reasonable organizational, physical and technical measures to protect your information against loss, misuse and unauthorized access.
        No method of transmission or storage is completely secure, so we cannot guarantee absolute security.
      </p>

      <h4>Your rights</h4>
      <p>Under the Data Privacy Act you have the right to:</p>
      <ul>
        <li>be informed about how your data is processed, and to access it;</li>
        <li>object to processing, or withdraw your consent;</li>
        <li>correct inaccurate or outdated data;</li>
        <li>ask us to suspend, block or delete your data;</li>
        <li>receive a copy of your data in a commonly used format;</li>
        <li>claim compensation for damages from inaccurate, unlawfully obtained or misused data;</li>
        <li>lodge a complaint with the National Privacy Commission (privacy.gov.ph).</li>
      </ul>
      <p>
        To exercise any of these rights, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will respond as soon as we reasonably can.
      </p>

      <h4>Changes to this policy</h4>
      <p>
        We may update this policy from time to time. The &ldquo;Last updated&rdquo; date above shows when it last changed, and we encourage you to
        review it periodically.
      </p>

      <h4>Contact us</h4>
      <p>
        Questions or concerns about your privacy? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </Modal>
  )
}

const CATS = [
  { id: 'analytics', name: 'Analytics', text: 'Helps us understand how the site is used so we can improve it.' },
  { id: 'marketing', name: 'Marketing', text: 'Measures the effectiveness of our advertising campaigns.' },
]

export function CookieDialog({ open, onClose, onSave }) {
  return (
    <Modal open={open} onClose={onClose} title="Cookie Settings">
      {/* Mounted only while open, so the toggles reload the saved choice every time and never go stale */}
      {open && <CookiePrefs onClose={onClose} onSave={onSave} />}
    </Modal>
  )
}

function CookiePrefs({ onClose, onSave }) {
  const [prefs, setPrefs] = useState(() => readConsent() || { analytics: false, marketing: false })
  const save = (p) => {
    onSave(p)
    onClose()
  }
  return (
    <>
      <p>Choose which optional cookies we may use. You can change this at any time.</p>
      <div className="cookie-list">
        {CATS.map((c) => (
          <label className="toggle" key={c.id}>
            <span>
              <b>{c.name}</b>
              <small>{c.text}</small>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={!!prefs[c.id]}
              onChange={(e) => setPrefs({ ...prefs, [c.id]: e.target.checked })}
            />
          </label>
        ))}
      </div>
      <div className="cta-row">
        <button className="btn btn-primary" onClick={() => save(prefs)}>
          Save preferences
        </button>
        <button className="btn btn-glass" onClick={() => save({ analytics: false, marketing: false })}>
          Reject optional
        </button>
        <button className="btn btn-glass" onClick={() => save({ analytics: true, marketing: true })}>
          Accept all
        </button>
      </div>
    </>
  )
}

export function CookieBanner({ onAccept, onReject, onCustomize, onPrivacy }) {
  return (
    <div className="banner glass" role="region" aria-label="Cookie consent">
      <p>
        We use cookies to run this site and, with your consent, to understand how it&rsquo;s used.{' '}
        <button className="textbtn" onClick={onPrivacy}>
          Privacy Policy
        </button>
      </p>
      <div className="banner-actions">
        <button className="btn btn-primary" onClick={onAccept}>
          Accept all
        </button>
        <button className="btn btn-glass" onClick={onReject}>
          Reject optional
        </button>
        <button className="btn btn-glass" onClick={onCustomize}>
          Customize
        </button>
      </div>
    </div>
  )
}
