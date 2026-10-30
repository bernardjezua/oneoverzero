import { useEffect, useId, useRef, useState } from 'react'
import AuroraBackdrop from '../common/AuroraBackdrop.jsx'
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
const SUB = (
  <>
    We offer innovative solutions for your business needs, delivered by one team.{' '}
    <strong className="offer-tip">Click each flip card</strong> to see when it&rsquo;s ideal.
  </>
)

// A card that turns over: the front says what the service is, the back says when it fits and gives an example.
// The whole card is the target: click (or press Enter / Space on) anywhere on a face to turn it over.
// Only the face you can see is reachable by keyboard and screen readers (the other one is visibility:hidden, see what-we-offer-grid.css).
function ServiceCard({ s, delay }) {
  const [flipped, setFlipped] = useState(false)
  const id = useId()
  const frontRef = useRef(null)
  const backRef = useRef(null)
  const moved = useRef(false)

  // After a flip, keep keyboard focus on the face that is now showing
  useEffect(() => {
    if (!moved.current) return
    ;(flipped ? backRef : frontRef).current?.focus({ preventScroll: true })
  }, [flipped])

  const flip = (to) => {
    moved.current = true
    setFlipped(to)
  }

  // Enter or Space on a face turns the card over, like a click
  const onFrontKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      flip(true)
    }
  }
  const onBackKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      flip(false)
    }
  }

  return (
    // The flipped state lives on the inner element: Reveal adds its own class to the outer one, and React would wipe it if that class changed.
    <Reveal delay={delay} className="offer-flip">
      <div className={`flip-inner ${flipped ? 'flipped' : ''}`}>
        <div
          className="glass offer-face offer-front"
          ref={frontRef}
          role="button"
          tabIndex={0}
          aria-expanded={flipped}
          aria-controls={`${id}-back`}
          aria-label={`${s.title}: see when it's ideal`}
          onClick={() => flip(true)}
          onKeyDown={onFrontKey}
        >
          <span className="ico">
            <Icon name={s.icon} size={24} />
          </span>
          <h3>{s.title}</h3>
          <p>{s.summary}</p>
        </div>
        <div
          className="glass offer-face offer-back"
          id={`${id}-back`}
          ref={backRef}
          role="button"
          tabIndex={0}
          aria-label={`${s.title}: flip back`}
          onClick={() => flip(false)}
          onKeyDown={onBackKey}
        >
          <h3>{s.title}</h3>
          <dl>
            <dt>Ideal when</dt>
            <dd>{s.ideal}</dd>
            <dt>For example</dt>
            <dd>{s.example}</dd>
          </dl>
        </div>
      </div>
    </Reveal>
  )
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
      <section className={`section services${page ? '' : ' has-aurora'}`} id="services">
        {!page && <AuroraBackdrop variant="arcs" />}
        <div className="wrap">
          {!page && <SectionHead eyebrow={EYEBROW} title={TITLE} sub={SUB} />}
          <div className="offer-grid">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.id} s={s} delay={(i % 3) * 90} />
            ))}
          </div>
        </div>
        {children}
      </section>
    </>
  )
}
