import { useEffect } from 'react'

// A cyan ring pops out where the mouse is pressed and fades away (a cursor image can't animate, so this is drawn on the page).
// Mouse only: touch screens already show their own tap feedback. Purely visual, so it never blocks a click.
export default function ClickRipple() {
  useEffect(() => {
    const pop = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      const ring = document.createElement('span')
      ring.className = 'click-ripple'
      ring.setAttribute('aria-hidden', 'true')
      ring.style.left = `${e.clientX}px`
      ring.style.top = `${e.clientY}px`
      ring.addEventListener('animationend', () => ring.remove(), { once: true })
      document.body.appendChild(ring)
    }
    document.addEventListener('pointerdown', pop)
    return () => document.removeEventListener('pointerdown', pop)
  }, [])

  return null
}
