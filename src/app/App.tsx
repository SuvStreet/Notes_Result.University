import { MantineStyleProvider, RouterProvider, AuthProvider } from './provider'

import { Routing } from './routing/Routing'

import './App.css'

function App() {
  return (
    <MantineStyleProvider>
      <RouterProvider>
        <AuthProvider>
          <Routing />
        </AuthProvider>
      </RouterProvider>
    </MantineStyleProvider>
  )
}

export default App
