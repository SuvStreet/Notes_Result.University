import { Link } from 'react-router'
import {
  Anchor,
  Button,
  Flex,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import { routePaths } from '@shared/config/routePaths'

export const RegistrationForm = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
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
      confirmPassword: (value, values) =>
        value !== values.password ? 'Пароли не совпадают' : null,
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
          autoComplete="email"
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
        <PasswordInput
          label="Повторите пароль"
          placeholder="Повторите пароль"
          withAsterisk
          key={form.key('confirmPassword')}
          {...form.getInputProps('confirmPassword')}
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
