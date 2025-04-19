import * as yup from 'yup';

export const passwordSchema = yup
  .string()
  .trim()
  .min(8, 'Mínimo de 8 caracteres')
  .matches(/\d/, {
    message: 'Ao menos um número!',
  })
  .matches(/[A-Z]/g, {
    message: 'Ao menos uma letra maiúscula!',
  })
  .required('Campo obrigatório!');
