import { useId, useState } from 'react'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import CtaBand from '../components/cta/CtaBand.jsx'
import { FAQS } from '../data.js'

function FaqItem({ q, a, delay, open, onToggle }) {
  const id = useId()
  return (
    // The open state lives on the inner element: Reveal adds its own class to the outer one, and React would wipe it if that class changed.
    <Reveal delay={delay}>
      <div className={`glass faq-item ${open ? 'open' : ''}`}>
        <h2 className="faq-q">
          <button type="button" id={`${id}-q`} aria-expanded={open} aria-controls={`${id}-a`} onClick={onToggle}>
            <span>{q}</span>
            <i className="faq-icon" aria-hidden="true" />
          </button>
        </h2>
        <div className="faq-panel" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`}>
          <div className="faq-panel-inner">
            <p>{a}</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function FaqPage() {
  // Accordion: only one answer is open at a time, and opening another closes the current one
  const [openQ, setOpenQ] = useState(null)

  // Two fixed columns, so opening an answer only moves the items beneath it in its own column
  const half = Math.ceil(FAQS.length / 2)
  const columns = [FAQS.slice(0, half), FAQS.slice(half)]

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Frequently Asked <span className="grad">Questions</span>
          </>
        }
      >
        Quick answers about working with us. Can&rsquo;t find yours? Just ask.
      </PageHero>

      <section className="section faq">
        <div className="wrap">
          <div className="faq-list">
            {columns.map((items, c) => (
              <div className="faq-col" key={c}>
                {items.map((f, i) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} delay={i * 60} open={openQ === f.q} onToggle={() => setOpenQ(openQ === f.q ? null : f.q)} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <CtaBand />
      </section>
    </>
  )
}
