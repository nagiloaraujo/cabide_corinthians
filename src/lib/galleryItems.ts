export type GalleryMedia = {
  id: string
  type: "image" | "video"
  src: string
  title: string
}

function toPublicPath(fileName: string) {
  return encodeURI(`/galeria/${fileName}`)
}

function makeItem(id: string, type: GalleryMedia["type"], fileName: string, title: string): GalleryMedia {
  return {
    id,
    type,
    src: toPublicPath(fileName),
    title,
  }
}

export const GALLERY_ITEMS: GalleryMedia[] = [
  makeItem("gallery-01", "image", "WhatsApp Image 2026-06-03 at 3.23.24 PM.jpeg", "Galeria oficial 01"),
  makeItem("gallery-02", "image", "WhatsApp Image 2026-06-03 at 3.23.24 PM (1).jpeg", "Galeria oficial 02"),
  makeItem("gallery-03", "image", "WhatsApp Image 2026-06-03 at 3.23.24 PM (2).jpeg", "Galeria oficial 03"),
  makeItem("gallery-04", "video", "WhatsApp Video 2026-06-03 at 3.23.50 PM.mp4", "Video oficial 01"),
  makeItem("gallery-05", "image", "WhatsApp Image 2026-06-03 at 3.23.24 PM (3).jpeg", "Galeria oficial 04"),
  makeItem("gallery-06", "image", "WhatsApp Image 2026-06-03 at 3.25.54 PM.jpeg", "Galeria oficial 05"),
  makeItem("gallery-07", "image", "WhatsApp Image 2026-06-03 at 3.34.49 PM.jpeg", "Galeria oficial 06"),
  makeItem("gallery-08", "video", "WhatsApp Video 2026-06-03 at 3.37.00 PM.mp4", "Video oficial 02"),
  makeItem("gallery-09", "image", "WhatsApp Image 2026-06-03 at 3.36.58 PM.jpeg", "Galeria oficial 07"),
  makeItem("gallery-10", "image", "WhatsApp Image 2026-06-03 at 3.36.58 PM (1).jpeg", "Galeria oficial 08"),
  makeItem("gallery-11", "image", "WhatsApp Image 2026-06-03 at 3.36.59 PM.jpeg", "Galeria oficial 09"),
  makeItem("gallery-12", "image", "WhatsApp Image 2026-06-03 at 3.37.01 PM.jpeg", "Galeria oficial 10"),
  makeItem("gallery-13", "image", "WhatsApp Image 2026-06-03 at 3.37.01 PM (1).jpeg", "Galeria oficial 11"),
  makeItem("gallery-14", "image", "WhatsApp Image 2026-06-03 at 3.37.02 PM.jpeg", "Galeria oficial 12"),
  makeItem("gallery-15", "video", "WhatsApp Video 2026-06-03 at 3.37.24 PM.mp4", "Video oficial 03"),
  makeItem("gallery-16", "image", "WhatsApp Image 2026-06-03 at 3.37.02 PM (1).jpeg", "Galeria oficial 13"),
  makeItem("gallery-17", "image", "WhatsApp Image 2026-06-03 at 3.37.02 PM (2).jpeg", "Galeria oficial 14"),
  makeItem("gallery-18", "image", "WhatsApp Image 2026-06-03 at 3.37.03 PM.jpeg", "Galeria oficial 15"),
  makeItem("gallery-19", "image", "WhatsApp Image 2026-06-03 at 3.37.24 PM.jpeg", "Galeria oficial 16"),
  makeItem("gallery-20", "image", "WhatsApp Image 2026-06-03 at 3.37.25 PM.jpeg", "Galeria oficial 17"),
  makeItem("gallery-21", "image", "WhatsApp Image 2026-06-03 at 3.37.25 PM (1).jpeg", "Galeria oficial 18"),
  makeItem("gallery-22", "image", "WhatsApp Image 2026-06-03 at 3.37.25 PM (2).jpeg", "Galeria oficial 19"),
  makeItem("gallery-23", "video", "WhatsApp Video 2026-06-06 at 11.08.20 AM.mp4", "Video oficial 04"),
  makeItem("gallery-24", "image", "WhatsApp Image 2026-06-03 at 3.37.25 PM (3).jpeg", "Galeria oficial 20"),
  makeItem("gallery-25", "image", "WhatsApp Image 2026-06-03 at 3.37.25 PM (4).jpeg", "Galeria oficial 21"),
  makeItem("gallery-26", "image", "WhatsApp Image 2026-06-06 at 11.22.46 AM.jpeg", "Galeria oficial 22"),
  makeItem("gallery-27", "video", "WhatsApp Video 2026-06-06 at 11.09.28 AM.mp4", "Video oficial 05"),
  makeItem("gallery-28", "video", "WhatsApp Video 2026-06-06 at 11.09.40 AM.mp4", "Video oficial 06"),
  makeItem("gallery-29", "video", "WhatsApp Video 2026-06-06 at 11.10.41 AM.mp4", "Video oficial 07"),
  makeItem("gallery-30", "image", "WhatsApp Image 2026-06-06 at 11.25.51 AM.jpeg", "Galeria oficial 23"),
  makeItem("gallery-31", "video", "WhatsApp Video 2026-06-06 at 11.35.11 AM.mp4", "Video oficial 08"),
  makeItem("gallery-32", "image", "WhatsApp Image 2026-06-18 at 16.03.34.jpeg", "Galeria oficial 24"),
  makeItem("gallery-33", "video", "WhatsApp Video 2026-06-18 at 16.03.35.mp4", "Video oficial 09"),
]
