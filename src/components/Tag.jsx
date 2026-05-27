// Difficulty badge used across topic cards and concept pages.

const STYLES = {
  fresher: 'bg-[#0d2318] text-[#4ade80]',
  mid:     'bg-[#2a1f08] text-[#fbbf24]',
  tricky:  'bg-[#2a0f0f] text-[#f87171]',
}

export default function Tag({ level }) {
  return (
    <span
      className={[
        'rounded-md px-2 py-0.5',
        'text-[10px] font-semibold uppercase tracking-wider',
        STYLES[level],
      ].join(' ')}
    >
      {level}
    </span>
  )
}