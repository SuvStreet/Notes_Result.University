import { RegistrationForm } from '@features/auth'
import { Flex } from '@mantine/core'

export const RegistrationPage = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      h="100vh"
    >
      <h1>Регистрация</h1>
      <RegistrationForm />
    </Flex>
  )
}
