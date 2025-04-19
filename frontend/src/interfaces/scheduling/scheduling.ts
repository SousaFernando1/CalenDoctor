import { ICollaborator } from '../collaborator/collaborator';
import { IPatient } from '../patient/patient';
import { IPayment } from './payment';
import { IType } from './type';

export interface IScheduling {
  id: number;
  description: string;
  payment: IPayment;
  type: IType;
  startDate: string;
  endDate: string;
  patient: IPatient;
  collaborator: ICollaborator;
  createdAt: string;
  recurrence: number;
}
