import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import AppShell from './components/AppShell'
import AskQuestion from './pages/AskQuestion'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import HistoryPage from './pages/HistoryPage'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import QuestionDetails from './pages/QuestionDetails'

// Route Guard for authenticated pages
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth signup />} />
      <Route element={
        <PrivateRoute>
          <AppShell />
        </PrivateRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/question/:id" element={<QuestionDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
