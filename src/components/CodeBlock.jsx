import { useState } from 'react'
import CopyButton from './CopyButton.jsx'

// CodeBlock renders editable runnable code blocks.
// Used for concept demos, patterns, edge cases, and interview examples.

export default function CodeBlock({ code, runnable = false }) {
  const [editedCode, setEditedCode] = useState(code)
  const [output, setOutput] = useState(null)
  const [running, setRunning] = useState(false)

  function runCode() {
    setRunning(true)
    setOutput(null)

    try {
      const logs = []

      // Intercept console.log
      const fakeConsole = {
        log: (...args) => {
          logs.push(
            args.map(a => JSON.stringify(a)).join(' ')
          )
        },
      }

      // eslint-disable-next-line no-new-func
      const fn = new Function('console', editedCode)

      fn(fakeConsole)

      setOutput({
        type: 'success',
        lines: logs.length ? logs : ['(no output)'],
      })
    } catch (e) {
      setOutput({
        type: 'error',
        lines: [e.message],
      })
    }

    setTimeout(() => setRunning(false), 180)
  }

  const lineCount = editedCode.split('\n').length

  return (
    <div className="
      overflow-hidden rounded-xl
      border border-[#2a2a30]
      bg-[#111114]
    ">

      {/* ── Editor ───────────────────────────── */}
      <div className="bg-[#0a0a0c] px-4 py-3.5">

        <textarea
          value={editedCode}
          onChange={e => setEditedCode(e.target.value)}
          spellCheck={false}
          className="
            w-full resize-y border-none bg-transparent
            font-mono-code text-[13px] leading-7
            text-[#a599ff] outline-none
            placeholder:text-[#5a5a6a]
          "
          style={{
            minHeight: Math.max(88, lineCount * 24),
          }}
        />

      </div>

      {/* ── Toolbar ─────────────────────────── */}
      <div className="
        flex items-center justify-between
        border-t border-[#2a2a30]
        bg-[#1a1a1e]
        px-3 py-2
      ">

        <CopyButton code={editedCode} />

        {runnable && (
          <button
            onClick={runCode}
            className={[
              'rounded-md px-4 py-1.5',
              'text-xs font-semibold text-white',
              'transition-all duration-150',
              running
                ? 'bg-[#1e1b3a]'
                : 'bg-[#7c6af7] hover:bg-[#6d5df0]',
            ].join(' ')}
          >
            ▶ run
          </button>
        )}
      </div>

      {/* ── Output ──────────────────────────── */}
      {output && (
        <div
          className={[
            'border-t border-[#2a2a30]',
            'px-4 py-3',
            output.type === 'error'
              ? 'bg-[#2a0f0f]'
              : 'bg-[#141416]',
          ].join(' ')}
        >

          <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#5a5a6a]">
            Output
          </div>

          {output.lines.map((line, i) => (
            <div
              key={i}
              className={[
                'font-mono-code text-xs leading-6',
                output.type === 'error'
                  ? 'text-[#f87171]'
                  : 'text-[#4ade80]',
              ].join(' ')}
            >
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}