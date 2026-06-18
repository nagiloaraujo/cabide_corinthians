import Reveal from "@/components/ui/Reveal"
import type { ReactNode } from "react"

type ConditionalRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export default function ConditionalReveal({ children, className, delay, y }: ConditionalRevealProps) {
  return (
    <Reveal className={className} delay={delay} y={y}>
      {children}
    </Reveal>
  )
}
