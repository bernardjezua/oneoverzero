import Reveal from './Reveal.jsx'

// `children` (optional) goes under the description, e.g. a button
export default function SectionHead({ eyebrow, title, sub, children }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
      {children}
    </Reveal>
  )
}
