import { useEffect, useId, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { readConsent } from '../hooks.js'

function Modal({ open, onClose, title, children }) {
  const ref = useRef(null)
  const bodyRef = useRef(null)
  const hideTimer = useRef(0)
  const titleId = useId()

  // The scrollbar is only visible while it's in use: it appears on open and on scroll, then fades after 3 seconds of inactivity.
  const showScrollbar = () => {
    const b = bodyRef.current
    if (!b) return
    b.classList.add('is-scrolling')
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => b.classList.remove('is-scrolling'), 3000)
  }

  useEffect(() => {
    const d = ref.current
    if (open && !d.open) {
      d.showModal()
      // Start with focus on the popup itself instead of the Close button, so no button lights up with a ring when it opens
      d.focus({ preventScroll: true })
      showScrollbar()
    }
    if (!open && d.open) d.close()
    return () => clearTimeout(hideTimer.current)
  }, [open])
  return (
    <dialog
      ref={ref}
      className="modal glass"
      tabIndex={-1}
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
      <div className="modal-body" ref={bodyRef} onScroll={showScrollbar} onPointerMove={showScrollbar} onTouchStart={showScrollbar}>
        {children}
      </div>
    </dialog>
  )
}

const CONTACT_EMAIL = 'support@oneoverzero.com.ph'

export function PrivacyDialog({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Privacy Policy">
      <p className="note">Last updated: October 26, 2026</p>
      <p>
        One Over Zero Innovations (&ldquo;we&rdquo;) respects your privacy. This policy explains what we collect through this website and how we
        handle it, in line with the Philippine Data Privacy Act of 2012 (RA 10173).
      </p>

      <h4>What we collect</h4>
      <p>
        Only what you send us through the contact form or by email: your name, company, email address, project details, preferred start date and
        how you heard about us. Please don&rsquo;t include sensitive personal information.
      </p>

      <h4>How we use it</h4>
      <p>
        To reply to your inquiry, prepare proposals, manage our relationship if we work together, and keep records the law requires. We never
        sell your information.
      </p>

      <h4>Sharing</h4>
      <p>
        Only with service providers who help us run our business (such as email and hosting) and who must protect it, or with authorities when
        the law requires.
      </p>

      <h4>Cookies and third parties</h4>
      <p>
        We store one item in your browser to remember your cookie choice. Optional analytics and marketing cookies are used only if you accept
        them; change this anytime in Cookie Settings. The site also loads Google Fonts and a Google Map, which may receive your IP address and set
        their own cookies.
      </p>

      <h4>Retention and security</h4>
      <p>
        We keep inquiry details only as long as needed, then delete or anonymize them, and use reasonable measures to protect them.
      </p>

      <h4>Your rights</h4>
      <p>
        You may access, correct, object to, or ask us to delete your data, withdraw consent, and complain to the National Privacy Commission
        (privacy.gov.ph). To make a request, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h4>Changes and contact</h4>
      <p>
        We may update this policy; the date above shows the latest version. Questions? Email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
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
      <p className="cookie-intro">Choose which optional cookies we may use. You can change this at any time.</p>
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

export function CookieBanner({ leaving = false, onAccept, onReject, onCustomize, onPrivacy }) {
  return (
    <div className={`banner glass ${leaving ? 'leaving' : ''}`} role="region" aria-label="Cookie consent" aria-hidden={leaving || undefined}>
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
