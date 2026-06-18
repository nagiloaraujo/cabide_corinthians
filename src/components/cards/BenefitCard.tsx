import TiltCard from "./TiltCard"
import type { LucideIcon } from "lucide-react"

type BenefitCardProps = {
  title: string
  description: string
  Icon: LucideIcon
}

export default function BenefitCard({ title, description, Icon }: BenefitCardProps) {
  return (
    <TiltCard className="h-full">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <div className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] neon-border">
            <Icon className="size-6 text-[color:var(--accent)]" />
          </div>
          <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-semibold tracking-[0.28em] text-white/60">
            PREMIUM
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="font-[Oswald] text-2xl leading-[1.05] tracking-wide text-white">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{description}</p>
        </div>
      </div>
    </TiltCard>
  )
}

