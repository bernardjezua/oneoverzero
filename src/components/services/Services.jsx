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
    <strong className="offer-tip">Click each flip card</strong> to see what we offer.
  </>
)

// A card that turns over: the front says what the service is, the back lists what we offer under it.
// The whole card is the target: click (or press Enter / Space on) anywhere on a face to turn it over.
// Only the face you can see is reachable by keyboard and screen readers (the other one is visibility:hidden, see what-we-offer-grid.css).
function ServiceCard({ s, delay }) {
  const [flipped, setFlipped] = useState(false)
  // Counts the flips: each one mounts a fresh aurora glow, which plays once and fades out
  const [glow, setGlow] = useState(0)
  const id = useId()
  const frontRef = useRef(null)
  const backRef = useRef(null)
  const moved = useRef(false)
  const tiltRef = useRef(null)
  const frame = useRef(0)
  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  // 3D tilt: with a mouse, the card leans towards the pointer and a light sheen follows it.
  // The numbers go straight onto the element as CSS variables, once per frame, so React never re-renders while the mouse moves.
  const onTilt = (e) => {
    if (e.pointerType !== 'mouse') return
    const box = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - box.left) / box.width
    const y = (e.clientY - box.top) / box.height
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const el = tiltRef.current
      if (!el) return
      el.style.setProperty('--rx', `${((0.5 - y) * 16).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${((x - 0.5) * 16).toFixed(2)}deg`)
      el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
    })
  }
  const onTiltEnd = () => {
    cancelAnimationFrame(frame.current)
    const el = tiltRef.current
    if (!el) return
    for (const v of ['--rx', '--ry', '--mx', '--my']) el.style.removeProperty(v)
  }

  // After a flip, keep keyboard focus on the face that is now showing
  useEffect(() => {
    if (!moved.current) return
    ;(flipped ? backRef : frontRef).current?.focus({ preventScroll: true })
  }, [flipped])

  const flip = (to) => {
    moved.current = true
    setFlipped(to)
    setGlow((g) => g + 1)
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
    <Reveal delay={delay} className="offer-flip" onPointerMove={onTilt} onPointerLeave={onTiltEnd}>
      {glow > 0 && <span key={glow} className="offer-aurora" aria-hidden="true" />}
      <div className="offer-tilt" ref={tiltRef}>
      <div className={`flip-inner ${flipped ? 'flipped' : ''}`}>
        <div
          className="glass offer-face offer-front"
          ref={frontRef}
          role="button"
          tabIndex={0}
          aria-expanded={flipped}
          aria-controls={`${id}-back`}
          aria-label={`${s.title}: see what we offer`}
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
          <ul>
            {s.items.map((it) => (
              <li key={it.name}>
                <strong>{it.name}</strong>
                <span className="offer-desc">{it.desc}</span>
              </li>
            ))}
          </ul>
        </div>
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
              <ServiceCard key={s.id} s={s} delay={(i % 4) * 90} />
            ))}
          </div>
        </div>
        {children}
      </section>
    </>
  )
}
