import type { ThemeModel } from "@/app/theme"
import { useThemeModel } from "@/app/useThemeModel"
import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { useEffect, useMemo, useState } from "react"

type Edition = "Branco" | "Preto" | "Lilás" | "Dourado" | "Cromado"

type Lead = {
  name: string
  email: string
  whatsapp: string
  edition: Edition
  createdAt: string
}

const STORAGE_KEY = "cabide.waitlistLeads"

function editionFromModel(model: ThemeModel): Edition {
  if (model === "preto") return "Preto"
  if (model === "roxo") return "Lilás"
  if (model === "ouro") return "Dourado"
  if (model === "prata") return "Cromado"
  return "Branco"
}

function modelFromEdition(edition: Edition): ThemeModel {
  if (edition === "Preto") return "preto"
  if (edition === "Lilás") return "roxo"
  if (edition === "Dourado") return "ouro"
  if (edition === "Cromado") return "prata"
  return "default"
}

function maskWhatsapp(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11)
  const ddd = digits.slice(0, 2)
  const rest = digits.slice(2)

  if (!ddd) return ""
  if (rest.length <= 4) return `(${ddd}) ${rest}`
  if (rest.length <= 8) return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`
  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`
}

export default function WaitlistForm() {
  const model = useThemeModel((s) => s.model)
  const setModel = useThemeModel((s) => s.setModel)
  const [status, setStatus] = useState<"idle" | "sending" | "ok">("idle")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [edition, setEdition] = useState<Edition>(() => editionFromModel(model))
  const [touched, setTouched] = useState({ name: false, email: false, whatsapp: false })

  useEffect(() => {
    setEdition(editionFromModel(model))
  }, [model])

  const errors = useMemo(() => {
    const nameError = !name.trim() ? "Informe seu nome." : null
    const emailValue = email.trim()
    const emailError = !emailValue
      ? "Informe seu e-mail."
      : !/^\S+@\S+\.\S+$/.test(emailValue)
        ? "E-mail inválido."
        : null
    const digits = whatsapp.replace(/\D/g, "")
    const whatsappError = digits.length < 10 ? "WhatsApp incompleto." : null
    return { name: nameError, email: emailError, whatsapp: whatsappError }
  }, [email, name, whatsapp])

  const disabled = useMemo(() => {
    if (status !== "idle") return true
    return Boolean(errors.name || errors.email || errors.whatsapp)
  }, [errors.email, errors.name, errors.whatsapp, status])

  return (
    <form
      className="mt-8 border-2 border-white/20 bg-black p-6 shadow-[14px_14px_0_rgba(255,255,255,0.08)]"
      onSubmit={(e) => {
        e.preventDefault()
        setTouched({ name: true, email: true, whatsapp: true })
        if (disabled) return

        setStatus("sending")
        const payload: Lead = {
          name: name.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          edition,
          createdAt: new Date().toISOString(),
        }

        const existing = window.localStorage.getItem(STORAGE_KEY)
        const list: Lead[] = existing ? (JSON.parse(existing) as Lead[]) : []
        list.unshift(payload)
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 250)))

        window.setTimeout(() => {
          setStatus("ok")
        }, 520)
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-[11px] font-black uppercase tracking-[0.28em] text-white/75">Nome completo</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((s) => ({ ...s, name: true }))}
            required
            autoComplete="name"
            className={cn(
              "h-12 w-full border-2 bg-black px-3 text-sm font-semibold uppercase tracking-[0.06em] text-white outline-none focus-visible:border-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              touched.name && errors.name ? "border-rose-300/60" : "border-white/15",
            )}
            placeholder="Seu nome"
          />
          {touched.name && errors.name ? (
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rose-200">{errors.name}</span>
          ) : null}
        </label>
        <label className="grid gap-2">
          <span className="text-[11px] font-black uppercase tracking-[0.28em] text-white/75">E-mail</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((s) => ({ ...s, email: true }))}
            required
            autoComplete="email"
            type="email"
            className={cn(
              "h-12 w-full border-2 bg-black px-3 text-sm font-semibold tracking-[0.04em] text-white outline-none focus-visible:border-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              touched.email && errors.email ? "border-rose-300/60" : "border-white/15",
            )}
            placeholder="seunome@email.com"
          />
          {touched.email && errors.email ? (
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rose-200">{errors.email}</span>
          ) : null}
        </label>
        <label className="grid gap-2">
          <span className="text-[11px] font-black uppercase tracking-[0.28em] text-white/75">WhatsApp</span>
          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(maskWhatsapp(e.target.value))}
            onBlur={() => setTouched((s) => ({ ...s, whatsapp: true }))}
            required
            inputMode="tel"
            autoComplete="tel"
            className={cn(
              "h-12 w-full border-2 bg-black px-3 text-sm font-semibold tracking-[0.06em] text-white outline-none focus-visible:border-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              touched.whatsapp && errors.whatsapp ? "border-rose-300/60" : "border-white/15",
            )}
            placeholder="(11) 99999-9999"
          />
          {touched.whatsapp && errors.whatsapp ? (
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rose-200">{errors.whatsapp}</span>
          ) : null}
        </label>
        <label className="grid gap-2">
          <span className="text-[11px] font-black uppercase tracking-[0.28em] text-white/75">
            Qual edição vai pro armário?
          </span>
          <select
            value={edition}
            onChange={(e) => {
              const next = e.target.value as Edition
              setEdition(next)
              setModel(modelFromEdition(next))
            }}
            className="h-12 w-full border-2 border-white/15 bg-black px-3 text-sm font-black uppercase tracking-[0.10em] text-white outline-none focus-visible:border-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <option value="Branco">Branco</option>
            <option value="Preto">Preto</option>
            <option value="Lilás">Lilás</option>
            <option value="Dourado">Dourado</option>
            <option value="Cromado">Cromado</option>
          </select>
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
          prioridade máxima • desconto de lançamento • avisos oficiais
        </div>
        <Button
          type="submit"
          disabled={disabled}
          className={cn(
            "w-full !rounded-none border-2 border-black bg-[color:var(--accent)] px-7 py-4 text-center text-lg font-black uppercase tracking-wide text-black disabled:cursor-not-allowed sm:w-auto",
            disabled
              ? "opacity-60"
              : "shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent)_28%,transparent),0_0_34px_0_color-mix(in_srgb,var(--glow)_35%,transparent)] hover:brightness-105",
          )}
        >
          {status === "ok" ? "CADASTRADO. VAI CORINTHIANS." : status === "sending" ? "RESERVANDO..." : "RESERVAR MEU ACESSO ANTECIPADO"}
        </Button>
      </div>

      {status === "ok" ? (
        <div className="mt-5 border border-white/15 bg-black px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
          Tudo certo. Você tá na lista. Quando abrir o Lote 01, a gente chama primeiro.
        </div>
      ) : null}
    </form>
  )
}
