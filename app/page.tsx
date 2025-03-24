"use client"

import { Suspense, useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RaceSelector } from "@/components/race-selector"
import { DriverComparison } from "@/components/driver-comparison"
import { TeamStandings } from "@/components/team-standings"
import { DriverStandings } from "@/components/driver-standings"
import { LapTimeAnalysis } from "@/components/lap-time-analysis"
import { TelemetryChart } from "@/components/telemetry-chart"
import { QualifyingResults } from "@/components/qualifying-results"
import { RacePaceChart } from "@/components/race-pace-chart"
import { LiveTimingBanner } from "@/components/live-timing-banner"
import { UpcomingRace } from "@/components/upcoming-race"
import { LoadingCard } from "@/components/loading-card"
import { PageHeader } from "@/components/page-header"
import { PageLoader } from "@/components/page-loader"
import { ArrowRight, BarChart2, LineChart, Activity, Flag, Trophy, Clock, Gauge } from "lucide-react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col">
        <PageHeader title="F1 ANALYTICS HUB" description="Real-time insights powered by fastf1" />
        <div className="flex-1 flex items-center justify-center">
          <PageLoader />
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <PageHeader title="F1 ANALYTICS HUB" description="Real-time insights powered by fastf1" />

      <LiveTimingBanner />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <RaceSelector />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
          <Card className="md:col-span-2 bg-[#1F1F2B] border-[#2A2A3A]">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl">Current Race Weekend Analysis</CardTitle>
              <CardDescription className="text-gray-400 text-sm">Latest data from the track</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="qualifying" className="space-y-4">
                <TabsList className="bg-[#2A2A3A] p-1 flex flex-wrap justify-start gap-2">
                  <TabsTrigger
                    value="qualifying"
                    className="text-xs sm:text-sm flex-1 min-w-[80px] data-[state=active]:bg-[#E10600] data-[state=active]:text-white"
                  >
                    Qualifying
                  </TabsTrigger>
                  <TabsTrigger
                    value="race"
                    className="text-xs sm:text-sm flex-1 min-w-[80px] data-[state=active]:bg-[#E10600] data-[state=active]:text-white"
                  >
                    Race
                  </TabsTrigger>
                  <TabsTrigger
                    value="telemetry"
                    className="text-xs sm:text-sm flex-1 min-w-[80px] data-[state=active]:bg-[#E10600] data-[state=active]:text-white"
                  >
                    Telemetry
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="qualifying">
                  <Suspense fallback={<LoadingCard height="300px" />}>
                    <QualifyingResults />
                  </Suspense>
                </TabsContent>
                <TabsContent value="race">
                  <Suspense fallback={<LoadingCard height="300px" />}>
                    <RacePaceChart />
                  </Suspense>
                </TabsContent>
                <TabsContent value="telemetry">
                  <Suspense fallback={<LoadingCard height="300px" />}>
                    <TelemetryChart />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="space-y-4 sm:space-y-6">
            <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
              <CardHeader>
                <CardTitle className="text-white text-base sm:text-lg flex items-center gap-2">
                  <Trophy size={16} className="text-[#E10600] sm:size-18" />
                  Top Performers
                </CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">
                  Latest qualifying results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<LoadingCard height="200px" />}>
                  <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 duration-500">
                    {[1, 2, 3, 4, 5].map((position) => (
                      <div key={position} className="flex items-center justify-between group">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1F1F2B] border border-[#2A2A3A] flex items-center justify-center font-bold text-xs sm:text-sm">
                            {position}
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden">
                              <img
                                src={`/images/drivers/${getDriverCode(position).toLowerCase()}.png`}
                                alt={getDriverCode(position)}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const imgElement = e.target as HTMLImageElement
                                  imgElement.src = "/placeholder.svg?height=32&width=32"
                                  imgElement.onerror = null
                                }}
                              />
                            </div>
                            <div className={`w-1 h-6 sm:h-8 ${getTeamColor(position)}`}></div>
                            <span className="font-medium text-xs sm:text-sm group-hover:text-[#E10600] transition-colors">
                              {getDriverCode(position)}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-xs sm:text-sm">{getQualifyingTime(position)}</span>
                      </div>
                    ))}
                  </div>
                </Suspense>
              </CardContent>
            </Card>

            <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
              <CardHeader>
                <CardTitle className="text-white text-base sm:text-lg flex items-center gap-2">
                  <Clock size={16} className="text-[#E10600] sm:size-18" />
                  Next Race
                </CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">Upcoming Grand Prix</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<LoadingCard height="200px" />}>
                  <UpcomingRace />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <Gauge size={20} className="text-[#E10600] sm:size-24" />
            Performance Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
              <CardHeader>
                <CardTitle className="text-white text-base sm:text-lg">Driver Comparison</CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">
                  Head-to-head performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<LoadingCard height="300px" />}>
                  <DriverComparison />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
              <CardHeader>
                <CardTitle className="text-white text-base sm:text-lg">Lap Time Analysis</CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">
                  Consistency and performance over race distance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<LoadingCard height="300px" />}>
                  <LapTimeAnalysis />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
              <CardHeader>
                <CardTitle className="text-white text-base sm:text-lg">Team Standings</CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">
                  Constructor championship points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<LoadingCard height="300px" />}>
                  <TeamStandings />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
              <CardHeader>
                <CardTitle className="text-white text-base sm:text-lg">Driver Standings</CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">
                  Driver championship points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<LoadingCard height="300px" />}>
                  <DriverStandings />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col items-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Explore More Analysis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
            <Button
              variant="outline"
              className="h-auto py-4 sm:py-6 flex flex-col items-center gap-2 sm:gap-3 bg-[#1F1F2B] border-[#2A2A3A] hover:bg-[#2A2A3A] hover:text-[#E10600] text-white text-xs sm:text-sm"
            >
              <BarChart2 className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>Tire Strategies</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 sm:py-6 flex flex-col items-center gap-2 sm:gap-3 bg-[#1F1F2B] border-[#2A2A3A] hover:bg-[#2A2A3A] hover:text-[#E10600] text-white text-xs sm:text-sm"
            >
              <LineChart className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>Sector Times</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 sm:py-6 flex flex-col items-center gap-2 sm:gap-3 bg-[#1F1F2B] border-[#2A2A3A] hover:bg-[#2A2A3A] hover:text-[#E10600] text-white text-xs sm:text-sm"
            >
              <Activity className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>Telemetry Deep Dive</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 sm:py-6 flex flex-col items-center gap-2 sm:gap-3 bg-[#1F1F2B] border-[#2A2A3A] hover:bg-[#2A2A3A] hover:text-[#E10600] text-white text-xs sm:text-sm"
            >
              <Flag className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>Season Tracker</span>
            </Button>
          </div>
          <Button className="mt-6 sm:mt-8 bg-[#E10600] hover:bg-[#B30500] text-white text-sm sm:text-base">
            View All Analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  )
}

// Helper functions to simulate real data
function getTeamColor(position: number): string {
  const teamColors: Record<number, string> = {
    1: "bg-[#0600EF]", // Red Bull
    2: "bg-[#0600EF]", // Red Bull
    3: "bg-[#FF0000]", // Ferrari
    4: "bg-[#FF0000]", // Ferrari
    5: "bg-[#00D2BE]", // Mercedes
  }
  return teamColors[position] || "bg-gray-500"
}

function getDriverCode(position: number): string {
  const drivers: Record<number, string> = {
    1: "VER",
    2: "PER",
    3: "LEC",
    4: "SAI",
    5: "HAM",
  }
  return drivers[position] || "---"
}

function getQualifyingTime(position: number): string {
  const times: Record<number, string> = {
    1: "1:27.893",
    2: "+0.299",
    3: "+0.378",
    4: "+0.508",
    5: "+0.658",
  }
  return times[position] || "---"
}
