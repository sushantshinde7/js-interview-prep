import { Outlet, useParams, Navigate } from "react-router-dom";
import { TOPICS } from "../data/topics.js";
import SubtopicsSidebar from "../components/navigation/SubtopicsSidebar.jsx";

// TopicLayout — wraps /tutorials/:topicId and /tutorials/:topicId/:subtopicId.
// Adds SubtopicsSidebar next to the article content.
//
// Also handles the index case: if the user lands on /tutorials/:topicId
// with no subtopicId, we redirect to the first subtopic automatically.
// This avoids a blank content area.

export default function TopicLayout() {
  const { topicId, subtopicId } = useParams();
  const topic = TOPICS.find((t) => t.id === topicId);

  // Unknown topicId — let TopicPage render the not-found state
  if (!topic) {
    return (
      <div className="flex">
        <SubtopicsSidebar />
        <Outlet />
      </div>
    );
  }

  // /tutorials/:topicId with no subtopicId → redirect to first subtopic
  if (!subtopicId) {
    const firstSub = encodeURIComponent(topic.subtopics[0]);
    return <Navigate to={`/tutorials/${topicId}/${firstSub}`} replace />;
  }

  return (
    // MainNavbar = 48px (h-12), TopicsNavbar = 36px (h-9) → offset = 84px = 5.25rem
    <div className="flex h-[calc(100vh-5.25rem)]">

      {/* Subtopics sidebar — sticky within this layout */}
      <SubtopicsSidebar />

      {/* Article content — scrollable */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}