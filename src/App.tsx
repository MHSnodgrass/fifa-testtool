import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import EditTournament from './pages/EditTournament'
import Teams from './pages/Teams'
import Events from './pages/Events'

function App() {
  return (
    <BrowserRouter>
      <div style ={{ display: 'flex' }}>
        <Sidebar />
        <main className="ml-74">
          <Routes>
            <Route path="/events" element={<Events />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/edit-tournament" element={<EditTournament />} />
            <Route path="*" element={<Navigate to="/events" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
