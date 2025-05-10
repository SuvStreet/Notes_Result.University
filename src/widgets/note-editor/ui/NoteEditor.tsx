import { useEffect, useRef } from 'react'
import { Stack, Text, Textarea, TextInput } from '@mantine/core'

import { useNoteContext } from '@features/note/model/NoteContext'

export const NoteEditor = () => {
  const { noteDraft, updateNoteDraft } = useNoteContext()

  const titleRef = useRef<HTMLInputElement>(null)
  const justCreated = useRef(false)

  useEffect(() => {
    if (noteDraft && noteDraft.title === '' && noteDraft.content === '') {
      justCreated.current = true
    } else {
      justCreated.current = false
    }
  }, [noteDraft])

  useEffect(() => {
    if (justCreated.current) {
      titleRef.current?.focus()
      justCreated.current = false
    }
  }, [noteDraft])

  if (!noteDraft) {
    return (
      <Stack align="center" justify="center" flex={1}>
        <Text size="xl" fw={500} c="dimmed">
          Выберите заметку или создайте новую.
        </Text>
      </Stack>
    )
  }

  return (
    <Stack gap={10} w="100%">
      <TextInput
        ref={titleRef}
        placeholder="Заголовок"
        value={noteDraft.title}
        onChange={(e) => updateNoteDraft({ title: e.currentTarget.value })}
      />
      <Textarea
        placeholder="Текст заметки"
        minRows={15}
        value={noteDraft.content}
        autosize
        onChange={(e) => updateNoteDraft({ content: e.currentTarget.value })}
      />
    </Stack>
  )
}
