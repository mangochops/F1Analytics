// This file simulates fetching data from a backend API that would use fastf1
// In a real implementation, this would make API calls to a Python backend

// Simulate API call delay
function simulateApiCall<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

export async function fetchRaceData(season: string, race: string): Promise<void> {
  // This would be a real API call to load race data
  await simulateApiCall(null as any)
}

export async function fetchQualifyingData() {
  // Mock qualifying data
  const data = [
    {
      position: 1,
      driver: "VER",
      team: "Red Bull Racing",
      q1: "1:28.877",
      q2: "1:28.412",
      q3: "1:27.893",
      gap: "1:27.893",
      teamColor: "bg-[#0600EF]",
    },
    {
      position: 2,
      driver: "PER",
      team: "Red Bull Racing",
      q1: "1:29.005",
      q2: "1:28.635",
      q3: "1:28.265",
      gap: "+0.299",
      teamColor: "bg-[#0600EF]",
    },
    {
      position: 3,
      driver: "LEC",
      team: "Ferrari",
      q1: "1:29.254",
      q2: "1:28.770",
      q3: "1:28.371",
      gap: "+0.378",
      teamColor: "bg-[#FF0000]",
    },
    {
      position: 4,
      driver: "SAI",
      team: "Ferrari",
      q1: "1:29.411",
      q2: "1:28.931",
      q3: "1:28.501",
      gap: "+0.508",
      teamColor: "bg-[#FF0000]",
    },
    {
      position: 5,
      driver: "HAM",
      team: "Mercedes",
      q1: "1:29.633",
      q2: "1:29.124",
      q3: "1:28.512",
      gap: "+0.658",
      teamColor: "bg-[#00D2BE]",
    },
    {
      position: 6,
      driver: "RUS",
      team: "Mercedes",
      q1: "1:29.799",
      q2: "1:29.218",
      q3: "1:28.797",
      gap: "+0.729",
      teamColor: "bg-[#00D2BE]",
    },
    {
      position: 7,
      driver: "ALO",
      team: "Aston Martin",
      q1: "1:29.985",
      q2: "1:29.354",
      q3: "1:28.925",
      gap: "+0.871",
      teamColor: "bg-[#006F62]",
    },
    {
      position: 8,
      driver: "OCO",
      team: "Alpine",
      q1: "1:30.122",
      q2: "1:29.487",
      q3: "1:29.078",
      gap: "+1.026",
      teamColor: "bg-[#0090FF]",
    },
    {
      position: 9,
      driver: "GAS",
      team: "Alpine",
      q1: "1:30.267",
      q2: "1:29.623",
      q3: "1:29.158",
      gap: "+1.128",
      teamColor: "bg-[#0090FF]",
    },
    {
      position: 10,
      driver: "STR",
      team: "Aston Martin",
      q1: "1:30.422",
      q2: "1:29.789",
      q3: "1:29.253",
      gap: "+1.242",
      teamColor: "bg-[#006F62]",
    },
  ]

  const result = await simulateApiCall(data)
  return result
}

export async function fetchRacePaceData() {
  // Mock race pace data
  const data = Array.from({ length: 20 }, (_, i) => {
    const lap = i + 1
    return {
      lap,
      VER: 91.2 + Math.random() * 0.8 - 0.4,
      PER: 91.5 + Math.random() * 0.8 - 0.4,
      LEC: 91.7 + Math.random() * 0.8 - 0.4,
      HAM: 91.9 + Math.random() * 0.8 - 0.4,
      RUS: 92.1 + Math.random() * 0.8 - 0.4,
    }
  })

  const result = await simulateApiCall(data)
  return result
}

export async function fetchTelemetryData() {
  // Mock telemetry data
  const generateTelemetryPoints = (baseSpeed: number) => {
    return Array.from({ length: 100 }, (_, i) => {
      const distance = i * 50 // 0 to 4950 meters
      let speed, throttle, brake, gear, rpm, drs

      // Simulate a lap with straights and corners
      if (i % 20 < 5) {
        // Straight
        speed = baseSpeed + 30 + Math.random() * 10
        throttle = 100
        brake = 0
        gear = 8
        rpm = 10500 + Math.random() * 500
        drs = i % 20 < 3 ? 1 : 0 // DRS on some straights
      } else if (i % 20 < 8) {
        // Braking zone
        speed = baseSpeed - 50 - Math.random() * 30
        throttle = 0
        brake = 80 + Math.random() * 20
        gear = 4
        rpm = 8000 + Math.random() * 500
        drs = 0
      } else if (i % 20 < 15) {
        // Corner
        speed = baseSpeed - 80 - Math.random() * 20
        throttle = 30 + Math.random() * 40
        brake = Math.random() * 20
        gear = 3
        rpm = 7000 + Math.random() * 500
        drs = 0
      } else {
        // Corner exit
        speed = baseSpeed - 40 + Math.random() * 20
        throttle = 80 + Math.random() * 20
        brake = 0
        gear = 5
        rpm = 9000 + Math.random() * 500
        drs = 0
      }

      return {
        distance,
        speed,
        throttle,
        brake,
        gear,
        rpm,
        drs,
      }
    })
  }

  const data = {
    VER: {
      driver: "Max Verstappen",
      team: "Red Bull Racing",
      teamColor: "#0600EF",
      data: generateTelemetryPoints(300),
    },
    PER: {
      driver: "Sergio Perez",
      team: "Red Bull Racing",
      teamColor: "#0600EF",
      data: generateTelemetryPoints(295),
    },
    LEC: {
      driver: "Charles Leclerc",
      team: "Ferrari",
      teamColor: "#FF0000",
      data: generateTelemetryPoints(298),
    },
    SAI: {
      driver: "Carlos Sainz",
      team: "Ferrari",
      teamColor: "#FF0000",
      data: generateTelemetryPoints(297),
    },
    HAM: {
      driver: "Lewis Hamilton",
      team: "Mercedes",
      teamColor: "#00D2BE",
      data: generateTelemetryPoints(296),
    },
  }

  const result = await simulateApiCall(data)
  return result
}

