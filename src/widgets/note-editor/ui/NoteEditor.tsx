import { Stack, Textarea } from '@mantine/core'

export const NoteEditor = () => {
  return (
    <Stack p="md" w="100%" h="100vh">
      <Textarea autosize minRows={10} value={'Заметка 1'} />
    </Stack>
  )
}
