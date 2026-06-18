import Container from "@/components/layout/Container"
import Reveal from "@/components/ui/Reveal"

export default function JerseyBand() {
  return (
    <section className="relative w-full overflow-hidden py-16">
      <div
        className="absolute inset-0 opacity-95"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 18px, rgba(0,0,0,1) 18px, rgba(0,0,0,1) 44px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <div className="font-[Oswald] text-[2.35rem] leading-[0.95] tracking-[-0.01em] text-gradient sm:text-[3.35rem]">
              NÓIS TEM CABIDE. EDIÇÃO 1 LIMITADA.
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
              Uma novidade patenteada, licenciada e exclusiva no mercado brasileiro. Feito pra
              quem trata o manto como relíquia.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
