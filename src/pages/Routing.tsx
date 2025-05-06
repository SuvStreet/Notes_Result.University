import { Route, Routes } from 'react-router'

import { SignIn } from '../pages/signin/signin'
import { PrivateRoute } from '../shared'
import { Main } from './main'

export const Routing = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
