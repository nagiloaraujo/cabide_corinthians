type AtmosphereProps = {
  accent: string
  accent2: string
}

export default function Atmosphere({ accent, accent2 }: AtmosphereProps) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-30">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `radial-gradient(900px 560px at 20% 10%, ${accent}22, transparent 60%), radial-gradient(860px 520px at 80% 14%, ${accent2}33, transparent 55%), radial-gradient(1100px 620px at 50% 80%, ${accent}1a, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-[0.38]" />
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
    </div>
  )
}

