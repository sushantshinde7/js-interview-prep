import { SNIPPETS } from '../data/snippets.js'
import Tag from '../components/Tag.jsx'

// Fast-scannable interview revision guide.

export default function CheatsheetPage() {
  const entries = Object.entries(SNIPPETS)

  const totalGotchas = entries.filter(
    ([, snippet]) => snippet.gotcha
  ).length

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
            Interview Guide
          </span>
        </div>

        <h1
          className="
            mb-3 text-3xl font-semibold
            tracking-[-0.03em]
            text-[#e8e8f0]
          "
        >
          JavaScript Interview Guide
        </h1>

        <p
          className="
            max-w-2xl
            text-[15px] leading-7
            text-[#8a8a9a]
          "
        >
          Quickly revise important JavaScript concepts, mental models,
          interview patterns, and commonly misunderstood behaviors before
          interviews or coding assessments.
        </p>

      </div>

      {/* Stats */}
      <section className="mb-8 grid gap-3 sm:grid-cols-3">

        <div
          className="
            rounded-xl border border-[#2a2a30]
            bg-[#1a1a1e]
            px-5 py-4
          "
        >
          <div className="mb-1 text-3xl font-semibold text-[#a599ff]">
            {entries.length}
          </div>

          <div className="text-xs text-[#8a8a9a]">
            Concepts
          </div>
        </div>

        <div
          className="
            rounded-xl border border-[#2a2a30]
            bg-[#1a1a1e]
            px-5 py-4
          "
        >
          <div className="mb-1 text-3xl font-semibold text-amber-300">
            {totalGotchas}
          </div>

          <div className="text-xs text-[#8a8a9a]">
            Common Gotchas
          </div>
        </div>

        <div
          className="
            rounded-xl border border-[#2a2a30]
            bg-[#1a1a1e]
            px-5 py-4
          "
        >
          <div className="mb-1 text-3xl font-semibold text-[#60a5fa]">
            100%
          </div>

          <div className="text-xs text-[#8a8a9a]">
            Interview Focused
          </div>
        </div>

      </section>

      {/* Guide Cards */}
      <div className="flex flex-col gap-4">

        {entries.map(([key, snippet]) => (
          <article
            key={key}
            className="
              rounded-xl border border-[#2a2a30]
              bg-[#1a1a1e]
              p-5
              transition-all duration-150
              hover:border-[#3a3a44]
            "
          >

            {/* Header */}
            <div className="mb-3 flex items-center gap-2">

              <h2
                className="
                  text-[15px] font-semibold
                  text-[#e8e8f0]
                "
              >
                {snippet.title}
              </h2>

              <Tag level={snippet.difficulty} />

            </div>

            {/* Theory */}
            <p
              className="
                text-[14px]
                leading-7
                text-[#8a8a9a]
              "
            >
              {snippet.theory}
            </p>

            {/* Gotcha */}
            {snippet.gotcha && (
              <div
                className="
                  mt-4 rounded-lg
                  border border-amber-400/15
                  bg-[#2a1f08]
                  px-4 py-3
                "
              >

                <div
                  className="
                    mb-1 text-[11px]
                    font-semibold uppercase
                    tracking-wide
                    text-amber-300
                  "
                >
                  Common Gotcha
                </div>

                <p
                  className="
                    text-[13px]
                    leading-6
                    text-amber-200
                  "
                >
                  {snippet.gotcha}
                </p>

              </div>
            )}

          </article>
        ))}

      </div>

      {/* Footer */}
      <div
        className="
          mt-8 rounded-xl
          border border-[#2a2a30]
          bg-[#141416]
          p-4
        "
      >
        <p
          className="
            text-sm leading-6
            text-[#8a8a9a]
          "
        >
          This guide grows alongside the tutorial library. New interview
          patterns, edge cases, browser behaviors, and advanced JavaScript
          concepts will be added over time.
        </p>
      </div>

    </div>
  )
}