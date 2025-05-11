import { ref, remove } from 'firebase/database'
import { db } from '@shared/api/firebase'

export const removeNoteFromFirebase = async (userId: string, noteId: string) => {
  const noteRef = ref(db, `users/${userId}/notes/${noteId}`)
  await remove(noteRef)
}