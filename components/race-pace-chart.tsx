"use client"

import { useEffect, useRef, useState } from "react"
import { fetchRacePaceData } from "@/lib/data-fetcher"

interface RacePaceData {
  lap: number
  VER: number
  PER: number
  LEC: number
  HAM: number
  RUS: number
}

export function RacePaceChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>(["VER", "PER", "LEC"])
  const [data, setData] = useState<RacePaceData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const paceData = await fetchRacePaceData()
        setData(paceData)
        setLoading(false)
      } catch (error) {
        console.error("Error loading race pace data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (!canvasRef.current || loading || data.length === 0) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set up chart dimensions
    const padding = { top: 20, right: 30, bottom: 40, left: 50 }
    const chartWidth = canvasRef.current.width - padding.left - padding.right
    const chartHeight = canvasRef.current.height - padding.top - padding.bottom

    // Find min and max values for scaling
    let minLapTime = Number.MAX_VALUE
    let maxLapTime = Number.MIN_VALUE

    selectedDrivers.forEach((driver) => {
      data.forEach((lap) => {
        if (lap[driver as keyof typeof lap] < minLapTime) {
          minLapTime = lap[driver as keyof typeof lap] as number
        }
        if (lap[driver as keyof typeof lap] > maxLapTime) {
          maxLapTime = lap[driver as keyof typeof lap] as number
        }
      })
    })

    // Add some padding to the min/max values
    minLapTime -= 0.5
    maxLapTime += 0.5

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, canvasRef.current.height - padding.bottom)
    ctx.lineTo(canvasRef.current.width - padding.right, canvasRef.current.height - padding.bottom)
    ctx.strokeStyle = "#3D3D4D"
    ctx.stroke()

    // Draw grid lines and y-axis labels
    const numYLines = 5
    ctx.textAlign = "right"
    ctx.font = "10px Arial"
    ctx.fillStyle = "#999"

    for (let i = 0; i <= numYLines; i++) {
      const y = padding.top + (i / numYLines) * chartHeight
      const timeValue = maxLapTime - (i / numYLines) * (maxLapTime - minLapTime)

      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(canvasRef.current.width - padding.right, y)
      ctx.strokeStyle = "#2A2A3A"
      ctx.stroke()

      ctx.fillText(timeValue.toFixed(1), padding.left - 5, y + 3)
    }

    // Draw x-axis labels
    ctx.textAlign = "center"
    const xStep = chartWidth / (data.length - 1)

    for (let i = 0; i < data.length; i += 5) {
      // Show every 5th lap number
      const x = padding.left + i * xStep
      const lap = data[i].lap

      ctx.fillText(`Lap ${lap}`, x, canvasRef.current.height - padding.bottom + 15)
    }

    // Draw title
    ctx.font = "14px Arial"
    ctx.fillStyle = "#fff"
    ctx.textAlign = "center"
    ctx.fillText("Race Pace Comparison", canvasRef.current.width / 2, padding.top - 5)

    // Draw lines for each selected driver
    const driverColors: Record<string, string> = {
      VER: "#0600EF", // Red Bull
      PER: "#0600EF", // Red Bull
      LEC: "#FF0000", // Ferrari
      SAI: "#FF0000", // Ferrari
      HAM: "#00D2BE", // Mercedes
      RUS: "#00D2BE", // Mercedes
    }

    selectedDrivers.forEach((driver) => {
      ctx.beginPath()

      data.forEach((lap, i) => {
        const x = padding.left + i * xStep
        const lapTime = lap[driver as keyof typeof lap] as number
        const y = padding.top + ((maxLapTime - lapTime) / (maxLapTime - minLapTime)) * chartHeight

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.strokeStyle = driverColors[driver] || "#999"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw data points
      data.forEach((lap, i) => {
        const x = padding.left + i * xStep
        const lapTime = lap[driver as keyof typeof lap] as number
        const y = padding.top + ((maxLapTime - lapTime) / (maxLapTime - minLapTime)) * chartHeight

        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = driverColors[driver] || "#999"
        ctx.fill()
      })
    })

    // Draw legend
    const legendX = canvasRef.current.width - padding.right - 100
    const legendY = padding.top + 20

    selectedDrivers.forEach((driver, i) => {
      const y = legendY + i * 20

      ctx.beginPath()
      ctx.rect(legendX, y - 5, 15, 2)
      ctx.fillStyle = driverColors[driver] || "#999"
      ctx.fill()

      ctx.fillStyle = "#fff"
      ctx.textAlign = "left"
      ctx.font = "12px Arial"
      ctx.fillText(driver, legendX + 20, y)
    })
  }, [data, selectedDrivers, loading])

  const toggleDriver = (driver: string) => {
    setSelectedDrivers((prev) => (prev.includes(driver) ? prev.filter((d) => d !== driver) : [...prev, driver]))
  }

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center">Loading race pace data...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => toggleDriver("VER")}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedDrivers.includes("VER") ? "bg-[#0600EF] text-white" : "bg-[#2A2A3A] text-gray-400"
          }`}
        >
          VER
        </button>
        <button
          onClick={() => toggleDriver("PER")}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedDrivers.includes("PER") ? "bg-[#0600EF] text-white" : "bg-[#2A2A3A] text-gray-400"
          }`}
        >
          PER
        </button>
        <button
          onClick={() => toggleDriver("LEC")}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedDrivers.includes("LEC") ? "bg-[#FF0000] text-white" : "bg-[#2A2A3A] text-gray-400"
          }`}
        >
          LEC
        </button>
        <button
          onClick={() => toggleDriver("HAM")}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedDrivers.includes("HAM") ? "bg-[#00D2BE] text-white" : "bg-[#2A2A3A] text-gray-400"
          }`}
        >
          HAM
        </button>
        <button
          onClick={() => toggleDriver("RUS")}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedDrivers.includes("RUS") ? "bg-[#00D2BE] text-white" : "bg-[#2A2A3A] text-gray-400"
          }`}
        >
          RUS
        </button>
      </div>

      <div className="w-full h-[300px]">
        <canvas ref={canvasRef} width={800} height={300} className="w-full h-full"></canvas>
      </div>
    </div>
  )
}

