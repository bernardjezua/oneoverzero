import { useId, useState } from 'react'
import Reveal from '../common/Reveal.jsx'
import { FAQS } from '../../data.js'

function FaqItem({ q, a, delay, open, onToggle, Heading }) {
  const id = useId()
  return (
    // The open state lives on the inner element: Reveal adds its own class to the outer one, and React would wipe it if that class changed.
    <Reveal delay={delay}>
      <div className={`glass faq-item ${open ? 'open' : ''}`}>
        <Heading className="faq-q">
          <button type="button" id={`${id}-q`} aria-expanded={open} aria-controls={`${id}-a`} onClick={onToggle}>
            <span>{q}</span>
            <i className="faq-icon" aria-hidden="true" />
          </button>
        </Heading>
        <div className="faq-panel" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`}>
          <div className="faq-panel-inner">
            <p>{a}</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// The question accordion, shared by the /faq page (questions are h2s under the page's h1) and the landing page (h3s under the section's h2).
export default function FaqList({ headingLevel = 'h2' }) {
  // Accordion: only one answer is open at a time, and opening another closes the current one
  const [openQ, setOpenQ] = useState(null)

  // Two fixed columns, so opening an answer only moves the items beneath it in its own column
  const half = Math.ceil(FAQS.length / 2)
  const columns = [FAQS.slice(0, half), FAQS.slice(half)]

  return (
    <div className="faq-list">
      {columns.map((items, c) => (
        <div className="faq-col" key={c}>
          {items.map((f, i) => (
            <FaqItem
              key={f.q}
              q={f.q}
              a={f.a}
              delay={i * 60}
              open={openQ === f.q}
              onToggle={() => setOpenQ(openQ === f.q ? null : f.q)}
              Heading={headingLevel}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
