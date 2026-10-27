import { useEffect, useRef } from 'react'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import { TESTIMONIALS } from '../data.js'

export default function Reviews() {
  // Same technique as the client logos: four copies so the -50% loop is seamless and the track is wider than any screen. The copies are hidden from assistive tech.
  const loop = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]
  const sectionRef = useRef(null)
  const wrapRef = useRef(null)

  // The track runs edge to edge like the logo rows, but each card is sized from the content width (3, 2 or 1 per view).
  useEffect(() => {
    const view = sectionRef.current?.querySelector('.carousel')
    const wrap = wrapRef.current
    if (!view || !wrap) return
    const set = () => view.style.setProperty('--cw', `${wrap.clientWidth}px`)
    set()
    const ro = new ResizeObserver(set)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [])

  return (
    <section className="section reviews" id="reviews" ref={sectionRef}>
      <div className="wrap" ref={wrapRef}>
        <SectionHead
          eyebrow="Reviews"
          title={
            <>
              What our <span className="grad">clients</span> say
            </>
          }
          sub="Hear from the teams and organizations we&rsquo;ve built, launched and supported technology with."
        />
      </div>
      <Reveal className="carousel" aria-label="Client reviews">
        <div className="review-track" style={{ '--dur': `${TESTIMONIALS.length * 2 * 16}s` }}>
          {loop.map((t, i) => (
            <figure key={i} className="glass quote" aria-hidden={i >= TESTIMONIALS.length}>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <b>{t.name}</b>
                {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
