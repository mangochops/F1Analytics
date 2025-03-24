"use client"

import { useEffect, useRef } from "react"

export function CircuitMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Draw a simplified circuit layout
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set background
    ctx.fillStyle = "#1F1F2B"
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Draw track outline
    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = 4
    ctx.beginPath()

    // Start/finish straight
    ctx.moveTo(50, 100)
    ctx.lineTo(150, 100)

    // Turn 1
    ctx.quadraticCurveTo(180, 100, 190, 130)

    // Turn 2-3 complex
    ctx.lineTo(200, 160)
    ctx.quadraticCurveTo(200, 190, 180, 200)

    // Back straight
    ctx.lineTo(120, 220)

    // Turn 4-5-6 complex
    ctx.quadraticCurveTo(90, 230, 80, 250)
    ctx.quadraticCurveTo(70, 270, 90, 290)

    // Turn 7-8
    ctx.lineTo(130, 310)
    ctx.quadraticCurveTo(150, 320, 180, 310)

    // Turn 9-10
    ctx.lineTo(220, 290)
    ctx.quadraticCurveTo(240, 280, 250, 260)

    // Turn 11-12
    ctx.lineTo(260, 230)
    ctx.quadraticCurveTo(260, 210, 240, 200)

    // Turn 13-16 complex
    ctx.lineTo(220, 180)
    ctx.quadraticCurveTo(230, 160, 250, 150)
    ctx.quadraticCurveTo(270, 140, 280, 120)

    // Final turns 17-19
    ctx.lineTo(270, 90)
    ctx.quadraticCurveTo(260, 70, 230, 70)
    ctx.quadraticCurveTo(200, 70, 180, 80)

    // Back to start/finish
    ctx.lineTo(50, 100)

    ctx.stroke()

    // Fill track with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvasRef.current.width, canvasRef.current.height)
    gradient.addColorStop(0, "#2A2A3A")
    gradient.addColorStop(1, "#1F1F2B")
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw start/finish line
    ctx.beginPath()
    ctx.moveTo(60, 90)
    ctx.lineTo(60, 110)
    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = 2
    ctx.stroke()

    // Add DRS zones
    ctx.font = "10px Arial"
    ctx.fillStyle = "#00FF00"
    ctx.fillText("DRS", 90, 90)
    ctx.fillText("DRS", 230, 140)
    ctx.fillText("DRS", 150, 310)

    // Add sector markers
    ctx.font = "10px Arial"
    ctx.fillStyle = "#E10600"
    ctx.fillText("S1", 190, 150)
    ctx.fillText("S2", 90, 270)
    ctx.fillText("S3", 260, 100)

    // Add some track details
    ctx.strokeStyle = "#3D3D4D"
    ctx.lineWidth = 1

    // Kerbs
    const drawKerb = (x: number, y: number, width: number, height: number) => {
      const segments = 5
      const segmentWidth = width / segments
      const segmentHeight = height / segments

      for (let i = 0; i < segments; i++) {
        ctx.fillStyle = i % 2 === 0 ? "#E10600" : "#FFFFFF"
        if (width > height) {
          ctx.fillRect(x + i * segmentWidth, y, segmentWidth, height)
        } else {
          ctx.fillRect(x, y + i * segmentHeight, width, segmentHeight)
        }
      }
    }

    // Add kerbs at key corners
    drawKerb(180, 130, 15, 5)
    drawKerb(180, 195, 15, 5)
    drawKerb(90, 290, 15, 5)
    drawKerb(240, 200, 5, 15)
  }, [])

  return (
    <div className="w-full flex justify-center">
      <canvas ref={canvasRef} width={300} height={350} className="border border-[#3D3D4D] rounded-md"></canvas>
    </div>
  )
}

