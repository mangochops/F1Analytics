"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { PageLoader } from "@/components/page-loader"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ArrowRight } from "lucide-react"

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("latest")

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const filteredNews = newsArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col">
        <PageHeader title="F1 News" description="Latest Formula 1 News and Updates" />
        <div className="flex-1 flex items-center justify-center">
          <PageLoader />
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <PageHeader title="F1 News" description="Latest Formula 1 News and Updates" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#2A2A3A] border-[#3D3D4D] text-white"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="bg-[#2A2A3A] p-1">
              <TabsTrigger value="latest" className="data-[state=active]:bg-[#E10600] data-[state=active]:text-white">
                Latest
              </TabsTrigger>
              <TabsTrigger value="race" className="data-[state=active]:bg-[#E10600] data-[state=active]:text-white">
                Race
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-[#E10600] data-[state=active]:text-white">
                Team
              </TabsTrigger>
              <TabsTrigger value="driver" className="data-[state=active]:bg-[#E10600] data-[state=active]:text-white">
                Driver
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews
            .filter((article) => activeTab === "latest" || article.category === activeTab)
            .map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
        </div>
      </div>
    </main>
  )
}

interface NewsArticle {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  imageUrl: string
  author: string
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Card className="bg-[#1F1F2B] border-[#2A2A3A] overflow-hidden hover:border-[#E10600] transition-colors">
      <div className="h-48 bg-[#2A2A3A] relative">
        <img src={article.imageUrl || "/placeholder.svg"} alt={article.title} className="h-full w-full object-cover" />
        <div className="absolute top-3 right-3 bg-[#E10600] text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
          {article.category}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-white">{article.title}</CardTitle>
        <CardDescription className="text-gray-400 flex items-center gap-2">
          <Calendar size={14} />
          <span>{article.date}</span>
          <span className="mx-1">•</span>
          <span>{article.author}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300">{article.excerpt}</p>

        <Button className="w-full bg-[#2A2A3A] hover:bg-[#3D3D4D] text-white">
          Read More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Updated mock data for news articles with real images
const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Verstappen Dominates Japanese Grand Prix",
    excerpt:
      "Max Verstappen returned to winning ways with a commanding victory at Suzuka, leading from start to finish.",
    date: "April 7, 2024",
    category: "race",
    imageUrl: "/images/news/verstappen-japan.png",
    author: "F1 Reporter",
  },
  {
    id: 2,
    title: "Ferrari Confirms Major Upgrade Package for Miami",
    excerpt:
      "Ferrari will bring a significant upgrade package to the Miami Grand Prix as they look to close the gap to Red Bull.",
    date: "April 15, 2024",
    category: "team",
    imageUrl: "/images/news/ferrari-upgrade.png",
    author: "Technical Editor",
  },
  {
    id: 3,
    title: "Hamilton: 'Mercedes Making Progress with W15'",
    excerpt:
      "Lewis Hamilton believes Mercedes is making progress with their 2024 car despite challenging start to the season.",
    date: "April 12, 2024",
    category: "driver",
    imageUrl: "/images/news/hamilton-mercedes.png",
    author: "Team Correspondent",
  },
  {
    id: 4,
    title: "Chinese Grand Prix Preview: What to Expect",
    excerpt:
      "Formula 1 returns to Shanghai for the first time since 2019. Here's what to expect from the Chinese Grand Prix.",
    date: "April 18, 2024",
    category: "race",
    imageUrl: "/images/news/china-preview.png",
    author: "F1 Analyst",
  },
  {
    id: 5,
    title: "McLaren Signs Key Technical Staff from Rivals",
    excerpt:
      "McLaren has strengthened its technical team with key signings from rival teams as they continue their resurgence.",
    date: "April 14, 2024",
    category: "team",
    imageUrl: "/images/news/mclaren-technical.png",
    author: "F1 Insider",
  },
  {
    id: 6,
    title: "Sainz in Talks with Multiple Teams for 2025",
    excerpt:
      "Carlos Sainz confirms he's in discussions with multiple teams for 2025 after Ferrari announced his replacement.",
    date: "April 16, 2024",
    category: "driver",
    imageUrl: "/images/news/sainz-future.png",
    author: "Driver Market Specialist",
  },
]

