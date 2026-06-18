import { useEffect, useState } from "react"

export function useChromaKeyImage(src: string, threshold = 248, removeShadow = false) {
  return useProcessedChromaKey(src, threshold, false, removeShadow)
}

export function useChromaKeyMask(src: string, threshold = 248) {
  return useProcessedChromaKey(src, threshold, true, false)
}

function useProcessedChromaKey(
  src: string,
  threshold: number,
  solidMask: boolean,
  removeShadow: boolean,
) {
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src

    img.onload = () => {
      const w = img.naturalWidth || img.width
      const h = img.naturalHeight || img.height
      if (!w || !h) {
        setResult(src)
        return
      }

      const canvas = document.createElement("canvas")
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) {
        setResult(src)
        return
      }

      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, w, h)
      const data = imageData.data
      const pixelCount = w * h
      const visited = new Uint8Array(pixelCount)
      const background = sampleBackgroundColor(data, w, h)
      const queue = new Int32Array(pixelCount)
      let queueStart = 0
      let queueEnd = 0

      const bgTolerance = Math.max(10, 255 - threshold + 18)
      const featherLow = Math.max(6, bgTolerance - 10)
      const featherHigh = bgTolerance + 18

      const isBgLike = (index: number) => {
        const i = index * 4
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        return colorDistance(r, g, b, background.r, background.g, background.b) <= bgTolerance
      }

      const enqueue = (index: number) => {
        if (index < 0 || index >= pixelCount || visited[index]) return
        if (!isBgLike(index)) return
        visited[index] = 1
        queue[queueEnd] = index
        queueEnd += 1
      }

      for (let x = 0; x < w; x += 1) {
        enqueue(x)
        enqueue((h - 1) * w + x)
      }
      for (let y = 0; y < h; y += 1) {
        enqueue(y * w)
        enqueue(y * w + (w - 1))
      }

      while (queueStart < queueEnd) {
        const index = queue[queueStart]
        queueStart += 1

        const x = index % w
        const y = Math.floor(index / w)

        if (x > 0) enqueue(index - 1)
        if (x < w - 1) enqueue(index + 1)
        if (y > 0) enqueue(index - w)
        if (y < h - 1) enqueue(index + w)
      }

      for (let index = 0; index < pixelCount; index += 1) {
        const i = index * 4
        if (visited[index]) {
          data[i + 3] = 0
          continue
        }

        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const diff = colorDistance(r, g, b, background.r, background.g, background.b)

        if (touchesBackground(visited, w, h, index) && diff < featherHigh) {
          const alphaRatio = clamp((diff - featherLow) / Math.max(featherHigh - featherLow, 1), 0.22, 1)
          const alpha = Math.round(alphaRatio * 255)
          data[i + 3] = alpha

          data[i] = unblendChannel(r, background.r, alphaRatio)
          data[i + 1] = unblendChannel(g, background.g, alphaRatio)
          data[i + 2] = unblendChannel(b, background.b, alphaRatio)
        }
      }

      if (removeShadow && !solidMask) {
        for (let index = 0; index < pixelCount; index += 1) {
          const i = index * 4
          const a = data[i + 3]
          if (a === 0) continue
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const luminance = r * 0.2126 + g * 0.7152 + b * 0.0722
          if (luminance < 120) {
            data[i + 3] = 0
          }
        }
      }

      if (solidMask) {
        const mask = new Uint8Array(pixelCount)
        for (let index = 0; index < pixelCount; index += 1) {
          const alpha = data[index * 4 + 3]
          mask[index] = alpha >= 220 ? 255 : 0
        }

        const dilated = new Uint8Array(pixelCount)
        for (let index = 0; index < pixelCount; index += 1) {
          if (mask[index]) {
            dilated[index] = 255
            continue
          }
          if (data[index * 4 + 3] < 60) continue

          const x = index % w
          const y = Math.floor(index / w)
          let hit = false

          for (let oy = -1; oy <= 1 && !hit; oy += 1) {
            for (let ox = -1; ox <= 1; ox += 1) {
              if (ox === 0 && oy === 0) continue
              const nx = x + ox
              const ny = y + oy
              if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue
              if (mask[ny * w + nx]) {
                hit = true
                break
              }
            }
          }

          dilated[index] = hit ? 255 : 0
        }

        for (let index = 0; index < pixelCount; index += 1) {
          const i = index * 4
          data[i] = 255
          data[i + 1] = 255
          data[i + 2] = 255
          data[i + 3] = dilated[index]
        }
      }

      ctx.putImageData(imageData, 0, 0)
      const url = canvas.toDataURL("image/png")
      if (!cancelled) {
        setResult(url)
      }
    }

    img.onerror = () => {
      if (!cancelled) {
        setResult(src)
      }
    }

    return () => {
      cancelled = true
    }
  }, [removeShadow, solidMask, src, threshold])

  return result ?? src
}

function sampleBackgroundColor(data: Uint8ClampedArray, width: number, height: number) {
  const margin = Math.max(6, Math.floor(Math.min(width, height) * 0.02))
  let r = 0
  let g = 0
  let b = 0
  let count = 0

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (x >= margin && x < width - margin && y >= margin && y < height - margin) {
        continue
      }
      const i = (y * width + x) * 4
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      count += 1
    }
  }

  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
  }
}

function colorDistance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) {
  const dr = r1 - r2
  const dg = g1 - g2
  const db = b1 - b2
  return Math.sqrt(dr * dr + dg * dg + db * db)
}

function touchesBackground(visited: Uint8Array, width: number, height: number, index: number) {
  const x = index % width
  const y = Math.floor(index / width)

  for (let oy = -1; oy <= 1; oy += 1) {
    for (let ox = -1; ox <= 1; ox += 1) {
      if (ox === 0 && oy === 0) continue
      const nx = x + ox
      const ny = y + oy
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
      if (visited[ny * width + nx]) return true
    }
  }

  return false
}

function unblendChannel(value: number, background: number, alpha: number) {
  return clamp(Math.round((value - background * (1 - alpha)) / Math.max(alpha, 0.01)), 0, 255)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

