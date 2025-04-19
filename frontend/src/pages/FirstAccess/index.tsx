import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormPasswordField } from 'src/components';
import { FormFooter } from 'src/components/FormFooter';
import { useSuccessModal } from 'src/hooks/successModal';
import { saveProfile, updateFirstAccess } from 'src/redux/slices';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { firstAccessSchema } from 'src/validators/profile';

export function FirstAccess() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { openSuccessModal } = useSuccessModal();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(firstAccessSchema),
  });

  const { user } = useAppSelector((state) => state.session);

  const onSubmit = async (data: any) => {
    const newPassword = await dispatch(
      saveProfile({
        ...user,
        password: data.password,
      } as any),
    ).unwrap();

    if (newPassword) {
      openSuccessModal({
        title: 'Senha atualiza!',
        description: 'A senha foi atualizada com sucesso.',
        onClose: () => {
          dispatch(updateFirstAccess());
          navigate('/view');
        },
      });
    }
  };

  return (
    <Card
      sx={{
        maxWidth: '50rem',
        width: '100%',
      }}
    >
      <form noValidate onSubmit={handleSubmit(onSubmit, console.log)}>
        <Stack>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormPasswordField
                label="Senha"
                name="password"
                control={control}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormPasswordField
                label="Confirmar senha"
                name="confirmPassword"
                control={control}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormFooter />
            </Grid>
          </Grid>
        </Stack>
      </form>
    </Card>
  );
}
