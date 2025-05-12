import { Drawer, Group } from '@mantine/core'

import { useNoteContext } from '@features/note/model/NoteContext'
import { useIsMobile } from '@shared/lib/use-media-query'
import { NoteEditor } from '@widgets/note-editor/ui'
import { NoteListPanel } from '@widgets/note-list-panel/ui'

export const Note = () => {
  const { noteDraft, setNoteDraft } = useNoteContext()
  const isMobile = useIsMobile()

  const closeEditor = () => {
    setNoteDraft(null)
  }

  return (
    <>
      {isMobile ? (
        <>
          <NoteListPanel />

          <Drawer
            opened={!!noteDraft}
            onClose={closeEditor}
            title={noteDraft ? 'Редактирование заметки' : ''}
            padding="md"
            size="100%"
          >
            {noteDraft && <NoteEditor />}
          </Drawer>
        </>
      ) : (
        <Group grow h="100vh" gap={0}>
          <NoteListPanel />
          <NoteEditor />
        </Group>
      )}
    </>
  )
}
