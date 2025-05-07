import { Link, useNavigate } from 'react-router'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
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

import { routePaths } from '@shared/config/routePaths'
import { useAuthContext } from '@app/provider'

export const LoginForm = () => {
  const { loading, signIn } = useAuthContext()
  const [modalError, setModalError] = useState<string | null>(null)
  const [opened, { open, close }] = useDisclosure(false)
  const navigate = useNavigate()
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
        if (value.length > 8)
          return 'Пароль слишком длинный (максимум 8 символов)'
        if (value.length < 6)
          return 'Пароль слишком короткий (минимум 6 символа)'
      },
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    const { error } = await signIn(values.email, values.password)

    if (!error) {
      navigate(routePaths.main, { replace: true })
    } else {
      setModalError(error)
      open()
    }
  }

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" gap="md" miw={380}>
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
        </Flex>
        <Group justify="space-between" mt="md" align="end">
          <Anchor component={Link} to={routePaths.register} size="sm" c="grey">
            У вас нет аккаунта? Зарегистрируйтесь
          </Anchor>
          <Button type="submit" loading={loading} disabled={loading}>
            {loading ? 'Загрузка...' : 'Войти'}
          </Button>
        </Group>
      </form>
      <Modal opened={opened} onClose={close} title="Ошибка">
        <Text size="sm" c="red">
          {modalError}
        </Text>
      </Modal>
    </>
  )
}
