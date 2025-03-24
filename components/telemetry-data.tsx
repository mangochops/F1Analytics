"use client"

import { useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TelemetryData() {
  const speedCanvasRef = useRef<HTMLCanvasElement>(null)
  const throttleCanvasRef = useRef<HTMLCanvasElement>(null)
  const brakeCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const speedCanvas = speedCanvasRef.current
    if (!speedCanvas) return
    const speedCtx = speedCanvas.getContext("2d")
    if (!speedCtx) return

    // Mock speed telemetry data
    const speedData = [
      { distance: 0, speed: 280 },
      { distance: 100, speed: 310 },
      { distance: 200, speed: 325 },
      { distance: 300, speed: 330 },
      { distance: 400, speed: 335 },
      { distance: 500, speed: 320 },
      { distance: 600, speed: 290 },
      { distance: 700, speed: 180 },
      { distance: 800, speed: 120 },
      { distance: 900, speed: 160 },
      { distance: 1000, speed: 220 },
      { distance: 1100, speed: 260 },
      { distance: 1200, speed: 290 },
    ]

    // Draw speed chart
    speedCtx.clearRect(0, 0, speedCanvas.width, speedCanvas.height)

    // Draw axes
    speedCtx.beginPath()
    speedCtx.moveTo(40, 20)
    speedCtx.lineTo(40, speedCanvas.height - 30)
    speedCtx.lineTo(speedCanvas.width - 20, speedCanvas.height - 30)
    speedCtx.strokeStyle = "#ccc"
    speedCtx.stroke()

    // Draw title
    speedCtx.font = "14px Arial"
    speedCtx.fillStyle = "#333"
    speedCtx.textAlign = "center"
    speedCtx.fillText("Speed Telemetry", speedCanvas.width / 2, 15)

    // Draw axes labels
    speedCtx.font = "10px Arial"
    speedCtx.fillStyle = "#666"
    speedCtx.textAlign = "center"
    speedCtx.fillText("Distance (m)", speedCanvas.width / 2, speedCanvas.height - 10)

    speedCtx.save()
    speedCtx.translate(15, speedCanvas.height / 2)
    speedCtx.rotate(-Math.PI / 2)
    speedCtx.textAlign = "center"
    speedCtx.fillText("Speed (km/h)", 0, 0)
    speedCtx.restore()

    // Draw speed line
    const xStep = (speedCanvas.width - 60) / speedData.length
    const yScale = (speedCanvas.height - 50) / 350 // Max speed around 350 km/h

    speedCtx.beginPath()
    speedData.forEach((d, i) => {
      const x = 40 + i * xStep + xStep / 2
      const y = speedCanvas.height - 30 - d.speed * yScale

      if (i === 0) {
        speedCtx.moveTo(x, y)
      } else {
        speedCtx.lineTo(x, y)
      }
    })
    speedCtx.strokeStyle = "#3b82f6"
    speedCtx.lineWidth = 2
    speedCtx.stroke()
  }, [])

  useEffect(() => {
    const throttleCanvas = throttleCanvasRef.current
    const brakeCanvas = brakeCanvasRef.current
    if (!throttleCanvas || !brakeCanvas) return

    const throttleCtx = throttleCanvas.getContext("2d")
    const brakeCtx = brakeCanvas.getContext("2d")
    if (!throttleCtx || !brakeCtx) return

    // Mock throttle data
    const throttleData = [
      { distance: 0, value: 100 },
      { distance: 100, value: 100 },
      { distance: 200, value: 100 },
      { distance: 300, value: 100 },
      { distance: 400, value: 100 },
      { distance: 500, value: 80 },
      { distance: 600, value: 0 },
      { distance: 700, value: 0 },
      { distance: 800, value: 0 },
      { distance: 900, value: 50 },
      { distance: 1000, value: 100 },
      { distance: 1100, value: 100 },
      { distance: 1200, value: 100 },
    ]

    // Mock brake data
    const brakeData = [
      { distance: 0, value: 0 },
      { distance: 100, value: 0 },
      { distance: 200, value: 0 },
      { distance: 300, value: 0 },
      { distance: 400, value: 0 },
      { distance: 500, value: 20 },
      { distance: 600, value: 100 },
      { distance: 700, value: 100 },
      { distance: 800, value: 80 },
      { distance: 900, value: 0 },
      { distance: 1000, value: 0 },
      { distance: 1100, value: 0 },
      { distance: 1200, value: 0 },
    ]

    // Draw throttle chart
    throttleCtx.clearRect(0, 0, throttleCanvas.width, throttleCanvas.height)

    // Draw axes
    throttleCtx.beginPath()
    throttleCtx.moveTo(40, 20)
    throttleCtx.lineTo(40, throttleCanvas.height - 30)
    throttleCtx.lineTo(throttleCanvas.width - 20, throttleCanvas.height - 30)
    throttleCtx.strokeStyle = "#ccc"
    throttleCtx.stroke()

    // Draw title
    throttleCtx.font = "14px Arial"
    throttleCtx.fillStyle = "#333"
    throttleCtx.textAlign = "center"
    throttleCtx.fillText("Throttle Application", throttleCanvas.width / 2, 15)

    // Draw throttle bars
    const xStep = (throttleCanvas.width - 60) / throttleData.length
    const yScale = (throttleCanvas.height - 50) / 100 // 0-100%

    throttleData.forEach((d, i) => {
      const x = 40 + i * xStep
      const barWidth = xStep - 2
      const barHeight = d.value * yScale
      const y = throttleCanvas.height - 30 - barHeight

      throttleCtx.fillStyle = "#10b981"
      throttleCtx.fillRect(x, y, barWidth, barHeight)
    })

    // Draw brake chart
    brakeCtx.clearRect(0, 0, brakeCanvas.width, brakeCanvas.height)

    // Draw axes
    brakeCtx.beginPath()
    brakeCtx.moveTo(40, 20)
    brakeCtx.lineTo(40, brakeCanvas.height - 30)
    brakeCtx.lineTo(brakeCanvas.width - 20, brakeCanvas.height - 30)
    brakeCtx.strokeStyle = "#ccc"
    brakeCtx.stroke()

    // Draw title
    brakeCtx.font = "14px Arial"
    brakeCtx.fillStyle = "#333"
    brakeCtx.textAlign = "center"
    brakeCtx.fillText("Brake Application", brakeCanvas.width / 2, 15)

    // Draw brake bars
    brakeData.forEach((d, i) => {
      const x = 40 + i * xStep
      const barWidth = xStep - 2
      const barHeight = d.value * yScale
      const y = brakeCanvas.height - 30 - barHeight

      brakeCtx.fillStyle = "#ef4444"
      brakeCtx.fillRect(x, y, barWidth, barHeight)
    })
  }, [])

  return (
    <div className="space-y-4">
      <Tabs defaultValue="speed">
        <TabsList className="w-full">
          <TabsTrigger value="speed" className="flex-1">
            Speed
          </TabsTrigger>
          <TabsTrigger value="throttle" className="flex-1">
            Throttle
          </TabsTrigger>
          <TabsTrigger value="brake" className="flex-1">
            Brake
          </TabsTrigger>
        </TabsList>
        <TabsContent value="speed">
          <div className="w-full h-[200px]">
            <canvas ref={speedCanvasRef} width={500} height={200} className="w-full h-full"></canvas>
          </div>
        </TabsContent>
        <TabsContent value="throttle">
          <div className="w-full h-[200px]">
            <canvas ref={throttleCanvasRef} width={500} height={200} className="w-full h-full"></canvas>
          </div>
        </TabsContent>
        <TabsContent value="brake">
          <div className="w-full h-[200px]">
            <canvas ref={brakeCanvasRef} width={500} height={200} className="w-full h-full"></canvas>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-sm text-muted-foreground text-center">Telemetry data from Max Verstappen's fastest lap</div>
    </div>
  )
}

