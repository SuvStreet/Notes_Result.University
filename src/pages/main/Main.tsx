import { Button, Flex } from '@mantine/core'

import { useAuthContext } from '@app/provider'
import { NoteList } from '@widgets/note-list/ui/NoteList'
import { NoteEditor } from '@widgets/note-editor/ui/NoteEditor'

export const Main = () => {
  const { signOut } = useAuthContext()

  return (
    <>
      <Button onClick={signOut}>Выход</Button>

      <Flex align="center" justify="center" h="100vh">
        <NoteList />
        <NoteEditor />
      </Flex>
    </>
  )
}
