import { useEffect } from 'react'

// Anything the visitor can click (the same things that get the brighter arrowhead in styles/base/cursor.css)
const CLICKABLE =
  'a[href], button, [role="button"], summary, label, select, input[type="checkbox"], input[type="radio"], input[type="submit"], .btn, .constellation-node'

// A cyan ring that follows the mouse and pops in around the cursor tip over links and buttons. A cursor image can't animate,
// so the ring is a page element moved with the pointer. Mouse only, and it never blocks a click.
export default function HoverRing() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const ring = document.createElement('span')
    ring.className = 'hover-ring'
    ring.setAttribute('aria-hidden', 'true')
    document.body.appendChild(ring)

    const move = (e) => {
      if (e.pointerType !== 'mouse') return
      ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      const el = e.target instanceof Element ? e.target.closest(CLICKABLE) : null
      ring.classList.toggle('is-on', !!el && !el.disabled)
    }
    const hide = (e) => {
      if (!e.relatedTarget) ring.classList.remove('is-on')
    }
    document.addEventListener('pointermove', move)
    document.addEventListener('pointerout', hide)
    return () => {
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerout', hide)
      ring.remove()
    }
  }, [])

  return null
}
