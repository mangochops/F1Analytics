"use client"

import { useEffect, useState } from "react"
import { fetchTeamStandings } from "@/lib/data-fetcher"

interface TeamStanding {
  position: number
  team: string
  points: number
  color: string
}

export function TeamStandings() {
  const [standings, setStandings] = useState<TeamStanding[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTeamStandings()
        setStandings(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading team standings:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center">Loading team standings...</div>
  }

  // Calculate max points for bar width
  const maxPoints = Math.max(...standings.map((team) => team.points))

  return (
    <div className="space-y-4 f1-grid-animation">
      {standings.map((team) => (
        <div key={team.position} className="flex items-center gap-3">
          <div className="w-6 text-center font-medium">{team.position}</div>
          <div className={`w-1 h-10 ${team.color} rounded-sm`}></div>
          <div className="flex-1">
            <div className="font-medium">{team.team}</div>
            <div className="w-full h-1 bg-[#2A2A3A] mt-2">
              <div className={`h-full ${team.color}`} style={{ width: `${(team.points / maxPoints) * 100}%` }}></div>
            </div>
          </div>
          <div className="font-bold text-lg">{team.points}</div>
        </div>
      ))}
    </div>
  )
}

