import { NavLink } from 'react-router-dom'

const baseClasses = "flex items-center gap-4 py-3 px-6 text-sm tracking-wide uppercase"
const activeClasses = `${baseClasses} text-[#ffb693] bg-[#2a2a2a] border-l-2 border-[#ea6b1e]`
const inactiveClasses = `${baseClasses} text-[#e5e2e1] opacity-70 hover:bg-[#2a2a2a] hover:opacity-100 transition-all`

interface SideBarProps {
  isOpen: boolean,
  toggleSideBar: () => void
}

function Sidebar({ isOpen, toggleSideBar }: SideBarProps) {
  const transitionClasses = `whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 max-w-50': 'opacity-0 max-w-0' }`;

  return (
    <aside className={`fixed left-0 top-0 h-full bg-surface-container-lowest flex flex-col pt-16 z-40 ${isOpen ? 'w-72' : 'w-20'} transition-all duration-300`}>
      {/* All of this to make the button look nice - used to open/close sidebar and send prop back up. rotate-180 is a nice trick to avoid using ...arrow_right with a conditional */}
      <button className={`material-symbols-outlined absolute right-0 top-20 translate-x-1/2 w-8 h-8 rounded-full bg-surface-container-high 
        border border-outline-variant/30 text-secondary hover:text-primary hover:bg-surface-container-highest flex items-center 
        justify-center transition-colors z-50 hover:cursor-pointer ${!isOpen ? 'rotate-180': ''}`} onClick={toggleSideBar}>
          keyboard_double_arrow_left
      </button>
      {/* Section that holds info at the top of the side bar (icon, etc) */}
      <div className="flex items-center gap-4 px-5 mb-12 mt-8">
        <div className="w-10 h-10 shrink-0 rounded bg-primary-container/10 border border-primary/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-2xl">
            account_tree
          </span>
        </div>
        <div className={`flex flex-col ${transitionClasses}`}>
          <span className="text-on-surface font-black text-lg uppercase tracking-tighter leading-none">
            FIFA '26
          </span>
          <span className="text-secondary text-[0.625rem] font-bold uppercase tracking-[0.2em] mt-0.5">
            Test Tool
          </span>
        </div>
      </div>
      {/* Menu options (icons, routes, etc) */}
      <nav className="flex flex-col space-y-1">
        <NavLink to="/events" className={({ isActive }) => isActive ? activeClasses : inactiveClasses }>
          <span className="material-symbols-outlined text-xl">
            event
          </span>
          <span className={transitionClasses}>
            Events
          </span>
        </NavLink>
        <NavLink to="/teams" className={({ isActive }) => isActive ? activeClasses : inactiveClasses }>
          <span className="material-symbols-outlined text-xl">
            groups
          </span>
          <span className={transitionClasses}>
            Teams
          </span>
        </NavLink>
        <NavLink to="/edit-tournament" className={({ isActive }) => isActive ? activeClasses : inactiveClasses }>
          <span className="material-symbols-outlined text-xl">
            edit
          </span>
          <span className={transitionClasses}>
            Edit Tournament
          </span>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
