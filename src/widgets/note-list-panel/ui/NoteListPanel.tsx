import { useNoteContext } from '@features/note/model/NoteContext'
import { Button, Group, Loader, Stack, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { NoteList } from '@widgets/note-list/ui'
import { SearchNotes } from '@widgets/search-notes/ui'
import { useIsMobile } from '@shared/lib/use-media-query'

export const NoteListPanel = () => {
  const { isLoadingNotes, addEmptyNote } = useNoteContext()
  const isMobile = useIsMobile()

  return (
    <Stack p="md" w={isMobile ? '100%' : 450} h="100vh" bg="#222222">
      <Group justify="space-between">
        <Text fw={500}>Мои заметки</Text>

        <Group gap={5}>
          <SearchNotes />
          <Button variant="subtle" size="xs" onClick={addEmptyNote}>
            <IconPlus size={16} />
          </Button>
        </Group>
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
