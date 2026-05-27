import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import TopicPage from './pages/TopicPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import CheatsheetPage from './pages/CheatsheetPage.jsx'
import ProgressPage from './pages/ProgressPage.jsx'

// RRD v7 — createBrowserRouter is the recommended setup.
// Routes are defined here as a data router so loaders/actions work later.
// App.jsx is the root layout (renders MainNav + TopicsNav + <Outlet />).

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true,              element: <HomePage /> },
      { path: 'topic/:topicId',   element: <TopicPage /> },
      { path: 'cheatsheet',       element: <CheatsheetPage /> },
      { path: 'quiz',             element: <QuizPage /> },
      { path: 'progress',         element: <ProgressPage /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)