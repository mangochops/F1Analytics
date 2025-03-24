"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { fetchDriverComparisonData } from "@/lib/data-fetcher"

interface DriverData {
  name: string
  team: string
  qualifyingLap: string
  bestRaceLap: string
  avgPitStopTime: string
  topSpeed: number
  avgSpeed: number
  consistency: number
  teamColor: string
}

export function DriverComparison() {
  const [driver1, setDriver1] = useState("VER")
  const [driver2, setDriver2] = useState("PER")
  const [driverData, setDriverData] = useState<Record<string, DriverData>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDriverComparisonData()
        setDriverData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading driver comparison data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center">Loading driver data...</div>
  }

  const driver1Data = driverData[driver1] || ({} as DriverData)
  const driver2Data = driverData[driver2] || ({} as DriverData)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="driver1-select" className="text-sm font-medium block mb-1.5 text-gray-300">
            Driver 1
          </label>
          <Select value={driver1} onValueChange={setDriver1}>
            <SelectTrigger id="driver1-select" className="bg-[#2A2A3A] border-[#3D3D4D] text-white">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img
                    src={`/images/drivers/${driver1.toLowerCase()}.png`}
                    alt={driver1}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const imgElement = e.target as HTMLImageElement
                      imgElement.src = "/placeholder.svg?height=24&width=24"
                      imgElement.onerror = null
                    }}
                  />
                </div>
                <span>{driver1}</span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#2A2A3A] border-[#3D3D4D] text-white">
              <SelectItem value="VER">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src="/images/drivers/ver.png"
                      alt="VER"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const imgElement = e.target as HTMLImageElement
                        imgElement.src = "/placeholder.svg?height=24&width=24"
                        imgElement.onerror = null
                      }}
                    />
                  </div>
                  <span>Verstappen</span>
                </div>
              </SelectItem>
              <SelectItem value="PER">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src="/images/drivers/per.png"
                      alt="PER"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const imgElement = e.target as HTMLImageElement
                        imgElement.src = "/placeholder.svg?height=24&width=24"
                        imgElement.onerror = null
                      }}
                    />
                  </div>
                  <span>Perez</span>
                </div>
              </SelectItem>
              <SelectItem value="LEC">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src="/images/drivers/lec.png"
                      alt="LEC"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const imgElement = e.target as HTMLImageElement
                        imgElement.src = "/placeholder.svg?height=24&width=24"
                        imgElement.onerror = null
                      }}
                    />
                  </div>
                  <span>Leclerc</span>
                </div>
              </SelectItem>
              <SelectItem value="SAI">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src="/images/drivers/sai.png"
                      alt="SAI"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const imgElement = e.target as HTMLImageElement
                        imgElement.src = "/placeholder.svg?height=24&width=24"
                        imgElement.onerror = null
                      }}
                    />
                  </div>
                  <span>Sainz</span>
                </div>
              </SelectItem>
              <SelectItem value="HAM">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src="/images/drivers/ham.png"
                      alt="HAM"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const imgElement = e.target as HTMLImageElement
                        imgElement.src = "/placeholder.svg?height=24&width=24"
                        imgElement.onerror = null
                      }}
                    />
                  </div>
                  <span>Hamilton</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label htmlFor="driver2-select" className="text-sm font-medium block mb-1.5 text-gray-300">
            Driver 2
          </label>
          <Select value={driver2} onValueChange={setDriver2}>
            <SelectTrigger id="driver2-select" className="bg-[#2A2A3A] border-[#3D3D4D] text-white">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img
                    src={`/images/drivers/${driver2.toLowerCase()}.png`}
                    alt={driver2}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const imgElement = e.target as HTMLImageElement
                      imgElement.src = "/placeholder.svg?height=24&width=24"
                      imgElement.onerror = null
                    }}
                  />
                </div>
                <span>{driver2}</span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#2A2A3A] border-[#3D3D4D] text-white">
              <SelectItem value="VER">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src="/images/drivers/ver.png"
                      alt="VER"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const imgElement = e.target as HTMLImageElement
                        imgElement.src = "/placeholder.svg?height=24&width=24"
                        imgElement.onerror = null
                      }}
                    />
                  </div>
                  <span>Verstappen</span>
                </div>
              </SelectItem>
              <SelectItem value="PER">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src="/images/drivers/per.png"
                      alt="PER"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const imgElement = e.target as HTMLImageElement
                        imgElement.src = "/placeholder.svg?height=24&width=24"
                        imgElement.onerror = null
                      }}
                    />
                  </div>
                  <span>Perez</span>
                </div>
              </SelectItem>
              <SelectItem value="LEC">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src="/images/drivers/lec.png"
                      alt="LEC"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const imgElement = e.target as HTMLImageElement
                        imgElement.src = "/placeholder.svg?height=24&width=24"
                        imgElement.onerror = null
                      }}
                    />
                  </div>
                  <span>Leclerc</span>
                </div>
              </SelectItem>
              <SelectItem value="SAI">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src="/images/drivers/sai.png"
                      alt="SAI"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const imgElement = e.target as HTMLImageElement
                        imgElement.src = "/placeholder.svg?height=24&width=24"
                        imgElement.onerror = null
                      }}
                    />
                  </div>
                  <span>Sainz</span>
                </div>
              </SelectItem>
              <SelectItem value="HAM">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src="/images/drivers/ham.png"
                      alt="HAM"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const imgElement = e.target as HTMLImageElement
                        imgElement.src = "/placeholder.svg?height=24&width=24"
                        imgElement.onerror = null
                      }}
                    />
                  </div>
                  <span>Hamilton</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="bg-[#2A2A3A] p-1 w-full">
          <TabsTrigger
            value="performance"
            className="flex-1 data-[state=active]:bg-[#E10600] data-[state=active]:text-white"
          >
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="telemetry"
            className="flex-1 data-[state=active]:bg-[#E10600] data-[state=active]:text-white"
          >
            Telemetry
          </TabsTrigger>
        </TabsList>
        <TabsContent value="performance">
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-sm text-gray-400">Metric</div>
              <div className="text-sm font-medium">{driver1Data.name}</div>
              <div className="text-sm font-medium">{driver2Data.name}</div>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="text-sm">Qualifying Lap</div>
              <div className="text-sm font-medium font-mono">{driver1Data.qualifyingLap}</div>
              <div className="text-sm font-medium font-mono">{driver2Data.qualifyingLap}</div>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="text-sm">Best Race Lap</div>
              <div className="text-sm font-medium font-mono">{driver1Data.bestRaceLap}</div>
              <div className="text-sm font-medium font-mono">{driver2Data.bestRaceLap}</div>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="text-sm">Avg Pit Stop</div>
              <div className="text-sm font-medium font-mono">{driver1Data.avgPitStopTime}</div>
              <div className="text-sm font-medium font-mono">{driver2Data.avgPitStopTime}</div>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="text-sm">Top Speed</div>
              <div>
                <div className="text-sm font-medium">{driver1Data.topSpeed} km/h</div>
                <Progress
                  value={driver1Data.topSpeed / 3.5}
                  className="h-2 bg-[#2A2A3A]"
                  indicatorClassName={`bg-[${driver1Data.teamColor}]`}
                />
              </div>
              <div>
                <div className="text-sm font-medium">{driver2Data.topSpeed} km/h</div>
                <Progress
                  value={driver2Data.topSpeed / 3.5}
                  className="h-2 bg-[#2A2A3A]"
                  indicatorClassName={`bg-[${driver2Data.teamColor}]`}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="text-sm">Consistency</div>
              <div>
                <div className="text-sm font-medium">{driver1Data.consistency}%</div>
                <Progress
                  value={driver1Data.consistency}
                  className="h-2 bg-[#2A2A3A]"
                  indicatorClassName={`bg-[${driver1Data.teamColor}]`}
                />
              </div>
              <div>
                <div className="text-sm font-medium">{driver2Data.consistency}%</div>
                <Progress
                  value={driver2Data.consistency}
                  className="h-2 bg-[#2A2A3A]"
                  indicatorClassName={`bg-[${driver2Data.teamColor}]`}
                />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="telemetry">
          <div className="flex justify-center items-center h-[200px] mt-4 text-gray-400">
            <div className="text-center">
              <p>Detailed telemetry comparison</p>
              <p className="text-sm mt-2">Select the telemetry tab in the main chart for detailed analysis</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

