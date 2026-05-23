import { useState } from 'react'
import { QUIZ_QUESTIONS } from '../data/topics.js'

// QuizPage is the "Interview Mode" — MCQ questions with instant feedback.
// Flow: question → pick option → see explanation → next → results screen

export default function QuizPage() {
  const [idx, setIdx]         = useState(0)
  const [selected, setSelected] = useState(null)   // index of chosen option
  const [score, setScore]     = useState(0)
  const [done, setDone]       = useState(false)

  const q = QUIZ_QUESTIONS[idx]

  function pick(optionIndex) {
    if (selected !== null) return          // already answered
    setSelected(optionIndex)
    if (optionIndex === q.answer) setScore(s => s + 1)
  }

  function next() {
    if (idx < QUIZ_QUESTIONS.length - 1) {
      setIdx(i => i + 1)
      setSelected(null)
    } else {
      setDone(true)
    }
  }

  function reset() {
    setIdx(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }

  // ── Results screen ──────────────────────────────────────────────────────
  if (done) {
    const emoji = score === QUIZ_QUESTIONS.length ? '🎉' : score >= 3 ? '📖' : '💪'
    const msg =
      score === QUIZ_QUESTIONS.length
        ? "Perfect! You're interview ready."
        : score >= 3
        ? 'Good work! Review the ones you missed.'
        : "Keep practicing — you'll get there!"

    return (
      <div className="py-10 px-8 max-w-130">
        <div className="text-[48px] mb-3">{emoji}</div>
        <h2 className="text-2xl font-semibold mb-1.5 text-zinc-100">
          Score: {score}/{QUIZ_QUESTIONS.length}
        </h2>
        <p className="text-[#8a8a9a] text-sm mb-6">{msg}</p>
        <button
          onClick={reset}
          className="bg-[#7c6af7] text-white rounded-[7px] py-2.5 px-6 cursor-pointer text-sm font-semibold font-sans hover:bg-[#6855e3] transition-colors"
        >
          Try again
        </button>
      </div>
    )
  }

  // ── Question screen ─────────────────────────────────────────────────────
  return (
    <div className="py-8 px-8 max-w-155">

      {/* Progress bar + score */}
      <div className="flex items-center gap-2.5 mb-6">
        <span className="text-xs text-[#8a8a9a] shrink-0">
          Question {idx + 1} of {QUIZ_QUESTIONS.length}
        </span>
        <div className="flex-1 bg-[#2a2a30] rounded-sm h-1">
          <div
            className="bg-[#7c6af7] h-1 rounded-sm transition-all duration-300"
            style={{ width: `${((idx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-[#7c6af7] font-semibold shrink-0">
          {score} pts
        </span>
      </div>

      {/* Question text */}
      <div className="bg-[#1a1a1e] border border-[#2a2a30] rounded-[10px] p-5 mb-4">
        {/* pre preserves newlines used for code questions */}
        <pre className="font-sans text-[15px] leading-[1.65] whitespace-pre-wrap text-[#e8e8f0]">
          {q.q}
        </pre>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2 mb-4">
        {q.options.map((opt, i) => {
          // Color logic — only applied after user picks
          let dynamicClasses = "bg-[#1a1a1e] border-[#2a2a30] text-[#e8e8f0]"
          
          if (selected !== null) {
            if (i === q.answer) { 
              dynamicClasses = "bg-[#0d2318] border-green-400 text-green-400" 
            } else if (i === selected && i !== q.answer) { 
              dynamicClasses = "bg-[#2a0f0f] border-red-400 text-red-400" 
            }
          } else {
            dynamicClasses += " hover:bg-[#25252b] hover:border-[#3f3f4a]"
          }

          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={selected !== null}
              className={`${dynamicClasses} border rounded-grow p-[11px_16px] text-left text-xs font-sans transition-all duration-150 flex gap-2.5 items-center ${selected === null ? 'cursor-pointer' : 'cursor-default'}`}
            >
              {/* Option letter: A B C D */}
              <span className="text-[11px] text-[#5a5a6a] font-mono shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          )
        })}
      </div>

      {/* Explanation — shown after picking */}
      {selected !== null && (
        <div className="mb-4">
          <div className={`bg-[#1a1a1e] border border-[#2a2a30] rounded-r-lg p-[10px_14px] border-l-3 ${selected === q.answer ? 'border-l-green-400' : 'border-l-red-400'}`}>
            <div className={`text-[11px] font-semibold mb-1 uppercase ${selected === q.answer ? 'text-green-400' : 'text-red-400'}`}>
              {selected === q.answer ? '✓ correct' : '✗ incorrect'}
            </div>
            <p className="text-sm text-[#e8e8f0] leading-normal">
              {q.explanation}
            </p>
          </div>
        </div>
      )}

      {/* Next button — only visible after picking */}
      {selected !== null && (
        <button
          onClick={next}
          className="bg-[#7c6af7] text-white rounded-[7px] py-2.25 px-5.5 cursor-pointer text-xs font-semibold font-sans hover:bg-[#6855e3] transition-colors"
        >
          {idx < QUIZ_QUESTIONS.length - 1 ? 'Next →' : 'See results'}
        </button>
      )}
    </div>
  )
}
