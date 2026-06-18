import { useEffect, useMemo, useState } from "react"

export function useTypewriter(text: string, speedMs = 22, startDelayMs = 250) {
  const chars = useMemo(() => Array.from(text), [text])
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(0)
    let intervalId: number | undefined
    const startTimeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setCount((c) => (c >= chars.length ? c : c + 1))
      }, speedMs)
    }, startDelayMs)

    return () => {
      window.clearTimeout(startTimeoutId)
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [chars.length, speedMs, startDelayMs, text])

  const value = chars.slice(0, count).join("")
  const done = count >= chars.length

  return { value, done }
}

