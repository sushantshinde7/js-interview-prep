// ProgressRing renders an SVG circle that fills based on pct (0–100)
// Usage: <ProgressRing pct={75} size={28} stroke={3} color="#7c6af7" />

export default function ProgressRing({
  pct,
  size = 28,
  stroke = 3,
  color = '#7c6af7',
}) {
  const r = (size - stroke * 2) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (pct / 100) * circumference

  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      {/* Background track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#2a2a30"
        strokeWidth={stroke}
      />
      {/* Filled arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </svg>
  )
}