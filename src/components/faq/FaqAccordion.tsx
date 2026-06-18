import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useId, useState } from "react"

export type FaqItem = {
  id: string
  question: string
  answer: string
}

type FaqAccordionProps = {
  items: FaqItem[]
  className?: string
}

export default function FaqAccordion({ items, className }: FaqAccordionProps) {
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id
        const headerId = `${baseId}-${item.id}-h`
        const panelId = `${baseId}-${item.id}-p`
        return (
          <div
            key={item.id}
            className="border-2 border-white/18 bg-black shadow-[10px_10px_0_rgba(255,255,255,0.08)]"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              id={headerId}
              onClick={() => setOpenId((curr) => (curr === item.id ? null : item.id))}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span className="font-[Oswald] text-lg font-black uppercase tracking-wide text-white">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-white/70 transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={cn(
                "grid overflow-hidden px-5 transition-[grid-template-rows] duration-300",
                isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr] pb-0",
              )}
            >
              <div className="min-h-0">
                <div
                  className="mb-4 h-px w-full"
                  style={{ background: "color-mix(in srgb, var(--accent) 55%, transparent)" }}
                />
                <p className="text-sm font-semibold uppercase leading-relaxed tracking-[0.08em] text-white/65">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

