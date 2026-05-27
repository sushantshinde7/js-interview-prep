import { SNIPPETS } from '../data/snippets.js'
import Tag from '../components/Tag.jsx'

// Fast-scannable mental-model reference page.

export default function CheatsheetPage() {
  const entries = Object.entries(SNIPPETS)

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">

      {/* Header */}
      <div className="mb-7">

        <div className="mb-2 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#7c6af7]" />

          <span className="
            text-[11px] font-semibold uppercase
            tracking-[0.18em] text-[#7c6af7]
          ">
            Quick Revision
          </span>
        </div>

        <h1 className="
          mb-2 text-3xl font-semibold
          tracking-[-0.03em]
          text-[#e8e8f0]
        ">
          JavaScript Cheatsheet
        </h1>

        <p className="
          max-w-2xl text-[15px]
          leading-7 text-[#8a8a9a]
        ">
          Fast mental-model revision for important JavaScript
          concepts, interview patterns, and tricky behaviors.
        </p>

      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {entries.map(([key, snippet]) => (
          <div
            key={key}
            className="
              rounded-xl border border-[#2a2a30]
              bg-[#1a1a1e]
              p-4
            "
          >

            <div className="mb-2 flex items-center gap-2">
              <h2 className="
                text-sm font-semibold
                text-[#e8e8f0]
              ">
                {snippet.title}
              </h2>

              <Tag level={snippet.difficulty} />
            </div>

            <p className="
              text-[13px] leading-6
              text-[#8a8a9a]
            ">
              {snippet.theory}
            </p>

            {snippet.gotcha && (
              <div className="
                mt-3 rounded-lg
                border border-amber-400/15
                bg-[#2a1f08]
                px-3 py-2
              ">
                <p className="
                  text-xs leading-6
                  text-amber-300
                ">
                  ⚠ {snippet.gotcha}
                </p>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="
        mt-7 text-xs leading-6
        text-[#5a5a6a]
      ">
        More concepts and interview patterns will appear here
        as the knowledge base expands.
      </p>

    </div>
  )
}