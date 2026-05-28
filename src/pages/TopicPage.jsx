import { useParams } from 'react-router-dom'
import { TOPICS } from '../data/topics.js'
import { SNIPPETS } from '../data/snippets.js'
import { useProgress } from '../hooks/useProgress.js'
import CodeBlock from '../components/CodeBlock.jsx'
import QACard from '../components/QACard.jsx'
import Tag from '../components/Tag.jsx'

// TopicPage — main concept/article rendering area.
// Layout goals:
// - SubtopicsSidebar handles navigation
// - TopicPage takes the FULL remaining width
// - Inner article content stays readable with max-width
// - Future-ready for docs-style layouts and nested routes

export default function TopicPage() {
  const { topicId, subtopicId } = useParams()

  const topic = TOPICS.find(t => t.id === topicId)

  const { markTopic, getStatus } = useProgress()

  // URL-driven active subtopic
  // Falls back to the first subtopic if none provided
  const activeSubtopic = decodeURIComponent(
    subtopicId || topic?.subtopics[0] || ''
  )

  if (!topic) {
    return (
      <div className="p-8 text-sm text-[#8a8a9a]">
        Topic not found.
      </div>
    )
  }

  const snippet = SNIPPETS[activeSubtopic]

  const status = getStatus(topicId, activeSubtopic)

  return (
    <div className="flex flex-1 overflow-hidden">

      {/* Main scroll container */}
      <div className="flex-1 overflow-y-auto">

        {/* Docs-style content wrapper */}
        <div className="w-full max-w-5xl mx-auto px-8 py-6">

          {snippet ? (
            <div className="w-full">

              {/* ── Header ───────────────────────────── */}
              <div className="mb-6">

                <div className="flex items-center gap-2.5 mb-2">
                  <h1 className="text-2xl font-semibold tracking-tight text-[#e8e8f0]">
                    {snippet.title}
                  </h1>

                  <Tag level={snippet.difficulty} />
                </div>

                <p className="text-sm leading-relaxed text-[#8a8a9a] max-w-3xl">
                  JavaScript interview preparation notes, patterns,
                  edge cases, and practical examples.
                </p>

              </div>

              {/* ── Status Actions ───────────────────── */}
              <div className="flex gap-2 mb-8">

                {['learning', 'confident'].map(s => {
                  const isActive = status === s

                  const activeStyle =
                    s === 'confident'
                      ? 'bg-[#0d2318] border-[#4ade80] text-[#4ade80]'
                      : 'bg-[#2a1f08] border-[#fbbf24] text-[#fbbf24]'

                  return (
                    <button
                      key={s}
                      onClick={() =>
                        markTopic(
                          topicId,
                          activeSubtopic,
                          isActive ? 'unseen' : s
                        )
                      }
                      className={[
                        'px-3 py-1.5 rounded-md text-xs font-medium border',
                        'transition-all duration-150 cursor-pointer',
                        isActive
                          ? activeStyle
                          : 'bg-transparent border-[#2a2a30] text-[#8a8a9a] hover:border-[#3a3a44] hover:text-[#e8e8f0]',
                      ].join(' ')}
                    >
                      {s === 'learning'
                        ? '📖 learning'
                        : '✓ confident'}
                    </button>
                  )
                })}

              </div>

              {/* ── Theory ───────────────────────────── */}
              <section className="mb-8">

                <div className="
                  bg-[#1a1a1e]
                  border border-[#2a2a30]
                  border-l-[3px] border-l-[#7c6af7]
                  rounded-r-xl
                  px-5 py-4
                ">

                  <div className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#7c6af7]
                    mb-2
                  ">
                    Theory
                  </div>

                  <p className="
                    text-[15px]
                    leading-7
                    text-[#e8e8f0]
                  ">
                    {snippet.theory}
                  </p>

                </div>

              </section>

              {/* ── Code Patterns ───────────────────── */}
              <section className="mb-10">

                <div className="
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#8a8a9a]
                  mb-4
                ">
                  Patterns
                </div>

                <div className="space-y-5">

                  {snippet.patterns.map((p, i) => (
                    <div key={i}>

                      <div className="
                        flex items-center gap-2
                        mb-2
                        pl-0.5
                      ">

                        <span className="
                          text-xs
                          font-semibold
                          text-[#a599ff]
                        ">
                          #{i + 1}
                        </span>

                        <span className="
                          text-xs
                          text-[#8a8a9a]
                        ">
                          {p.label}
                        </span>

                      </div>

                      <CodeBlock
                        code={p.code}
                        runnable
                      />

                    </div>
                  ))}

                </div>

              </section>

              {/* ── Interview Q&A ───────────────────── */}
              <section className="mb-10">

                <div className="
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#8a8a9a]
                  mb-4
                ">
                  Interview Q&amp;A
                </div>

                <div className="space-y-3">

                  {snippet.interview.map((qa, i) => (
                    <QACard
                      key={i}
                      q={qa.q}
                      a={qa.a}
                    />
                  ))}

                </div>

              </section>

              {/* ── Common Gotcha ───────────────────── */}
              <section>

                <div className="
                  bg-[#2a1f08]
                  border border-amber-400/15
                  border-l-[3px] border-l-[#fbbf24]
                  rounded-r-xl
                  px-5 py-4
                ">

                  <div className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#fbbf24]
                    mb-2
                  ">
                    ⚠ Common gotcha
                  </div>

                  <p className="
                    text-[14px]
                    leading-6
                    text-[#e8e8f0]
                  ">
                    {snippet.gotcha}
                  </p>

                </div>

              </section>

            </div>
          ) : (

            /* ── Empty State ───────────────────────── */
            <div className="
              w-full max-w-3xl
              bg-[#1a1a1e]
              border border-[#2a2a30]
              rounded-2xl
              p-6
            ">

              <div className="
                text-lg
                font-semibold
                text-[#e8e8f0]
                mb-2
              ">
                {activeSubtopic}
              </div>

              <p className="
                text-sm
                leading-6
                text-[#8a8a9a]
                mb-5
              ">
                Content for this subtopic is currently being added.
                You can still track your learning progress below.
              </p>

              <div className="flex gap-2">

                {['learning', 'confident'].map(s => {
                  const isActive = status === s

                  return (
                    <button
                      key={s}
                      onClick={() =>
                        markTopic(
                          topicId,
                          activeSubtopic,
                          isActive ? 'unseen' : s
                        )
                      }
                      className={[
                        'px-3.5 py-1.5 rounded-md text-xs border font-medium',
                        'transition-all duration-150 cursor-pointer',
                        isActive
                          ? 'bg-[#1e1b3a] border-[#7c6af7] text-[#a599ff]'
                          : 'bg-transparent border-[#2a2a30] text-[#8a8a9a] hover:border-[#3a3a44]',
                      ].join(' ')}
                    >
                      {s === 'learning'
                        ? '📖 learning'
                        : '✓ confident'}
                    </button>
                  )
                })}

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  )
}