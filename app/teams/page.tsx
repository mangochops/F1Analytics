"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { PageLoader } from "@/components/page-loader"
import { Progress } from "@/components/ui/progress"
import { Trophy, Users, Car, ArrowRight } from "lucide-react"

export default function TeamsPage() {
  const [isLoading, setIsLoading] = useState(true)

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
        <PageHeader title="F1 Teams" description="2024 Formula 1 Constructor Profiles and Statistics" />
        <div className="flex-1 flex items-center justify-center">
          <PageLoader />
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <PageHeader title="F1 Teams" description="2024 Formula 1 Constructor Profiles and Statistics" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </main>
  )
}

interface Team {
  id: number
  name: string
  base: string
  teamPrincipal: string
  championships: number
  points: number
  wins: number
  podiums: number
  color: string
  logoUrl: string
  carUrl: string
  drivers: string[]
}

function TeamCard({ team }: { team: Team }) {
  return (
    <Card className="bg-[#1F1F2B] border-[#2A2A3A] overflow-hidden hover:border-[#E10600] transition-colors">
      <div className="h-48 bg-[#2A2A3A] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={team.carUrl || "/placeholder.svg"}
            alt={`${team.name} car`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2" style={{ backgroundColor: team.color }}></div>
      </div>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white">{team.name}</CardTitle>
          <CardDescription className="text-gray-400">{team.base}</CardDescription>
        </div>
        <div className="h-12 w-12">
          <img
            src={team.logoUrl || "/placeholder.svg"}
            alt={`${team.name} logo`}
            className="h-full w-full object-contain"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm mb-4">
          <div className="flex items-center gap-1">
            <Trophy size={14} className="text-[#E10600]" />
            <span>{team.championships} Titles</span>
          </div>
          <div className="flex items-center gap-1">
            <Car size={14} className="text-[#E10600]" />
            <span>{team.wins} Wins</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} className="text-[#E10600]" />
            <span>{team.points} Pts</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-400">Team Principal</div>
          <div className="font-medium">{team.teamPrincipal}</div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-400">Drivers</div>
          <div className="grid grid-cols-2 gap-2">
            {team.drivers.map((driver, index) => (
              <div key={index} className="bg-[#2A2A3A] p-2 rounded text-center">
                <div className="font-medium">{driver}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Championship Position</span>
            <span className="font-medium">{teams.findIndex((t) => t.id === team.id) + 1} / 10</span>
          </div>
          <Progress
            value={(teams.length - teams.findIndex((t) => t.id === team.id)) * 10}
            className="h-2 bg-[#2A2A3A]"
            indicatorClassName="bg-[#E10600]"
          />
        </div>

        <Button className="w-full bg-[#2A2A3A] hover:bg-[#3D3D4D] text-white mt-2">
          Team Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Updated mock data for teams with real image paths
const teams: Team[] = [
  {
    id: 1,
    name: "Red Bull Racing",
    base: "Milton Keynes, United Kingdom",
    teamPrincipal: "Christian Horner",
    championships: 6,
    points: 141,
    wins: 3,
    podiums: 7,
    color: "#0600EF",
    logoUrl: "/images/logos/redbull-logo.png",
    carUrl: "/images/teams/redbull.png",
    drivers: ["Max Verstappen", "Sergio Perez"],
  },
  {
    id: 2,
    name: "Ferrari",
    base: "Maranello, Italy",
    teamPrincipal: "Frédéric Vasseur",
    championships: 16,
    points: 120,
    wins: 1,
    podiums: 5,
    color: "#FF0000",
    logoUrl: "/images/logos/ferrari-logo.png",
    carUrl: "/images/teams/ferrari.png",
    drivers: ["Charles Leclerc", "Carlos Sainz"],
  },
  {
    id: 3,
    name: "Mercedes",
    base: "Brackley, United Kingdom",
    teamPrincipal: "Toto Wolff",
    championships: 8,
    points: 55,
    wins: 0,
    podiums: 0,
    color: "#00D2BE",
    logoUrl: "/images/logos/mercedes-logo.png",
    carUrl: "/images/teams/mercedes.png",
    drivers: ["Lewis Hamilton", "George Russell"],
  },
  {
    id: 4,
    name: "McLaren",
    base: "Woking, United Kingdom",
    teamPrincipal: "Andrea Stella",
    championships: 8,
    points: 28,
    wins: 0,
    podiums: 0,
    color: "#FF8700",
    logoUrl: "/images/logos/mclaren-logo.png",
    carUrl: "/images/teams/mclaren.png",
    drivers: ["Lando Norris", "Oscar Piastri"],
  },
  {
    id: 5,
    name: "Aston Martin",
    base: "Silverstone, United Kingdom",
    teamPrincipal: "Mike Krack",
    championships: 0,
    points: 26,
    wins: 0,
    podiums: 0,
    color: "#006F62",
    logoUrl: "/images/logos/astonmartin-logo.png",
    carUrl: "/images/teams/astonmartin.png",
    drivers: ["Fernando Alonso", "Lance Stroll"],
  },
  {
    id: 6,
    name: "Alpine",
    base: "Enstone, United Kingdom",
    teamPrincipal: "Bruno Famin",
    championships: 2,
    points: 1,
    wins: 0,
    podiums: 0,
    color: "#0090FF",
    logoUrl: "/images/logos/alpine-logo.png",
    carUrl: "/images/teams/alpine.png",
    drivers: ["Pierre Gasly", "Esteban Ocon"],
  },
]

