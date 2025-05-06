import type { JSX } from 'react'
import { Navigate } from 'react-router'

import { routePaths } from '../../shared/config/routePaths'

interface PrivateRouteProps {
  children: JSX.Element
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = false

  if (!isAuthenticated) {
    return <Navigate to={routePaths.auth} replace />
  }

  return children
}
