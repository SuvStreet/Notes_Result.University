import { MantineStyleProvider } from './provider'
import { Router } from './router'

import { Routing } from '../pages/Routing'

import './App.css'

function App() {
  return (
    <MantineStyleProvider>
      <Router>
        <Routing />
      </Router>
    </MantineStyleProvider>
  )
}

export default App
