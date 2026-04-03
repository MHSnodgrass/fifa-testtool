import { NavLink } from 'react-router-dom'

const baseClasses = "flex items-center gap-4 py-3 px-6 text-sm tracking-wide uppercase"
const activeClasses = `${baseClasses} text-[#ffb693] bg-[#2a2a2a] border-l-2 border-[#ea6b1e]`
const inactiveClasses = `${baseClasses} text-[#e5e2e1] opacity-70 hover:bg-[#2a2a2a] hover:opacity-100 transition-all`

interface SideBarProps {
  isOpen: boolean,
  toggleSideBar: () => void
}

function Sidebar({ isOpen, toggleSideBar }: SideBarProps) {
  return (
    <aside className={`fixed left-0 top-0 h-full bg-surface-container-lowest flex flex-col pt-16 z-40 ${isOpen ? 'w-72' : 'w-20'} transition-all duration-300`}>
      <button className={`material-symbols-outlined absolute right-0 top-20 translate-x-1/2 w-8 h-8 rounded-full bg-surface-container-high 
        border border-outline-variant/30 text-secondary hover:text-primary hover:bg-surface-container-highest flex items-center 
        justify-center transition-colors z-50 hover:cursor-pointer ${!isOpen ? 'rotate-180': ''}`} onClick={toggleSideBar}>
          keyboard_double_arrow_left
      </button>
      <div className="px-8 mb-8 mt-10">
        <h2 className={`text-[#e5e2e1] font-black text-xl uppercase tracking-tighter whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 max-w-50': 'opacity-0 max-w-0' }`}>
          Tournament Admin
        </h2>
      </div>
      <nav className="flex flex-col space-y-1">
        <NavLink to="/events" className={({ isActive }) => isActive ? activeClasses : inactiveClasses }>
          <span className="material-symbols-outlined text-xl">
            event
          </span>
          <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 max-w-50': 'opacity-0 max-w-0' }`}>
            Events
          </span>
        </NavLink>
        <NavLink to="/teams" className={({ isActive }) => isActive ? activeClasses : inactiveClasses }>
          <span className="material-symbols-outlined text-xl">
            groups
          </span>
          <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 max-w-50': 'opacity-0 max-w-0' }`}>
            Teams
          </span>
        </NavLink>
        <NavLink to="/edit-tournament" className={({ isActive }) => isActive ? activeClasses : inactiveClasses }>
          <span className="material-symbols-outlined text-xl">
            edit
          </span>
          <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 max-w-50': 'opacity-0 max-w-0' }`}>
            Edit Tournament
          </span>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
