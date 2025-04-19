import { useAppSelector } from 'src/redux/store';

export function isCollaborator() {
  const { user } = useAppSelector((state) => state.session);

  if (!user) return false;
  return user?.userType === 'COLLABORATOR';
}
