export interface User {
  id: string
  email: string
}

export interface AuthResult {
  user: User | null
  error: string | null
}

export type AuthFn = (email: string, password: string) => Promise<AuthResult>

export interface AuthContextProps {
  user: User | null
  loading: boolean
  initializing: boolean
  signUp: AuthFn
  signIn: AuthFn
  signOut: () => Promise<void>
}