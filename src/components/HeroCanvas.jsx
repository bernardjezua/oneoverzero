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

    const color = () => getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '102,204,198'

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
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
      const count = Math.round(Math.min(Math.max((w * h) / 9000, 28), 90))
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
      const c = color()
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
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) {
            ctx.strokeStyle = `rgba(${c},${(1 - d / 130) * 0.35})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = `rgba(${c},0.8)`
        ctx.beginPath()
        ctx.arc(a.x, a.y, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
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
