import type { ThemeModel } from "@/app/theme"
import { useThemeModel } from "@/app/useThemeModel"
import Button from "@/components/ui/Button"
import { AnimatePresence, motion } from "framer-motion"
import { useMemo, useState } from "react"

type ProductShowcaseProps = {
  images?: Partial<Record<ThemeModel, string>>
  backgroundImage?: string
}

export default function ProductShowcase({
  images,
  backgroundImage,
}: ProductShowcaseProps) {
  const model = useThemeModel((s) => s.model)
  const setModel = useThemeModel((s) => s.setModel)
  const [direction, setDirection] = useState<1 | -1>(1)

  const variants = useMemo(() => {
    return [
      {
        model: "default" as const,
        label: "Branco",
        imageSrc: images?.default ?? "/cabide-branco.png",
      },
      {
        model: "preto" as const,
        label: "Preto",
        imageSrc: images?.preto ?? "/cabide-preto.png",
      },
      {
        model: "roxo" as const,
        label: "Lilás",
        imageSrc: images?.roxo ?? "/cabide-roxo.png",
      },
      {
        model: "ouro" as const,
        label: "Dourado",
        imageSrc: images?.ouro ?? "/cabide-dourado.png",
      },
      {
        model: "prata" as const,
        label: "Cromado",
        imageSrc: images?.prata ?? "/cabide-prata.png",
      },
    ]
  }, [images])

  const index = useMemo(() => {
    const found = variants.findIndex((v) => v.model === model)
    return found >= 0 ? found : 0
  }, [model, variants])

  const active = variants[index]

  const goTo = (nextIndex: number) => {
    const clamped = Math.max(0, Math.min(variants.length - 1, nextIndex))
    if (clamped === index) return
    setDirection(clamped > index ? 1 : -1)
    setModel(variants[clamped].model)
  }

  const cover = backgroundImage ?? "/background-capa.jpg"

  const slideVariants = useMemo(() => {
    return {
      enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0, scale: 0.96 }),
      center: { x: 0, opacity: 1, scale: 1 },
      exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0, scale: 0.96 }),
    }
  }, [])

  const subtitle = useMemo(() => {
    if (model === "preto") return "preto pesado. armário de respeito."
    if (model === "roxo") return "lilás vibrante. presença marcante."
    if (model === "ouro") return "dourado espelhado. luxo de colecionador."
    if (model === "prata") return "cromado espelhado. alto contraste."
    return "branco original. clássico e brutal."
  }, [model])

  return (
    <div className="relative w-full py-10 sm:py-12">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-black/30 shadow-[20px_30px_80px_rgba(0,0,0,0.75)]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${cover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "contrast(1.05) saturate(0.95)",
              transform: "scale(1.02)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(1200px 700px at 22% 20%, rgba(0,0,0,0.20), rgba(0,0,0,0.82) 62%), radial-gradient(900px 520px at 80% 60%, rgba(0,0,0,0.22), rgba(0,0,0,0.92) 70%)",
            }}
          />

          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="absolute left-3 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 text-white/90 backdrop-blur-md transition hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="absolute right-3 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 text-white/90 backdrop-blur-md transition hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Próximo"
            >→</button>

            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.14}
              onDragEnd={(_, info) => {
                const x = info.offset.x
                const v = info.velocity.x
                if (x < -90 || v < -700) goTo(index + 1)
                if (x > 90 || v > 700) goTo(index - 1)
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault()
                  goTo(index + 1)
                }
                if (e.key === "ArrowLeft") {
                  e.preventDefault()
                  goTo(index - 1)
                }
                if (e.key === "Home") {
                  e.preventDefault()
                  goTo(0)
                }
                if (e.key === "End") {
                  e.preventDefault()
                  goTo(variants.length - 1)
                }
              }}
              className="relative cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{ userSelect: "none", touchAction: "pan-y" }}
            >
              <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative mx-auto w-full max-w-[520px]">
                  <div
                    aria-hidden
                    className="absolute left-6 top-1/2 h-[340px] w-[420px] -translate-y-1/2 overflow-hidden rounded-[34px]"
                    style={{
                      backgroundImage: `linear-gradient(180deg, color-mix(in srgb, var(--accent) 88%, #000), color-mix(in srgb, var(--accent2) 82%, #000))`,
                      opacity: model === "default" ? 0.42 : 0.65,
                    }}
                  >
                    <div aria-hidden className="absolute inset-0">
                      <div
                        className="pointer-events-none select-none whitespace-nowrap font-[Oswald] text-[148px] font-black uppercase leading-none text-white/10"
                        style={{
                          position: "absolute",
                          left: "-18%",
                          top: "54%",
                          transform: "translateY(-50%) rotate(-12deg)",
                          letterSpacing: "-0.02em",
                          filter: "blur(0.15px)",
                          mixBlendMode: "overlay",
                        }}
                      >
                        CORINTHIANS
                      </div>
                    </div>
                  </div>
                  <div
                    aria-hidden
                    className="absolute left-10 top-1/2 h-[340px] w-[420px] -translate-y-1/2 rounded-[34px]"
                    style={{
                      border: "1px solid rgba(255,255,255,0.12)",
                      opacity: 0.35,
                    }}
                  />

                  <div className="relative h-[420px]">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                      <motion.img
                        key={active.model}
                        src={active.imageSrc}
                        alt={`Cabide Corinthians - ${active.label}`}
                        className="absolute inset-0 h-full w-full object-contain"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.34, ease: [0.2, 0.8, 0.2, 1] }}
                        style={{
                          filter:
                            "drop-shadow(0 28px 70px rgba(0,0,0,0.70)) drop-shadow(0 0 26px color-mix(in srgb, var(--glow) 35%, transparent))",
                        }}
                        onError={(e) => {
                          ;(e.currentTarget as HTMLImageElement).src = "/cabide-branco.png"
                        }}
                      />
                    </AnimatePresence>

                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-[26px] border border-white/10 bg-black/55 p-7 backdrop-blur-md sm:p-9">
                    <div className="text-[11px] font-black uppercase tracking-[0.28em] text-white/70">
                      arrasta pro lado pra trocar
                    </div>
                    <div className="mt-4 font-[Oswald] text-4xl font-black uppercase leading-[0.92] tracking-tight text-white">
                      CABIDE <span className="text-gradient brutal-outline">{active.label}</span>
                    </div>
                    <div className="mt-3 text-sm font-semibold uppercase tracking-[0.10em] text-white/65">{subtitle}</div>

                    <div className="mt-7 grid gap-3 text-[12px] font-black uppercase tracking-[0.18em] text-white/70 sm:grid-cols-2">
                      <div className="border border-white/10 bg-black/35 px-4 py-3">gancho reforçado</div>
                      <div className="border border-white/10 bg-black/35 px-4 py-3">antideformação</div>
                      <div className="border border-white/10 bg-black/35 px-4 py-3">vazado patenteado</div>
                      <div className="border border-white/10 bg-black/35 px-4 py-3">padrão fiel</div>
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                        selecionado: <span className="text-white/80">{active.label}</span>
                      </div>
                      <Button
                        href="#waitlist"
                        className="w-full !rounded-none border-2 border-black bg-[color:var(--accent)] px-6 py-3 text-center text-[15px] font-black uppercase tracking-wide text-black sm:w-auto"
                      >
                        RESERVAR ESTA EDIÇÃO
                      </Button>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-1">
                      {variants.map((v) => (
                        <button
                          key={v.model}
                          type="button"
                          onClick={() => goTo(variants.findIndex((x) => x.model === v.model))}
                          aria-pressed={v.model === model}
                          aria-label={v.label}
                          className="inline-flex h-11 w-11 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                          <span
                            className="h-2 w-10 border border-white/20 bg-black/40 transition"
                            style={{
                              boxShadow:
                                v.model === model
                                  ? "inset 0 0 0 1px color-mix(in srgb, var(--accent) 70%, transparent)"
                                  : undefined,
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
