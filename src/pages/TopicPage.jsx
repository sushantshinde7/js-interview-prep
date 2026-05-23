import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { TOPICS } from '../data/topics.js'
import { SNIPPETS } from '../data/snippets.js'
import { useProgress } from '../hooks/useProgress.js'
import CodeBlock from '../components/CodeBlock.jsx'
import QACard from '../components/QACard.jsx'
import Tag from '../components/Tag.jsx'

// TopicPage reads :topicId from the URL via useParams,
// then shows a sub-nav of subtopics on the left and the content on the right.

export default function TopicPage() {
  const { topicId } = useParams()
  const topic = TOPICS.find(t => t.id === topicId)
  const { markTopic, getStatus } = useProgress()

  const [activeSubtopic, setActiveSubtopic] = useState(
    topic?.subtopics[0] || ''
  )

  if (!topic) {
    return (
      <div style={{ padding: 32, color: '#8a8a9a' }}>Topic not found.</div>
    )
  }

  const snippet = SNIPPETS[activeSubtopic]
  const status = getStatus(topicId, activeSubtopic)

  const statusDotColor = {
    unseen:    '#5a5a6a',
    learning:  '#fbbf24',
    confident: '#4ade80',
  }

  return (
    <div style={{ display: 'flex', height: '100%', flex: 1, overflow: 'hidden' }}>

      {/* ── Sub-nav ─────────────────────────────── */}
      <div
        style={{
          width: 180,
          borderRight: '1px solid #2a2a30',
          padding: '20px 0',
          overflowY: 'auto',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: '0 14px 10px',
            fontSize: 11,
            fontWeight: 600,
            color: '#5a5a6a',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {topic.label}
        </div>

        {topic.subtopics.map(sub => {
          const st = getStatus(topicId, sub)
          const isActive = sub === activeSubtopic
          return (
            <button
              key={sub}
              onClick={() => setActiveSubtopic(sub)}
              style={{
                width: '100%',
                background: isActive ? '#1e1b3a' : 'transparent',
                border: 'none',
                color: isActive ? '#a599ff' : '#8a8a9a',
                padding: '7px 14px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                transition: 'all 0.15s',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: statusDotColor[st],
                  flexShrink: 0,
                }}
              />
              {sub}
            </button>
          )
        })}
      </div>

      {/* ── Main content ────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
        {snippet ? (
          <div style={{ maxWidth: 740 }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600 }}>{snippet.title}</h2>
              <Tag level={snippet.difficulty} />
            </div>

            {/* Status buttons */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {['learning', 'confident'].map(s => (
                <button
                  key={s}
                  onClick={() =>
                    markTopic(topicId, activeSubtopic, status === s ? 'unseen' : s)
                  }
                  style={{
                    background:
                      status === s
                        ? s === 'confident' ? '#0d2318' : '#2a1f08'
                        : 'transparent',
                    border: `1px solid ${
                      status === s
                        ? s === 'confident' ? '#4ade80' : '#fbbf24'
                        : '#2a2a30'
                    }`,
                    color:
                      status === s
                        ? s === 'confident' ? '#4ade80' : '#fbbf24'
                        : '#8a8a9a',
                    padding: '4px 12px',
                    borderRadius: 5,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontFamily: "'DM Sans', sans-serif",
                    transition: 'all 0.15s',
                  }}
                >
                  {s === 'learning' ? '📖 learning' : '✓ confident'}
                </button>
              ))}
            </div>

            {/* Theory block */}
            <div
              style={{
                background: '#1a1a1e',
                border: '1px solid #2a2a30',
                borderLeft: '3px solid #7c6af7',
                borderRadius: '0 8px 8px 0',
                padding: '14px 16px',
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#7c6af7',
                  marginBottom: 6,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Theory
              </div>
              <p style={{ fontSize: 14, color: '#e8e8f0', lineHeight: 1.7 }}>
                {snippet.theory}
              </p>
            </div>

            {/* Code patterns */}
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#8a8a9a',
                  marginBottom: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                }}
              >
                Patterns
              </div>
              {snippet.patterns.map((p, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: '#8a8a9a', marginBottom: 6, paddingLeft: 2 }}>
                    <span style={{ color: '#a599ff', fontWeight: 600 }}>#{i + 1}</span>
                    {'  '}{p.label}
                  </div>
                  <CodeBlock code={p.code} runnable />
                </div>
              ))}
            </div>

            {/* Interview Q&A */}
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#8a8a9a',
                  marginBottom: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                }}
              >
                Interview Q&amp;A
              </div>
              {snippet.interview.map((qa, i) => (
                <QACard key={i} q={qa.q} a={qa.a} />
              ))}
            </div>

            {/* Gotcha */}
            <div
              style={{
                background: '#2a1f08',
                border: '1px solid rgba(251,191,36,0.2)',
                borderLeft: '3px solid #fbbf24',
                borderRadius: '0 8px 8px 0',
                padding: '12px 16px',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#fbbf24',
                  marginBottom: 5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                ⚠ Common gotcha
              </div>
              <p style={{ fontSize: 13, color: '#e8e8f0', lineHeight: 1.65 }}>
                {snippet.gotcha}
              </p>
            </div>

          </div>
        ) : (
          // Subtopic has no snippet yet
          <div
            style={{
              background: '#1a1a1e',
              border: '1px solid #2a2a30',
              borderRadius: 10,
              padding: '28px 24px',
              maxWidth: 480,
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              {activeSubtopic}
            </div>
            <div
              style={{ fontSize: 14, color: '#8a8a9a', lineHeight: 1.6, marginBottom: 16 }}
            >
              Content for this subtopic is being added. You can still mark your progress below.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['learning', 'confident'].map(s => (
                <button
                  key={s}
                  onClick={() =>
                    markTopic(topicId, activeSubtopic, status === s ? 'unseen' : s)
                  }
                  style={{
                    background: status === s ? '#1e1b3a' : 'transparent',
                    border: `1px solid ${status === s ? '#7c6af7' : '#2a2a30'}`,
                    color: status === s ? '#a599ff' : '#8a8a9a',
                    padding: '5px 14px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {s === 'learning' ? '📖 learning' : '✓ confident'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}