import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import { SERVICES } from '../data.js'

function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <SectionHead
          eyebrow="What We Offer"
          title="Everything you need to build, run and secure your tech"
          sub="Websites, apps, infrastructure, security and ongoing support, delivered by one team that stays with you long after launch."
        />
        <div className="offer-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 90} className="glass offer-card lift" onMouseMove={spotlight}>
              <span className="ico">
                <Icon name={s.icon} size={24} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.summary}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
