import { Box, Stack, Text } from '@mantine/core'

import { useNoteContext } from '@features/note/model/NoteContext'

export const NoteList = () => {
  const { notes, activeNoteId, setActiveNoteSafely } =
    useNoteContext()

  const isEmpty = notes.length === 0

  return (
    <Stack h="100dvh" pl="xs" pr="xs">
      {isEmpty ? (
        <Stack align="center" justify="center">
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
              onClick={() => setActiveNoteSafely(note.id)}
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
