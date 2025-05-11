import { Flex } from '@mantine/core'
import { HeaderPanel } from '@widgets/header-panel/ui'

import { NoteEditorPanel } from '@widgets/note-editor-panel/ui'
import { NoteListPanel } from '@widgets/note-list-panel/ui'

export const Main = () => {
  return (
    <>
      <HeaderPanel />

      <Flex align="center" justify="space-between">
        <NoteListPanel />
        <NoteEditorPanel />
      </Flex>
    </>
  )
}
