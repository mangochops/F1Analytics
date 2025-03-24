"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { PageLoader } from "@/components/page-loader"
import { Input } from "@/components/ui/input"
import { Trophy, Users, Star, ArrowRight } from "lucide-react"

export default function DriversPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.team.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col">
        <PageHeader title="F1 Drivers" description="2024 Formula 1 Driver Profiles and Statistics" />
        <div className="flex-1 flex items-center justify-center">
          <PageLoader />
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <PageHeader title="F1 Drivers" description="2024 Formula 1 Driver Profiles and Statistics" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mb-8">
          <Input
            placeholder="Search drivers or teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#2A2A3A] border-[#3D3D4D] text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDrivers.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </div>
      </div>
    </main>
  )
}

interface Driver {
  id: number
  name: string
  number: number
  team: string
  nationality: string
  points: number
  wins: number
  podiums: number
  teamColor: string
  imageUrl: string
}

function DriverCard({ driver }: { driver: Driver }) {
  return (
    <Card className="bg-[#1F1F2B] border-[#2A2A3A] overflow-hidden hover:border-[#E10600] transition-colors">
      <div className="h-48 bg-[#2A2A3A] relative">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <img src={driver.imageUrl || "/placeholder.svg"} alt={driver.name} className="h-full w-full object-cover" />
        </div>
        <div className="absolute top-0 right-0 bg-[#1F1F2B] px-3 py-1 text-2xl font-bold">{driver.number}</div>
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: driver.teamColor }}></div>
      </div>
      <CardHeader>
        <CardTitle className="text-white">{driver.name}</CardTitle>
        <CardDescription className="text-gray-400">{driver.team}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <Trophy size={14} className="text-[#E10600]" />
            <span>{driver.wins} Wins</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-[#E10600]" />
            <span>{driver.podiums} Podiums</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} className="text-[#E10600]" />
            <span>{driver.points} Pts</span>
          </div>
        </div>

        <Button className="w-full bg-[#2A2A3A] hover:bg-[#3D3D4D] text-white">
          View Profile
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Updated mock data for drivers with real driver images
const drivers: Driver[] = [
  {
    id: 1,
    name: "Max Verstappen",
    number: 1,
    team: "Red Bull Racing",
    nationality: "Netherlands",
    points: 77,
    wins: 3,
    podiums: 4,
    teamColor: "#0600EF",
    imageUrl: "/images/drivers/verstappen.png",
  },
  {
    id: 2,
    name: "Sergio Perez",
    number: 11,
    team: "Red Bull Racing",
    nationality: "Mexico",
    points: 64,
    wins: 0,
    podiums: 3,
    teamColor: "#0600EF",
    imageUrl: "/images/drivers/perez.png",
  },
  {
    id: 3,
    name: "Charles Leclerc",
    number: 16,
    team: "Ferrari",
    nationality: "Monaco",
    points: 59,
    wins: 0,
    podiums: 3,
    teamColor: "#FF0000",
    imageUrl: "/images/drivers/leclerc.png",
  },
  {
    id: 4,
    name: "Carlos Sainz",
    number: 55,
    team: "Ferrari",
    nationality: "Spain",
    points: 55,
    wins: 1,
    podiums: 2,
    teamColor: "#FF0000",
    imageUrl: "/images/drivers/sainz.png",
  },
  {
    id: 5,
    name: "Lewis Hamilton",
    number: 44,
    team: "Mercedes",
    nationality: "United Kingdom",
    points: 31,
    wins: 0,
    podiums: 0,
    teamColor: "#00D2BE",
    imageUrl: "/images/drivers/hamilton.png",
  },
  {
    id: 6,
    name: "George Russell",
    number: 63,
    team: "Mercedes",
    nationality: "United Kingdom",
    points: 24,
    wins: 0,
    podiums: 0,
    teamColor: "#00D2BE",
    imageUrl: "/images/drivers/russell.png",
  },
  {
    id: 7,
    name: "Fernando Alonso",
    number: 14,
    team: "Aston Martin",
    nationality: "Spain",
    points: 20,
    wins: 0,
    podiums: 0,
    teamColor: "#006F62",
    imageUrl: "/images/drivers/alonso.png",
  },
  {
    id: 8,
    name: "Lando Norris",
    number: 4,
    team: "McLaren",
    nationality: "United Kingdom",
    points: 16,
    wins: 0,
    podiums: 0,
    teamColor: "#FF8700",
    imageUrl: "/images/drivers/norris.png",
  },
  {
    id: 9,
    name: "Oscar Piastri",
    number: 81,
    team: "McLaren",
    nationality: "Australia",
    points: 10,
    wins: 0,
    podiums: 0,
    teamColor: "#FF8700",
    imageUrl: "/images/drivers/piastri.png",
  },
  {
    id: 10,
    name: "Lance Stroll",
    number: 18,
    team: "Aston Martin",
    nationality: "Canada",
    points: 9,
    wins: 0,
    podiums: 0,
    teamColor: "#006F62",
    imageUrl: "/images/drivers/stroll.png",
  },
  {
    id: 11,
    name: "Pierre Gasly",
    number: 10,
    team: "Alpine",
    nationality: "France",
    points: 1,
    wins: 0,
    podiums: 0,
    teamColor: "#0090FF",
    imageUrl: "/images/drivers/gasly.png",
  },
  {
    id: 12,
    name: "Esteban Ocon",
    number: 31,
    team: "Alpine",
    nationality: "France",
    points: 0,
    wins: 0,
    podiums: 0,
    teamColor: "#0090FF",
    imageUrl: "/images/drivers/ocon.png",
  },
]

