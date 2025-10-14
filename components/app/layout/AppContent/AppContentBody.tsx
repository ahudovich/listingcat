export function AppContentBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto p-4 max-w-7xl">{children}</div>
    </div>
  )
}
