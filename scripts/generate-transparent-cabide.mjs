import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { PNG } from "pngjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, "..")
const inputPath = path.join(projectRoot, "public", "cabide-base.png")
const outputPath = path.join(projectRoot, "public", "cabide-base-transparent.png")
const maskPath = path.join(projectRoot, "public", "cabide-base-mask.png")

const png = PNG.sync.read(fs.readFileSync(inputPath))
const { width, height, data } = png

const background = sampleBackgroundColor(data, width, height)
const pixelCount = width * height
const visited = new Uint8Array(pixelCount)
const queue = new Int32Array(pixelCount)
let start = 0
let end = 0

const bgTolerance = 24
const featherLow = 12
const featherHigh = 38

const enqueue = (index) => {
  if (index < 0 || index >= pixelCount || visited[index]) return
  if (!isBackgroundLike(data, index, background, bgTolerance)) return
  visited[index] = 1
  queue[end] = index
  end += 1
}

for (let x = 0; x < width; x += 1) {
  enqueue(x)
  enqueue((height - 1) * width + x)
}

for (let y = 0; y < height; y += 1) {
  enqueue(y * width)
  enqueue(y * width + (width - 1))
}

while (start < end) {
  const index = queue[start]
  start += 1

  const x = index % width
  const y = Math.floor(index / width)

  if (x > 0) enqueue(index - 1)
  if (x < width - 1) enqueue(index + 1)
  if (y > 0) enqueue(index - width)
  if (y < height - 1) enqueue(index + width)
}

for (let index = 0; index < pixelCount; index += 1) {
  const i = index * 4
  if (visited[index]) {
    data[i + 3] = 0
    continue
  }

  const dist = distance(
    data[i],
    data[i + 1],
    data[i + 2],
    background.r,
    background.g,
    background.b,
  )

  if (touchesBackground(visited, width, height, index) && dist < featherHigh) {
    const alphaRatio = clamp((dist - featherLow) / Math.max(featherHigh - featherLow, 1), 0.18, 1)
    const alpha = Math.round(alphaRatio * 255)
    data[i + 3] = alpha
    data[i] = unblendChannel(data[i], background.r, alphaRatio)
    data[i + 1] = unblendChannel(data[i + 1], background.g, alphaRatio)
    data[i + 2] = unblendChannel(data[i + 2], background.b, alphaRatio)
  } else {
    data[i + 3] = 255
  }
}

fs.writeFileSync(outputPath, PNG.sync.write(png))
fs.writeFileSync(maskPath, PNG.sync.write(createSolidMask(png)))
console.log(`Generated ${outputPath}`)
console.log(`Generated ${maskPath}`)

function sampleBackgroundColor(rgba, imageWidth, imageHeight) {
  const margin = Math.max(8, Math.floor(Math.min(imageWidth, imageHeight) * 0.02))
  let r = 0
  let g = 0
  let b = 0
  let count = 0

  for (let y = 0; y < imageHeight; y += 1) {
    for (let x = 0; x < imageWidth; x += 1) {
      if (x >= margin && x < imageWidth - margin && y >= margin && y < imageHeight - margin) {
        continue
      }
      const i = (y * imageWidth + x) * 4
      r += rgba[i]
      g += rgba[i + 1]
      b += rgba[i + 2]
      count += 1
    }
  }

  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
  }
}

function isBackgroundLike(rgba, index, backgroundColor, tolerance) {
  const i = index * 4
  return (
    distance(
      rgba[i],
      rgba[i + 1],
      rgba[i + 2],
      backgroundColor.r,
      backgroundColor.g,
      backgroundColor.b,
    ) <= tolerance
  )
}

function touchesBackground(mask, imageWidth, imageHeight, index) {
  const x = index % imageWidth
  const y = Math.floor(index / imageWidth)

  for (let oy = -1; oy <= 1; oy += 1) {
    for (let ox = -1; ox <= 1; ox += 1) {
      if (ox === 0 && oy === 0) continue
      const nx = x + ox
      const ny = y + oy
      if (nx < 0 || ny < 0 || nx >= imageWidth || ny >= imageHeight) continue
      if (mask[ny * imageWidth + nx]) return true
    }
  }

  return false
}

function unblendChannel(value, backgroundValue, alphaRatio) {
  return clamp(
    Math.round((value - backgroundValue * (1 - alphaRatio)) / Math.max(alphaRatio, 0.01)),
    0,
    255,
  )
}

function distance(r1, g1, b1, r2, g2, b2) {
  const dr = r1 - r2
  const dg = g1 - g2
  const db = b1 - b2
  return Math.sqrt(dr * dr + dg * dg + db * db)
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function createSolidMask(sourcePng) {
  const mask = new PNG({ width: sourcePng.width, height: sourcePng.height })

  for (let i = 0; i < sourcePng.data.length; i += 4) {
    const alpha = sourcePng.data[i + 3]
    const solidAlpha = alpha >= 210 ? 255 : 0
    mask.data[i] = 255
    mask.data[i + 1] = 255
    mask.data[i + 2] = 255
    mask.data[i + 3] = solidAlpha
  }

  return mask
}
