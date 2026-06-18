import BenefitCard from "@/components/cards/BenefitCard"
import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import Reveal from "@/components/ui/Reveal"
import { Crown, Shirt, Swords } from "lucide-react"

export default function BenefitsSection() {
  return (
    <Section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-[Oswald] text-3xl tracking-wide text-white sm:text-4xl">
              Benefícios de colecionador. Mentalidade de Fiel.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
              Não é “só um cabide”. É engenharia + identidade. Um upgrade real no seu guarda-roupa.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Reveal>
            <BenefitCard
              Icon={Shirt}
              title="Proteção de Colecionador"
              description="Curvatura anatômica exata para não marcar os ombros e nem esticar as camisas de jogo de poliéster."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <BenefitCard
              Icon={Swords}
              title="Identidade de Cria"
              description="Design vazado com a escrita Corinthians em alta definição que transforma o seu guarda-roupa em um santuário."
            />
          </Reveal>
          <Reveal delay={0.16}>
            <BenefitCard
              Icon={Crown}
              title="Material Premium Inovador"
              description="Estrutura ultra-resistente feita para durar a vida inteira, suportando até os casacos mais pesados de inverno da torcida."
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
