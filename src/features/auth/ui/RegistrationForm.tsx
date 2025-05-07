import { useDisclosure } from '@mantine/hooks'
import { Link, useNavigate } from 'react-router'
import {
  Anchor,
  Button,
  Flex,
  Group,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import { routePaths } from '@shared/config/routePaths'
import { useAuth } from '../model/useAuth'
import { useState } from 'react'

export const RegistrationForm = () => {
  const { signUp, loading } = useAuth()
  const [modalError, setModalError] = useState<string | null>(null)
  const [opened, { open, close }] = useDisclosure(false)
  const navigate = useNavigate()

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
        if (value.length > 8)
          return 'Пароль слишком длинный (максимум 8 символов)'
        if (value.length < 6)
          return 'Пароль слишком короткий (минимум 6 символов)'
      },
      confirmPassword: (value, values) =>
        value !== values.password ? 'Пароли не совпадают' : null,
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    const { error } = await signUp(values.email, values.password,
      () => {
        navigate(routePaths.main, { replace: true })
      }
    )

    if (error) {
      setModalError(error)
      open()
    }
  }

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" gap="md" miw={320}>
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
          <Button type="submit" loading={loading} disabled={loading}>
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
          </Button>
        </Group>
      </form>

      <Modal opened={opened} onClose={close} title="Ошибка" centered>
        <Text size="sm" c="red">
          {modalError}
        </Text>
      </Modal>
    </>
  )
}
