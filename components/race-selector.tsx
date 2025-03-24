"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { fetchRaceData } from "@/lib/data-fetcher"

export function RaceSelector() {
  const [season, setSeason] = useState("2024")
  const [race, setRace] = useState("Bahrain Grand Prix")
  const [date, setDate] = useState<Date | undefined>(new Date(2024, 2, 2)) // March 2, 2024
  const [loading, setLoading] = useState(false)

  const handleLoadData = async () => {
    setLoading(true)
    try {
      // This would be a real API call in production
      await fetchRaceData(season, race)
      setTimeout(() => setLoading(false), 1000) // Simulate loading
    } catch (error) {
      console.error("Error loading race data:", error)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-[#1F1F2B] p-4 rounded-lg border border-[#2A2A3A]">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="season-select" className="text-sm font-medium text-gray-300">
          Season
        </label>
        <Select value={season} onValueChange={setSeason}>
          <SelectTrigger id="season-select" className="w-[120px] bg-[#2A2A3A] border-[#3D3D4D] text-white">
            <SelectValue placeholder="Select season" />
          </SelectTrigger>
          <SelectContent className="bg-[#2A2A3A] border-[#3D3D4D] text-white">
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="race-select" className="text-sm font-medium text-gray-300">
          Race
        </label>
        <Select value={race} onValueChange={setRace}>
          <SelectTrigger id="race-select" className="w-[200px] bg-[#2A2A3A] border-[#3D3D4D] text-white">
            <SelectValue placeholder="Select race" />
          </SelectTrigger>
          <SelectContent className="bg-[#2A2A3A] border-[#3D3D4D] text-white">
            <SelectItem value="Bahrain Grand Prix">Bahrain Grand Prix</SelectItem>
            <SelectItem value="Saudi Arabian Grand Prix">Saudi Arabian Grand Prix</SelectItem>
            <SelectItem value="Australian Grand Prix">Australian Grand Prix</SelectItem>
            <SelectItem value="Japanese Grand Prix">Japanese Grand Prix</SelectItem>
            <SelectItem value="Chinese Grand Prix">Chinese Grand Prix</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="date-picker" className="text-sm font-medium text-gray-300">
          Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant={"outline"}
              className={cn(
                "w-[200px] justify-start text-left font-normal bg-[#2A2A3A] border-[#3D3D4D] text-white",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#2A2A3A] border-[#3D3D4D]">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="bg-[#2A2A3A] text-white"
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button
        className="mt-6 sm:mt-auto bg-[#E10600] hover:bg-[#B30500] text-white"
        onClick={handleLoadData}
        disabled={loading}
      >
        {loading ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          "Load Race Data"
        )}
      </Button>
    </div>
  )
}

