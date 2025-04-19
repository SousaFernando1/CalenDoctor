import { Stack, Typography, Link, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  FormPasswordField,
  FormTextField,
  LoadingButton,
  LogoIFSC,
} from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { login } from 'src/redux/slices';
import { loginSchema, LoginSchemaData } from 'src/validators/login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { ThunkLoadingEnum } from 'src/interfaces';
import { Container, CustomCard, CustomForm } from './styles';

export function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { signInLoading } = useAppSelector((state) => state.session);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const isLoading = signInLoading === ThunkLoadingEnum.PENDING;

  const handleSignIn = async (data: LoginSchemaData) => {
    const { email, password } = data;

    const loginResponse = await dispatch(
      login({
        email,
        password,
      }),
    ).unwrap();

    if (loginResponse) {
      navigate('/');
    }
  };

  const redirectToRegister = () => {
    navigate('/auth/register');
  };

  return (
    <Container>
      <LogoIFSC />
      <CustomCard>
        <CustomForm noValidate onSubmit={handleSubmit(handleSignIn)}>
          <Typography variant="overline">Entre</Typography>
          <Stack height="100%" justifyContent="space-between" mt={2}>
            <Stack gap={3}>
              <FormTextField
                control={control}
                name="email"
                label="E-mail"
                required
              />
              <FormPasswordField
                control={control}
                name="password"
                label="Senha"
                required
              />
              <Stack direction="row" gap={0.5} alignItems="baseline" ml={0.5}>
                <Typography>Não possui uma conta? Faça seu </Typography>
                <Link
                  type="button"
                  component="button"
                  onClick={redirectToRegister}
                  underline="always"
                >
                  cadastro
                </Link>
              </Stack>
            </Stack>

            <Box mb={3}>
              <LoadingButton
                fullWidth
                loading={isLoading}
                variant="contained"
                color="primary"
                type="submit"
              >
                Salvar
              </LoadingButton>
            </Box>
          </Stack>
        </CustomForm>
      </CustomCard>
    </Container>
  );
}
