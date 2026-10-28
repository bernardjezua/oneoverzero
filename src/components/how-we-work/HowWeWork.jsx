import Icon from '../common/Icon.jsx'
import Reveal from '../common/Reveal.jsx'
import SectionHead from '../common/SectionHead.jsx'
import SpaceBackdrop from './SpaceBackdrop.jsx'
import { PROCESS_STEPS } from '../../data.js'

export default function HowWeWork({ children }) {
  return (
    <section className="section process" id="process">
      <SpaceBackdrop />
      <div className="wrap">
        <SectionHead
          eyebrow="How We Work"
          title={
            <>
              From first idea to <span className="grad">launch and beyond</span>
            </>
          }
          sub="Here is what happens after you get in touch, in five simple steps."
        />
        <ol className="process-steps">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="glass step lift">
              <div className="step-top">
                <span className="ico">
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="step-line" aria-hidden="true" />
                <span className="step-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
      {children}
    </section>
  )
}
