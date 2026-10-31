import { useId, useRef, useState } from 'react'
import Reveal from '../common/Reveal.jsx'
import SectionHead from '../common/SectionHead.jsx'
import { EGOV } from '../../data.js'
import { useOffscreenPause } from '../../hooks.js'

// A few nodes joined by lines, in the corner: the "network" behind the section. Decorative only.
const NODES = [
  [30, 40], [110, 18], [190, 62], [270, 30], [340, 88], [230, 130], [120, 110], [60, 150], [310, 160],
]
const LINKS = [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [6, 0], [6, 7], [5, 8], [4, 8]]

function Network() {
  return (
    <svg className="egov-net" viewBox="0 0 380 190" aria-hidden="true">
      {LINKS.map(([a, b], i) => (
        <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
      ))}
      {NODES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3.2 : 2.2} style={{ '--delay': `${(i * 0.8) % 4}s` }} />
      ))}
    </svg>
  )
}

// Standalone section under "What We Offer": one headline, three tabs (core operations, citizen portals, infrastructure) and a list per tab.
// Each item is laid out like the About Us cards: a title in the heading font, the description under it.
// `children` goes at the end of the section (the closing call to action on the Services page).
export default function EGov({ children }) {
  const [tab, setTab] = useState(0)
  const ref = useRef(null)
  const uid = useId()
  useOffscreenPause(ref)
  const group = EGOV.groups[tab]

  // Left and right arrows move between the tabs, like any tab list
  const onKey = (e) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (tab + step + EGOV.groups.length) % EGOV.groups.length
    setTab(next)
    document.getElementById(`${uid}-tab-${next}`)?.focus()
  }

  return (
    <section className="section egov" id="egov" ref={ref}>
      <Network />
      <div className="wrap">
        <SectionHead
          eyebrow="E-Government Services"
          title={
            <>
              Digital services for <span className="grad">local government</span>
            </>
          }
          sub={
            <>
              We build the digital systems that help local governments serve the Filipino people, from permits to citizen portals, so every community is served faster and with trust.{' '}
              <strong className="offer-tip">Click a tab</strong> to see each service.
            </>
          }
        />

        <Reveal className="egov-tabs" role="tablist" aria-label="E-government services" onKeyDown={onKey}>
          {EGOV.groups.map((g, i) => (
            <button
              key={g.id}
              id={`${uid}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={tab === i}
              aria-controls={`${uid}-panel`}
              tabIndex={tab === i ? 0 : -1}
              className={tab === i ? 'on' : undefined}
              onClick={() => setTab(i)}
            >
              {g.label}
              <span className="egov-count">{g.items.length}</span>
            </button>
          ))}
        </Reveal>

        {/* key: a new panel mounts on every tab change, so its items fade in */}
        <div className="egov-panel" id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${tab}`} key={group.id}>
          <ul className="egov-grid">
            {group.items.map((it, i) => (
              <li key={it.name} style={{ '--i': i }}>
                <h3>{it.name}</h3>
                <p>{it.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {children}
    </section>
  )
}
