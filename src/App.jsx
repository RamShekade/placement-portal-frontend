// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Login from './student/components/Login'
// import Register from './student/components/Register'
// import Dashboard from './student/components/Dashboard'
// import TnpCoordinator from './TnpCO/pages/TnpCoordinator'
// import ChangePassword from './student/components/ChangePassword'
// import StudentDashboard from './student/pages/StudentDashboard'
// import ProfilePage from './student/pages/profile'
// import UnderDevelopmentPage from './student/pages/UnderDevelopmentPage'
// import ForgotPassword from './student/components/forgotPassword'
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/update-pass" element={<ChangePassword/>} />
//         <Route path="/forgot-password" element={<ForgotPassword/>} />
//         <Route path="/under-dev" element={<UnderDevelopmentPage />} />
//         <Route path="/upload" element={<TnpCoordinator />} />
//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard/>} />
//         <Route path="/student-dashboard" element={<StudentDashboard/>} />
//       </Routes>
//     </Router>
//   )
// }

// export default App





import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './student/components/Login'
import Register from './student/components/Register'
import Dashboard from './student/components/Dashboard'
import TnpCoordinator from './TnpCO/pages/TnpCoordinator'
import ChangePassword from './student/components/ChangePassword'
import StudentDashboard from './student/pages/StudentDashboard'
import ProfilePage from './student/pages/profile'
import UnderDevelopmentPage from './student/pages/UnderDevelopmentPage'
import ForgotPassword from './student/components/forgotPassword'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes - No authentication required */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Semi-Protected Route - For password updates (uses existing auth from login) */}
          <Route path="/update-pass" element={<ChangePassword />} />
          
          {/* Protected Routes - Authentication required */}
          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/upload" 
            element={
              <ProtectedRoute>
                <TnpCoordinator />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/under-dev" 
            element={
              <ProtectedRoute>
                <UnderDevelopmentPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App