import { useEffect, useRef } from 'react'
import { Stack, Text, Textarea, TextInput } from '@mantine/core'

import { useNoteContext } from '@features/note/model/context'

export const NoteEditor = () => {
  const { notes, activeNoteId, updateNoteDraft } = useNoteContext()
  const activeNote = notes.find((note) => note.id === activeNoteId)
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (activeNote?.title === '') {
      titleRef.current?.focus()
    }
  }, [activeNoteId])

  if (!activeNote) {
    return (
      <Stack align="center" justify="center" h="100vh" flex={1}>
        <Text size="xl" fw={500} c="dimmed">
          Выберите заметку или создайте новую.
        </Text>
      </Stack>
    )
  }

  return (
    <Stack gap={10} p="md" w="100%" h="100vh">
      <TextInput
        ref={titleRef}
        placeholder="Заголовок"
        value={activeNote.title}
        onChange={(e) =>
          updateNoteDraft(activeNote.id, { title: e.target.value })
        }
      />
      <Textarea
        placeholder="Текст заметки"
        minRows={15}
        value={activeNote.content}
        autosize
        onChange={(e) =>
          updateNoteDraft(activeNote.id, { content: e.target.value })
        }
      />
    </Stack>
  )
}
