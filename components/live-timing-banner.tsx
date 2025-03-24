"use client"

import { useEffect, useState } from "react"
import { fetchLiveTimingData } from "@/lib/data-fetcher"
import { Badge } from "@/components/ui/badge"

interface LiveTiming {
  driver: string
  position: number
  lastLap: string
  gap: string
  sector1: string
  sector2: string
  sector3: string
  status: "in-pit" | "on-track" | "out"
}

export function LiveTimingBanner() {
  const [timingData, setTimingData] = useState<LiveTiming[]>([])
  const [loading, setLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const rawData = await fetchLiveTimingData()
        // Transform the raw data to ensure it matches LiveTiming interface
        const transformedData: LiveTiming[] = rawData.map((item: any) => ({
          driver: item.driver,
          position: item.position,
          lastLap: item.lastLap,
          gap: item.gap,
          sector1: item.sector1,
          sector2: item.sector2,
          sector3: item.sector3,
          // Ensure status matches the union type
          status: ["in-pit", "on-track", "out"].includes(item.status)
            ? (item.status as "in-pit" | "on-track" | "out")
            : "on-track", // Default to "on-track" if status is invalid
        }))
        setTimingData(transformedData)
        setLoading(false)
      } catch (error) {
        console.error("Error loading live timing data:", error)
        setLoading(false)
      }
    }

    loadData()

    // Simulate live updates
    const interval = setInterval(() => {
      loadData()
      setIsLive((prev) => (Math.random() > 0.3 ? true : prev))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return null
  }

  if (timingData.length === 0) {
    return null
  }

  return (
    <div className="bg-[#15151E] border-b border-[#2A2A3A] py-3 overflow-hidden sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? "bg-[#E10600] animate-pulse" : "bg-gray-500"}`}></div>
            <Badge variant="outline" className="bg-[#2A2A3A] text-white border-[#3D3D4D] uppercase font-bold px-3">
              {isLive ? "LIVE" : "LATEST SESSION"}
            </Badge>
          </div>

          <div className="flex-1 overflow-x-auto w-full">
            <div className="flex gap-6 whitespace-nowrap min-w-max">
              {timingData.slice(0, 10).map((driver) => (
                <div key={driver.driver} className="flex items-center gap-3 group">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#1F1F2B] border border-[#2A2A3A] flex items-center justify-center font-bold text-sm">
                      {driver.position}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden">
                        <img
                          src={`/images/drivers/${driver.driver.toLowerCase()}.png`}
                          alt={driver.driver}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const imgElement = e.target as HTMLImageElement
                            imgElement.src = "/placeholder.svg?height=28&width=28"
                            imgElement.onerror = null
                          }}
                        />
                      </div>
                      <span className="font-medium text-sm group-hover:text-[#E10600] transition-colors">
                        {driver.driver}
                      </span>
                    </div>
                  </div>
                  <span className={`text-sm font-mono ${getSectorClass(driver.lastLap)}`}>{driver.lastLap}</span>
                  <span className="text-xs text-gray-400">{driver.gap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getSectorClass(time: string): string {
  if (time.includes("P")) return "f1-timing-purple"
  if (time.includes("G")) return "f1-timing-green"
  return ""
}

