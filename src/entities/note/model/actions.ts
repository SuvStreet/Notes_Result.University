import { getDatabase, ref, push, set } from 'firebase/database'

export const addNote = async (
  userId: string,
  note: { title: string; content: string }
) => {
  const notesRef = push(ref(getDatabase(), `users/${userId}/notes`))
  const newNote = {
    ...note,
    createdAt: Date.now(),
  }

  await set(notesRef, newNote)
}
