import { Button, Flex } from '@mantine/core'

import { useAuthContext } from '@app/provider'

import { NoteEditor } from '@widgets/note-editor'
import { NoteList } from '@widgets/note-list'

export const Main = () => {
  const { signOut } = useAuthContext()

  return (
    <>
      <Button onClick={signOut}>Выход</Button>

      <Flex align="center" justify="space-between" h="100vh">
        <NoteList />
        <NoteEditor />
      </Flex>
    </>
  )
}
