import type { JSX } from 'react'
import { Navigate } from 'react-router'
import { useAuthContext } from '@app/provider/AuthProvider'
import { routePaths } from '@shared/config/routePaths'
import { Flex, Loader } from '@mantine/core'

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
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

    return user ? <Navigate to={routePaths.main} replace /> : children
  }

  return null
}
