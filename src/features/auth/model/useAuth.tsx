import { auth } from '@shared/api/firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useEffect, useState } from 'react'

export interface User {
  id: string
  email: string
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ id: firebaseUser.uid, email: firebaseUser.email || '' })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (
    email: string,
    password: string,
    callback: () => void
  ) => {
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      setUser({ id: user.uid, email: user.email || '' })

      callback()

      return { user: { id: user.uid, email: user.email || '' }, error: null }
    } catch (error) {
      console.error('Ошибка при регистрации:', error)

      return {
        user: null,
        error: 'Регистрация не удалась. Попробуйте еще раз.',
      }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (
    email: string,
    password: string,
    callback: () => void
  ) => {
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      setUser({ id: user.uid, email: user.email || '' })

      callback()

      return { user: { id: user.uid, email: user.email || '' }, error: null }
    } catch (err) {
      console.error('Ошибка при входе:', err)

      return {
        user: null,
        error: 'Вход не удался. Попробуйте еще раз.',
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    signUp,
    signIn,
    loading,
    user,
  }
}
