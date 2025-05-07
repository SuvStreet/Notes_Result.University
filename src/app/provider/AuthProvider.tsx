import { createContext, useContext, type ReactNode } from 'react'
import { useAuth, defaultAuthContext } from '@features/auth/model/useAuth'
import type { AuthContextProps } from '@features/auth/model/type'

interface ChildrenProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextProps>(defaultAuthContext)

export function useAuthContext() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: ChildrenProps) {
  const auth = useAuth()

  return <AuthContext value={auth}>{children}</AuthContext>
}
