import * as yup from 'yup';
import { passwordSchema } from './utils';

export const signUpSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório!'),
  email: yup
    .string()
    .trim()
    .required('Campo obrigatório!')
    .email('Insira um e-mail válido!'),
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais!')
    .required('Campo obrigatório!'),
  isRecruiter: yup.boolean().default(false),
});

export type SignUpSchemaData = yup.InferType<typeof signUpSchema>;
