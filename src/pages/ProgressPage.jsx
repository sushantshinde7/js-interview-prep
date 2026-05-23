import { TOPICS } from '../data/topics.js'
import { useProgress } from '../hooks/useProgress.js'
import ProgressRing from '../components/ProgressRing.jsx'
import Tag from '../components/Tag.jsx'

// ProgressPage shows a full breakdown:
// — overall stats at top
// — per-topic progress ring + subtopic pills colour-coded by status

export default function ProgressPage() {
  const { progress, getTopicProgress, getStatus } = useProgress()

  const totalSubtopics = TOPICS.reduce((s, t) => s + t.subtopics.length, 0)
  const totalConfident = Object.values(progress).filter(v => v === 'confident').length
  const totalLearning  = Object.values(progress).filter(v => v === 'learning').length

  // Map status directly to clean Tailwind classes
  const pillClasses = {
    unseen: 'bg-[#141416] text-[#5a5a6a] border border-[#2a2a30]',
    learning: 'bg-[#2a1f08] text-amber-400 border border-amber-400/30',
    confident: 'bg-[#0d2318] text-green-400 border border-green-400/30',
  }

  return (
    <div className="py-7 px-8 max-w-180">

      {/* Header */}
      <h2 className="text-[22px] font-semibold mb-1.5 text-zinc-100">
        My Progress
      </h2>
      <p className="text-[#8a8a9a] text-sm mb-6">
        Track what you know, what you're learning, and what's left.
      </p>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-7">
        {[
          { label: 'Confident',  value: totalConfident, color: 'text-green-400' },
          { label: 'Learning',   value: totalLearning,  color: 'text-amber-400' },
          { label: 'Not started',
            value: totalSubtopics - totalConfident - totalLearning,
            color: 'text-[#5a5a6a]' },
        ].map(stat => (
          <div
            key={stat.label}
            className="bg-[#1a1a1e] border border-[#2a2a30] rounded-[10px] py-3.5 px-4"
          >
            <div className={`text-2xl font-semibold mb-1 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-xs text-[#8a8a9a]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Per-topic breakdown */}
      <div className="flex flex-col gap-3.5">
        {TOPICS.map(topic => {
          const pct = getTopicProgress(topic.id)

          return (
            <div
              key={topic.id}
              className="bg-[#1a1a1e] border border-[#2a2a30] rounded-[10px] py-4 px-4.5"
            >
              {/* Topic header row */}
              <div className="flex items-center gap-2.5 mb-3">
                <ProgressRing
                  pct={pct}
                  size={32}
                  stroke={3}
                  color={pct === 100 ? '#4ade80' : '#7c6af7'}
                />
                <span className="font-semibold text-[15px] text-[#e8e8f0]">
                  {topic.label}
                </span>
                <Tag level={topic.difficulty} />
                <span
                  className={`ml-auto text-sm font-semibold ${pct === 100 ? 'text-green-400' : 'text-[#7c6af7]'}`}
                >
                  {pct}%
                </span>
              </div>

              {/* Subtopic pills */}
              <div className="flex flex-wrap gap-1.5">
                {topic.subtopics.map(sub => {
                  const st = getStatus(topic.id, sub)
                  return (
                    <span
                      key={sub}
                      className={`text-[11px] py-0.75 px-2.5 rounded-sm ${pillClasses[st]}`}
                    >
                      {sub}
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
