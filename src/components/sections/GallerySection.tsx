import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import ConditionalReveal from "@/components/ui/ConditionalReveal"
import { GALLERY_ITEMS, type GalleryMedia } from "@/lib/galleryItems"
import { useEffect, useState } from "react"

function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryMedia
  onClick: (item: GalleryMedia) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className="group relative h-[320px] w-[220px] shrink-0 overflow-hidden rounded-[28px] border border-white/12 bg-black/80 text-left shadow-[14px_18px_40px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:border-white/24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:h-[360px] sm:w-[250px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_42%)]" />
      {item.type === "video" ? (
        <video
          src={item.src}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={item.src}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/16 to-transparent" />
      <div className="absolute left-4 top-4 border border-white/15 bg-black/78 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/78">
        {item.type === "video" ? "video" : "foto"}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="border border-white/12 bg-black/72 px-3 py-3 backdrop-blur-sm">
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white">{item.title}</div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/58">
            {item.type === "video" ? "sem audio • clique para ampliar" : "registro real • clique para ampliar"}
          </div>
        </div>
      </div>
    </button>
  )
}

export default function GallerySection() {
  const [activeItem, setActiveItem] = useState<GalleryMedia | null>(null)

  useEffect(() => {
    if (!activeItem) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveItem(null)
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [activeItem])

  return (
    <Section>
      <Container>
        <ConditionalReveal>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 border border-white/15 bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
              GALERIA • REGISTROS REAIS
            </div>
            <h2 className="mt-5 font-[Oswald] text-4xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-5xl">
              <span className="brutal-outline">VEJA O CABIDE</span>{" "}
              <span className="brutal-outline text-gradient">EM CENA.</span>
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
              Registros reais que mostram de perto o acabamento, a presença e o destaque que o seu manto ganha com um
              cabide feito para representar o Corinthians.
            </p>
          </div>
        </ConditionalReveal>

        <ConditionalReveal delay={0.08} y={22}>
          <div className="gallery-marquee relative mt-10 overflow-hidden [--marquee-gap:1rem]">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-black via-black/80 to-transparent sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-black via-black/80 to-transparent sm:w-16" />

            <div className="gallery-marquee-track flex w-max gap-[var(--marquee-gap)]">
              {[0, 1].map((sequence) => (
                <div key={sequence} className="flex gap-[var(--marquee-gap)]">
                  {GALLERY_ITEMS.map((item) => (
                    <GalleryCard key={`${sequence}-${item.id}`} item={item} onClick={setActiveItem} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ConditionalReveal>
      </Container>

      {activeItem ? (
        <div
          className="fixed inset-0 z-[90] bg-black/88 px-4 py-6 backdrop-blur-md sm:px-8"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setActiveItem(null)}
        >
          <div className="mx-auto flex h-full max-w-6xl items-center justify-center">
            <div
              className="relative w-full overflow-hidden rounded-[30px] border border-white/15 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute right-4 top-4 z-10 border border-white/15 bg-black/82 px-3 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/82 transition hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                fechar
              </button>

              <div className="flex min-h-[70vh] items-center justify-center bg-black p-4 sm:p-6">
                {activeItem.type === "video" ? (
                  <video
                    src={activeItem.src}
                    className="max-h-[78vh] w-full rounded-[24px] bg-black object-contain"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={activeItem.src}
                    alt={activeItem.title}
                    className="max-h-[78vh] w-full rounded-[24px] bg-black object-contain"
                  />
                )}
              </div>

              <div className="border-t border-white/10 bg-black/86 px-5 py-4 sm:px-6">
                <div className="text-[12px] font-black uppercase tracking-[0.22em] text-white">{activeItem.title}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/58">
                  {activeItem.type === "video" ? "Video em destaque • reproducao sem audio" : "Registro em destaque"}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Section>
  )
}
