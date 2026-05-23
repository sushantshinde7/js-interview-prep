import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import Sidebar from './components/Sidebar.jsx'
import HomePage from './pages/HomePage.jsx'
import TopicPage from './pages/TopicPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import CheatsheetPage from './pages/CheatsheetPage.jsx'
import ProgressPage from './pages/ProgressPage.jsx'

export default function App() {
  return (
    <AppProvider>
      {/* flex handles display: flex; min-h-screen handles min-height: 100vh; bg-[#0d0d0f] sets background */}
      <div className="flex min-h-screen bg-[#0d0d0f]">
        <Sidebar />
        
        {/* flex-1 handles flex: 1; overflow-y-auto handles overflowY: auto */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/topic/:topicId" element={<TopicPage />} />
            <Route path="/cheatsheet" element={<CheatsheetPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </main>
      </div>
    </AppProvider>
  )
}
