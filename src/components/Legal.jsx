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

export function CookieBanner({ leaving = false, onAccept, onReject, onCustomize }) {
  return (
    <div className={`banner glass ${leaving ? 'leaving' : ''}`} role="region" aria-label="Cookie consent" aria-hidden={leaving || undefined}>
      <p>
        We use cookies to run this site and, with your consent, to understand how it&rsquo;s used. See our{' '}
        <a className="textbtn" href="/privacy-policy">
          privacy policy
        </a>
        .
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
