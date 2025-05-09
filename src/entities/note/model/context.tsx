import { createContext, useContext, useEffect, useState } from 'react'

import type { Note, NoteContextProps } from './types'
import { useAuthContext } from '@app/provider'

const NoteContext = createContext<NoteContextProps | null>(null)

export const useNoteContext = () => {
  const context = useContext(NoteContext)
  if (!context) {
    throw new Error('NoteContext не найден.')
  }
  return context
}

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext()
  const [notes, setNotes] = useState<Note[]>([])
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)

  const addEmptyNote = () => {
    const id = Date.now().toString()
    const newNote = { id, title: '', content: '' }
    setNotes((prev) => [newNote, ...prev])
    setActiveNoteId(id)
  }

  const updateNoteDraft = (id: string, fields: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...fields } : note))
    )
    console.log('Обновление проекта в режиме реального времени:', id, fields)
  }

  return (
    <NoteContext
      value={{
        notes,
        activeNoteId,
        addEmptyNote,
        setActiveNoteId,
        updateNoteDraft,
      }}
    >
      {children}
    </NoteContext>
  )
}
