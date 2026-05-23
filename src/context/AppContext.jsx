import { createContext, useContext, useState, useCallback } from 'react'
import { TOPICS } from '../data/topics.js'

// 1. Create the context
const AppContext = createContext(null)

// 2. Custom hook to consume it
export function useApp() {
  return useContext(AppContext)
}

// 3. Provider component — wraps the whole app in main.jsx via App.jsx
export function AppProvider({ children }) {
  // Load progress from localStorage on first render
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('jsip_progress') || '{}')
    } catch {
      return {}
    }
  })

  // Mark a subtopic with a status: 'unseen' | 'learning' | 'confident'
  const markTopic = useCallback((topicId, subtopic, status) => {
    setProgress(prev => {
      const key = `${topicId}::${subtopic}`
      const next = { ...prev, [key]: status }
      localStorage.setItem('jsip_progress', JSON.stringify(next))
      return next
    })
  }, [])

  // Returns 0–100 percent for a topic based on confident subtopics
  const getTopicProgress = useCallback(
    (topicId) => {
      const topic = TOPICS.find(t => t.id === topicId)
      if (!topic) return 0
      const confident = topic.subtopics.filter(
        s => progress[`${topicId}::${s}`] === 'confident'
      ).length
      return Math.round((confident / topic.subtopics.length) * 100)
    },
    [progress]
  )

  return (
    <AppContext.Provider value={{ progress, markTopic, getTopicProgress }}>
      {children}
    </AppContext.Provider>
  )
}