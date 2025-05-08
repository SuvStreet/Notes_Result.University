import { Paper, ScrollArea, Stack } from '@mantine/core'

export const NoteList = () => {
  return (
    <ScrollArea w="33%" h="100vh" p="md">
      <Stack>
        <Paper withBorder p="sm" radius="md">
          <h1>Note 1</h1>
          <p>This is the content of note 1.</p>
        </Paper>
      </Stack>
    </ScrollArea>
  )
}
