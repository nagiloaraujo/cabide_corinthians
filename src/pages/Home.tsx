import { THEME_CONFIG } from "@/app/theme"
import { useThemeModel } from "@/app/useThemeModel"
import BrutalBackdrop from "@/components/effects/BrutalBackdrop"
import BootLoader from "@/components/loading/BootLoader"
import AnatomySection from "@/components/sections/AnatomySection"
import ClosetBento from "@/components/sections/ClosetBento"
import GallerySection from "@/components/sections/GallerySection"
import HeroImpact from "@/components/sections/HeroImpact"
import ManifestBanner from "@/components/sections/ManifestBanner"
import ConversionFooter from "@/components/sections/ConversionFooter"
import WaitlistSection from "@/components/sections/WaitlistSection"
import type React from "react"
import { useEffect, useState } from "react"

const BOOT_KEY = "cabide.bootSeen"

export default function Home() {
  const model = useThemeModel((s) => s.model)
  const config = THEME_CONFIG[model]
  const [bootDone, setBootDone] = useState(false)
  const [bootEnabled, setBootEnabled] = useState(true)

  useEffect(() => {
    const seen = window.localStorage.getItem(BOOT_KEY) === "1"
    setBootEnabled(!seen)
    setBootDone(seen)
  }, [])

  const onBootDone = () => {
    window.localStorage.setItem(BOOT_KEY, "1")
    setBootEnabled(false)
    setBootDone(true)
  }

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={
        {
          "--accent": config.accent,
          "--accent2": config.accent2,
          "--glow": config.glow,
          "--title-gradient": config.titleGradient,
        } as React.CSSProperties
      }
    >
      {bootEnabled ? <BootLoader brand="CABIDE OFICIAL" durationMs={900} onDone={onBootDone} /> : null}
      {bootDone ? (
        <>
          <BrutalBackdrop model={model} />

          <main className="relative z-10" data-model={model}>
            <HeroImpact />
            <ManifestBanner />
            <AnatomySection />
            <GallerySection />
            <ClosetBento />
            <WaitlistSection />
            <ConversionFooter />
          </main>
        </>
      ) : null}
    </div>
  )
}
