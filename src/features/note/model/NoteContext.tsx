import {
  createContext,
  useContext,
  useEffect,
  useState,
  startTransition,
} from 'react'
import { nanoid } from 'nanoid'
import { useDebouncedValue } from '@mantine/hooks'

import type { Note, NoteContextProps } from '@entities/note/model/types'
import { subscribeToNotes } from '../api/subscribeToNotes'
import { saveNoteToFirebase } from '../api/saveNoteToFirebase'
import { removeNoteFromFirebase } from '../api/removeNoteFromFirebase'
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
  const [saving, setSaving] = useState(false)
  const { user } = useAuthContext()
  const [notes, setNotes] = useState<Note[]>([])
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const [noteDraft, setNoteDraft] = useState<Note | null>(null)
  const [isLoadingNotes, setIsLoadingNotes] = useState(false)

  const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(0)
  const [lastSyncedAt, setLastSyncedAt] = useState<number>(0)

  const [debouncedDraft] = useDebouncedValue(noteDraft, 1000)

  const addEmptyNote = () => {
    const id = nanoid()
    const newNote = { id, title: '', content: '', createdAt: Date.now() }
    setNotes((prev) => [newNote, ...prev])
    setActiveNoteId(id)
    setNoteDraft(newNote)

    if (user) {
      saveNoteToFirebase(user.id, newNote)
      setLastSyncedAt(Date.now())
    }
  }

  const updateNoteDraft = (fields: Partial<Note>) => {
    setNoteDraft((prev) => {
      if (!prev) return prev
      const updated = { ...prev, ...fields }

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updated.id ? { ...note, ...fields } : note
        )
      )

      return updated
    })

    setLastUpdatedAt(Date.now())
  }

  const setActiveNoteSafely = (newId: string) => {
    if (user && noteDraft && lastUpdatedAt > lastSyncedAt) {
      startTransition(() => {
        setSaving(true)
        saveNoteToFirebase(user.id, noteDraft)
          .then(() => setLastSyncedAt(Date.now()))
          .finally(() => {
            setSaving(false)
          })
      })
    }
    setActiveNoteId(newId)
  }

  const deleteNote = (id: string) => {
    if (!user) return

    console.log('deleteNote :>> ', id)

    // removeNoteFromFirebase(user.id, id)
  }

  useEffect(() => {
    if (!user) return

    setIsLoadingNotes(true)

    const unsubscribe = subscribeToNotes(user.id, setNotes, setIsLoadingNotes)

    return () => {
      unsubscribe()
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      setNotes([])
      setNoteDraft(null)
      setActiveNoteId(null)
    }
  }, [user])

  useEffect(() => {
    const found = notes.find((note) => note.id === activeNoteId)
    if (found) {
      setNoteDraft(found)
    }
  }, [activeNoteId, notes])

  useEffect(() => {
    if (!user || !debouncedDraft || !debouncedDraft.id) return

    if (lastUpdatedAt > lastSyncedAt) {
      setSaving(true)
      saveNoteToFirebase(user.id, debouncedDraft)
        .then(() => {
          setLastSyncedAt(Date.now())
        })
        .finally(() => {
          setSaving(false)
        })
    }
  }, [debouncedDraft])

  return (
    <NoteContext
      value={{
        notes,
        noteDraft,
        activeNoteId,
        addEmptyNote,
        setActiveNoteSafely,
        updateNoteDraft,
        saving,
        isLoadingNotes,
        deleteNote,
      }}
    >
      {children}
    </NoteContext>
  )
}
