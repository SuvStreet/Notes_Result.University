import { Box, Button, Input, Mark, Modal, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useNoteContext } from '@features/note/model/NoteContext'

export const SearchNotes = () => {
  const { notes, setActiveNoteSafely } = useNoteContext()
  const [opened, { open, close }] = useDisclosure(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
  )

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text
    const index = text.toLowerCase().indexOf(query.toLowerCase())
    if (index === -1) return text

    const before = text.slice(0, index)
    const match = text.slice(index, index + query.length)
    const after = text.slice(index + query.length)

    return (
      <>
        {before}
        <Mark>{match}</Mark>
        {after}
      </>
    )
  }

  return (
    <>
      <Button variant="subtle" size="xs" onClick={open}>
        <IconSearch size={16} />
      </Button>

      <Modal opened={opened} onClose={close} title="Поиск заметок">
        <Input
          placeholder="Введите название заметки"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <Stack mt="sm">
          {filteredNotes.map((note) => (
            <Box
              key={note.id}
              onClick={() => {
                setActiveNoteSafely(note.id)
                close()
                setQuery('')
                navigate(`/${note.id}`)
              }}
            >
              <Text fw={500}>
                {highlightMatch(note.title || 'Без названия', query)}
              </Text>
              <Text size="sm" c="dimmed" lineClamp={1}>
                {highlightMatch(note.content, query)}
              </Text>
            </Box>
          ))}
        </Stack>
      </Modal>
    </>
  )
}
