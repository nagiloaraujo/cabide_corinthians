import { create } from "zustand"
import type { ThemeModel } from "./theme"

type ThemeModelState = {
  model: ThemeModel
  setModel: (model: ThemeModel) => void
}

const STORAGE_KEY = "cabide.themeModel"

function readInitialModel(): ThemeModel {
  if (typeof window === "undefined") return "default"
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (raw === "malandros") return "roxo"
  if (raw === "default" || raw === "preto" || raw === "roxo" || raw === "ouro" || raw === "prata") return raw
  return "default"
}

export const useThemeModel = create<ThemeModelState>((set) => ({
  model: readInitialModel(),
  setModel: (model) => {
    set({ model })
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, model)
    }
  },
}))

