import React, { createContext, useState, useContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useLogoutUserMutation } from '../api/services/userApi'
import { useDispatch } from 'react-redux'
import { setToken, setStateUser, logoutStateUser } from '../api/actions'

const AuthContext = createContext(null)

export const UseAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [logoutUser] = useLogoutUserMutation()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if token is valid
  const isTokenValid = (token) => {
    if (!token) return false
    
    try {
      const decoded = jwtDecode(token)
      const currentTime = Date.now() / 1000
      
      // Check if token is expired
      if (decoded.exp < currentTime) {
        return false
      }
      return true
    } catch {
      return false
    }
  }

  // Initialize auth state on mount
  useEffect(() => {
     const loadinitUser =() => setLoading(true)
    loadinitUser()
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && isTokenValid(token)) {
        dispatch(setToken(token))
        dispatch(setStateUser(JSON.parse(userData)))
        const setAuthUser = () => setUser(JSON.parse(userData))
        setAuthUser()
    } else {
      // Clear invalid token
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    
   const loadUser =() => setLoading(false)
   loadUser()
  }, [])

  const login = (token, userData) => {
    // localStorage.setItem('token', token)
    // localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData)
  }

  const logout = () => {

    logoutUser();
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    logoutStateUser();
    setUser(null)
  }

  const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    return token && isTokenValid(token)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

