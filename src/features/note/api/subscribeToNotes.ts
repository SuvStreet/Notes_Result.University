import { ref, onValue, type Unsubscribe } from 'firebase/database'
import { db } from '@shared/api/firebase'
import type { Note } from '@entities/note/model/types'

export const subscribeToNotes = (
  userId: string,
  callback: (notes: Note[]) => void,
  setIsLoadingNotes: (isLoading: boolean) => void
): Unsubscribe => {
  const notesRef = ref(db, `users/${userId}/notes`)

  const unsubscribe = onValue(notesRef, (snapshot) => {
    const data = snapshot.val() || {}
    const arrayNotes: Note[] = Object.entries(data).map(([id, note]) => ({
      id,
      ...(note as Omit<Note, 'id'>),
    }))

    const sortedNotes = arrayNotes.sort((a, b) => b.createdAt - a.createdAt)

    setIsLoadingNotes(false)
    callback(sortedNotes)
  })

  return unsubscribe
}
