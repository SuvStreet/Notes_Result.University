import { useAuthContext } from '@app/provider'
import { Box, Button, Flex, Text } from '@mantine/core'

export const HeaderPanel = () => {
  const { signOut } = useAuthContext()

  return (
    <Flex h={60} p="md" justify='space-between' align="center" bg="gray">
      <Text size="xl" fw={700}>
        Мои Заметки
      </Text>
      <Box>
        <Button onClick={signOut}>Выход</Button>
      </Box>
    </Flex>
  )
}
