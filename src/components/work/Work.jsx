import { useState } from 'react'
import Icon from '../common/Icon.jsx'
import PageHero from '../common/PageHero.jsx'
import Reveal from '../common/Reveal.jsx'
import SectionHead from '../common/SectionHead.jsx'
import { PROJECTS } from '../../data.js'

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

const EYEBROW = 'Our Products'
const TITLE = (
  <>
    Products we&rsquo;ve <span className="grad">built</span>
  </>
)
const SUB = 'A sneak peek at some of the apps, games and platforms from our portfolio.'

// `page` is true on the standalone /products page: every product is listed (no "Show more"), under the same banner as the About and FAQ pages.
export default function Work({ page = false, children }) {
  const [expanded, setExpanded] = useState(false)
  const visible = page || expanded ? PROJECTS : PROJECTS.slice(0, PROJECTS_SHOWN)
  return (
    <>
      {page && (
        <PageHero eyebrow={EYEBROW} title={TITLE}>
          {SUB}
        </PageHero>
      )}
      <section className="section work" id="work">
        <div className="wrap">
          {!page && <SectionHead eyebrow={EYEBROW} title={TITLE} sub={SUB} />}
          <div className="project-grid">
            {visible.map((p) => (
              <Project key={p.name} {...p} />
            ))}
          </div>
          {!page && PROJECTS.length > PROJECTS_SHOWN && (
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
        {children}
      </section>
    </>
  )
}
