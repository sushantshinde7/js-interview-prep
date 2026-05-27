import { NavLink } from 'react-router-dom'

// MainNav — top bar of the entire app.
// Left:  brand logo / name
// Right: main section links (these are the top-level purposes of the app)
//
// These sections will each get their own routes/pages later.
// For now they link to existing pages so the nav is functional.

const SECTIONS = [
  { to: '/',            label: 'Overview',        end: true },
  { to: '/cheatsheet',  label: 'Tutorials'  },
  { to: '/quiz',        label: 'Interview Guide'  },
  { to: '/quiz',        label: 'Quiz'             },
  { to: '/progress',    label: 'Progress'         },
]

export default function MainNavbar() {
  return (
    <header className="sticky top-0 z-50
                       flex h-12 flex-shrink-0 items-center justify-between
                       border-b border-[#2a2a30]
                       bg-[#0d0d0f]/95
                       px-5
                       backdrop-blur"
     >

      {/* Brand */}
      <NavLink
        to="/"
        className="flex items-center gap-2 no-underline select-none"
      >
        <span className="text-[#7c6af7] font-bold text-sm tracking-widest uppercase">
          JS
        </span>
        <span className="text-[#e8e8f0] font-semibold text-sm tracking-wide">
          Interview Prep
        </span>
      </NavLink>

      {/* Section links */}
      <nav className="flex items-center gap-1">
        {SECTIONS.map((s, i) => (
          <NavLink
            key={s.label}
            to={s.to}
            end={s.end}
            className={({ isActive }) =>
              [
                'px-3 py-1.5 rounded-md text-[13px] transition-all duration-150 no-underline',
                isActive
                  ? 'bg-[#1e1b3a] text-[#a599ff] font-medium'
                  : 'text-[#8a8a9a] hover:text-[#e8e8f0] hover:bg-[#1a1a1e]',
              ].join(' ')
            }
          >
            {s.label}
          </NavLink>
        ))}
      </nav>

    </header>
  )
}