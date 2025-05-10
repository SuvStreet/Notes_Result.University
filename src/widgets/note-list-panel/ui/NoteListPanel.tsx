import { useNoteContext } from '@features/note/model/NoteContext'
import { Button, Group, Loader, Stack, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { NoteList } from '@widgets/note-list/ui'

export const NoteListPanel = () => {
  const { isLoadingNotes, addEmptyNote } = useNoteContext()
  console.log('isLoadingNotes :>> ', isLoadingNotes)

  return (
      <Stack p="md" miw={300} maw={300} h="100vh">
        <Group justify="space-between">
          <Text fw={500}>Мои заметки</Text>
          <Button variant="subtle" size="xs" onClick={addEmptyNote}>
            <IconPlus size={16} />
          </Button>
        </Group>

        {isLoadingNotes ? (
          <Group justify="center">
            <Loader size="xs" />
            <Text size="xs" c="dimmed">
              Загружаем ваши заметки...
            </Text>
          </Group>
        ) : (
          <NoteList />
        )}
    </Stack>
  )
}
