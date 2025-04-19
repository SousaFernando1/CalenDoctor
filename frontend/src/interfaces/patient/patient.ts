import { IAddress } from '../address/address';

export interface IPatient {
  id: number;
  name: string;
  email: string;
  cellphone: string;
  address: IAddress;
  firstAccess: boolean;
  userType: string;
  observation: string;
}
