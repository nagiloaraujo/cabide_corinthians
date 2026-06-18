import { useEffect, useMemo, useRef } from "react"

type ParticleFieldProps = {
  accent: string
}

type Particle = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  a: number
}

export default function ParticleField({ accent }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const particles = useMemo<Particle[]>(() => {
    const list: Particle[] = []
    for (let i = 0; i < 70; i += 1) {
      list.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.8 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        a: 0.06 + Math.random() * 0.12,
      })
    }
    return list
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rgb = toRgb(accent) ?? { r: 255, g: 255, b: 255 }

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    const onMove = (e: PointerEvent) => {
      if (reduceMotion) return
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mouseRef.current = { x, y }
    }

    window.addEventListener("pointermove", onMove, { passive: true })

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx.globalCompositeOperation = "lighter"
      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx
          p.y += p.vy
        }
        if (p.x < -0.1) p.x = 1.1
        if (p.x > 1.1) p.x = -0.1
        if (p.y < -0.1) p.y = 1.1
        if (p.y > 1.1) p.y = -0.1

        const px = p.x * w + (reduceMotion ? 0 : mx * 18)
        const py = p.y * h + (reduceMotion ? 0 : my * 14)

        const g = ctx.createRadialGradient(px, py, 0, px, py, p.r * 10)
        g.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${p.a})`)
        g.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(px, py, p.r * 10, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = "source-over"
      if (!reduceMotion) {
        rafRef.current = window.requestAnimationFrame(draw)
      }
    }

    rafRef.current = window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [accent, particles])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-20 opacity-70"
    />
  )
}

function toRgb(input: string) {
  const hex = input.trim()
  const m = /^#?([0-9a-fA-F]{6})$/.exec(hex)
  if (!m) return null
  const n = parseInt(m[1], 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

