import { useState } from 'react'
import Icon from './Icon.jsx'
import HeroCanvas from './HeroCanvas.jsx'
import Reveal from './Reveal.jsx'
import { SERVICES } from '../data.js'

const ADDRESS = '4th Floor PhilCox Building, Salcedo, Legazpi Village, Makati, Metro Manila, Philippines'

const TIMEFRAMES = ['As soon as possible', 'Within 1 month', '1 to 3 months', '3 to 6 months', 'Just exploring']
const SOURCES = ['Google search', 'Social media', 'Referral', 'Event or conference', 'Existing client', 'Other']

// The full address also matches every '4th Floor' listing nearby, so the pin uses the building name.
const MAP_QUERY = 'PhilCox Building, Salcedo Village, Makati, Metro Manila, Philippines'

const DIRECTIONS_URL = `https://www.google.com/maps/dir//${encodeURIComponent(ADDRESS).replace(/%20/g, '+')}`

export default function Contact({ onPrivacy }) {
  const [sent, setSent] = useState(false)
  // PLACEHOLDER: no backend yet. Wire this to your form endpoint before launch.
  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }
  return (
    <section className="section contact" id="contact">
      <HeroCanvas />
      <div className="hero-glow" aria-hidden="true" />
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
                We&rsquo;ll use these details only to respond to your inquiry. See our{' '}
                <button type="button" className="textbtn" onClick={onPrivacy}>
                  privacy policy
                </button>
                .
              </p>
              <button className="btn btn-primary btn-send" type="submit">
                Send Message
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
