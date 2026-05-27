import { Outlet } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'

import MainNavbar from './components/navigation/MainNavbar.jsx'
import TopicsNavbar from './components/navigation/TopicsNavbar.jsx'
import SubtopicsSidebar from './components/navigation/SubtopicsSidebar.jsx'

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0d0d0f] text-[#e8e8f0]">
        
        <MainNavbar />

        <TopicsNavbar />

        <div className="flex">
          <SubtopicsSidebar />

          <main className="min-w-0 flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>

      </div>
    </AppProvider>
  )
}