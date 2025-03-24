export function RaceResults() {
  // Mock race results data
  const raceResults = [
    { position: 1, driver: "Max Verstappen", team: "Red Bull Racing", time: "1:27:38.241", points: 25 },
    { position: 2, driver: "Sergio Perez", team: "Red Bull Racing", time: "+5.384s", points: 18 },
    { position: 3, driver: "Fernando Alonso", team: "Aston Martin", time: "+26.305s", points: 15 },
    { position: 4, driver: "George Russell", team: "Mercedes", time: "+33.229s", points: 12 },
    { position: 5, driver: "Carlos Sainz", team: "Ferrari", time: "+42.511s", points: 10 },
  ]

  return (
    <div className="space-y-4">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 font-medium text-sm">Pos</th>
            <th className="text-left py-2 font-medium text-sm">Driver</th>
            <th className="text-left py-2 font-medium text-sm">Time</th>
            <th className="text-right py-2 font-medium text-sm">Pts</th>
          </tr>
        </thead>
        <tbody>
          {raceResults.map((result) => (
            <tr key={result.position} className="border-b border-muted">
              <td className="py-2 text-sm">{result.position}</td>
              <td className="py-2">
                <div className="font-medium text-sm">{result.driver}</div>
                <div className="text-xs text-muted-foreground">{result.team}</div>
              </td>
              <td className="py-2 text-sm">{result.time}</td>
              <td className="py-2 text-sm text-right font-medium">{result.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

