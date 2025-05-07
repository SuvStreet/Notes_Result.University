import { auth } from '@shared/api/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useState } from 'react'

interface User {
  id: string
  email: string
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const signUp = async (email: string, password: string) => {
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      return { user, error: null }
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

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      return { user, error: null }
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
  }
}
