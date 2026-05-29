import { Outlet } from "react-router-dom";
import TopicsNavbar from "../components/navigation/TopicsNavbar.jsx";

// TutorialsLayout — wraps every route under /tutorials.
// Adds TopicsNavbar below MainNavbar.
// SubtopicsSidebar is NOT here — it belongs one level deeper in TopicLayout,
// because it only makes sense once a specific topic is selected.
//
// Route tree that uses this layout:
//   /tutorials                   → TutorialsOverviewPage
//   /tutorials/:topicId          → TopicLayout → TopicPage
//   /tutorials/:topicId/:sub     → TopicLayout → TopicPage

export default function TutorialsLayout() {
  return (
    <div className="flex flex-col">

      {/* TopicsNavbar — sticky, sits just below MainNavbar (top-12 = 3rem = 48px) */}
      <TopicsNavbar />

      {/* Child route — either TutorialsOverviewPage or TopicLayout */}
      <Outlet />

    </div>
  );
}