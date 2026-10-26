import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { readConsent } from '../hooks.js'

function Modal({ open, onClose, title, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      className="modal glass"
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div className="modal-head">
        <h3 id="modal-title">{title}</h3>
        <button className="icon-btn" onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>
      </div>
      <div className="modal-body">{children}</div>
    </dialog>
  )
}

// Draft policy text for layout. Have counsel review before launch.
export function PrivacyDialog({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Privacy Policy">
      <p className="note">Draft. Last updated: [date]. Review with legal counsel before publishing.</p>
      <h4>What we collect</h4>
      <p>
        When you contact us we collect the details you submit: name, company, email address, project information, desired
        start date and how you heard about us.
      </p>
      <h4>How we use it</h4>
      <p>We use these details only to reply about your project and to manage our business relationship with you. We do not sell your information.</p>
      <h4>Cookies</h4>
      <p>We use strictly necessary storage (for example, your theme and consent choices). Optional analytics and marketing cookies are used only with your consent. You can change this under Cookie Settings.</p>
      <h4>Retention & your rights</h4>
      <p>We keep enquiry data only as long as needed to respond and for legitimate record-keeping. You may request access, correction or deletion at any time.</p>
      <h4>Contact</h4>
      <p>Privacy questions: privacy@example.com</p>
    </Modal>
  )
}

const CATS = [
  { id: 'necessary', name: 'Strictly necessary', text: 'Required for the site to work (theme, saved consent). Always on.', locked: true },
  { id: 'analytics', name: 'Analytics', text: 'Helps us understand how the site is used so we can improve it.' },
  { id: 'marketing', name: 'Marketing', text: 'Measures the effectiveness of our advertising campaigns.' },
]

export function CookieDialog({ open, onClose, onSave }) {
  const [prefs, setPrefs] = useState(() => readConsent() || { analytics: false, marketing: false })
  const save = (p) => {
    setPrefs(p)
    onSave(p)
    onClose()
  }
  return (
    <Modal open={open} onClose={onClose} title="Cookie Settings">
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
              checked={c.locked ? true : !!prefs[c.id]}
              disabled={c.locked}
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
    </Modal>
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
