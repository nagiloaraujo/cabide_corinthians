import type { ThemeModel } from "@/app/theme"
import { motion, useReducedMotion } from "framer-motion"
import { useMemo } from "react"

type BrutalBackdropProps = {
  model: ThemeModel
}

export default function BrutalBackdrop({ model }: BrutalBackdropProps) {
  const reduce = useReducedMotion()

  const layers = useMemo(() => {
    if (model === "roxo") {
      return {
        stripes:
          "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 14px)",
        glow:
          "radial-gradient(1000px 520px at 20% 10%, rgba(75,0,130,0.38), rgba(0,0,0,0) 62%), radial-gradient(900px 480px at 80% 30%, rgba(212,175,55,0.0), rgba(0,0,0,0) 60%)",
        grit:
          "radial-gradient(900px 520px at 50% 120%, rgba(255,255,255,0.05), rgba(0,0,0,0) 62%)",
      }
    }

    if (model === "preto") {
      return {
        stripes:
          "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 18px)",
        glow:
          "radial-gradient(900px 520px at 50% 10%, rgba(255,255,255,0.08), rgba(0,0,0,0) 62%), radial-gradient(1100px 620px at 20% 90%, rgba(255,255,255,0.03), rgba(0,0,0,0) 64%)",
        grit:
          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0) 45%)",
      }
    }

    if (model === "ouro") {
      return {
        stripes:
          "repeating-linear-gradient(90deg, rgba(212,175,55,0.10) 0px, rgba(212,175,55,0.10) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 10px)",
        glow:
          "radial-gradient(900px 480px at 50% 14%, rgba(212,175,55,0.22), rgba(0,0,0,0) 60%), radial-gradient(1100px 620px at 18% 80%, rgba(255,255,255,0.06), rgba(0,0,0,0) 60%)",
        grit:
          "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0) 42%)",
      }
    }

    if (model === "prata") {
      return {
        stripes:
          "repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 7px)",
        glow:
          "radial-gradient(950px 520px at 50% 16%, rgba(255,255,255,0.18), rgba(0,0,0,0) 62%), radial-gradient(900px 520px at 85% 85%, rgba(191,199,213,0.14), rgba(0,0,0,0) 64%)",
        grit:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0) 50%)",
      }
    }

    return {
      stripes:
        "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 16px)",
      glow:
        "radial-gradient(900px 520px at 50% 10%, rgba(255,255,255,0.10), rgba(0,0,0,0) 62%), radial-gradient(1100px 620px at 20% 90%, rgba(255,255,255,0.04), rgba(0,0,0,0) 64%)",
      grit:
        "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0) 45%)",
    }
  }, [model])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-black">
      <motion.div
        className="absolute inset-0 opacity-75"
        style={{
          backgroundImage: `${layers.glow}, ${layers.stripes}`,
          backgroundSize: "auto, auto",
          backgroundPosition: "center, center",
        }}
        animate={
          reduce
            ? undefined
            : {
                backgroundPosition: ["0px 0px, 0px 0px", "0px -160px, 120px 0px"],
              }
        }
        transition={reduce ? undefined : { duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `${layers.grit}, radial-gradient(2px 2px at 12% 18%, rgba(255,255,255,0.08) 40%, rgba(0,0,0,0) 42%), radial-gradient(2px 2px at 74% 62%, rgba(255,255,255,0.06) 40%, rgba(0,0,0,0) 42%), radial-gradient(1px 1px at 45% 38%, rgba(255,255,255,0.07) 40%, rgba(0,0,0,0) 42%)`,
          mixBlendMode: "overlay",
          filter: "contrast(1.05)",
        }}
      />
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "radial-gradient(1200px 680px at 50% 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0.55) 70%), radial-gradient(1200px 680px at 50% 100%, rgba(0,0,0,0) 10%, rgba(0,0,0,0.75) 72%)",
        }}
      />
    </div>
  )
}
