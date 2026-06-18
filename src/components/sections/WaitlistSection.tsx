import WaitlistForm from "@/components/forms/WaitlistForm"
import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import ConditionalReveal from "@/components/ui/ConditionalReveal"
import { getSceneImage } from "@/lib/imagery"

export default function WaitlistSection() {
  const collectorBox = getSceneImage("waitlist-box")
  const badgeShot = getSceneImage("waitlist-badge")

  return (
    <Section id="waitlist" className="flex min-h-screen items-center">
      <Container className="flex w-full flex-col items-center justify-center">
        <ConditionalReveal>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 border border-white/15 bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
              LOTE 01 • PRÉ-VENDA
            </div>
            <h2 className="mt-5 font-[Oswald] text-4xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-5xl">
              <span className="brutal-outline">FAÇA PARTE DO</span>{" "}
              <span className="brutal-outline text-gradient">LOTE 01.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              O produto ainda não está à venda. Cadastre-se para prioridade máxima, desconto de lançamento e atualizações
              exclusivas direto no WhatsApp.
            </p>
          </div>
        </ConditionalReveal>

        <ConditionalReveal className="mt-8 flex w-full justify-center" delay={0.08} y={22}>
          <div
            className="w-full max-w-4xl border-2 border-white/20"
            style={{
              boxShadow:
                "0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent), 0 0 90px 0 color-mix(in srgb, var(--glow) 60%, transparent)",
            }}
          >
            <div className="bg-black p-6">
              <div className="text-center text-[11px] font-black uppercase tracking-[0.28em] text-white/70">
                FAÇA PARTE DO LOTE 01 — PRÉ-VENDA EXCLUSIVA
              </div>
              <div className="mt-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-white/60">
                Cadastro agora = prioridade máxima no lançamento.
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">
                <div className="relative min-h-[188px] overflow-hidden border border-white/10 bg-black">
                  <img
                    src={collectorBox}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/34" />
                  <div className="absolute right-3 top-3 border border-white/15 bg-black/70 px-3 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/78">
                    corinthians
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/72 p-4">
                    <div className="text-[11px] font-black uppercase tracking-[0.24em] text-white/82">lote 01 exclusivo</div>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/62">
                      pré-venda com cara de item raro e não de cadastro genérico.
                    </div>
                  </div>
                </div>
                <div className="relative min-h-[188px] overflow-hidden border border-white/10 bg-black">
                  <img src={badgeShot} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-black/42" />
                  <div className="absolute left-3 top-3 border border-white/15 bg-black/75 px-3 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/75">
                    prioridade
                  </div>
                  <div className="absolute bottom-3 right-3 text-[22px] font-[Oswald] font-black uppercase leading-none text-white/18">
                    sccp
                  </div>
                </div>
              </div>
              <WaitlistForm />
            </div>
          </div>
        </ConditionalReveal>
      </Container>
    </Section>
  )
}
