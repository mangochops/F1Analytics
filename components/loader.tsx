interface LoaderProps {
  size?: "small" | "medium" | "large"
  text?: string
  fullScreen?: boolean
}

export function Loader({ size = "medium", text, fullScreen = false }: LoaderProps) {
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    medium: "w-10 h-10 border-3",
    large: "w-16 h-16 border-4",
  }

  const loaderContent = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizeClasses[size]} rounded-full border-t-[#E10600] border-r-[#E10600] border-b-[#E10600] border-l-transparent animate-spin`}
      />
      {text && <p className="mt-4 text-gray-300">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#15151E] bg-opacity-90 flex items-center justify-center z-50">
        {loaderContent}
      </div>
    )
  }

  return loaderContent
}

