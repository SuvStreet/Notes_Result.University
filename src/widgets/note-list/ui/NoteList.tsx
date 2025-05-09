import { Box, Button, Group, Stack, Text } from '@mantine/core'

import { useNoteContext } from '@features/note/model/context'
import { IconPlus } from '@tabler/icons-react'

export const NoteList = () => {
  const { notes, activeNoteId, setActiveNoteId, addEmptyNote } =
    useNoteContext()

  const isEmpty = notes.length === 0

  return (
    <Stack miw={300} maw={300} h="100vh" p="md">
      <Group justify="space-between" mb="sm">
        <Text fw={500}>Мои заметки</Text>
        <Button variant="subtle" size="xs" onClick={addEmptyNote}>
          <IconPlus size={16} />
        </Button>
      </Group>

      {isEmpty ? (
        <Stack align="center" h="100%">
          <Text size="xl" fw={500} c="dimmed">
            Создайте новую заметку.
          </Text>
        </Stack>
      ) : (
        <Stack gap="xs">
          {notes.map((note) => (
            <Box
              key={note.id}
              p="xs"
              bg={note.id === activeNoteId ? 'gray' : ''}
              onClick={() => setActiveNoteId(note.id)}
              style={{
                cursor: 'pointer',
                borderRadius: 8,
                wordBreak: 'break-word',
              }}
            >
              <Text size="sm" fw={500} truncate>
                {note.title || 'Без названия'}
              </Text>
              <Text size="xs" c="dimmed" lineClamp={1}>
                {note.content || 'Нет содержимого'}
              </Text>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  )
}
