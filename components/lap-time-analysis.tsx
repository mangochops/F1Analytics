"use client"

import { useEffect, useRef, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchLapTimeData } from "@/lib/data-fetcher"

interface LapTime {
  lap: number
  time: number
  sector1: number
  sector2: number
  sector3: number
  compound: string
}

interface DriverLapTimes {
  driver: string
  team: string
  teamColor: string
  lapTimes: LapTime[]
}

export function LapTimeAnalysis() {
  const [driver, setDriver] = useState("VER")
  const [lapTimeData, setLapTimeData] = useState<Record<string, DriverLapTimes>>({})
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchLapTimeData()
        setLapTimeData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading lap time data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (!canvasRef.current || loading || !lapTimeData[driver]) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const data = lapTimeData[driver].lapTimes

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set up chart dimensions
    const padding = { top: 20, right: 30, bottom: 40, left: 50 }
    const chartWidth = canvasRef.current.width - padding.left - padding.right
    const chartHeight = canvasRef.current.height - padding.top - padding.bottom

    // Find min and max values for scaling
    const minTime = Math.min(...data.map((d) => d.time)) - 0.5
    const maxTime = Math.max(...data.map((d) => d.time)) + 0.5
    const timeRange = maxTime - minTime

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
      const timeValue = minTime + (i / numYLines) * timeRange

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

    data.forEach((d, i) => {
      if (i % 2 === 0) {
        // Show every other lap number to avoid crowding
        const x = padding.left + i * xStep
        ctx.font = "10px Arial"
        ctx.fillStyle = "#999"
        ctx.fillText(d.lap.toString(), x, canvasRef.current.height - padding.bottom + 15)
      }
    })

    // Draw title
    ctx.font = "14px Arial"
    ctx.fillStyle = "#fff"
    ctx.textAlign = "center"
    ctx.fillText(`${driver} Lap Time Progression`, canvasRef.current.width / 2, padding.top - 5)

    // Draw tire compound indicators
    let currentCompound = ""
    let compoundStartLap = 0

    const tireColors: Record<string, string> = {
      soft: "#FF0000",
      medium: "#FFCC00",
      hard: "#FFFFFF",
      intermediate: "#00FF00",
      wet: "#0000FF",
    }

    data.forEach((d, i) => {
      if (d.compound !== currentCompound) {
        if (currentCompound !== "") {
          // Draw the previous compound section
          const startX = padding.left + compoundStartLap * xStep
          const endX = padding.left + i * xStep
          const width = endX - startX

          ctx.fillStyle = `${tireColors[currentCompound]}22` // Add transparency
          ctx.fillRect(startX, padding.top, width, chartHeight)

          // Add compound label
          ctx.font = "10px Arial"
          ctx.fillStyle = tireColors[currentCompound]
          ctx.textAlign = "center"
          ctx.fillText(currentCompound.toUpperCase(), startX + width / 2, padding.top + 10)
        }

        currentCompound = d.compound
        compoundStartLap = i
      }
    })

    // Draw the last compound section
    if (currentCompound !== "") {
      const startX = padding.left + compoundStartLap * xStep
      const endX = padding.left + (data.length - 1) * xStep
      const width = endX - startX

      ctx.fillStyle = `${tireColors[currentCompound]}22` // Add transparency
      ctx.fillRect(startX, padding.top, width, chartHeight)

      // Add compound label
      ctx.font = "10px Arial"
      ctx.fillStyle = tireColors[currentCompound]
      ctx.textAlign = "center"
      ctx.fillText(currentCompound.toUpperCase(), startX + width / 2, padding.top + 10)
    }

    // Draw line chart
    ctx.beginPath()
    data.forEach((d, i) => {
      const x = padding.left + i * xStep
      const y = canvasRef.current.height - padding.bottom - (d.time - minTime) * (chartHeight / timeRange)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.strokeStyle = lapTimeData[driver].teamColor
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw data points
    data.forEach((d, i) => {
      const x = padding.left + i * xStep
      const y = canvasRef.current.height - padding.bottom - (d.time - minTime) * (chartHeight / timeRange)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = lapTimeData[driver].teamColor
      ctx.fill()
    })
  }, [driver, lapTimeData, loading])

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center">Loading lap time data...</div>
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="driver-select" className="text-sm font-medium block mb-1.5 text-gray-300">
          Driver
        </label>
        <Select value={driver} onValueChange={setDriver}>
          <SelectTrigger id="driver-select" className="bg-[#2A2A3A] border-[#3D3D4D] text-white">
            <SelectValue placeholder="Select driver" />
          </SelectTrigger>
          <SelectContent className="bg-[#2A2A3A] border-[#3D3D4D] text-white">
            <SelectItem value="VER">Verstappen</SelectItem>
            <SelectItem value="PER">Perez</SelectItem>
            <SelectItem value="LEC">Leclerc</SelectItem>
            <SelectItem value="SAI">Sainz</SelectItem>
            <SelectItem value="HAM">Hamilton</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full h-[200px]">
        <canvas ref={canvasRef} width={500} height={200} className="w-full h-full"></canvas>
      </div>

      <div className="text-sm text-gray-400 text-center">Lap times with tire compounds</div>
    </div>
  )
}

