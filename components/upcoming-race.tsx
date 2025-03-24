"use client"

import { useEffect, useState } from "react"
import { fetchUpcomingRaceData } from "@/lib/data-fetcher"
import { CircuitMap } from "./circuit-map"

interface UpcomingRace {
  name: string
  circuit: string
  date: string
  time: string
  location: string
  lapRecord: {
    time: string
    driver: string
    year: number
  }
}

export function UpcomingRace() {
  const [raceData, setRaceData] = useState<UpcomingRace | null>(null)
  const [loading, setLoading] = useState(true)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUpcomingRaceData()
        setRaceData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading upcoming race data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (!raceData) return

    const updateCountdown = () => {
      const now = new Date()
      const raceDate = new Date(`${raceData.date}T${raceData.time}`)
      const diff = raceDate.getTime() - now.getTime()

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [raceData])

  if (loading) {
    return <div className="h-[200px] flex items-center justify-center">Loading race data...</div>
  }

  if (!raceData) {
    return <div className="h-[200px] flex items-center justify-center">No upcoming race data available</div>
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold">{raceData.name}</h3>
        <p className="text-sm text-gray-400">{raceData.circuit}</p>
        <p className="text-sm text-gray-400">{raceData.location}</p>
      </div>

      <CircuitMap />

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-[#2A2A3A] p-2 rounded-md">
          <div className="text-xl font-bold">{countdown.days}</div>
          <div className="text-xs text-gray-400">DAYS</div>
        </div>
        <div className="bg-[#2A2A3A] p-2 rounded-md">
          <div className="text-xl font-bold">{countdown.hours}</div>
          <div className="text-xs text-gray-400">HOURS</div>
        </div>
        <div className="bg-[#2A2A3A] p-2 rounded-md">
          <div className="text-xl font-bold">{countdown.minutes}</div>
          <div className="text-xs text-gray-400">MINS</div>
        </div>
        <div className="bg-[#2A2A3A] p-2 rounded-md">
          <div className="text-xl font-bold">{countdown.seconds}</div>
          <div className="text-xs text-gray-400">SECS</div>
        </div>
      </div>

      <div className="text-center text-sm">
        <div className="text-gray-400">Lap Record</div>
        <div className="font-mono font-medium">{raceData.lapRecord.time}</div>
        <div className="text-xs text-gray-400">
          {raceData.lapRecord.driver} ({raceData.lapRecord.year})
        </div>
      </div>
    </div>
  )
}

