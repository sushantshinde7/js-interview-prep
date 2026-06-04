import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import TutorialsLayout from "./layouts/TutorialsLayout.jsx";
import TopicLayout from "./layouts/TopicLayout.jsx";

import HomePage from "./pages/HomePage.jsx";
import TutorialsOverviewPage from "./pages/TutorialsOverviewPage.jsx";
import TopicPage from "./pages/TopicPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import CheatsheetPage from "./pages/CheatsheetPage.jsx";
import ProgressPage from "./pages/ProgressPage.jsx";

// RRD v7 — createBrowserRouter is the recommended setup.
// Routes are defined here as a data router so loaders/actions work later.
// App.jsx is the root layout (renders MainNav + TopicsNav + <Outlet />).

const router = createBrowserRouter([
  {
    // Root layout — renders MainNavbar + <Outlet />
    path: "/",
    element: <App />,
    children: [

      // Home
      { index: true, element: <HomePage /> },

      // Tutorials module — TutorialsLayout adds TopicsNavbar for all /tutorials routes
      {
        path: "tutorials",
        element: <TutorialsLayout />,
        children: [

          // /tutorials → overview page
          { index: true, element: <TutorialsOverviewPage /> },

          // /tutorials/:topicId — TopicLayout adds SubtopicsSidebar
          {
            path: ":topicId",
            element: <TopicLayout />,
            children: [

              // /tutorials/:topicId → redirect to first subtopic (TopicLayout handles this)
              { index: true, element: <TopicPage /> },

              // /tutorials/:topicId/:subtopicId → article page
              { path: ":subtopicId", element: <TopicPage /> },
            ],
          },
        ],
      },

      // Other top-level sections (will get their own layouts later)
      { path: "quiz",       element: <QuizPage /> },
      { path: "interview-guide", element: <CheatsheetPage /> },
      { path: "progress",   element: <ProgressPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);