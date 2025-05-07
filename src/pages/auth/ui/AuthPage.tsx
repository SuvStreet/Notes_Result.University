import { LoginForm } from '@features/auth'
import { Flex } from '@mantine/core'

export const AuthPage = () => {
  return (
    <Flex direction="column" justify="center" align="center" h="100vh">
      <h1>Авторизация</h1>
      <LoginForm />
    </Flex>
  )
}
