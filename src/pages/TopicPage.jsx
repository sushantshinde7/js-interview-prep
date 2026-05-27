import { useParams } from 'react-router-dom'
import { TOPICS } from '../data/topics.js'
import { SNIPPETS } from '../data/snippets.js'
import { useProgress } from '../hooks/useProgress.js'
import CodeBlock from '../components/CodeBlock.jsx'
import QACard from '../components/QACard.jsx'
import Tag from '../components/Tag.jsx'

// TopicPage — content area only.
// The subtopic list now lives in Sidebar.jsx (rendered by App.jsx layout).
// This page manages which subtopic is active via local state.
// Later: activeSubtopic will be driven by a :subtopicId URL param.

export default function TopicPage() {
  const { topicId, subtopicId } = useParams()
  const topic = TOPICS.find(t => t.id === topicId)
  const { markTopic, getStatus } = useProgress()

 const activeSubtopic = decodeURIComponent(subtopicId || topic?.subtopics[0] || '')
  
 if (!topic) {
    return (
      <div className="p-8 text-[#8a8a9a]">Topic not found.</div>
    )
  }

  const snippet = SNIPPETS[activeSubtopic]
  const status = getStatus(topicId, activeSubtopic)

  return (
    <div className="flex flex-1 overflow-hidden">

      {/* ── Content area ─────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {snippet ? (
          <div className="max-w-[740px]">

            {/* Header */}
            <div className="flex items-center gap-2.5 mb-1.5">
              <h2 className="text-xl font-semibold text-[#e8e8f0]">{snippet.title}</h2>
              <Tag level={snippet.difficulty} />
            </div>

            {/* Status buttons */}
            <div className="flex gap-2 mb-5">
              {['learning', 'confident'].map(s => {
                const isActive = status === s
                const activeStyle = s === 'confident'
                  ? 'bg-[#0d2318] border-[#4ade80] text-[#4ade80]'
                  : 'bg-[#2a1f08] border-[#fbbf24] text-[#fbbf24]'
                return (
                  <button
                    key={s}
                    onClick={() => markTopic(topicId, activeSubtopic, isActive ? 'unseen' : s)}
                    className={[
                      'px-3 py-1 rounded-md text-xs border transition-all duration-150 cursor-pointer',
                      isActive ? activeStyle : 'bg-transparent border-[#2a2a30] text-[#8a8a9a] hover:border-[#3a3a44]',
                    ].join(' ')}
                  >
                    {s === 'learning' ? '📖 learning' : '✓ confident'}
                  </button>
                )
              })}
            </div>

            {/* Theory block */}
            <div className="bg-[#1a1a1e] border border-[#2a2a30] border-l-[3px] border-l-[#7c6af7] rounded-r-lg px-4 py-3.5 mb-5">
              <div className="text-[11px] font-semibold text-[#7c6af7] mb-1.5 uppercase tracking-wider">
                Theory
              </div>
              <p className="text-sm text-[#e8e8f0] leading-relaxed">{snippet.theory}</p>
            </div>

            {/* Code patterns */}
            <div className="mb-6">
              <div className="text-[13px] font-semibold text-[#8a8a9a] mb-3 uppercase tracking-wider">
                Patterns
              </div>
              {snippet.patterns.map((p, i) => (
                <div key={i} className="mb-4">
                  <div className="text-xs text-[#8a8a9a] mb-1.5 pl-0.5">
                    <span className="text-[#a599ff] font-semibold">#{i + 1}</span>
                    &nbsp;&nbsp;{p.label}
                  </div>
                  <CodeBlock code={p.code} runnable />
                </div>
              ))}
            </div>

            {/* Interview Q&A */}
            <div className="mb-6">
              <div className="text-[13px] font-semibold text-[#8a8a9a] mb-3 uppercase tracking-wider">
                Interview Q&amp;A
              </div>
              {snippet.interview.map((qa, i) => (
                <QACard key={i} q={qa.q} a={qa.a} />
              ))}
            </div>

            {/* Gotcha */}
            <div className="bg-[#2a1f08] border border-[rgba(251,191,36,0.2)] border-l-[3px] border-l-[#fbbf24] rounded-r-lg px-4 py-3">
              <div className="text-[11px] font-semibold text-[#fbbf24] mb-1 uppercase tracking-wider">
                ⚠ Common gotcha
              </div>
              <p className="text-[13px] text-[#e8e8f0] leading-relaxed">{snippet.gotcha}</p>
            </div>

          </div>
        ) : (
          /* Subtopic has no content yet */
          <div className="bg-[#1a1a1e] border border-[#2a2a30] rounded-xl p-6 max-w-[480px]">
            <div className="text-base font-semibold mb-2 text-[#e8e8f0]">{activeSubtopic}</div>
            <div className="text-sm text-[#8a8a9a] leading-relaxed mb-4">
              Content for this subtopic is being added. You can still mark your progress below.
            </div>
            <div className="flex gap-2">
              {['learning', 'confident'].map(s => {
                const isActive = status === s
                return (
                  <button
                    key={s}
                    onClick={() => markTopic(topicId, activeSubtopic, isActive ? 'unseen' : s)}
                    className={[
                      'px-3.5 py-1 rounded-md text-xs border transition-all duration-150 cursor-pointer',
                      isActive
                        ? 'bg-[#1e1b3a] border-[#7c6af7] text-[#a599ff]'
                        : 'bg-transparent border-[#2a2a30] text-[#8a8a9a]',
                    ].join(' ')}
                  >
                    {s === 'learning' ? '📖 learning' : '✓ confident'}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}