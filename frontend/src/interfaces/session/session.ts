import { ICollaborator, IPatient } from '..';

export interface IUserSession {
  token: string;
  user: IPatient | ICollaborator;
}
