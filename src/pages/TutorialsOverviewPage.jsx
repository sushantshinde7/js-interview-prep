import { useNavigate } from "react-router-dom";
import { TOPICS } from "../data/topics.js";
import { useProgress } from "../hooks/useProgress.js";
import ProgressRing from "../components/ProgressRing.jsx";
import Tag from "../components/Tag.jsx";

// TutorialsOverviewPage — landing page for /tutorials
// NOT an article. It's the entry point into the tutorials module.
// Shows:
//   - Philosophy / what this is
//   - How to use it (learning flow)
//   - Topic overview cards with quick-start links

// ── Static content ──────────────────────────────────────────────────────────

const PHILOSOPHY = [
  {
    icon: "◎",
    title: "Interview-oriented, not encyclopedic",
    desc: "Every concept is explained from the angle of what interviewers test and what trips developers up — not as a spec reference.",
  },
  {
    icon: "⬡",
    title: "Mental models over memorization",
    desc: "You'll learn why JavaScript behaves the way it does. Understanding the model means you can reason through any question, even ones you haven't seen.",
  },
  {
    icon: "◈",
    title: "Patterns you'll actually use",
    desc: "Each concept comes with real code patterns — the kind you write on the job and get asked about in interviews — not foo/bar toy examples.",
  },
  {
    icon: "↺",
    title: "Structured progression",
    desc: "Topics build on each other. Closures make more sense after scope. Promises make more sense after the event loop. The order is intentional.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    label: "Pick a topic",
    desc: "Use the topics bar above or the cards below. Start with Arrays if you're warming up, or jump to Closures if you need a refresh.",
  },
  {
    step: "02",
    label: "Read the concept",
    desc: "Each subtopic has a tight theory block, real code patterns you can edit and run, and common gotchas to watch for.",
  },
  {
    step: "03",
    label: "Test yourself",
    desc: "Every subtopic has interview Q&A cards. Hide the answer, think it through, then reveal. This is where the learning sticks.",
  },
  {
    step: "04",
    label: "Track your confidence",
    desc: "Mark subtopics as 'learning' or 'confident'. Your progress is saved locally. Check the Progress page before an interview.",
  },
];

const DIFFICULTY_META = {
  fresher: { label: "Good starting point", color: "text-[#4ade80]" },
  mid:     { label: "Core interview zone",  color: "text-[#fbbf24]" },
  tricky:  { label: "High-signal, tricky",  color: "text-[#f87171]" },
};

// ── Component ────────────────────────────────────────────────────────────────

