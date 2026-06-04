import { TOPICS } from '../data/topics.js'
import { useProgress } from '../hooks/useProgress.js'
import ProgressRing from '../components/ProgressRing.jsx'
import Tag from '../components/Tag.jsx'

// Learning progress dashboard.

export default function ProgressPage() {
  const { progress, getTopicProgress, getStatus } = useProgress()

  const totalSubtopics = TOPICS.reduce(
    (s, t) => s + t.subtopics.length,
    0
  )

  const totalConfident = Object.values(progress)
    .filter(v => v === 'confident').length

  const totalLearning = Object.values(progress)
    .filter(v => v === 'learning').length

  const totalUnseen =
    totalSubtopics - totalConfident - totalLearning

  const overallPct =
    totalSubtopics === 0
      ? 0
      : Math.round((totalConfident / totalSubtopics) * 100)

  const pillClasses = {
    unseen:
      'border border-[#2a2a30] bg-[#141416] text-[#5a5a6a]',

    learning:
      'border border-amber-400/20 bg-[#2a1f08] text-amber-300',

    confident:
      'border border-green-400/20 bg-[#0d2318] text-green-400',
  }

  const stats = [
    {
      label: 'Confident',
      value: totalConfident,
      color: 'text-green-400',
    },
    {
      label: 'Learning',
      value: totalLearning,
      color: 'text-amber-300',
    },
    {
      label: 'Not Started',
      value: totalUnseen,
      color: 'text-[#5a5a6a]',
    },
  ]

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">

      {/* Header */}
      <div className="mb-8">

        <div className="mb-2 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#7c6af7]" />

          <span
            className="
              text-[11px] font-semibold uppercase
              tracking-[0.18em]
              text-[#7c6af7]
            "
          >
            Learning Dashboard
          </span>
        </div>

        <h1
          className="
            mb-3 text-3xl font-semibold
            tracking-[-0.03em]
            text-[#e8e8f0]
          "
        >
          My Progress
        </h1>

        <p
          className="
            max-w-2xl
            text-[15px] leading-7
            text-[#8a8a9a]
          "
        >
          Track topic completion, confidence levels, and learning
          momentum across your JavaScript interview preparation.
        </p>

      </div>

      {/* Overall Progress */}
      <section
        className="
          mb-8 rounded-xl
          border border-[#2a2a30]
          bg-[#1a1a1e]
          p-5
        "
      >

        <div className="mb-4 flex items-center justify-between">

          <div>
            <h2 className="text-sm font-semibold text-[#e8e8f0]">
              Overall Completion
            </h2>

            <p className="mt-1 text-xs text-[#8a8a9a]">
              Based on subtopics marked as confident.
            </p>
          </div>

          <div
            className={[
              'text-2xl font-semibold',
              overallPct >= 80
                ? 'text-green-400'
                : 'text-[#7c6af7]',
            ].join(' ')}
          >
            {overallPct}%
          </div>

        </div>

        <div
          className="
            h-2 overflow-hidden
            rounded-full bg-[#2a2a30]
          "
        >
          <div
            className="
              h-full rounded-full
              bg-[#7c6af7]
              transition-all duration-300
            "
            style={{
              width: `${overallPct}%`,
            }}
          />
        </div>

      </section>

      {/* Stats */}
      <section className="mb-8 grid gap-3 sm:grid-cols-3">

        {stats.map(stat => (
          <div
            key={stat.label}
            className="
              rounded-xl border border-[#2a2a30]
              bg-[#1a1a1e]
              px-5 py-4
            "
          >
            <div
              className={`mb-1 text-3xl font-semibold ${stat.color}`}
            >
              {stat.value}
            </div>

            <div className="text-xs text-[#8a8a9a]">
              {stat.label}
            </div>
          </div>
        ))}

      </section>

      {/* Topics */}
      <div className="flex flex-col gap-4">

        {TOPICS.map(topic => {
          const pct = getTopicProgress(topic.id)

          return (
            <article
              key={topic.id}
              className="
                rounded-xl border border-[#2a2a30]
                bg-[#1a1a1e]
                p-5
                transition-all duration-150
                hover:border-[#3a3a44]
              "
            >

              {/* Header */}
              <div className="mb-4 flex items-center gap-3">

                <ProgressRing
                  pct={pct}
                  size={34}
                  stroke={3}
                  color={
                    pct === 100
                      ? '#4ade80'
                      : '#7c6af7'
                  }
                />

                <div className="min-w-0 flex-1">

                  <div className="mb-1 flex items-center gap-2">

                    <h2
                      className="
                        truncate text-[15px]
                        font-semibold text-[#e8e8f0]
                      "
                    >
                      {topic.label}
                    </h2>

                    <Tag level={topic.difficulty} />

                  </div>

                  <div className="text-xs text-[#5a5a6a]">
                    {topic.subtopics.length} subtopics
                  </div>

                </div>

                <div
                  className={[
                    'text-sm font-semibold',
                    pct === 100
                      ? 'text-green-400'
                      : 'text-[#7c6af7]',
                  ].join(' ')}
                >
                  {pct}%
                </div>

              </div>

              {/* Subtopics */}
              <div className="flex flex-wrap gap-2">

                {topic.subtopics.map(sub => {
                  const st = getStatus(topic.id, sub)

                  return (
                    <span
                      key={sub}
                      className={[
                        'rounded-md px-2.5 py-1',
                        'text-[11px]',
                        pillClasses[st],
                      ].join(' ')}
                    >
                      {sub}
                    </span>
                  )
                })}

              </div>

            </article>
          )
        })}

      </div>

    </div>
  )
}