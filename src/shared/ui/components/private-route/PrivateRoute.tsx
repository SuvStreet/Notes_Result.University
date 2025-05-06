import { Navigate } from 'react-router'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = false

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  return children
}
