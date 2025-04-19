import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/redux/store';

type Props = {
  children: ReactNode;
};

export function SecurityRoutes({ children }: Readonly<Props>) {
  const { user } = useAppSelector((state) => state.session);

  const { pathname } = useLocation();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user.firstAccess && !pathname.includes('first-access')) {
    return <Navigate to="/view/first-access" replace />;
  }

  return children;
}
