interface BaseDonutProgressProps {
  value: number
  size?: number
  strokeWidth?: number
}

export default function BaseDonutProgress({
  value,
  size = 16,
  strokeWidth = 3,
}: BaseDonutProgressProps) {
  const clampedValue = Math.max(0, Math.min(100, value)) // 0–100
  const innerRadius = size / 2 - strokeWidth
  const remainingValue = 100 - clampedValue

  // Full color gradient (always 0-100%) - clockwise from top
  const baseGradient = `conic-gradient(
    from 0deg,
    #ff6900 0%,
    #f0b100 50%,
    #00c950 100%
  )`

  // Gray overlay for remaining portion - counter-clockwise from progress point
  const overlayGradient = `conic-gradient(
    from ${(360 * clampedValue) / 100}deg,
    #e5e7eb 0% ${remainingValue}%,
    transparent ${remainingValue}% 100%
  )`

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Base color gradient ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: baseGradient,
        }}
      />

      {/* Gray overlay ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: overlayGradient,
        }}
      />

      {/* Center dot */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
        style={{
          width: innerRadius * 2,
          height: innerRadius * 2,
        }}
      />
    </div>
  )
}
