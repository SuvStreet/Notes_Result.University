import { Route, Routes } from 'react-router'

import { PrivateRoute } from './PrivateRoute'
import { Main } from '@pages/main'
import { AuthPage, RegistrationPage } from '@pages/auth/ui'
import { routePaths } from '@shared/config/routePaths'
import { PublicRoute } from './PublicRoute'

export const Routing = () => {
  return (
    <Routes>
      <Route
        path={routePaths.auth}
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />
      <Route
        path={routePaths.register}
        element={
          <PublicRoute>
            <RegistrationPage />
          </PublicRoute>
        }
      />
      <Route
        path={routePaths.main}
        element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }
      />
      <Route
        path={routePaths.note}
        element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
