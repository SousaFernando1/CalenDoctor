import { IExpenseType } from './expenseType';

export interface IExpense {
  id: number;
  description: string;
  value: number;
  paid: boolean;
  paymentDate: string;
  type: IExpenseType;
}
