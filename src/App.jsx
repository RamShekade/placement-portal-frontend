import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import ChangePassword from './components/ChangePassword'
import StudentDashboard from './pages/StudentDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pass" element={<ChangePassword/>} />

        <Route path="/upload" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/student-dashboard" element={<StudentDashboard/>} />
      </Routes>
    </Router>
  )
}

export default App
