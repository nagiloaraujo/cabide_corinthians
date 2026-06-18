import type { CSSProperties } from "react"

export type ThemeModel = "default" | "preto" | "roxo" | "ouro" | "prata"

export type ThemeConfig = {
  model: ThemeModel
  label: string
  accent: string
  accent2: string
  glow: string
  titleGradient: string
  productFilter: string
  metallicOverlay: {
    backgroundImage: string
    opacity: number
    mixBlendMode: CSSProperties["mixBlendMode"]
  }
}

export const THEME_CONFIG: Record<ThemeModel, ThemeConfig> = {
  default: {
    model: "default",
    label: "Branco",
    accent: "#FFFFFF",
    accent2: "#BDBDBD",
    glow: "rgba(255,255,255,0.55)",
    titleGradient: "linear-gradient(90deg, #ffffff, #d9d9d9, #ffffff)",
    productFilter: "none",
    metallicOverlay: {
      backgroundImage:
        "radial-gradient(1200px 500px at 50% 10%, rgba(255,255,255,0.25), rgba(255,255,255,0) 55%), linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0) 55%)",
      opacity: 0.55,
      mixBlendMode: "screen",
    },
  },
  preto: {
    model: "preto",
    label: "Preto",
    accent: "#FFFFFF",
    accent2: "#111111",
    glow: "rgba(255,255,255,0.28)",
    titleGradient: "linear-gradient(90deg, #ffffff, #bdbdbd, #ffffff)",
    productFilter: "contrast(1.25) brightness(1.02)",
    metallicOverlay: {
      backgroundImage:
        "radial-gradient(1100px 520px at 50% 12%, rgba(255,255,255,0.20), rgba(255,255,255,0) 62%), linear-gradient(135deg, rgba(255,255,255,0.06), rgba(0,0,0,0) 55%)",
      opacity: 0.5,
      mixBlendMode: "screen",
    },
  },
  roxo: {
    model: "roxo",
    label: "Lilás",
    accent: "#4B0082",
    accent2: "#0B0016",
    glow: "rgba(75,0,130,0.65)",
    titleGradient: "linear-gradient(90deg, #d4b0ff, #4b0082, #0b0016)",
    productFilter: "contrast(1.15) saturate(1.25) brightness(0.98)",
    metallicOverlay: {
      backgroundImage:
        "radial-gradient(900px 380px at 50% 10%, rgba(196,131,255,0.45), rgba(75,0,130,0) 60%), linear-gradient(135deg, rgba(75,0,130,0.9), rgba(11,0,22,0.9))",
      opacity: 0.9,
      mixBlendMode: "color",
    },
  },
  ouro: {
    model: "ouro",
    label: "Dourado",
    accent: "#D4AF37",
    accent2: "#D4AF37",
    glow: "rgba(212,175,55,0.75)",
    titleGradient: "linear-gradient(90deg, #d4af37, #d4af37, #d4af37)",
    productFilter: "sepia(1) saturate(6) hue-rotate(10deg) brightness(1.05) contrast(1.35)",
    metallicOverlay: {
      backgroundImage:
        "radial-gradient(1100px 520px at 35% 8%, rgba(255,255,255,0.85), rgba(255,255,255,0) 62%), linear-gradient(115deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.95) 18%, rgba(255,210,96,0.25) 36%, rgba(255,255,255,0.95) 52%, rgba(212,175,55,0.22) 68%, rgba(255,255,255,0.75) 82%, rgba(0,0,0,0) 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 2px, rgba(255,255,255,0) 7px, rgba(255,255,255,0) 14px)",
      opacity: 0.92,
      mixBlendMode: "screen",
    },
  },
  prata: {
    model: "prata",
    label: "Cromado",
    accent: "#BFC7D5",
    accent2: "#BFC7D5",
    glow: "rgba(191,199,213,0.65)",
    titleGradient: "linear-gradient(90deg, #bfc7d5, #bfc7d5, #bfc7d5)",
    productFilter: "grayscale(1) brightness(1.55) contrast(1.35)",
    metallicOverlay: {
      backgroundImage:
        "radial-gradient(1200px 560px at 35% 8%, rgba(255,255,255,0.78), rgba(255,255,255,0) 62%), linear-gradient(115deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.95) 18%, rgba(210,220,235,0.22) 36%, rgba(255,255,255,0.92) 52%, rgba(94,102,116,0.18) 68%, rgba(255,255,255,0.72) 82%, rgba(0,0,0,0) 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.14) 0px, rgba(255,255,255,0.14) 2px, rgba(255,255,255,0) 7px, rgba(255,255,255,0) 14px)",
      opacity: 0.88,
      mixBlendMode: "screen",
    },
  },
}

