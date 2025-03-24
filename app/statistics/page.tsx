"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { PageLoader } from "@/components/page-loader"
import { BarChart } from "@/components/charts"
import { LineChart } from "@/components/charts"
import { BarChart2, LineChartIcon, PieChart, Trophy, Flag, Clock } from "lucide-react"

export default function StatisticsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("drivers")

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col">
        <PageHeader title="F1 Statistics" description="Comprehensive Formula 1 Statistics and Records" />
        <div className="flex-1 flex items-center justify-center">
          <PageLoader />
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <PageHeader title="F1 Statistics" description="Comprehensive Formula 1 Statistics and Records" />

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#2A2A3A] p-1 w-full max-w-md mx-auto">
            <TabsTrigger
              value="drivers"
              className="flex-1 data-[state=active]:bg-[#E10600] data-[state=active]:text-white"
            >
              Drivers
            </TabsTrigger>
            <TabsTrigger
              value="teams"
              className="flex-1 data-[state=active]:bg-[#E10600] data-[state=active]:text-white"
            >
              Teams
            </TabsTrigger>
            <TabsTrigger
              value="records"
              className="flex-1 data-[state=active]:bg-[#E10600] data-[state=active]:text-white"
            >
              Records
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drivers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart2 size={18} className="text-[#E10600]" />
                    Driver Points
                  </CardTitle>
                  <CardDescription className="text-gray-400">2024 Season Standings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <BarChart
                      data={{
                        labels: ["VER", "PER", "LEC", "SAI", "HAM", "RUS", "ALO", "NOR"],
                        datasets: [
                          {
                            label: "Points",
                            data: [77, 64, 59, 55, 31, 24, 20, 16],
                            backgroundColor: "#E10600",
                          },
                        ],
                      }}
                      title="Driver Championship Points"
                      xAxisLabel="Drivers"
                      yAxisLabel="Points"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <LineChartIcon size={18} className="text-[#E10600]" />
                    Points Progression
                  </CardTitle>
                  <CardDescription className="text-gray-400">Race-by-race points accumulation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <LineChart
                      data={{
                        labels: ["Bahrain", "Saudi", "Australia", "Japan"],
                        datasets: [
                          {
                            label: "VER",
                            data: [25, 50, 69, 77],
                            borderColor: "#0600EF",
                            fill: false,
                          },
                          {
                            label: "PER",
                            data: [18, 36, 46, 64],
                            borderColor: "#0600EF",
                            fill: false,
                          },
                          {
                            label: "LEC",
                            data: [15, 28, 47, 59],
                            borderColor: "#FF0000",
                            fill: false,
                          },
                        ],
                      }}
                      title="Points Progression"
                      xAxisLabel="Races"
                      yAxisLabel="Points"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy size={18} className="text-[#E10600]" />
                  Driver Achievements
                </CardTitle>
                <CardDescription className="text-gray-400">2024 Season Statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard title="Race Wins" icon={<Flag size={20} className="text-[#E10600]" />}>
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between">
                        <span>Max Verstappen</span>
                        <span className="font-bold">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Carlos Sainz</span>
                        <span className="font-bold">1</span>
                      </div>
                    </div>
                  </StatCard>

                  <StatCard title="Pole Positions" icon={<Clock size={20} className="text-[#E10600]" />}>
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between">
                        <span>Max Verstappen</span>
                        <span className="font-bold">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Charles Leclerc</span>
                        <span className="font-bold">1</span>
                      </div>
                    </div>
                  </StatCard>

                  <StatCard title="Fastest Laps" icon={<Clock size={20} className="text-[#E10600]" />}>
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between">
                        <span>Max Verstappen</span>
                        <span className="font-bold">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lewis Hamilton</span>
                        <span className="font-bold">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Oscar Piastri</span>
                        <span className="font-bold">1</span>
                      </div>
                    </div>
                  </StatCard>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teams" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart2 size={18} className="text-[#E10600]" />
                    Constructor Points
                  </CardTitle>
                  <CardDescription className="text-gray-400">2024 Season Standings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <BarChart
                      data={{
                        labels: ["Red Bull", "Ferrari", "Mercedes", "McLaren", "Aston Martin", "Alpine"],
                        datasets: [
                          {
                            label: "Points",
                            data: [141, 120, 55, 28, 26, 1],
                            backgroundColor: "#E10600",
                          },
                        ],
                      }}
                      title="Constructor Championship Points"
                      xAxisLabel="Teams"
                      yAxisLabel="Points"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChart size={18} className="text-[#E10600]" />
                    Team Performance
                  </CardTitle>
                  <CardDescription className="text-gray-400">Wins, podiums, and points finishes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#2A2A3A] p-4 rounded-md">
                          <div className="text-sm text-gray-400">Wins</div>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between">
                              <span>Red Bull</span>
                              <span className="font-bold">3</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Ferrari</span>
                              <span className="font-bold">1</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#2A2A3A] p-4 rounded-md">
                          <div className="text-sm text-gray-400">Podiums</div>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between">
                              <span>Red Bull</span>
                              <span className="font-bold">7</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Ferrari</span>
                              <span className="font-bold">5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <RecordCard
                title="Most World Championships"
                record="7"
                holders={["Lewis Hamilton", "Michael Schumacher"]}
              />
              <RecordCard title="Most Race Wins" record="103" holders={["Lewis Hamilton"]} />
              <RecordCard title="Most Pole Positions" record="104" holders={["Lewis Hamilton"]} />
              <RecordCard title="Most Podiums" record="197" holders={["Lewis Hamilton"]} />
              <RecordCard title="Most Fastest Laps" record="77" holders={["Lewis Hamilton"]} />
              <RecordCard title="Most Consecutive Wins" record="10" holders={["Max Verstappen"]} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

interface StatCardProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

function StatCard({ title, icon, children }: StatCardProps) {
  return (
    <div className="bg-[#2A2A3A] p-4 rounded-md">
      <div className="flex items-center gap-2">
        {icon}
        <div className="text-lg font-medium">{title}</div>
      </div>
      {children}
    </div>
  )
}

interface RecordCardProps {
  title: string
  record: string
  holders: string[]
}

function RecordCard({ title, record, holders }: RecordCardProps) {
  return (
    <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-4xl font-bold text-[#E10600]">{record}</div>
          <div className="mt-4 space-y-1">
            {holders.map((holder, index) => (
              <div key={index} className="font-medium">
                {holder}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

