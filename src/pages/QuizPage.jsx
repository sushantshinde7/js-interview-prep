import { useState } from 'react'
import { QUIZ_QUESTIONS } from '../data/topics.js'

// Interview-focused MCQ flow with instant feedback.

export default function QuizPage() {
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = QUIZ_QUESTIONS[idx]

  function pick(optionIndex) {
    if (selected !== null) return

    setSelected(optionIndex)

    if (optionIndex === q.answer) {
      setScore(s => s + 1)
    }
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

  const completionPct = Math.round(
    (score / QUIZ_QUESTIONS.length) * 100
  )

  // ─────────────────────────────────────────
  // Results
  // ─────────────────────────────────────────

  if (done) {
    const emoji =
      score === QUIZ_QUESTIONS.length
        ? '🎉'
        : score >= Math.ceil(QUIZ_QUESTIONS.length * 0.7)
          ? '📖'
          : '💪'

    const msg =
      score === QUIZ_QUESTIONS.length
        ? "Perfect! You're interview ready."
        : score >= Math.ceil(QUIZ_QUESTIONS.length * 0.7)
          ? 'Good work! Review the concepts you missed.'
          : 'Keep practicing and revisit the core concepts.'

    return (
      <div className="mx-auto max-w-4xl px-6 py-8">

        <div
          className="
            rounded-xl border border-[#2a2a30]
            bg-[#1a1a1e]
            p-8
          "
        >

          <div
            className="
              mb-2 text-[11px]
              font-semibold uppercase
              tracking-[0.18em]
              text-[#7c6af7]
            "
          >
            Assessment Complete
          </div>

          <div className="mb-4 text-5xl">
            {emoji}
          </div>

          <h1
            className="
              mb-3 text-3xl font-semibold
              tracking-[-0.03em]
              text-[#e8e8f0]
            "
          >
            Score: {score}/{QUIZ_QUESTIONS.length}
          </h1>

          <p
            className="
              mb-6 max-w-xl
              text-[15px] leading-7
              text-[#8a8a9a]
            "
          >
            {msg}
          </p>

          <div className="mb-6">

            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-[#8a8a9a]">
                Accuracy
              </span>

              <span className="text-xs font-semibold text-[#7c6af7]">
                {completionPct}%
              </span>
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
                "
                style={{
                  width: `${completionPct}%`,
                }}
              />
            </div>

          </div>

          <button
            onClick={reset}
            className="
              rounded-lg bg-[#7c6af7]
              px-5 py-2.5
              text-sm font-semibold text-white
              transition-all duration-150
              hover:bg-[#6855e3]
            "
          >
            Retake Quiz
          </button>

        </div>

      </div>
    )
  }

  // ─────────────────────────────────────────
  // Quiz Screen
  // ─────────────────────────────────────────

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">

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
            Interview Mode
          </span>
        </div>

        <h1
          className="
            mb-3 text-3xl font-semibold
            tracking-[-0.03em]
            text-[#e8e8f0]
          "
        >
          JavaScript Quiz
        </h1>

        <p
          className="
            max-w-2xl
            text-[15px] leading-7
            text-[#8a8a9a]
          "
        >
          Test your understanding of common JavaScript concepts,
          interview patterns, and tricky language behaviors.
        </p>

      </div>

      {/* Progress */}
      <div className="mb-8">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-xs text-[#8a8a9a]">
            Question {idx + 1} of {QUIZ_QUESTIONS.length}
          </span>

          <span className="text-xs font-semibold text-[#7c6af7]">
            {score} pts
          </span>

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
              width: `${((idx + 1) / QUIZ_QUESTIONS.length) * 100}%`,
            }}
          />
        </div>

      </div>

      {/* Question */}
      <div
        className="
          mb-5 rounded-xl
          border border-[#2a2a30]
          bg-[#1a1a1e]
          p-5
        "
      >

        <pre
          className="
            whitespace-pre-wrap
            font-sans
            text-[15px]
            leading-7
            text-[#e8e8f0]
          "
        >
          {q.q}
        </pre>

      </div>

      {/* Options */}
      <div className="mb-5 flex flex-col gap-3">

        {q.options.map((opt, i) => {
          let styles =
            'border-[#2a2a30] bg-[#1a1a1e] text-[#e8e8f0] hover:border-[#3a3a44] hover:bg-[#1d1d22]'

          if (selected !== null) {
            if (i === q.answer) {
              styles =
                'border-green-400 bg-[#0d2318] text-green-400'
            } else if (i === selected) {
              styles =
                'border-red-400 bg-[#2a0f0f] text-red-400'
            }
          }

          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={selected !== null}
              className={[
                'flex items-center gap-3 rounded-xl border',
                'px-4 py-3 text-left text-sm',
                'transition-all duration-150',
                selected === null
                  ? 'cursor-pointer'
                  : 'cursor-default',
                styles,
              ].join(' ')}
            >

              <span
                className="
                  flex h-7 w-7 shrink-0
                  items-center justify-center
                  rounded-md bg-[#141416]
                  text-[11px]
                  font-semibold
                  text-[#5a5a6a]
                "
              >
                {String.fromCharCode(65 + i)}
              </span>

              <span className="leading-6">
                {opt}
              </span>

            </button>
          )
        })}

      </div>

      {/* Explanation */}
      {selected !== null && (
        <div className="mb-6">

          <div
            className={[
              'rounded-xl border border-[#2a2a30]',
              'border-l-[3px] bg-[#1a1a1e]',
              'px-4 py-3',
              selected === q.answer
                ? 'border-l-green-400'
                : 'border-l-red-400',
            ].join(' ')}
          >

            <div
              className={[
                'mb-2 text-[11px]',
                'font-semibold uppercase tracking-wide',
                selected === q.answer
                  ? 'text-green-400'
                  : 'text-red-400',
              ].join(' ')}
            >
              {selected === q.answer
                ? '✓ Correct'
                : '✗ Incorrect'}
            </div>

            <p
              className="
                text-sm leading-7
                text-[#e8e8f0]
              "
            >
              {q.explanation}
            </p>

          </div>

        </div>
      )}

      {/* Next */}
      {selected !== null && (
        <button
          onClick={next}
          className="
            rounded-lg bg-[#7c6af7]
            px-5 py-2.5
            text-sm font-semibold text-white
            transition-all duration-150
            hover:bg-[#6855e3]
          "
        >
          {idx < QUIZ_QUESTIONS.length - 1
            ? 'Next Question →'
            : 'See Results'}
        </button>
      )}

    </div>
  )
}
