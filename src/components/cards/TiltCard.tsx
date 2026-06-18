import { cn } from "@/lib/utils"
import type React from "react"
import { useRef } from "react"

type TiltCardProps = {
  className?: string
  children: React.ReactNode
}

export default function TiltCard({ className, children }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  const onMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const el = ref.current
    if (!el) return

    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height

    const rx = (0.5 - py) * 14
    const ry = (px - 0.5) * 18

    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`)
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`)
    el.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`)
    el.style.setProperty("--my", `${(py * 100).toFixed(2)}%`)
  }

  const onLeave: React.PointerEventHandler<HTMLDivElement> = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--rx", "0deg")
    el.style.setProperty("--ry", "0deg")
    el.style.setProperty("--mx", "50%")
    el.style.setProperty("--my", "30%")
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={
        {
          "--rx": "0deg",
          "--ry": "0deg",
          "--mx": "50%",
          "--my": "30%",
        } as React.CSSProperties
      }
      className={cn(
        "group relative will-change-transform [transform-style:preserve-3d]",
        className,
      )}
    >
      <div className="relative h-full border-2 border-white/20 bg-black p-6 transition-transform duration-150 [transform:perspective(900px)_rotateX(var(--rx))_rotateY(var(--ry))]">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          style={{
            backgroundImage:
              "radial-gradient(520px 260px at var(--mx) var(--my), color-mix(in srgb, var(--accent) 26%, transparent), transparent 68%), linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0))",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          style={{
            boxShadow:
              "0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent), 14px 14px 0 rgba(255,255,255,0.08), 0 0 90px 0 color-mix(in srgb, var(--glow) 70%, transparent)",
          }}
        />
        <div className="relative [transform:translateZ(24px)]">{children}</div>
      </div>
    </div>
  )
}

