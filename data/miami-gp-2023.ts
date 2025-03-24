// Mock data for the 2023 Miami Grand Prix

export const MiamiGP2023Data = {
  // Qualifying gap to pole data
  qualifyingGapToPole: {
    labels: ["VER", "PER", "LEC", "SAI", "HAM", "RUS", "ALO", "OCO", "GAS", "STR"],
    datasets: [
      {
        label: "Gap to Pole (seconds)",
        data: [0, 0.299, 0.378, 0.508, 0.658, 0.729, 0.871, 1.026, 1.128, 1.242],
        backgroundColor: "#3b82f6",
      },
    ],
  },

  // Race pace data
  racePaceData: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
    datasets: [
      {
        label: "VER",
        data: [93.2, 91.8, 91.5, 91.3, 91.2, 91.1, 91.3, 91.4, 91.5, 91.7, 91.9, 92.1, 92.3, 92.5, 92.7],
        borderColor: "#3b82f6",
        fill: false,
      },
      {
        label: "PER",
        data: [93.8, 92.3, 91.9, 91.6, 91.5, 91.4, 91.5, 91.6, 91.7, 91.9, 92.2, 92.4, 92.6, 92.8, 93.0],
        borderColor: "#ef4444",
        fill: false,
      },
      {
        label: "LEC",
        data: [94.1, 92.6, 92.1, 91.8, 91.7, 91.6, 91.7, 91.8, 91.9, 92.1, 92.4, 92.6, 92.8, 93.0, 93.2],
        borderColor: "#10b981",
        fill: false,
      },
    ],
  },

  // Telemetry data
  telemetryData: {
    labels: ["0", "100", "200", "300", "400", "500", "600", "700", "800", "900", "1000", "1100", "1200"],
    datasets: [
      {
        label: "VER",
        data: [280, 310, 325, 330, 335, 320, 290, 180, 120, 160, 220, 260, 290],
        borderColor: "#3b82f6",
        fill: false,
      },
      {
        label: "PER",
        data: [275, 305, 320, 325, 330, 315, 285, 175, 115, 155, 215, 255, 285],
        borderColor: "#ef4444",
        fill: false,
      },
    ],
  },

  // Top qualifiers
  topQualifiers: [
    { driver: "VER", team: "Red Bull Racing", lapTime: "1:27.893", teamColor: "blue-600" },
    { driver: "PER", team: "Red Bull Racing", lapTime: "1:28.265", teamColor: "blue-600" },
    { driver: "LEC", team: "Ferrari", lapTime: "1:28.371", teamColor: "red-600" },
    { driver: "SAI", team: "Ferrari", lapTime: "1:28.501", teamColor: "red-600" },
    { driver: "HAM", team: "Mercedes", lapTime: "1:28.512", teamColor: "teal-600" },
  ],
}

