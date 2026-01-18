import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { UseAuth } from './AuthContext.jsx'
import { CustomFallBack } from './CustomFallBack.jsx'



export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = UseAuth()
  const location = useLocation()
  if (loading) {
    <CustomFallBack />
  }

  // Redirect to home if not authenticated
  if (!isAuthenticated()) {
    return (
      <>
        <CustomFallBack />
        <Navigate to="/" state={{ from: location }} replace />
        </>
    )
  }

  // Check role-based access if required
  if (requiredRole && user?.role !== requiredRole) {

    return (<>
      <CustomFallBack />
    <Navigate to="/" replace />
    </>)
  }

  return children
}
