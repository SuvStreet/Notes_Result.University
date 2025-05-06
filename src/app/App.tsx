import { Router } from './router'
import { MantineStyleProvider } from './provider'

import './App.css'

function App() {
  return (
    <MantineStyleProvider>
      <Router>
        <h1>Notes (React + Vite + TS)</h1>
      </Router>
    </MantineStyleProvider>
  )
}

export default App
