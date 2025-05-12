import { Drawer, Flex } from '@mantine/core'
import { useNavigate, useParams } from 'react-router'

import { useIsMobile } from '@shared/lib/use-media-query'
import { HeaderPanel } from '@widgets/header-panel/ui'
import { NoteEditorPanel } from '@widgets/note-editor-panel/ui'
import { NoteListPanel } from '@widgets/note-list-panel/ui'
import { useNoteContext } from '@features/note/model/NoteContext'

export const Main = () => {
  const { setNoteDraft, setActiveNoteId } = useNoteContext()
  const { id } = useParams()
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  return (
    <>
      <HeaderPanel />

      <Flex align="center" justify="space-between">
        <NoteListPanel />

        {!isMobile && <NoteEditorPanel />}

        {isMobile && (
          <Drawer
            opened={!!id}
            onClose={() => {
              navigate('/')
              setNoteDraft(null)
              setActiveNoteId(null)
            }}
            padding="md"
            size="100%"
            title="Редактировать заметку"
          >
            <NoteEditorPanel />
          </Drawer>
        )}
      </Flex>
    </>
  )
}
