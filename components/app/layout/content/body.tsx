export function AppContentBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-y-auto lg:h-full">
      <div className="mx-auto p-4 max-w-7xl">{children}</div>
    </div>
  )
}
