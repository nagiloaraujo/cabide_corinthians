import { cn } from "@/lib/utils"
import type React from "react"
import { useState } from "react"
import Button from "@/components/ui/Button"

type FormState = {
  name: string
  email: string
  whatsapp: string
  city: string
}

type NewsletterFormProps = {
  className?: string
}

export default function NewsletterForm({ className }: NewsletterFormProps) {
  const [state, setState] = useState<FormState>({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "ok">("idle")

  const onChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((s) => ({ ...s, [key]: e.target.value }))
      setStatus("idle")
    }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!state.email.trim()) return
    setStatus("sending")
    window.setTimeout(() => {
      const key = "cabide.newsletterLeads"
      const raw = window.localStorage.getItem(key)
      const list = raw ? safeParseLeads(raw) ?? [] : []
      list.unshift({
        name: state.name.trim(),
        email: state.email.trim(),
        whatsapp: state.whatsapp.trim(),
        city: state.city.trim(),
      })
      window.localStorage.setItem(key, JSON.stringify(list.slice(0, 200)))
      setStatus("ok")
    }, 450)
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl neon-border",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-semibold tracking-[0.28em] text-white/70">
          PRIORIDADE DA FIEL
        </div>
        <h3 className="font-[Oswald] text-2xl tracking-wide text-white">
          Entra na lista da Fiel
        </h3>
        <p className="text-sm leading-relaxed text-white/70">
          A conversão oficial (checkout) vem depois. Por enquanto, deixa seu contato e recebe
          prioridade na próxima leva e nas edições especiais.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field
          label="Nome"
          value={state.name}
          onChange={onChange("name")}
          placeholder="Seu nome"
          autoComplete="name"
          required
        />
        <Field
          label="E-mail"
          value={state.email}
          onChange={onChange("email")}
          placeholder="seunome@email.com"
          type="email"
          autoComplete="email"
          required
        />
        <Field
          label="WhatsApp"
          value={state.whatsapp}
          onChange={onChange("whatsapp")}
          placeholder="(11) 99999-9999"
          autoComplete="tel"
        />
        <Field
          label="Cidade"
          value={state.city}
          onChange={onChange("city")}
          placeholder="São Paulo - SP"
          autoComplete="address-level2"
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button className="w-full sm:w-auto" variant="primary" type="submit">
          {status === "sending" ? "ENTRANDO..." : "QUERO ENTRAR NA LISTA"}
        </Button>

        <div className="text-xs leading-relaxed text-white/60">
          {status === "ok"
            ? "Tá na lista. Quando lançar, você vai receber primeiro."
            : status === "sending"
              ? "Registrando seu interesse..."
              : "Sem spam. Só novidade oficial e prioridade de edição."}
        </div>
      </div>
    </form>
  )
}

type FieldProps = {
  label: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  type?: string
  required?: boolean
  autoComplete?: string
}

function Field({ label, value, onChange, placeholder, type, required, autoComplete }: FieldProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium tracking-wide text-white/70">{label}</span>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="h-11 rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none ring-0 transition focus:border-[color:var(--accent)]"
      />
    </label>
  )
}

function safeParseLeads(raw: string): FormState[] | null {
  try {
    const v = JSON.parse(raw) as unknown
    if (!Array.isArray(v)) return null
    return v
      .filter((x) => typeof x === "object" && x !== null)
      .map((x) => x as FormState)
  } catch {
    return null
  }
}
