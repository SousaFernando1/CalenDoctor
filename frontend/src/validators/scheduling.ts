import {
  differenceInHours,
  differenceInMinutes,
  isAfter,
  isEqual,
  isValid,
} from 'date-fns';
import * as yup from 'yup';

export const paymentSchema = yup.object().shape({
  priceValue: yup.number().required('Campo obrigatório!'),
  paid: yup.boolean().default(false),
});

export const typeSchema = yup.object().shape({
  description: yup.string().required('Campo obrigatório!'),
  defaultPrice: yup.number().required('Campo obrigatório!'),
  defaultDuration: yup
    .number()
    .max(400, 'Limite máximo: 400')
    .required('Campo obrigatório!'),
});

export const schedulingSchema = yup.object().shape({
  description: yup.string().required('Campo obrigatório!'),
  payment: paymentSchema,
  type: typeSchema,
  startDate: yup
    .date()
    .required('Campo obrigatório!')
    .typeError('Data inválida')
    .test('has-time', 'Data de início precisa ter hora definida', (value) => {
      return value instanceof Date && value.getHours() + value.getMinutes() > 0;
    }),

  patient: yup.object().required('Campo obrigatório!'),
  collaborator: yup.object().required('Campo obrigatório!'),
  recurrenceLength: yup.number().required('Campo obrigatório!'),
  recurrenceType: yup.string().required('Campo obrigatório!'),
});
