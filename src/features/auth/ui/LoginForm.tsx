import { Link } from 'react-router'
import { useForm } from '@mantine/form'
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
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Некорректный email',
      password: (value) => {
        if (!value) return 'Пароль не может быть пустым'
        if (!/^\d+$/.test(value)) return 'Пароль должен быть из цифр'
        if (value.length > 5)
          return 'Пароль слишком длинный (максимум 5 символов)'
        if (value.length < 3)
          return 'Пароль слишком короткий (минимум 3 символа)'
      },
    },
  })

  const handleSubmit = (values: typeof form.values) => {
    console.log(values)
    form.reset()
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction="column" gap="md">
        <TextInput
          label="Логин"
          placeholder="Введите логин"
          withAsterisk
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label="Пароль"
          placeholder="Введите пароль"
          withAsterisk
          key={form.key('password')}
          {...form.getInputProps('password')}
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
