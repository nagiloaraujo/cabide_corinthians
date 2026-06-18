import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type SectionProps = {
  id?: string
  className?: string
  children: ReactNode
}

export default function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative w-full py-20 sm:py-24 lg:py-28", className)}>
      {children}
    </section>
  )
}

