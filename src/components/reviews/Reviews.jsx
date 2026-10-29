import { useEffect, useState } from 'react'
import Icon from '../common/Icon.jsx'
import Reveal from '../common/Reveal.jsx'
import SectionHead from '../common/SectionHead.jsx'
import { TESTIMONIALS } from '../../data.js'

// "Maria Santos" -> "MS"
const initials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

// A swipe has to travel at least this far (px) to count, so a tap or a small drag doesn't change the slide
const SWIPE = 50

// How many reviews fit side by side: three on desktop, two on tablets, one on phones (the card widths are in testimonials.css)
const TABLET = '(max-width: 1000px)'
const PHONE = '(max-width: 720px)'
const perView = () => (window.matchMedia(PHONE).matches ? 1 : window.matchMedia(TABLET).matches ? 2 : 3)

export default function Reviews() {
  const [per, setPer] = useState(perView)
  const [page, setPage] = useState(0)
  const [touchX, setTouchX] = useState(null)
  const count = TESTIMONIALS.length
  const last = Math.max(0, count - per) // the furthest the row can slide, in cards
  const pages = Math.ceil(count / per) // a page is what is on screen at once: 3 reviews on desktop, 2 on tablets, 1 on phones

  useEffect(() => {
    const update = () => setPer(perView())
    const queries = [window.matchMedia(TABLET), window.matchMedia(PHONE)]
    queries.forEach((q) => q.addEventListener('change', update))
    return () => queries.forEach((q) => q.removeEventListener('change', update))
  }, [])

  const pg = Math.min(page, pages - 1) // after a resize the row may be further along than it can go
  const at = Math.min(pg * per, last) // the first review on screen (the last page slides back so it is always full)
  // Each arrow moves a whole page. The row stops at either end: the arrows are disabled there instead of looping around
  const go = (step) => setPage(Math.min(pages - 1, Math.max(0, pg + step)))

  const onTouchEnd = (e) => {
    if (touchX === null) return
    const dx = e.changedTouches[0].clientX - touchX
    if (Math.abs(dx) >= SWIPE) go(dx < 0 ? 1 : -1)
    setTouchX(null)
  }

  return (
    <section className="section reviews" id="reviews">
      <div className="wrap">
        <SectionHead
          eyebrow="Reviews"
          title={
            <>
              What our <span className="grad">clients</span> say
            </>
          }
          sub="Hear from the teams and organizations we&rsquo;ve built, launched and supported technology with."
        />
        <Reveal className="review-slider" role="group" aria-roledescription="carousel" aria-label="Client reviews">
          <div className="review-viewport" onTouchStart={(e) => setTouchX(e.touches[0].clientX)} onTouchEnd={onTouchEnd}>
            <div className="review-track" style={{ '--i': at }}>
              {TESTIMONIALS.map((t, i) => (
                // Cards that are off screen are inert, so keyboard and screen readers only reach the ones you can see
                <figure
                  key={i}
                  className="glass review-card"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  inert={i < at || i >= at + per}
                >
                  <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption>
                    <span className="review-avatar" aria-hidden="true">
                      {initials(t.name)}
                    </span>
                    <span className="review-who">
                      <b>{t.name}</b>
                      <span>
                        {t.role}, {t.company}
                      </span>
                    </span>
                    {t.caseStudy && (
                      <a className="link review-case" href={t.caseStudy}>
                        Read the case study <Icon name="arrow" size={14} />
                      </a>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="review-nav">
            <button type="button" className="review-arrow review-prev" onClick={() => go(-1)} disabled={pg === 0} aria-label="Previous reviews">
              <Icon name="left" size={18} />
            </button>
            <div className="review-dots">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`review-dot ${i === pg ? 'on' : ''}`}
                  onClick={() => setPage(i)}
                  aria-label={`Go to page ${i + 1} of ${pages}`}
                  aria-current={i === pg}
                />
              ))}
            </div>
            <button type="button" className="review-arrow review-next" onClick={() => go(1)} disabled={pg === pages - 1} aria-label="Next reviews">
              <Icon name="right" size={18} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
