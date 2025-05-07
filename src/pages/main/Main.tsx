import { Button, Flex } from '@mantine/core'

import { useAuthContext } from '@app/provider'

export const Main = () => {
  const { signOut } = useAuthContext()

  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <h1>Main Page</h1>
      <Button onClick={signOut}>Выход</Button>
    </Flex>
  )
}
