import { useNavigate } from 'react-router-dom'
import { TOPICS } from '../data/topics.js'
import { useProgress } from '../hooks/useProgress.js'
import ProgressRing from '../components/ProgressRing.jsx'
import Tag from '../components/Tag.jsx'

const HOW_IT_WORKS = [
  {
    step: '01',
    label: 'Pick a Topic',
    desc: 'Choose a JavaScript topic and start from the fundamentals or jump directly to concepts you want to revise.',
  },
  {
    step: '02',
    label: 'Learn the Concepts',
    desc: 'Study explanations, mental models, code examples, and practical patterns used in real applications.',
  },
  {
    step: '03',
    label: 'Practice Interview Questions',
    desc: 'Review interview-focused questions and explanations to strengthen your understanding.',
  },
  {
    step: '04',
    label: 'Track Progress',
    desc: 'Mark concepts as learning or confident and keep track of your preparation journey.',
  },
]

export default function TutorialsOverviewPage() {
  const navigate = useNavigate()
  const { getTopicProgress } = useProgress()

  const totalSubtopics = TOPICS.reduce(
    (sum, topic) => sum + topic.subtopics.length,
    0
  )

  const overallPct = Math.round(
    TOPICS.reduce(
      (sum, topic) => sum + getTopicProgress(topic.id),
      0
    ) / TOPICS.length
  )

  const stats = [
    {
      label: 'Topics',
      value: TOPICS.length,
      color: 'text-[#a599ff]',
    },
    {
      label: 'Concepts',
      value: totalSubtopics,
      color: 'text-[#60a5fa]',
    },
    {
      label: 'Your Progress',
      value: `${overallPct}%`,
      color:
        overallPct >= 60
          ? 'text-[#4ade80]'
          : 'text-[#fbbf24]',
    },
  ]

  function goToTopic(topic) {
    navigate(
      `/tutorials/${topic.id}/${encodeURIComponent(
        topic.subtopics[0]
      )}`
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">

      {/* Hero */}
      <section className="mb-10">

        <div className="mb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#7c6af7]" />

          <span className="
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#7c6af7]
          ">
            Tutorials
          </span>
        </div>

        <h1 className="
          mb-4
          text-4xl
          font-semibold
          tracking-[-0.04em]
          text-[#e8e8f0]
        ">
          JavaScript Learning Paths
        </h1>

        <p className="
          max-w-3xl
          text-[15px]
          leading-7
          text-[#8a8a9a]
        ">
          Structured JavaScript tutorials designed
          specifically for frontend interviews.
          Learn concepts, understand mental models,
          practice interview questions, and track
          your progress through every topic.
        </p>

      </section>

      {/* Stats */}
      <section className="mb-10 grid gap-4 sm:grid-cols-3">

        {stats.map(stat => (
          <div
            key={stat.label}
            className="
              rounded-2xl
              border border-[#26262d]
              bg-[#18181c]
              px-5 py-5
            "
          >
            <div
              className={`mb-1 text-3xl font-semibold ${stat.color}`}
            >
              {stat.value}
            </div>

            <div className="
              text-xs
              uppercase
              tracking-wide
              text-[#8a8a9a]
            ">
              {stat.label}
            </div>
          </div>
        ))}

      </section>

      {/* Learning Flow */}
      <section className="mb-10">

        <div className="mb-5">

          <h2 className="
            text-xl
            font-semibold
            text-[#e8e8f0]
          ">
            Learning Flow
          </h2>

          <p className="
            mt-1
            text-sm
            text-[#8a8a9a]
          ">
            A simple path to get the most from the tutorials.
          </p>

        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          {HOW_IT_WORKS.map(item => (
            <div
              key={item.step}
              className="
                rounded-2xl
                border border-[#26262d]
                bg-[#18181c]
                p-5
              "
            >
              <div className="
                mb-3
                text-xs
                font-semibold
                tracking-[0.15em]
                text-[#7c6af7]
              ">
                {item.step}
              </div>

              <h3 className="
                mb-2
                text-sm
                font-semibold
                text-[#e8e8f0]
              ">
                {item.label}
              </h3>

              <p className="
                text-[13px]
                leading-6
                text-[#8a8a9a]
              ">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* Topics */}
      <section>

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="
              text-xl
              font-semibold
              text-[#e8e8f0]
            ">
              All Topics
            </h2>

            <p className="
              mt-1
              text-sm
              text-[#8a8a9a]
            ">
              Start from any topic and continue at your own pace.
            </p>
          </div>

          <div className="
            hidden
            rounded-lg
            border border-[#26262d]
            bg-[#141418]
            px-3 py-1.5
            text-xs
            text-[#6a6a76]
            md:block
          ">
            {TOPICS.length} learning tracks
          </div>

        </div>

        <div className="grid gap-4 lg:grid-cols-2">

          {TOPICS.map(topic => {
            const pct = getTopicProgress(topic.id)

            return (
              <button
                key={topic.id}
                onClick={() => goToTopic(topic)}
                className="
                  group
                  flex items-start gap-4
                  rounded-2xl
                  border border-[#26262d]
                  bg-[#18181c]
                  p-5
                  text-left
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-[#7c6af7]
                  hover:bg-[#1c1c21]
                "
              >

                <div className="mt-0.5 shrink-0">
                  <ProgressRing
                    pct={pct}
                    size={40}
                    stroke={3}
                    color={
                      pct === 100
                        ? '#4ade80'
                        : '#7c6af7'
                    }
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="mb-2 flex items-center gap-2">

                    <h3 className="
                      truncate
                      text-[15px]
                      font-semibold
                      text-[#e8e8f0]
                    ">
                      {topic.label}
                    </h3>

                    <Tag level={topic.difficulty} />

                  </div>

                  <div className="
                    mb-4
                    text-[13px]
                    leading-6
                    text-[#8a8a9a]
                  ">
                    {topic.subtopics
                      .slice(0, 4)
                      .join(' · ')}

                    {topic.subtopics.length > 4 && (
                      <span className="text-[#5a5a6a]">
                        {' '}
                        +{topic.subtopics.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="
                    flex items-center justify-between
                    text-xs
                  ">

                    <span className="text-[#5a5a6a]">
                      {topic.subtopics.length} subtopics
                    </span>

                    <span className="
                      flex items-center gap-1
                      font-medium
                      text-[#7c6af7]
                      opacity-0
                      transition-opacity
                      group-hover:opacity-100
                    ">
                      Open Topic →
                    </span>

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