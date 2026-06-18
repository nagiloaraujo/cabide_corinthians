import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import FaqAccordion, { type FaqItem } from "@/components/faq/FaqAccordion"
import ConditionalReveal from "@/components/ui/ConditionalReveal"

const FAQ: FaqItem[] = [
  {
    id: "licenciado",
    question: "O produto é licenciado?",
    answer:
      "Sim. A proposta é edição oficial/licenciada. Os detalhes finais (selo, lote e documentação) chegam primeiro pra quem tá na lista.",
  },
  {
    id: "entrega",
    question: "Quando começa a entrega?",
    answer:
      "Assim que o Lote 01 abrir. Quem estiver na lista recebe primeiro a data de pré-venda e o cronograma de produção/envio.",
  },
  {
    id: "brasil",
    question: "Envia para todo o Brasil?",
    answer:
      "Sim. A intenção é envio nacional com rastreio. Você entra na lista agora e recebe as condições oficiais antes de todo mundo.",
  },
]

export default function ConversionFooter() {
  return (
    <Section id="faq" className="pb-24 pt-14 sm:pb-28">
      <Container>
        <div className="mx-auto max-w-4xl">
          <ConditionalReveal>
            <div className="inline-flex items-center gap-2 border border-white/15 bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
              FAQ DA FIEL
            </div>
            <h2 className="mt-5 font-[Oswald] text-4xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-5xl">
              <span className="brutal-outline">SEM ENROLAÇÃO.</span>{" "}
              <span className="brutal-outline text-gradient">RESPOSTA DIRETA.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              Dúvida de torcida é objetiva. E a gente responde na mesma energia.
            </p>
          </ConditionalReveal>

          <ConditionalReveal className="mt-8" delay={0.08} y={18}>
            <FaqAccordion items={FAQ} />
          </ConditionalReveal>
        </div>

        <ConditionalReveal className="mt-14 border-t border-white/15 pt-8" delay={0.12} y={18}>
          <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-white/55 sm:flex-row sm:text-left">
            <div>© {new Date().getFullYear()} Cabide Oficial Personalizado do Corinthians</div>
            <div className="font-semibold uppercase tracking-[0.28em]">SCCP • 1910 • VAI CORINTHIANS</div>
          </div>
        </ConditionalReveal>
      </Container>
    </Section>
  )
}
