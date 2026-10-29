import Reveal from '../common/Reveal.jsx'

// Closing call-to-action for the standalone pages. It is rendered inside the page's last section, so it shares that section's background.
export default function CtaBand() {
  return (
    <div className="wrap cta-band">
      <Reveal className="glass cta-card">
        <div>
          <h2>
            Let&rsquo;s build something <span className="grad">together.</span>
          </h2>
          <p>Tell us about your project and we will get back to you shortly.</p>
        </div>
        <a className="btn btn-primary" href="/contact">
          Get in Touch
        </a>
      </Reveal>
    </div>
  )
}
