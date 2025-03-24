"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { PageLoader } from "@/components/page-loader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Twitter, Mail, Code, Database, Server } from "lucide-react"

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col">
        <PageHeader title="About F1 Analytics Hub" description="Learn more about this project" />
        <div className="flex-1 flex items-center justify-center">
          <PageLoader />
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <PageHeader title="About F1 Analytics Hub" description="Learn more about this project" />

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="bg-[#2A2A3A] p-1 w-full max-w-md mx-auto">
            <TabsTrigger
              value="about"
              className="flex-1 data-[state=active]:bg-[#E10600] data-[state=active]:text-white"
            >
              About
            </TabsTrigger>
            <TabsTrigger
              value="tech"
              className="flex-1 data-[state=active]:bg-[#E10600] data-[state=active]:text-white"
            >
              Technology
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="flex-1 data-[state=active]:bg-[#E10600] data-[state=active]:text-white"
            >
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
              <CardHeader>
                <CardTitle className="text-white">About the Project</CardTitle>
                <CardDescription className="text-gray-400">F1 Analytics Hub</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  F1 Analytics Hub is a comprehensive Formula 1 data analysis platform that provides real-time insights,
                  statistics, and visualizations for F1 fans and analysts.
                </p>
                <p className="text-gray-300">
                  This project was created by eng.mbuguaa as a demonstration of modern web development techniques and
                  data visualization capabilities, combined with a passion for Formula 1 racing.
                </p>
                <p className="text-gray-300">
                  The platform leverages the fastf1 Python library to access and process Formula 1 data, providing users
                  with detailed analysis of race weekends, driver performances, team comparisons, and historical
                  statistics.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
              <CardHeader>
                <CardTitle className="text-white">Features</CardTitle>
                <CardDescription className="text-gray-400">What F1 Analytics Hub offers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600] font-bold">•</span>
                    <span>Real-time race data and telemetry analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600] font-bold">•</span>
                    <span>Comprehensive driver and team statistics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600] font-bold">•</span>
                    <span>Detailed race weekend analysis with qualifying and race results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600] font-bold">•</span>
                    <span>Head-to-head driver comparisons with performance metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600] font-bold">•</span>
                    <span>Lap time analysis with tire compound data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600] font-bold">•</span>
                    <span>Interactive telemetry charts for speed, throttle, brake, and gear data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600] font-bold">•</span>
                    <span>Historical F1 records and statistics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tech" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TechCard
                title="Frontend"
                icon={<Code size={24} className="text-[#E10600]" />}
                technologies={[
                  "Next.js 14",
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "shadcn/ui Components",
                  "Canvas for Charts",
                ]}
              />

              <TechCard
                title="Backend"
                icon={<Server size={24} className="text-[#E10600]" />}
                technologies={["Python", "FastAPI", "fastf1 Library", "pandas", "NumPy", "Matplotlib"]}
              />

              <TechCard
                title="Data"
                icon={<Database size={24} className="text-[#E10600]" />}
                technologies={[
                  "PostgreSQL",
                  "Redis for Caching",
                  "WebSockets for Live Updates",
                  "REST API",
                  "Data Visualization",
                  "Time Series Analysis",
                ]}
              />
            </div>

            <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
              <CardHeader>
                <CardTitle className="text-white">Architecture</CardTitle>
                <CardDescription className="text-gray-400">How F1 Analytics Hub works</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  F1 Analytics Hub uses a modern full-stack architecture with a clear separation between the frontend
                  and backend:
                </p>

                <div className="bg-[#2A2A3A] p-4 rounded-md space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Data Collection</h3>
                    <p className="text-sm text-gray-300">
                      The backend uses the fastf1 Python library to access official Formula 1 timing data, telemetry,
                      and results. This data is processed, analyzed, and stored in a database for quick access.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">API Layer</h3>
                    <p className="text-sm text-gray-300">
                      A FastAPI backend provides RESTful endpoints for the frontend to consume. This includes endpoints
                      for race data, driver statistics, team information, and historical records.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Frontend Application</h3>
                    <p className="text-sm text-gray-300">
                      The Next.js frontend provides a responsive, interactive user interface with real-time updates and
                      data visualizations. Server Components are used for data fetching, while Client Components handle
                      interactive elements.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Real-time Updates</h3>
                    <p className="text-sm text-gray-300">
                      WebSockets are used to provide real-time updates during race weekends, ensuring users have access
                      to the latest timing data and race information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
                <CardDescription className="text-gray-400">Get in touch with the developer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="w-24 h-24 bg-[#2A2A3A] rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold">EM</span>
                  </div>
                  <h3 className="text-xl font-bold">eng.mbuguaa</h3>
                  <p className="text-gray-400">Formula 1 Enthusiast & Developer</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a
                    href="https://github.com/eng-mbuguaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#2A2A3A] p-4 rounded-md hover:bg-[#3D3D4D] transition-colors"
                  >
                    <Github size={24} />
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://twitter.com/eng_mbuguaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#2A2A3A] p-4 rounded-md hover:bg-[#3D3D4D] transition-colors"
                  >
                    <Twitter size={24} />
                    <span>Twitter</span>
                  </a>

                  <a
                    href="mailto:contact@f1analytics.com"
                    className="flex items-center gap-3 bg-[#2A2A3A] p-4 rounded-md hover:bg-[#3D3D4D] transition-colors"
                  >
                    <Mail size={24} />
                    <span>Email</span>
                  </a>
                </div>

                <div className="bg-[#2A2A3A] p-4 rounded-md">
                  <h3 className="font-medium mb-2">Project Feedback</h3>
                  <p className="text-sm text-gray-300">
                    I'm always looking to improve F1 Analytics Hub. If you have any suggestions, feature requests, or
                    bug reports, please don't hesitate to reach out through any of the channels above.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

interface TechCardProps {
  title: string
  icon: React.ReactNode
  technologies: string[]
}

function TechCard({ title, icon, technologies }: TechCardProps) {
  return (
    <Card className="bg-[#1F1F2B] border-[#2A2A3A]">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {technologies.map((tech, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-[#E10600] font-bold">•</span>
              <span>{tech}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

