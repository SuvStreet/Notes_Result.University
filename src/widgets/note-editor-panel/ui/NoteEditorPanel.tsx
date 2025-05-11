import { Group, Loader, Stack, Text, Transition } from '@mantine/core'

import { NoteEditor } from '@widgets/note-editor'
import { useNoteContext } from '@features/note/model/NoteContext'

export const NoteEditorPanel = () => {
  const { saving } = useNoteContext()

  return (
    <Stack p="md" w="100%" h="100vh">
      <NoteEditor />

      <Transition transition="fade" duration={300} mounted={saving}>
        {() => (
          <Group
            pr="xl"
            style={{
              position: 'fixed',
              bottom: 16,
              right: 16,
            }}
          >
            <Loader size="xs" />
            <Text size="xs" c="dimmed">
              Синхронизация с облаком...
            </Text>
          </Group>
        )}
      </Transition>
    </Stack>
  )
}
