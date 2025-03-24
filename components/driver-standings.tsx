"use client"

import { useEffect, useState } from "react"
import { fetchDriverStandings } from "@/lib/data-fetcher"

interface DriverStanding {
  position: number
  driver: string
  team: string
  points: number
  color: string
}

export function DriverStandings() {
  const [standings, setStandings] = useState<DriverStanding[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDriverStandings()
        setStandings(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading driver standings:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center">Loading driver standings...</div>
  }

  // Calculate max points for bar width
  const maxPoints = Math.max(...standings.map((driver) => driver.points))

  return (
    <div className="space-y-4 f1-grid-animation">
      {standings.map((driver) => (
        <div key={driver.position} className="flex items-center gap-3">
          <div className="w-6 text-center font-medium">{driver.position}</div>
          <div className={`w-1 h-10 ${driver.color} rounded-sm`}></div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden">
                <img
                  src={`/images/drivers/${driver.driver.split(" ")[0].toLowerCase()}.png`}
                  alt={driver.driver}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const imgElement = e.target as HTMLImageElement
                    imgElement.src = "/placeholder.svg?height=28&width=28"
                    imgElement.onerror = null
                  }}
                />
              </div>
              <div>
                <div className="font-medium">{driver.driver}</div>
                <div className="text-xs text-gray-400">{driver.team}</div>
              </div>
            </div>
            <div className="w-full h-1 bg-[#2A2A3A] mt-1">
              <div
                className={`h-full ${driver.color}`}
                style={{ width: `${(driver.points / maxPoints) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="font-bold text-lg">{driver.points}</div>
        </div>
      ))}
    </div>
  )
}

