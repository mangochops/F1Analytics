import type React from "react"
interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="bg-[#E10600] py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-lg opacity-90 mt-2">{description}</p>}
        {children}
      </div>
    </div>
  )
}

