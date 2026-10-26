export function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M52 48V2Q52 48 98 48Z" fill="var(--accent)" />
      <path d="M48 52H2Q48 52 48 98Z" fill="var(--mark-dark)" />
    </svg>
  )
}

export default function Logo() {
  return (
    <a className="logo" href="#top" aria-label="One Over Zero, home">
      <LogoMark />
      <span className="logo-text">
        <strong>ONE OVER ZERO</strong>
        <small aria-label="INNOVATIONS">
          {'INNOVATIONS'.split('').map((ch, i) => (
            <span key={i} aria-hidden="true">
              {ch}
            </span>
          ))}
        </small>
      </span>
    </a>
  )
}
