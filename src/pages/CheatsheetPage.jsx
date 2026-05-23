import { SNIPPETS } from '../data/snippets.js'
import Tag from '../components/Tag.jsx'

// CheatsheetPage shows all topics in a collapsed, scannable reference view.
// Each card shows the title, difficulty tag, and one-liner theory.
// No code blocks here — it's intentionally minimal for quick review.

export default function CheatsheetPage() {
  const entries = Object.entries(SNIPPETS) // [key, snippet][]

  return (
    <div className="py-7 px-8 max-w-200">

      {/* Header */}
      <h2 className="text-[22px] font-semibold mb-1.5 text-zinc-100">
        Cheatsheet
      </h2>
      <p className="text-[#8a8a9a] text-sm mb-6">
        One-liner reference for every concept. No code — just the mental model.
      </p>

      {/* Cards */}
      <div className="flex flex-col gap-2.5">
        {entries.map(([key, snippet]) => (
          <div
            key={key}
            className="bg-[#1a1a1e] border border-[#2a2a30] rounded-lg py-3.5 px-4"
          >
            {/* Title + tag row */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-semibold text-sm text-[#e8e8f0]">
                {snippet.title}
              </span>
              <Tag level={snippet.difficulty} />
            </div>

            {/* One-liner theory */}
            <p className="text-xs text-[#8a8a9a] leading-relaxed">
              {snippet.theory}
            </p>

            {/* Gotcha preview */}
            {snippet.gotcha && (
              <p className="text-[12px] text-amber-400 mt-2 leading-normal">
                ⚠ {snippet.gotcha}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-[12px] text-[#5a5a6a] mt-6 leading-relaxed">
        More topics will appear here as content is added to each subtopic.
      </p>
    </div>
  )
}
