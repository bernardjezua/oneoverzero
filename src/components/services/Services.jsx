import Icon from '../common/Icon.jsx'
import PageHero from '../common/PageHero.jsx'
import Reveal from '../common/Reveal.jsx'
import SectionHead from '../common/SectionHead.jsx'
import { SERVICES } from '../../data.js'

const EYEBROW = 'What We Offer'
const TITLE = (
  <>
    Everything you need to <span className="grad">build, run and secure</span> your tech
  </>
)
const SUB = 'We offer innovative solutions for your business needs, delivered by one team.'

function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

// `page` is true on the standalone /services page: the same cards, under the same banner as the About and FAQ pages.
export default function Services({ page = false, children }) {
  return (
    <>
      {page && (
        <PageHero eyebrow={EYEBROW} title={TITLE}>
          {SUB}
        </PageHero>
      )}
      <section className="section services" id="services">
        <div className="wrap">
          {!page && <SectionHead eyebrow={EYEBROW} title={TITLE} sub={SUB} />}
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
        {children}
      </section>
    </>
  )
}
