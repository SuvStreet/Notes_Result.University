import { db } from '@shared/api/firebase'
import { ref, set } from 'firebase/database'
import type { Note } from '@entities/note/model/types'

export const saveNoteToFirebase = async (user: string, note: Note) => {
  const noteRef = ref(db, `users/${user}/notes/${note.id}`)

  try {
    await set(noteRef, {
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
    })
  } catch (err) {
    console.error('Ошибка при сохранении заметки в Firebase:', err)
  }
}
