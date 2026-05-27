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
    {
      label: 'Total topics',
      value: TOPICS.length,
      color: 'text-[#a599ff]',
    },
    {
      label: 'Subtopics',
      value: TOPICS.reduce((s, t) => s + t.subtopics.length, 0),
      color: 'text-[#60a5fa]',
    },
    {
      label: 'Overall progress',
      value: `${totalPct}%`,
      color:
        totalPct >= 60
          ? 'text-[#4ade80]'
          : 'text-[#fbbf24]',
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">

      {/* ── Hero / intro ───────────────────────── */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#7c6af7]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7c6af7]">
            JavaScript Interview Platform
          </span>
        </div>

        <h1 className="
          mb-3
          max-w-3xl
          text-3xl font-semibold tracking-[-0.03em]
          text-[#e8e8f0]
        ">
          Master JavaScript for Frontend Interviews
        </h1>

        <p className="
          max-w-2xl
          text-[15px] leading-7
          text-[#8a8a9a]
        ">
          Deep-dive concepts, interview-focused theory, practical coding
          patterns, edge cases, browser behavior, quizzes, and real-world
          JavaScript nuances — structured for frontend and full-stack
          interview preparation.
        </p>
      </section>

      {/* ── Stats ─────────────────────────────── */}
      <section className="mb-8 grid gap-3 sm:grid-cols-3">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="
              rounded-xl border border-[#2a2a30]
              bg-[#1a1a1e]
              px-5 py-4
              transition-all duration-150
            "
          >
            <div className={`mb-1 text-3xl font-semibold ${stat.color}`}>
              {stat.value}
            </div>

            <div className="text-xs tracking-wide text-[#8a8a9a]">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* ── Topics section ───────────────────── */}
      <section>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#e8e8f0]">
              Core JavaScript Topics
            </h2>

            <p className="mt-1 text-sm text-[#8a8a9a]">
              Structured learning paths with concepts, patterns, interview
              questions, and practical examples.
            </p>
          </div>

          <div className="
            hidden rounded-md border border-[#2a2a30]
            bg-[#141418] px-3 py-1 text-xs text-[#5a5a6a]
            md:block
          ">
            {TOPICS.length} learning tracks
          </div>
        </div>

        {/* Topic cards */}
        <div className="grid gap-3 lg:grid-cols-2">
          {TOPICS.map(topic => {
            const pct = getTopicProgress(topic.id)

            return (
              <button
                key={topic.id}
                onClick={() =>
                  navigate(
                    `/topic/${topic.id}/${encodeURIComponent(
                      topic.subtopics[0]
                    )}`
                  )
                }
                className="
                  group
                  flex items-start gap-4
                  rounded-xl border border-[#2a2a30]
                  bg-[#1a1a1e]
                  p-5 text-left
                  transition-all duration-150
                  hover:border-[#7c6af7]
                  hover:bg-[#1d1d22]
                "
              >

                {/* Progress */}
                <div className="mt-0.5 shrink-0">
                  <ProgressRing
                    pct={pct}
                    size={38}
                    stroke={3}
                    color={pct === 100 ? '#4ade80' : '#7c6af7'}
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">

                  {/* Title row */}
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="
                      truncate
                      text-[15px] font-semibold
                      text-[#e8e8f0]
                    ">
                      {topic.label}
                    </h3>

                    <Tag level={topic.difficulty} />
                  </div>

                  {/* Subtopics preview */}
                  <div className="
                    mb-3
                    text-[13px] leading-6
                    text-[#8a8a9a]
                  ">
                    {topic.subtopics.slice(0, 3).join(' · ')}

                    {topic.subtopics.length > 3 && (
                      <span className="text-[#5a5a6a]">
                        {' '}
                        +{topic.subtopics.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="
                    flex items-center justify-between
                    text-xs
                  ">

                    <div className="text-[#5a5a6a]">
                      {topic.subtopics.length} subtopics
                    </div>

                    <div className="
                      flex items-center gap-1.5
                      font-medium text-[#7c6af7]
                      opacity-0 transition-all duration-150
                      group-hover:opacity-100
                    ">
                      Open topic
                      <span className="translate-y-[0.5px]">→</span>
                    </div>

                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </section>

    </div>
  )
}