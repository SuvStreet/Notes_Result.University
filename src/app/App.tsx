import { MantineStyleProvider, RouterProvider, AuthProvider } from './provider'
import { NoteProvider } from '@features/note/model/NoteContext'

import { Routing } from './routing/Routing'

import './App.css'

function App() {
  return (
    <MantineStyleProvider>
      <RouterProvider>
        <AuthProvider>
          <NoteProvider>
            <Routing />
          </NoteProvider>
        </AuthProvider>
      </RouterProvider>
    </MantineStyleProvider>
  )
}

export default App
