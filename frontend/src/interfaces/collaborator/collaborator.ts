import { IAddress } from '../address/address';
import { IRole } from './role';

export interface ICollaborator {
  id: number;
  name: string;
  email: string;
  cellphone: string;
  address: IAddress;
  firstAccess: boolean;
  userType: string;
  role: IRole;
}
