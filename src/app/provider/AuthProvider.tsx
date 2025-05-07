import { createContext, useContext, type JSX } from 'react'
import {
  useAuth,
  type AuthContextProps,
  defaultAuthContext,
} from '@features/auth/model/useAuth'

interface ChildrenProps {
  children: JSX.Element
}

const AuthContext = createContext<AuthContextProps>(defaultAuthContext)

export function useAuthContext() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: ChildrenProps) {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
