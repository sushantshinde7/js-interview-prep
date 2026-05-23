import { useNavigate } from 'react-router-dom'
import { TOPICS } from '../data/topics.js'
import { useProgress } from '../hooks/useProgress.js'
import ProgressRing from '../components/ProgressRing.jsx'
import Tag from '../components/Tag.jsx'

export default function HomePage() {
  const navigate = useNavigate()
  const { getTopicProgress } = useProgress()

  const totalPct = Math.round(
    TOPICS.reduce((sum, t) => sum + getTopicProgress(t.id), 0) / TOPICS.length
  )

  const stats = [
    { label: 'Total topics',   value: TOPICS.length,                                     color: '#7c6af7' },
    { label: 'Subtopics',      value: TOPICS.reduce((s, t) => s + t.subtopics.length, 0), color: '#60a5fa' },
    { label: 'Overall progress', value: totalPct + '%',                                  color: totalPct > 50 ? '#4ade80' : '#fbbf24' },
  ]

  return (
    <div style={{ padding: '32px 36px', maxWidth: 800 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8 }}>
          JavaScript for Interviews
        </h1>
        <p style={{ color: '#8a8a9a', fontSize: 15, lineHeight: 1.6, maxWidth: 520 }}>
          Theory + patterns + live code. Built for freshers preparing for frontend & full-stack roles.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
        {stats.map(s => (
          <div
            key={s.label}
            style={{
              background: '#1a1a1e',
              border: '1px solid #2a2a30',
              borderRadius: 10,
              padding: '16px 18px',
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 600, color: s.color, marginBottom: 4 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: '#8a8a9a' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Topic grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {TOPICS.map(topic => {
          const pct = getTopicProgress(topic.id)
          return (
            <button
              key={topic.id}
              onClick={() => navigate(`/topic/${topic.id}`)}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#7c6af7')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2a30')}
              style={{
                background: '#1a1a1e',
                border: '1px solid #2a2a30',
                borderRadius: 10,
                padding: '16px 18px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.15s',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
              }}
            >
              <ProgressRing pct={pct} size={36} stroke={3} color={pct === 100 ? '#4ade80' : '#7c6af7'} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#e8e8f0' }}>{topic.label}</span>
                  <Tag level={topic.difficulty} />
                </div>
                <div style={{ fontSize: 12, color: '#5a5a6a' }}>
                  {topic.subtopics.slice(0, 3).join(' · ')}
                  {topic.subtopics.length > 3 ? ` +${topic.subtopics.length - 3} more` : ''}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}