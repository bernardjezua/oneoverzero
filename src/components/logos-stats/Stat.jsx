import { useCountUp } from '../../hooks.js'

export default function Stat({ value, suffix, label, decimals = 0 }) {
  const [ref, shown] = useCountUp(value, decimals)
  return (
    <div className="glass stat" ref={ref}>
      <div className="stat-num">
        {shown}
        <span className={suffix.startsWith('/') ? 'tight' : undefined}>{suffix}</span>
      </div>
      <p>{label}</p>
    </div>
  )
}
