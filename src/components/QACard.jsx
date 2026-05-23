import { useState } from 'react'

// QACard shows a question and hides the answer until the user clicks reveal.
// Usage: <QACard q="What does map return?" a="A new array." />

export default function QACard({ q, a }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div
      style={{
        background: '#1a1a1e',
        border: '1px solid #2a2a30',
        borderRadius: 8,
        marginBottom: 8,
        overflow: 'hidden',
      }}
    >
      {/* Question row */}
      <div
        style={{
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
        }}
      >
        <span
          style={{ color: '#60a5fa', fontWeight: 600, fontSize: 13, flexShrink: 0 }}
        >
          Q
        </span>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: '#e8e8f0', flex: 1 }}>
          {q}
        </p>
        <button
          onClick={() => setRevealed(r => !r)}
          style={{
            background: revealed ? '#1e1b3a' : 'transparent',
            border: `1px solid ${revealed ? '#7c6af7' : '#2a2a30'}`,
            color: revealed ? '#a599ff' : '#8a8a9a',
            padding: '3px 10px',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 11,
            fontFamily: "'DM Sans', sans-serif",
            flexShrink: 0,
            transition: 'all 0.2s',
          }}
        >
          {revealed ? 'hide' : 'reveal'}
        </button>
      </div>

      {/* Answer row — only shown when revealed */}
      {revealed && (
        <div
          style={{
            padding: '10px 14px',
            borderTop: '1px solid #2a2a30',
            background: '#141416',
            display: 'flex',
            gap: 10,
          }}
        >
          <span
            style={{ color: '#4ade80', fontWeight: 600, fontSize: 13, flexShrink: 0 }}
          >
            A
          </span>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: '#e8e8f0' }}>{a}</p>
        </div>
      )}
    </div>
  )
}