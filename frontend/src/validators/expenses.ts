import * as yup from 'yup';

export const expenseTypeSchema = yup.object({
  description: yup.string().required('Cargo é obrigatório'),
  frequency: yup.string().required('Cargo é obrigatório'),
});

export const expenseSchema = yup.object({
  description: yup.string().required('Descrição é obrigatória'),
  value: yup.number().required('Valor é obrigatório'),
  type: expenseTypeSchema,
});
