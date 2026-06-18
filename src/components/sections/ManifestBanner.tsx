import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import { getSceneImage } from "@/lib/imagery"

export default function ManifestBanner() {
  const wardrobeScene = getSceneImage("manifest-wardrobe")
  const matchdayScene = getSceneImage("manifest-matchday")

  return (
    <Section className="py-0">
      <div className="relative min-h-[72vh] w-full overflow-hidden border-y border-white/15">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 6px, rgba(0,0,0,1) 6px, rgba(0,0,0,1) 44px)",
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(1200px 520px at 30% 20%, color-mix(in srgb, var(--glow) 70%, transparent), transparent 60%)",
          }}
        />

        <Container className="relative z-10 flex min-h-[72vh] flex-col justify-center py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.92fr]">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 border border-white/15 bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
                MANIFESTO • ARQUIBANCADA • RELÍQUIA
              </div>
              <h2 className="mt-5 font-[Oswald] text-5xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-6xl">
                <span className="brutal-outline">NÓIS TEM CABIDE.</span>{" "}
                <span className="brutal-outline text-gradient">LITERALMENTE.</span>
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
                Para quem apoia os 90 minutos. Para quem guarda cada camisa como uma relíquia histórica. Isso não é um
                acessório de armário — é peça de colecionador. É o tipo de coisa que você mostra com orgulho quando abre a
                porta do guarda-roupa.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[320px] overflow-hidden border border-white/15 bg-black shadow-[12px_12px_0_rgba(255,255,255,0.08)]">
                <img src={wardrobeScene} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute right-4 top-4 text-[42px] font-[Oswald] font-black uppercase leading-none text-white/14">
                  corinthians
                </div>
                <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/70 p-4 backdrop-blur-sm">
                  <div className="text-[11px] font-black uppercase tracking-[0.24em] text-white/80">armário de respeito</div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
                    cenário de coleção. clima de pré-jogo.
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="relative min-h-[152px] overflow-hidden border border-white/15 bg-black shadow-[12px_12px_0_rgba(255,255,255,0.08)]">
                  <img src={matchdayScene} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute left-3 top-3 border border-white/15 bg-black/75 px-3 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/75">
                    relíquia
                  </div>
                  <div className="absolute bottom-3 right-3 text-[22px] font-[Oswald] font-black uppercase leading-none text-white/16">
                    fiel
                  </div>
                </div>
                <div className="border border-white/15 bg-black/75 p-4 shadow-[12px_12px_0_rgba(255,255,255,0.08)]">
                  <div className="text-[11px] font-black uppercase tracking-[0.24em] text-white/75">por que falta vida hoje?</div>
                  <div className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/60">
                    faltava cenário real de uso. agora a seção começa a vender atmosfera, não só copy.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  )
}
