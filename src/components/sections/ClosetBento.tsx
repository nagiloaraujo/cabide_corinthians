import TiltCard from "@/components/cards/TiltCard"
import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import ConditionalReveal from "@/components/ui/ConditionalReveal"
import { getSceneImage } from "@/lib/imagery"

export default function ClosetBento() {
  const closetMockup = getSceneImage("closet-mockup")
  const detailCloseup = getSceneImage("closet-detail")
  const collectorKit = getSceneImage("collector-kit")

  return (
    <Section>
      <Container>
        <ConditionalReveal>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 border border-white/15 bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
              CONCEITO • GUARDA-ROUPA
            </div>
            <h2 className="mt-5 font-[Oswald] text-4xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-5xl">
              <span className="brutal-outline">O GUARDA-ROUPA</span>{" "}
              <span className="brutal-outline text-gradient">DE RESPEITO.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              Um armário escuro, organizado, alinhado. Só manto pesado e cabide à altura. Padrão de arquibancada.
            </p>
          </div>
        </ConditionalReveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          <ConditionalReveal className="lg:col-span-7" delay={0.06} y={20}>
            <TiltCard className="h-full">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.28em] text-white/70">
                    ORGANIZAÇÃO ALVINEGRA
                  </div>
                  <div className="mt-3 font-[Oswald] text-3xl font-black uppercase leading-[0.95] text-white">
                    Linha reta. Sem bagunça.
                  </div>
                  <div className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/60">
                    Armário escuro com cabides iguais vira vitrine de coleção.
                  </div>
                </div>
                <div className="hidden shrink-0 border border-white/15 bg-black px-3 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-white/70 sm:block">
                  SCCP
                </div>
              </div>
              <div className="relative mt-6 min-h-[190px] overflow-hidden border border-white/10 bg-black">
                <img
                  src={closetMockup}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/36" />
                <div className="absolute right-3 top-3 border border-white/15 bg-black/70 px-3 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/75">
                  sccp
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/72 p-3">
                  <div className="text-[11px] font-black uppercase tracking-[0.24em] text-white/82">visual de coleção</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/62">
                    fileira alinhada. atmosfera de vitrine.
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="relative h-12 overflow-hidden border border-white/10 bg-black">
                    {i === 1 || i === 4 || i === 7 ? (
                      <div
                        className="absolute inset-0"
                        style={{
                          boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent)",
                        }}
                      />
                    ) : null}
                    <div className="absolute left-1/2 top-1/2 h-7 w-4 -translate-x-1/2 -translate-y-1/2 rounded-b-[10px] border border-white/20" />
                    <div className="absolute left-1/2 top-[8px] h-3 w-3 -translate-x-1/2 rounded-full border border-white/25" />
                    <div className="absolute left-1/2 top-[14px] h-[1px] w-7 -translate-x-1/2 bg-white/15" />
                  </div>
                ))}
              </div>
            </TiltCard>
          </ConditionalReveal>

          <ConditionalReveal className="lg:col-span-5" delay={0.1} y={20}>
            <TiltCard className="h-full">
              <div className="text-[11px] font-black uppercase tracking-[0.28em] text-white/70">EDIÇÃO DE CRIA</div>
              <div className="mt-3 font-[Oswald] text-3xl font-black uppercase leading-[0.95] text-white">
                Identidade no detalhe.
              </div>
              <div className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/60">
                Vazado Corinthians em destaque: parece troféu pendurado.
              </div>
              <div className="mt-6 grid gap-3">
                <div className="relative min-h-[176px] overflow-hidden border border-white/10 bg-black">
                  <img
                    src={detailCloseup}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="absolute right-3 top-3 text-[26px] font-[Oswald] font-black uppercase leading-none text-white/16">
                    corinthians
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 text-[11px] font-black uppercase tracking-[0.22em] text-white/80">
                    vazado em destaque
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="border border-white/10 bg-black px-3 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white/65">
                    oficial
                  </div>
                  <div className="border border-white/10 bg-black px-3 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white/65 brutal-line">
                    cria
                  </div>
                  <div className="border border-white/10 bg-black px-3 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white/65">
                    sccp
                  </div>
                </div>
              </div>
            </TiltCard>
          </ConditionalReveal>

          <ConditionalReveal className="lg:col-span-12" delay={0.14} y={20}>
            <TiltCard className="h-full">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.28em] text-white/70">
                    PADRÃO DE ARQUIBANCADA
                  </div>
                  <div className="mt-3 font-[Oswald] text-3xl font-black uppercase leading-[0.95] text-white">
                    Peça de colecionador. Sem desculpa.
                  </div>
                </div>
                <div className="border border-white/15 bg-black px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                  FEITO PRA MANTO PESADO
                </div>
              </div>
              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                <div className="border border-white/10 bg-black px-4 py-4">
                  <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white">Respeita tecido</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                    Dry-fit, poliéster e edição especial.
                  </div>
                </div>
                <div className="border border-white/10 bg-black px-4 py-4">
                  <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white">Anti-deformação</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                    Curvatura anatômica, sem marca.
                  </div>
                </div>
                <div className="border border-white/10 bg-black px-4 py-4">
                  <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white">Presença</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                    Parece que você pendurou um troféu.
                  </div>
                </div>
              </div>
              <div className="relative mt-5 min-h-[220px] overflow-hidden border border-white/10 bg-black">
                <img
                  src={collectorKit}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/38" />
                <div className="absolute left-4 top-4 border border-white/15 bg-black/75 px-3 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/80">
                  lote 01
                </div>
                <div className="absolute right-4 top-4 text-[32px] font-[Oswald] font-black uppercase leading-none text-white/16">
                  fiel
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/72 p-4">
                  <div className="text-[11px] font-black uppercase tracking-[0.24em] text-white/80">kit de colecionador</div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/62">
                    caixa, selo e presença de produto premium.
                  </div>
                </div>
              </div>
            </TiltCard>
          </ConditionalReveal>
        </div>
      </Container>
    </Section>
  )
}
