
import React from 'react'
import { Navigate } from 'react-router-dom'
import { UseAuth } from './AuthContext.jsx'
import { Box } from '@mui/material'
import ModernLoader from '../utils/ModernLoader.jsx'
import { CustomFallBack } from './CustomFallBack.jsx'
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = UseAuth()


  if (loading) {
    return (
      <CustomFallBack />
    )
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated()) {
    return (<>
     <CustomFallBack />
    <Navigate to="/" replace/>
    </>)
  }

  return children
}