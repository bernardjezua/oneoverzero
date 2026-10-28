import PageHero from '../common/PageHero.jsx'
import Reveal from '../common/Reveal.jsx'
import { EMAIL, UPDATED } from '../../legalInfo.js'

export const Mail = () => <a href={`mailto:${EMAIL}`}>{EMAIL}</a>

// A numbered section of a legal page: the heading, then plain paragraphs and lists
export function Section({ n, title, children }) {
  return (
    <Reveal as="section" className="legal-section">
      <h2>
        {n}. {title}
      </h2>
      {children}
    </Reveal>
  )
}

export function LegalShell({ eyebrow, title, intro, children }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title}>
        {intro}
      </PageHero>
      <section className="section legal-page">
        <div className="wrap legal">
          <Reveal as="p" className="legal-updated">
            Last updated: {UPDATED}
          </Reveal>
          {children}
        </div>
      </section>
    </>
  )
}
