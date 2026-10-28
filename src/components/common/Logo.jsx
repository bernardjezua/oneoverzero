export function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="mark-cyan" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b7f4ee" />
          <stop offset="1" stopColor="#3fb5ae" />
        </linearGradient>
        <linearGradient id="mark-white" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9c4ee" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <path d="M50 50V2Q50 50 98 50Z" fill="url(#mark-cyan)" />
      <path d="M50 50H2Q50 50 50 98Z" fill="url(#mark-white)" />
    </svg>
  )
}

export default function Logo({ href = '#top' }) {
  return (
    <a className="logo" href={href} aria-label="One Over Zero, home">
      <LogoMark />
      <span className="logo-text">
        <strong>ONE OVER ZERO</strong>
        <small aria-label="INNOVATIONS">
          {'INNOVATIONS'.split('').map((ch, i) => (
            <span key={i} aria-hidden="true">
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </small>
      </span>
    </a>
  )
}
