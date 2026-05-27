import { useState } from 'react'

// Interview-style Q&A card with reveal interaction.

export default function QACard({ q, a }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="
      overflow-hidden rounded-xl
      border border-[#2a2a30]
      bg-[#1a1a1e]
    ">

      {/* ── Question ───────────────────────── */}
      <div className="
        flex items-start gap-3
        px-4 py-3.5
      ">

        <span className="
          mt-px shrink-0
          text-[13px] font-semibold
          text-[#60a5fa]
        ">
          Q
        </span>

        <p className="
          flex-1
          text-[13px] leading-6
          text-[#e8e8f0]
        ">
          {q}
        </p>

        <button
          onClick={() => setRevealed(v => !v)}
          className={[
            'shrink-0 rounded-md border px-2.5 py-1',
            'text-[11px] transition-all duration-150',
            revealed
              ? 'border-[#7c6af7] bg-[#1e1b3a] text-[#a599ff]'
              : 'border-[#2a2a30] text-[#8a8a9a] hover:border-[#3a3a44] hover:text-[#e8e8f0]',
          ].join(' ')}
        >
          {revealed ? 'hide' : 'reveal'}
        </button>
      </div>

      {/* ── Answer ─────────────────────────── */}
      {revealed && (
        <div className="
          flex gap-3
          border-t border-[#2a2a30]
          bg-[#141416]
          px-4 py-3
        ">

          <span className="
            shrink-0
            text-[13px] font-semibold
            text-[#4ade80]
          ">
            A
          </span>

          <p className="
            text-[13px] leading-6
            text-[#e8e8f0]
          ">
            {a}
          </p>
        </div>
      )}
    </div>
  )
}