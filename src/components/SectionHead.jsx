import Reveal from './Reveal.jsx'

export default function SectionHead({ eyebrow, title, sub }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </Reveal>
  )
}
