import { useRef, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { TOPICS } from '../../data/topics.js'
import { useProgress } from '../../hooks/useProgress.js'

// TopicsNav — horizontal scrollable topics strip (row 2 of the layout).
// Sits below MainNav, above the content area.
// Each pill is a topic. Clicking navigates to /topic/:id.
// Left/right arrow buttons appear when there's overflow to scroll.
// This is the same pattern as W3Schools' top language bar.

const SCROLL_AMOUNT = 200

export default function TopicsNavbar() {
  const scrollRef = useRef(null)
  const { getTopicProgress } = useProgress()

  const [canScrollLeft, setCanScrollLeft]   = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // Check scroll state whenever the container scrolls or resizes
  function updateScrollState() {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState)
    // ResizeObserver catches width changes (sidebar open/close etc.)
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      ro.disconnect()
    }
  }, [])

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' })
  }
  function scrollRight() {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' })
  }

  return (
    <div className="flex items-center bg-[#0d0d0f] border-b border-[#2a2a30] shrink-0 sticky top-12 z-40">

      {/* Left arrow — only visible when there's content to scroll back to */}
      <button
        onClick={scrollLeft}
        aria-label="Scroll topics left"
        className={[
          'shrink-0 w-8 h-9 flex items-center justify-center',
          'text-[#8a8a9a] hover:text-[#e8e8f0] hover:bg-[#1a1a1e]',
          'border-r border-[#2a2a30] transition-all duration-150',
          'text-xs',
          canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        ‹
      </button>

      {/* Scrollable topics list — hides scrollbar visually */}
      <div
        ref={scrollRef}
        className="flex items-center gap-0.5 overflow-x-auto flex-1 px-2 py-1.5 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {TOPICS.map(topic => {
          const pct = getTopicProgress(topic.id)

          return (
            <NavLink
              key={topic.id}
              to={`/tutorials/${topic.id}/${encodeURIComponent(topic.subtopics[0])}`}
              className={({ isActive }) =>
                [
                  'flex items-center gap-1.5 px-3 py-1 rounded-md',
                  'text-[13px] whitespace-nowrap no-underline shrink-0',
                  'transition-all duration-150',
                  isActive
                    ? 'bg-[#1e1b3a] text-[#a599ff] font-medium'
                    : 'text-[#8a8a9a] hover:text-[#e8e8f0] hover:bg-[#1a1a1e]',
                ].join(' ')
              }
            >
              {/* Small progress dot — green when 100%, accent otherwise, dim when 0 */}
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300"
                style={{
                  background:
                    pct === 100 ? '#4ade80'
                    : pct > 0   ? '#7c6af7'
                    :             '#3a3a44',
                }}
              />
              {topic.label}
            </NavLink>
          )
        })}
      </div>

      {/* Right arrow — only visible when there's more to scroll to */}
      <button
        onClick={scrollRight}
        aria-label="Scroll topics right"
        className={[
          'shrink-0 w-8 h-9 flex items-center justify-center',
          'text-[#8a8a9a] hover:text-[#e8e8f0] hover:bg-[#1a1a1e]',
          'border-l border-[#2a2a30] transition-all duration-150',
          'text-xs',
          canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        ›
      </button>

    </div>
  )
}