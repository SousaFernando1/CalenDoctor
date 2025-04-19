import * as yup from 'yup';

export const addressSchema = yup.object({
  uf: yup
    .string()
    .length(2, 'UF deve conter 2 letras')
    .required('UF é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  code: yup
    .string()
    .matches(/^\d{8}$/, 'CEP deve conter exatamente 8 dígitos numéricos')
    .required('CEP é obrigatório'),
  address: yup.string().required('Endereço é obrigatório'),
  district: yup.string().required('Bairro é obrigatório'),
});

export const roleSchema = yup.object({
  description: yup.string().required('Cargo é obrigatório'),
});

export const userSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  cellphone: yup
    .string()
    .transform((value) => value.replace(/\D/g, ''))
    .min(10, 'Celular deve conter exatamente 10 dígitos numéricos')
    .required('Celular é obrigatório'),
  address: addressSchema,
  userType: yup.string().required('Tipo de usuário é obrigatório'),
  password: yup.string().when('id', {
    is: (id: any) => !id,
    then: (schema) =>
      schema.required('Senha é obrigatória').min(3, 'Mínimo de 3 caracteres'),
    otherwise: (schema) => schema.notRequired(),
  }),
  role: yup.mixed().when('userType', ([userType], schema) => {
    return userType === 'COLLABORATOR' ? roleSchema : schema.notRequired();
  }),
  observation: yup.string().nullable(),
});

export const firstAccessSchema = yup.object({
  password: yup.string().required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não conferem')
    .required('Confirmação de senha é obrigatória'),
});