export async function fetchDriverComparisonData() {
  // Mock driver comparison data
  const data = {
    VER: {
      name: "Max Verstappen",
      team: "Red Bull Racing",
      qualifyingLap: "1:27.893",
      bestRaceLap: "1:29.708",
      avgPitStopTime: "2.4s",
      topSpeed: 325,
      avgSpeed: 218,
      consistency: 92,
      teamColor: "#0600EF",
    },
    PER: {
      name: "Sergio Perez",
      team: "Red Bull Racing",
      qualifyingLap: "1:28.265",
      bestRaceLap: "1:30.042",
      avgPitStopTime: "2.5s",
      topSpeed: 322,
      avgSpeed: 215,
      consistency: 88,
      teamColor: "#0600EF",
    },
    LEC: {
      name: "Charles Leclerc",
      team: "Ferrari",
      qualifyingLap: "1:28.371",
      bestRaceLap: "1:30.257",
      avgPitStopTime: "2.6s",
      topSpeed: 320,
      avgSpeed: 214,
      consistency: 86,
      teamColor: "#FF0000",
    },
    SAI: {
      name: "Carlos Sainz",
      team: "Ferrari",
      qualifyingLap: "1:28.501",
      bestRaceLap: "1:30.389",
      avgPitStopTime: "2.6s",
      topSpeed: 319,
      avgSpeed: 213,
      consistency: 85,
      teamColor: "#FF0000",
    },
    HAM: {
      name: "Lewis Hamilton",
      team: "Mercedes",
      qualifyingLap: "1:28.512",
      bestRaceLap: "1:30.389",
      avgPitStopTime: "2.5s",
      topSpeed: 318,
      avgSpeed: 213,
      consistency: 90,
      teamColor: "#00D2BE",
    },
  }

  const result = await simulateApiCall(data)
  return result
}

export async function fetchLapTimeData() {
  // Mock lap time data
  const generateLapTimes = (baseTime: number, consistency: number) => {
    return Array.from({ length: 20 }, (_, i) => {
      const lap = i + 1
      let time = baseTime

      // Simulate tire degradation
      if (i < 10) {
        // First stint
        time += i * 0.05 * (1 - consistency / 100)
        return {
          lap,
          time,
          sector1: time / 3 - 0.1 + Math.random() * 0.2,
          sector2: time / 3 - 0.05 + Math.random() * 0.1,
          sector3: time / 3 + 0.15 + Math.random() * 0.2,
          compound: "soft",
        }
      } else {
        // Second stint after pit stop
        time = baseTime + 0.2 + (i - 10) * 0.03 * (1 - consistency / 100)
        return {
          lap,
          time,
          sector1: time / 3 - 0.1 + Math.random() * 0.2,
          sector2: time / 3 - 0.05 + Math.random() * 0.1,
          sector3: time / 3 + 0.15 + Math.random() * 0.2,
          compound: "medium",
        }
      }
    })
  }

  const data = {
    VER: {
      driver: "Max Verstappen",
      team: "Red Bull Racing",
      teamColor: "#0600EF",
      lapTimes: generateLapTimes(91.2, 92),
    },
    PER: {
      driver: "Sergio Perez",
      team: "Red Bull Racing",
      teamColor: "#0600EF",
      lapTimes: generateLapTimes(91.5, 88),
    },
    LEC: {
      driver: "Charles Leclerc",
      team: "Ferrari",
      teamColor: "#FF0000",
      lapTimes: generateLapTimes(91.7, 86),
    },
    SAI: {
      driver: "Carlos Sainz",
      team: "Ferrari",
      teamColor: "#FF0000",
      lapTimes: generateLapTimes(91.8, 85),
    },
    HAM: {
      driver: "Lewis Hamilton",
      team: "Mercedes",
      teamColor: "#00D2BE",
      lapTimes: generateLapTimes(91.9, 90),
    },
  }

  const result = await simulateApiCall(data)
  return result
}

