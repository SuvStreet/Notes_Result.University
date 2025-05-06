import type { ReactNode } from 'react'

import { MantineProvider } from '@mantine/core'

import '@mantine/core/styles.css'

interface Props {
  children: ReactNode
}

export const MantineStyleProvider = ({ children }: Props) => {
  return <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
}
