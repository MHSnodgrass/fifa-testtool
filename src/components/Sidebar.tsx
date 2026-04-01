import { NavLink } from 'react-router-dom'

const baseClasses = "flex items-center gap-4 py-3 px-6 text-sm tracking-wide uppercase"
const activeClasses = `${baseClasses} text-[#ffb693] bg-[#2a2a2a] border-l-2 border-[#ea6b1e]`
const inactiveClasses = `${baseClasses} text-[#e5e2e1] opacity-70 hover:bg-[#2a2a2a] hover:opacity-100 transition-all`

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-[#0e0e0e] flex flex-col pt-16 z-40">
      <div className="px-8 mb-12">
        <h2 className="text-[#e5e2e1] font-black text-xl uppercase tracking-tighter">Tournament Admin</h2>
      </div>
      <nav className="flex flex-col space-y-1">
        <NavLink to="/events" className={({ isActive }) => isActive ? activeClasses : inactiveClasses }>Events</NavLink>
        <NavLink to="/teams" className={({ isActive }) => isActive ? activeClasses : inactiveClasses }>Teams</NavLink>
        <NavLink to="/edit-tournament" className={({ isActive }) => isActive ? activeClasses : inactiveClasses }>Edit Tournament</NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
