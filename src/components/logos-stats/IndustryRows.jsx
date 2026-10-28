import Icon from '../common/Icon.jsx'
import Reveal from '../common/Reveal.jsx'

// The kinds of organizations we work with. Stands in for the client logos and scrolls the same way, in two rows going opposite ways.
// Each row needs enough different chips to be wider than the widest screen, or the same chip shows twice at once (about 12 per row).
const INDUSTRIES = [
  { label: 'Government', icon: 'plan' },
  { label: 'Healthcare', icon: 'shield' },
  { label: 'Sports', icon: 'game' },
  { label: 'Insurance', icon: 'lock' },
  { label: 'Publishing', icon: 'layout' },
  { label: 'Real Estate', icon: 'cube' },
  { label: 'Energy & Utilities', icon: 'bolt' },
  { label: 'Banking & Finance', icon: 'chart' },
  { label: 'Consumer Goods', icon: 'cart' },
  { label: 'Telecommunications', icon: 'radar' },
  { label: 'Education', icon: 'target' },
  { label: 'Recruitment', icon: 'face' },
  { label: 'Events', icon: 'rocket' },
  { label: 'Technology', icon: 'code' },
  { label: 'Pharmaceuticals', icon: 'bug' },
  { label: 'Retail & E-commerce', icon: 'cart' },
  { label: 'Fintech & Payments', icon: 'plug' },
  { label: 'Nonprofit & Community', icon: 'link' },
  { label: 'Media & Entertainment', icon: 'play' },
  { label: 'Logistics', icon: 'container' },
  { label: 'Manufacturing', icon: 'wrench' },
  { label: 'Hospitality & Travel', icon: 'pin' },
  { label: 'Cloud & IT Services', icon: 'cloud' },
  { label: 'Security', icon: 'server' },
]

function Row({ items, reverse }) {
  // Four copies so the track is wider than any screen and the -50% loop is seamless; the copies are hidden from assistive tech
  return (
    <div className="marquee">
      <div className={`marquee-track ${reverse ? 'rev' : ''}`}>
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} aria-hidden={i >= items.length} className="logo-slot">
            <span className="industry-chip">
              <Icon name={item.icon} size={18} />
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function IndustryRows() {
  const half = Math.ceil(INDUSTRIES.length / 2)
  return (
    <div className="logo-rows" aria-label="Industries we work with">
      <Reveal>
        <Row items={INDUSTRIES.slice(0, half)} />
      </Reveal>
      <Reveal delay={150}>
        <Row items={INDUSTRIES.slice(half)} reverse />
      </Reveal>
    </div>
  )
}
