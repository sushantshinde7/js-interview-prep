import { NavLink, useNavigate } from 'react-router-dom'
import { TOPICS } from '../data/topics.js'
import { useProgress } from '../hooks/useProgress.js'
import ProgressRing from './ProgressRing.jsx'

// Sidebar renders the left nav — top links + topic list with progress rings.
// Uses React Router's NavLink so the active route is automatically highlighted.

const NAV_ITEMS = [
  { to: '/',           label: 'Overview',       icon: '◈' },
  { to: '/cheatsheet', label: 'Cheatsheet',     icon: '≡' },
  { to: '/quiz',       label: 'Interview Mode', icon: '◎' },
  { to: '/progress',  label: 'My Progress',    icon: '◐' },
]

export default function Sidebar() {
  const { getTopicProgress } = useProgress()
  const navigate = useNavigate()

  // Shared button style — active state is passed in by NavLink or manually
  function navStyle(isActive) {
    return {
      width: '100%',
      background: isActive ? '#1e1b3a' : 'transparent',
      border: 'none',
      color: isActive ? '#a599ff' : '#8a8a9a',
      padding: '8px 12px',
      borderRadius: 6,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 13,
      textAlign: 'left',
      transition: 'all 0.15s',
      marginBottom: 1,
      textDecoration: 'none',
    }
  }

  return (
    <div
      style={{
        width: 220,
        background: '#141416',
        borderRight: '1px solid #2a2a30',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        flexShrink: 0,
        overflowY: 'auto',
      }}
    >
      {/* Brand */}
      <div style={{ padding: '20px 16px 12px' }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#7c6af7',
            letterSpacing: '0.08em',
            marginBottom: 2,
          }}
        >
          JS INTERVIEW
        </div>
        <div style={{ fontSize: 11, color: '#5a5a6a' }}>prep reference</div>
      </div>

      {/* Top nav links */}
      <div style={{ padding: '4px 8px' }}>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            style={({ isActive }) => navStyle(isActive)}
          >
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Topics section header */}
      <div
        style={{
          padding: '16px 16px 6px',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: '#5a5a6a',
          textTransform: 'uppercase',
        }}
      >
        Topics
      </div>

      {/* Topic list */}
      <div style={{ padding: '0 8px', flex: 1 }}>
        {TOPICS.map(topic => {
          const pct = getTopicProgress(topic.id)
          return (
            <NavLink
              key={topic.id}
              to={`/topic/${topic.id}`}
              style={({ isActive }) => ({
                ...navStyle(isActive),
                gap: 8,
              })}
            >
              <ProgressRing
                pct={pct}
                size={22}
                stroke={2.5}
                color={pct === 100 ? '#4ade80' : '#7c6af7'}
              />
              <span style={{ flex: 1, fontSize: 13 }}>{topic.label}</span>
              <span style={{ fontSize: 10, color: '#5a5a6a' }}>{pct}%</span>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}