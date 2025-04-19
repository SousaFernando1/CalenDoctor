import { IScheduling } from './scheduling';

export interface IPayment {
  id: number;
  priceValue: number;
  paid: boolean;
  paymentDate: string;
  scheduling?: IScheduling;
}
