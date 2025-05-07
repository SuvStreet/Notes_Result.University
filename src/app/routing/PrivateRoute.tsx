import { type JSX } from 'react'
import { Navigate } from 'react-router'

import { routePaths } from '@shared/config/routePaths'
import { useAuthContext } from '@app/provider'
import { Flex, Loader } from '@mantine/core'

interface PrivateRouteProps {
  children: JSX.Element
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const context = useAuthContext()

  if (context) {
    const { user, loading } = context

    if (loading)
      return (
        <>
          <Flex justify="center" align="center" style={{ height: '100vh' }}>
            <Loader size="xl" color="blue" type="dots" />
          </Flex>
        </>
      )

    return user ? children : <Navigate to={routePaths.auth} replace />
  }
}
