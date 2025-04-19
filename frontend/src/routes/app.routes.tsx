import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from './auth.routes';
import { RedirectLoggedUser } from './components/RedirectLoggedUser';
import { SecurityRoutes } from './components/SecurityRoutes';
import { PrivateViewRoutes } from './private.routes';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/auth" replace />} />

      <Route
        path="/auth/*"
        element={
          <RedirectLoggedUser>
            <AuthRoutes />
          </RedirectLoggedUser>
        }
      />

      <Route
        path="/view/*"
        element={
          <SecurityRoutes>
            <PrivateViewRoutes />
          </SecurityRoutes>
        }
      />
    </Routes>
  );
}
