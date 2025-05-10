import { Button, Flex } from '@mantine/core'

import { useAuthContext } from '@app/provider'

import { NoteEditorPanel } from '@widgets/note-editor-panel/ui'
import { NoteListPanel } from '@widgets/note-list-panel/ui'

export const Main = () => {
  const { signOut } = useAuthContext()

  return (
    <>
      <Button onClick={signOut}>Выход</Button>

      <Flex align="center" justify="space-between">
        <NoteListPanel />
        <NoteEditorPanel />
      </Flex>
    </>
  )
}
