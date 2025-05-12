import { useEffect, useRef } from 'react'
import { Stack, Text, TextInput } from '@mantine/core'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder';

import { useNoteContext } from '@features/note/model/NoteContext'
import { HeaderEditor } from '@widgets/header-editor/ui'
import { RichTextEditor } from '@mantine/tiptap'

export const NoteEditor = () => {
  const { noteDraft, updateNoteDraft } = useNoteContext()

  const titleRef = useRef<HTMLInputElement>(null)
  const justCreated = useRef(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Введите текст' }),
    ],
    content: noteDraft?.content || '',
    onUpdate: ({ editor }) => {
      updateNoteDraft({ content: editor.getHTML() })
    },
  })

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

  useEffect(() => {
    if (editor && noteDraft) {
      editor.commands.setContent(noteDraft.content)
    }
  }, [noteDraft?.id])

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
      <HeaderEditor />
      <TextInput
        ref={titleRef}
        placeholder="Заголовок"
        value={noteDraft.title}
        onChange={(e) => updateNoteDraft({ title: e.currentTarget.value })}
      />

      {editor && (
        <RichTextEditor editor={editor} style={{ wordBreak: 'break-word' }}>
          <RichTextEditor.Toolbar stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Undo />
              <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor>
      )}
    </Stack>
  )
}
