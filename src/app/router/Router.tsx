import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router'

interface RouterProps {
  children: ReactNode
}

export const Router = ({ children }: RouterProps) => {
  return <BrowserRouter>{children}</BrowserRouter>
}
