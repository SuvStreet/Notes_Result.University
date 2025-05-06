import { Link } from 'react-router'
import {
  Anchor,
  Button,
  Flex,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { routePaths } from '@shared/config/routePaths'

export const LoginForm = () => {
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
      </Flex>
      <Group justify="flex-end" mt="md" align="end">
        <Anchor component={Link} to={routePaths.register} size="sm" c="grey">
          У вас нет аккаунта? Зарегистрируйтесь
        </Anchor>
        <Button type="submit">Авторизоваться</Button>
      </Group>
    </form>
  )
}
