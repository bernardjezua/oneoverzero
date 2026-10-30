import IndustryRows from './IndustryRows.jsx'
import Reveal from '../common/Reveal.jsx'
import SectionHead from '../common/SectionHead.jsx'
import Stat from './Stat.jsx'
import { STATS } from '../../data.js'

export default function TrackRecord() {
  return (
    <section className="section clients" id="clients">
      <div className="wrap">
        <SectionHead eyebrow="Why Choose 1/0" title={
            <>
              Trusted by <span className="grad">100+</span> clients across <span className="grad">different industries</span>
            </>
          } />
      </div>
      <IndustryRows />
      <div className="wrap stats">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <Stat {...s} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
