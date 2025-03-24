"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { name: "Home", path: "/" },
    { name: "Races", path: "/races" },
    { name: "Drivers", path: "/drivers" },
    { name: "Teams", path: "/teams" },
    { name: "Statistics", path: "/statistics" },
    { name: "News", path: "/news" },
    { name: "About", path: "/about" },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-[#15151E] border-b border-[#2A2A3A]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-[#E10600] rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">F1</span>
              </div>
              <span className="text-white font-bold text-lg hidden sm:block">F1 Analytics Hub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === route.path
                      ? "bg-[#E10600] text-white"
                      : "text-gray-300 hover:bg-[#2A2A3A] hover:text-white",
                  )}
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gray-300 hover:bg-[#2A2A3A] hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1F1F2B] border-t border-[#2A2A3A]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === route.path
                    ? "bg-[#E10600] text-white"
                    : "text-gray-300 hover:bg-[#2A2A3A] hover:text-white",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

