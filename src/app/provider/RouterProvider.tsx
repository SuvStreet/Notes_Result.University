import type { JSX } from 'react'
import { BrowserRouter } from 'react-router'

interface RouterProps {
  children: JSX.Element
}

export const RouterProvider = ({ children }: RouterProps) => {
  return <BrowserRouter>{children}</BrowserRouter>
}
