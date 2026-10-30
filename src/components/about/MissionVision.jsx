import Icon from '../common/Icon.jsx'
import Reveal from '../common/Reveal.jsx'

// The company's mission and vision. The wording is exactly as given; a few key phrases are picked out with <b> (cyan, see about-home.css).
// The big faint icon in the corner is decoration only. Used on the landing page About section and on the /about page.
export default function MissionVision() {
  return (
    <div className="wrap mv">
      <Reveal as="article" className="glass mv-card mission">
        <span className="mv-mark" aria-hidden="true">
          <Icon name="target" size={260} />
        </span>
        <header className="mv-head">
          <span className="ico">
            <Icon name="target" size={24} />
          </span>
        </header>
        <h3>Mission</h3>
        <p>
          To <b>design, build, and secure</b> technology solutions that turn our clients&rsquo; most ambitious ideas into{' '}
          <b>reliable, compliant, and lasting outcomes</b>, guided by engineering excellence, integrity, and an unwavering
          commitment to public and enterprise trust.
        </p>
      </Reveal>

      <Reveal as="article" delay={140} className="glass mv-card vision">
        <span className="mv-mark" aria-hidden="true">
          <Icon name="rocket" size={260} />
        </span>
        <header className="mv-head">
          <span className="ico">
            <Icon name="rocket" size={24} />
          </span>
        </header>
        <h3>Vision</h3>
        <p>
          To be a <b>globally trusted technology partner</b> for government and enterprise transformation, recognized for turning
          complexity into <b>secure, citizen-centered, and future-ready systems</b>.
        </p>
      </Reveal>
    </div>
  )
}
