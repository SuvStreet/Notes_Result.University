export interface Note {
  id: string
  title: string
  content: string
}

export interface NoteContextProps {
  notes: Note[]
  activeNoteId: string | null
  addEmptyNote: () => void
  setActiveNoteId: (id: string) => void
  updateNoteDraft: (id: string, fields: Partial<Note>) => void
}
