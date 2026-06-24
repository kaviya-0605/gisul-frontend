import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      // We don't have a /me endpoint, so we just rely on the token being present.
      // Profile data is fetched on the profile page.
      const savedUser = localStorage.getItem('user')
      if (savedUser) setUser(JSON.parse(savedUser))
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
    }
    setLoading(false)
  }, [token])

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/login', { email, password })
      setToken(data.access_token)
      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
      return { success: true }
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.detail || 'An error occurred during login' 
      }
    }
  }

  const signup = async (name, email, password) => {
    try {
      const { data } = await api.post('/signup', { name, email, password })
      setToken(data.access_token)
      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
      return { success: true }
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.detail || 'An error occurred during signup' 
      }
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    isAuthenticated: !!token
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
