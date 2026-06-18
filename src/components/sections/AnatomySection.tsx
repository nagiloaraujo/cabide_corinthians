import { useThemeModel } from "@/app/useThemeModel"
import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import ConditionalReveal from "@/components/ui/ConditionalReveal"
import { getSceneImage } from "@/lib/imagery"
import { motion, useReducedMotion } from "framer-motion"
import { useMemo, useRef, useState } from "react"

export default function AnatomySection() {
  const model = useThemeModel((s) => s.model)
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [hover, setHover] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const jerseyDetail = getSceneImage("anatomy-detail")
  const supporterMood = getSceneImage("anatomy-supporter")

  const imageSrc = useMemo(() => {
    if (model === "preto") return "/cabide-preto.png"
    if (model === "roxo") return "/cabide-roxo.png"
    if (model === "ouro") return "/cabide-dourado.png"
    if (model === "prata") return "/cabide-prata.png"
    return "/cabide-branco.png"
  }, [model])

  const hotspots = useMemo(() => {
    return [
      {
        key: "gancho",
        title: "Gancho Reforçado",
        desc: "apoio firme para sustentar o manto com segurança.",
        x: 52,
        y: 18,
        align: "right",
      },
      {
        key: "curvatura",
        title: "Curvatura Antideformação",
        desc: "ombro sem marca. gola sem esticar.",
        x: 26,
        y: 55,
        align: "left",
      },
      {
        key: "vazado",
        title: "Design Vazado Patenteado",
        desc: "assinatura Corinthians em destaque.",
        x: 74,
        y: 68,
        align: "right",
      },
    ] as const
  }, [])

  const active = useMemo(() => {
    if (!hover || !wrapRef.current) return null
    const rect = wrapRef.current.getBoundingClientRect()
    const cx = cursor.x
    const cy = cursor.y

    let best: (typeof hotspots)[number] | null = null
    let bestD = Number.POSITIVE_INFINITY
    for (const h of hotspots) {
      const hx = (h.x / 100) * rect.width
      const hy = (h.y / 100) * rect.height
      const dx = hx - cx
      const dy = hy - cy
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < bestD) {
        bestD = d
        best = h
      }
    }
    return bestD < Math.min(180, rect.width * 0.22) ? best : null
  }, [cursor.x, cursor.y, hover, hotspots])

  return (
    <Section>
      <Container>
        <ConditionalReveal>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 border border-white/15 bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
              INTERATIVO • ANATOMIA
            </div>
            <h2 className="mt-5 font-[Oswald] text-4xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-5xl">
              <span className="brutal-outline">ANATOMIA DO CABIDE</span>{" "}
              <span className="brutal-outline text-gradient">PERFEITO.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              Passe o mouse no cabide e veja os pontos de engenharia que respeitam camisa de jogo: não estica a gola,
              não marca o ombro e mantém o caimento do dry-fit.
            </p>
          </div>
        </ConditionalReveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            ref={wrapRef}
            className="relative overflow-hidden border border-white/15 bg-black/70 p-6 shadow-[12px_12px_0_rgba(255,255,255,0.08)]"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
            }}
          >
            <div className="relative mx-auto aspect-[4/5] w-[min(520px,92%)]">
              <img
                src={imageSrc}
                alt="Cabide Corinthians - Anatomia"
                className="absolute inset-0 h-full w-full object-contain"
                style={{
                  filter: "drop-shadow(0 26px 70px rgba(0,0,0,0.75))",
                }}
              />

              {hover && !reduce ? (
                <motion.div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(240px 240px at ${cursor.x}px ${cursor.y}px, rgba(255,255,255,0.36), rgba(255,255,255,0) 70%)`,
                    mixBlendMode: "screen",
                    opacity: 0.9,
                  }}
                  animate={{ opacity: [0.65, 0.95, 0.65] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}

              {hotspots.map((h) => {
                const isActive = active?.key === h.key
                return (
                  <div
                    key={h.key}
                    className="absolute"
                    style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}
                  >
                    <motion.div
                      className="relative"
                      animate={
                        reduce
                          ? undefined
                          : {
                              scale: isActive ? [1, 1.08, 1] : [1, 1.04, 1],
                              opacity: hover ? 1 : 0,
                            }
                      }
                      transition={reduce ? undefined : { duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                      style={{ opacity: hover ? 1 : 0 }}
                    >
                      <div className="grid size-4 place-items-center rounded-full bg-[color:var(--accent)] shadow-[0_0_0_2px_rgba(0,0,0,0.85)]">
                        <div className="size-1.5 rounded-full bg-black" />
                      </div>
                      <div
                        className="absolute left-1/2 top-1/2 -z-10 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                          boxShadow: `0 0 55px 0 color-mix(in srgb, var(--glow) 85%, transparent)`,
                          opacity: isActive ? 1 : 0.65,
                        }}
                      />
                    </motion.div>

                    <div
                      className="pointer-events-none absolute top-1/2 -translate-y-1/2"
                      style={
                        h.align === "left"
                          ? { right: "calc(100% + 14px)", textAlign: "right" }
                          : { left: "calc(100% + 14px)", textAlign: "left" }
                      }
                    >
                      <div className="w-56 border border-white/15 bg-black px-3 py-2">
                        <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white">
                          {h.title}
                        </div>
                        <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                          {h.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 border-t border-white/10 pt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
              X-RAY MODE: passa o mouse e veja a engenharia.
            </div>
          </div>

          <ConditionalReveal delay={0.08} y={22}>
            <div className="border border-white/15 bg-black/70 p-6 shadow-[12px_12px_0_rgba(255,255,255,0.08)]">
              <div className="text-[11px] font-black uppercase tracking-[0.28em] text-white/80">COMPARATIVO</div>
              <div className="mt-4 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                <div className="border border-white/10 bg-black px-3 py-3 sm:px-4 sm:py-4">
                  <div className="text-[13px] font-black uppercase tracking-[0.18em] text-white/80">Cabide comum</div>
                  <ul className="mt-3 space-y-2 font-semibold uppercase tracking-[0.16em] text-white/55">
                    <li>marcação no ombro</li>
                    <li>gola esticada</li>
                    <li>acabamento básico</li>
                    <li>sem identidade</li>
                  </ul>
                </div>
                <div className="border-2 border-[color:var(--accent)] bg-[color:color-mix(in_srgb,var(--accent)_10%,black)] px-4 py-4 shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent)_28%,transparent),0_0_34px_0_color-mix(in_srgb,var(--glow)_35%,transparent)] sm:px-5 sm:py-5">
                  <div className="text-[15px] font-black uppercase tracking-[0.18em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                    Cabide oficial
                  </div>
                  <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/88">
                    Protege o manto sem marcar, sem deformar e com presença visual de coleção.
                  </div>
                  <ul className="mt-4 space-y-3 text-[13px] font-black uppercase tracking-[0.16em] text-white">
                    <li className="border-l-2 border-[color:var(--accent)] pl-3">curvatura anatômica</li>
                    <li className="border-l-2 border-[color:var(--accent)] pl-3">respeita o dry-fit</li>
                    <li className="border-l-2 border-[color:var(--accent)] pl-3">estrutura reforçada</li>
                    <li className="border-l-2 border-[color:var(--accent)] pl-3">vazado Corinthians</li>
                  </ul>
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
                Quem coleciona, protege.
              </div>

              <div className="mt-5 grid gap-3">
                <div className="relative min-h-[150px] overflow-hidden border border-white/10 bg-black">
                  <img
                    src={jerseyDetail}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/38" />
                  <div className="absolute right-3 top-3 text-[24px] font-[Oswald] font-black uppercase leading-none text-white/16">
                    corinthians
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/72 p-3">
                    <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white/82">manto + brasão</div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/62">
                      engenharia pensada pra quem trata camisa como relíquia.
                    </div>
                  </div>
                </div>
                <div className="relative min-h-[132px] overflow-hidden border border-white/10 bg-black">
                  <img
                    src={supporterMood}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/42" />
                  <div className="absolute left-3 top-3 border border-white/15 bg-black/75 px-3 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/75">
                    fiel
                  </div>
                </div>
              </div>
            </div>
          </ConditionalReveal>
        </div>
      </Container>
    </Section>
  )
}
