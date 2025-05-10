export interface Note {
  id: string
  title: string
  content: string
  createdAt: number
}

export interface NoteContextProps {
  notes: Note[]
  noteDraft: Note | null
  activeNoteId: string | null
  addEmptyNote: () => void
  setActiveNoteSafely: (id: string) => void
  updateNoteDraft: (fields: Partial<Note>) => void
  saving: boolean
  isLoadingNotes: boolean
}
