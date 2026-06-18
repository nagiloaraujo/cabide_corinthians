import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

type ButtonProps = {
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  variant?: "primary" | "ghost"
  type?: "button" | "submit"
  disabled?: boolean
}

export default function Button({
  href,
  onClick,
  children,
  className,
  variant = "primary",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center border-2 px-6 py-4 font-[Oswald] text-lg font-black uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
  const variants =
    variant === "primary"
      ? "border-black bg-[color:var(--accent)] text-black shadow-[12px_12px_0_rgba(255,255,255,0.10)] hover:brightness-105"
      : "border-white/20 bg-black text-white/80 hover:text-white shadow-[10px_10px_0_rgba(255,255,255,0.06)]"

  const Comp = href ? motion.a : motion.button

  return (
    <Comp
      {...(href ? { href } : { type, onClick, disabled })}
      aria-disabled={href ? undefined : disabled}
      whileHover={href || !disabled ? { scale: 1.02 } : undefined}
      whileTap={href || !disabled ? { scale: 0.99 } : undefined}
      className={cn(base, variants, className)}
    >
      {children}
    </Comp>
  )
}
