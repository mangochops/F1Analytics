"use client"

import { useEffect, useRef } from "react"

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string
    borderColor?: string
    borderWidth?: number
    fill?: boolean
  }[]
}

interface ChartProps {
  data: ChartData
  title: string
  xAxisLabel?: string
  yAxisLabel?: string
}

export function BarChart({ data, title, xAxisLabel, yAxisLabel }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Use canvas instead of canvasRef.current throughout
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw title
    ctx.font = "16px Arial"
    ctx.fillStyle = "#333"
    ctx.textAlign = "center"
    ctx.fillText(title, canvas.width / 2, 20)

    // Draw axes labels
    if (xAxisLabel) {
      ctx.font = "12px Arial"
      ctx.fillText(xAxisLabel, canvas.width / 2, canvas.height - 5)
    }

    if (yAxisLabel) {
      ctx.save()
      ctx.translate(15, canvas.height / 2)
      ctx.rotate(-Math.PI / 2)
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(yAxisLabel, 0, 0)
      ctx.restore()
    }

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(50, 40)
    ctx.lineTo(50, canvas.height - 30)
    ctx.lineTo(canvas.width - 20, canvas.height - 30)
    ctx.strokeStyle = "#ccc"
    ctx.stroke()

    // Draw bars
    const barWidth = (canvas.width - 70) / data.labels.length
    const maxValue = Math.max(...data.datasets[0].data)
    const scale = (canvas.height - 70) / maxValue

    data.datasets[0].data.forEach((value, index) => {
      const barHeight = value * scale
      const x = 50 + index * barWidth
      const y = canvas.height - 30 - barHeight

      ctx.fillStyle = data.datasets[0].backgroundColor || "#3b82f6"
      ctx.fillRect(x, y, barWidth - 5, barHeight)

      // Draw label
      ctx.font = "10px Arial"
      ctx.fillStyle = "#333"
      ctx.textAlign = "center"
      ctx.fillText(data.labels[index], x + barWidth / 2, canvas.height - 15)
    })
  }, [data, title, xAxisLabel, yAxisLabel])

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full"></canvas>
    </div>
  )
}

export function LineChart({ data, title, xAxisLabel, yAxisLabel }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Use canvas instead of canvasRef.current throughout
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw title
    ctx.font = "16px Arial"
    ctx.fillStyle = "#333"
    ctx.textAlign = "center"
    ctx.fillText(title, canvas.width / 2, 20)

    // Draw axes labels
    if (xAxisLabel) {
      ctx.font = "12px Arial"
      ctx.fillText(xAxisLabel, canvas.width / 2, canvas.height - 5)
    }

    if (yAxisLabel) {
      ctx.save()
      ctx.translate(15, canvas.height / 2)
      ctx.rotate(-Math.PI / 2)
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(yAxisLabel, 0, 0)
      ctx.restore()
    }

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(50, 40)
    ctx.lineTo(50, canvas.height - 30)
    ctx.lineTo(canvas.width - 20, canvas.height - 30)
    ctx.strokeStyle = "#ccc"
    ctx.stroke()

    // Draw lines for each dataset
    data.datasets.forEach((dataset, datasetIndex) => {
      const maxValue = Math.max(...dataset.data)
      const scale = (canvas.height - 70) / maxValue
      const xStep = (canvas.width - 70) / (dataset.data.length - 1)

      ctx.beginPath()
      dataset.data.forEach((value, index) => {
        const x = 50 + index * xStep
        const y = canvas.height - 30 - value * scale

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.strokeStyle = dataset.borderColor || ["#3b82f6", "#ef4444", "#10b981"][datasetIndex % 3]
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw legend
      ctx.fillStyle = dataset.borderColor || ["#3b82f6", "#ef4444", "#10b981"][datasetIndex % 3]
      ctx.fillRect(canvas.width - 100, 50 + datasetIndex * 20, 15, 15)
      ctx.fillStyle = "#333"
      ctx.textAlign = "left"
      ctx.fillText(dataset.label, canvas.width - 80, 62 + datasetIndex * 20)
    })

    // Draw x-axis labels
    const xStep = (canvas.width - 70) / (data.labels.length - 1)
    data.labels.forEach((label, index) => {
      if (index % Math.ceil(data.labels.length / 10) === 0) {
        const x = 50 + index * xStep
        ctx.font = "10px Arial"
        ctx.fillStyle = "#333"
        ctx.textAlign = "center"
        ctx.fillText(label, x, canvas.height - 15)
      }
    })
  }, [data, title, xAxisLabel, yAxisLabel])

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full"></canvas>
    </div>
  )
}

