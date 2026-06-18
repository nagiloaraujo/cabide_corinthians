import { THEME_CONFIG, type ThemeModel } from "@/app/theme"
import { useThemeModel } from "@/app/useThemeModel"
import { cn } from "@/lib/utils"

const ORDER: ThemeModel[] = ["default", "preto", "roxo", "ouro", "prata"]

export default function ThemeSwitch() {
  const model = useThemeModel((s) => s.model)
  const setModel = useThemeModel((s) => s.setModel)

  return (
    <div className="flex w-full justify-center">
      <div className="border-2 border-white/20 bg-black px-4 py-3 shadow-[12px_12px_0_rgba(255,255,255,0.08)]">
        <div className="grid grid-cols-5 gap-3 sm:gap-4">
          {ORDER.map((m) => {
            const isActive = model === m
            const c = THEME_CONFIG[m]
            return (
              <button
                key={m}
                type="button"
                onClick={() => setModel(m)}
                className={cn(
                  "group flex min-w-[74px] flex-col items-center gap-2 border-2 border-white/15 bg-black px-2 py-3 text-center transition",
                  isActive ? "border-[color:var(--accent)]" : "hover:border-white/30",
                )}
                aria-pressed={isActive}
              >
                <span
                  className={cn(
                    "relative block size-6 rounded-full border border-white/25 transition-all duration-200",
                    isActive ? "scale-110" : "scale-100",
                  )}
                  style={{
                    background:
                      m === "default"
                        ? "#ffffff"
                        : m === "ouro" || m === "prata"
                          ? c.accent
                          : `linear-gradient(135deg, ${c.accent} 0%, ${c.accent2} 100%)`,
                    boxShadow: isActive
                      ? `0 0 0 2px ${c.accent}88, 0 0 24px 0 ${c.glow}`
                      : `0 0 0 1px ${c.accent}55, 0 0 16px 0 ${c.glow}`,
                  }}
                />
                <span
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65 transition-colors",
                    isActive && "text-white",
                  )}
                >
                  {c.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
