"use client"

import { useEffect, useRef, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchTelemetryData } from "@/lib/data-fetcher"

interface TelemetryPoint {
  distance: number
  speed: number
  throttle: number
  brake: number
  gear: number
  rpm: number
  drs: number
}

interface DriverTelemetry {
  driver: string
  team: string
  teamColor: string
  data: TelemetryPoint[]
}

export function TelemetryChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [telemetryType, setTelemetryType] = useState<"speed" | "throttle" | "brake" | "gear">("speed")
  const [driver1, setDriver1] = useState("VER")
  const [driver2, setDriver2] = useState("LEC")
  const [telemetryData, setTelemetryData] = useState<Record<string, DriverTelemetry>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTelemetryData()
        setTelemetryData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading telemetry data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (!canvasRef.current || loading || Object.keys(telemetryData).length === 0) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const driver1Data = telemetryData[driver1]?.data || []
    const driver2Data = telemetryData[driver2]?.data || []

    if (driver1Data.length === 0 || driver2Data.length === 0) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set up chart dimensions
    const padding = { top: 20, right: 30, bottom: 40, left: 50 }
    const chartWidth = canvasRef.current.width - padding.left - padding.right
    const chartHeight = canvasRef.current.height - padding.top - padding.bottom

    // Find min and max values for scaling based on telemetry type
    let minValue = Number.MAX_VALUE
    let maxValue = Number.MIN_VALUE

    const getValue = (point: TelemetryPoint) => {
      switch (telemetryType) {
        case "speed":
          return point.speed
        case "throttle":
          return point.throttle
        case "brake":
          return point.brake
        case "gear":
          return point.gear
        default:
          return point.speed
      }
    }

    driver1Data.forEach((point) => {
      const value = getValue(point)
      if (value < minValue) minValue = value
      if (value > maxValue) maxValue = value
    })

    driver2Data.forEach((point) => {
      const value = getValue(point)
      if (value < minValue) minValue = value
      if (value > maxValue) maxValue = value
    })

    // Add some padding to the min/max values
    if (telemetryType !== "gear") {
      minValue = Math.max(0, minValue - (maxValue - minValue) * 0.1)
      maxValue += (maxValue - minValue) * 0.1
    } else {
      // For gears, we want integer values
      minValue = Math.floor(minValue)
      maxValue = Math.ceil(maxValue)
    }

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, canvasRef.current.height - padding.bottom)
    ctx.lineTo(canvasRef.current.width - padding.right, canvasRef.current.height - padding.bottom)
    ctx.strokeStyle = "#3D3D4D"
    ctx.stroke()

    // Draw grid lines and y-axis labels
    const numYLines = telemetryType === "gear" ? maxValue - minValue : 5
    ctx.textAlign = "right"
    ctx.font = "10px Arial"
    ctx.fillStyle = "#999"

    for (let i = 0; i <= numYLines; i++) {
      const y = padding.top + (i / numYLines) * chartHeight
      const value = maxValue - (i / numYLines) * (maxValue - minValue)

      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(canvasRef.current.width - padding.right, y)
      ctx.strokeStyle = "#2A2A3A"
      ctx.stroke()

      let label = value.toFixed(telemetryType === "gear" ? 0 : 1)
      if (telemetryType === "throttle" || telemetryType === "brake") {
        label += "%"
      } else if (telemetryType === "speed") {
        label += " km/h"
      }

      ctx.fillText(label, padding.left - 5, y + 3)
    }

    // Draw x-axis labels (distance)
    ctx.textAlign = "center"
    const maxDistance = Math.max(
      driver1Data[driver1Data.length - 1].distance,
      driver2Data[driver2Data.length - 1].distance,
    )

    for (let dist = 0; dist <= maxDistance; dist += 500) {
      const x = padding.left + (dist / maxDistance) * chartWidth

      ctx.beginPath()
      ctx.moveTo(x, canvasRef.current.height - padding.bottom)
      ctx.lineTo(x, canvasRef.current.height - padding.bottom + 5)
      ctx.strokeStyle = "#3D3D4D"
      ctx.stroke()

      ctx.fillText(`${dist}m`, x, canvasRef.current.height - padding.bottom + 20)
    }

    // Draw title
    ctx.font = "14px Arial"
    ctx.fillStyle = "#fff"
    ctx.textAlign = "center"

    const titleMap = {
      speed: "Speed Comparison",
      throttle: "Throttle Application",
      brake: "Brake Application",
      gear: "Gear Changes",
    }

    ctx.fillText(titleMap[telemetryType], canvasRef.current.width / 2, padding.top - 5)

    // Draw lines for each driver
    const drawDriverData = (data: TelemetryPoint[], color: string) => {
      if (telemetryType === "gear") {
        // For gears, draw as steps
        ctx.beginPath()

        let prevX = padding.left
        let prevY =
          canvasRef.current.height - padding.bottom - ((data[0].gear - minValue) / (maxValue - minValue)) * chartHeight

        ctx.moveTo(prevX, prevY)

        data.forEach((point, i) => {
          if (i === 0) return

          const x = padding.left + (point.distance / maxDistance) * chartWidth
          const y =
            canvasRef.current.height - padding.bottom - ((point.gear - minValue) / (maxValue - minValue)) * chartHeight

          // Draw horizontal line to current x
          ctx.lineTo(x, prevY)
          // Draw vertical line to new y
          ctx.lineTo(x, y)

          prevX = x
          prevY = y
        })

        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.stroke()
      } else {
        // For other metrics, draw as lines
        ctx.beginPath()

        data.forEach((point, i) => {
          const x = padding.left + (point.distance / maxDistance) * chartWidth
          const value = getValue(point)
          const y =
            canvasRef.current.height - padding.bottom - ((value - minValue) / (maxValue - minValue)) * chartHeight

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }

    // Draw DRS zones if showing speed
    if (telemetryType === "speed") {
      // Find DRS zones
      const drsZones: { start: number; end: number }[] = []
      let inDrsZone = false
      let drsStart = 0

      driver1Data.forEach((point, i) => {
        if (point.drs > 0 && !inDrsZone) {
          inDrsZone = true
          drsStart = point.distance
        } else if (point.drs === 0 && inDrsZone) {
          inDrsZone = false
          drsZones.push({ start: drsStart, end: point.distance })
        }
      })

      // If still in DRS zone at the end
      if (inDrsZone) {
        drsZones.push({ start: drsStart, end: driver1Data[driver1Data.length - 1].distance })
      }

      // Draw DRS zones
      drsZones.forEach((zone) => {
        const startX = padding.left + (zone.start / maxDistance) * chartWidth
        const endX = padding.left + (zone.end / maxDistance) * chartWidth
        const width = endX - startX

        ctx.fillStyle = "rgba(0, 200, 0, 0.1)"
        ctx.fillRect(startX, padding.top, width, chartHeight)

        ctx.font = "10px Arial"
        ctx.fillStyle = "#00c800"
        ctx.textAlign = "center"
        ctx.fillText("DRS", startX + width / 2, padding.top + 15)
      })
    }

    // Draw driver data
    drawDriverData(driver1Data, telemetryData[driver1].teamColor)
    drawDriverData(driver2Data, telemetryData[driver2].teamColor)

    // Draw legend
    const legendX = canvasRef.current.width - padding.right - 100
    const legendY = padding.top + 20

    // Driver 1
    ctx.beginPath()
    ctx.rect(legendX, legendY - 5, 15, 2)
    ctx.fillStyle = telemetryData[driver1].teamColor
    ctx.fill()

    ctx.fillStyle = "#fff"
    ctx.textAlign = "left"
    ctx.font = "12px Arial"
    ctx.fillText(driver1, legendX + 20, legendY)

    // Driver 2
    ctx.beginPath()
    ctx.rect(legendX, legendY + 15, 15, 2)
    ctx.fillStyle = telemetryData[driver2].teamColor
    ctx.fill()

    ctx.fillStyle = "#fff"
    ctx.textAlign = "left"
    ctx.font = "12px Arial"
    ctx.fillText(driver2, legendX + 20, legendY + 20)
  }, [telemetryData, driver1, driver2, telemetryType, loading])

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center">Loading telemetry data...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="driver1-select" className="text-sm font-medium block mb-1.5 text-gray-300">
            Driver 1
          </label>
          <Select value={driver1} onValueChange={setDriver1}>
            <SelectTrigger id="driver1-select" className="bg-[#2A2A3A] border-[#3D3D4D] text-white">
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

        <div className="flex-1">
          <label htmlFor="driver2-select" className="text-sm font-medium block mb-1.5 text-gray-300">
            Driver 2
          </label>
          <Select value={driver2} onValueChange={setDriver2}>
            <SelectTrigger id="driver2-select" className="bg-[#2A2A3A] border-[#3D3D4D] text-white">
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
      </div>

      <Tabs value={telemetryType} onValueChange={(v) => setTelemetryType(v as any)} className="space-y-4">
        <TabsList className="bg-[#2A2A3A] p-1 w-full grid grid-cols-4">
          <TabsTrigger value="speed" className="data-[state=active]:bg-[#E10600] data-[state=active]:text-white">
            Speed
          </TabsTrigger>
          <TabsTrigger value="throttle" className="data-[state=active]:bg-[#E10600] data-[state=active]:text-white">
            Throttle
          </TabsTrigger>
          <TabsTrigger value="brake" className="data-[state=active]:bg-[#E10600] data-[state=active]:text-white">
            Brake
          </TabsTrigger>
          <TabsTrigger value="gear" className="data-[state=active]:bg-[#E10600] data-[state=active]:text-white">
            Gear
          </TabsTrigger>
        </TabsList>

        <div className="w-full h-[300px]">
          <canvas ref={canvasRef} width={800} height={300} className="w-full h-full"></canvas>
        </div>
      </Tabs>
    </div>
  )
}

