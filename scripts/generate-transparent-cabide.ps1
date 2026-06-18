Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$inputPath = Join-Path $projectRoot "public\\cabide-base.png"
$outputPath = Join-Path $projectRoot "public\\cabide-base-transparent.png"

$bitmap = [System.Drawing.Bitmap]::FromFile($inputPath)
$width = $bitmap.Width
$height = $bitmap.Height

function Get-BackgroundColor {
    param([System.Drawing.Bitmap]$bmp)

    $margin = [Math]::Max(8, [int]([Math]::Min($bmp.Width, $bmp.Height) * 0.02))
    $sumR = 0L
    $sumG = 0L
    $sumB = 0L
    $count = 0L

    for ($y = 0; $y -lt $bmp.Height; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            if ($x -ge $margin -and $x -lt ($bmp.Width - $margin) -and $y -ge $margin -and $y -lt ($bmp.Height - $margin)) {
                continue
            }

            $c = $bmp.GetPixel($x, $y)
            $sumR += $c.R
            $sumG += $c.G
            $sumB += $c.B
            $count += 1
        }
    }

    return [System.Drawing.Color]::FromArgb(
        [int]($sumR / $count),
        [int]($sumG / $count),
        [int]($sumB / $count)
    )
}

function Get-DistanceSq {
    param(
        [int]$r1,
        [int]$g1,
        [int]$b1,
        [int]$r2,
        [int]$g2,
        [int]$b2
    )

    $dr = $r1 - $r2
    $dg = $g1 - $g2
    $db = $b1 - $b2
    return ($dr * $dr + $dg * $dg + $db * $db)
}

$bg = Get-BackgroundColor $bitmap
$bgTolerance = 24
$featherLow = 12
$featherHigh = 38
$bgToleranceSq = $bgTolerance * $bgTolerance
$featherHighSq = $featherHigh * $featherHigh

$visited = [bool[]]::new($width * $height)
$queue = New-Object "System.Collections.Generic.Queue[int]"

function Try-Enqueue {
    param(
        [int]$x,
        [int]$y
    )

    if ($x -lt 0 -or $y -lt 0 -or $x -ge $width -or $y -ge $height) {
        return
    }

    $idx = $y * $width + $x
    if ($visited[$idx]) {
        return
    }

    $c = $bitmap.GetPixel($x, $y)
    $distSq = Get-DistanceSq $c.R $c.G $c.B $bg.R $bg.G $bg.B
    if ($distSq -le $bgToleranceSq) {
        $visited[$idx] = $true
        $queue.Enqueue($idx)
    }
}

for ($x = 0; $x -lt $width; $x++) {
    Try-Enqueue $x 0
    Try-Enqueue $x ($height - 1)
}

for ($y = 0; $y -lt $height; $y++) {
    Try-Enqueue 0 $y
    Try-Enqueue ($width - 1) $y
}

while ($queue.Count -gt 0) {
    $idx = $queue.Dequeue()
    $x = $idx % $width
    $y = [int]($idx / $width)

    Try-Enqueue ($x - 1) $y
    Try-Enqueue ($x + 1) $y
    Try-Enqueue $x ($y - 1)
    Try-Enqueue $x ($y + 1)
}

$result = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $idx = $y * $width + $x
        $src = $bitmap.GetPixel($x, $y)

        if ($visited[$idx]) {
            $result.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            continue
        }

        $touchesBg = $false
        for ($oy = -1; $oy -le 1 -and -not $touchesBg; $oy++) {
            for ($ox = -1; $ox -le 1; $ox++) {
                if ($ox -eq 0 -and $oy -eq 0) {
                    continue
                }

                $nx = $x + $ox
                $ny = $y + $oy
                if ($nx -lt 0 -or $ny -lt 0 -or $nx -ge $width -or $ny -ge $height) {
                    continue
                }

                if ($visited[$ny * $width + $nx]) {
                    $touchesBg = $true
                    break
                }
            }
        }

        $distSq = Get-DistanceSq $src.R $src.G $src.B $bg.R $bg.G $bg.B
        if ($touchesBg -and $distSq -lt $featherHighSq) {
            $dist = [Math]::Sqrt([double]$distSq)
            $alphaRatio = ($dist - $featherLow) / [Math]::Max(($featherHigh - $featherLow), 1)
            if ($alphaRatio -lt 0.18) { $alphaRatio = 0.18 }
            if ($alphaRatio -gt 1) { $alphaRatio = 1 }

            $alpha = [int][Math]::Round($alphaRatio * 255)
            $newR = [int][Math]::Round(($src.R - $bg.R * (1 - $alphaRatio)) / [Math]::Max($alphaRatio, 0.01))
            $newG = [int][Math]::Round(($src.G - $bg.G * (1 - $alphaRatio)) / [Math]::Max($alphaRatio, 0.01))
            $newB = [int][Math]::Round(($src.B - $bg.B * (1 - $alphaRatio)) / [Math]::Max($alphaRatio, 0.01))

            $newR = [Math]::Min(255, [Math]::Max(0, $newR))
            $newG = [Math]::Min(255, [Math]::Max(0, $newG))
            $newB = [Math]::Min(255, [Math]::Max(0, $newB))

            $result.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $newR, $newG, $newB))
        }
        else {
            $result.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $src.R, $src.G, $src.B))
        }
    }
}

$result.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose()
$result.Dispose()

Write-Output "Generated: $outputPath"
