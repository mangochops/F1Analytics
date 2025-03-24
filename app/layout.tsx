import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "F1 Analytics Hub - Real-time Formula 1 Data Analysis",
  description: "Explore real-time Formula 1 data analysis, telemetry, and race insights powered by fastf1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#15151E] text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

