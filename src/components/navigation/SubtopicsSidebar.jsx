import { useParams, NavLink } from "react-router-dom";
import { TOPICS } from "../../data/topics.js";
import { useProgress } from "../../hooks/useProgress.js";

// Sidebar — subtopics only. Renders as a thin left panel.
// Only visible when the current route is /topic/:topicId.
// If we're on any other page it returns null (takes up zero space).
//
// Each subtopic links to /topic/:topicId/:subtopicId
// (we'll add that nested route later — for now onClick state is fine
//  but we keep it as NavLink-ready structure)

const STATUS_DOT = {
  unseen: "#3a3a44",
  learning: "#fbbf24",
  confident: "#4ade80",
};

export default function SubtopicsSidebar() {
  const { topicId } = useParams();
  const { getStatus } = useProgress();

  // Not on a topic page — render nothing, takes zero layout space
  if (!topicId) return null;

  const topic = TOPICS.find((t) => t.id === topicId);
  if (!topic) return null;

  return (
    <aside
      className="
      w-44 shrink-0
      bg-[#0d0d0f] border-r border-[#2a2a30]
      overflow-y-auto
      sticky top-18
      h-[calc(100vh-4.5rem)]
    "
    >
      {/* Topic label header */}
      <div className="px-4 pt-4 pb-2 text-[10px] font-semibold text-[#5a5a6a] uppercase tracking-widest">
        {topic.label}
      </div>

      {/* Subtopic list */}
      <nav className="flex flex-col px-2 pb-4">
        {topic.subtopics.map((sub) => {
          const st = getStatus(topicId, sub);

          return (
            <NavLink
              key={sub}
              // Later: to={`/topic/${topicId}/${encodeURIComponent(sub)}`}
              // For now points to the same topic page — TopicPage manages
              // which subtopic is active via its own state seeded from URL later
              to={`/topic/${topicId}/${encodeURIComponent(sub)}`}
              className={({ isActive }) =>
                [
                  "flex items-center gap-2 rounded-md px-3 py-1.5",
                  "text-[13px] no-underline transition-all duration-150",
                  isActive
                    ? "bg-[#1e1b3a] text-[#a599ff]"
                    : "text-[#8a8a9a] hover:bg-[#1a1a1e] hover:text-[#e8e8f0]",
                ].join(" ")
              }
              // We intentionally don't use isActive here because all subtopics
              // point to the same route for now. Will update when subtopic
              // routing is added.
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300"
                style={{ background: STATUS_DOT[st] }}
              />
              <span className="truncate">{sub}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
