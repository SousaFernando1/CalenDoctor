import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Campo obrigatório!')
    .email('Insira um e-mail válido!'),
  password: yup.string().nullable().required('Campo obrigatório'),
});

export type LoginSchemaData = yup.InferType<typeof loginSchema>;
