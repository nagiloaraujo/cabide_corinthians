import { useThemeModel } from "@/app/useThemeModel"
import Container from "@/components/layout/Container"
import ThemeSwitch from "@/components/hero/ThemeSwitch"
import ProductShowcase from "@/components/hero/ProductShowcase"
import { useTypewriter } from "@/hooks/useTypewriter"
import { motion, useReducedMotion } from "framer-motion"
import Button from "@/components/ui/Button"
import Reveal from "@/components/ui/Reveal"

export default function HeroSection() {
  const model = useThemeModel((s) => s.model)
  const reduce = useReducedMotion()
  const { value, done } = useTypewriter(
    "MANTENHA O SEU MANTO SAGRADO NO LUGAR QUE ELE MERECE.",
    18,
    180,
  )

  return (
    <section className="relative w-full overflow-hidden pt-20 sm:pt-24 lg:pt-28">
      <Container className="relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs tracking-[0.34em] text-white/70 neon-border">
            <span className="inline-block size-1.5 rounded-full bg-[color:var(--accent)]" />
            EDIÇÃO 1 LIMITADA • LICENCIADA
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 font-[Oswald] text-[2.6rem] font-bold leading-[0.92] tracking-[-0.02em] text-white sm:text-[3.9rem] lg:text-[4.7rem]">
              <span className="text-gradient">{value}</span>
              <span className="inline-block w-[0.55em] align-baseline">
                {reduce ? null : (
                  <motion.span
                    aria-hidden
                    className="inline-block h-[0.9em] w-[0.12em] bg-[color:var(--accent)]"
                    animate={{ opacity: done ? [1, 0.2, 1] : [1, 0, 1] }}
                    transition={{ duration: 0.85, repeat: Infinity }}
                  />
                )}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              O primeiro cabide premium do Brasil projetado exclusivamente para a Fiel Torcida. Engenharia
              antideformação com a identidade do Coringão.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="#newsletter" className="w-full sm:w-auto" variant="primary">
              GARANTIR MEU CABIDE OFICIAL
            </Button>
            <div className="text-xs tracking-[0.34em] text-white/45">
              {model === "default"
                ? "BRANCO ORIGINAL"
                : model === "preto"
                  ? "PRETO"
                  : model === "roxo"
                    ? "ROXO"
                  : model === "ouro"
                    ? "OURO PREMIUM"
                    : "PRATA LUXO"}
            </div>
          </Reveal>

          <Reveal delay={0.26} className="mt-9 w-full max-w-xl">
            <ThemeSwitch />
          </Reveal>
        </div>
      </Container>

      <div className="relative z-10 mt-10">
        <ProductShowcase />
      </div>
    </section>
  )
}
