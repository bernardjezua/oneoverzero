import Icon from '../common/Icon.jsx'
import Reveal from '../common/Reveal.jsx'

const PILLARS = [
  {
    icon: 'code',
    title: 'Open-source first',
    text: 'Our work is built around relevant technologies and enterprise solutions, so you keep flexibility, control and room to grow.',
  },
  {
    icon: 'cube',
    title: 'One team, end to end',
    text: 'From websites and apps to infrastructure and security, the team that designs your solution is the one that builds and maintains it.',
  },
  {
    icon: 'headset',
    title: 'Support that stays',
    text: 'We stay on after launch to fix issues, keep systems running around the clock and add improvements as your needs change.',
  },
]

// The three "what we stand for" cards. Used on the landing page About section and on the /about page.
export default function Pillars() {
  return (
    <div className="wrap about-pillars">
      {PILLARS.map((p, i) => (
        <Reveal key={p.title} delay={i * 120} className="glass about-pillar lift">
          <span className="ico">
            <Icon name={p.icon} size={22} />
          </span>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
        </Reveal>
      ))}
    </div>
  )
}
