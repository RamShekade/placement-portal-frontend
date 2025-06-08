import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './student/components/Login'
import Register from './student/components/Register'
import Dashboard from './student/components/Dashboard'
import TnpCoordinator from './TnpCO/pages/TnpCoordinator'
import ChangePassword from './student/components/ChangePassword'
import StudentDashboard from './student/pages/StudentDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/update-pass" element={<ChangePassword/>} />

        <Route path="/upload" element={<TnpCoordinator />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/student-dashboard" element={<StudentDashboard/>} />
      </Routes>
    </Router>
  )
}

export default App
