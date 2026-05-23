// useProgress is a thin wrapper around the AppContext
// Use this in components instead of importing useApp directly
// — it makes the component's dependency on progress explicit.

import { useApp } from '../context/AppContext.jsx'

export function useProgress() {
  const { progress, markTopic, getTopicProgress } = useApp()

  // Returns 'unseen' | 'learning' | 'confident' for a given key
  function getStatus(topicId, subtopic) {
    return progress[`${topicId}::${subtopic}`] || 'unseen'
  }

  return { progress, markTopic, getTopicProgress, getStatus }
}