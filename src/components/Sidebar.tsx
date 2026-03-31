import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <nav>
      <NavLink to="/events">Events</NavLink>
      <NavLink to="/teams">Teams</NavLink>
      <NavLink to="/edit-tournament">Edit Tournament</NavLink>
    </nav>
  )
}

export default Sidebar
