interface LoadingCardProps {
  height?: string
}

export function LoadingCard({ height = "200px" }: LoadingCardProps) {
  return <div className="w-full rounded-md bg-[#2A2A3A] overflow-hidden loading-shimmer" style={{ height }}></div>
}

