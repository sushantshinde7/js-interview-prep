import { useState } from 'react'

// CopyButton copies `code` to clipboard and shows a brief confirmation.
// Usage: <CopyButton code={someString} />

export default function CopyButton({ code }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        background: 'transparent',
        border: '1px solid #2a2a30',
        color: copied ? '#4ade80' : '#8a8a9a',
        fontSize: 11,
        padding: '3px 10px',
        borderRadius: 4,
        cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif",
        transition: 'all 0.2s',
      }}
    >
      {copied ? '✓ copied' : 'copy'}
    </button>
  )
}