export type SceneImageKey =
  | "hero-locker"
  | "hero-detail"
  | "manifest-wardrobe"
  | "manifest-matchday"
  | "closet-mockup"
  | "closet-detail"
  | "collector-kit"
  | "waitlist-box"
  | "waitlist-badge"
  | "anatomy-detail"
  | "anatomy-supporter"

const SCENE_IMAGES: Record<SceneImageKey, string> = {
  "hero-locker": "/background-capa.jpg",
  "hero-detail": "/cabide-branco.png",
  "manifest-wardrobe": "/background-capa.jpg",
  "manifest-matchday": "/background-capa.jpg",
  "closet-mockup": "/background-capa.jpg",
  "closet-detail": "/cabide-preto.png",
  "collector-kit": "/background-capa.jpg",
  "waitlist-box": "/background-capa.jpg",
  "waitlist-badge": "/brasao.png",
  "anatomy-detail": "/background-capa.jpg",
  "anatomy-supporter": "/background-capa.jpg",
}

export function getSceneImage(key: SceneImageKey) {
  return SCENE_IMAGES[key]
}
