import { Button, Flex } from '@mantine/core'

import { useAuthContext } from '@app/provider'
import { NoteList } from '../../widgets/note-list/ui/NoteList'

export const Main = () => {
  const { signOut } = useAuthContext()

  return (
    <>
      <Button onClick={signOut}>Выход</Button>

      <Flex direction="column" align="center" justify="center" h="100vh">
        <NoteList />
      </Flex>
    </>
  )
}
