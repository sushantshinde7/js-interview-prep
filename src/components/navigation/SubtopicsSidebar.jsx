import { useParams, NavLink } from "react-router-dom";
import { TOPICS } from "../../data/topics.js";
import { useProgress } from "../../hooks/useProgress.js";

// Sidebar — responsive subtopics panel.
// Uses flexible width instead of fixed width so it adapts better
// on smaller laptops/tablets and is future-friendly for collapse mode.

const STATUS_DOT = {
  unseen: "#3a3a44",
  learning: "#fbbf24",
  confident: "#4ade80",
};

export default function SubtopicsSidebar() {
  const { topicId } = useParams();
  const { getStatus } = useProgress();

  if (!topicId) return null;

  const topic = TOPICS.find((t) => t.id === topicId);
  if (!topic) return null;

  return (
    <aside
      className="
        w-52
        max-md:w-46
        max-sm:w-42
        shrink-0
      bg-[#0d0d0f]
        border-r border-[#2a2a30]
        overflow-y-auto
        sticky top-18
        h-[calc(100vh-4.5rem)]
  "
    >
      {/* Topic label */}
      <div
        className="
          px-4 pt-4 pb-2
          text-[10px] font-semibold
          uppercase tracking-widest
          text-[#5a5a6a]
        "
      >
        {topic.label}
      </div>

      {/* Subtopics */}
      <nav className="flex flex-col gap-0.5 px-2 pb-4">
        {topic.subtopics.map((sub) => {
          const st = getStatus(topicId, sub);

          return (
            <NavLink
              key={sub}
              to={`/topic/${topicId}/${encodeURIComponent(sub)}`}
              className={({ isActive }) =>
                [
                  "flex items-start gap-2",
                  "rounded-md px-3 py-2",
                  "text-[13px] leading-5",
                  "transition-all duration-150",
                  "border border-transparent",
                  isActive
                    ? "bg-[#1e1b3a] text-[#a599ff]"
                    : "text-[#8a8a9a] hover:bg-[#1a1a1e] hover:text-[#e8e8f0]",
                ].join(" ")
              }
            >
              <span
                className="
                  mt-1.5 h-1.5 w-1.5
                  rounded-full shrink-0
                  transition-colors duration-300
                "
                style={{ background: STATUS_DOT[st] }}
              />

              {/* Wrap instead of truncate */}
              <span className="wrap-break-word leading-5">{sub}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
