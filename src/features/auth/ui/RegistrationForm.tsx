import {
  Anchor,
  Button,
  Flex,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { routePaths } from '@shared/config/routePaths'
import { Link } from 'react-router'

export const RegistrationForm = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Flex direction="column" gap="md">
        <TextInput
          label="Логин"
          placeholder="Введите логин"
          withAsterisk
          required
        />
        <PasswordInput
          label="Пароль"
          placeholder="Введите пароль"
          withAsterisk
          required
        />
        <PasswordInput
          label="Повторите пароль"
          placeholder="Повторите пароль"
          withAsterisk
          required
        />
      </Flex>
      <Group justify="space-between" mt="md" align="end">
        <Anchor component={Link} to={routePaths.auth} size="sm" c="grey">
          Авторизоваться
        </Anchor>
        <Button type="submit">Зарегистрироваться</Button>
      </Group>
    </form>
  )
}
