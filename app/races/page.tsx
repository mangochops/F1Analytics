"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { PageLoader } from "@/components/page-loader"
import { Calendar, Clock, MapPin, Trophy } from "lucide-react"

export default function RacesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("calendar")

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
        <PageHeader title="Race Calendar" description="2024 Formula 1 Season Schedule and Results" />
        <div className="flex-1 flex items-center justify-center">
          <PageLoader />
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <PageHeader title="Race Calendar" description="2024 Formula 1 Season Schedule and Results" />

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#2A2A3A] p-1 w-full max-w-md mx-auto">
            <TabsTrigger
              value="calendar"
              className="flex-1 data-[state=active]:bg-[#E10600] data-[state=active]:text-white"
            >
              Calendar
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="flex-1 data-[state=active]:bg-[#E10600] data-[state=active]:text-white"
            >
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {races.map((race) => (
                <RaceCard key={race.id} race={race} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {races
                .filter((race) => race.status === "completed")
                .map((race) => (
                  <ResultCard key={race.id} race={race} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

interface Race {
  id: number
  name: string
  location: string
  date: string
  circuit: string
  status: "upcoming" | "next" | "completed"
  winner?: string
  winnerTeam?: string
  fastestLap?: string
  circuitImageUrl: string
}

function RaceCard({ race }: { race: Race }) {
  return (
    <Card
      className={`bg-[#1F1F2B] border-[#2A2A3A] overflow-hidden ${
        race.status === "next" ? "border-[#E10600] border-2" : ""
      }`}
    >
      <div className="h-40 bg-[#2A2A3A] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={race.circuitImageUrl || "/placeholder.svg"}
            alt={race.circuit}
            className="h-full w-full object-cover"
          />
        </div>
        {race.status === "next" && (
          <div className="absolute top-3 right-3 bg-[#E10600] text-white px-3 py-1 rounded-full text-xs font-bold">
            NEXT RACE
          </div>
        )}
        {race.status === "completed" && (
          <div className="absolute top-3 right-3 bg-[#1F1F2B] text-white px-3 py-1 rounded-full text-xs font-bold">
            COMPLETED
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-white">{race.name}</CardTitle>
        <CardDescription className="text-gray-400">{race.circuit}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-gray-300">
          <Calendar size={16} className="text-[#E10600]" />
          <span>{race.date}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <MapPin size={16} className="text-[#E10600]" />
          <span>{race.location}</span>
        </div>

        {race.status === "upcoming" || race.status === "next" ? (
          <Button className="w-full bg-[#E10600] hover:bg-[#B30500] text-white mt-2">View Details</Button>
        ) : (
          <Button className="w-full bg-[#2A2A3A] hover:bg-[#3D3D4D] text-white mt-2">View Results</Button>
        )}
      </CardContent>
    </Card>
  )
}

function ResultCard({ race }: { race: Race }) {
  return (
    <Card className="bg-[#1F1F2B] border-[#2A2A3A] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-white">{race.name}</CardTitle>
        <CardDescription className="text-gray-400">{race.date}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-gray-300">
          <Trophy size={16} className="text-[#E10600]" />
          <div>
            <span className="font-medium">{race.winner}</span>
            <span className="text-sm text-gray-400 ml-2">({race.winnerTeam})</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <Clock size={16} className="text-[#E10600]" />
          <div>
            <span className="text-sm">Fastest Lap: </span>
            <span className="font-mono">{race.fastestLap}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-[#2A2A3A] p-2 rounded text-center">
            <div className="text-xs text-gray-400">P1</div>
            <div className="font-medium">VER</div>
          </div>
          <div className="bg-[#2A2A3A] p-2 rounded text-center">
            <div className="text-xs text-gray-400">P2</div>
            <div className="font-medium">PER</div>
          </div>
          <div className="bg-[#2A2A3A] p-2 rounded text-center">
            <div className="text-xs text-gray-400">P3</div>
            <div className="font-medium">LEC</div>
          </div>
        </div>

        <Button className="w-full bg-[#2A2A3A] hover:bg-[#3D3D4D] text-white mt-2">Full Results</Button>
      </CardContent>
    </Card>
  )
}

// Updated mock data for races with real circuit images
const races: Race[] = [
  {
    id: 1,
    name: "Bahrain Grand Prix",
    location: "Sakhir, Bahrain",
    date: "March 2, 2024",
    circuit: "Bahrain International Circuit",
    status: "completed",
    winner: "Max Verstappen",
    winnerTeam: "Red Bull Racing",
    fastestLap: "1:32.608",
    circuitImageUrl: "/images/circuits/bahrain.png",
  },
  {
    id: 2,
    name: "Saudi Arabian Grand Prix",
    location: "Jeddah, Saudi Arabia",
    date: "March 9, 2024",
    circuit: "Jeddah Corniche Circuit",
    status: "completed",
    winner: "Max Verstappen",
    winnerTeam: "Red Bull Racing",
    fastestLap: "1:31.632",
    circuitImageUrl: "/images/circuits/jeddah.png",
  },
  {
    id: 3,
    name: "Australian Grand Prix",
    location: "Melbourne, Australia",
    date: "March 24, 2024",
    circuit: "Albert Park Circuit",
    status: "completed",
    winner: "Carlos Sainz",
    winnerTeam: "Ferrari",
    fastestLap: "1:19.813",
    circuitImageUrl: "/images/circuits/australia.png",
  },
  {
    id: 4,
    name: "Japanese Grand Prix",
    location: "Suzuka, Japan",
    date: "April 7, 2024",
    circuit: "Suzuka International Racing Course",
    status: "completed",
    winner: "Max Verstappen",
    winnerTeam: "Red Bull Racing",
    fastestLap: "1:33.792",
    circuitImageUrl: "/images/circuits/suzuka.png",
  },
  {
    id: 5,
    name: "Chinese Grand Prix",
    location: "Shanghai, China",
    date: "April 21, 2024",
    circuit: "Shanghai International Circuit",
    status: "next",
    circuitImageUrl: "/images/circuits/shanghai.png",
  },
  {
    id: 6,
    name: "Miami Grand Prix",
    location: "Miami, USA",
    date: "May 5, 2024",
    circuit: "Miami International Autodrome",
    status: "upcoming",
    circuitImageUrl: "/images/circuits/miami.png",
  },
]