export default function TutorialsOverviewPage() {
  const navigate = useNavigate();
  const { getTopicProgress } = useProgress();

  const totalSubtopics = TOPICS.reduce((s, t) => s + t.subtopics.length, 0);
  const overallPct = Math.round(
    TOPICS.reduce((s, t) => s + getTopicProgress(t.id), 0) / TOPICS.length
  );

  function goToTopic(topic) {
    navigate(`/tutorials/${topic.id}/${encodeURIComponent(topic.subtopics[0])}`);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 pb-16">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#7c6af7]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7c6af7]">
            Tutorials
          </span>
        </div>

        <h1 className="mb-3 max-w-2xl text-3xl font-semibold tracking-tight text-[#e8e8f0]">
          JavaScript — Structured for Interview Mastery
        </h1>

        <p className="mb-6 max-w-2xl text-[15px] leading-7 text-[#8a8a9a]">
          This isn't documentation. It's a structured revision system built specifically
          for developers preparing for frontend and full-stack interviews. Every topic
          is curated for signal — the concepts that actually come up, explained the
          way that actually makes them stick.
        </p>

        {/* Quick stats row */}
        <div className="flex flex-wrap items-center gap-4">
          {[
            { value: TOPICS.length,    label: "topics"    },
            { value: totalSubtopics,   label: "concepts"  },
            { value: overallPct + "%", label: "your progress" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-baseline gap-1.5"
            >
              <span className="text-xl font-semibold text-[#a599ff]">{s.value}</span>
              <span className="text-sm text-[#5a5a6a]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Philosophy ───────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="mb-1 text-base font-semibold text-[#e8e8f0]">
          What makes this different
        </h2>
        <p className="mb-5 text-sm text-[#5a5a6a]">
          Most JS resources are either too shallow or too encyclopedic. This sits in between.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {PHILOSOPHY.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-[#2a2a30] bg-[#1a1a1e] px-5 py-4"
            >
              <div className="mb-2 flex items-center gap-2.5">
                <span className="text-base text-[#7c6af7]">{p.icon}</span>
                <span className="text-[13px] font-semibold text-[#e8e8f0]">{p.title}</span>
              </div>
              <p className="text-[13px] leading-6 text-[#8a8a9a]">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="mb-1 text-base font-semibold text-[#e8e8f0]">
          How to use these tutorials
        </h2>
        <p className="mb-5 text-sm text-[#5a5a6a]">
          A suggested flow — though you can jump to any topic at any time.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step) => (
            <div
              key={step.step}
              className="rounded-xl border border-[#2a2a30] bg-[#1a1a1e] px-4 py-4"
            >
              <div className="mb-3 text-[11px] font-bold tracking-[0.15em] text-[#3a3a44]">
                {step.step}
              </div>
              <div className="mb-1.5 text-[13px] font-semibold text-[#e8e8f0]">
                {step.label}
              </div>
              <p className="text-[12px] leading-5 text-[#8a8a9a]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Target audience note ─────────────────────────────────── */}
      <section className="mb-12">
        <div className="rounded-xl border border-[#2a2a30] bg-[#141416] px-5 py-4">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#5a5a6a]">
            Who this is for
          </div>
          <p className="text-[13px] leading-6 text-[#8a8a9a]">
            Developers who have studied JavaScript before and want{" "}
            <span className="text-[#e8e8f0]">interview mastery</span>,{" "}
            <span className="text-[#e8e8f0]">conceptual clarity</span>, and{" "}
            <span className="text-[#e8e8f0]">structured revision</span> — not
            a beginner syntax guide. If you know what a function is but can't
            confidently explain closures in an interview, you're in the right place.
          </p>
        </div>
      </section>

      {/* ── Topics overview ──────────────────────────────────────── */}
      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#e8e8f0]">
              All topics
            </h2>
            <p className="mt-0.5 text-sm text-[#5a5a6a]">
              Click any topic to jump straight to its first concept.
            </p>
          </div>
          <span className="hidden text-[11px] text-[#3a3a44] md:block">
            More topics being added
          </span>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {TOPICS.map((topic) => {
            const pct = getTopicProgress(topic.id);
            const meta = DIFFICULTY_META[topic.difficulty];

            return (
              <button
                key={topic.id}
                onClick={() => goToTopic(topic)}
                className="
                  group text-left
                  flex items-start gap-4
                  rounded-xl border border-[#2a2a30] bg-[#1a1a1e]
                  px-5 py-4
                  transition-all duration-150
                  hover:border-[#7c6af7] hover:bg-[#1d1d22]
                "
              >
                {/* Progress ring */}
                <div className="mt-0.5 shrink-0">
                  <ProgressRing
                    pct={pct}
                    size={36}
                    stroke={3}
                    color={pct === 100 ? "#4ade80" : "#7c6af7"}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  {/* Title + tag */}
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-[#e8e8f0] truncate">
                      {topic.label}
                    </span>
                    <Tag level={topic.difficulty} />
                  </div>

                  {/* Difficulty meta */}
                  <div className={`mb-2 text-[11px] font-medium ${meta.color}`}>
                    {meta.label}
                  </div>

                  {/* Subtopics preview */}
                  <div className="mb-3 text-[12px] leading-5 text-[#5a5a6a]">
                    {topic.subtopics.slice(0, 4).join("  ·  ")}
                    {topic.subtopics.length > 4 && (
                      <span className="text-[#3a3a44]"> +{topic.subtopics.length - 4} more</span>
                    )}
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between">
                    {/* Progress bar */}
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-20 rounded-full bg-[#2a2a30] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            background: pct === 100 ? "#4ade80" : "#7c6af7",
                          }}
                        />
                      </div>
                      <span className="text-[11px] text-[#5a5a6a]">{pct}%</span>
                    </div>

                    {/* CTA — appears on hover */}
                    <span className="
                      text-[12px] font-medium text-[#7c6af7]
                      flex items-center gap-1
                      opacity-0 translate-x-1
                      transition-all duration-150
                      group-hover:opacity-100 group-hover:translate-x-0
                    ">
                      Start
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

    </div>
  );
}