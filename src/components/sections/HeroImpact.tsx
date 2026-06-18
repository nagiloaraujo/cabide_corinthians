import { THEME_CONFIG } from "@/app/theme"
import { useThemeModel } from "@/app/useThemeModel"
import ProductShowcase from "@/components/hero/ProductShowcase"
import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import Button from "@/components/ui/Button"
import ConditionalReveal from "@/components/ui/ConditionalReveal"
import { getSceneImage } from "@/lib/imagery"

export default function HeroImpact() {
  const model = useThemeModel((s) => s.model)
  const activeLabel = THEME_CONFIG[model].label
  const heroLocker = getSceneImage("hero-locker")
  const heroDetail = getSceneImage("hero-detail")

  return (
    <Section className="pb-0 pt-10 sm:pt-14 lg:pt-16">
      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <ConditionalReveal>
            <div className="inline-flex items-center gap-2 border border-white/15 bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
              EDIÇÃO 01 • TROFÉU DE COLECIONADOR
            </div>
          </ConditionalReveal>
          <ConditionalReveal delay={0.06} y={18}>
            <h1 className="mt-5 font-[Oswald] text-5xl font-black uppercase leading-[0.88] tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="brutal-outline text-gradient">O SEU MANTO SAGRADO</span>{" "}
              <span className="brutal-outline">NÃO PODE FICAR</span>{" "}
              <span className="brutal-outline text-gradient">EM QUALQUER LUGAR.</span>
            </h1>
          </ConditionalReveal>
          <ConditionalReveal delay={0.12} y={18}>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
              Manto de respeito não fica em cabide qualquer. Seu manto de jogo merece um suporte à altura da sua paixão. O
              primeiro cabide premium personalizado do Brasil feito para quem vive o Corinthians.
            </p>
          </ConditionalReveal>
          <ConditionalReveal delay={0.18} y={18}>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href="#waitlist"
                className="w-full !rounded-none border-2 border-black bg-[color:var(--accent)] px-7 py-4 text-center text-lg font-black uppercase tracking-wide text-black shadow-[10px_10px_0_rgba(255,255,255,0.10)] sm:w-auto"
              >
                ENTRAR NA LISTA DE ESPERA DA FIEL
              </Button>
              <div className="border border-white/15 bg-black px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                ACABAMENTO EM DESTAQUE: {activeLabel}
              </div>
            </div>
          </ConditionalReveal>

          <ConditionalReveal delay={0.24} y={18}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="relative min-h-[132px] overflow-hidden border border-white/15 bg-black shadow-[12px_12px_0_rgba(255,255,255,0.08)]">
                <img src={heroLocker} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/38" />
              <div className="absolute right-3 top-3 border border-white/15 bg-black/75 px-3 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/75">
                corinthians
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/72 p-3 text-left">
                <div className="text-[11px] font-black uppercase tracking-[0.24em] text-white/82">cena de armário</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/62">
                  objeto de coleção, não acessório comum.
                </div>
              </div>
              </div>
              <div className="relative min-h-[132px] overflow-hidden border border-white/15 bg-black shadow-[12px_12px_0_rgba(255,255,255,0.08)]">
                <img src={heroDetail} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/42" />
                <div className="absolute left-3 top-3 border border-white/15 bg-black/75 px-3 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/75">
                  close premium
                </div>
                <div className="absolute bottom-3 right-3 text-[28px] font-[Oswald] font-black uppercase leading-none text-white/18">
                  sccp
                </div>
              </div>
            </div>
          </ConditionalReveal>
        </div>
      </Container>

      <ConditionalReveal className="relative z-0 mt-6" delay={0.12} y={24}>
        <ProductShowcase />
      </ConditionalReveal>
    </Section>
  )
}
