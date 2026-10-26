import { useState } from 'react'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import { PROJECTS } from '../data.js'

function Project({ name, type, src, desc, tags }) {
  return (
    <Reveal className={`glass project lift ${type}`}>
      <div className="project-frame">
        {src ? (
          <img src={src} alt={`${name} screenshot`} loading="lazy" />
        ) : (
          <div className="shot-ph" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        )}
      </div>
      <div className="project-body">
        <h3>{name}</h3>
        <p>{desc}</p>
        <ul className="chips">
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

const PROJECTS_SHOWN = 6

export default function Work() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? PROJECTS : PROJECTS.slice(0, PROJECTS_SHOWN)
  return (
    <section className="section work" id="work">
      <div className="wrap">
        <SectionHead
          eyebrow="Our Products"
          title="Products we&rsquo;ve built"
          sub="A sneak peek at some of the apps, games and platforms from our portfolio."
        />
        <div className="project-grid">
          {visible.map((p) => (
            <Project key={p.name} {...p} />
          ))}
        </div>
        {PROJECTS.length > PROJECTS_SHOWN && (
          <div className="show-more">
            <button className="btn btn-primary btn-more" onClick={() => setExpanded((e) => !e)} aria-expanded={expanded}>
              {expanded ? 'Show less' : 'Show more'}
              <span className="chev" aria-hidden="true">
                <Icon name="right" size={15} />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
