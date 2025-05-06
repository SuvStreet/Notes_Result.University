import { LoginForm } from '@features/auth'
import { Flex } from '@mantine/core'

export const AuthPage = () => {
  return (
    <div>
      <Flex justify="center" align="center">
        <h1>Авторизация</h1>
      </Flex>
      <LoginForm />
    </div>
  )
}
