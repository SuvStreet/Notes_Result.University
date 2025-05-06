import { Route, Routes } from 'react-router'

import { PrivateRoute } from './PrivateRoute'
import { Main } from '../../pages/main'
import { AuthPage, RegistrationPage } from '../../pages/auth/ui'
import { routePaths } from '../../shared/config/routePaths'

export const Routing = () => {
  return (
    <Routes>
      <Route path={routePaths.auth} element={<AuthPage />} />
      <Route path={routePaths.register} element={<RegistrationPage />} />
      <Route
        path={routePaths.main}
        element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
