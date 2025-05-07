import { auth } from '@shared/api/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
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

    } catch (err) {
      console.error('Ошибка при регистрации:', err)

      return {
        user: null,
        error: 'Регистрация не удалась. Попробуйте еще раз.',
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    signUp,
    loading
  }
}
