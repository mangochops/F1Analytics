"use client"

import { useEffect, useState } from "react"
import { fetchQualifyingData } from "@/lib/data-fetcher"

interface QualifyingResult {
  position: number
  driver: string
  team: string
  q1: string
  q2: string | null
  q3: string | null
  gap: string
  teamColor: string
}

export function QualifyingResults() {
  const [results, setResults] = useState<QualifyingResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchQualifyingData()
        setResults(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading qualifying data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center">Loading qualifying results...</div>
  }

  return (
    <div className="space-y-4">
      <div className="h-[300px]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#3D3D4D] text-left">
                <th className="py-2 px-4 font-medium text-sm text-gray-400">Pos</th>
                <th className="py-2 px-4 font-medium text-sm text-gray-400">Driver</th>
                <th className="py-2 px-4 font-medium text-sm text-gray-400">Q1</th>
                <th className="py-2 px-4 font-medium text-sm text-gray-400">Q2</th>
                <th className="py-2 px-4 font-medium text-sm text-gray-400">Q3</th>
                <th className="py-2 px-4 font-medium text-sm text-gray-400">Gap</th>
              </tr>
            </thead>
            <tbody className="f1-grid-animation">
              {results.map((result) => (
                <tr key={result.position} className="border-b border-[#3D3D4D] hover:bg-[#2A2A3A] transition-colors">
                  <td className="py-3 px-4">{result.position}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full overflow-hidden">
                        <img
                          src={`/images/drivers/${result.driver.toLowerCase()}.png`}
                          alt={result.driver}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const imgElement = e.target as HTMLImageElement
                            imgElement.src = "/placeholder.svg?height=28&width=28"
                            imgElement.onerror = null
                          }}
                        />
                      </div>
                      <div className={`w-1 h-8 ${result.teamColor}`}></div>
                      <div>
                        <div className="font-medium">{result.driver}</div>
                        <div className="text-xs text-gray-400">{result.team}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">{result.q1}</td>
                  <td className="py-3 px-4 font-mono text-sm">{result.q2 || "-"}</td>
                  <td className="py-3 px-4 font-mono text-sm">{result.q3 || "-"}</td>
                  <td className="py-3 px-4 font-mono text-sm">
                    {result.position === 1 ? <span className="f1-timing-purple">{result.q3}</span> : result.gap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

