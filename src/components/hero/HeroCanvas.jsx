import { useEffect, useRef } from 'react'

// Ambient node network. Nodes drift, link when close, and are nudged by the pointer.
export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const still = false
    const mouse = { x: -999, y: -999 }
    let w = 0
    let h = 0
    let nodes = []
    let raf = 0
    let visible = true

    // Read once (and again on resize), not every frame: asking the browser for a computed style forces it to recalculate styles
    let c = '102,204,198'
    const readColor = () => {
      c = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || c
    }
    // Lines are drawn in a few opacity steps, one stroke per step, instead of one stroke per line
    const STEPS = 4
    let LINK = 130

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      readColor()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const pw = w
      const ph = h
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Keep the existing constellation on resize: rescale it to the new box
      // and only add nodes if the area grew, so it never reshuffles.
      if (pw && ph) {
        for (const n of nodes) {
          n.x *= w / pw
          n.y *= h / ph
        }
      }
      // Phones: fewer dots and shorter links, so the network stays sparse
      LINK = w < 700 ? 90 : 130
      const count = Math.round(Math.min(Math.max((w * h) / 9000, 28), w < 700 ? 20 : 90))
      if (nodes.length > count) nodes.length = count
      while (nodes.length < count) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const n of nodes) {
        if (!still) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 14400) {
            const f = (1 - d2 / 14400) * 0.6
            n.x += (dx / Math.sqrt(d2 + 1)) * f * 3
            n.y += (dy / Math.sqrt(d2 + 1)) * f * 3
          }
        }
      }
      const paths = Array.from({ length: STEPS }, () => new Path2D())
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK * LINK) {
            const p = paths[Math.min(STEPS - 1, Math.floor((1 - Math.sqrt(d2) / LINK) * STEPS))]
            p.moveTo(a.x, a.y)
            p.lineTo(b.x, b.y)
          }
        }
      }
      ctx.lineWidth = 1
      for (let k = 0; k < STEPS; k++) {
        ctx.strokeStyle = `rgba(${c},${(((k + 0.5) / STEPS) * (w < 700 ? 0.25 : 0.35)).toFixed(3)})`
        ctx.stroke(paths[k])
      }
      const dots = new Path2D()
      for (const n of nodes) {
        dots.moveTo(n.x + 1.8, n.y)
        dots.arc(n.x, n.y, 1.8, 0, Math.PI * 2)
      }
      ctx.fillStyle = `rgba(${c},0.8)`
      ctx.fill(dots)
    }

    const loop = () => {
      if (visible) draw()
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = mouse.y = -999
    }

    resize()
    if (still) draw()
    else raf = requestAnimationFrame(loop)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(canvas)
    const ro = new ResizeObserver(() => {
      resize()
      if (still) draw()
    })
    ro.observe(canvas)
    window.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}
