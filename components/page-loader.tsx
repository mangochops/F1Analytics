import { Loader } from "./loader"

export function PageLoader() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <Loader size="large" text="Loading data..." />
    </div>
  )
}

