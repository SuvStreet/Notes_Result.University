import { useEffect, useState } from 'react'
import { auth } from '@shared/api/firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'

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

export const defaultAuthContext: AuthContextProps = {
  user: null,
  loading: true,
  initializing: true,
  signUp: async () => ({ user: null, error: null }),
  signIn: async () => ({ user: null, error: null }),
  signOut: async () => {},
}

export const useAuth = (): AuthContextProps => {
  const [user, setUser] = useState<User | null>(null)
  const [authInitializing, setAuthInitializing] = useState(true)
  const [authActionLoading, setAuthActionLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ id: firebaseUser.uid, email: firebaseUser.email || '' })
      } else {
        setUser(null)
      }
      setAuthInitializing(false)
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    setAuthActionLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      setUser({ id: user.uid, email: user.email || '' })

      return { user: { id: user.uid, email: user.email || '' }, error: null }
    } catch (error) {
      console.error('Ошибка при регистрации:', error)

      return {
        user: null,
        error: 'Регистрация не удалась. Попробуйте еще раз.',
      }
    } finally {
      setAuthActionLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setAuthActionLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      setUser({ id: user.uid, email: user.email || '' })

      return { user: { id: user.uid, email: user.email || '' }, error: null }
    } catch (err) {
      console.error('Ошибка при входе:', err)

      return {
        user: null,
        error: 'Вход не удался. Попробуйте еще раз.',
      }
    } finally {
      setAuthActionLoading(false)
    }
  }

  const signOut = async () => {
    setAuthActionLoading(true)

    try {
      await auth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    } finally {
      setAuthActionLoading(false)
    }
  }

  return {
    signUp,
    signIn,
    loading: authActionLoading,
    initializing: authInitializing,
    user,
    signOut,
  }
}
