import { useEffect, useRef, useState } from 'react'
import { ROUTES, applyPageMeta, currentRoute, routeOf } from './routes.js'

export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in', 'revealed')
      el.style.removeProperty('--d')
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
          const delayStr = el.style.getPropertyValue('--d') || '0ms'
          const delayMs = parseFloat(delayStr) || 0
          setTimeout(() => {
            if (el) {
              el.classList.add('revealed')
              el.style.removeProperty('--d')
            }
          }, delayMs + 700)
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

export function useCountUp(target, decimals = 0) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const p = Math.min((t - t0) / 1400, 1)
        setVal(target * (1 - Math.pow(1 - p, 3)))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target])
  return [ref, val.toFixed(decimals)]
}

const CONSENT_KEY = 'ooz-cookie-consent'

export function readConsent() {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY))
  } catch {
    return null
  }
}

export function saveConsent(c) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c))
  } catch {
    /* storage unavailable */
  }
}

export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    on()
    window.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    return () => {
      window.removeEventListener("scroll", on)
      window.removeEventListener("resize", on)
    }
  }, [])
  return p
}

// Moves between the site's own pages without reloading them. Every page is still its own HTML file (for search engines and link previews),
// but clicking a link inside the site swaps the page in place, so the cursor, the cookie banner and the scroll bar are not reset by a reload.
// Links that open elsewhere (new tab, other sites, downloads, unknown addresses, keys held down) are left to the browser.
export function useRoute() {
  const [route, setRoute] = useState(() => currentRoute())

  useEffect(() => {
    const onPop = () => setRoute(currentRoute())

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target instanceof Element ? e.target.closest('a[href]') : null
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin) return
      const next = routeOf(url.pathname)
      if (!ROUTES.includes(next)) return
      const samePage = next === currentRoute()
      if (samePage && url.hash) return // a jump to a spot on this page: the browser already does that
      e.preventDefault()
      if (!samePage) {
        window.history.pushState(null, '', url.pathname + url.search + url.hash)
        setRoute(next)
        applyPageMeta(next)
      }
      window.requestAnimationFrame(() => {
        const target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null
        if (target) target.scrollIntoView()
        else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      })
    }

    window.addEventListener('popstate', onPop)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', onPop)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return route
}
