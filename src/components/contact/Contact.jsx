import { useEffect, useRef, useState } from 'react'
import Icon from '../common/Icon.jsx'
import HeroCanvas from '../hero/HeroCanvas.jsx'
import Constellation from './Constellation.jsx'
import Reveal from '../common/Reveal.jsx'
import { SERVICES } from '../../data.js'
import { submitInquiry } from '../../submitInquiry.js'
import { validateField, validateInquiry } from '../../validateInquiry.js'

const TIMEFRAMES = ['As soon as possible', 'Within 1 month', '1 to 3 months', '3 to 6 months', 'Just exploring']
const SOURCES = ['Google search', 'Social media', 'Referral', 'Event or conference', 'Existing client', 'Other']

// The exact Google Maps listing for the building (from Share > Embed a map), so the pin is labelled Kyodo Spaces
const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.7408090004014!2d121.03591157510644!3d14.613835585874142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x646fd959066e6d7b%3A0x66711a87662a8577!2sKyodo%20Spaces%20Coworking%20%2B%20Lounge!5e0!3m2!1sen!2sph!4v1793355690531!5m2!1sen!2sph'
// Used for the "Get directions" link
const MAP_QUERY = 'Kyodo Spaces Coworking + Lounge'

const DIRECTIONS_URL = `https://www.google.com/maps/dir//${encodeURIComponent(MAP_QUERY).replace(/%20/g, '+')}`

// How each field is named when a screen reader is told what needs fixing
const FIELD_NAMES = {
  name: 'Your Name',
  company: 'Company',
  email: 'Email Address',
  service: 'What are you looking for',
  message: 'Tell us about what you need',
  timeframe: 'When are you looking to start',
  source: 'Where did you hear about us',
}

// One form field: the label and its control. A field that needs fixing gets a red outline (see aria-invalid in index.css).
function Field({ label, children }) {
  return (
    <label>
      <span>
        {label}
        <i aria-hidden="true">*</i>
      </span>
      {children}
    </label>
  )
}

// `page` is true on the standalone /contact page: same content as the landing page section, but with the page's h1 and room for the header.
export default function Contact({ page = false }) {
  const Heading = page ? 'h1' : 'h2'
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})
  const sentRef = useRef(null)
  const sending = status === 'sending'

  // A control that needs fixing is marked invalid: that is what draws the red outline, and screen readers announce it too
  const aria = (name) => ({ 'aria-invalid': errors[name] ? 'true' : undefined })
  // One hidden announcement for screen readers listing what to fix (it takes no space on screen)
  const toFix = Object.keys(errors).map((name) => FIELD_NAMES[name])
  const announcement = toFix.length ? `Please check these fields: ${toFix.join(', ')}.` : ''

  const readForm = (form) => Object.fromEntries([...new FormData(form).entries()].map(([k, v]) => [k, String(v)]))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (sending) return
    const form = e.currentTarget
    const data = readForm(form)

    // Check everything first: show every problem at once and jump to the first field that needs fixing
    const found = validateInquiry(data)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      form.elements[first]?.focus()
      return
    }

    setStatus('sending')
    try {
      await submitInquiry({
        name: data.name.trim(),
        company: data.company.trim(),
        email: data.email.trim(),
        service: SERVICES.find((s) => s.id === data.service)?.title ?? 'Something else',
        message: data.message.trim(),
        timeframe: data.timeframe,
        source: data.source,
        page: window.location.pathname,
      })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  // Fix-as-you-go: an error disappears as soon as the field becomes valid
  const onChange = (e) => {
    const { name, value } = e.target
    if (errors[name] && !validateField(name, value)) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  // Leaving a field with something invalid in it flags it right away (an untouched empty field waits for the submit)
  const onBlur = (e) => {
    const { name, value } = e.target
    const message = value.trim() ? validateField(name, value) : ''
    if (message && !errors[name]) setErrors((prev) => ({ ...prev, [name]: message }))
  }

  // After sending, move focus to the confirmation so screen readers read it, and bring it into view on small screens
  useEffect(() => {
    if (status !== 'sent') return
    sentRef.current?.focus({ preventScroll: true })
    sentRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [status])
  return (
    <section className={`section contact ${page ? 'contact-page' : ''}`} id="contact">
      <HeroCanvas />
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap contact-grid">
        <Reveal className="reveal-solid">
          <Constellation />
          <span className="eyebrow">Get In Touch</span>
          <Heading>
            One conversation. <span className="grad">Infinite possibilities.</span>
          </Heading>
          <p className="lead">
            Every project on this page started with a single conversation. Book a consultation, request a product demo, or simply tell us what you need, and we&rsquo;ll take it from there.
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
                <b>Kyodo Spaces Coworking + Lounge</b>
              </span>
              <a className="link" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                Get directions <Icon name="arrow" size={16} />
              </a>
              <div className="map">
                <iframe
                  title="Map showing the One Over Zero office at Kyodo Spaces Coworking + Lounge"
                  src={MAP_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100} className="glass form-card">
          {status === 'sent' ? (
            <div className="sent" role="status" tabIndex={-1} ref={sentRef}>
              <svg className="sent-mark" viewBox="0 0 80 80" aria-hidden="true">
                <circle className="sent-pulse" cx="40" cy="40" r="34" />
                <circle className="sent-ring" cx="40" cy="40" r="34" />
                <path className="sent-tick" d="M26 41l10 10 19-22" />
              </svg>
              <h3>Thanks, we&rsquo;ll be in touch.</h3>
              <p>
                We&rsquo;ll reach out to you shortly, within <span className="nowrap">3-5 business days</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} onChange={onChange} onBlur={onBlur} noValidate>
              <p className="sr-only" role="alert">
                {announcement}
              </p>
              <div className="two">
                <Field label="Your Name">
                  <input name="name" required autoComplete="name" {...aria('name')} />
                </Field>
                <Field label="Company">
                  <input name="company" required autoComplete="organization" {...aria('company')} />
                </Field>
              </div>
              <Field label="Email Address">
                <input name="email" type="email" required autoComplete="email" {...aria('email')} />
              </Field>
              <Field label="What are you looking for?">
                <select name="service" required defaultValue="" {...aria('service')}>
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
              </Field>
              <Field label="Tell us about what you need">
                <textarea name="message" rows={5} required {...aria('message')} />
              </Field>
              <Field label="When are you looking to start?">
                <select name="timeframe" required defaultValue="" {...aria('timeframe')}>
                  <option value="" disabled>
                    Select a timeframe
                  </option>
                  {TIMEFRAMES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Where did you hear about us?">
                <select name="source" required defaultValue="" {...aria('source')}>
                  <option value="" disabled>
                    Select a source
                  </option>
                  {SOURCES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <p className="fine">
                We&rsquo;ll use these details only to respond to your inquiry. See our{' '}
                <a className="textbtn" href="/privacy-policy">
                  privacy policy
                </a>
                .
              </p>
              {status === 'error' && (
                <p className="form-error" role="alert">
                  We couldn&rsquo;t send your message. Please try again, or email us at support@oneoverzero.com.ph.
                </p>
              )}
              <button className="btn btn-primary btn-send" type="submit" disabled={sending} aria-busy={sending}>
                {sending ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    Sending&hellip;
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
