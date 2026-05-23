// Tag displays difficulty level: fresher | mid | tricky
// Usage: <Tag level="fresher" />

const styles = {
  fresher: { background: '#0d2318', color: '#4ade80' },
  mid:     { background: '#2a1f08', color: '#fbbf24' },
  tricky:  { background: '#2a0f0f', color: '#f87171' },
}

export default function Tag({ level }) {
  return (
    <span
      style={{
        ...styles[level],
        fontSize: 11,
        fontWeight: 600,
        padding: '2px 8px',
        borderRadius: 4,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}
    >
      {level}
    </span>
  )
}