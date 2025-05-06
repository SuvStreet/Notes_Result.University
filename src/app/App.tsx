import { MantineStyleProvider, RouterProvider } from './provider'

import { Routing } from './routing/Routing'

import './App.css'

function App() {
  return (
    <MantineStyleProvider>
      <RouterProvider>
        <Routing />
      </RouterProvider>
    </MantineStyleProvider>
  )
}

export default App
