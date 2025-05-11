import { Button, Flex, Group, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useNavigate, useParams } from 'react-router'

import { useNoteContext } from '@features/note/model/NoteContext'

export const HeaderEditor = () => {
  const { deleteNote } = useNoteContext()
  const navigate = useNavigate()
  const [opened, { open, close }] = useDisclosure(false)
  const { id: noteId } = useParams()

  const handleDelete = () => {
    close()
    if (!noteId) return
    deleteNote(noteId)
    navigate('/')
  }

  return (
    <Flex align="center" justify="end">
      <Button color="red" onClick={open}>
        Удалить
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Удалить заметку?"
        centered
        withCloseButton={false}
      >
        <Text pb="md" size="sm">
          Эта заметка будет удалена без возможности восстановления.
        </Text>
        <Group justify="end">
          <Button color="red" onClick={() => handleDelete()}>
            Удалить
          </Button>
          <Button onClick={close}>Отмена</Button>
        </Group>
      </Modal>
    </Flex>
  )
}
