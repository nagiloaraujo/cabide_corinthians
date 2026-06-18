import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

type BootLoaderProps = {
  brand: string
  durationMs?: number
  onDone?: () => void
}

export default function BootLoader({ brand, durationMs = 2200, onDone }: BootLoaderProps) {
  const [open, setOpen] = useState(true)
  const reduce = useReducedMotion()

  useEffect(() => {
    const id = window.setTimeout(() => {
      setOpen(false)
      onDone?.()
    }, durationMs)
    return () => window.clearTimeout(id)
  }, [durationMs, onDone])

  if (!open) return null

  return (
    <motion.div
      key="boot"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 grid place-items-center bg-black"
      onClick={() => {
        setOpen(false)
        onDone?.()
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative flex flex-col items-center gap-4"
      >
        <div className="relative grid size-28 place-items-center rounded-full border border-white/10 bg-white/[0.04] neon-soft">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          {reduce ? null : (
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: "0 0 55px 0 color-mix(in srgb, var(--glow) 80%, transparent)",
              }}
              animate={{ opacity: [0.35, 0.8, 0.35] }}
              transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <motion.div
            className="relative z-10"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: "linear" }}
          >
            <img
              src="/brasao.png"
              alt="Brasao do Corinthians"
              className="h-16 w-16 object-contain sm:h-20 sm:w-20"
              draggable={false}
            />
          </motion.div>
        </div>
        <div className="text-center">
          <div className="font-[Oswald] text-2xl tracking-wide text-gradient">{brand}</div>
          <div className="mt-1 text-xs tracking-[0.35em] text-white/50">CARREGANDO EDIÇÃO 1</div>
        </div>
        <div className="h-1 w-64 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full w-full origin-left bg-[color:var(--accent)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: durationMs / 1000, ease: [0.2, 0.8, 0.2, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
