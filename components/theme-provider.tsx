"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ReactNode } from "react"

// Define the props type manually based on next-themes documentation
interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: string
  themes?: string[]
  attribute?: string
  forcedTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  storageKey?: string
  nonce?: string
  [key: string]: any // Allow additional props
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

