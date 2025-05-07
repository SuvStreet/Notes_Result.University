import { createContext, useContext, type JSX } from 'react'
import { type User } from '@features/auth/model/useAuth'
import { useAuth } from '@features/auth/model/useAuth'

interface AuthResult {
  user: User | null
  error: string | null
}

type AuthFn = (email: string, password: string) => Promise<AuthResult>

interface AuthContextProps {
  user: User | null
  loading: boolean
  signIn: AuthFn
  signUp: AuthFn
}

interface ChildrenProps {
  children: JSX.Element
}

const AuthContext = createContext<AuthContextProps | null>(null)

export function useAuthContext() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: ChildrenProps) {
  const { user, loading, signIn, signUp } = useAuth()

  return (
    <AuthContext value={{ user, loading, signIn, signUp }}>
      {children}
    </AuthContext>
  )
}
