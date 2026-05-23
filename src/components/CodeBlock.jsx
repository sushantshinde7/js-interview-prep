import { useState } from 'react'
import CopyButton from './CopyButton.jsx'

// CodeBlock renders an editable textarea with optional run button.
// It sandboxes console.log output below the code.
// Usage: <CodeBlock code="const x = 1;" runnable />

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
        log: (...args) =>
          logs.push(args.map(a => JSON.stringify(a)).join(' ')),
      }
      // eslint-disable-next-line no-new-func
      const fn = new Function('console', editedCode)
      fn(fakeConsole)
      setOutput({
        type: 'success',
        lines: logs.length ? logs : ['(no output)'],
      })
    } catch (e) {
      setOutput({ type: 'error', lines: [e.message] })
    }
    setTimeout(() => setRunning(false), 200)
  }

  const lineCount = editedCode.split('\n').length

  return (
    <div
      style={{
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid #2a2a30',
      }}
    >
      {/* Editable code area */}
      <div style={{ background: '#0a0a0c', padding: '14px 16px' }}>
        <textarea
          value={editedCode}
          onChange={e => setEditedCode(e.target.value)}
          spellCheck={false}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#a599ff',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            lineHeight: 1.7,
            resize: 'vertical',
            minHeight: Math.max(80, lineCount * 22),
          }}
        />
      </div>

      {/* Toolbar */}
      <div
        style={{
          background: '#1a1a1e',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #2a2a30',
        }}
      >
        <CopyButton code={editedCode} />
        {runnable && (
          <button
            onClick={runCode}
            style={{
              background: running ? '#1e1b3a' : '#7c6af7',
              color: '#fff',
              border: 'none',
              borderRadius: 5,
              fontSize: 12,
              padding: '5px 16px',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              transition: 'all 0.15s',
            }}
          >
            ▶ run
          </button>
        )}
      </div>

      {/* Output panel */}
      {output && (
        <div
          style={{
            background: output.type === 'error' ? '#2a0f0f' : '#141416',
            borderTop: '1px solid #2a2a30',
            padding: '10px 16px',
          }}
        >
          {output.lines.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: output.type === 'error' ? '#f87171' : '#4ade80',
                lineHeight: 1.6,
              }}
            >
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}