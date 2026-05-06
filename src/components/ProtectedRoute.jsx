/**
 * ProtectedRoute.jsx
 * ──────────────────
 * Wraps any route that requires authentication.
 * Redirects to /login with the intended path stored in state.
 */
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useShop()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
