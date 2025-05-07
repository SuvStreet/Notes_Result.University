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
  initializing: boolean
  signIn: AuthFn
  signUp: AuthFn,
  signOut: () => Promise<void>
}

interface ChildrenProps {
  children: JSX.Element
}

const defaultAuthContext: AuthContextProps = {
  user: null,
  loading: true,
  initializing: true,
  signIn: async () => ({ user: null, error: null }),
  signUp: async () => ({ user: null, error: null }),
  signOut: async () => {},
}

const AuthContext = createContext<AuthContextProps>(defaultAuthContext)

export function useAuthContext() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: ChildrenProps) {
  const { user, loading, initializing, signIn, signUp, signOut } = useAuth()

  return (
    <AuthContext value={{ user, loading, initializing, signIn, signUp, signOut }}>
      {children}
    </AuthContext>
  )
}