export async function fetchTeamStandings() {
  // Mock team standings data
  const data = [
    { position: 1, team: "Red Bull Racing", points: 224, color: "bg-[#0600EF]" },
    { position: 2, team: "Ferrari", points: 157, color: "bg-[#FF0000]" },
    { position: 3, team: "Mercedes", points: 96, color: "bg-[#00D2BE]" },
    { position: 4, team: "Aston Martin", points: 78, color: "bg-[#006F62]" },
    { position: 5, team: "McLaren", points: 42, color: "bg-[#FF8700]" },
    { position: 6, team: "Alpine", points: 28, color: "bg-[#0090FF]" },
    { position: 7, team: "Haas F1 Team", points: 11, color: "bg-[#FFFFFF]" },
    { position: 8, team: "Alfa Romeo", points: 9, color: "bg-[#900000]" },
    { position: 9, team: "AlphaTauri", points: 5, color: "bg-[#2B4562]" },
    { position: 10, team: "Williams", points: 1, color: "bg-[#005AFF]" },
  ]

  const result = await simulateApiCall(data)
  return result
}

export async function fetchDriverStandings() {
  // Mock driver standings data
  const data = [
    { position: 1, driver: "Max Verstappen", team: "Red Bull Racing", points: 119, color: "bg-[#0600EF]" },
    { position: 2, driver: "Sergio Perez", team: "Red Bull Racing", points: 105, color: "bg-[#0600EF]" },
    { position: 3, driver: "Charles Leclerc", team: "Ferrari", points: 83, color: "bg-[#FF0000]" },
    { position: 4, driver: "Carlos Sainz", team: "Ferrari", points: 74, color: "bg-[#FF0000]" },
    { position: 5, driver: "Lewis Hamilton", team: "Mercedes", points: 56, color: "bg-[#00D2BE]" },
    { position: 6, driver: "George Russell", team: "Mercedes", points: 40, color: "bg-[#00D2BE]" },
    { position: 7, driver: "Fernando Alonso", team: "Aston Martin", points: 39, color: "bg-[#006F62]" },
    { position: 8, driver: "Lance Stroll", team: "Aston Martin", points: 27, color: "bg-[#006F62]" },
    { position: 9, driver: "Lando Norris", team: "McLaren", points: 24, color: "bg-[#FF8700]" },
    { position: 10, driver: "Oscar Piastri", team: "McLaren", points: 18, color: "bg-[#FF8700]" },
  ]

  const result = await simulateApiCall(data)
  return result
}

export async function fetchLiveTimingData() {
  // Mock live timing data
  const data = [
    {
      driver: "VER",
      position: 1,
      lastLap: "1:29.708P",
      gap: "LEADER",
      sector1: "28.123P",
      sector2: "30.456",
      sector3: "31.129",
      status: "on-track",
    },
    {
      driver: "PER",
      position: 2,
      lastLap: "1:30.042",
      gap: "+5.384",
      sector1: "28.345",
      sector2: "30.567G",
      sector3: "31.130",
      status: "on-track",
    },
    {
      driver: "LEC",
      position: 3,
      lastLap: "1:30.257",
      gap: "+8.172",
      sector1: "28.456",
      sector2: "30.678",
      sector3: "31.123G",
      status: "on-track",
    },
    {
      driver: "SAI",
      position: 4,
      lastLap: "1:30.389",
      gap: "+10.234",
      sector1: "28.567",
      sector2: "30.789",
      sector3: "31.033",
      status: "on-track",
    },
    {
      driver: "HAM",
      position: 5,
      lastLap: "1:30.412",
      gap: "+12.876",
      sector1: "28.678",
      sector2: "30.890",
      sector3: "30.844",
      status: "on-track",
    },
    {
      driver: "RUS",
      position: 6,
      lastLap: "1:30.567",
      gap: "+15.432",
      sector1: "28.789",
      sector2: "30.901",
      sector3: "30.877",
      status: "on-track",
    },
    {
      driver: "ALO",
      position: 7,
      lastLap: "1:30.678",
      gap: "+18.765",
      sector1: "28.890",
      sector2: "30.912",
      sector3: "30.876",
      status: "on-track",
    },
    {
      driver: "STR",
      position: 8,
      lastLap: "1:30.789",
      gap: "+22.123",
      sector1: "28.901",
      sector2: "30.923",
      sector3: "30.965",
      status: "on-track",
    },
    {
      driver: "NOR",
      position: 9,
      lastLap: "1:30.890",
      gap: "+25.456",
      sector1: "28.912",
      sector2: "30.934",
      sector3: "31.044",
      status: "on-track",
    },
    {
      driver: "PIA",
      position: 10,
      lastLap: "1:30.901",
      gap: "+28.789",
      sector1: "28.923",
      sector2: "30.945",
      sector3: "31.033",
      status: "on-track",
    },
  ]

  const result = await simulateApiCall(data)
  return result
}

export async function fetchUpcomingRaceData() {
  // Mock upcoming race data
  const data = {
    name: "Chinese Grand Prix",
    circuit: "Shanghai International Circuit",
    date: "2024-04-21",
    time: "08:00:00",
    location: "Shanghai, China",
    lapRecord: {
      time: "1:32.238",
      driver: "Michael Schumacher",
      year: 2004,
    },
  }

  const result = await simulateApiCall(data)
  return result
}

